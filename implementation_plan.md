# Kế Hoạch Triển Khai Workflow Rà Soát & Nâng Cấp Nội Dung Trang Công An Tỉnh Thành Theo Chuẩn SEO Băng Tâm

> **Yêu cầu của User:** *"tập trung ở tỉnh thành. ưu tiên trước Công AN"*. Ứng dụng toàn diện bộ skill SEO tiếng Việt từ repo [`ibangtam/skill-seo-co-ban`](https://github.com/ibangtam/skill-seo-co-ban) để nâng cấp từng trang Công An trong phân hệ `/tinh-thanh`: **vẫn lưu giữ toàn bộ nội dung cũ** (địa chỉ, số điện thoại trực ban 113, hotline, Fanpage tích xanh, link Google Maps POI) **nhưng cải tiến mới toàn diện về cấu trúc bài viết SEO chuẩn E-E-A-T**.

---

## 1. Tiêu Chuẩn Nâng Cấp Theo Repo `skill-seo-co-ban`

Mỗi trang Công An cấp Xã/Phường và cấp Tỉnh sẽ được nâng cấp bài viết chuyên sâu đạt tối thiểu **85/100 điểm** theo 8 tiêu chí của Băng Tâm:

### A. Quy tắc Đoạn Mở Đầu (Sapo 3 phần)
- **Đoạn 1 (40–60 từ):** Trả lời trực diện vào câu hỏi tìm kiếm cốt lõi: Tên đơn vị Công An, địa chỉ trụ sở, số điện thoại trực ban 24/7, và thẩm quyền tiếp nhận thủ tục cư trú/an ninh trật tự tại địa bàn.
- **Đoạn 2 (30–60 từ):** Hướng dẫn phân định hình thức nộp hồ sơ (trực tiếp tại quầy tiếp dân hoặc trực tuyến qua Cổng Dịch vụ công Quốc gia / ứng dụng VNeID).
- **Đoạn 3 (2–3 dòng):** Tóm lược các nội dung hướng dẫn chính trong bài.
- **Cấm tuyệt đối văn phong sáo rỗng:** "Trong bài viết này...", "Hãy cùng tìm hiểu...", "Bạn có bao giờ...".

### B. Cấu Trúc Khung Bài Viết Chuẩn H2/H3
1. **`1. Chức Năng, Thẩm Quyền & Nhiệm Vụ Quản Lý Địa Bàn` (H2):**
   - Câu đầu tiên trả lời thẳng trong 40–60 từ.
   - Thẩm quyền quản lý cư trú, an ninh trật tự, cấp định danh điện tử, tuần tra kiểm soát, và tiếp nhận tin báo tố giác tội phạm.
2. **`2. Hướng Dẫn Quy Trình Thực Hiện Thủ Tục Hành Chính Công An Thường Gặp` (H2):**
   - Đăng ký thường trú / tạm trú trực tuyến (DVC BCA).
   - Kích hoạt tài khoản định danh điện tử VNeID mức 2.
   - Xác nhận thông tin cư trú (CT07).
   - Tiếp nhận xử lý tin báo an ninh trật tự, phản ánh dân sinh.
3. **`3. Cảnh Báo An Ninh: Phòng Chống Lừa Đảo Giả Danh Công An Qua Mạng` (H2 - Mục ★ Khác biệt):**
   - Nguyên tắc bảo vệ người dân: Cán bộ Công an **KHÔNG LÀM VIỆC QUA ĐIỆN THOẠI**, **KHÔNG YÊU CẦU CHUYỂN TIỀN**, **KHÔNG GỬI LINK CÀI APP LẠ**.
   - Kênh xác thực chính thống: Cổng Thông tin điện tử Bộ Công An & Fanpage Tích Xanh được liên kết trực tiếp trên trang.
4. **`4. Hướng Dẫn An Toàn PCCC Dân Cư & Sử Dụng Khí Đốt Hóa Lỏng (LPG)` (H2):**
   - Khuyến cáo an toàn cháy nổ bếp gas gia đình, quy chuẩn bình gas chính hãng, số điện thoại khẩn cấp PCCC 114, hotline hỗ trợ kỹ thuật gas `1900 9396`.
5. **`5. Câu Hỏi Thường Gặp Khi Đến Làm Việc Tại Trụ Sở Công An (FAQ)` (H2):**
   - 5 câu hỏi thực tế của người dân, mỗi câu trả lời súc tích 40–80 từ.

### C. Kỷ Luật Lọc Dấu Văn Máy & Chặn Từ Tuyệt Đối
- Áp dụng bộ lọc 14 dấu hiệu (`loc-dau-van-may.md`).
- Chặn 100% từ tuyệt đối theo Luật Quảng cáo: "nhất, số 1, hàng đầu, tốt nhất..." -> thay bằng thông số đo lường được.
- Đầy đủ Schema JSON-LD `GovernmentOffice` / `PoliceStation` + `FAQPage` + `BreadcrumbList`.

---

## 2. Kế Hoạch Triển Khai Mã Nguồn

1. **Xây dựng Component Bài Viết SEO Chuyên Sâu**:
   - Tệp mới: `src/app/(public)/tinh-thanh/components/AgencySeoArticle.js`
   - Nhận props dữ liệu động của cơ quan: `agency`, `unit`, `province`.
   - Sinh bài viết chuyên sâu chuẩn mực theo đúng bộ khung của Băng Tâm.
2. **Tích hợp vào Trang Chi Tiết Cơ Quan Cấp Xã/Phường**:
   - Tệp: `src/app/(public)/tinh-thanh/province/[provinceSlug]/[wardSlug]/co-quan/[agencySlug]/page.js`
   - Bổ sung khối bài viết SEO chuyên sâu phía dưới bảng thủ tục hành chính.
   - Inject Schema JSON-LD `FAQPage` và `GovernmentOffice` vào trang.
3. **Tích hợp vào Trang Cơ Quan Đầu Não Cấp Tỉnh**:
   - Tệp: `src/app/(public)/tinh-thanh/province/[provinceSlug]/co-quan-nha-nuoc/page.js`
   - Bổ sung khối bài viết SEO chuyên sâu về Công An Tỉnh/Thành phố.
4. **Viết Script Workflow Tự Động Kiểm Toán & Chấm Điểm 8 Tiêu Chí**:
   - Tệp: `scripts/workflow-seo-audit-police.py` (chạy qua `run_workflow`)
   - Tự động quét các trang Công An trên hệ thống, kiểm tra độ dài từ (>= 1.500 từ), Sapo 40-60 từ, 0 dấu hiệu văn máy, 0 từ tuyệt đối, Schema đầy đủ.
5. **Kiểm Thử Thực Nghiệm (RULE 5 & 9)**:
   - Chạy `npm run build` xác nhận Exit Code 0.
   - Fetch live routes xác nhận HTTP 200 và cấu trúc bài viết hoàn chỉnh.
