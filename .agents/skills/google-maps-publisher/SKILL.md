---
name: google-maps-publisher
description: Quy trình và tiêu chuẩn tự động đăng bài cập nhật (tin tức, ưu đãi, thông báo biến động thị trường) lên "Doanh nghiệp của bạn trên Google" (Google Business Profile / Google Maps) cho 3 địa điểm của Ngọc Gas qua browser subagent.
---

# 📍 Google Maps Publisher Skill (Ngọc Gas)

Kỹ năng chuyên biệt hướng dẫn Agent cách tự động hóa quy trình đăng bài cập nhật, thông báo ưu đãi và tin tức thị trường trực tiếp lên hệ thống **Google Business Profile (Google Maps)** cho toàn bộ **3 địa điểm kinh doanh** của Ngọc Gas.

---

## 📌 1. Khi Nào Kích Hoạt Kỹ Năng Này (Trigger Conditions)

Kích hoạt ngay khi người dùng yêu cầu:
- *"Đăng google map"*, *"Cập nhật google map"*
- *"Đăng bài lên google business"*, *"Post bài google map"*
- *"Cập nhật cho 3 địa điểm google map của Ngọc Gas"*
- *"Thông báo lên map"*, *"Đăng tin lên profile doanh nghiệp"*

---

## 🏢 2. Danh Sách 3 Địa Điểm Chính Thức Của Ngọc Gas Trên Google Maps

Hệ thống quản lý Google Business Profile của Ngọc Gas hiện liên kết quản lý 3 địa điểm:

1. **Ngọc Gas - Giao gas nhanh chính hãng - Dĩ An** *(Trụ sở chính)*
   - Địa chỉ: `7 Nguyễn Trung Trực, Phường Dĩ An, TP. Dĩ An, Tỉnh Bình Dương`
2. **Cửa hàng Ngọc Gas - Đường D5 An Phú (Cửa hàng Gas Vietsing Visip)**
   - Địa chỉ: `Kiot 5, Nhà Ô 6 DC7, tổ 20, Kp4, Đường D5, P. An Phú, TP. Thuận An, Bình Dương`
3. **Ngọc Gas - Giao gas nhanh chính hãng - Cây Da**
   - Địa chỉ: `7/14 Đường Cây Da, KP. Tân Phú 1, Phường Tân Đông Hiệp, TP. Dĩ An, Bình Dương`

---

## 🤖 3. Quy Trình Tự Động Hóa 6 Bước Qua `browser_subagent`

Khi nhận lệnh đăng bài, Agent BẮT BUỘC sử dụng công cụ `browser_subagent` với quy trình chuẩn 6 bước:

### Bước 1: Mở Trang Quản Lý Doanh Nghiệp Trên Google Search
- Điều hướng trình duyệt tới trang tìm kiếm Google với từ khóa:
  `Ngọc Gas - Giao gas nhanh chính hãng - Dĩ An`
- Tìm khối quản lý **"Doanh nghiệp của bạn trên Google"** *(Your business on Google)*.

### Bước 2: Kích Hoạt Modal "Thêm thông tin cập nhật"
- Click vào nút hành động:
  - **`Thêm thông tin cập nhật`** *(Add update)* hoặc biểu tượng loa thông báo.
  - Chọn tiếp mục **`Thêm thông tin cập nhật`** *(Thêm bài viết tin tức/thông báo thông thường)* hoặc **`Thêm ưu đãi`** *(nếu có giảm giá/khuyến mãi giới hạn thời gian)*.

### Bước 3: Tải Ảnh Minh Họa Chuẩn Nhận Diện
- Sử dụng ảnh do người dùng cung cấp (nằm trong thư mục `.user_uploaded/` hoặc đường dẫn ảnh sản phẩm/banner).
- Click vào ô **`Thêm ảnh`** hoặc kéo thả file ảnh vào modal tải lên.
- Đảm bảo ảnh tải lên thành công và hiển thị khung preview trước khi nhập văn bản.

### Bước 4: Soạn Thảo Nội Dung Đạt Chuẩn Nhận Diện Thương Hiệu
Nội dung bài đăng Google Maps cần ngắn gọn, trực diện, nhấn mạnh lợi ích và độ tin cậy:
- **Tiêu đề / Đoạn mở đầu**: Nêu rõ thông điệp chính (Biến động thị trường, Cam kết nguồn cung, Ưu đãi đổi gas...).
- **Giá trị cốt lõi**:
  - Cam kết bình gas chính hãng: `Sopet Gas One`, `Luxen Gas`, `Phoenix Gas`.
  - Cân đủ ký 100% bằng cân điện tử tại bếp nhà khách.
  - An toàn PCCC, kiểm tra van dây miễn phí.
  - Tốc độ giao hỏa tốc 10 – 15 phút.
- **Hotline chuẩn mực duy nhất**: `1900 9396` (hoặc `19009396`). Tuyệt đối không dùng số điện thoại cá nhân.
- **Link điều hướng**: Kèm link xem chi tiết (ví dụ: `https://ngocgas.com/gia-gas-hom-nay` hoặc `https://ngocgas.com`).

### Bước 5: Cấu Hình Nút Kêu Gọi Hành Động (CTA)
- Tại mục **`Thêm nút (không bắt buộc)`**, click chọn:
  - **`Tìm hiểu thêm`** (Learn more) hoặc **`Đặt hàng`** (Order) hoặc **`Gọi ngay`** (Call now).
- Nếu chọn *Tìm hiểu thêm / Đặt hàng*: Gắn link đích chính xác:
  `https://ngocgas.com/gia-gas-hom-nay` hoặc `https://ngocgas.com`.

### Bước 6: Đăng Đồng Loạt Cho Toàn Bộ 3 Địa Điểm
- Trong modal đăng bài của Google Business Profile, tìm mục:
  **`Đăng lên các địa điểm khác`** hoặc checkbox **`Chọn tất cả các địa điểm khác`**.
- Tích chọn đồng loạt cả 3 địa điểm:
  1. *Ngọc Gas - Giao gas nhanh chính hãng - Dĩ An*
  2. *Cửa hàng Ngọc Gas - Đường D5 An Phú*
  3. *Ngọc Gas - Giao gas nhanh chính hãng - Cây Da*
- Click nút **`Đăng`** *(Post / Publish)*.
- Chờ hệ thống xử lý (khoảng 3 – 5 giây) cho tới khi xuất hiện thông báo xác nhận thành công.

---

## 📸 4. Quy Chuẩn Xác Minh & Bằng Chứng Bắt Buộc (Verification Protocol)

Theo **Quy tắc 5 & 9 trong `AGENTS.md`**:
1. **Chụp ảnh màn hình**: Sau khi đăng thành công, `browser_subagent` BẮT BUỘC chụp màn hình thông báo hoàn tất hoặc danh sách bài đăng đã duyệt, lưu vào artifact directory.
2. **Báo cáo rõ ràng**: Liệt kê đích danh 3 địa điểm đã được xuất bản kèm nội dung và liên kết nút CTA.
