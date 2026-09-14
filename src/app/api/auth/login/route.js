import { comparePassword, signToken } from '@/lib/auth';
import { getUserByUsername } from '@/lib/usersHelper';
import { checkRateLimit, recordRateLimitAttempt, resetRateLimit, getClientIp } from '@/lib/rateLimit';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const ip = getClientIp(request);

    // 1. Kiểm tra giới hạn tần suất đăng nhập (Chống Brute-force: tối đa 5 lần sai trong 15 phút)
    const rateCheck = checkRateLimit(ip, 'admin_login', 5, 15 * 60 * 1000);
    if (!rateCheck.allowed) {
      const waitMinutes = Math.ceil(rateCheck.retryAfterSec / 60);
      return NextResponse.json(
        {
          success: false,
          message: `Bạn đã đăng nhập sai quá nhiều lần. Vui lòng thử lại sau ${waitMinutes} phút.`
        },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const username = String(body.username || '').trim().toLowerCase();
    const password = String(body.password || '').trim();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: 'Vui lòng nhập tên đăng nhập và mật khẩu' },
        { status: 400 }
      );
    }

    // 2. Tìm kiếm tài khoản và xác minh mật khẩu mã hóa Cryptographic bcrypt
    // Sử dụng Dummy Hash để ngăn chặn hoàn toàn tấn công dò quét tài khoản qua độ trễ (Timing Attack)
    const DUMMY_HASH = '$2b$10$7EqJtq98hPqEX7fNZaFWoO.8/kC334a1W4i6kQhJ9lZ0N9o9mZ3iK';
    const adminUser = await getUserByUsername(username);
    let passwordMatch = false;

    if (adminUser && adminUser.password_hash) {
      passwordMatch = await comparePassword(password, adminUser.password_hash);
    } else {
      // Giữ thời gian chạy hàm băm giống hệt như khi user có tồn tại (~70ms)
      await comparePassword(password, DUMMY_HASH);
    }

    // 3. Sai mật khẩu hoặc không tồn tại tài khoản: Ghi nhận vi phạm rate limit
    if (!passwordMatch || !adminUser) {
      const currentAttempts = recordRateLimitAttempt(ip, 'admin_login', 15 * 60 * 1000);
      const remaining = Math.max(0, 5 - currentAttempts);
      let message = 'Tên đăng nhập hoặc mật khẩu không đúng.';
      if (remaining > 0 && remaining <= 3) {
        message += ` Bạn còn ${remaining} lần thử trước khi bị khóa tạm thời.`;
      } else if (remaining === 0) {
        message = 'Bạn đã đăng nhập sai 5 lần liên tiếp. Địa chỉ IP của bạn bị tạm khóa trong 15 phút.';
      }
      return NextResponse.json(
        { success: false, message },
        { status: 401 }
      );
    }

    // 4. Kiểm tra trạng thái tài khoản
    if (adminUser.is_active === 0 || adminUser.is_active === false) {
      return NextResponse.json(
        { success: false, message: 'Tài khoản của bạn đã bị vô hiệu hóa. Vui lòng liên hệ Quản trị viên.' },
        { status: 403 }
      );
    }

    // 5. Đăng nhập thành công -> Reset bộ đếm vi phạm của IP
    resetRateLimit(ip, 'admin_login');

    const userRole = adminUser.role || 'admin';
    const token = signToken({
      id: adminUser.id,
      username: adminUser.username,
      name: adminUser.display_name,
      role: userRole
    });

    return NextResponse.json({
      success: true,
      message: 'Đăng nhập thành công',
      token,
      user: {
        id: adminUser.id,
        username: adminUser.username,
        display_name: adminUser.display_name,
        role: userRole
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Lỗi hệ thống khi đăng nhập. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
