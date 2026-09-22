import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

function loadEnv() {
  const envPath = path.join(PROJECT_ROOT, '.env.local');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    content.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const idx = trimmed.indexOf('=');
        if (idx > 0) {
          const key = trimmed.slice(0, idx).trim();
          let val = trimmed.slice(idx + 1).trim();
          if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.slice(1, -1);
          }
          if (!process.env[key]) process.env[key] = val;
        }
      }
    });
  }
}

loadEnv();

const AI_PUBLISHER_API_KEY = process.env.AI_PUBLISHER_API_KEY;
const BASE_URL = (process.env.NEXT_PUBLIC_BASE_URL || 'https://ngocgas.com').replace(/\/+$/, '');
const MASTER_PATH = path.join(PROJECT_ROOT, 'data', 'recipes-50-master.json');
const CSV_PATH = path.join(PROJECT_ROOT, 'data', 'Thong-Ke-Mon-An.csv');

// 1. Sao chép ảnh từ thư mục Artifact
const ARTIFACT_IMG = 'C:\\Users\\MKT-LT\\.gemini\\antigravity-ide\\brain\\3212e839-0c27-474d-a727-9549bcc90b32\\dau_hu_chien_sa_ot_1790045453405.jpg';
const LOCAL_UPLOAD_DIR = path.join(PROJECT_ROOT, 'public', 'uploads');
const LOCAL_IMAGE_DIR = path.join(PROJECT_ROOT, 'public', 'images');

if (!fs.existsSync(LOCAL_UPLOAD_DIR)) fs.mkdirSync(LOCAL_UPLOAD_DIR, { recursive: true });
if (!fs.existsSync(LOCAL_IMAGE_DIR)) fs.mkdirSync(LOCAL_IMAGE_DIR, { recursive: true });

const destUploadPath = path.join(LOCAL_UPLOAD_DIR, 'cach-lam-dau-hu-chien-sa-ot-gion-rum.jpg');
const destImagePath = path.join(LOCAL_IMAGE_DIR, 'cach-lam-dau-hu-chien-sa-ot-gion-rum.jpg');

if (fs.existsSync(ARTIFACT_IMG)) {
  fs.copyFileSync(ARTIFACT_IMG, destUploadPath);
  fs.copyFileSync(ARTIFACT_IMG, destImagePath);
  console.log('✅ Đã sao chép ảnh món ăn vào public/uploads và public/images');
}

// 2. Upload ảnh lên máy chủ live để lấy URL upload live
async function uploadImageToLive() {
  if (!fs.existsSync(destUploadPath)) return '/uploads/cach-lam-dau-hu-chien-sa-ot-gion-rum.jpg';
  try {
    const fileBuffer = fs.readFileSync(destUploadPath);
    const blob = new Blob([fileBuffer], { type: 'image/jpeg' });
    const formData = new FormData();
    formData.append('file', blob, 'cach-lam-dau-hu-chien-sa-ot-gion-rum.jpg');

    console.log('📤 Đang upload ảnh món ăn lên máy chủ live...');
    const uploadRes = await fetch(`${BASE_URL}/api/upload`, {
      method: 'POST',
      headers: {
        'x-api-key': AI_PUBLISHER_API_KEY
      },
      body: formData
    });

    const uploadData = await uploadRes.json();
    if (uploadData.url) {
      console.log('🎉 Ảnh đã upload live thành công:', uploadData.url);
      return uploadData.url;
    }
  } catch (err) {
    console.warn('⚠️ Không thể upload live, dùng đường dẫn nội bộ:', err.message);
  }
  return '/uploads/cach-lam-dau-hu-chien-sa-ot-gion-rum.jpg';
}

const title = 'Cách Làm Đậu Hũ Chiên Sả Ớt Giòn Rụm, Thơm Lừng Chuẩn Vị & Bí Quyết Canh Lửa Gas Cực Tiết Kiệm';
const slug = 'cach-lam-dau-hu-chien-sa-ot-gion-rum';
const summary = 'Bí quyết làm đậu hũ chiên sả ớt vàng giòn rụm bên ngoài, mềm béo ngọt lành bên trong, quyện cùng sả ớt phi thơm lừng cay nồng, kết hợp nghệ thuật điều chỉnh 3 nấc lửa gas từ Ngọc Gas giúp tiết kiệm 30% gas và món ăn không ngấm dầu.';

const contentHtml = `<div class="recipe-content-wrapper" style="font-size: 1.05rem; line-height: 1.8; color: #2d3748;">

  <style>
    .recipe-table-desktop {
      display: block;
      width: 100%;
      margin: 20px 0;
    }
    .recipe-cards-mobile {
      display: none;
    }
    .nutrition-table-desktop {
      display: block;
      width: 100%;
      margin: 20px 0;
    }
    .nutrition-cards-mobile {
      display: none;
    }

    @media (max-width: 768px) {
      .recipe-table-desktop {
        display: none !important;
      }
      .recipe-cards-mobile {
        display: flex !important;
        flex-direction: column;
        gap: 12px;
        margin: 16px 0 24px;
      }
      .nutrition-table-desktop {
        display: none !important;
      }
      .nutrition-cards-mobile {
        display: flex !important;
        flex-direction: column;
        gap: 12px;
        margin: 16px 0 24px;
      }
      .table-scroll-hint-pill {
        display: none !important;
      }
    }
  </style>

  <p class="lead" style="font-size: 1.15rem; font-weight: 500; color: #1a202c; border-left: 4px solid #ea580c; padding-left: 16px; margin-bottom: 24px;">
    Trong bản đồ ẩm thực gia đình Việt, <strong>Đậu Hũ Chiên Sả Ớt</strong> là món ăn bình dân nhưng sở hữu sức hút lạ kỳ: từng khối đậu hũ vàng ruộm giòn tan như tan biến nơi đầu lưỡi, bao bọc lấy phần ruột non trắng muốt, béo ngậy thanh tao, hòa quyện trọn vẹn với lớp sả ớt phi thơm lừng óng ánh màu vàng hổ phách, the cay cay nồng ấm và mặn ngọt hài hòa. Dù xuất hiện trong mâm cơm thường nhật hay bữa tiệc chay thanh tịnh, món ăn này luôn là "sát thủ diệt cơm" khiến bất kỳ ai cũng phải xuýt xoa.
  </p>

  <p>
    Tuy nhiên, rất nhiều người nội trợ thường gặp phải các lỗi kinh điển: <em>đậu chiên bị ỉu mềm, hút đẫm dầu ngấy ngán, ruột đậu bị khô xác, hoặc sả ớt chiên cùng lúc bị cháy đen đắng nghét</em>. Bí quyết vàng để làm nên đĩa đậu hũ chiên sả ớt chuẩn vị nhà hàng chính là <strong>kỹ thuật chiên 2 giai đoạn tách rời</strong> kết hợp <strong>nghệ thuật điều chỉnh 3 nấc lửa gas</strong> từ bình gas chính hãng <strong>Ngọc Gas</strong>, giúp lớp vỏ phồng xốp giòn rụm mà không hề ngậm một giọt dầu thừa.
  </p>

  <div style="text-align: center; margin: 32px 0;">
    <img src="/uploads/cach-lam-dau-hu-chien-sa-ot-gion-rum.jpg" alt="Cách Làm Đậu Hũ Chiên Sả Ớt Giòn Rụm Thơm Lừng" style="max-width: 100%; height: auto; border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.12);" />
    <p style="font-size: 0.9rem; color: #718096; margin-top: 8px; font-style: italic;">Đậu hũ chiên sả ớt vàng giòn rụm, thơm nức mùi sả phi và the cay vị ớt hiểm chuẩn vị cơm nhà.</p>
  </div>

  <h2 style="color: #c2410c; border-bottom: 2px solid #fed7aa; padding-bottom: 8px; margin-top: 36px;">1. Chuẩn Bị Nguyên Liệu Chuẩn Vị (Khẩu Phần 4 Người)</h2>
  
  <p>Chìa khóa của món ăn thanh đạm này nằm ở độ tươi mới của từng bìa đậu và độ nồng thơm của sả tươi vừa băm:</p>

  <!-- BẢNG DESKTOP -->
  <div class="recipe-table-desktop">
    <table style="width: 100%; border-collapse: collapse; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
      <thead>
        <tr style="background: #ea580c; color: #fff; text-align: left;">
          <th style="padding: 12px 16px;">Nguyên Liệu</th>
          <th style="padding: 12px 16px;">Định Lượng</th>
          <th style="padding: 12px 16px;">Phân Loại</th>
          <th style="padding: 12px 16px;">Mẹo Chọn Chuẩn Chuyên Gia</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 12px 16px; font-weight: 600;">Đậu hũ trắng (đậu phụ non)</td>
          <td style="padding: 12px 16px;"><span style="background: #ffedd5; color: #9a3412; padding: 4px 8px; border-radius: 4px; font-weight: bold;">4 - 5 bìa (khoảng 500g)</span></td>
          <td style="padding: 12px 16px;">Nguyên liệu chính</td>
          <td style="padding: 12px 16px;">💡 Chọn miếng đậu trắng ngà, cầm nhẹ tay, thơm mùi đậu nành tự nhiên, không chọn loại có thạch cao cứng hoặc bị chua.</td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9; background: #fafafa;">
          <td style="padding: 12px 16px; font-weight: 600;">Sả tươi</td>
          <td style="padding: 12px 16px;"><span style="background: #ffedd5; color: #9a3412; padding: 4px 8px; border-radius: 4px; font-weight: bold;">4 - 5 cây to</span></td>
          <td style="padding: 12px 16px;">Gia vị tạo hương</td>
          <td style="padding: 12px 16px;">💡 Chọn củ sả mập mạp, gốc trắng tím, băm thật nhuyễn để khi phi nhanh vàng đều mà không bị dai.</td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 12px 16px; font-weight: 600;">Ớt hiểm đỏ + Ớt sừng</td>
          <td style="padding: 12px 16px;"><span style="background: #ffedd5; color: #9a3412; padding: 4px 8px; border-radius: 4px; font-weight: bold;">2 trái hiểm + 1 trái sừng</span></td>
          <td style="padding: 12px 16px;">Gia vị cay & màu sắc</td>
          <td style="padding: 12px 16px;">💡 Kết hợp ớt hiểm cay nồng và ớt sừng không cay để tạo màu đỏ bắt mắt trên nền sả vàng.</td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9; background: #fafafa;">
          <td style="padding: 12px 16px; font-weight: 600;">Hành tím & Tỏi cô đơn</td>
          <td style="padding: 12px 16px;"><span style="background: #ffedd5; color: #9a3412; padding: 4px 8px; border-radius: 4px; font-weight: bold;">3 củ hành + 4 tép tỏi</span></td>
          <td style="padding: 12px 16px;">Gia vị khử tanh & kích mùi</td>
          <td style="padding: 12px 16px;">💡 Băm nhuyễn cùng sả để hương thơm cộng hưởng tầng bậc.</td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 12px 16px; font-weight: 600;">Hành lá & Ngò rí</td>
          <td style="padding: 12px 16px;"><span style="background: #ffedd5; color: #9a3412; padding: 4px 8px; border-radius: 4px; font-weight: bold;">2 nhánh</span></td>
          <td style="padding: 12px 16px;">Rau nêm trang trí</td>
          <td style="padding: 12px 16px;">💡 Rửa sạch, thái nhỏ để rắc lên đĩa đậu sau khi hoàn thành.</td>
        </tr>
        <tr style="background: #fafafa;">
          <td style="padding: 12px 16px; font-weight: 600;">Gia vị nêm chuẩn vị</td>
          <td style="padding: 12px 16px;"><span style="background: #ffedd5; color: #9a3412; padding: 4px 8px; border-radius: 4px; font-weight: bold;">Vừa đủ theo công thức</span></td>
          <td style="padding: 12px 16px;">Gia vị tạo sốt</td>
          <td style="padding: 12px 16px;">💡 1.5 muỗng canh nước mắm cốt (hoặc nước tương nếu ăn chay), 1 muỗng cà phê đường, 1/2 muỗng cà phê hạt nêm, 1/2 muỗng tiêu xay, 1/2 muỗng dầu hào.</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- THẺ MOBILE DUAL LAYOUT -->
  <div class="recipe-cards-mobile">
    <div style="background: #fff; border: 1px solid #fed7aa; border-radius: 10px; padding: 14px; box-shadow: 0 2px 6px rgba(0,0,0,0.04);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
        <span style="font-weight: 700; color: #1e293b; font-size: 1.05rem;">Đậu hũ trắng (đậu phụ non)</span>
        <span style="background: #ffedd5; color: #9a3412; padding: 3px 8px; border-radius: 4px; font-weight: 700; font-size: 0.85rem;">4 - 5 bìa (500g)</span>
      </div>
      <p style="margin: 4px 0 0; font-size: 0.88rem; color: #64748b;">💡 Chọn miếng đậu trắng ngà mềm mọng, cầm nhẹ tay, thơm mùi đậu nành tươi.</p>
    </div>

    <div style="background: #fff; border: 1px solid #fed7aa; border-radius: 10px; padding: 14px; box-shadow: 0 2px 6px rgba(0,0,0,0.04);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
        <span style="font-weight: 700; color: #1e293b; font-size: 1.05rem;">Sả tươi băm nhuyễn</span>
        <span style="background: #ffedd5; color: #9a3412; padding: 3px 8px; border-radius: 4px; font-weight: 700; font-size: 0.85rem;">4 - 5 cây to</span>
      </div>
      <p style="margin: 4px 0 0; font-size: 0.88rem; color: #64748b;">💡 Củ sả mập mạp gốc tím, băm thật mịn để khi phi mau vàng giòn.</p>
    </div>

    <div style="background: #fff; border: 1px solid #fed7aa; border-radius: 10px; padding: 14px; box-shadow: 0 2px 6px rgba(0,0,0,0.04);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
        <span style="font-weight: 700; color: #1e293b; font-size: 1.05rem;">Ớt hiểm + Ớt sừng</span>
        <span style="background: #ffedd5; color: #9a3412; padding: 3px 8px; border-radius: 4px; font-weight: 700; font-size: 0.85rem;">3 trái</span>
      </div>
      <p style="margin: 4px 0 0; font-size: 0.88rem; color: #64748b;">💡 Kết hợp ớt cay và ớt sừng ngọt để màu sắc rực rỡ và vừa vặn độ the cay.</p>
    </div>

    <div style="background: #fff; border: 1px solid #fed7aa; border-radius: 10px; padding: 14px; box-shadow: 0 2px 6px rgba(0,0,0,0.04);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
        <span style="font-weight: 700; color: #1e293b; font-size: 1.05rem;">Hành tỏi & Gia vị chuẩn</span>
        <span style="background: #ffedd5; color: #9a3412; padding: 3px 8px; border-radius: 4px; font-weight: 700; font-size: 0.85rem;">Công thức chuẩn vị</span>
      </div>
      <p style="margin: 4px 0 0; font-size: 0.88rem; color: #64748b;">💡 1.5 muỗng nước mắm cốt/nước tương, 1 muỗng đường, 1/2 muỗng tiêu, 1/2 muỗng dầu hào.</p>
    </div>
  </div>

  <h2 style="color: #c2410c; border-bottom: 2px solid #fed7aa; padding-bottom: 8px; margin-top: 36px;">2. Quy Trình Chế Biến Chi Tiết 4 Bước Chuẩn Bếp Trưởng</h2>

  <h3 style="color: #ea580c;">Bước 1: Sơ Chế Và Làm Khô Đậu Hũ (Bí Quyết Vỏ Giòn Không Bắn Dầu)</h3>
  <p>
    Đậu hũ mua về rửa nhẹ dưới vòi nước lạnh, sau đó dùng khăn giấy chuyên dụng hoặc khăn bông sạch thấm thật khô ráo toàn bộ bề mặt bìa đậu. Đây là khâu cực kỳ then chốt: <strong>nếu đậu còn ướt nước, khi thả vào chảo dầu sôi sẽ gây bắn dầu tung tóe và khiến vỏ ngoài bị mềm nhão, không giòn</strong>.
  </p>
  <p>
    Cắt đậu hũ thành từng khối vuông quân cờ vừa ăn (kích thước khoảng 2.5cm x 2.5cm). Không nên cắt quá mỏng vì ruột đậu sẽ bị khô xác khi chiên, cũng không nên cắt quá to khiến gia vị khó ngấm đều.
  </p>

  <h3 style="color: #ea580c;">Bước 2: Nghệ Thuật Canh Lửa Gas Chiên Đậu Vàng Giòn Rụm</h3>
  <p>
    Đặt chảo sâu lòng lên bếp gas. Rót dầu ăn vào ngập khoảng 1/2 miếng đậu (khoảng 150ml - 200ml dầu).
  </p>
  <ul>
    <li><strong>Nấc lửa 1 (Làm nóng dầu đạt 170°C):</strong> Bật bếp ở mức <em>Lửa Vừa (Medium)</em>. Nhúng đầu đũa gỗ vào đáy chảo, khi thấy bọt khí sủi tăm tăm li ti quanh đầu đũa là dầu đã đạt nhiệt độ chuẩn để chiên.</li>
    <li><strong>Nấc lửa 2 (Se vỏ và giòn rụm):</strong> Thả từng khối đậu vào nhẹ nhàng. Giữ ngọn lửa xanh đều đặn ôm trọn đáy chảo. Lớp vỏ đậu gặp nhiệt độ cao sẽ se lại lập tức, tạo thành màng bảo vệ giòn xốp khóa kín hơi ẩm bên trong và ngăn dầu hút ngược vào ruột. Chiên khoảng 4 - 5 phút cho đến khi các mặt đậu ngả màu vàng cánh gián óng ả.</li>
    <li><strong>Vớt ra ráo dầu:</strong> Gắp đậu hũ ra rổ inox có lót giấy thấm dầu. Miếng đậu lúc này sẽ phồng căng, lớp vỏ giòn rụm nhưng ruột bên trong vẫn mềm mọng như thạch.</li>
  </ul>

  <h3 style="color: #ea580c;">Bước 3: Phi Sả Ớt Vàng Rượm & Hòa Quyện Sốt Đậm Đà</h3>
  <p>
    Chắt bớt dầu trong chảo ra, chỉ để lại khoảng 1 muỗng canh dầu ăn.
  </p>
  <ul>
    <li><strong>Nấc lửa 3 (Lửa nhỏ liu riu 120°C):</strong> Hạ lửa gas về mức <em>Lửa Nhỏ Liu Riu</em>. Cho hành tím và tỏi băm vào phi thơm trong 20 giây, tiếp tục trút toàn bộ sả băm và ớt vào đảo đều tay liên tục.</li>
    <li>Nêm vào hỗn hợp gia vị: 1.5 muỗng canh nước mắm ngon (hoặc nước tương chay), 1 muỗng cà phê đường, 1/2 muỗng cà phê hạt nêm và 1/2 muỗng cà phê dầu hào. Đảo đều để gia vị tan chảy và hòa quyện thành lớp sốt sả ớt sền sệt, dậy mùi thơm nức mũi.</li>
    <li><strong>Mẹo vàng tránh cháy sả:</strong> Khi sả chuyển sang màu vàng rơm nhạt, hãy tắt bếp ngay lập tức. Nhiệt lượng dư thừa tích tụ trên chảo sẽ giúp sả tiếp tục chín vàng ruộm giòn tan mà không bị cháy đen đắng nghét.</li>
  </ul>

  <h3 style="color: #ea580c;">Bước 4: Xóc Đều Và Hoàn Thiện Món Ăn</h3>
  <p>
    Trút toàn bộ phần đậu hũ đã chiên giòn vào chảo sả ớt còn nóng ấm. Bật bếp mức lửa nhỏ nhất, dùng vá đảo xóc thật nhanh tay trong vòng 45 - 60 giây để từng hạt sả ớt chiên giòn và gia vị mặn ngọt bám đều một lớp óng ả quanh bề mặt từng khối đậu. Rắc thêm hành lá thái nhỏ và tiêu xay rồi trút ra đĩa thưởng thức ngay khi còn nóng hổi.
  </p>

  <!-- CALLOUT BOX ĐỘC QUYỀN TỪ NGỌC GAS -->
  <div style="background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%); border-left: 5px solid #ea580c; border-radius: 12px; padding: 20px 24px; margin: 32px 0; box-shadow: 0 4px 12px rgba(234, 88, 12, 0.08);">
    <h3 style="margin-top: 0; color: #c2410c; display: flex; align-items: center; gap: 8px;">
      🔥 Nghệ Thuật Căn Lửa Bếp Gas & Mẹo Tiết Kiệm 30% Gas Từ Chuyên Gia Ngọc Gas
    </h3>
    <p style="margin-bottom: 12px;">
      Chiên đậu hũ tưởng chừng đơn giản nhưng lại là bài kiểm tra độ ổn định của áp suất gas chính xác nhất. Khi chiên ngập dầu ở nhiệt độ cao, nếu áp suất gas phập phù (ngọn lửa đỏ, cháy bập bùng), dầu sẽ bị tụt nhiệt độ khiến đậu hút ngược dầu mỡ ngấy ngán và gây hao gas gấp đôi.
    </p>
    <ul style="margin: 0; padding-left: 20px; color: #431407;">
      <li><strong>Ngọn lửa xanh thuần khiết:</strong> Sử dụng bình gas chính hãng phân phối từ <strong>Ngọc Gas</strong> (Sopet Gas One, Luxen Gas, Phoenix Gas) đảm bảo nhiệt trị chuẩn 11.800 kcal/kg, giúp dầu sôi đều tức thì và giữ nhiệt chuẩn xác.</li>
      <li><strong>Tận dụng nhiệt tích hợp:</strong> Sau khi chiên đậu xong, tắt bếp sớm 2 phút và tận dụng nhiệt tích tụ trong chảo để phi vàng sả ớt, giúp tiết kiệm đến 30% lượng gas tiêu thụ cho mỗi lần nấu.</li>
      <li><strong>An toàn tuyệt đối:</strong> Hệ thống van ngắt tự động (Compact / POL) giúp phòng ngừa triệt để sự cố tụt áp hay bùng lửa khi nấu ăn nhiệt độ cao.</li>
    </ul>
    <div style="margin-top: 16px; padding-top: 12px; border-top: 1px dashed #fdba74; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
      <span style="font-weight: bold; color: #9a3412;">📞 Tổng đài giao gas nhanh 15 phút tại Bình Dương: <a href="tel:19009396" style="color: #ea580c; text-decoration: none;">1900 9396</a></span>
      <a href="/gia-gas-hom-nay" style="background: #ea580c; color: #fff; padding: 6px 14px; border-radius: 6px; font-weight: bold; text-decoration: none; font-size: 0.9rem;">Tra Cứu Bảng Giá Gas Hôm Nay</a>
    </div>
  </div>

  <h2 style="color: #c2410c; border-bottom: 2px solid #fed7aa; padding-bottom: 8px; margin-top: 36px;">3. Giá Trị Dinh Dưỡng Của Đậu Hũ Chiên Sả Ớt</h2>
  
  <p>Đậu hũ là nguồn cung cấp đạm thực vật (protein) hoàn hảo, ít chất béo bão hòa, giàu canxi và isoflavone tốt cho tim mạch và sức khỏe làn da:</p>

  <!-- BẢNG DINH DƯỠNG DESKTOP -->
  <div class="nutrition-table-desktop">
    <table style="width: 100%; border-collapse: collapse; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
      <thead>
        <tr style="background: #0284c7; color: #fff; text-align: left;">
          <th style="padding: 12px 16px;">Chỉ Số Dinh Dưỡng</th>
          <th style="padding: 12px 16px;">Hàm Lượng (Khẩu Phần 100g)</th>
          <th style="padding: 12px 16px;">Tỷ Lệ Đáp Ứng Hàng Ngày (% DV)</th>
          <th style="padding: 12px 16px;">Lợi Ích Sức Khỏe</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 12px 16px; font-weight: 600;">Năng lượng (Calories)</td>
          <td style="padding: 12px 16px;"><span style="background: #e0f2fe; color: #0369a1; padding: 4px 8px; border-radius: 4px; font-weight: bold;">175 kcal</span></td>
          <td style="padding: 12px 16px;">9%</td>
          <td style="padding: 12px 16px;">Mức năng lượng vừa vặn, không gây tích tụ mỡ thừa.</td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9; background: #fafafa;">
          <td style="padding: 12px 16px; font-weight: 600;">Chất đạm (Protein thực vật)</td>
          <td style="padding: 12px 16px;"><span style="background: #e0f2fe; color: #0369a1; padding: 4px 8px; border-radius: 4px; font-weight: bold;">12.8 g</span></td>
          <td style="padding: 12px 16px;">26%</td>
          <td style="padding: 12px 16px;">Hỗ trợ phát triển và phục hồi khối cơ bắp săn chắc.</td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 12px 16px; font-weight: 600;">Canxi hữu cơ</td>
          <td style="padding: 12px 16px;"><span style="background: #e0f2fe; color: #0369a1; padding: 4px 8px; border-radius: 4px; font-weight: bold;">280 mg</span></td>
          <td style="padding: 12px 16px;">28%</td>
          <td style="padding: 12px 16px;">Tăng cường mật độ xương và bảo vệ răng chắc khỏe.</td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9; background: #fafafa;">
          <td style="padding: 12px 16px; font-weight: 600;">Tinh dầu Sả & Capsaicin</td>
          <td style="padding: 12px 16px;"><span style="background: #e0f2fe; color: #0369a1; padding: 4px 8px; border-radius: 4px; font-weight: bold;">Dồi dào</span></td>
          <td style="padding: 12px 16px;">-</td>
          <td style="padding: 12px 16px;">Kích thích tiêu hóa, giải cảm, làm ấm bụng và kháng viêm tự nhiên.</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- THẺ DINH DƯỠNG MOBILE DUAL LAYOUT -->
  <div class="nutrition-cards-mobile">
    <div style="background: #fff; border: 1px solid #bae6fd; border-radius: 10px; padding: 14px; box-shadow: 0 2px 6px rgba(0,0,0,0.04);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
        <span style="font-weight: 700; color: #0f172a; font-size: 1.05rem;">Calories (Năng Lượng)</span>
        <span style="background: #e0f2fe; color: #0369a1; padding: 3px 8px; border-radius: 4px; font-weight: 700; font-size: 0.85rem;">175 kcal / 100g</span>
      </div>
      <p style="margin: 4px 0 0; font-size: 0.88rem; color: #64748b;">Thanh đạm, nhẹ bụng, phù hợp cả ăn chay lẫn ăn kiêng.</p>
    </div>

    <div style="background: #fff; border: 1px solid #bae6fd; border-radius: 10px; padding: 14px; box-shadow: 0 2px 6px rgba(0,0,0,0.04);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
        <span style="font-weight: 700; color: #0f172a; font-size: 1.05rem;">Đạm Thực Vật & Canxi</span>
        <span style="background: #e0f2fe; color: #0369a1; padding: 3px 8px; border-radius: 4px; font-weight: 700; font-size: 0.85rem;">12.8g Đạm + 280mg Ca</span>
      </div>
      <p style="margin: 4px 0 0; font-size: 0.88rem; color: #64748b;">Nguồn protein lành tính dồi dào, chắc khỏe xương khớp.</p>
    </div>
  </div>

  <h2 style="color: #c2410c; border-bottom: 2px solid #fed7aa; padding-bottom: 8px; margin-top: 36px;">4. Câu Hỏi Thường Gặp Khi Làm Đậu Hũ Chiên Sả Ớt (FAQ)</h2>

  <div style="margin-top: 16px;">
    <h4 style="color: #1e293b; margin-bottom: 4px;">❓ Làm sao để chiên đậu hũ không bị dính chảo và không bắn dầu?</h4>
    <p style="color: #475569; margin-top: 0;">
      👉 Hãy đảm bảo thấm khô 100% nước trên bìa đậu trước khi chiên. Làm nóng chảo trước khi rót dầu, và chỉ thả đậu vào khi dầu đã sôi sủi tăm. Không lật trở đậu quá sớm, hãy đợi mặt dưới se vàng giòn tự tách khỏi chảo rồi mới lật mặt tiếp theo.
    </p>

    <h4 style="color: #1e293b; margin-bottom: 4px;">❓ Món này ăn kèm với gì là chuẩn vị nhất?</h4>
    <p style="color: #475569; margin-top: 0;">
      👉 Đậu hũ chiên sả ớt ngon nhất khi ăn cùng cơm trắng nóng hổi, kèm dưa leo giòn mát, cà chua thái lát hoặc một tô canh rau mồng tơi/canh cải ngọt thanh đạm.
    </p>

    <h4 style="color: #1e293b; margin-bottom: 4px;">❓ Đang nấu ăn mà hết gas thì gọi Ngọc Gas bao lâu có mặt?</h4>
    <p style="color: #475569; margin-top: 0;">
      👉 Với hệ thống trạm giao phân bổ đều tại Dĩ An và Thuận An, nhân viên Ngọc Gas sẽ có mặt tận bếp nhà bạn trong vòng <strong>10 - 15 phút</strong>. Thợ mang cân điện tử cân đối trọng trước mặt khách, tháo dép văn minh, kiểm tra an toàn van dây miễn phí trước khi bàn giao.
    </p>
  </div>

  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-top: 36px; text-align: center;">
    <h3 style="color: #0f172a; margin-top: 0;">🔥 HỆ THỐNG GIAO GAS CHÍNH HÃNG NGỌC GAS BÌNH DƯƠNG</h3>
    <p style="color: #475569; margin-bottom: 12px;">Chuyên phân phối bình gas 12kg & 45kg thương hiệu <strong>Sopet Gas One, Luxen Gas, Phoenix Gas</strong> đủ cân đủ ký 100%.</p>
    <p style="margin: 4px 0;">📍 <strong>Trụ sở chính:</strong> 7 Nguyễn Trung Trực, Phường Dĩ An, TP. Dĩ An, Tỉnh Bình Dương</p>
    <p style="margin: 4px 0;">📍 <strong>Chi nhánh Cây Da:</strong> 7/14 Đường Cây Da, P. Tân Đông Hiệp, TP. Dĩ An</p>
    <p style="margin: 4px 0;">📍 <strong>Chi nhánh KDC VietSing:</strong> Kiot 5, Đường D5, P. An Phú, TP. Thuận An</p>
    <p style="font-size: 1.25rem; font-weight: bold; color: #ea580c; margin-top: 12px;">Hotline Đặt Gas 24/7: 1900 9396</p>
  </div>

</div>`;

async function publishPost() {
  console.log('🚀 BẮT ĐẦU QUY TRÌNH XUẤT BẢN BÀI VIẾT: ĐẬU HŨ CHIÊN SẢ ỚT');

  const liveImageUrl = await uploadImageToLive();

  const postPayload = {
    title,
    slug,
    category: 'mon-an',
    summary,
    content: contentHtml,
    image_url: liveImageUrl,
    is_published: 1
  };

  console.log('📡 Đang gửi dữ liệu bài viết qua POST /api/posts...');
  const res = await fetch(`${BASE_URL}/api/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': AI_PUBLISHER_API_KEY
    },
    body: JSON.stringify(postPayload)
  });

  const postData = await res.json();
  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${JSON.stringify(postData)}`);
  }

  const liveUrl = `${BASE_URL}/mon-an/${slug}`;
  console.log(`✅ Xuất bản thành công! ID: ${postData.id || postData.post_id || 'OK'}`);
  console.log(`🔗 Link bài viết trực tiếp: ${liveUrl}`);

  // Revalidate cache
  try {
    const cRes = await fetch(`${BASE_URL}/api/cache`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': AI_PUBLISHER_API_KEY
      },
      body: JSON.stringify({ category: 'posts' })
    });
    console.log('🔄 Revalidate cache status:', cRes.status);
  } catch (e) {
    console.warn('⚠️ Lỗi revalidate cache:', e.message);
  }

  // Cập nhật data/recipes-50-master.json nếu có món này
  const todayFormatted = `${String(new Date().getDate()).padStart(2, '0')}/${String(new Date().getMonth() + 1).padStart(2, '0')}/${new Date().getFullYear()}`;
  if (fs.existsSync(MASTER_PATH)) {
    try {
      const master = JSON.parse(fs.readFileSync(MASTER_PATH, 'utf8'));
      // Thêm hoặc cập nhật vào master
      let item = master.find(d => d.slug === slug || d.name.includes('Đậu hũ'));
      if (!item) {
        // Thêm mới món số 51 hoặc món mới
        const nextStt = master.length + 1;
        item = {
          stt: nextStt,
          name: 'Đậu hũ chiên sả ớt',
          category: 'Món chay / Đậu hũ',
          description: summary,
          status: '🟢 Đã Xuất Bản',
          slug: slug,
          url: liveUrl,
          completed_at: todayFormatted,
          image_url: liveImageUrl
        };
        master.push(item);
      } else {
        item.status = '🟢 Đã Xuất Bản';
        item.slug = slug;
        item.url = liveUrl;
        item.completed_at = todayFormatted;
        item.image_url = liveImageUrl;
      }
      fs.writeFileSync(MASTER_PATH, JSON.stringify(master, null, 2), 'utf8');
      console.log('📋 Đã cập nhật data/recipes-50-master.json!');
    } catch (e) {
      console.warn('⚠️ Lỗi master json:', e.message);
    }
  }

  // KÍCH HOẠT CỖ MÁY PHÂN PHỐI ĐA KÊNH ENTITY
  try {
    console.log('\n🚀 KÍCH HOẠT QUY TRÌNH SYNDICATION ĐA TẦNG LÊN TOÀN BỘ ENTITY...');
    execSync(`node scripts/syndicate-post.mjs ${slug}`, { stdio: 'inherit' });
  } catch (synErr) {
    console.warn('⚠️ Lỗi syndication:', synErr.message);
  }

  // ĐỒNG BỘ CSV THỐNG KÊ
  try {
    console.log('\n📊 ĐANG ĐỒNG BỘ CSV VÀ LINK VỆ TINH...');
    execSync(`node scripts/sync-food-csv.mjs`, { stdio: 'inherit' });
  } catch (csvErr) {
    console.warn('⚠️ Lỗi sync CSV:', csvErr.message);
  }

  console.log('\n🎉 HOÀN TẤT TOÀN BỘ QUY TRÌNH XUẤT BẢN & PHÂN PHỐI ENTITY CHO ĐẬU HŨ CHIÊN SẢ ỚT!');
}

publishPost().catch(err => {
  console.error('💥 LỖI XUẤT BẢN:', err);
  process.exit(1);
});
