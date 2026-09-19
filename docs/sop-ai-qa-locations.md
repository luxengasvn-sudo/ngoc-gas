# BỘ QUY TRÌNH CHUẨN (SOP) — AI QA DỮ LIỆU TỪNG ĐỊA ĐIỂM
**Phiên bản:** 1.0 (Ban hành: 2026)  
**Mục tiêu:** Rà soát, chuẩn hóa và xác thực 100% dữ liệu hành chính của từng địa điểm (Phường / Xã / Thị trấn), loại bỏ hoàn toàn dữ liệu giả lập (placeholder/dummy text), đảm bảo độ tin cậy tuyệt đối cho người dùng và tối ưu SEO Geo-Location cho Ngọc Gas.

---

## 📌 PHẦN 1: NGUYÊN TẮC CỐT LÕI (CORE PRINCIPLES)

1. **ĐẶC BIỆT: ĐỊA CHỈ PHẢI CHUẨN XÁC 100% THỰC TẾ**
   - Địa chỉ trụ sở cơ quan (UBND / Công an) phải là **địa chỉ vật lý có thật ngoài đời thực** (số nhà, tên đường, khu phố/ấp, phường/xã, quận/huyện).
   - Tuyệt đối nghiêm cấm các chuỗi sinh ngẫu nhiên hoặc placeholder ảo (ví dụ: *"Số 20 Đường Trung Tâm Hành Chính"*, *"Đường Trục Chính"*, *"Tuyến Phố An Ninh"*).
   - Nguồn xác thực: Văn bản Đề án sắp xếp đơn vị hành chính của UBND cấp tỉnh/thành phố, Nghị quyết Ủy ban Thường vụ Quốc hội, Cổng TTĐT chính thức của cơ quan, hoặc dữ liệu bản đồ địa chính nhà nước.

2. **SỐ ĐIỆN THOẠI (PHONE): CÓ THÌ ĐIỀN — KHÔNG CÓ THÌ BỎ TRỐNG**
   - Chỉ điền số điện thoại bàn / tổng đài Một Cửa khi **đã kiểm chứng nguồn chính thống**.
   - Định dạng chuẩn theo mã vùng viễn thông (TP.HCM: `028 3xxx xxxx`, Bình Dương: `0274 3xxx xxx`, Bà Rịa - Vũng Tàu: `0254 3xxx xxx`).
   - **NẾU KHÔNG TÌM THẤY SỐ XÁC THỰC:** Bắt buộc để trống `""` (chuỗi rỗng) hoặc `null`.
   - **CẤM TUYỆT ĐỐI:** Không tự ý bịa đặt số điện thoại, không để các số rác dạng `028 3822 xxxx` hay số cá nhân lạ.

3. **WEBSITE CHÍNH PHỦ (GOVERNMENT WEBSITE): CÓ THÌ ĐIỀN — KHÔNG CÓ THÌ BỎ TRỐNG**
   - Ưu tiên đường dẫn Cổng thông tin điện tử cấp Phường/Xã hoặc cấp Quận/Huyện trực thuộc (tên miền chuẩn `.gov.vn`, ví dụ: `https://tandinh.quan1.hochiminhcity.gov.vn` hoặc `https://quan1.hochiminhcity.gov.vn`).
   - **NẾU KHÔNG CÓ TRANG RIÊNG:** Bắt buộc để trống `""`. Tuyệt đối không trỏ vào trang web thương mại, blog cá nhân hoặc liên kết chết (404).

4. **PHƯƠNG THỨC THỰC THI: LÀM TỪNG ĐỊA ĐIỂM (LOCATION-BY-LOCATION)**
   - Không chạy script sinh hàng loạt bừa bãi.
   - Mỗi địa điểm phải được tra cứu độc lập, có đối chiếu nguồn (Evidence Source), xuất bảng kiểm duyệt Before / After và ghi vào nhật ký kiểm toán `docs/qa-audit-log.json`.

---

## 📌 PHẦN 2: QUY TRÌNH 5 BƯỚC AI QA TỪNG ĐỊA ĐIỂM

```
┌─────────────────────────────────────────────────────────────┐
│ Bước 1: Trích xuất thông tin định danh đơn vị (ID, Tên, Cụm)│
└──────────────────────────────┬──────────────────────────────┘
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ Bước 2: Truy vấn & đối soát nguồn thẩm quyền (Gov / Bản đồ) │
└──────────────────────────────┬──────────────────────────────┘
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ Bước 3: Thẩm định & Chuẩn hóa 3 trường (Địa chỉ, SĐT, Web)  │
└──────────────────────────────┬──────────────────────────────┘
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ Bước 4: Xuất bảng so sánh Before / After & Xác nhận QA      │
└──────────────────────────────┬──────────────────────────────┘
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ Bước 5: Cập nhật nguyên tử (Atomic Update) & Ghi Audit Log  │
└─────────────────────────────────────────────────────────────┘
```

### Bước 1: Trích xuất thông tin định danh
- Xác định ID, Slug, Tên đơn vị hành chính mới, Quận/Huyện.
- Liệt kê các đơn vị cũ sáp nhập (để tra cứu xem trụ sở hành chính mới đặt tại vị trí của phường cũ nào).

### Bước 2: Truy vấn nguồn thẩm quyền
- **Nguồn cấp 1 (Ưu tiên số 1):** Cổng TTĐT TP.HCM (`hochiminhcity.gov.vn`) và Cổng TTĐT các quận huyện (`quan[X].hochiminhcity.gov.vn`, `tpthuduc.hochiminhcity.gov.vn`).
- **Nguồn cấp 2:** Đề án sắp xếp ĐVHC của UBND TP.HCM giai đoạn 2023 - 2025/2026 (mục phương án bố trí trụ sở làm việc).
- **Nguồn cấp 3:** Cổng Dịch vụ công Quốc gia (`dichvucong.gov.vn`) và Hệ thống Một cửa TP.HCM.
- **Nguồn cấp 4:** Bản đồ địa giới hành chính và dữ liệu thực tế đã kiểm chứng trên Google Maps (địa điểm cơ quan nhà nước có dấu tick hoặc hình ảnh biển tên trụ sở).

### Bước 3: Thẩm định 3 trường cốt lõi
- **`address`:** Đầy đủ `[Số nhà] [Tên đường], [Phường/Xã], [Quận/Huyện], [Tỉnh/Thành]`.
- **`phone`:** Đúng số trực ban hoặc một cửa; nếu còn nghi ngờ hoặc không có nguồn uy tín ➔ Gán `""`.
- **`website`:** Đúng domain `.gov.vn`; nếu không có ➔ Gán `""`.
- **Tọa độ (`lat`, `lng`):** Cập nhật tọa độ chuẩn của trụ sở để bản đồ tương tác hiển thị chuẩn xác.

### Bước 4: Xuất báo cáo kiểm duyệt (QA Inspection Report)
Trước khi ghi đè, xuất ra báo cáo định dạng:
| Tiêu Chí | Dữ Liệu Cũ (Trước QA) | Dữ Liệu Mới (Sau QA) | Nguồn Đối Soát (Evidence) |
|---|---|---|---|
| **Trụ sở UBND** | ... | ... | Link Cổng TTĐT / Đề án |
| **Địa chỉ** | Số 89 Đường Trục Chính... | Số 264 Hai Bà Trưng... | Cổng TTĐT Quận 1 |
| **Điện thoại** | 028 3822 xxxx | 028 3829 0123 (hoặc Để trống) | Danh bạ hành chính |
| **Website Gov**| Trống | https://tandinh.quan1... (hoặc Để trống) | Cổng TTĐT chính quyền |
| **Trạng thái** | ⚠️ Placeholder rác | ✅ Đã kiểm chứng chuẩn 100% | Đạt yêu cầu |

### Bước 5: Cập nhật nguyên tử & Ghi Audit Log
- Sử dụng script chuyên dụng cập nhật đúng vị trí `ubnd` của đơn vị đó trong file JSON, tuyệt đối không làm ảnh hưởng các trường thông tin khác.
- Ghi nhận vào file `docs/qa-audit-log.json` để kiểm soát lịch sử.

---

## 📌 PHẦN 3: CẤU TRÚC DỮ LIỆU ĐỐI TƯỢNG `ubnd` SAU QA

```json
{
  "name": "Trụ sở UBND Phường Tân Định",
  "address": "Số 264 Hai Bà Trưng, Phường Tân Định, Quận 1, TP. Hồ Chí Minh",
  "phone": "028 3829 7351",
  "website": "https://tandinh.quan1.hochiminhcity.gov.vn",
  "workingHours": "Thứ 2 - Thứ 6 (07:30 - 17:00)",
  "lat": 10.7892,
  "lng": 106.6914,
  "verificationSource": "Cổng TTĐT UBND Quận 1 & Đề án sắp xếp ĐVHC TP.HCM",
  "verifiedAt": "2026-09-16T15:30:00Z"
}
```

*Trường hợp không có SĐT hoặc Website:*
```json
{
  "name": "Trụ sở UBND Xã XYZ",
  "address": "Số 12 Đường ABC, Ấp 1, Xã XYZ, Huyện Hóc Môn, TP. Hồ Chí Minh",
  "phone": "",
  "website": "",
  "workingHours": "Thứ 2 - Thứ 6 (07:30 - 17:00)",
  "lat": 10.8850,
  "lng": 106.5920,
  "verificationSource": "Đề án sắp xếp ĐVHC cấp xã Huyện Hóc Môn",
  "verifiedAt": "2026-09-16T15:30:00Z"
}
```
*(Ghi chú: Khi `phone` là `""`, Frontend sẽ không render dòng điện thoại rỗng mà chỉ render giờ làm việc; khi `website` là `""`, không hiển thị nút link website).*

---

## 📌 PHẦN 4: QUY TRÌNH PHÂN BỔ 4 VAI TRÒ AI KHÉP KÍN & 2 VÒNG LẶP HỒI QUY

```
👑 AI Senior ──> 🔍 AI Check Thông Tin ──> ⌨️ AI Nhập Liệu ──> 🔄 AI Phúc Tra
      ▲                                                              │
      │                  (NẾU ĐÚNG 100% THÌ BÁO PASS)                 │
      └──────────────────────────────────────────────────────────────┘
                         (NẾU SAI ➔ LẶP LẠI VÒNG KÍN)
```

1. **👑 AI Senior (Tổng chỉ huy & Giám sát):**
   - Quản lý tuần tự danh sách toàn bộ các điểm từ Tỉnh/Thành -> Quận/Huyện -> Phường/Xã.
   - Bàn giao từng điểm cho AI Check Thông Tin.
   - Duyệt nghiệm thu PASS hoặc yêu cầu làm lại nếu dữ liệu chưa đạt.
   - Sau khi hoàn tất 100% danh mục (Vòng 1), kích hoạt Vòng 2 (Regression Test) quét lại từ đầu để bảo đảm tính toàn vẹn tuyệt đối.

2. **🔍 AI Check Thông Tin (Điều tra đa kênh):**
   - Tra cứu Google Search, Cổng TTĐT chính thức (`*.gov.vn`), Facebook Fanpage Tích Xanh chính chủ, Wikipedia và Đề án sắp xếp ĐVHC.
   - Đối chiếu với dữ liệu hiện có trong hệ thống và lập Hồ sơ dữ liệu chuẩn (Verified Fact Dossier).

3. **⌨️ AI Nhập Liệu (Chuẩn hóa & Ghi dữ liệu):**
   - Định dạng chuẩn hóa (loại bỏ placeholder, chuẩn hóa địa chỉ, SĐT).
   - Ghi đồng bộ nguyên tử vào cả 2 file `administrative-units-hcm.json` và `administrative-units-ho-chi-minh.json` (kèm trường `agencies`).
   - Ghi nhật ký vào `docs/qa-audit-log.json`.

4. **🔄 AI Phúc Tra (Hậu kiểm & Khép kín):**
   - Gọi kiểm tra trực tiếp kết quả HTML render từ server local `http://localhost:3000`.
   - Nếu đúng 100% -> Báo cáo AI Senior phê duyệt PASS.
   - Nếu sai/thiếu -> Lập tức từ chối và yêu cầu vòng lặp AI Nhập Liệu / Điều tra chỉnh sửa đến khi đúng hoàn toàn.

