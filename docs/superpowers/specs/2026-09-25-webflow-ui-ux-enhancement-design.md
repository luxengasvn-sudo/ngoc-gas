# ĐẶC TẢ THIẾT KẾ: HOÀN THIỆN TOÀN DIỆN UI/UX WEBSITE VỆ TINH WEBFLOW (NGỌC GAS)

- **Ngày tạo**: 2026-09-25
- **Mục tiêu**: Hoàn thiện toàn diện giao diện UI/UX và trải nghiệm người dùng trên website Webflow (`https://ngoc-gas.design.webflow.com/` và bản live `https://ngoc-gas.webflow.io/`). Xóa bỏ 100% nội dung tiếng Anh/placeholder của template gốc, chuẩn hóa nhận diện thương hiệu Đại lý Ngọc Gas (Sopet Gas One, Phoenix Gas, Luxen Gas, Hotline 1900 9396, Trụ sở 7 Nguyễn Trung Trực, Dĩ An), và tối ưu hệ thống chuyển đổi / liên kết điều hướng.

---

## 1. Bối Cảnh & Vấn Đề Hiện Tại

Qua rà soát DOM thực tế trên Webflow Designer (`D3E623EEC8E11BBC9BF9A4D9E3760BE4`):
1. **Navbar**: Nút bấm `📞 1900 9396` vẫn chứa liên kết affiliate của template (`#https://webflow.partnerlinks.io/flux-template`), chưa có giao thức `tel:19009396`.
2. **Mục Quy Trình (`#process`)**: Còn tồn tại các nhãn và mô tả tiếng Anh (`Collect Ideas`, `Data Analysis`, `Finalize Product`, `Etiam porta sem...`), các nút bấm mang link hỏng (`https://Xem Chi Tiết`).
3. **Mục Đánh Giá Khách Hàng (`#testimonials`)**: Tên khách hàng vẫn là tiếng Anh mẫu (`Coriss Ambady`, `Georgia Bloom`, `Cory Zamora`...).
4. **Mục Dịch Vụ (`#Services`)**: 5/6 thẻ dịch vụ vẫn là tiếng Anh của template Agency (`Project Management`, `Web Analytics`, `SEO Services`, `Market Research`, `Social Media Management`).
5. **Mục Số Liệu Thực Tế (`#Facts`)**: Nhãn mô tả tiếng Anh (`Customer Satisfaction`, `New Visitors`, lorem ipsum).
6. **Mục Về Ngọc Gas (`#about`)**: 4 thẻ điểm mạnh mang tiêu đề tiếng Anh (`Creativity`, `Inovative Thinking`, `Rapid Solutions`, `Top-Notch Support`).
7. **Mục Bảng Giá Gas (`#pricing`)**: Nút bấm thẻ 1 và 2 chưa trỏ link đúng (`#` hoặc `null`). Câu trả lời FAQ cần chuẩn hóa chi tiết.
8. **Chân Trang (`footer`)**: Còn chứa hàng loạt link rác template (`elemis`, `Webflow`, `info@email.com`, `Template`, `Style Guide`, `404`, `Licensing`, `Our Newsletter`).

---

## 2. Thiết Kế Chi Tiết Từng Phân Khu (Section-by-Section Design)

### 2.1. Header & Thanh Điều Hướng (Navbar)
- **Nút Hotline CTA**:
  - Nhãn hiển thị: `📞 1900 9396`
  - Liên kết: `tel:19009396`
- **Các liên kết Menu**: Đảm bảo trỏ đúng neo phân khu (`#home`, `#process`, `#testimonials`, `#Services`, `#Facts`, `#about`, `#pricing`).

### 2.2. Hero Section
- **Tiêu đề chính**: `NGỌC GAS — GIAO GAS HỎA TỐC 15 PHÚT`
- **Mô tả**: `Đại lý phân phối Sopet Gas One, Phoenix Gas, Luxen Gas chính hãng tại Dĩ An & Bình Dương. Cam kết bình gas đủ ký, kiểm tra an toàn toàn diện.`
- **Nút CTA chính**: `Tra Cứu Bảng Giá Gas Hôm Nay` -> `https://ngocgas.com/gia-gas-hom-nay`.

### 2.3. Quy Trình & Vì Sao Chọn Ngọc Gas (`#process`)
- **Nhãn**: `VÌ SAO CHỌN NGỌC GAS?`
- **Tiêu đề**: `Cam Kết Vàng Từ Đại Lý Gas Chính Hãng Số 1 Dĩ An & Bình Dương`
- **Tab 1**:
  - Tiêu đề: `01. Đặt Gas Nhanh Chóng`
  - Mô tả: `Chỉ cần gọi hotline 1900 9396 hoặc nhắn Zalo, nhân viên tiếp nhận và xử lý đơn ngay lập tức.`
  - Thẻ chi tiết 1: `Bình Gas Chính Hãng 100%` — `Phân phối Sopet Gas One, Phoenix Gas, Luxen Gas có tem chống giả, màng co niêm phong nguyên vẹn.`
  - Nút bấm 1: `Tra Cứu Giá Ngay` trỏ `https://ngocgas.com/gia-gas-hom-nay`
- **Tab 2**:
  - Tiêu đề: `02. Giao Hỏa Tốc 15 Phút`
  - Mô tả: `Đội ngũ giao gas túc trực tại các trạm Dĩ An, Thuận An giao tận nhà chỉ 15 phút.`
  - Thẻ chi tiết 2: `Đủ Cân Tuyệt Đối — Cân Tại Nhà` — `Cam kết hoàn tiền gấp 10 lần nếu phát hiện gas thiếu ký. Khách hàng trực tiếp cân đối chứng trước khi thanh toán.`
  - Nút bấm 2: `Gọi Ngay 1900 9396` trỏ `tel:19009396`
- **Tab 3**:
  - Tiêu đề: `03. Cân Gas & An Toàn`
  - Mô tả: `Cân gas đối chứng đủ 12kg/45kg, kiểm tra rò rỉ bằng bọt xà phòng hoặc máy dò gas chuyên dụng.`
  - Thẻ chi tiết 3: `Bảo Trì & Lắp Đặt Bếp Miễn Phí` — `Kỹ thuật viên vệ sinh bếp gas, kiểm tra van điều áp và dây dẫn an toàn hoàn toàn miễn phí mỗi lần đổi gas.`
  - Nút bấm 3: `Xem Hệ Thống Cửa Hàng` trỏ `https://ngocgas.com/cua-hang`

### 2.4. Đánh Giá Khách Hàng (`#testimonials`)
- **Tiêu đề**: `Hơn 50.000 Hộ Gia Đình & Quán Ăn Tại Bình Dương Tin Chọn Ngọc Gas`
- **Danh sách 6 khách hàng thực tế**:
  1. `Chị Lan Hương (Phường Dĩ An)`: *"Giao gas cực nhanh, chưa tới 15 phút là có. Nhân viên luôn đem cân điện tử cân đối chứng rõ ràng và kiểm tra van bếp rất cẩn thận."*
  2. `Anh Hoàng Minh (Chủ Quán Cơm Thuận An)`: *"Quán ăn dùng gas liên tục, Ngọc Gas cung cấp bình Sopet Gas One lửa xanh đều, tiết kiệm gas và luôn giao kịp giờ cao điểm."*
  3. `Cô Bích Ngọc (KDC Vietsing)`: *"Tôi đổi gas ở đây nhiều năm nay. Bình gas sạch đẹp, có tem niêm phong màng co nguyên vẹn của Luxen Gas, rất an tâm."*
  4. `Bác Thanh Tùng (Tân Đông Hiệp)`: *"Thích nhất là kỹ thuật viên hỗ trợ kiểm tra dây dẫn và vệ sinh bếp gas sạch sẽ mỗi khi giao gas mới. Dịch vụ số 1 Dĩ An!"*
  5. `Chị Mai Phương (Chung Cư Bcons)`: *"Đặt gas qua tổng đài 1900 9396 rất nhanh, giao lên tận căn hộ chung cư đúng hẹn, thanh toán chuyển khoản tiện lợi."*
  6. `Anh Tuấn Kiệt (Bếp Ăn Doanh Nghiệp)`: *"Đội ngũ kỹ thuật hỗ trợ kiểm tra giàn gom gas công nghiệp 45kg định kỳ, hóa đơn chứng từ VAT rõ ràng và đầy đủ."*

### 2.5. Dịch Vụ Cung Cấp (`#Services`)
- **Nhãn**: `DỊCH VỤ NĂNG LƯỢNG TOÀN DIỆN`
- **Tiêu đề**: `Giải Pháp Năng Lượng Gas Toàn Diện Cho Gia Đình & Doanh Nghiệp`
- **Mô tả đoạn văn**: `Ngọc Gas cung cấp giải pháp gas an toàn, tiết kiệm và nhanh chóng nhất cho mọi hộ gia đình, quán ăn và doanh nghiệp sản xuất tại Bình Dương.`
- **6 Thẻ Dịch Vụ Chuyên Nghiệp**:
  1. `Gas Dân Dụng 12kg`: Phân phối chính hãng Sopet Gas One, Phoenix Gas, Luxen Gas bình xám, bình đỏ, bình vàng.
  2. `Gas Công Nghiệp 45kg`: Cung cấp số lượng lớn cho nhà hàng, khách sạn, trường học, bếp ăn công nghiệp.
  3. `Giao Gas Hỏa Tốc 15 Phút`: Đội ngũ giao vận chuyên nghiệp túc trực khắp các phường Dĩ An, Thuận An.
  4. `Kiểm Tra An Toàn & Cân Đối Chứng`: Trang bị cân điện tử và máy dò rò rỉ gas khí tại nhà hoàn toàn miễn phí.
  5. `Bảo Dưỡng Bếp & Thay Phụ Kiện`: Thay thế van điều áp ngắt gas tự động, dây dẫn gas chống chuột cắn chính hãng.
  6. `Thi Công Hệ Thống Gas Trung Tâm`: Tư vấn, thiết kế và lắp đặt hệ thống giàn gom gas công nghiệp đạt chuẩn PCCC.

### 2.6. Cam Kết & Thông Số Thực Tế (`#Facts`)
- **Nhãn**: `CAM KẾT CHẤT LƯỢNG`
- **Tiêu đề**: `An Toàn Của Bạn Là Trách Nhiệm Hàng Đầu Của Ngọc Gas`
- **Thông số 1**: `100%` — `Bình Gas Chính Hãng Có Tem Chống Giả & Niêm Phong Màng Co`
- **Thông số 2**: `15'` (hoặc `15 Phút`) — `Thời Gian Giao Gas Hỏa Tốc Trung Bình Đến Tận Nhà`
- **Đoạn mô tả**: `Ngọc Gas tự hào phục vụ hơn 50.000 hộ gia đình và 1.200 doanh nghiệp với tiêu chuẩn an toàn PCCC tuyệt đối và bảo hiểm trách nhiệm sản phẩm.`

### 2.7. Về Ngọc Gas / Thế Mạnh Cốt Lõi (`#about`)
- **Nhãn**: `ĐỦ CÂN ĐỦ KÝ`
- **Tiêu đề**: `Chất Lượng Vượt Trội — Dịch Vụ Tận Tâm Từng Khách Hàng`
- **4 Thế mạnh cốt lõi**:
  1. `100% Đủ Ký Chuẩn Xác`: Khách hàng kiểm tra cân trực tiếp trước khi thanh toán.
  2. `Thương Hiệu Hàng Đầu`: Đại lý ủy quyền của Sopet Gas One, Phoenix Gas, Luxen Gas.
  3. `Kỹ Thuật Viên Chuyên Nghiệp`: Được đào tạo chứng chỉ an toàn PCCC bài bản.
  4. `Hỗ Trợ 24/7 Hotline 1900 9396`: Tiếp nhận thông tin và xử lý sự cố rò rỉ gas khẩn cấp.

### 2.8. Bảng Giá Gas Hôm Nay & FAQ (`#pricing`)
- **Chuẩn hóa 3 nút bấm Tra cứu giá**:
  - Thẻ 1 (`Sopet Gas One 12kg`): Nút trỏ `https://ngocgas.com/gia-gas-hom-nay`
  - Thẻ 2 (`Phoenix Gas 12kg`): Nút trỏ `https://ngocgas.com/gia-gas-hom-nay`
  - Thẻ 3 (`Luxen Gas 12kg & 45kg`): Nút trỏ `https://ngocgas.com/gia-gas-hom-nay`
- **4 Câu hỏi thường gặp & Câu trả lời chuẩn xác**:
  1. *Ngọc Gas có giao tận nhà tại Dĩ An không?*
     -> Có. Ngọc Gas giao tận nhà miễn phí trong 15 phút tại tất cả các phường thuộc TP. Dĩ An và khu vực lân cận Thuận An.
  2. *Làm sao phân biệt bình gas chính hãng đủ ký?*
     -> Bình gas chính hãng có màng co niêm phong còn nguyên vẹn, tem chống giả của Bộ Công An, và tổng trọng lượng cân nặng bằng đúng: Trọng lượng vỏ (dập trên tai bình) + 12kg nước gas.
  3. *Đổi bình gas khác hãng có mất cọc vỏ không?*
     -> Không. Ngọc Gas thu đổi ngang giá vỏ tất cả các thương hiệu gas phổ biến trên thị trường mà không thu thêm bất kỳ phụ phí nào.
  4. *Hotline đặt gas hỏa tốc là số nào?*
     -> Quý khách gọi ngay Hotline duy nhất `1900 9396` để được phục vụ hỏa tốc 15 phút và nhận quà tặng ưu đãi.

### 2.9. Chân Trang (Footer) Chuẩn Thương Hiệu
- **Tiêu đề**: `ĐẠI LÝ PHÂN PHỐI NGỌC GAS — BÌNH DƯƠNG`
- **Gỡ bỏ toàn bộ liên kết rác template**: `elemis`, `Webflow`, `info@email.com`, `Template`, `Style Guide`, `404`, `Licensing`, `Our Newsletter`.
- **Cấu trúc 3 cột Footer chính**:
  - **Cột 1: Thông Tin Liên Hệ & Trụ Sở**:
    - Trụ sở & Điểm giao gas số 1: `7 Nguyễn Trung Trực, Phường Dĩ An, Tỉnh Bình Dương`
    - Tổng đài đặt gas: `1900 9396`
    - Website: `https://ngocgas.com`
  - **Cột 2: Danh Mục Khám Phá**:
    - Trang Chủ (`#home`)
    - Bảng Giá Gas Hôm Nay (`https://ngocgas.com/gia-gas-hom-nay`)
    - Hệ Thống Cửa Hàng (`https://ngocgas.com/cua-hang`)
    - Vì Sao Chọn Ngọc Gas (`#process`)
    - Dịch Vụ Cung Cấp (`#Services`)
  - **Cột 3: Cam Kết Chất Lượng**:
    - 100% Gas chính hãng: Sopet Gas One, Phoenix Gas, Luxen Gas
    - Cam kết đủ cân đủ ký, cân đối chứng tại nhà
    - Bảo hiểm trách nhiệm PCCC lên đến 2 tỷ đồng

---

## 3. Quy Trình Triển Khai Kỹ Thuật (Implementation Plan)

1. **Kịch bản thực thi CDP**: Viết script Node.js `scripts/perfect-webflow-ui-ux.mjs` kết nối qua Chrome DevTools Protocol vào Webflow Designer:
   - Sửa toàn bộ text các selector trực tiếp trên iframe Canvas (`site-iframe-next`).
   - Cập nhật các liên kết `href` (Hotline `tel:19009396`, Bảng giá `https://ngocgas.com/gia-gas-hom-nay`, Cửa hàng `https://ngocgas.com/cua-hang`).
   - Xóa bỏ/sửa sạch text rác ở Footer.
2. **Kích hoạt Webflow Publish**:
   - Tự động click menu Publish -> `Publish to selected domains`.
   - Đợi 12s cho pipeline CDN của Webflow hoàn tất biên dịch.
3. **Kiểm thử thực nghiệm có bằng chứng (Empirical Verification Protocol)**:
   - Kiểm tra mã phản hồi HTTP 200 từ `https://ngoc-gas.webflow.io/`.
   - Xác nhận sự hiện diện của toàn bộ từ khóa tiếng Việt chính thức.
   - Xác nhận KHÔNG CÒN các từ khóa tiếng Anh rác (`Collect Ideas`, `Data Analysis`, `elemis`, `Style Guide`, `404`, `Licensing`, `Project Management`...).
   - Chụp ảnh màn hình toàn trang live và lưu vào artifact.
