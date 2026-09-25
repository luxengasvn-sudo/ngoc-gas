# Webflow UI/UX Enhancement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Hoàn thiện 100% giao diện UI/UX và nội dung website Webflow của Ngọc Gas (`https://ngoc-gas.design.webflow.com/` và `https://ngoc-gas.webflow.io/`), xóa bỏ mọi từ khóa tiếng Anh/template placeholder, chuẩn hóa dữ liệu thương hiệu và hệ thống liên kết chuyển đổi.

**Architecture:** Sử dụng Node.js kết nối trực tiếp với Webflow Designer qua Chrome DevTools Protocol (CDP trên port 9222) để cập nhật DOM canvas iframe (`site-iframe-next`), kích hoạt Publish lên domain `ngoc-gas.webflow.io`, và chạy kiểm thử tự động xác minh chất lượng thực tế.

**Tech Stack:** Node.js (ESM), Chrome DevTools Protocol (WebSocket `ws://127.0.0.1:9222`), Webflow Designer Canvas, Node fetch API.

## Global Constraints

- **Hotline duy nhất**: `1900 9396` (liên kết `tel:19009396`). Tuyệt đối không dùng số lạ.
- **Trụ sở & điểm giao số 1**: `7 Nguyễn Trung Trực, Phường Dĩ An, Tỉnh Bình Dương`.
- **Thương hiệu phân phối**: `Sopet Gas One, Phoenix Gas, Luxen Gas` (Chuẩn tên "Sopet Gas One").
- **Link tra cứu bảng giá**: `https://ngocgas.com/gia-gas-hom-nay`. CẤM dán số tiền cứng.
- **Link cửa hàng**: `https://ngocgas.com/cua-hang`.
- **Bằng chứng thực nghiệm bắt buộc**: HTTP 200 từ `https://ngoc-gas.webflow.io/`, ảnh chụp màn hình live, xác minh sạch 100% text tiếng Anh rác.

---

### Task 1: Xây Dựng Kịch Bản Cập Nhật Nội Dung Toàn Trang (`scripts/perfect-webflow-ui-ux.mjs`)

**Files:**
- Create: `scripts/perfect-webflow-ui-ux.mjs`
- Test: `node scripts/perfect-webflow-ui-ux.mjs --dry-run` hoặc inspect DOM

**Interfaces:**
- Consumes: `getWebflowTab()`, `CDPClient` từ `scripts/webflow-manager.mjs`
- Produces: Hàm thực thi cập nhật toàn diện 8 khu vực trên canvas Webflow

- [ ] **Step 1: Viết script `scripts/perfect-webflow-ui-ux.mjs` với đầy đủ các module cập nhật:**
  - Header & Navbar (Nút Hotline CTA `tel:19009396`)
  - `#process` (3 tab quy trình, 3 card chi tiết, nút liên kết chuẩn)
  - `#testimonials` (6 khách hàng thực tế và đánh giá chi tiết)
  - `#Services` (6 dịch vụ gas chuẩn và mô tả)
  - `#Facts` (100% chính hãng, 15 phút giao nhanh, mô tả an toàn PCCC)
  - `#about` (4 giá trị cốt lõi chuẩn Ngọc Gas)
  - `#pricing` (3 nút tra cứu giá, 4 câu hỏi & trả lời FAQ)
  - `footer` (Gỡ sạch link rác template, cập nhật 3 cột thông tin chính thức)

- [ ] **Step 2: Kiểm tra cú pháp script bằng Node.js check:**
```bash
node --check scripts/perfect-webflow-ui-ux.mjs
```
Expected: Exit Code 0, không có lỗi cú pháp.

- [ ] **Step 3: Commit kịch bản cập nhật vào Git:**
```bash
git add scripts/perfect-webflow-ui-ux.mjs
git commit -m "feat(webflow): add comprehensive ui ux enhancement automation script"
```

---

### Task 2: Thực Thi Cập Nhật Toàn Diện Trên Webflow Designer Canvas

**Files:**
- Modify: Giao diện trực tiếp trên Webflow Designer tab `D3E623EEC8E11BBC9BF9A4D9E3760BE4`

**Interfaces:**
- Consumes: `scripts/perfect-webflow-ui-ux.mjs`
- Produces: Toàn bộ DOM canvas trên Designer được cập nhật chuẩn 100% tiếng Việt & thương hiệu Ngọc Gas

- [ ] **Step 1: Chạy script thực thi cập nhật:**
```bash
node scripts/perfect-webflow-ui-ux.mjs
```
Expected: Toàn bộ 8 phân khu được cập nhật thành công, log chi tiết từng thẻ.

- [ ] **Step 2: Chụp ảnh màn hình Webflow Designer sau khi cập nhật để lưu bằng chứng:**
  - Lưu vào `C:\Users\MKT-LT\.gemini\antigravity-ide\brain\9c699f55-aca9-4b21-8284-e3801f5fdbd0\webflow_designer_enhanced.png`

---

### Task 3: Kích Hoạt Xuất Bản Webflow (Publish to Selected Domains)

**Files:**
- Execute: Trigger Webflow Publish qua CDP trên Designer tab

**Interfaces:**
- Consumes: Action click `[data-automation-id="publish-menu-button"]` và `Publish to selected domains`
- Produces: Website live `https://ngoc-gas.webflow.io/` được cập nhật bản mới nhất

- [ ] **Step 1: Kích hoạt Publish và đợi 12 giây:**
```bash
node -e "import('./scripts/perfect-webflow-ui-ux.mjs').then(m => m.triggerPublish())" # hoặc tích hợp sẵn trong script
```
Expected: Webflow thông báo publish thành công lên `ngoc-gas.webflow.io`.

---

### Task 4: Kiểm Thử Thực Nghiệm & Bằng Chứng Live (Empirical Verification)

**Files:**
- Create: `scripts/verify-webflow-live.mjs`
- Artifact: `webflow_live_site_verified.png`

**Interfaces:**
- Consumes: Live website `https://ngoc-gas.webflow.io/`
- Produces: Log kiểm tra các điều kiện khẳng định (assertions) và ảnh chụp màn hình

- [ ] **Step 1: Viết script kiểm thử `scripts/verify-webflow-live.mjs`:**
  - Kiểm tra HTTP Status = 200
  - Kiểm tra sự xuất hiện của các từ khóa bắt buộc:
    - `NGỌC GAS`
    - `1900 9396`
    - `Sopet Gas One`
    - `Phoenix Gas`
    - `Luxen Gas`
    - `7 Nguyễn Trung Trực`
    - `Giao Gas Hỏa Tốc`
    - `Cân Gas & An Toàn`
    - `Bảng Giá Gas Hôm Nay`
    - `https://ngocgas.com/gia-gas-hom-nay`
  - Kiểm tra KHÔNG CÒN các từ khóa template rác:
    - `Collect Ideas`
    - `Data Analysis`
    - `Finalize Product`
    - `elemis`
    - `Style Guide`
    - `Project Management`
    - `Coriss Ambady`
    - `404`

- [ ] **Step 2: Chạy kiểm thử tự động:**
```bash
node scripts/verify-webflow-live.mjs
```
Expected: Tất cả assertions đều đạt `PASS`, Exit Code 0.

- [ ] **Step 3: Chụp ảnh màn hình toàn trang live và đính kèm vào báo cáo nghiệm thu.**
