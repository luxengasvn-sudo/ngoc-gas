<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# NGỌC GAS PROJECT STANDARDS & PERSISTENT RULES (BẢNG QUY TẮC & BẢO VỆ CHỨC NĂNG ĐÃ CHỐT)

Mọi Agent AI làm việc trên dự án **Ngọc Gas** BẮT BUỘC tuân thủ 100% các quy tắc kiến trúc và hợp đồng đã được kiểm định dứt điểm dưới đây. KHÔNG ĐƯỢC PHÉP thay đổi hay làm tái diễn các lỗi cũ.

---

## 📌 1. QUY TẮC TỰ ĐỘNG LƯU TỨC THÌ TRONG ADMIN (INSTANT AUTO-SAVE CONTRACT)
- **100% Các Ô Tải File Media**: Ngay khi upload (`Logo`, `Favicon`, `Mã QR Zalo`, `Banner Popup`, `Hero Slides 1-3`, `Hero Video`), hệ thống BẮT BUỘC tự động gọi `PUT /api/settings` ghi ngay vào File JSON & MySQL.
- **Thay Đổi Vị Trí Khối (Reordering)**: Hàm `handleMoveSection` (Nút Mũi tên ⬆️ Lên / ⬇️ Xuống) BẮT BUỘC gọi `PUT /api/settings` tự động lưu mảng `home_sections_order` lên server lập tức.
- **Bật / Ẩn Nhanh Khối (Section Toggles)**: Nút `🔴 Đang ẩn` / `🟢 Đang hiện` BẮT BUỘC tự động gọi `PUT /api/settings` lưu trạng thái ngay lập tức.
- **Thông Báo Trực Quan**: 100% thao tác Auto-Save phải hiển thị Modal/Toast thông báo xanh lá xác nhận thành công.

---

## 📌 2. QUY TẮC NGUỒN DỮ LIỆU CÀI ĐẶT 3 LỚP (UNIFIED SETTINGS HYDRATION CONTRACT)
- `getAllSettings()` trả về object theo thứ tự ghi đè ưu tiên: `fileSettings` -> `dbSettings` (MySQL) -> `memoryCache`.
- **DỮ LIỆU CSDL MYSQL CỦA USER LÀ THẦN THÁNH & ƯU TIÊN SỐ 1**: Mọi giá trị do User lưu trong MySQL DB BẮT BUỘC ƯU TIÊN GHI ĐÈ lên tệp tĩnh `data/settings.json`.
- **CẤM SỬA/GHI ĐÈ FILE `data/settings.json` BẰNG GIÁ TRỊ CỐ ĐỊNH**: Agent CẤM TUYỆT ĐỐI việc dán cứng các giá trị `logo_url`, `favicon_url`, `phone`, `email`, `address` vào file `data/settings.json` trong các commit Git.
- `parseSectionOrder(jsonStr)` BẮT BUỘC giữ nguyên 100% mảng thứ tự vị trí anh tùy chỉnh, tuyệt đối không re-sort hay chèn đè mặc định sai vị trí.

---

## 📌 3. QUY TẮC THƯ VIỆN HÌNH ẢNH TẬP TRUNG (MEDIA LIBRARY MANDATE)
- Tất cả các trường nhập hình ảnh tại Admin (*Cài đặt, Sản phẩm, Bài viết, Cửa hàng*) BẮT BUỘC có nút `🖼️ Thư viện ảnh` (mở `MediaLibraryModal.js`).
- `GET /api/upload` BẮT BUỘC quét đệ quy các thư mục `/uploads` và `/images` và có mảng fallback `defaultPresets` hệ thống, đảm bảo thư viện KHÔNG BAO GIỜ bị rỗng.

---

## 📌 4. CHUẨN THÔNG TIN THƯƠNG HIỆU & GIÁ TRỊ MẶC ĐỊNH (ZERO STATIC HARDCODING)
- **Địa chỉ trụ sở văn phòng & Điểm giao gas số 1**: `7 Nguyễn Trung Trực, Phường Dĩ An, Tỉnh Bình Dương`.
- **Quy tắc địa chỉ hệ thống cửa hàng**: Luôn tra cứu danh sách cửa hàng (`/cua-hang` hoặc bảng CSDL `stores`) để có thông tin địa chỉ hợp nhất chính xác nhất.
- **Bản đồ Google Maps**: Trỏ đúng vị trí Dĩ An, Bình Dương.
- **Thương hiệu phân phối chính hãng**: `Sopet Gas One, Phoenix Gas, Luxen Gas` (Lưu ý: Tên chuẩn là "Sopet Gas One", tuyệt đối không dùng "Sopet Vil").
- **Copyright năm**: `new Date().getFullYear()` (Tự động hóa theo năm hiện tại).
- **Hotline mặc định luôn là**: `19009396` (hoặc hiển thị `1900 9396`). Luôn đọc động từ `settings.phone`. CẤM TUYỆT ĐỐI việc sử dụng bất kỳ số điện thoại lạ nào khác (như 0913 943 772...) trong bài viết, hình ảnh infographic, banner hay ấn phẩm thiết kế.
- **Zalo Widget Mobile**: Ưu tiên đọc từ `settings.social_zalo`.

---

## 📌 5. QUY TRÌNH KIỂM THỬ VÀ BẰNG CHỨNG THỰC TẾ BẮT BUỘC (MANDATORY VERIFICATION PROTOCOL)
- **KHÔNG NÓI SUÔNG / KHÔNG ĐOÁN MÒ**: CẤM TUYỆT ĐỐI việc báo hoàn thành hoặc đưa ra lý do lý thuyết khi chưa tự tay chạy lệnh kiểm thử local.
- **QUY TRÌNH 3 BƯỚC BẮT BUỘC TRƯỚC KHI BÁO CÁO**:
  1. **Thực thi kiểm thử**: BẮT BUỘC bật terminal chạy script kiểm thử / lệnh build local (`npm run build` hoặc script node test API).
  2. **Trích xuất dữ liệu thực tế**: BẮT BUỘC kiểm tra kết quả HTML/JSON đầu ra thực tế trả về (Empirical Output) để xác nhận tính năng chạy đúng 100%.
  3. **Đưa bằng chứng**: BẮT BUỘC đính kèm bằng chứng Terminal log / Exit Code 0 thực tế trong báo cáo cho User.
- **CHỈ COMMIT KHI XÁC MINH SẠCH LỖI**: Phải đạt `✓ Compiled successfully` (Exit Code 0) mới được phép commit hoặc công bố hoàn thành.

---

## 📌 6. QUY TẮC BẮT BUỘC ĐỌC FILE MÃ NGUỒN THỰC TẾ (REAL FILE INSPECTION RULE)
- **CẤM DỰA VÀO KÝ ỨC TRAINING / CẤM ĐOÁN MÒ CODE**: Trước khi sửa bất kỳ dòng mã nguồn hay cấu hình nào, Agent BẮT BUỘC phải dùng công cụ `view_file` hoặc `grep_search` đọc chính xác 100% tệp thực tế đang có trên đĩa cứng (`d:\Antigravity\Ngọc Gas`).
- **CẤM ĐOÁN TÊN BIẾN / HÀM**: Mọi tên biến, tham số, component, và hàm API phải được xác minh chính xác từ tệp mã nguồn đang tồn tại trên máy tính.

---

## 📌 7. QUY TẮC BẢO VỆ DỮ LIỆU CSDL & UPLOADS CỦA KHÁCH HÀNG (DATA PROTECTION MANDATE)
- **TÁCH BIỆT CODE VÀ DỮ LIỆU**: Mọi chỉnh sửa mã nguồn (.js, .css, layout) tuyệt đối KHÔNG ĐƯỢC PHÉP can thiệp, xóa hoặc ghi đè mảng dữ liệu Sản phẩm, Bài viết, Cửa hàng, SĐT, Email trong CSDL MySQL và thư mục `/public/uploads/` trên máy chủ Host.
- **DỮ LIỆU USER LÀ DUY NHẤT**: Tất cả dữ liệu do User tự nhập/thêm trong Admin là dữ liệu chính thức duy nhất. Mã nguồn khi cập nhật chỉ được cập nhật logic xử lý, luôn đọc động từ CSDL và KHÔNG BAO GIỜ đẩy tệp tĩnh ghi đè dữ liệu động của User.

---

## 📌 8. QUY TẮC AN TOÀN DỮ LIỆU USER TUYỆT ĐỐI (ABSOLUTE USER DATA PROTECTION LOCK)
- **CẤM DÁN GIÁ TRỊ TĨNH VÀO CODE/JSON**: Agent CẤM TUYỆT ĐỐI việc dán cứng các giá trị `logo_url`, `favicon_url`, `phone`, `email`, `address` vào tệp `data/settings.json` hoặc `initialState` trong mã nguồn Git.
- **CẤM SỬ DỤNG SCRIPT CÓ LỆNH INSERT/UPDATE VÀO BẢNG SETTINGS**: Agent CẤM TUYỆT ĐỐI việc tự viết và chạy các script Node/SQL có lệnh ghi/đè vào bảng CSDL MySQL `settings` của User.
- **DỮ LIỆU USER TRONG MYSQL LÀ DUY NHẤT VÀ THẦN THÁNH**: Mọi thao tác chỉnh sửa dữ liệu Cài đặt, Logo, Favicon, Bài viết, Sản phẩm BẮT BUỘC do User tự thực hiện 100% qua giao diện Admin. Agent chỉ có nhiệm vụ sửa logic hiển thị của code.

---

## 📌 9. CHUẨN KIỂM THỬ BẮT BUỘC CÓ BẰNG CHỨNG LOCAL (MANDATORY EMPIRICAL EVIDENCE)
- **CẤM BÁO SUÔNG / CẤM ĐOÁN MÒ**: Cấm tuyệt đối việc đưa ra lý do lý thuyết khi chưa tự tay bật terminal chạy thử.
- **BẮT BUỘC TRÍCH XUẤT LOG**: Trước khi báo cáo hoàn thành, Agent phải bật terminal chạy `npm run build` hoặc script test API local và đính kèm bằng chứng Terminal Log đạt `Exit Code 0` trong báo cáo.

---

## 📌 10. QUY TẮC CẤM TỰ TIỆN & BẮT BUỘC HỎI RÕ / LÊN KẾ HOẠCH DUYỆT TRƯỚC KHI THỰC HIỆN (STRICT PLANNING & ZERO OVER-AUTOMATION MANDATE)
- **CẤM HÀNH ĐỘNG "TIỆN TAY" / CẤM TỰ TIỆN THÊM BỚT DỮ LIỆU**: Agent CẤM TUYỆT ĐỐI việc tự ý thêm, bớt, gán cứng dữ liệu hay nạp dữ liệu mẩu khi không được User yêu cầu đích danh.
- **QUY TRÌNH HỎI RÕ & LÊN KẾ HOẠCH DUYỆT BẮT BUỘC (MANDATORY APPROVAL WORKFLOW)**:
  1. Khi nhận bất kỳ yêu cầu nào từ User, Agent BẮT BUỘC phải hỏi rõ chi tiết việc cần làm, rà soát mã nguồn thực tế.
  2. Lập kế hoạch thực thi chi tiết (`implementation_plan.md`) trình bày rõ từng file sẽ sửa.
  3. DỪNG LẠI và CHỜ User duyệt kế hoạch 100% rồi mới được phép đụng vào mã nguồn.

---

## 📌 11. QUY TẮC GIỚI HẠN CHỈNH SỬA ĐÚNG PHẠM VI YÊU CẦU (STRICT SCOPING & ZERO SIDE-EFFECTS RULE)
- **CHỈ SỬA ĐÚNG CHỖ ĐƯỢC CHỈ ĐỊNH**: Khi User yêu cầu chỉnh sửa vị trí/tệp X, Agent CHỈ ĐƯỢC PHÉP chỉnh sửa đúng vị trí/tệp X đó.
- **CẤM TỰ Ý SỬA CHỖ KHÁC**: Agent CẤM TUYỆT ĐỐI việc tự ý can thiệp, chỉnh sửa hay thay đổi bất kỳ tệp, component hay cài đặt nào khác khi chưa được User cho phép đích danh.

---

## 📌 12. QUY TẮC ĐỒNG BỘ BẢNG THỐNG KÊ GOOGLE SHEETS KHI XUẤT BẢN BÀI VIẾT (MANDATORY GOOGLE SHEETS SYNC)
- **Bảng tính chính thức**: `https://docs.google.com/spreadsheets/d/1W5VTCZPxNHI30VbOJN0S-lnW9SyQKXtaB7CZ6ZwyNp0/edit`
- **Hợp đồng thực thi**: Mỗi khi xuất bản bài viết mới qua API (danh mục `mon-an` hoặc `tin-tuc`), Agent BẮT BUỘC tự động cập nhật ngay bài viết đó (STT, Tiêu đề, Tóm tắt nội dung, Link bài viết, Trạng thái, Ngày đăng, Ảnh đại diện, Số từ) vào đúng tab tương ứng (`Món Ăn` hoặc `Tin Tức`) trên Google Sheet trên.

---

## 📌 13. QUY TẮC TỰ ĐỘNG ĐĂNG BÀI LÊN GOOGLE BUSINESS / GOOGLE MAPS (MANDATORY GOOGLE MAPS PUBLISHING)
- **Kỹ năng chuẩn hóa**: Áp dụng kỹ năng [.agents/skills/google-maps-publisher/SKILL.md](file:///d:/Antigravity/Ng%E1%BB%8Dc%20Gas/.agents/skills/google-maps-publisher/SKILL.md).
- **Hợp đồng thực thi**: Mỗi khi User yêu cầu *"đăng google map"*, *"cập nhật google map"*, Agent BẮT BUỘC kích hoạt quy trình tự động qua `browser_subagent` để đăng thông tin cập nhật đồng loạt cho toàn bộ **3 địa điểm Google Business Profile** của Ngọc Gas:
  1. **Ngọc Gas - Giao gas nhanh chính hãng - Dĩ An** (7 Nguyễn Trung Trực, TP. Dĩ An)
  2. **Cửa hàng Ngọc Gas - Đường D5 An Phú** (Kiot 5, Đường D5, KDC Vietsing, Thuận An)
  3. **Ngọc Gas - Giao gas nhanh chính hãng - Cây Da** (7/14 Đường Cây Da, KP. Tân Phú 1, P. Tân Đông Hiệp)
- **Quy chuẩn bài đăng**: Kèm ảnh minh họa chuẩn nhận diện, cam kết bình gas chính hãng đủ ký, hotline duy nhất `1900 9396`, nút bấm CTA *"Tìm hiểu thêm"* trỏ link `https://ngocgas.com/gia-gas-hom-nay`, và chụp ảnh màn hình lưu vào artifact làm bằng chứng thực nghiệm.

---

## 📌 14. QUY TẮC TỰ ĐỘNG THÔNG BÁO GOOGLE INDEXING API (MANDATORY GOOGLE INDEXING PROTOCOL)
- **Hạ tầng chính thức**: Service Account `ngocgas-index-bot@ngocgas-indexing.iam.gserviceaccount.com` (Đã cấp quyền Owner trên Google Search Console thuộc tính `sc-domain:ngocgas.com`).
- **Hợp đồng thực thi**: Mỗi khi có bài viết mới được tạo, cập nhật trạng thái xuất bản (`is_published: 1`), hoặc phân phối đa tầng (Syndication), hệ thống BẮT BUỘC tự động gửi yêu cầu lập chỉ mục tức thì tới Googlebot (`POST https://indexing.googleapis.com/v3/urlNotifications:publish`).
- **Định tuyến URL chuẩn**: 100% URL ping index cho bài viết phải có dạng `https://ngocgas.com/tin-tuc/${slug}`.
- **Xử lý xóa bài**: Khi xóa bài viết đã xuất bản, hệ thống BẮT BUỘC gửi thông báo `URL_DELETED` để Googlebot gỡ chỉ mục nhanh chóng.

---

## 📌 15. QUY TẮC PHÂN PHỐI BÀI VIẾT VỆ TINH WEB 2.0 XOAY VÒNG (MANDATORY WEB 2.0 SYNDICATION PROTOCOL)
- **Hợp đồng thực thi**: Mỗi khi xuất bản một bài viết mới trên `ngocgas.com` (chuyên mục `tin-tuc` hoặc `mon-an`), Agent BẮT BUỘC tự động chuyển tiếp thực hiện phân phối 1 bài viết vệ tinh độc bản lên 1 kênh Web 2.0 theo cơ chế xoay vòng luân phiên (Round-Robin).
- **Danh mục 6 kênh xoay vòng**:
  1. `Blogger` (DA 99): `ngocgascom.blogspot.com`
  2. `WordPress.com` (DA 93): `ngocgas.wordpress.com`
  3. `Google Sites` (DA 100): `sites.google.com/view/ngocgas`
  4. `Tumblr` (DA 96): `ngocgas.tumblr.com`
  5. `Pinterest Business` (DA 94): `pinterest.com/gasngoc`
  6. `Telegra.ph` (DA 91): `telegra.ph`
- **Quản lý con trỏ xoay vòng**: Trạng thái xoay vòng được theo dõi và cập nhật liên tục tại `data/satellite-articles/rotation-state.json`.
- **Mô hình liên kết kép bắt buộc**:
  1. *Link trọng tâm*: Trỏ về `https://ngocgas.com/gia-gas-hom-nay` (*CẤM dán số tiền cố định*).
  2. *Link trích dẫn nguồn*: Trỏ về bài viết gốc mới xuất bản (`https://ngocgas.com/tin-tuc/${slug}` hoặc `https://ngocgas.com/mon-an/${slug}`).
- **Chuẩn thương hiệu**: Hotline duy nhất `1900 9396`, 3 thương hiệu chính hãng `Sopet Gas One, Phoenix Gas, Luxen Gas`, trụ sở số 1 tại `7 Nguyễn Trung Trực, Phường Dĩ An, Tỉnh Bình Dương`.
- **Bằng chứng thực nghiệm & Đồng bộ**: Phải kiểm tra URL live trả về HTTP 200 (hoặc ảnh chụp màn hình) và đồng bộ đường link bài Web 2.0 vào Google Sheets theo dõi.

---

## 📌 16. QUY TẮC BẮT BUỘC ĐẨY ẢNH LÊN MÁY CHỦ LIVE QUA API UPLOAD (MANDATORY LIVE MEDIA UPLOAD CONTRACT)
- **CẤM DÙNG ĐƯỜNG DẪN ẢNH CỤC BỘ**: Agent CẤM TUYỆT ĐỐI việc gán trực tiếp đường dẫn tĩnh nội bộ (như `/images/...` hoặc file mới tạo ở local máy tính) vào `image_url` của bài viết khi xuất bản lên hệ thống live.
- **BẮT BUỘC GỌI API UPLOAD LÊN MÁY CHỦ LIVE**: 100% hình ảnh bài viết mới tạo (ảnh AI, ảnh chụp món ăn, banner địa phương) BẮT BUỘC phải được upload lên máy chủ qua `POST ${TARGET_URL}/api/upload` (với `x-api-key: process.env.AI_PUBLISHER_API_KEY`).
- **GÁN URL ĐÃ UPLOAD & PURGE CACHE**: Chỉ sử dụng `uploadJson.url` (dạng `/uploads/...jpg`) trả về từ API máy chủ thật để gán vào `image_url` của bài viết, sau đó tự động gọi `POST /api/cache` (`action: 'purge'`) để làm mới bộ nhớ đệm máy chủ.
- **KIỂM THỬ HTTP 200 TRỰC TIẾP TRÊN LIVE TRƯỚC KHI BÁO CÁO**: Trước khi báo cáo hoàn thành, Agent BẮT BUỘC phải chạy lệnh kiểm thử fetch đường dẫn ảnh trực tiếp `https://ngocgas.com${liveImageUrl}` và xác nhận kết quả trả về đúng `HTTP Status: 200 (image/jpeg hoặc image/png)`. CẤM TUYỆT ĐỐI để xảy ra lỗi 404 khiến giao diện web rơi vào cơ chế fallback hình bình gas xám (`/images/sopet-xam.png`).
- **QUY CHUẨN DUYỆT KẾ HOẠCH BẮT BUỘC**: Mọi kế hoạch đăng bài mới trình User duyệt BẮT BUỘC phải có đầy đủ 2 thông số:
  1. *Quy cách ảnh banner*: Kích thước 1200x675 (16:9), nội dung chi tiết, cam kết đẩy qua API upload.
  2. *Số lượng từ dự kiến*: Từ 1.500 đến 2.200 từ (Mã HTML >= 6.500 ký tự).

---

## 📌 17. QUY TẮC CHUẨN FORM BÁO CÁO DIGITAL MARKETING ĐỊNH KỲ (MANDATORY DIGITAL MARKETING REPORT STANDARD)
- **Kỹ năng chuẩn hóa**: Áp dụng kỹ năng [.agents/skills/digital-report-generator/SKILL.md](file:///d:/Antigravity/Ng%E1%BB%8Dc%20Gas/.agents/skills/digital-report-generator/SKILL.md) và tài liệu quy chuẩn [docs/CHUAN_FORM_BAO_CAO_DIGITAL_MARKETING_NGOC_GAS.md](file:///d:/Antigravity/Ng%E1%BB%8Dc%20Gas/docs/CHUAN_FORM_BAO_CAO_DIGITAL_MARKETING_NGOC_GAS.md).
- **Hợp đồng thực thi**: Mọi báo cáo hiệu quả Digital Marketing định kỳ (tháng/quý) của Ngọc Gas BẮT BUỘC xuất ra định dạng Excel (`.xlsx`) theo đúng chuẩn 7 Sheet cao cấp (Executive Dashboard):
  1. `Sheet 1: Tổng Quan KPI`: Executive Summary, thanh điều hướng tương tác 2 chiều, 4 Thẻ KPI Cards nổi bật, Bảng chỉ số tổng hợp MoM (Google Search, Maps, Facebook, Web, Entity), Bảng 4 trụ cột chiến lược T+1, và Biểu đồ trực quan SVG High-Res nhúng.
  2. `Sheet 2: GSC - Từ Khóa Cốt Lõi`: Số liệu thực từ Google Search Console API. BẮT BUỘC lọc sạch 100% các từ khóa rác và từ khóa tỉnh thành ngoài phạm vi kinh doanh; chỉ giữ lại từ khóa thương mại, bảng giá, thương hiệu, gas dân dụng & công nghiệp.
  3. `Sheet 3: GSC - Trang Đích & Xu Hướng Ngày`: Danh sách URL đích kinh doanh gas cốt lõi (CẤM đưa các trang tiện ích `/tinh-thanh` vào), kèm bảng phân tích hiệu suất theo từng ngày trong tháng.
  4. `Sheet 4: Google Maps 3 Điểm`: Số liệu xác thực 100% từ Google Business Profile cho cả 3 chi nhánh (Dĩ An, VietSing D5, Cây Da) gồm: Lượt xem, Chỉ đường, Cuộc gọi, Đánh giá 5.0 ⭐, Link Google Maps trực tiếp, và Biểu đồ SVG so sánh trực quan 3 chi nhánh.
  5. `Sheet 5: Facebook - 5 Fanpage Hệ Thống`: Đo lường toàn diện 5 Fanpage chính thức (1 Brand, 3 Chi nhánh cơ sở, 1 Tuyển dụng) gồm Tiếp cận, Tương tác, Chuyển đổi đặt gas/gọi, kèm Bảng kế hoạch nội dung 4 trụ cột tháng tiếp theo.
  6. `Sheet 6: Số Bài Viết Đã Viết`: Danh mục toàn bộ bài viết live thực tế từ CSDL MySQL (Món ăn, Tin tức cụm gas, Tuyển dụng) kèm đường link live, ngày đăng, số từ và trạng thái ping Google Index.
  7. `Sheet 7: Hệ Thống 33 Entity & Link`: Danh sách đầy đủ 33 Entity/Social/Web 2.0 NAP, Domain Authority (DA), đường link profile trực tiếp, trạng thái xác thực và ghi chú quản trị.
- **Tiêu chuẩn thiết kế mỹ thuật & UX**:
  - Font: `Segoe UI` xuyên suốt toàn bộ workbook.
  - Bảng màu nhận diện: Navy `#1E3A8A`, Blue Primary `#2563EB`, Orange Flame `#EA580C`, Facebook Blue `#1877F2`, Slate `#475569`.
  - Cố định dòng tiêu đề (`freezePanes: { ySplit: N }`), kẻ viền `thinBorder`, căn lề chuẩn mực (STT/Số căn giữa, Doanh thu/Chỉ số căn phải, Văn bản căn trái).
  - Thanh điều hướng nội bộ 2 chiều: Nút tab tại Sheet 1 nhảy đến từng Sheet và nút `🔙 Về Trang Tổng Quan KPI` ở hàng 1 của mọi sheet con.
  - Tự động hóa xử lý khóa tệp (`EBUSY`): Khi file chính đang mở trong Excel, tự động lưu bản phụ `_V2.xlsx` và sao lưu vào `docs/` để không bao giờ bị lỗi crash script.

---

<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **ngoc-gas** (503 symbols, 1055 relationships, 33 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

> Index stale? Run `node .gitnexus/run.cjs analyze` from the project root — it auto-selects an available runner. No `.gitnexus/run.cjs` yet? `npx gitnexus analyze` (npm 11 crash → `npm i -g gitnexus`; #1939).

## Always Do

- **MUST run impact analysis before editing any symbol.** Before modifying a function, class, or method, run `impact({target: "symbolName", direction: "upstream"})` and report the blast radius (direct callers, affected processes, risk level) to the user.
- **MUST run `detect_changes()` before committing** to verify your changes only affect expected symbols and execution flows. For regression review, compare against the default branch: `detect_changes({scope: "compare", base_ref: "main"})`.
- **MUST warn the user** if impact analysis returns HIGH or CRITICAL risk before proceeding with edits.
- When exploring unfamiliar code, use `query({search_query: "concept"})` to find execution flows instead of grepping. It returns process-grouped results ranked by relevance.
- When you need full context on a specific symbol — callers, callees, which execution flows it participates in — use `context({name: "symbolName"})`.
- For security review, `explain({target: "fileOrSymbol"})` lists taint findings (source→sink flows; needs `analyze --pdg`).

## Never Do

- NEVER edit a function, class, or method without first running `impact` on it.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis.
- NEVER rename symbols with find-and-replace — use `rename` which understands the call graph.
- NEVER commit changes without running `detect_changes()` to check affected scope.

## Resources

| Resource | Use for |
|----------|---------|
| `gitnexus://repo/ngoc-gas/context` | Codebase overview, check index freshness |
| `gitnexus://repo/ngoc-gas/clusters` | All functional areas |
| `gitnexus://repo/ngoc-gas/processes` | All execution flows |
| `gitnexus://repo/ngoc-gas/process/{name}` | Step-by-step execution trace |

## CLI

| Task | Read this skill file |
|------|---------------------|
| Understand architecture / "How does X work?" | `.claude/skills/gitnexus/gitnexus-exploring/SKILL.md` |
| Blast radius / "What breaks if I change X?" | `.claude/skills/gitnexus/gitnexus-impact-analysis/SKILL.md` |
| Trace bugs / "Why is X failing?" | `.claude/skills/gitnexus/gitnexus-debugging/SKILL.md` |
| Rename / extract / split / refactor | `.claude/skills/gitnexus/gitnexus-refactoring/SKILL.md` |
| Tools, resources, schema reference | `.claude/skills/gitnexus/gitnexus-guide/SKILL.md` |
| Index, status, clean, wiki CLI commands | `.claude/skills/gitnexus/gitnexus-cli/SKILL.md` |

<!-- gitnexus:end -->
