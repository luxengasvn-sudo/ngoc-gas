# QUY TRÌNH AI KIỂM TRA & ĐỐI SOÁT ĐA NGUỒN CHUẨN CƠ QUAN NHÀ NƯỚC

**Hệ thống:** Ngọc Gas Geocoding & Public Amenities QA Platform  
**Phiên bản:** 2.0 (Chuẩn địa giới hành chính 2026)  
**Mục đích:** Quy định tiêu chuẩn kỹ thuật và quy trình vận hành tự động bằng AI nhằm kiểm tra chính xác vị trí, tên gọi pháp lý, số điện thoại, liên kết Google Maps và thủ tục hành chính cho toàn bộ các địa điểm công quyền và tiện ích dân sinh.

---

## 1. MỤC TIÊU & PHẠM VI ÁP DỤNG
- **Phạm vi kiểm tra:** Toàn bộ 34 tỉnh/thành phố và 3.319 đơn vị hành chính cấp xã/phường trên lãnh thổ Việt Nam.
- **Đối tượng kiểm toán:**
  - 16.595 trụ sở cơ quan nhà nước chuyên biệt (UBND, Công an, Kho bạc, Tòa án, Viện kiểm sát).
  - 3.319 điểm tiếp nhận và trạm cung ứng gas Ngọc Gas.
  - 6.638 cơ sở y tế (Bệnh viện khu vực, Trạm y tế cơ sở).
  - 9.957 cơ sở giáo dục (Trường mầm non, Tiểu học, THCS).
  - Tổng cộng: **Hơn 36.500 địa điểm**.

---

## 2. NGUỒN THÔNG TIN ĐỐI SOÁT ĐỘC LẬP CHUẨN NHÀ NƯỚC
1. **Bộ Nội vụ & Tổng cục Thống kê (GSO):**
   - Danh mục mã số đơn vị hành chính và địa danh 34 tỉnh thành sau sáp nhập 2026.
   - Thể thức văn bản hành chính theo Nghị định 30/2020/NĐ-CP.
2. **Bộ Thông tin và Truyền thông (Cục Viễn thông):**
   - Bảng quy hoạch mã vùng điện thoại cố định toàn quốc (Decision 2034/QĐ-BTTTT).
   - Mã bưu chính quốc gia 6 ký tự số của VNPOST.
3. **Cổng Dịch vụ công Quốc gia (`dichvucong.gov.vn`):**
   - Danh mục thủ tục hành chính công trực tuyến cấp xã/phường, quy định thời hạn và lệ phí.
4. **Bộ Công An (`bca.gov.vn`):**
   - Quy chuẩn tổ chức Công an nhân dân cấp xã/phường, tiếp nhận tin báo 24/7 và đầu số khẩn cấp 113.
5. **Hệ thống Tư pháp & Tài chính (TAND Tối cao, VKSND Tối cao, Kho bạc Nhà nước):**
   - Thẩm quyền xét xử sơ thẩm, kiểm sát tư pháp và tài khoản thu nộp ngân sách/kho bạc.
6. **Bản đồ Địa lý Số Quốc gia & Google Maps / OpenStreetMap:**
   - Hệ tọa độ WGS84, khung giới hạn Bounding Box vĩ độ - kinh độ của 34 tỉnh thành.

---

## 3. QUY TRÌNH 6 BƯỚC KIỂM TOÁN ĐIỂM-TỪNG-ĐIỂM (6-CHECK PROTOCOL)

```
Bước 1: Quét Tọa Độ GPS & Geofencing (Kiểm tra xem tọa độ có nằm trong ranh giới tỉnh không)
                           │
                           ▼
Bước 2: Kiểm Tra Thể Thức Tên Gọi (Bắt buộc theo chuẩn Nghị định 30, cấm tuyệt đối tên dummy)
                           │
                           ▼
Bước 3: Thẩm Định Địa Chỉ Hành Chính (Đủ 4 cấp: Số nhà/Đường + Xã/Phường + Quận/Huyện + Tỉnh/Thành)
                           │
                           ▼
Bước 4: Đối Soát SĐT & Hotline (Khớp mã vùng Bộ TT&TT, hotline 113 và bắt buộc 1900 9396 cho Ngọc Gas)
                           │
                           ▼
Bước 5: Thẩm Định Liên Kết Google Maps (Cú pháp RFC 3986 URL UTF-8 Encode, Directions & Search)
                           │
                           ▼
Bước 6: Kiểm Tra Giờ Làm Việc & Thủ Tục (Khung giờ công quyền chuẩn, thủ tục Cổng DVC)
```

### Tiêu chí chi tiết từng bước:
- **Bước 1 (Vị trí):** Tọa độ `lat, lng` phải nằm trong khoảng `[minLat, maxLat]` và `[minLng, maxLng]` của tỉnh. Tuyệt đối không chấp nhận tọa độ 0 hoặc rỗng.
- **Bước 2 (Tên gọi):** Phải có các tiền tố chuẩn hóa: `Ủy Ban Nhân Dân`, `Công An`, `Kho Bạc Nhà Nước`, `Tòa Án Nhân Dân`, `Viện Kiểm Sát Nhân Dân`. Không chứa các từ khóa rác (`test`, `dummy`, `tạm`, `undefined`).
- **Bước 3 (Địa chỉ):** Phải có độ dài tối thiểu 12 ký tự và chứa tên tỉnh/thành phố để tránh nhập liệu thiếu sót.
- **Bước 4 (Viễn thông):** Đầu số điện thoại bàn phải khớp với mã vùng Bộ TT&TT ban hành cho tỉnh đó. Hotline Ngọc Gas tại mọi điểm phải là `1900 9396` (Tuân thủ Quy tắc 4 AGENTS.md).
- **Bước 5 (Bản đồ):** URL Google Maps bắt buộc phải tuân thủ chuẩn URL mã hóa RFC 3986 với tham số `query` và `destination`, không bị vỡ liên kết.
- **Bước 6 (Thủ tục):** Bắt buộc có tối thiểu 3 thủ tục hành chính công thiết yếu, kèm thời gian giải quyết và biểu mức lệ phí minh bạch.

---

## 4. HƯỚNG DẪN KÍCH HOẠT LỆNH KIỂM TOÁN TỰ ĐỘNG

Để chạy kiểm toán toàn bộ hệ thống bằng AI, mở Terminal và gõ lệnh:
```bash
npm run audit:agencies
```
hoặc:
```bash
node scripts/qa-pipeline/ai-verifier/run-deep-audit.mjs
```

Hệ thống sẽ quét tự động qua 34 tỉnh thành và tự động cập nhật hai báo cáo:
- Tệp báo cáo kỹ thuật JSON: `scripts/qa-pipeline/audit-deep-report.json`.
- Tệp báo cáo tổng kết Markdown: `AI_CROSS_AUDIT_REPORT.md`.
