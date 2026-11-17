# Kế Hoạch Triển Khai Áp Dụng Skill SEO Băng Tâm Cho Toàn Bộ 194 Bài Viết Bệnh Viện

> **Mục tiêu:** Ứng dụng toàn diện bộ chuẩn SEO tiếng Việt từ repo [`ibangtam/skill-seo-co-ban`](https://github.com/ibangtam/skill-seo-co-ban) và Claude SEO Tier 4 để nâng cấp toàn diện **194 trang chi tiết Bệnh viện** tại phân hệ `/tinh-thanh/benh-vien/[hospitalSlug]`.
> Đảm bảo: Lưu giữ 100% dữ liệu thực tế (Hotline cấp cứu 24/7, hotline đặt lịch, giờ khám, quy mô giường bệnh, Google Maps, các chuyên khoa), chống trùng lặp nội dung danh bạ (Anti-Duplicate Content Engine), loại bỏ văn máy AI, bổ sung Rich Snippet FAQPage Schema và đạt chuẩn E-E-A-T y tế cao nhất.

---

## 1. Cấu Trúc Bài Viết Chuẩn Băng Tâm Y Tế (Hospital SEO Standard)

Mỗi trang chi tiết bệnh viện sẽ được chuẩn hóa cấu trúc Semantic đạt tối thiểu **85/100 điểm** theo 8 tiêu chí Băng Tâm:

### A. Quy tắc Đoạn Mở Đầu (Sapo 3 phần trực diện 40–60 từ)
- **Đoạn 1 (Fact & Cấp cứu):** Tên đầy đủ của bệnh viện, địa chỉ thực tế, phân tuyến (Tuyến Trung ương / Tuyến Tỉnh / Tư nhân), cơ quan chủ quản (Bộ Y Tế / Sở Y Tế) và **Hotline Cấp cứu 24/7 trực ban**.
- **Đoạn 2 (Thẩm quyền & BHYT):** Phạm vi tiếp nhận điều trị (khám BHYT thông tuyến, khám chuyên gia, cấp cứu ngoại viện).
- **Đoạn 3 (Điều hướng):** Tóm lược các nội dung hướng dẫn chính trong bài (quy trình khám, thế mạnh chuyên khoa, cổng vào và bãi giữ xe).
- **Chặn tuyệt đối văn máy AI:** Cấm các câu sáo rỗng mở đầu: *"Trong bài viết này...", "Hãy cùng tìm hiểu...", "Bạn có bao giờ..."*.

### B. Cấu Trúc Khung Bài Viết Chuẩn H2/H3 Ngữ Nghĩa Y Tế
1. **`1. Thẩm Quyền Phân Tuyến & Quy Mô Hoạt Động Của Bệnh Viện` (H2):**
   - Vị thế phân hạng bệnh viện (Hạng Đặc biệt, Hạng 1, Tuyến TW/Tỉnh).
   - Quy mô giường bệnh thực kê và năng lực tiếp nhận bệnh nhân.
2. **`2. Các Chuyên Khoa Mũi Nhọn & Kỹ Thuật Điều Trị Trọng Điểm` (H2):**
   - Trình bày danh mục chuyên khoa mũi nhọn sạch sẽ, chuyên nghiệp, không bị lỗi cắt thẻ `<strong>`.
   - Nêu bật các kỹ thuật điều trị chuyên sâu (Cấp cứu - Hồi sức, Can thiệp tim mạch, Ngoại khoa, Nhi khoa, Sản khoa...).
3. **`3. Hướng Dẫn Quy Trình Khám Bệnh (BHYT & Khám Theo Yêu Cầu)` (H2):**
   - **Quy trình 1: Khám thường & BHYT:** Tiếp đón, quét mã CCCD gắn chip / VNeID tích hợp BHYT, lấy số tự động, đo sinh hiệu, vào phòng khám chuyên khoa, xét nghiệm/CĐHA và nhận thuốc.
   - **Quy trình 2: Khám dịch vụ & Đặt lịch hẹn chuyên gia:** Hướng dẫn đặt trước qua hotline hoặc cổng tiếp nhận riêng để giảm thời gian chờ đợi.
4. **`4. Chỉ Dẫn Cổng Tiếp Đón, Phương Tiện Di Chuyển & Bãi Đỗ Xe` (H2):**
   - Phân biệt cổng tiếp nhận cấp cứu 24/7 và cổng tiếp nhận khám bệnh ngoại trú.
   - Hướng dẫn vị trí bãi giữ xe máy, xe ô tô và lưu ý giao thông giờ cao điểm.
5. **`5. Câu Hỏi Thường Gặp Khi Đi Khám Tại Bệnh Viện (FAQ)` (H2):**
   - Hệ thống 4–6 câu hỏi thực tế (Có khám thứ 7/Chủ Nhật không, thủ tục chuyển viện, cấp cứu ban đêm vào cổng nào, chi phí khám tham khảo).
   - Đi kèm Accordion tương tác trực tiếp và tích hợp Schema `FAQPage`.

### C. Công Nghệ Chống Trùng Lặp Nội Dung Danh Bạ (Anti-Duplicate Content Engine)
- Sử dụng hàm băm xác định `getDeterministicHash(hospital.slug)` để phân phối:
  - 8 Mẫu Sapo mở đầu độc bản xoay vòng.
  - 4 Biến thể quy trình tiếp nhận khám bệnh.
  - 3 Mẫu chỉ dẫn bãi giữ xe và lưu ý giờ cao điểm.
  - Ma trận câu hỏi thường gặp FAQ thực tế.
- Đảm bảo 194 cơ sở y tế là 194 trang độc bản, chống phạt nội dung mỏng/trùng lặp từ Googlebot.

### D. Lọc Dấu Văn Máy AI & Chặn Từ Cấm Luật Quảng Cáo
- Lọc 14 dấu hiệu văn máy: *"đóng vai trò then chốt", "khẳng định vị thế", "xu hướng tất yếu", "giải pháp toàn diện"*.
- Chặn 100% từ cấm tuyệt đối: *"số 1", "hàng đầu", "tốt nhất Việt Nam", "uy tín nhất"*.

---

## 2. Kế Hoạch Triển Khai Chi Tiết Các Tệp Mã Nguồn

### Tệp 1: Xây dựng Component `src/app/(public)/tinh-thanh/components/HospitalSeoArticle.js` (Mới)
- Đóng gói toàn bộ logic Anti-Duplicate Content Engine cho y tế.
- Tự động sinh bài viết chuyên sâu 800 – 1.200 từ chuẩn Băng Tâm cho bất kỳ bệnh viện nào.
- Nhúng nội dung chi tiết sẵn có của bệnh viện (nếu có trường `hospital.content` thủ công) vào vị trí chuyên sâu phù hợp, kết hợp hài hòa với Sapo, Sơ đồ H2/H3 và Khối FAQ.

### Tệp 2: Cập nhật `src/app/(public)/tinh-thanh/benh-vien/[hospitalSlug]/page.js`
- Import component `HospitalSeoArticle`.
- Tích hợp thêm Schema `FAQPage` vào mảng `jsonLd` bên cạnh Schema `Hospital`.
- Thay thế khối render tĩnh cũ bằng `<HospitalSeoArticle hospital={hospital} />`.

### Tệp 3: Rà soát & Chuẩn hóa `src/data/tinhthanh/hospitals-master.json`
- Chạy script kiểm tra và làm sạch dữ liệu chuỗi `specialties` và nội dung của 104 bệnh viện Hà Nội để loại bỏ lỗi cắt từ thẻ `<strong>` (như `<strong>Hồi:</strong> Hồi Sức...`).

---

## 3. Quy Trình Kiểm Thử & Nghiệm Thu (RULE 5 & 9 & Yêu Cầu Chụp Màn Hình)
1. **Kiểm tra cú pháp & Logic:** Chạy script Node.js kiểm tra 100% 194 bệnh viện không có lỗi văn phạm, không có từ cấm, không có lỗi thẻ tag HTML.
2. **Biên dịch thử nghiệm:** Chạy `npm run build` để kiểm tra toàn bộ 231 static pages (bao gồm 194 trang bệnh viện) biên dịch hoàn hảo với `Exit Code 0`.
3. **Nghiệm thu hình ảnh thực tế (Visual Proof):**
   - Chạy `scripts/take-screenshot.js` chụp ảnh màn hình trang bệnh viện Hà Nội (ví dụ: Bệnh viện Bạch Mai, Bệnh viện Phụ Sản Hà Nội).
   - Chụp ảnh màn hình trang bệnh viện TP.HCM (ví dụ: Bệnh viện Chợ Rẫy, Bệnh viện Tâm Anh).
   - Chụp cả phiên bản Desktop và Mobile.
4. **Tuyệt đối không git push** theo đúng chỉ đạo của User.
