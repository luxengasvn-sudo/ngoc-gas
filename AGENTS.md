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

## 📌 2. QUY TẮC NGUỒN DỮ LIỆU CÀI ĐẶT 3 LỚP (UNIFIED SETTINGS HYDRATION)
- `getAllSettings()` trả về object theo thứ tự ghi đè ưu tiên: `dbSettings` -> `fileSettings` -> `memoryCache`.
- **Dữ liệu mới trong File `data/settings.json` và RAM memoryCache LUÔN LUÔN ƯU TIÊN GHI ĐÈ lên MySQL DB cũ**.
- `parseSectionOrder(jsonStr)` BẮT BUỘC giữ nguyên 100% mảng thứ tự vị trí anh tùy chỉnh, tuyệt đối không re-sort hay chèn đè mặc định sai vị trí.

---

## 📌 3. QUY TẮC THƯ VIỆN HÌNH ẢNH TẬP TRUNG (MEDIA LIBRARY MANDATE)
- Tất cả các trường nhập hình ảnh tại Admin (*Cài đặt, Sản phẩm, Bài viết, Cửa hàng*) BẮT BUỘC có nút `🖼️ Thư viện ảnh` (mở `MediaLibraryModal.js`).
- `GET /api/upload` BẮT BUỘC quét đệ quy các thư mục `/uploads` và `/images` và có mảng fallback `defaultPresets` hệ thống, đảm bảo thư viện KHÔNG BAO GIỜ bị rỗng.

---

## 📌 4. CHUẨN THÔNG TIN THƯƠNG HIỆU & GIÁ TRỊ MẶC ĐỊNH (ZERO STATIC HARDCODING)
- **Địa chỉ trụ sở chính**: `7 Nguyễn Trung Trực, TP. Dĩ An, Tỉnh Bình Dương`.
- **Bản đồ Google Maps**: Trỏ đúng vị trí Dĩ An, Bình Dương.
- **Thương hiệu phân phối**: `Sopet, Phoenix, Luxen Gas`.
- **Copyright năm**: `new Date().getFullYear()` (Tự động hóa theo năm hiện tại).
- **Hotline**: Đọc động từ `settings.phone`.
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
