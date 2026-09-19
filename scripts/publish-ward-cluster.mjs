#!/usr/bin/env node

/**
 * CÔNG CỤ XUẤT BẢN CỤM BÀI VIẾT SEO KHU VỰC (NGỌC GAS WARD CLUSTER PUBLISHER)
 * Tự động tạo Banner 4 yếu tố chuẩn thương hiệu + Biên soạn HTML chuẩn SEO E-E-A-T + Xuất bản qua API
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { publishArticle } from './publish-article.mjs';

// 1. Nạp biến môi trường từ .env.local
const envLocalPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envLocalPath)) {
  const envContent = fs.readFileSync(envLocalPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const idx = trimmed.indexOf('=');
      if (idx > 0) {
        const key = trimmed.slice(0, idx).trim();
        const val = trimmed.slice(idx + 1).trim();
        if (!process.env[key]) process.env[key] = val;
      }
    }
  });
}

const target = process.env.NEXT_PUBLIC_BASE_URL || 'https://ngocgas.com';
const API_KEY = process.env.AI_PUBLISHER_API_KEY;

if (!API_KEY) {
  console.error('❌ Lỗi: Không tìm thấy AI_PUBLISHER_API_KEY trong .env.local!');
  process.exit(1);
}

// 2. Danh sách 10 khu vực trọng điểm theo lộ trình
const WARD_ARTICLES = [
  // --- GIAI ĐOẠN 1: 5 PHƯỜNG DĨ AN ---
  {
    wardName: 'Phường An Bình',
    locationShort: 'Phường An Bình',
    city: 'Dĩ An',
    title: 'Giao Gas Phường An Bình Hỏa Tốc 15 Phút — Cân Điện Tử Tại Bếp, Đủ Ký 100%',
    slug: 'giao-gas-phuong-an-binh',
    summary: 'Đại lý giao gas nhanh Phường An Bình, Dĩ An. Ngọc Gas phân phối Sopet Gas One, Phoenix, Luxen chính hãng, giao 15 phút, cân gas điện tử tại bếp. Gọi 1900 9396!',
    metaKeywords: 'giao gas phuong an binh, dai ly gas an binh di an, doi gas gan day an binh, doi binh gas 12kg an binh, giao gas nhanh song than',
    landmarks: 'Ga Sóng Thần, KCN Sóng Thần 1, KDC An Bình, đường Bình Đường 1-2-3-4, đường An Bình, đường Lê Trọng Tấn',
    closestBranch: 'Cửa hàng Ngọc Gas Dĩ An (7 Nguyễn Trung Trực, TP. Dĩ An)'
  },
  {
    wardName: 'Phường Đông Hòa',
    locationShort: 'Phường Đông Hòa',
    city: 'Dĩ An',
    title: 'Đổi Bình Gas Phường Đông Hòa — Giao Hỏa Tốc 15 Phút, Cân Điện Tử Tại Bếp',
    slug: 'giao-gas-phuong-dong-hoa',
    summary: 'Đại lý đổi gas uy tín Phường Đông Hòa, Dĩ An. Giao nhanh 15 phút khu Làng Đại Học, KTX ĐHQG, Go! Dĩ An, Quốc lộ 1K. Cam kết bình gas đủ ký. Hotline 1900 9396.',
    metaKeywords: 'doi binh gas phuong dong hoa, giao gas phuong dong hoa, doi gas lang dai hoc, dai ly gas gan day dong hoa, gas 12kg dong hoa',
    landmarks: 'Khu Đô Thị ĐHQG TP.HCM, KTX Khu A & B, TTTM Go! Dĩ An (Big C cũ), Quốc lộ 1K, đường Trần Hưng Đạo, Nguyễn Du, Hai Bà Trưng',
    closestBranch: 'Cửa hàng Ngọc Gas Dĩ An (7 Nguyễn Trung Trực, TP. Dĩ An)'
  },
  {
    wardName: 'Phường Tân Bình',
    locationShort: 'Phường Tân Bình',
    city: 'Dĩ An',
    title: 'Giao Gas Phường Tân Bình Dĩ An — Bình Gas Sopet, Luxen Chính Hãng Cân Đủ Ký',
    slug: 'giao-gas-phuong-tan-binh',
    summary: 'Dịch vụ giao gas hỏa tốc tại Phường Tân Bình, Dĩ An. Phân phối Sopet Gas One, Luxen, Phoenix Gas 12kg và 45kg công nghiệp, cân tại chỗ. Gọi 1900 9396.',
    metaKeywords: 'giao gas phuong tan binh di an, doi gas tan binh, dai ly gas chieu lieu, binh gas 12kg tan binh, gia gas hom nay tan binh',
    landmarks: 'Ngã tư Chiêu Liêu, KCN Tân Đông Hiệp B, đường Bùi Thị Xuân, Nguyễn Thị Minh Khai, Tân Phước, giáp ranh Hóa An',
    closestBranch: 'Cửa hàng Ngọc Gas Cây Da (7/14 Cây Da, KP. Tân Phú 1, Tân Đông Hiệp)'
  },
  {
    wardName: 'Phường Bình An',
    locationShort: 'Phường Bình An',
    city: 'Dĩ An',
    title: 'Đại Lý Giao Gas Phường Bình An Dĩ An — Giao Nhanh 15 Phút, Cân Đủ Ký Tại Chỗ',
    slug: 'giao-gas-phuong-binh-an',
    summary: 'Đại lý giao gas nhanh tại Phường Bình An, Dĩ An. Bình gas chính hãng Sopet, Phoenix, Luxen cân điện tử trực tiếp, kiểm tra an toàn miễn phí. Gọi 1900 9396.',
    metaKeywords: 'giao gas phuong binh an, dai ly gas binh an di an, doi gas binh thung, gas gan day binh an, doi binh gas 12kg binh an',
    landmarks: 'Khu vực ĐT743, Bình Thung, dốc Châu Thới, chùa Châu Thới, Quốc lộ 1K, giáp ranh sông Đồng Nai',
    closestBranch: 'Cửa hàng Ngọc Gas Dĩ An (7 Nguyễn Trung Trực, TP. Dĩ An)'
  },
  {
    wardName: 'Phường Bình Thắng',
    locationShort: 'Phường Bình Thắng',
    city: 'Dĩ An',
    title: 'Giao Gas Phường Bình Thắng Dĩ An Hỏa Tốc — Đổi Gas Sopet One, Luxen 12kg',
    slug: 'giao-gas-phuong-binh-thang',
    summary: 'Đổi bình gas tại Phường Bình Thắng, Dĩ An. Giao hỏa tốc khu vực Cầu Đồng Nai, ngã ba Tân Vạn, Xa Lộ Hà Nội. Cam kết 100% đủ ký, an toàn. Hotline 1900 9396.',
    metaKeywords: 'giao gas phuong binh thang, doi gas cau dong nai, dai ly gas tan van, binh gas sopet binh thang, giao gas nhanh binh thang',
    landmarks: 'Khu vực Cầu Đồng Nai, Ngã 3 Tân Vạn, Xa Lộ Hà Nội, cảng Bình Dương, đường ĐT743A',
    closestBranch: 'Cửa hàng Ngọc Gas Dĩ An (7 Nguyễn Trung Trực, TP. Dĩ An)'
  },

  // --- GIAI ĐOẠN 2: 3 PHƯỜNG THUẬN AN & KDC VIETSING ---
  {
    wardName: 'Phường An Phú',
    locationShort: 'Phường An Phú',
    city: 'Thuận An',
    title: 'Giao Gas Phường An Phú Thuận An Hỏa Tốc 15 Phút — Trạm Gas Gần Đây Đủ Ký',
    slug: 'giao-gas-phuong-an-phu',
    summary: 'Giao gas hỏa tốc Phường An Phú, Thuận An từ trạm Đường D1 KDC VietSing. Bình gas Sopet One, Luxen cân điện tử tại bếp, bảo trì van miễn phí. Gọi 1900 9396.',
    metaKeywords: 'giao gas phuong an phu, doi gas kdc vietsing, dai ly gas gan day an phu thuan an, giao gas nhanh vietsing, binh gas 12kg an phu',
    landmarks: 'Đường D1 KDC VietSing, Vòng xoay An Phú, đường 22 Tháng 12, ĐT743, đường An Phú 01 đến 35',
    closestBranch: 'Trạm Giao Gas Nhanh VietSing (Đường D1, KDC VietSing, Phường An Phú, TP. Thuận An)'
  },
  {
    wardName: 'Phường Thuận Giao',
    locationShort: 'Thuận Giao & KCN VSIP 1',
    city: 'Thuận An',
    title: 'Giao Gas Nhanh Thuận Giao & KCN VSIP 1 — Đổi Bình Gas 12kg & 45kg Đủ Ký',
    slug: 'giao-gas-thuan-giao-vsip-1',
    summary: 'Dịch vụ giao gas nhanh tại Phường Thuận Giao và KCN VSIP 1. Cung cấp bình gas dân dụng 12kg và gas công nghiệp 45kg cho nhà hàng, quán ăn. Gọi 1900 9396.',
    metaKeywords: 'giao gas thuan giao, doi gas kcn vsip 1, gas cong nghiep 45kg thuan giao, dai ly gas thuan giao thuan an, giao gas nhanh vsip 1',
    landmarks: 'KCN VSIP 1, Chợ Thuận Giao, Đại Lộ Bình Dương, đường 22 Tháng 12, KDC Thuận Giao, đường D22, D35',
    closestBranch: 'Trạm Giao Gas Nhanh VietSing (Đường D1, KDC VietSing, Phường An Phú, TP. Thuận An)'
  },
  {
    wardName: 'Phường Bình Hòa',
    locationShort: 'Phường Bình Hòa',
    city: 'Thuận An',
    title: 'Đổi Gas Phường Bình Hòa Thuận An — Giao Gas Nhanh 15 Phút, Miễn Phí Kiểm Tra Van',
    slug: 'giao-gas-phuong-binh-hoa',
    summary: 'Đại lý đổi gas uy tín tại Phường Bình Hòa, Thuận An. Giao tận nhà KCN Đồng An, cầu Ông Bố, ĐT743B. Bình gas chính hãng Sopet, Luxen cân đủ ký. Gọi 1900 9396.',
    metaKeywords: 'doi gas phuong binh hoa, giao gas binh hoa thuan an, dai ly gas kcn dong an, giao gas cau ong bo, doi binh gas 12kg binh hoa',
    landmarks: 'KCN Đồng An, ngã tư Cầu Ông Bố, đường ĐT743B, đường Bình Hòa 08 - 24, giáp ranh Lái Thiêu & Thủ Đức',
    closestBranch: 'Trạm Giao Gas Nhanh VietSing (Đường D1, KDC VietSing, Thuận An)'
  },

  // --- GIAI ĐOẠN 3: 2 PHƯỜNG THỦ ĐỨC GIÁP RANH ---
  {
    wardName: 'Phường Linh Xuân',
    locationShort: 'Phường Linh Xuân',
    city: 'Thủ Đức',
    title: 'Giao Gas Phường Linh Xuân Thủ Đức Hỏa Tốc — Đại Lý Gas Gần Đây Cân Đủ Ký',
    slug: 'giao-gas-phuong-linh-xuan',
    summary: 'Giao gas hỏa tốc tại Phường Linh Xuân, TP. Thủ Đức. Phục vụ khu vực Cầu vượt Linh Xuân, Quốc lộ 1K, đường số 9, số 11. Cân đủ ký, an toàn PCCC. Gọi 1900 9396.',
    metaKeywords: 'giao gas phuong linh xuan, doi gas linh xuan thu duc, dai ly gas gan day linh xuan, doi binh gas 12kg linh xuan, giao gas cau vuot linh xuan',
    landmarks: 'Cầu vượt Linh Xuân, Quốc lộ 1K, Quốc lộ 1A, đường số 9, đường số 11, đường Bà Giang, giáp ranh An Bình Dĩ An',
    closestBranch: 'Cửa hàng Ngọc Gas Dĩ An (7 Nguyễn Trung Trực, TP. Dĩ An — cách Linh Xuân chỉ 5 phút)'
  },
  {
    wardName: 'Phường Linh Trung',
    locationShort: 'Phường Linh Trung',
    city: 'Thủ Đức',
    title: 'Đổi Bình Gas Phường Linh Trung Thủ Đức — Giao Nhanh Tận Nhà, Cân Đủ Ký',
    slug: 'giao-gas-phuong-linh-trung',
    summary: 'Đại lý đổi bình gas Phường Linh Trung, Thủ Đức. Giao nhanh khu KCX Linh Trung 1, đường Hoàng Diệu 2, Lê Văn Chí. Cam kết cân gas điện tử tại bếp. Gọi 1900 9396.',
    metaKeywords: 'doi binh gas phuong linh trung, giao gas kcx linh trung 1, dai ly gas linh trung thu duc, gas gan day linh trung, binh gas 12kg linh trung',
    landmarks: 'KCX Linh Trung 1, đường Hoàng Diệu 2, đường Lê Văn Chí, đường số 17, khu vực giáp ranh ĐHQG và Đông Hòa',
    closestBranch: 'Cửa hàng Ngọc Gas Dĩ An (7 Nguyễn Trung Trực, TP. Dĩ An)'
  }
];

// Hàm sinh nội dung bài viết HTML chuẩn SEO E-E-A-T
function generateArticleContent(item, finalBannerUrl) {
  return `
<div class="quick-summary" style="background:#ECFDF5;border:1px solid #A7F3D0;border-left:5px solid #064E3B;padding:18px 20px;margin-bottom:28px;border-radius:10px;font-size:15.5px;line-height:1.7;color:#065F46;">
  <strong>Tóm tắt dịch vụ hỏa tốc:</strong> Quý khách tại <strong>${item.wardName} (${item.city})</strong> khi cần đổi bình gas dân dụng 12kg hoặc bình gas công nghiệp 45kg, chỉ cần gọi hotline <a href="tel:19009396" style="color:#047857;font-weight:bold;text-decoration:underline;">1900 9396</a>. Kỹ thuật viên Ngọc Gas xuất phát từ điểm trực gần nhất (${item.closestBranch}), giao hỏa tốc tận bếp trong vòng <strong>15 phút</strong>. 100% bình gas có màng co niêm phong nguyên bản, cân kiểm tra điện tử công khai tại chỗ và bảo trì van dẫn miễn phí.
</div>

${finalBannerUrl ? `
<div class="article-banner-wrap" style="text-align:center;margin:24px 0 32px 0;">
  <img src="${finalBannerUrl}" alt="${item.title}" style="max-width:100%;height:auto;border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,0.08);display:inline-block;" />
</div>
` : ''}

<h2>1. Nhu Cầu Đổi Gas Nhanh & Thực Trạng Tại ${item.wardName} (${item.city})</h2>
<p>
  <strong>${item.wardName}</strong> là khu vực tập trung đông đúc các hộ gia đình, khu nhà trọ công nhân, sinh viên cùng mạng lưới nhà hàng, quán ăn hoạt động liên tục. Với đặc thù các tuyến đường huyết mạch như <em>${item.landmarks}</em>, việc nấu nướng của bà con và các chủ quán đòi hỏi nguồn cung cấp năng lượng phải tuyệt đối ổn định, không bị gián đoạn giờ cao điểm.
</p>
<p>
  Tuy nhiên, mối lo lớn nhất của người tiêu dùng tại ${item.wardName} khi gọi gas là:
</p>
<ul>
  <li><strong>Gas thiếu ký:</strong> Một số cơ sở sang chiết trái phép rút bớt gas từ 1kg – 3kg, khiến bình gas 12kg chỉ dùng được 2-3 tuần đã hết.</li>
  <li><strong>Vỏ bình cũ sét, mất an toàn:</strong> Bình gas không qua kiểm định định kỳ, nguy cơ xì gas ở chân van gây cháy nổ nguy hiểm.</li>
  <li><strong>Giao hàng chậm trễ:</strong> Chờ đợi 45 phút đến 1 tiếng giữa lúc đang nấu dở bữa cơm gia đình hoặc cao điểm quán ăn.</li>
</ul>
<p>
  Thấu hiểu những băn khoăn đó, <strong>Hệ thống Ngọc Gas</strong> cam kết giải quyết triệt để mọi nỗi lo bằng quy trình giao gas chuẩn chỉnh và minh bạch nhất khu vực.
</p>

<h2>2. Bảng Giá Gas Hôm Nay Tại ${item.wardName} — Cam Kết Cân Điện Tử Đủ Ký</h2>
<p>
  Giá gas thế giới và trong nước có sự điều chỉnh định kỳ vào ngày đầu tiên của mỗi tháng theo biến động thị trường năng lượng. Nhằm bảo đảm quyền lợi tối đa cho khách hàng, Ngọc Gas luôn niêm yết công khai và cập nhật minh bạch theo từng ngày:
</p>
<div class="cta-price-box" style="background:#F0FDF4;border:1.5px dashed #059669;padding:18px 22px;border-radius:12px;margin:24px 0;text-align:center;">
  <h3 style="color:#065F46;margin-top:0;margin-bottom:8px;font-size:18px;">Tra Cứu Bảng Giá Gas Mới Nhất Tháng ${new Date().getMonth() + 1}/${new Date().getFullYear()}</h3>
  <p style="margin-bottom:14px;color:#374151;font-size:15px;">Giá gas được cập nhật tự động trực tiếp từ nhà máy chính hãng Sopet Gas One, Luxen Gas và Phoenix Gas:</p>
  <a href="/gia-gas-hom-nay" style="display:inline-block;background:#059669;color:#fff;font-weight:bold;padding:11px 24px;border-radius:8px;text-decoration:none;font-size:15px;box-shadow:0 3px 8px rgba(5,150,105,0.25);">👉 Xem Bảng Giá Gas Hôm Nay Tại Đây</a>
  <span style="display:block;margin-top:10px;font-size:13.5px;color:#6B7280;">Hoặc liên hệ tổng đài <strong>1900 9396</strong> để nhận báo giá ưu đãi tức thì cho hộ gia đình và quán ăn.</span>
</div>

<p>
  <strong>Quy tắc cân gas 3 bước chống gian lận của thợ Ngọc Gas:</strong>
</p>
<ol>
  <li><strong>Cân tổng trọng lượng trước khi lắp:</strong> Vỏ bình (khoảng 12.5kg – 14kg dập nổi trên quai xách) + Nước gas (đúng 12.0kg ± 200g) = Tổng từ 24.5kg – 26kg.</li>
  <li><strong>Khách hàng đối chiếu số cân:</strong> Nhân viên chủ động đặt cân điện tử cầm tay chuẩn kiểm định ngay trước mặt khách.</li>
  <li><strong>Cân trừ bì khi đổi bình tiếp theo:</strong> Khẳng định bình gas cháy kiệt đáy, không đọng tạp chất hay nước lạ bên trong ruột bình.</li>
</ol>

<h2>3. Các Dòng Sản Phẩm Bình Gas Chính Hãng Ngọc Gas Phân Phối Tại ${item.wardName}</h2>
<p>
  Toàn bộ bình gas tại Ngọc Gas đều nhập trực tiếp từ tổng kho nhà máy, có bảo hiểm an toàn cháy nổ lên đến hàng tỷ đồng:
</p>
<ul>
  <li>
    <strong>Bình Gas Sopet Gas One 12kg (Xám, Xanh Đen, Đỏ):</strong> Thương hiệu công nghệ Nhật Bản hàng đầu. Khí gas tinh khiết, cháy ngọn lửa xanh chụm đáy nồi, nhiệt lượng cao giúp tiết kiệm đến 15% lượng gas đun nấu.
  </li>
  <li>
    <strong>Bình Gas Phoenix Gas 12kg (Xám, Đỏ, Vàng):</strong> Vỏ bình chế tạo từ thép chuyên dụng chịu áp suất cao gấp 3 lần tiêu chuẩn, van điều áp vận hành êm ái, phù hợp hoàn hảo cho căn bếp gia đình.
  </li>
  <li>
    <strong>Bình Gas Luxen Gas 12kg & 45kg:</strong> Giải pháp tối ưu chi phí cho các quán cơm, quán nhậu, quán phở, bếp ăn công ty tại khu vực ${item.landmarks} cần nguồn gas công suất lớn và tần suất đổi bình liên tục.
  </li>
</ul>
<p style="text-align:center;margin:20px 0;">
  <a href="/san-pham" style="color:#059669;font-weight:600;text-decoration:underline;">Xem chi tiết các dòng bình gas chính hãng tại Danh Mục Sản Phẩm Ngọc Gas</a>
</p>

<h2>4. Quy Trình 5 Bước Giao Gas An Toàn PCCC Tận Nhà</h2>
<p>
  Tại Ngọc Gas, nhân viên giao nhận không chỉ đơn thuần là người chở gas mà là <strong>kỹ thuật viên an toàn năng lượng</strong> được đào tạo bài bản:
</p>
<ul>
  <li><strong>Bước 1 - Tiếp nhận & Điều phối:</strong> Khách gọi hotline <a href="tel:19009396" style="font-weight:bold;color:#059669;">1900 9396</a>, hệ thống định vị trạm xuất phát gần nhất để kỹ thuật viên lên đường trong 2 phút.</li>
  <li><strong>Bước 2 - Giao hàng hỏa tốc 15 phút:</strong> Vận chuyển an toàn, bình gas luôn được đặt thẳng đứng trên giá đỡ xe chuyên dụng.</li>
  <li><strong>Bước 3 - Cân gas tại chỗ:</strong> Hướng dẫn khách kiểm tra màng co niêm phong nhiệt, tem chống giả và cân điện tử công khai.</li>
  <li><strong>Bước 4 - Lắp đặt & Thử kín bằng bọt chuyên dụng:</strong> Tháo bình cũ, vệ sinh đầu nối, gắn van điều áp mới và quét bọt xà phòng kiểm tra cổ van, đường dây dẫn để loại trừ 100% nguy cơ rò rỉ.</li>
  <li><strong>Bước 5 - Đánh lửa thử & Bàn giao phiếu bảo hành:</strong> Điều chỉnh ngọn lửa xanh chuẩn, dán tem bảo dưỡng và số điện thoại hỗ trợ kỹ thuật 24/7.</li>
</ul>

<h2>5. Mạng Lưới Tuyến Đường Giao Nhanh 15 Phút Tại ${item.wardName}</h2>
<p>
  Đội ngũ kỹ thuật viên Ngọc Gas thông thạo từng hẻm nhỏ, khu phố tại ${item.wardName}, luôn sẵn sàng phục vụ cấp tốc trên các tuyến đường:
</p>
<p style="background:#F9FAFB;padding:16px 20px;border-radius:8px;border:1px solid #E5E7EB;font-style:italic;">
  📍 Phục vụ hỏa tốc: ${item.landmarks}, cùng toàn bộ các khu phố, hẻm dân cư, chung cư và khu phòng trọ trên địa bàn ${item.wardName}.
</p>
<p>
  Ngoài ra, quý khách có thể ghé trực tiếp các chi nhánh cửa hàng của chúng tôi để đổi gas hoặc bảo dưỡng bếp gas:
</p>
<ul>
  <li><strong>Trụ sở chính Dĩ An:</strong> 7 Nguyễn Trung Trực, Phường Dĩ An, Tỉnh Bình Dương.</li>
  <li><strong>Trạm giao nhanh VietSing:</strong> Đường D1, KDC VietSing, Phường An Phú, TP. Thuận An, Bình Dương.</li>
  <li><strong>Cửa hàng Cây Da:</strong> 7/14 Cây Da, KP. Tân Phú 1, Phường Tân Đông Hiệp.</li>
</ul>
<p>
  Xem danh sách đầy đủ tại trang <a href="/cua-hang" style="color:#059669;font-weight:bold;text-decoration:underline;">Hệ Thống Cửa Hàng Ngọc Gas</a>.
</p>

<div class="article-footer-cta" style="background:linear-gradient(135deg, #064E3B 0%, #047857 100%);color:#fff;padding:26px;border-radius:14px;margin-top:36px;text-align:center;box-shadow:0 8px 24px rgba(6,78,59,0.2);">
  <h3 style="color:#fff;margin-top:0;margin-bottom:10px;font-size:20px;">Bếp Nhà Bạn Vừa Hết Gas? Cần Đổi Gas Gấp Tại ${item.wardName}?</h3>
  <p style="color:#D1FAE5;font-size:15.5px;max-width:680px;margin:0 auto 18px auto;line-height:1.6;">
    Chỉ một cuộc gọi, bình gas Sopet One / Luxen chính hãng sẽ có mặt tại bếp nhà bạn sau 15 phút. Cân đủ ký ngay tại chỗ, kiểm tra an toàn van gas hoàn toàn miễn phí!
  </p>
  <a href="tel:19009396" style="display:inline-block;background:#F59E0B;color:#111827;font-size:18px;font-weight:bold;padding:12px 30px;border-radius:30px;text-decoration:none;box-shadow:0 4px 12px rgba(245,158,11,0.4);">
    📞 GỌI NGAY: 1900 9396
  </a>
</div>
`;
}

// 3. Hàm chạy tuần tự toàn bộ 10 bài viết
async function run() {
  console.log('=================================================================');
  console.log('🚀 [CLUSTER PUBLISHER] BẮT ĐẦU TRIỂN KHAI 10 BÀI VIẾT SEO KHU VỰC');
  console.log(`🌐 Server mục tiêu: ${target}`);
  console.log(`📋 Tổng số bài cần xuất bản: ${WARD_ARTICLES.length}`);
  console.log('=================================================================\n');

  const results = [];

  for (let i = 0; i < WARD_ARTICLES.length; i++) {
    const item = WARD_ARTICLES[i];
    console.log(`\n-----------------------------------------------------------------`);
    console.log(`[${i + 1}/${WARD_ARTICLES.length}] Đang xử lý: ${item.title}`);
    console.log(`📍 Khu vực: ${item.wardName} (${item.city})`);
    
    // Bước 1: Tạo Banner hình ảnh 4 yếu tố
    const bannerFilename = `banner-${item.slug}.jpg`;
    const bannerPath = path.join(process.cwd(), 'scratch', bannerFilename);
    
    console.log(`🎨 Sinh banner ảnh cho "${item.locationShort}"...`);
    try {
      execSync(`node scripts/generate-ward-banner.mjs --ward "${item.locationShort}" --output "${bannerPath}"`, {
        stdio: 'pipe'
      });
      console.log(`✅ Đã tạo banner cục bộ tại: ${bannerPath}`);
    } catch (err) {
      console.warn(`⚠️ Lỗi sinh banner:`, err.message);
    }

    // Bước 2: Tải banner lên server
    let uploadedBannerUrl = null;
    if (fs.existsSync(bannerPath)) {
      try {
        const fileBuffer = fs.readFileSync(bannerPath);
        const formData = new FormData();
        const blob = new Blob([fileBuffer], { type: 'image/jpeg' });
        formData.append('file', blob, bannerFilename);

        const uploadRes = await fetch(`${target}/api/upload`, {
          method: 'POST',
          headers: { 'x-api-key': API_KEY },
          body: formData
        });
        const uploadJson = await uploadRes.json();
        if (uploadRes.ok && uploadJson.success) {
          uploadedBannerUrl = uploadJson.url;
          console.log(`✅ Đã tải banner lên server live: ${uploadedBannerUrl}`);
        } else {
          console.warn(`⚠️ Không thể tải banner: ${uploadJson.message}`);
        }
      } catch (err) {
        console.warn(`⚠️ Lỗi tải ảnh: ${err.message}`);
      }
    }

    // Bước 3: Sinh nội dung HTML chuẩn SEO E-E-A-T
    const htmlContent = generateArticleContent(item, uploadedBannerUrl);

    // Bước 4: Xuất bản bài viết qua API
    console.log(`📝 Đang xuất bản bài viết lên CSDL MySQL...`);
    try {
      const publishResult = await publishArticle({
        title: item.title,
        slug: item.slug,
        summary: item.summary,
        content: htmlContent,
        imageUrl: uploadedBannerUrl || '/images/quy-trinh-giao-gas-chuan.jpg',
        targetUrl: target
      });

      // Bước 5: Kiểm tra trạng thái HTTP live
      const checkRes = await fetch(publishResult.liveUrl);
      const isSuccess = checkRes.status === 200;
      console.log(`🔍 Kiểm tra link live (${publishResult.liveUrl}): HTTP ${checkRes.status} ${isSuccess ? '✅ (OK)' : '❌ (LỖI)'}`);

      results.push({
        ward: item.wardName,
        title: item.title,
        url: publishResult.liveUrl,
        banner: uploadedBannerUrl,
        status: checkRes.status
      });

    } catch (err) {
      console.error(`❌ Xuất bản thất bại:`, err.message);
      results.push({
        ward: item.wardName,
        title: item.title,
        error: err.message,
        status: 'ERROR'
      });
    }
  }

  // Bước 6: Purge Cache toàn diện
  console.log('\n=================================================================');
  console.log('⚡ Đang làm mới bộ nhớ đệm (Cache Revalidation) toàn hệ thống...');
  try {
    const purgeRes = await fetch(`${target}/api/cache`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      },
      body: JSON.stringify({ category: 'all' })
    });
    const purgeJson = await purgeRes.json();
    console.log(`✅ Kết quả xóa cache:`, purgeJson.message);
  } catch (err) {
    console.warn('⚠️ Lỗi xóa cache:', err.message);
  }

  console.log('\n=================================================================');
  console.log('📊 BÁO CÁO TỔNG KẾT TRIỂN KHAI 10 BÀI VIẾT SEO:');
  console.table(results.map(r => ({
    'Khu vực': r.ward,
    'Trạng thái': r.status,
    'Link Live': r.url || r.error
  })));
  console.log('=================================================================\n');
}

run().catch(console.error);
