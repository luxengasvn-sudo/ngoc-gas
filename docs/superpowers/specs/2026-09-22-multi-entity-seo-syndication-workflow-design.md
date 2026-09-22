# HỆ THỐNG PHÂN PHỐI NỘI DUNG ĐA TẦNG TỰ ĐỘNG LÊN TOÀN BỘ ENTITY (MULTI-ENTITY SEO SYNDICATION WORKFLOW)

- **Dự án**: Website & Hệ sinh thái số Ngọc Gas (ngocgas.com)
- **Tác giả**: AI Pair Programming & Marketing Automation Team
- **Ngày thiết kế**: 22/09/2026
- **Trạng thái**: Đã thống nhất thiết kế qua phỏng vấn chuyên sâu /grill-me

---

## 📌 1. MỤC TIÊU VÀ BỐI CẢNH (GOALS & CONTEXT)

### 1.1. Vấn đề thực tế
- Khi xuất bản một bài viết mới (Món ăn hoặc Tin tức thị trường) trên `ngocgas.com`, nếu chỉ dừng lại ở website chính thì tốc độ index và độ phủ thương hiệu còn chậm.
- Nếu copy nguyên xi nội dung của bài gốc để dán lên 30 kênh vệ tinh, website sẽ bị dính thuật toán trùng lặp nội dung (**Duplicate Content Penalty**) của Google, làm giảm sức mạnh SEO.

### 1.2. Mục tiêu kiến trúc
- Xây dựng quy trình tự động hóa hoàn toàn (**All-in-one Syndication Pipeline**): Ngay khi bài viết được xuất bản trên website chính, hệ thống tự động tạo ra các phiên bản nội dung độc bản (Unique Content) theo từng góc nhìn chuyên biệt cho từng kênh.
- Đẩy nội dung đa kênh theo cơ chế **Hybrid 2 pha**: Bắn API tức thì cho các kênh hỗ trợ API và chạy ngầm tự động hóa trình duyệt cho các kênh mạng xã hội & bản đồ.
- Thiết lập chiến lược **Mesh Linking & Anchor Diversity** để truyền sức mạnh SEO (PageRank) tự nhiên về website chính và trang Bảng giá hôm nay.
- Tự động ghi nhận và đồng bộ các đường link đã xuất bản lên Google Sheets theo dõi chính thức của Ngọc Gas để tiện kiểm tra trên điện thoại.

---

## 🌐 2. MA TRẬN 5 GÓC NHÌN NỘI DUNG CHUYÊN BIỆT (MULTI-ANGLE ARCHETYPES)

Hệ thống phân tầng 30 kênh Entity thành 5 nhóm nội dung độc lập:

| Nhóm Kênh | Nền tảng tiêu biểu | Góc nhìn nội dung (Content Angle) | Cấu trúc liên kết & Call to Action (CTA) |
|---|---|---|---|
| **Tier 1: Local & Maps** | Google Maps (Dĩ An, Cây Da, VietSing) | Cập nhật điểm giao nhanh, phục vụ tại chỗ 15 phút, an toàn PCCC, bình gas chính hãng đủ ký. | Link về bài viết + Link Bảng giá gas (`/gia-gas-hom-nay`) + Nút gọi Hotline `1900 9396`. |
| **Tier 2: Social Networks** | 5 Fanpage Facebook, LinkedIn | Ngắn gọn, sinh động, bắt trend, thảo luận đời sống bếp núc/năng lượng, hình ảnh thực tế, hashtag địa phương (#NgocGas #GasDiAn). | Link bài viết gốc dưới comment hoặc trong caption, kêu gọi like/share/nhắn tin Zalo. |
| **Tier 3: Web 2.0 & Blogs** | Blogger, WordPress, Tumblr | Bài viết Spinoff mở rộng (300 - 500 từ): Mẹo giữ lửa xanh tiết kiệm gas, bí quyết nấu nướng ngon không cháy đáy nồi, kiến thức tiêu dùng thông minh. | Gắn thẻ Canonical về bài gốc + 2 Contextual Backlink (1 link bài viết + 1 link bảng giá). |
| **Tier 4: Tech & Docs APIs** | Telegra.ph, DEV.to, GitHub, GitLab, Rentry | Bản tóm lược dữ liệu chuẩn Markdown, cấu trúc dữ liệu JSON-LD/Schema, thông số kỹ thuật bình gas hoặc bảng thành phần dinh dưỡng món ăn. | Dẫn nguồn bài viết chính thức (`ngocgas.com`), Hotline 1900 9396. |
| **Tier 5: Q&A & Community** | Quora, Reddit, Disqus, Pinterest | Dạng câu hỏi - giải đáp (FAQ): *"Làm thế nào để...", "Tại sao...", "Nên chọn loại gas nào an toàn nhất?"*. Pinterest gán infographic/hình ảnh món ăn. | Link trích dẫn nguồn giải đáp chi tiết tại `ngocgas.com`. |

---

## 🔗 3. MÔ HÌNH LIÊN KẾT MẠNG LƯỚI (MESH LINKING & ANCHOR DIVERSITY)

Để tối ưu hóa dòng chảy PageRank và miễn nhiễm 100% với thuật toán chống spam liên kết:
1. **Phân bổ Anchor Text tự nhiên**:
   - 40% Anchor text ngữ cảnh theo tiêu đề bài viết (*"hướng dẫn làm gà kho sả ớt đậm đà"*, *"biến động thị trường gas hôm nay"*).
   - 30% Anchor text điều hướng thương hiệu (*"Ngọc Gas"*, *"Đại lý gas Ngọc Gas Dĩ An"*).
   - 20% Anchor text trang chuyển đổi tiền bạc (*"bảng giá gas hôm nay"*, *"giá gas Dĩ An"*).
   - 10% Anchor text chung tự nhiên (*"tại đây"*, *"xem chi tiết"*, *"nguồn bài viết"*).
2. **Liên kết chéo tầng (Cross-Tier Linking)**:
   - Các bài blog Tier 3 ngoài link về website chính sẽ dẫn kèm 1 link về bài đăng Fanpage Facebook hoặc vị trí Google Maps gần nhất để kích hoạt tín hiệu tương tác địa phương (Social Signals & Local Citations).

---

## ⚙️ 4. KIẾN TRÚC THỰC THI KỸ THUẬT (HYBRID 2-PHASE PIPELINE)

```
[Xuất bản bài viết trên ngocgas.com]
                │
                ▼
   [Content Transformation Engine]
   (Tạo 5 phiên bản nội dung độc bản theo ma trận)
                │
         ┌──────┴────────────────────────┐
         ▼                               ▼
 [Pha 1: API Tức Thì (3-5s)]     [Pha 2: Browser Automation (Chạy ngầm)]
 - Telegra.ph API                - Google Maps Updates (3 địa điểm)
 - Git Entity Docs (GitHub/GitLab)- 5 Fanpage Facebook
 - Rentry API                    - Blogger / WordPress / Tumblr
         │                               │
         └──────────────┬────────────────┘
                        ▼
          [Google Sheets Sync Engine]
 (Ghi nhận link bài đăng vào Sheet Thống Kê chính thức)
```

### Chi tiết 2 Pha:
1. **Pha 1 - Fast REST API (Hoàn thành trong 3 - 5 giây)**:
   - Sử dụng script Node.js gọi thẳng REST API của Telegra.ph, Rentry và tự động push commit cập nhật tài liệu thực thể lên GitHub/GitLab.
   - Đảm bảo có ngay các backlink có thể index tức thì trong vài phút.

2. **Pha 2 - Browser Automation Subagent (Chạy ngầm an toàn)**:
   - Chạy tuần tự qua các phiên đăng nhập sẵn trên trình duyệt (Google Business Profile, Facebook Meta Business Suite, Blogger...).
   - Đăng bài kèm ảnh đại diện chất lượng cao, giữ khoảng cách thời gian tự nhiên giữa các thao tác để bảo vệ độ uy tín tài khoản.

3. **Pha 3 - Đồng bộ Google Sheets**:
   - Cập nhật tự động link của các bài viết vệ tinh vừa đăng thành công vào Google Spreadsheet theo dõi của Ngọc Gas.

---

## 📊 5. KẾ HOẠCH BÀO CHẾ & KIỂM THỬ THỰC TẾ

1. **Module `scripts/syndication-matrix.mjs`**: Chứa logic sinh 5 góc nhìn nội dung và ma trận anchor text dựa trên thông tin bài viết gốc.
2. **Module `scripts/syndicate-post.mjs`**: Nâng cấp bộ điều phối Hybrid chạy tự động tích hợp sau hàm `publishArticle`.
3. **Module `scripts/sync-sheets.mjs`**: Tích hợp ghi nhận cột đường link vệ tinh lên Google Sheets.
4. **Kiểm thử mẫu (Dry Run & Live Run)**: Thực hiện kiểm thử toàn diện trên 1 bài viết mẫu, trích xuất dữ liệu log và ảnh chụp màn hình làm bằng chứng hoàn thành.
