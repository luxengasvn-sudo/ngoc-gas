# Kế Hoạch Tinh Chỉnh Giao Diện (Fix UI) Chuẩn 1:1 Theo TinhThanhVN.com

> [!IMPORTANT]
> **MỤC TIÊU**: Chuyển đổi toàn bộ phong cách giao diện từ Dark Mode sang giao diện **Sáng - Sang Trọng - Chuẩn Xác 1:1** như trang gốc `tinhthanhvn.com/province/ho-chi-minh/phuong-di-an`, giữ nguyên 100% tính năng bản đồ OpenStreetMap và dữ liệu địa giới, tiện ích công cộng.

---

## 🎨 1. Chi Tiết Thay Đổi Thiết Kế UI Giống Hệt TinhThanh

### 1.1. Nền & Màu Sắc Tổng Thể (Background & Theme)
- **Hiện tại**: Nền tối đen `slate-950/900`, thẻ đen.
- **Sau khi chỉnh (Chuẩn TinhThanh)**: 
  - Nền trang chính: `bg-gradient-to-br from-sky-50 via-white to-sky-100/50` với hoa văn lưới tinh tế.
  - Thẻ nội dung: Nền trắng tinh khiết `bg-white`, viền mờ `border-slate-200`, đổ bóng nhẹ `shadow-sm`, bo góc tròn `rounded-2xl`.

### 1.2. Khối Hero Banner Đô Thị (Cover Picture + Glassmorphism Cards)
- **Cover Image Banner**: Chiều cao `380px - 460px`, viền `border-2 border-white rounded-2xl shadow-xl overflow-hidden relative`.
- **Thẻ Glassmorphism Góc Trên Trái (Title Card)**:
  - `bg-white/80 backdrop-blur-md border border-white rounded-xl shadow-lg p-3 lg:p-4`.
  - Icon ghim bản đồ màu cam `text-orange-700`.
  - Tiêu đề H1: `phường Dĩ An` (`text-2xl lg:text-4xl font-extrabold text-orange-700 capitalize`).
  - Dòng phụ: `TP Hồ Chí Minh • Thành phố Dĩ An (cũ)` với liên kết màu xanh dương `text-blue-700`.
- **Thẻ Glassmorphism Góc Trên Phải (Ward Code)**:
  - `Mã phường: #25942` kèm icon địa cầu (`text-orange-700 font-black text-lg`).
- **Thẻ Glassmorphism Góc Dưới Trái (Merge Units)**:
  - `Sáp nhập từ 3 đơn vị:` kèm icon Merge màu xanh.
  - Danh sách badge: `Phường An Bình`, `Phường Dĩ An`, `Phường Tân Đông Hiệp` (`bg-amber-100 text-orange-700 border-amber-300 font-semibold px-3 py-1 rounded-lg text-xs`).
- **Góc Dưới Phải (Action Buttons)**:
  - Nút `CHỈ ĐƯỜNG tới UBND phường Dĩ An` (gradient cam-vàng `from-orange-500 via-amber-500 to-yellow-400 text-white font-black px-6 py-3 rounded-xl shadow-lg uppercase text-xs`).
  - Nút `Xem Bản Đồ Số`.

### 1.3. Khối 4 Thẻ Thống Kê Nổi Bật (4 Colorful Stat Cards)
- Khối `Thống kê phường Dĩ An` gồm 4 thẻ màu pastel chuẩn TinhThanh:
  1. 🟩 **Diện tích**: Thẻ xanh lá `bg-green-100 border-gray-100`, icon box `bg-green-500 text-white`, số liệu: `21.38 km²`.
  2. 🟪 **Dân số (2026)**: Thẻ hồng phấn `bg-pink-100 border-gray-100`, icon box `bg-pink-500 text-white`, số liệu: `227.817 người`.
  3. 🟧 **Mật độ dân số**: Thẻ cam `bg-orange-100 border-gray-100`, icon box `bg-orange-500 text-white`, số liệu: `10.656 người/km²`.
  4. 🟦 **Đơn vị sáp nhập**: Thẻ xanh dương `bg-blue-100 border-gray-100`, icon box `bg-blue-500 text-white`, số liệu: `3 đơn vị`.

### 1.4. Khối Bài Viết "Thông Tin Phường Dĩ An"
- Header thẻ gradient: `from-orange-500 via-amber-500 to-yellow-400 text-white p-4 rounded-t-xl` kèm hoa văn SVG grid và icon `lucide-map-pin-house`.
- Bảng thông tin chi tiết:
  - Trụ sở UBND: `10 Trung tâm hành chính, phường Dĩ An...` (kèm nút chỉ đường).
  - Trụ sở Công An: `Số 57 Tuyến Phố An Ninh, phường Dĩ An...` (trực ban 24/7, hotline 113).
  - Biển số xe: `61, 50 - 59`.
  - Mã bưu chính: `75306 / 820000`.
  - Tọa độ địa lý: `10.9034°B, 106.759°Đ`.

### 1.5. Khối Bản Đồ Số OpenStreetMap
- Header: `Bản Đồ Số phường Dĩ An - thành phố Hồ Chí Minh`.
- Iframe OpenStreetMap nhúng trực tiếp layer Mapnik toàn cầu với viền xám mềm, bo góc dưới `rounded-b-xl`.
- Footer: `Bản đồ số hiện đang trong quá trình hoàn thiện. Nguồn: OpenStreetMap (https://nominatim.openstreetmap.org/)` kèm link relation OSM và nút chỉ đường.

### 1.6. Khối "Khám Phá Bản Đồ Số & Dịch Vụ Tiện Ích"
- Viền gradient viền mỏng 2px `from-orange-500 via-amber-500 to-yellow-400`.
- Nút lớn `Xem Bản Đồ Tiện Ích phường Dĩ An`.
- Lưới các thẻ tiện ích: Y tế, Trường học, Bưu điện, Cây xăng & Điểm Giao Gas Ngọc Gas 15 phút, Chợ / Siêu thị, Căn hộ / Chung cư.

### 1.7. Các Khối Còn Lại
- **Dân số & Biểu đồ mật độ**: Phân tích quy mô cư dân, đối soát chuẩn NQ 112.
- **Định hướng phát triển 2026 - 2030**: Tầm nhìn hạ tầng & chuyển đổi số.
- **Cổng thông tin & Cổng dịch vụ công**: 4 thủ tục cốt lõi (Cư trú, Sổ đỏ, Biển số xe, Hộ tịch).
- **Giải đáp nhanh (FAQ)**: Accordion 8 câu hỏi phổ biến.

---

## 🛠️ 2. Tệp Sẽ Được Chỉnh Sửa
- **[MODIFY] `src/app/(public)/tinh-thanh/province/[provinceSlug]/[wardSlug]/page.js`**: Tinh chỉnh toàn bộ markup và class CSS sang đúng chuẩn màu sắc, thẻ, banner và layout của `tinhthanhvn.com`.
- **[MODIFY] `src/app/(public)/tinh-thanh/ban-do-tien-ich/[...params]/page.js`**: Tinh chỉnh giao diện trang bản đồ tiện ích số sang theme sáng chuẩn TinhThanh.

---

## 🧪 3. Kế Hoạch Xác Minh (Verification)
1. **Kiểm tra biên dịch**: Chạy `npm run build` đạt Exit Code 0.
2. **Kiểm tra an toàn CSDL**: Chạy `node scratch/verify-db-integrity.mjs` bảo vệ 100% CSDL MySQL.
3. **Kiểm thử trực quan trình duyệt (Browser Subagent)**:
   - Chụp ảnh so sánh trực tiếp giữa `http://localhost:3000/tinh-thanh/province/ho-chi-minh/phuong-di-an` và `https://tinhthanhvn.com/province/ho-chi-minh/phuong-di-an`.
   - Đảm bảo màu sắc, banner glassmorphism, 4 thẻ thống kê màu pastel và khối bản đồ OpenStreetMap giống 100%.
