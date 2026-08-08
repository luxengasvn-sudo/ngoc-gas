import db from '@/lib/db';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import ProductGallery from '@/components/ProductGallery';
import ProductOrderButton from '@/components/ProductOrderButton';
import { Flame, ShieldCheck } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Fresh database query always

const allFallbackProducts = [
  { 
    id: 1, 
    name: 'Bình Gas Sopet Vil 12kg (Xám)', 
    slug: 'binh-gas-sopet-vil-12kg-xam', 
    short_description: 'Dịch vụ giao gas nhanh tại Dĩ An, Thuận An & VietSing. Bình gas Sopet Vil 12kg xám tiêu chuẩn chính hãng, lửa xanh tiết kiệm.', 
    description: `<h2>Dịch Vụ Giao Gas Nhanh Bình Gas Sopet Vil 12kg Xám Tận Nhà</h2>
<p>Bạn đang có nhu cầu sử dụng dịch vụ <strong>giao gas nhanh tại Dĩ An, giao gas nhanh tại Thuận An, giao gas nhanh tại VietSing</strong> hay các địa bàn lân cận như <strong>giao gas nhanh tại TP.HCM, giao gas nhanh tại Bình Dương</strong>? Ngọc Gas (Địa chỉ chính thức: <em>7 Nguyễn Trung Trực, Dĩ An</em>) chuyên phân phối bình gas Sopet Vil 12kg vỏ xám chính hãng với cam kết giao tận nơi chỉ trong 15-30 phút.</p>

<img src="/images/sopet-xam.png" alt="Bình Gas Sopet Vil 12kg Xám giao gas nhanh tại Dĩ An Thuận An VietSing TP.HCM Bình Dương" style="width: 100%; max-width: 500px; height: auto; border-radius: 12px; margin: 20px auto; display: block; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />

<h3>1. Đặc Điểm Nổi Bật Của Bình Gas Sopet Vil 12kg Vỏ Xám</h3>
<p>Bình gas Sopet Vil 12kg vỏ màu xám được sản xuất theo công nghệ Nhật Bản hiện đại, đáp ứng các tiêu chuẩn an toàn PCCC khắt khe:</p>
<ul>
  <li><strong>Khí gas tinh khiết:</strong> Ngọn lửa cháy xanh đều, đốt cháy hoàn toàn nhiên liệu, không làm đen đáy nồi chảo.</li>
  <li><strong>Vỏ bình chịu áp lực tốt:</strong> Được làm từ thép nhập khẩu cao cấp, phun sơn tĩnh điện chống ăn mòn hóa chất.</li>
  <li><strong>Tem chống hàng giả:</strong> Cổ van được bọc màng co nguyên vẹn có mã QR code truy xuất nguồn gốc rõ ràng.</li>
</ul>

<h3>2. Phạm Vi Phục Vụ Giao Gas Nhanh Ngọc Gas</h3>
<h4>4 Khu Vực Trọng Điểm Giao Gas Siêu Tốc:</h4>
<ul>
  <li><strong>Giao gas nhanh tại Dĩ An:</strong> Phường Dĩ An, An Bình, Tân Đông Hiệp, Đông Hòa, Bình An.</li>
  <li><strong>Giao gas nhanh tại Thuận An:</strong> Phường An Phú, Thuận Giao, Lái Thiêu, Bình Chuẩn.</li>
  <li><strong>Giao gas nhanh tại VietSing:</strong> Khu dân cư VietSing (VSIP 1) và các tuyến đường lân cận.</li>
  <li><strong>Giao gas nhanh tại TP.HCM & Bình Dương:</strong> Giao hàng 24/7 tận căn hộ chung cư, nhà phố và quán ăn.</li>
</ul>

<h3>3. Quy Trình Phục Vụ Giao Gas Nhanh Đạt Chuẩn An Toàn</h3>
<ol>
  <li>Khách hàng gọi điện tới hotline <strong>19009396</strong>.</li>
  <li>Kỹ thuật viên xuất phát giao gas nhanh tận bếp trong 15-30 phút.</li>
  <li>Cân thử bình gas trực tiếp tại chỗ trước sự chứng kiến của khách hàng để đảm bảo đủ 12kg ruột gas.</li>
  <li>Kiểm tra rò rỉ van gas và vệ sinh bếp gas miễn phí.</li>
</ol>

<p>👉 Liên hệ ngay hotline chính thức <strong>19009396</strong> để trải nghiệm dịch vụ <strong>giao gas nhanh tại Dĩ An, Thuận An, VietSing, TP.HCM & Bình Dương</strong>!</p>`,
    price: 420000, 
    sale_price: 395000, 
    image_url: '/images/sopet-xam.png', 
    category_id: 1, 
    is_featured: 1, 
    is_active: 1 
  },
  { 
    id: 2, 
    name: 'Bình Gas Sopet Vil 12kg (Xanh Đen)', 
    slug: 'binh-gas-sopet-vil-12kg-xanh-den', 
    short_description: 'Dịch vụ giao gas nhanh tại Thuận An & VietSing. Bình gas Sopet Vil 12kg vỏ xanh đen cao cấp, kiểm định an toàn PCCC.', 
    description: `<h2>Dịch Vụ Giao Gas Nhanh Bình Gas Sopet Vil 12kg Xanh Đen</h2>
<p>Sản phẩm bình gas Sopet Vil 12kg vỏ xanh đen sở hữu nước sơn tĩnh điện láng mịn, vỏ bình dày chịu nhiệt chịu áp suất cao. Ngọc Gas túc trực 24/7 mang đến dịch vụ <strong>giao gas nhanh tại VietSing, giao gas nhanh tại Thuận An, giao gas nhanh tại Dĩ An, giao gas nhanh tại TP.HCM, giao gas nhanh tại Bình Dương</strong>.</p>

<img src="/images/sopet-xanh-den.png" alt="Bình Gas Sopet Vil 12kg Xanh Đen giao gas nhanh tại VietSing Thuận An Dĩ An TP.HCM Bình Dương" style="width: 100%; max-width: 500px; height: auto; border-radius: 12px; margin: 20px auto; display: block; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />

<h3>1. Lý Do Bình Gas Sopet Vil 12kg Xanh Đen Được Ưa Chuộng</h3>
<ul>
  <li><strong>Thiết kế sang trọng:</strong> Màu xanh đen hiện đại, sạch sẽ cho không gian bếp.</li>
  <li><strong>Khí gas cháy kiệt:</strong> Tiết kiệm từ 10-15% chi phí nhiên liệu hàng tháng.</li>
  <li><strong>Độ an toàn cao:</strong> Trang bị van khóa tự động ngắt gas khi phát hiện sự cố rò rỉ.</li>
</ul>

<h3>2. Dịch Vụ Giao Gas Nhanh Chuyên Nghiệp Từ Ngọc Gas</h3>
<h4>Ưu Điểm Khi Đổi Gas Tại Ngọc Gas (7 Nguyễn Trung Trực, Dĩ An):</h4>
<ul>
  <li><strong>Giao gas nhanh tại Dĩ An & Thuận An:</strong> Đội ngũ nhân viên thông thuộc mọi tuyến đường địa phương.</li>
  <li><strong>Giao gas nhanh tại VietSing:</strong> Giao tận căn hộ, phòng trọ, quán ăn KDC VietSing.</li>
  <li><strong>Giao gas nhanh tại TP.HCM & Bình Dương:</strong> Phục vụ xuyên suốt từ 6h00 đến 22h00 kể cả ngày nghỉ lễ.</li>
</ul>

<h3>3. Cam Kết Của Ngọc Gas Với Khách Hàng</h3>
<p>Chúng tôi cam kết 100% bình gas Sopet Vil 12kg Xanh Đen giao tới tay khách hàng đều đủ trọng lượng, nguyên tem niêm phong và được kiểm định PCCC hợp pháp.</p>

<p>👉 Đổi gas dễ dàng, gọi ngay hotline: <strong>19009396</strong>.</p>`,
    price: 425000, 
    sale_price: 400000, 
    image_url: '/images/sopet-xanh-den.png', 
    category_id: 1, 
    is_featured: 1, 
    is_active: 1 
  },
  { 
    id: 3, 
    name: 'Bình Gas Sopet Vil 12kg (Xanh)', 
    slug: 'binh-gas-sopet-vil-12kg-xanh', 
    short_description: 'Dịch vụ giao gas nhanh tại TP.HCM & Bình Dương. Bình gas Sopet Vil 12kg vỏ xanh tiêu chuẩn gia đình.', 
    description: `<h2>Giao Gas Nhanh Bình Gas Sopet Vil 12kg Vỏ Xanh Tiêu Chuẩn</h2>
<p>Bình gas Sopet Vil 12kg màu xanh lá thân thuộc là bạn đồng hành nấu nướng tin cậy của hàng vạn gia đình. Ngọc Gas chuyên dịch vụ <strong>giao gas nhanh tại Dĩ An, giao gas nhanh tại Thuận An, giao gas nhanh tại VietSing, giao gas nhanh tại TP.HCM, giao gas nhanh tại Bình Dương</strong>.</p>

<img src="/images/sopet-xanh.png" alt="Bình Gas Sopet Vil 12kg Xanh giao gas nhanh tại TP.HCM Bình Dương Dĩ An Thuận An VietSing" style="width: 100%; max-width: 500px; height: auto; border-radius: 12px; margin: 20px auto; display: block; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />

<h3>1. Thông Số Kỹ Thuật Bình Gas Sopet Vil 12kg Vỏ Xanh</h3>
<ul>
  <li>Trọng lượng ruột gas: 12kg LPG tinh khiết.</li>
  <li>Màu sắc vỏ bình: Xanh lá cây tươi sáng.</li>
  <li>Tiêu chuẩn sản xuất: Công nghệ Sopet Vil Nhật Bản.</li>
</ul>

<h3>2. Địa Bàn Phục Vụ Giao Gas Nhanh</h3>
<h4>Phủ Sóng Rộng Khắp Các Khu Vực:</h4>
<ul>
  <li><strong>Giao gas nhanh tại Dĩ An:</strong> Tiếp cận nhanh mọi phường và khu dân cư.</li>
  <li><strong>Giao gas nhanh tại Thuận An & VietSing:</strong> Giao hàng tốc độ cho nhà hàng, quán ăn, hộ gia đình.</li>
  <li><strong>Giao gas nhanh tại TP.HCM & Bình Dương:</strong> Đảm bảo nguồn năng lượng nấu nướng không bị gián đoạn.</li>
</ul>

<h3>3. Hướng Dẫn Kiểm Tra Bình Gas Chính Hãng</h3>
<h4>3 Bước Nhận Biết Bình Gas Đạt Chuẩn:</h4>
<ol>
  <li>Kiểm tra màng co bọc van còn nguyên vẹn tem thương hiệu.</li>
  <li>Cân tổng trọng lượng bình (Tổng cân = Trọng lượng vỏ in trên bình + 12kg ruột).</li>
  <li>Yêu cầu nhân viên giao gas bật bếp thử ngọn lửa xanh trước khi thanh toán.</li>
</ol>

<p>👉 Tổng đài hỗ trợ <strong>giao gas nhanh</strong> chính thức: <strong>19009396</strong>.</p>`,
    price: 420000, 
    sale_price: 395000, 
    image_url: '/images/sopet-xanh.png', 
    category_id: 1, 
    is_featured: 1, 
    is_active: 1 
  },
  { 
    id: 4, 
    name: 'Bình Gas Sopet Vil 12kg (Đỏ)', 
    slug: 'binh-gas-sopet-vil-12kg-do', 
    short_description: 'Dịch vụ giao gas nhanh tại Dĩ An. Bình gas Sopet Vil 12kg vỏ đỏ chính hãng, an toàn tuyệt đối.', 
    description: `<h2>Dịch Vụ Giao Gas Nhanh Bình Gas Sopet Vil 12kg Màu Đỏ</h2>
<p>Bình gas Sopet Vil 12kg màu đỏ có thiết kế nổi bật, vỏ bình chống va đập cực tốt. Ngọc Gas hân hạnh cung cấp dịch vụ <strong>giao gas nhanh tại Dĩ An, giao gas nhanh tại Thuận An, giao gas nhanh tại VietSing, giao gas nhanh tại TP.HCM, giao gas nhanh tại Bình Dương</strong>.</p>

<img src="/images/sopet.png" alt="Bình Gas Sopet Vil 12kg Đỏ giao gas nhanh tại Dĩ An Thuận An VietSing TP.HCM Bình Dương" style="width: 100%; max-width: 500px; height: auto; border-radius: 12px; margin: 20px auto; display: block; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />

<h3>1. Điểm Tựa An Toàn Cho Căn Bếp Nấu Nướng</h3>
<ul>
  <li>Chất lượng gas đạt tiêu chuẩn quốc tế, cho hiệu suất nhiệt cao.</li>
  <li>Hệ thống van bảo vệ chống rò rỉ tối đa.</li>
  <li>Vỏ bình dập nổi thương hiệu Sopet Vil rõ nét, không sợ hàng giả.</li>
</ul>

<h3>2. Vì Sao Nên Chọn Dịch Vụ Giao Gas Nhanh Ngọc Gas?</h3>
<p>Đại lý Ngọc Gas tại <em>7 Nguyễn Trung Trực, TP. Dĩ An</em> cam kết đem lại trải nghiệm giao gas tốt nhất:</p>
<ul>
  <li><strong>Giao gas nhanh tại Dĩ An:</strong> Đến nhà trong 15-20 phút.</li>
  <li><strong>Giao gas nhanh tại Thuận An & VietSing:</strong> Nhân viên tận tâm, bê bình gas tận nơi.</li>
  <li><strong>Giao gas nhanh tại TP.HCM & Bình Dương:</strong> Kiểm tra an toàn dây dẫn gas miễn phí.</li>
</ul>

<p>👉 Đặt gas ngay qua hotline: <strong>19009396</strong>.</p>`,
    price: 430000, 
    sale_price: 405000, 
    image_url: '/images/sopet.png', 
    category_id: 1, 
    is_featured: 1, 
    is_active: 1 
  },
  { 
    id: 5, 
    name: 'Bình Gas Phoenix Gas 12kg (Xám)', 
    slug: 'binh-gas-phoenix-gas-12kg-xam', 
    short_description: 'Dịch vụ giao gas nhanh tại Dĩ An & Thuận An. Bình gas Phoenix 12kg vỏ xám tiết kiệm cho hộ gia đình.', 
    description: `<h2>Giao Gas Nhanh Bình Gas Phoenix Gas 12kg Xám Chuyên Nghiệp</h2>
<p>Bình Gas Phoenix Gas 12kg màu xám là dòng sản phẩm gas tiết kiệm ngân sách tiêu dùng cho mọi gia đình và nhà hàng. Ngọc Gas cung cấp dịch vụ <strong>giao gas nhanh tại Dĩ An, giao gas nhanh tại Thuận An, giao gas nhanh tại VietSing, giao gas nhanh tại TP.HCM, giao gas nhanh tại Bình Dương</strong>.</p>

<img src="/images/phoenix-xam.png" alt="Bình Gas Phoenix Gas 12kg Xám giao gas nhanh tại Dĩ An Thuận An VietSing TP.HCM Bình Dương" style="width: 100%; max-width: 500px; height: auto; border-radius: 12px; margin: 20px auto; display: block; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />

<h3>1. Đặc Tính Kỹ Thuật Sản Phẩm Phoenix Gas 12kg Xám</h3>
<ul>
  <li>Trọng lượng LPG: 12kg (chênh lệch tiêu chuẩn ±200g).</li>
  <li>Áp suất vận hành ổn định, ngọn lửa xanh không gây mùi cay mắt.</li>
  <li>Giá thành hợp lý, phù hợp nhu cầu đun nấu liên tục.</li>
</ul>

<h3>2. Trạm Giao Gas Nhanh Phục Vụ Liên Tục</h3>
<ul>
  <li><strong>Giao gas nhanh tại Dĩ An:</strong> Túc trực 24/7 tại khu vực Trung tâm Dĩ An.</li>
  <li><strong>Giao gas nhanh tại Thuận An & VietSing:</strong> Đổi gas nhanh chóng cho các hộ gia đình và bếp ăn.</li>
  <li><strong>Giao gas nhanh tại TP.HCM & Bình Dương:</strong> Giao nhận tận nơi với đầy đủ hóa đơn chứng từ.</li>
</ul>

<p>👉 Hãy liên hệ tổng đài <strong>19009396</strong> để được giao gas nhanh nhất!</p>`,
    price: 410000, 
    sale_price: 385000, 
    image_url: '/images/phoenix-xam.png', 
    category_id: 1, 
    is_featured: 1, 
    is_active: 1 
  },
  { 
    id: 6, 
    name: 'Bình Gas Phoenix Gas 12kg (Xanh)', 
    slug: 'binh-gas-phoenix-gas-12kg-xanh', 
    short_description: 'Dịch vụ giao gas nhanh tại KDC VietSing. Bình gas Phoenix 12kg vỏ xanh lá chính hãng Phoenix Gas.', 
    description: `<h2>Dịch Vụ Giao Gas Nhanh Bình Gas Phoenix Gas 12kg Xanh</h2>
<p>Thương hiệu Phoenix Gas màu xanh lá tươi sáng được thị trường đánh giá cao nhờ chất lượng gas ổn định. Ngọc Gas chuyên nhận <strong>giao gas nhanh tại VietSing, giao gas nhanh tại Dĩ An, giao gas nhanh tại Thuận An, giao gas nhanh tại TP.HCM, giao gas nhanh tại Bình Dương</strong>.</p>

<img src="/images/phoenix-lg-xanh.png" alt="Bình Gas Phoenix Gas 12kg Xanh giao gas nhanh tại VietSing Dĩ An Thuận An TP.HCM Bình Dương" style="width: 100%; max-width: 500px; height: auto; border-radius: 12px; margin: 20px auto; display: block; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />

<h3>1. Ưu Điểm Khi Sử Dụng Phoenix Gas 12kg Xanh</h3>
<ul>
  <li>Khí gas hóa lỏng đạt chuẩn chất lượng cao.</li>
  <li>Ngọn lửa xoáy xanh giúp đun sôi thức ăn nhanh chóng.</li>
  <li>Vỏ bình sơn tĩnh điện chống va đập và móp méo.</li>
</ul>

<h3>2. Ngọc Gas - Địa Chỉ Đổi Gas Nhanh Uy Tín Tại Bình Dương</h3>
<p>Trạm giao gas Ngọc Gas tại <em>7 Nguyễn Trung Trực, Dĩ An</em> luôn có sẵn lực lượng giao hàng đông đảo:</p>
<ul>
  <li><strong>Giao gas nhanh tại VietSing:</strong> Tiếp cận mọi ngõ ngách khu dân cư VietSing chỉ trong 15 phút.</li>
  <li><strong>Giao gas nhanh tại Dĩ An & Thuận An:</strong> Luôn có kỹ thuật viên kiểm tra rò rỉ gas bằng thiết bị chuyên dụng.</li>
  <li><strong>Giao gas nhanh tại TP.HCM & Bình Dương:</strong> Thái độ phục vụ niềm nở, tận tình.</li>
</ul>

<p>👉 Hotline hỗ trợ giao gas: <strong>19009396</strong>.</p>`,
    price: 415000, 
    sale_price: 390000, 
    image_url: '/images/phoenix-lg-xanh.png', 
    category_id: 1, 
    is_featured: 1, 
    is_active: 1 
  },
  { 
    id: 7, 
    name: 'Bình Gas Phoenix Gas 12kg (Đỏ)', 
    slug: 'binh-gas-phoenix-gas-12kg-do', 
    short_description: 'Dịch vụ giao gas nhanh tại TP.HCM & Bình Dương. Bình gas Phoenix 12kg vỏ đỏ nổi bật, áp suất ổn định.', 
    description: `<h2>Giao Gas Nhanh Bình Gas Phoenix Gas 12kg Màu Đỏ</h2>
<p>Sản phẩm bình gas Phoenix Gas 12kg màu đỏ có kết cấu vỏ thép kiên cố, áp suất gas ổn định tuyệt đối. Đội ngũ Ngọc Gas cam kết <strong>giao gas nhanh tại TP.HCM, giao gas nhanh tại Bình Dương, giao gas nhanh tại Dĩ An, giao gas nhanh tại Thuận An, giao gas nhanh tại VietSing</strong>.</p>

<img src="/images/phoenix-do.png" alt="Bình Gas Phoenix Gas 12kg Đỏ giao gas nhanh tại TP.HCM Bình Dương Dĩ An Thuận An VietSing" style="width: 100%; max-width: 500px; height: auto; border-radius: 12px; margin: 20px auto; display: block; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />

<h3>1. Sự Lựa Chọn Hoàn Hảo Cho Bếp Ăn Gia Đình</h3>
<ul>
  <li>Ngọn lửa cháy đều, nhiệt lượng tỏa ra mạnh mẽ.</li>
  <li>Không tạo cặn hay bẩn kiềng bếp.</li>
  <li>Kiểm định an toàn vỏ bình đầy đủ hạn sử dụng.</li>
</ul>

<h3>2. Dịch Vụ Khách Hàng Chu Đáo Của Ngọc Gas</h3>
<ul>
  <li><strong>Giao gas nhanh tại Dĩ An:</strong> Giao hàng miễn phí tận nhà.</li>
  <li><strong>Giao gas nhanh tại Thuận An & VietSing:</strong> Cân gas trực tiếp tại chỗ.</li>
  <li><strong>Giao gas nhanh tại TP.HCM & Bình Dương:</strong> Sẵn sàng phục vụ từ sáng sớm tới đêm muộn.</li>
</ul>

<p>👉 Liên hệ tổng đài: <strong>19009396</strong>.</p>`,
    price: 420000, 
    sale_price: 395000, 
    image_url: '/images/phoenix-do.png', 
    category_id: 1, 
    is_featured: 1, 
    is_active: 1 
  },
  { 
    id: 8, 
    name: 'Bình Gas Luxen Gas 12kg', 
    slug: 'binh-gas-luxen-gas-12kg', 
    short_description: 'Dịch vụ giao gas nhanh tại VietSing & Thuận An. Bình gas Luxen Gas 12kg chất lượng cao, vỏ bình chịu lực tiêu chuẩn.', 
    description: `<h2>Dịch Vụ Giao Gas Nhanh Bình Gas Luxen Gas 12kg Chính Hãng</h2>
<p>Bình Gas Luxen Gas 12kg là thương hiệu gas địa phương uy tín hàng đầu tại tỉnh Bình Dương. Ngọc Gas chuyên cung cấp dịch vụ <strong>giao gas nhanh tại VietSing, giao gas nhanh tại Thuận An, giao gas nhanh tại Dĩ An, giao gas nhanh tại TP.HCM, giao gas nhanh tại Bình Dương</strong>.</p>

<img src="/images/luxen-gas.png" alt="Bình Gas Luxen Gas 12kg giao gas nhanh tại VietSing Thuận An Dĩ An TP.HCM Bình Dương" style="width: 100%; max-width: 500px; height: auto; border-radius: 12px; margin: 20px auto; display: block; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />

<h3>1. Đặc Điểm Nổi Bật Của Luxen Gas 12kg</h3>
<ul>
  <li>Chất lượng LPG đạt độ tinh khiết cao, cháy không tạo khói độc.</li>
  <li>Vỏ bình đúc chuẩn thông số kỹ thuật PCCC.</li>
  <li>Tương thích tốt với mọi dòng bếp gas đơn, bếp gas đôi hiện nay.</li>
</ul>

<h3>2. Mạng Lưới Giao Gas Nhanh Tận Nơi</h3>
<p>Với tổng kho địa chỉ tại <em>7 Nguyễn Trung Trực, Dĩ An</em>, Ngọc Gas cam kết:</p>
<ul>
  <li><strong>Giao gas nhanh tại Dĩ An & Thuận An:</strong> Chỉ từ 15-25 phút.</li>
  <li><strong>Giao gas nhanh tại VietSing:</strong> Tận tâm lắp đặt cho hộ gia đình và nhà trọ.</li>
  <li><strong>Giao gas nhanh tại TP.HCM & Bình Dương:</strong> Kiểm tra rò rỉ khí gas bằng máy đo chuyên dụng.</li>
</ul>

<p>👉 Đổi gas Luxen chính hãng ngay: <strong>19009396</strong>.</p>`,
    price: 420000, 
    sale_price: 395000, 
    image_url: '/images/luxen-gas.png', 
    category_id: 1, 
    is_featured: 1, 
    is_active: 1 
  },
  { 
    id: 9, 
    name: 'Bình Gas Luxen Gas 45kg (Công Nghiệp)', 
    slug: 'binh-gas-luxen-gas-45kg-cong-nghiep', 
    short_description: 'Dịch vụ giao gas nhanh tại KCN VSIP 1 & Dĩ An. Bình gas công nghiệp Luxen 45kg chuyên dùng cho Nhà hàng, Bếp ăn.', 
    description: `<h2>Dịch Vụ Giao Gas Nhanh Bình Gas Công Nghiệp Luxen Gas 45kg</h2>
<p>Bình Gas Luxen Gas 45kg (Bình gas bò công nghiệp) là giải pháp cung cấp nhiên liệu công suất lớn dành cho các nhà hàng, khách sạn, bếp ăn tập thể KCN và xưởng sản xuất. Ngọc Gas là đơn vị chuyên nghiệp hỗ trợ <strong>giao gas nhanh tại KCN VSIP 1, giao gas nhanh tại VietSing, giao gas nhanh tại Dĩ An, giao gas nhanh tại Thuận An, giao gas nhanh tại TP.HCM, giao gas nhanh tại Bình Dương</strong>.</p>

<img src="/images/luxen-45.png" alt="Bình Gas Luxen Gas 45kg công nghiệp giao gas nhanh tại KCN VSIP 1 VietSing Dĩ An Thuận An TP.HCM Bình Dương" style="width: 100%; max-width: 500px; height: auto; border-radius: 12px; margin: 20px auto; display: block; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />

<h3>1. Ưu Điểm Khi Sử Dụng Bình Gas Công Nghiệp Luxen 45kg</h3>
<ul>
  <li><strong>Dung tích cực đại 45kg:</strong> Duy trì áp suất ngọn lửa cháy lớn liên tục cho các dòng bếp khè, bếp âu, bếp á.</li>
  <li><strong>Tối ưu chi phí:</strong> Mức giá chiết khấu ưu đãi hấp dẫn dành cho hợp đồng tiêu thụ số lượng lớn.</li>
  <li><strong>Kiểm định PCCC nghiêm ngặt:</strong> Đảm bảo vỏ bình chịu được áp suất cao trong môi trường bếp đun nấu công nghiệp.</li>
</ul>

<h3>2. Giải Pháp Thi Công Giàn Gom Gas Chuyên Nghiệp</h3>
<h4>Ngọc Gas Hỗ Trợ Kỹ Thuật Toàn Diện:</h4>
<ul>
  <li>Tư vấn và thiết kế hệ thống giàn gom gas công nghiệp 2-4-8-12 bình chuẩn PCCC.</li>
  <li>Thi công đường ống dẫn gas bằng inox/đồng chất lượng cao.</li>
  <li><strong>Giao gas nhanh tại Dĩ An, Thuận An, VietSing:</strong> Thay thế bình gas hết nhanh chóng, không để bếp bị gián đoạn giờ phục vụ khách.</li>
  <li><strong>Giao gas nhanh tại TP.HCM & Bình Dương:</strong> Kiểm tra và bảo dưỡng hệ thống van điều áp định kỳ miễn phí.</li>
</ul>

<p>👉 Quý khách hàng nhà hàng, quán ăn cần khảo sát và nhận báo giá gas công nghiệp 45kg, vui lòng gọi hotline: <strong>19009396</strong> (Ngọc Gas 7 Nguyễn Trung Trực, Dĩ An).</p>`,
    price: 1550000, 
    sale_price: 1450000, 
    image_url: '/images/luxen-45.png', 
    category_id: 1, 
    is_featured: 1, 
    is_active: 1 
  }
];

export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  try {
    const [rows] = await db.query('SELECT name, short_description FROM products WHERE slug = ?', [slug]);
    if (rows && rows.length > 0) {
      const product = rows[0];
      return {
        title: `${product.name} - Giao Gas Nhanh Tại Dĩ An, Thuận An, VietSing - NGỌC GAS`,
        description: product.short_description || `Mua ${product.name} chính hãng, giá tốt tại Ngọc Gas TP. HCM & Bình Dương. Giao gas nhanh.`,
        keywords: `${product.name}, giao gas nhanh, giao gas nhanh tại Dĩ An, giao gas nhanh tại Thuận An, giao gas nhanh tại VietSing, giao gas nhanh tại TP.HCM, giao gas nhanh tại Bình Dương, ngoc gas`
      };
    }
  } catch (e) {
    console.error('Error generating product metadata:', e.message);
  }

  const fallbackObj = allFallbackProducts.find(p => p.slug === slug);
  if (fallbackObj) {
    return {
      title: `${fallbackObj.name} - Giao Gas Nhanh Tại Dĩ An, Thuận An, VietSing - NGỌC GAS`,
      description: fallbackObj.short_description,
      keywords: `${fallbackObj.name}, giao gas nhanh, giao gas nhanh tại Dĩ An, giao gas nhanh tại Thuận An, giao gas nhanh tại VietSing, giao gas nhanh tại TP.HCM, giao gas nhanh tại Bình Dương, ngoc gas`
    };
  }
  
  return {
    title: 'Sản phẩm gas chất lượng - NGỌC GAS',
    description: 'Danh sách sản phẩm bình gas gia đình, gas công nghiệp và phụ kiện bếp gas chính hãng tại TP. HCM & Bình Dương.'
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;

  let product = null;
  let relatedProducts = [];

  try {
    const [prodRows] = await db.query(`
      SELECT p.*, c.name AS category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      WHERE p.slug = ? AND p.is_active = 1
    `, [slug]);

    if (prodRows && prodRows.length > 0) {
      product = prodRows[0];
    }
  } catch (error) {
    console.error('Error fetching product detail:', error.message);
  }

  // Fallback to default product list if DB is offline or slug missing in DB
  if (!product) {
    const foundFallback = allFallbackProducts.find(p => p.slug === slug);
    if (foundFallback) {
      product = {
        ...foundFallback,
        category_name: 'Gas Dân Dụng & Công Nghiệp'
      };
    } else {
      notFound();
    }
  }

  // Ensure rich description with H2/H3/H4/Img Alt/Keywords if DB description is short or missing
  const foundFallback = allFallbackProducts.find(p => p.slug === slug);
  if (foundFallback && (!product.description || product.description.length < 100)) {
    product.description = foundFallback.description;
  }

  // Safe analytics click log
  try {
    db.query(
      `INSERT INTO analytics_clicks (click_type, label, page_url) VALUES ('product_view', ?, ?)`,
      [product.name, `/san-pham/${slug}`]
    ).catch(() => {});
  } catch (e) {}

  // Fetch related products
  try {
    const [relatedRows] = await db.query(`
      SELECT p.*, c.name AS category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      WHERE p.id != ? AND p.is_active = 1 
      LIMIT 3
    `, [product.id || 0]);
    relatedProducts = relatedRows || [];
  } catch (e) {}

  if (!relatedProducts || relatedProducts.length === 0) {
    relatedProducts = allFallbackProducts.filter(p => p.slug !== slug).slice(0, 3);
  }

  // Fetch hotline settings
  let hotline = '19009396';
  try {
    const [settingRows] = await db.query("SELECT setting_value FROM settings WHERE setting_key = 'phone'");
    if (settingRows && settingRows.length > 0) {
      hotline = settingRows[0].setting_value;
    }
  } catch (e) {}

  const formatPrice = (price) => {
    if (!price) return 'Liên hệ';
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const hasSale = product.sale_price && Number(product.sale_price) > 0;

  return (
    <>
      <div className="product-detail-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Trang chủ</Link>
            <span className="separator">/</span>
            <Link href="/san-pham">Sản phẩm</Link>
            <span className="separator">/</span>
            <span className="current">{product.name}</span>
          </div>
        </div>
      </div>

      <section className="section-padding">
        <div className="container">
          <div className="product-detail-grid">
            
            {/* Product Image Column */}
            <div className="product-detail-image-panel">
              <ProductGallery mainImage={product.image_url} imagesJson={product.images} />
            </div>

            {/* Product Info Column */}
            <div className="product-detail-info-panel">
              <span className="product-detail-category">{product.category_name || 'Gas Chính Hãng'}</span>
              <h1 className="product-detail-title">{product.name}</h1>
              
              <div className="product-detail-price-box">
                <span className="price-label">Giá bán:</span>
                {hasSale ? (
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className="price-value" style={{ color: 'var(--error)' }}>{formatPrice(product.sale_price)}</span>
                    <span className="original-price-value" style={{ textDecoration: 'line-through', fontSize: '15px', color: 'var(--text-secondary)' }}>
                      Giá gốc: {formatPrice(product.price)}
                    </span>
                  </div>
                ) : (
                  <span className="price-value">{formatPrice(product.price)}</span>
                )}
              </div>

              <div className="product-detail-divider"></div>

              {/* Product Short Description */}
              {product.short_description && (
                <div className="product-detail-short-desc">
                  <p>{product.short_description}</p>
                </div>
              )}

              <div className="product-detail-meta-cards">
                <div className="meta-card">
                  <ShieldCheck size={20} className="meta-icon" />
                  <div>
                    <strong>Chính hãng 100%</strong>
                    <p>Cam kết chất lượng chuẩn vỏ bình dày</p>
                  </div>
                </div>
                <div className="meta-card">
                  <Flame size={20} className="meta-icon" />
                  <div>
                    <strong>Đủ trọng lượng</strong>
                    <p>Cân gas trực tiếp khi giao hàng</p>
                  </div>
                </div>
              </div>

              <div className="product-detail-actions">
                <ProductOrderButton productName={product.name} hotline={hotline} />
              </div>
            </div>
          </div>

          {/* Long Description Section - High-Grade SEO Article with H2, H3, H4, Img Alt */}
          {product.description && (
            <div className="product-long-description-section card" style={{ marginTop: '40px', padding: '32px' }}>
              <div className="product-desc-content" dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>
          )}

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="related-products-section" style={{ marginTop: '50px' }}>
              <h2 className="related-title">Sản Phẩm Liên Quan</h2>
              <div className="grid-3 products-grid">
                {relatedProducts.map(prod => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
