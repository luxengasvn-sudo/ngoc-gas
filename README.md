# Website Thương Hiệu Ngọc Gas

Hệ thống website chính thức của **Ngọc Gas** - Chuyên cung cấp sản phẩm gas dân dụng, gas công nghiệp chính hãng và giải pháp thi công hệ thống gas an toàn tại TP. Hồ Chí Minh & Bình Dương.

## 🛠️ Công Nghệ Sử Dụng

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: JavaScript (ES6+)
- **Database**: MySQL (Sử dụng Connection Pool `mysql2`)
- **Authentication**: JWT & Bcrypt (Bảo mật trang Quản trị Admin)
- **Styling**: Vanilla CSS (Tối ưu hóa dung lượng & tốc độ tải trang)
- **Icons**: Lucide React

## 🚀 Khởi Động Dự Án

### 1. Cài đặt thư viện
```bash
npm install
```

### 2. Cấu hình biến môi trường
Tạo file `.env.local` tại thư mục gốc với các thông số:
```env
DATABASE_URL=mysql://<user>:<password>@<host>:<port>/<database_name>
JWT_SECRET=<your-secret-key>
```

### 3. Chạy ở môi trường Development
```bash
npm run dev
```
Truy cập ứng dụng tại: `http://localhost:3000`

### 4. Build Production
```bash
npm run build
npm run start
```

## 📁 Cấu Trúc Thư Mục

- `src/app/(public)` - Giao diện công khai dành cho khách hàng (Trang chủ, Sản phẩm, Giới thiệu, Cửa hàng, Tin tức, Liên hệ)
- `src/app/admin` - Trang quản trị nội bộ (Cài đặt giao diện, Quản lý sản phẩm, Cửa hàng, Bài viết, Liên hệ)
- `src/app/api` - Các RESTful API Endpoints xử lý dữ liệu với MySQL database
- `src/components` - Các Reusable Components (Header, Footer, HeroSection, ProductCard, ContactForm, MobileContactWidget...)
- `src/lib` - Thư viện dùng chung (Database Pool, Authentication JWT)

## 🔒 Bảo Mật & Quy Tắc
- Tuyệt đối không lưu các biến môi trường nhạy cảm (`DATABASE_URL`, `JWT_SECRET`) lên GitHub repository.
- Tuân thủ quy định truyền thông thương hiệu Ngọc Gas (sử dụng từ ngữ uy tín, trung thực, tránh khẳng định mang tính cường điệu/độc tôn).
