import fs from 'fs';
import path from 'path';

const banners = JSON.parse(fs.readFileSync(path.resolve('scratch/28_new_wards_banner_urls.json'), 'utf8'));

// Helper function để tạo bảng thông số chuẩn công nghiệp
function generateTechTable(wardName) {
  return `
<div style="overflow-x:auto;margin:24px 0;">
  <table style="width:100%;border-collapse:collapse;text-align:left;font-size:14.5px;">
    <thead>
      <tr style="background:#1E40AF;color:#fff;">
        <th style="padding:12px;border:1px solid #1D4ED8;">Thông Số Kỹ Thuật</th>
        <th style="padding:12px;border:1px solid #1D4ED8;">Bình Gas Dân Dụng 12kg (Gia Đình &amp; Phòng Trọ)</th>
        <th style="padding:12px;border:1px solid #1D4ED8;">Bình Gas Công Nghiệp 45kg (Nhà Hàng &amp; Quán Ăn)</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background:#F8FAFC;">
        <td style="padding:10px;border:1px solid #E2E8F0;font-weight:600;">Khối lượng tịnh khí gas nạp (Net Weight)</td>
        <td style="padding:10px;border:1px solid #E2E8F0;color:#059669;font-weight:bold;">12.0 kg ± 0.1 kg</td>
        <td style="padding:10px;border:1px solid #E2E8F0;color:#059669;font-weight:bold;">45.0 kg ± 0.2 kg</td>
      </tr>
      <tr>
        <td style="padding:10px;border:1px solid #E2E8F0;font-weight:600;">Khối lượng vỏ bình (Tare Weight)</td>
        <td style="padding:10px;border:1px solid #E2E8F0;">12.5 kg - 14.0 kg (Dập chìm sắc nét trên quai xách)</td>
        <td style="padding:10px;border:1px solid #E2E8F0;">36.0 kg - 40.0 kg (Dập chìm trên quai xách)</td>
      </tr>
      <tr style="background:#F8FAFC;">
        <td style="padding:10px;border:1px solid #E2E8F0;font-weight:600;">Tổng trọng lượng bình đủ gas (Gross Weight)</td>
        <td style="padding:10px;border:1px solid #E2E8F0;color:#2563EB;font-weight:bold;">24.5 kg - 26.0 kg (Khách kiểm tra trên cân điện tử tận bếp)</td>
        <td style="padding:10px;border:1px solid #E2E8F0;color:#2563EB;font-weight:bold;">81.0 kg - 85.0 kg</td>
      </tr>
      <tr>
        <td style="padding:10px;border:1px solid #E2E8F0;font-weight:600;">Thành phần khí hóa lỏng LPG</td>
        <td style="padding:10px;border:1px solid #E2E8F0;" colspan="2">Hỗn hợp Propane (C3H8) &amp; Butane (C4H10) chuẩn tỷ lệ 30:70 đến 50:50 không tạp chất</td>
      </tr>
      <tr style="background:#F8FAFC;">
        <td style="padding:10px;border:1px solid #E2E8F0;font-weight:600;">Nhiệt trị đốt cháy tiêu chuẩn</td>
        <td style="padding:10px;border:1px solid #E2E8F0;" colspan="2">11.800 - 12.000 kcal/kg (Ngọn lửa xanh biếc, nhiệt độ ngọn lửa đạt trên 1.800°C)</td>
      </tr>
      <tr>
        <td style="padding:10px;border:1px solid #E2E8F0;font-weight:600;">Áp suất kiểm nghiệm thủy lực vỏ bình</td>
        <td style="padding:10px;border:1px solid #E2E8F0;" colspan="2">34 bar (~3.4 MPa) theo tiêu chuẩn TCVN 6292 / JIS G3116 / DOT-4BA</td>
      </tr>
      <tr style="background:#F8FAFC;">
        <td style="padding:10px;border:1px solid #E2E8F0;font-weight:600;">Áp suất làm việc danh định</td>
        <td style="padding:10px;border:1px solid #E2E8F0;" colspan="2">17 bar</td>
      </tr>
      <tr>
        <td style="padding:10px;border:1px solid #E2E8F0;font-weight:600;">Hệ thống van đầu bình</td>
        <td style="padding:10px;border:1px solid #E2E8F0;">Van ngang ren xoay POL hoặc Van chụp Compact (bấm tự động ngắt gas)</td>
        <td style="padding:10px;border:1px solid #E2E8F0;">Van công nghiệp ren ngoài POL chịu áp lực cao</td>
      </tr>
    </tbody>
  </table>
</div>`;
}

// Helper function để tạo phần 3 thương hiệu & 4 màu vỏ
function generateBrandSection(wardName) {
  return `
<h2>3. Đa Dạng 3 Thương Hiệu & 4 Màu Sắc Vỏ Bình Phục Vụ Tại ${wardName}</h2>
<p>
  Nhằm đáp ứng thói quen sử dụng quen thuộc và đồng bộ với thiết kế gian bếp của từng gia đình, Ngọc Gas phân phối đầy đủ các dòng sản phẩm trong danh mục <a href="/san-pham" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">Sản phẩm bình gas chính hãng</a>:
</p>
<ul>
  <li><strong>Luxen Gas (Vỏ xanh dương, vỏ đỏ, vỏ vàng):</strong> Dòng sản phẩm nổi bật với độ tinh khiết cao, ngọn lửa xanh mượt mà không khói muội, bảo vệ tối đa đáy nồi chảo inox đắt tiền. Vỏ bình sơn tĩnh điện chống oxy hóa ẩm ướt, màng co niêm phong nhiệt kép chống hàng giả tuyệt đối.</li>
  <li><strong>Sopet Gas One (Vỏ xám tiêu chuẩn Nhật Bản):</strong> Thương hiệu liên doanh Nhật Bản hàng đầu với công nghệ sản xuất thân vỏ bằng thép SG255 theo tiêu chuẩn JIS G3116. Kết hợp cùng van điều áp Katsura cao cấp, đây là sự lựa chọn an tâm tuyệt đối của cư dân tại các căn hộ gia đình và chung cư cao tầng.</li>
  <li><strong>Phoenix Gas (Vỏ vàng, vỏ xám):</strong> Thương hiệu uy tín lâu năm, ngọn lửa khè mạnh mẽ, nhiệt lượng ổn định, được đông đảo nhà hàng nướng, quán lẩu và cơ sở ẩm thực ưu tiên tin dùng.</li>
  <li><strong>Chính sách đổi ngang vỏ 4 màu (Xám, Đỏ, Xanh, Vàng):</strong> Khách hàng đang sử dụng bất kỳ màu sắc vỏ bình nào (PetroVietNam, Saigon Petro, Petrolimex, TotalGaz, Gia Đình Gas...) đều được <em>đổi ngang vỏ miễn phí 100%</em> sang bình chính hãng của Ngọc Gas mà không phải bù cọc hay trả thêm phí chuyển đổi.</li>
  <li><strong>Bảo hiểm trách nhiệm sản phẩm:</strong> Toàn bộ sản phẩm bình gas do Ngọc Gas phân phối đều có bảo hiểm trách nhiệm sản phẩm đầy đủ theo đúng quy chuẩn PCCC và quy định hiện hành của pháp luật nhà nước.</li>
</ul>`;
}

// Helper function cẩm nang xử lý sự cố & quy trình 4 bước rò rỉ gas
function generateTroubleshootingSection() {
  return `
<h2>4. Cẩm Nang Xử Lý 4 Sự Cố Bếp Gas Thường Gặp & Quy Trình Khẩn Cấp</h2>
<p>
  Đội ngũ kỹ thuật viên Ngọc Gas xin chia sẻ cẩm nang thực tế giúp quý khách hàng tự kiểm tra và khắc phục nhanh những sự cố cơ bản trong quá trình sử dụng:
</p>

<h3>4.1. Bếp bật không cháy, chỉ nghe tiếng xì gas hoặc tiếng tạch tạch yếu ớt</h3>
<p>
  <strong>Nguyên nhân:</strong> Đến 85% là do viên pin IC dưới gầm bếp đã cạn năng lượng sau thời gian dài sử dụng, hoặc đầu kim sứ đánh lửa bị dầu mỡ bắn dính bám bẩn, bị lệch góc phóng tia điện. Một nguyên nhân khác là béc đồng chia gas bị muội than bít kín.<br />
  <strong>Cách xử lý:</strong> Lật đáy bếp thay viên pin đại (Size D) 1.5V mới. Dùng bàn chải khô hoặc tăm bông tẩm cồn lau sạch đầu kim sứ đánh lửa. Nếu vẫn không cháy, hãy gọi hotline Ngọc Gas để thợ hỗ trợ thông béc phun chuyên dụng miễn phí khi giao gas.
</p>

<h3>4.2. Bếp cháy lửa đỏ quạch, khói đen ám bẩn đáy xoong chảo</h3>
<p>
  <strong>Nguyên nhân:</strong> Lượng không khí hòa trộn (oxy) vào buồng đốt bị thiếu do lá chắn gió dưới đáy họng đốt bị lệch, hoặc họng điếu chia lửa bị bụi bẩn, mạng nhện đóng kín.<br />
  <strong>Cách xử lý:</strong> Cúi nhìn phía dưới gầm bếp ngay vị trí cổ họng đốt, bạn sẽ thấy 2 cần gạt lá gió bằng kim loại. Vừa bật bếp vừa nhẹ nhàng xoay gạt cần lá gió để mở rộng khe đón gió cho đến khi ngọn lửa chuyển hẳn sang màu <em>xanh lam trong suốt</em>, hiện tượng muội than đen nồi sẽ biến mất hoàn toàn.
</p>

<h3>4.3. Kẹt núm vặn hoặc phát hiện rò rỉ tại cổ bình gas</h3>
<p>
  <strong>Nguyên nhân:</strong> Gioăng cao su (O-ring) bên trong cổ van bình gas bị chai cứng do thời gian hoặc bị cộm hạt cát bẩn trong quá trình lắp ráp.<br />
  <strong>Cách xử lý:</strong> Khóa chặt van, tháo van điều áp ra kiểm tra vòng đệm cao su tròn ở đầu nối. Dùng nước rửa chén pha loãng tạo bọt quét quanh cổ van và mối nối dây dẫn để thử kín. Nếu thấy bọt xà phòng phồng to liên tục thì tuyệt đối không sử dụng và gọi thợ xử lý ngay.
</p>

<h3>4.4. Quy trình 4 bước khẩn cấp khi phát hiện mùi gas rò rỉ nồng nặc</h3>
<ol style="line-height:1.8;">
  <li><strong>Khóa van bình gas ngay lập tức:</strong> Xoay núm van trên đầu bình theo chiều kim đồng hồ (hoặc gạt chốt khóa đối với van chụp) để lập tức ngắt nguồn khí gas.</li>
  <li><strong>Mở toang tất cả các cửa sổ, cửa chính:</strong> Tạo luồng gió đối lưu tự nhiên để khí gas phân tán ra ngoài (khí gas nặng hơn không khí sẽ chìm sát mặt sàn). Tuyệt đối không bật quạt máy hay quạt hút thông gió.</li>
  <li><strong>TUYỆT ĐỐI KHÔNG BẬT/TẮT BẤT KỲ THIẾT BỊ ĐIỆN NÀO:</strong> Không bật công tắc đèn, không rút phích cắm điện thoại, không bấm chuông cửa, không sử dụng bật lửa hay diêm quẹt. Tia lửa điện li ti phát ra từ công tắc có thể kích nổ khối khí gas tích tụ trong phòng.</li>
  <li><strong>Di chuyển ra khu vực thoáng khí và gọi cứu trợ:</strong> Nhanh chóng đưa mọi người ra ngoài nhà và bấm gọi ngay Hotline tổng đài <a href="tel:19009396" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">1900 9396</a>. Kỹ thuật viên Ngọc Gas với thiết bị dò khí chuyên dụng sẽ có mặt sau 10 phút để xử lý an toàn.</li>
</ol>`;
}

export { generateTechTable, generateBrandSection, generateTroubleshootingSection, banners };
