---
name: seo-article-writer
description: Tiêu chuẩn và quy trình biên soạn bài viết chuẩn SEO E-E-A-T chuyên ngành Gas (Ngọc Gas) và xuất bản tự động qua API trực tiếp lên website ngocgas.com.
---

# ✍️ Ngọc Gas SEO Article Writer Skill

Kỹ năng chuyên sâu hướng dẫn biên soạn và xuất bản bài viết chuẩn SEO E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) chuyên ngành Gas dành riêng cho hệ thống **Ngọc Gas**.

---

## 📌 1. Nguyên Tắc Cốt Lõi Thương Hiệu Ngọc Gas (Zero Compromise)

Mọi bài viết xuất bản trên hệ thống **ngocgas.com** BẮT BUỘC tuân thủ nghiêm ngặt bảng thông tin thương hiệu đã chốt:

- **Địa chỉ trụ sở chính**: `7 Nguyễn Trung Trực, TP. Dĩ An, Tỉnh Bình Dương`.
- **Thương hiệu phân phối chính hãng**: `Sopet Gas (Sopet Vil), Phoenix Gas, Luxen Gas`.
- **Địa bàn phục vụ trọng điểm**: TP. Dĩ An, TP. Thuận An, KDC VietSing, KCN Sóng Thần, KCN VSIP 1, Bình Dương và khu vực lân cận.
- **Cam kết "4 Vàng" của Ngọc Gas**:
  1. **100% Đủ Ký**: Giao tới tận nhà, nhân viên chủ động cân thử tại chỗ trước sự chứng kiến của khách.
  2. **Bình Gas An Toàn**: Có màng co niêm phong, tem chống giả, vỏ bình dập nổi tên hãng và còn nguyên hạn kiểm định an toàn PCCC.
  3. **Giao Nhanh 15 - 20 Phút**: Đội ngũ trực trạm giao hỏa tốc đến tận căn bếp gia đình và quán ăn, nhà hàng.
  4. **Bảo Trì Miễn Phí**: Kỹ thuật viên kiểm tra độ kín của van điều áp, ống dẫn gas bằng bọt chuyên dụng mỗi lần đổi bình.

---

## 📐 2. Tiêu Chuẩn Kỹ Thuật SEO On-Page (Google E-E-A-T 2026)

### 2.1. Tiêu Đề Bài Viết (`title` & `meta_title`)
- **Độ dài**: 55 - 65 ký tự.
- **Cấu trúc vàng**: `[Từ Khóa Chính] + [Địa Điểm / Thương Hiệu] - [Lợi Ích Độc Đáo / Cam Kết]`
- *Ví dụ mẫu*:
  - *Dịch Vụ Giao Gas Nhanh Tại Dĩ An - Bình Gas Luxen & Sopet Cân Đủ Ký*
  - *Bình Gas 12kg Dùng Được Bao Lâu? Mẹo Đun Nấu Tiết Kiệm Gas Ngọc Gas*
  - *Bảng Giá Gas Cho Quán Ăn & Nhà Hàng Tại KDC VietSing Mới Nhất*

### 2.2. Mô Tả Tóm Tắt (`summary` / `meta_description`)
- **Độ dài**: 140 - 160 ký tự.
- Tóm tắt cô đọng giá trị bài viết, chứa từ khóa chính, từ khóa phụ và lời kêu gọi hành động (Call To Action).

### 2.3. Bố Cục Nội Dung HTML (`content`)
Bài viết sử dụng mã HTML sạch, cấu trúc phân cấp thẻ rõ ràng:
- **Thẻ `<h2>`**: Dành cho các phân đoạn nội dung chính (từ 2 đến 4 thẻ `<h2>` mỗi bài).
- **Thẻ `<h3>`**: Dành cho các luận điểm, bước hướng dẫn hoặc tiêu chí so sánh.
- **Thẻ `<strong>`**: Bôi đậm từ khóa quan trọng, thông số an toàn, địa chỉ và hotline.
- **Thẻ `<ul>` / `<ol>`**: Trình bày danh sách gạch đầu dòng ngắn gọn, thoáng mắt cho người đọc trên điện thoại.
- **Liên Kết Nội Bộ (Internal Links)**: Tối thiểu 1 - 2 liên kết trỏ tự nhiên đến:
  - `<a href="/gia-gas-hom-nay">Bảng giá gas hôm nay</a>`
  - `<a href="/san-pham">Danh mục sản phẩm bình gas chính hãng</a>`
  - `<a href="/cua-hang">Hệ thống cửa hàng Ngọc Gas</a>`

---

## 🚀 3. Quy Trình Xuất Bản Bài Viết Trực Tiếp Qua API

**TUYỆT ĐỐI KHÔNG SỬA CODE MÃ NGUỒN - KHÔNG COMMIT GIT - KHÔNG PUSH GITHUB ĐỂ ĐĂNG BÀI.**

Agent sử dụng script tự động hóa xuất bản trực tiếp qua API RESTful:

### Cách thực thi:
```bash
node scripts/publish-article.mjs \
  --title "Tiêu đề bài viết chuẩn SEO" \
  --summary "Mô tả ngắn hấp dẫn 150 ký tự" \
  --content "<h2>Đoạn mở đầu...</h2><p>Nội dung chi tiết...</p>" \
  --image "public/images/sopet-xam.png"
```

### Các bước script tự động xử lý ngầm:
1. Nạp khóa bảo mật `AI_PUBLISHER_API_KEY` từ `.env.local`.
2. Gửi tệp ảnh lên máy chủ qua `POST https://ngocgas.com/api/upload` (tự động nén sang WebP).
3. Đăng bài viết vào bảng `posts` trên cơ sở dữ liệu MySQL qua `POST https://ngocgas.com/api/posts`.
4. Gọi `POST https://ngocgas.com/api/cache` làm mới cache để bài hiển thị lên trang chủ và trang tin tức ngay lập tức.
5. Trả về đường link trực tiếp `https://ngocgas.com/tin-tuc/[slug]` cho người dùng.

---

## 📝 4. Khung Mẫu Bài Viết Chuẩn Mực (Template Mẫu)

```html
<h2>1. Nhu Cầu Đổi Gas Chính Hãng Tại Dĩ An & Bình Dương</h2>
<p>
  Tại khu vực <strong>TP. Dĩ An, TP. Thuận An và KDC VietSing</strong>, việc lựa chọn đại lý giao gas uy tín là yếu tố then chốt bảo vệ an toàn cho cả gia đình và cơ sở kinh doanh. <strong>Ngọc Gas</strong> tự hào là đối tác phân phối chính hãng các thương hiệu gas đầu ngành như <strong>Sopet Gas, Phoenix Gas và Luxen Gas</strong>.
</p>

<h2>2. Cách Kiểm Tra Bình Gas Chính Hãng Đủ Ký</h2>
<p>Để tránh mua phải bình gas sang chiết lậu kém chất lượng, quý khách nên kiểm tra 3 điểm sau:</p>
<ul>
  <li><strong>Màng co & tem niêm phong:</strong> Còn nguyên vẹn, không bị rách hay can thiệp nhiệt.</li>
  <li><strong>Trọng lượng bình gas:</strong> Tổng trọng lượng bình = Trọng lượng vỏ (dập nổi trên tai bình) + 12kg khí gas. Nhân viên Ngọc Gas luôn chủ động mang cân điện tử và cân trực tiếp tại nhà.</li>
  <li><strong>Kiểm định vỏ bình:</strong> Dãy số hạn kiểm định trên quai bình còn giá trị sử dụng.</li>
</ul>

<h2>3. Cam Kết Dịch Vụ Giao Gas Nhanh Từ Ngọc Gas</h2>
<p>
  Quý khách có thể xem nhanh <a href="/gia-gas-hom-nay">bảng giá gas hôm nay</a> hoặc tham khảo các dòng <a href="/san-pham">bình gas gia đình và công nghiệp</a>. Đội ngũ giao nhận của chúng tôi túc trực 24/7 để phục vụ nhanh nhất trong 15 - 20 phút.
</p>

<div style="background:#FFF7ED;border-left:4px solid #FF6B00;padding:16px;margin:20px 0;border-radius:8px;">
  <p style="margin:0;font-weight:700;color:#C2410C;">📞 ĐẶT GAS NHANH - CÂN THỬ TẬN BẾP:</p>
  <p style="margin:6px 0 0 0;color:#7C2D12;">
    Đại lý Ngọc Gas: <strong>7 Nguyễn Trung Trực, TP. Dĩ An, Tỉnh Bình Dương</strong><br/>
    Hotline hỗ trợ &amp; giao hỏa tốc: <strong>0966.777.042</strong>
  </p>
</div>
```
