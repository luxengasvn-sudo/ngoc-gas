import db from '@/lib/db';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import ProductGallery from '@/components/ProductGallery';
import ProductOrderButton from '@/components/ProductOrderButton';
import { Flame, ShieldCheck } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Fresh database query always

// Helper function to build humanized, 100% Google Keyword-Trust Article structure with branch linking
const createKeywordTrustSEOArticle = (productName, imageSrc, productTypeDesc) => {
  return `
<h2>Thông Tin & Hướng Dẫn Đổi ${productName} Tận Nhà</h2>
<p>Chào anh chị, Ngọc Gas xin gửi tới anh chị những thông tin chi tiết nhất về sản phẩm <strong>${productName}</strong>. Là đơn vị chuyên cung cấp gas chính hãng nhiều năm qua tại khu vực Dĩ An, Thuận An, KDC VietSing cũng như khắp Bình Dương và TP.HCM, chúng tôi luôn thấu hiểu rằng một bình gas an toàn, ngọn lửa xanh đều và dịch vụ phục vụ chu đáo chính là điều quan trọng nhất đối với mỗi căn bếp gia đình hay nhà hàng.</p>

<img src="${imageSrc}" alt="${productName} giao gas nhanh tại Dĩ An Thuận An VietSing TP.HCM Bình Dương" style="width: 100%; max-width: 500px; height: auto; border-radius: 12px; margin: 24px auto; display: block; box-shadow: 0 4px 16px rgba(0,0,0,0.12);" />

<h3>1. Đánh Giá Thực Tế Về ${productName}</h3>
<p>${productTypeDesc}</p>
<ul>
  <li><strong>Lửa xanh tiết kiệm:</strong> Khí gas tinh khiết được lọc kỹ, cho ngọn lửa xanh cháy đều, đun nấu nhanh chín mà không sợ đen đít nồi.</li>
  <li><strong>Vỏ bình dày dặn, an toàn:</strong> Đạt tiêu chuẩn kiểm định PCCC, sơn tĩnh điện chống rỉ sét và chịu lực va đập cực tốt.</li>
  <li><strong>Nguyên màng co niêm phong:</strong> Mỗi bình gas xuất kho đều được bọc màng co bảo vệ cổ van cẩn thận, đảm bảo hàng mới 100%.</li>
</ul>

<hr style="margin: 30px 0; border: none; border-top: 1px solid #E2E8F0;" />

<!-- SECTION 1: KEYWORD TRUST - GIAO GAS NHANH -->
<h3>2. Dịch Vụ Giao Gas Nhanh - Có Mặt Ngay Sau 15-30 Phút</h3>
<p>Đang nấu dở bữa cơm hay đang chuẩn bị món ăn cho khách mà hết gas đột ngột thì thật bất tiện! Hiểu được điều đó, dịch vụ <strong>giao gas nhanh</strong> của Ngọc Gas luôn sẵn sàng 24/7. Ngay khi nhận được cuộc gọi, đội ngũ anh em giao gas sẽ lập tức lên đường chở bình <strong>${productName}</strong> đến tận bếp nhà mình. Không chỉ <strong>giao gas nhanh</strong>, các anh em kỹ thuật còn nhiệt tình cân gas tại chỗ trước mặt anh chị và kiểm tra lại toàn bộ van dây gas xem có bị rò rỉ hay không rồi mới bàn giao.</p>

<!-- SECTION 2: KEYWORD TRUST - GIAO GAS NHANH TẠI DĨ AN -->
<h3>3. Giao Gas Nhanh Tại Dĩ An - Phục Vụ Tận Tình Mọi Phường Xã</h3>
<p>Nếu anh chị đang sinh sống tại TP. Dĩ An (phường Dĩ An, An Bình, Tân Đông Hiệp, Đông Hòa, Bình An, Bình Thắng, Tân Bình), dịch vụ <strong>giao gas nhanh tại Dĩ An</strong> của chúng tôi sẽ có mặt chỉ sau 15 phút. Cửa hàng nằm ngay số <em>7 Nguyễn Trung Trực, Dĩ An</em> nên việc <strong>giao gas nhanh tại Dĩ An</strong> vô cùng thuận tiện. Anh em <strong>giao gas nhanh tại Dĩ An</strong> luôn mang theo cân điện tử để anh chị tự tay kiểm tra đủ 12kg gas ruột mới yên tâm thanh toán.</p>

<!-- SECTION 3: KEYWORD TRUST - GIAO GAS NHANH TẠI THUẬN AN -->
<h3>4. Giao Gas Nhanh Tại Thuận An - Đồng Hành Cùng Các Bếp Gia Đình & Quán Ăn</h3>
<p>Tại khu vực Thuận An (phường An Phú, Thuận Giao, Lái Thiêu, An Thạnh, Bình Chuẩn), nhu cầu đun nấu hàng ngày rất lớn. Dịch vụ <strong>giao gas nhanh tại Thuận An</strong> của Ngọc Gas luôn đảm bảo cung cấp bình gas chính hãng <strong>${productName}</strong> chất lượng cao. Khi gọi <strong>giao gas nhanh tại Thuận An</strong>, anh chị không chỉ được phục vụ siêu tốc mà còn được nhân viên hỗ trợ vệ sinh kiềng bếp và tư vấn cách dùng gas sao cho tiết kiệm và an toàn nhất. Đội ngũ <strong>giao gas nhanh tại Thuận An</strong> luôn xem sự hài lòng của gia đình anh chị là niềm vui lớn nhất.</p>

<!-- SECTION 4: KEYWORD TRUST - GIAO GAS NHANH TẠI VIETSING -->
<h3>5. Giao Gas Nhanh Tại VietSing - Tận Căn Hộ, Nhà Trọ & Bếp Ăn KCN VSIP 1</h3>
<p>Khu dân cư VietSing (VSIP 1) có nhiều chung cư, nhà trọ cũng như quán ăn buôn bán tấp nập. Dịch vụ <strong>giao gas nhanh tại VietSing</strong> của chúng tôi chuyên phục vụ các căn hộ cao tầng, phòng trọ và quán ăn khu vực này. Khi anh chị cần <strong>giao gas nhanh tại VietSing</strong>, các anh em giao gas sẵn sàng bê bình gas lên tận tầng, hỗ trợ lắp đặt gọn gàng và cẩn thận. Gọi <strong>giao gas nhanh tại VietSing</strong> qua tổng đài 19009396 để được hỗ trợ tức thì.</p>

<!-- SECTION 5: KEYWORD TRUST - GIAO GAS NHANH TẠI TP.HCM -->
<h3>6. Giao Gas Nhanh Tại TP.HCM - Phục Vụ Nhanh Chóng Các Khu Vực Giáp Ranh</h3>
<p>Bên cạnh Bình Dương, Ngọc Gas cũng mở rộng dịch vụ <strong>giao gas nhanh tại TP.HCM</strong> cho các khu vực giáp ranh như TP. Thủ Đức, Quận 12, Bình Thạnh... Khách hàng khi cần <strong>giao gas nhanh tại TP.HCM</strong> luôn đánh giá cao sự đúng giờ và tinh thần trách nhiệm của đội ngũ nhân viên. Mọi bình gas trong dịch vụ <strong>giao gas nhanh tại TP.HCM</strong> đều có tem nhãn rõ ràng và được bảo hành chu đáo trong suốt quá trình đun nấu.</p>

<!-- SECTION 6: KEYWORD TRUST - GIAO GAS NHANH TẠI BÌNH DƯƠNG -->
<h3>7. Giao Gas Nhanh Tại Bình Dương - Hệ Thống Cửa Hàng Phủ Sóng Khắp Tỉnh</h3>
<p>Với định hướng trở thành người bạn đồng hành tin cậy của mọi căn bếp, giải pháp <strong>giao gas nhanh tại Bình Dương</strong> của Ngọc Gas đã và đang phục vụ cho hàng ngàn hộ gia đình, quán ăn và doanh nghiệp. Hệ thống <strong>giao gas nhanh tại Bình Dương</strong> không chỉ đáp ứng tiêu chuẩn giao hàng nhanh chóng mà còn coi trọng yếu tố an toàn cháy nổ lên hàng đầu. Khách hàng lựa chọn <strong>giao gas nhanh tại Bình Dương</strong> hoàn toàn yên tâm về giá cả niêm yết rõ ràng, không lo tráo đổi bình gas kém chất lượng.</p>

<hr style="margin: 30px 0; border: none; border-top: 1px solid #E2E8F0;" />

<h3>8. Hệ Thống Cửa Hàng & Tổng Đài Đổi Gas Ngay</h3>
<p>Để tìm cửa hàng trạm gas gần nhất hoặc xem danh sách toàn bộ các chi nhánh của công ty, anh chị có thể bấm xem tại đây: <a href="/cua-hang" style="color: #FF6B00; font-weight: bold; text-decoration: underline;">Danh Sách Cửa Hàng & Chi Nhánh Trạm Gas Ngọc Gas</a>.</p>

<p>Khi cần đổi gas hoặc gặp bất kỳ thắc mắc nào về an toàn bếp gas, anh chị hãy gọi ngay cho chúng tôi nhé:</p>
<ul style="list-style: none; padding-left: 0; line-height: 2;">
  <li>📞 <strong>Hotline Hỗ Trợ 24/7:</strong> <a href="tel:19009396" style="color: #FF6B00; font-weight: bold; font-size: 20px;">19009396</a></li>
  <li>📍 <strong>Trụ sở chính:</strong> 7 Nguyễn Trung Trực, TP. Dĩ An, Tỉnh Bình Dương</li>
</ul>
`;
};

const allFallbackProducts = [
  { 
    id: 1, 
    name: 'Bình Gas Sopet 12kg (Xám)', 
    slug: 'binh-gas-sopet-12kg-xam', 
    short_description: 'Dịch vụ giao gas nhanh tại Dĩ An, Thuận An & VietSing. Bình gas Sopet 12kg xám tiêu chuẩn chính hãng, lửa xanh tiết kiệm.', 
    description: createKeywordTrustSEOArticle(
      'Bình Gas Sopet 12kg (Xám)', 
      '/images/sopet-xam.png', 
      'Bình Gas Sopet 12kg màu xám là dòng gas dân dụng sản xuất theo công nghệ Nhật Bản tiên tiến, mang lại ngọn lửa xanh sạch và hiệu suất truyền nhiệt vượt trội.'
    ),
    price: 420000, 
    sale_price: 395000, 
    image_url: '/images/sopet-xam.png', 
    category_id: 1, 
    is_featured: 1, 
    is_active: 1 
  },
  { 
    id: 2, 
    name: 'Bình Gas Sopet 12kg (Xanh Đen)', 
    slug: 'binh-gas-sopet-12kg-xanh-den', 
    short_description: 'Dịch vụ giao gas nhanh tại Thuận An & VietSing. Bình gas Sopet 12kg vỏ xanh đen cao cấp, kiểm định an toàn PCCC.', 
    description: createKeywordTrustSEOArticle(
      'Bình Gas Sopet 12kg (Xanh Đen)', 
      '/images/sopet-xanh-den.png', 
      'Bình Gas Sopet 12kg vỏ xanh đen sang trọng, sở hữu nước sơn tĩnh điện chịu nhiệt cao, tích hợp van điều áp tự động ngắt gas khẩn cấp khi gặp sự cố.'
    ),
    price: 425000, 
    sale_price: 400000, 
    image_url: '/images/sopet-xanh-den.png', 
    category_id: 1, 
    is_featured: 1, 
    is_active: 1 
  },
  { 
    id: 3, 
    name: 'Bình Gas Sopet 12kg (Xanh)', 
    slug: 'binh-gas-sopet-12kg-xanh', 
    short_description: 'Dịch vụ giao gas nhanh tại TP.HCM & Bình Dương. Bình gas Sopet 12kg vỏ xanh tiêu chuẩn gia đình.', 
    description: createKeywordTrustSEOArticle(
      'Bình Gas Sopet 12kg (Xanh)', 
      '/images/sopet-xanh.png', 
      'Bình Gas Sopet 12kg vỏ xanh tiêu chuẩn là sự lựa chọn quen thuộc của hàng nghìn căn bếp gia đình tại Việt Nam nhờ lửa xanh khỏe và tiết kiệm nhiên liệu.'
    ),
    price: 420000, 
    sale_price: 395000, 
    image_url: '/images/sopet-xanh.png', 
    category_id: 1, 
    is_featured: 1, 
    is_active: 1 
  },
  { 
    id: 4, 
    name: 'Bình Gas Sopet 12kg (Đỏ)', 
    slug: 'binh-gas-sopet-12kg-do', 
    short_description: 'Dịch vụ giao gas nhanh tại Dĩ An. Bình gas Sopet 12kg vỏ đỏ chính hãng, an toàn tuyệt đối.', 
    description: createKeywordTrustSEOArticle(
      'Bình Gas Sopet 12kg (Đỏ)', 
      '/images/sopet.png', 
      'Bình Gas Sopet 12kg vỏ đỏ nổi bật với kết cấu thép đúc siêu bền, bề mặt dập nổi logo Sopet chính hãng đảm bảo an toàn tuyệt đối cho người sử dụng.'
    ),
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
    description: createKeywordTrustSEOArticle(
      'Bình Gas Phoenix Gas 12kg (Xám)', 
      '/images/phoenix-xam.png', 
      'Bình Gas Phoenix Gas 12kg vỏ xám mang đến giải pháp nhiên liệu đun nấu tiết kiệm chi phí nhưng vẫn đảm bảo áp suất gas ổn định và an toàn PCCC.'
    ),
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
    description: createKeywordTrustSEOArticle(
      'Bình Gas Phoenix Gas 12kg (Xanh)', 
      '/images/phoenix-lg-xanh.png', 
      'Bình Gas Phoenix Gas 12kg vỏ xanh lá tươi sáng, được kiểm định chất lượng khí gas tinh khiết không tạo cặn bẩn hay làm đen kiềng bếp nấu.'
    ),
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
    description: createKeywordTrustSEOArticle(
      'Bình Gas Phoenix Gas 12kg (Đỏ)', 
      '/images/phoenix-do.png', 
      'Bình Gas Phoenix Gas 12kg màu đỏ nổi bật với áp suất duy trì đều đặn từ lúc bắt đầu cho tới khi hết bình gas, giúp món ăn đun nấu nhanh chín thơm ngon.'
    ),
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
    description: createKeywordTrustSEOArticle(
      'Bình Gas Luxen Gas 12kg', 
      '/images/luxen-gas.png', 
      'Bình Gas Luxen Gas 12kg là thương hiệu gas uy tín sản xuất ngay tại tỉnh Bình Dương, có vỏ bình đúc dày chịu lực tốt và ngọn lửa xanh cực mạnh.'
    ),
    price: 420000, 
    sale_price: 395000, 
    image_url: '/images/luxen-gas.png', 
    category_id: 1, 
    is_featured: 1, 
    is_active: 1 
  },
  { 
    id: 9, 
    name: 'Bình Gas Luxen Gas 12kg (Xám)', 
    slug: 'binh-gas-luxen-gas-12kg-xam', 
    short_description: 'Dịch vụ giao gas nhanh tại Dĩ An & VietSing. Bình gas Luxen Gas 12kg vỏ xám tiêu chuẩn, an toàn PCCC.', 
    description: createKeywordTrustSEOArticle(
      'Bình Gas Luxen Gas 12kg (Xám)', 
      '/images/luxen-xam-12kg.png', 
      'Bình Gas Luxen Gas 12kg vỏ màu xám tiêu chuẩn chính hãng Luxen Gas Bình Dương, vỏ bình chắc chắn, ngọn lửa xanh xoáy đun nấu cực kỳ tiết kiệm.'
    ),
    price: 415000, 
    sale_price: 390000, 
    image_url: '/images/luxen-xam-12kg.png', 
    category_id: 1, 
    is_featured: 1, 
    is_active: 1 
  },
  { 
    id: 10, 
    name: 'Bình Gas Luxen Gas 45kg (Công Nghiệp)', 
    slug: 'binh-gas-luxen-gas-45kg-cong-nghiep', 
    short_description: 'Dịch vụ giao gas nhanh tại KCN VSIP 1 & Dĩ An. Bình gas công nghiệp Luxen 45kg chuyên dùng cho Nhà hàng, Bếp ăn.', 
    description: createKeywordTrustSEOArticle(
      'Bình Gas Luxen Gas 45kg (Công Nghiệp)', 
      '/images/luxen-45.png', 
      'Bình Gas Luxen Gas 45kg công nghiệp (Bình bò) dung tích cực lớn chuyên dùng cho các giàn gom bếp khè nhà hàng, khách sạn và bếp ăn công nghiệp KCN VSIP 1.'
    ),
    price: 1550000, 
    sale_price: 1450000, 
    image_url: '/images/luxen-45.png', 
    category_id: 1, 
    is_featured: 1, 
    is_active: 1 
  },
  { 
    id: 11, 
    name: 'Bình Gas Luxen Gas 45kg (Xám)', 
    slug: 'binh-gas-luxen-gas-45kg-xam', 
    short_description: 'Dịch vụ giao gas nhanh tại KCN VSIP 1, Dĩ An & Thuận An. Bình gas công nghiệp Luxen 45kg màu xám tiêu chuẩn.', 
    description: createKeywordTrustSEOArticle(
      'Bình Gas Luxen Gas 45kg (Xám)', 
      '/images/luxen-xam-45.png', 
      'Bình Gas Luxen Gas 45kg vỏ màu xám công nghiệp dung tích lớn, vỏ đúc chịu áp suất cực cao, chuyên dùng cho bếp ăn công nghiệp, nhà hàng, khách sạn và quán ăn lớn.'
    ),
    price: 1540000, 
    sale_price: 1440000, 
    image_url: '/images/luxen-xam-45.png', 
    category_id: 1, 
    is_featured: 1, 
    is_active: 1 
  }
];

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const normSlug = slug.replace(/-sopet-vil-/g, '-sopet-');
  
  try {
    const [rows] = await db.query('SELECT name, short_description FROM products WHERE slug = ? OR slug = ?', [slug, normSlug]);
    if (rows && rows.length > 0) {
      const product = rows[0];
      return {
        title: `${product.name} - Giao Gas Nhanh Tại Dĩ An, Thuận An, VietSing, TP.HCM - NGỌC GAS`,
        description: product.short_description || `Mua ${product.name} chính hãng, giá tốt tại Ngọc Gas TP. HCM & Bình Dương. Giao gas nhanh.`,
        keywords: `${product.name}, giao gas nhanh, giao gas nhanh tại Dĩ An, giao gas nhanh tại Thuận An, giao gas nhanh tại VietSing, giao gas nhanh tại TP.HCM, giao gas nhanh tại Bình Dương, ngoc gas`
      };
    }
  } catch (e) {
    console.error('Error generating product metadata:', e.message);
  }

  const fallbackObj = allFallbackProducts.find(p => p.slug === slug || p.slug === normSlug || p.slug.replace(/-sopet-/, '-sopet-vil-') === slug);
  if (fallbackObj) {
    return {
      title: `${fallbackObj.name} - Giao Gas Nhanh Tại Dĩ An, Thuận An, VietSing, TP.HCM - NGỌC GAS`,
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
  const normSlug = slug.replace(/-sopet-vil-/g, '-sopet-');

  let product = null;
  let relatedProducts = [];

  try {
    const [prodRows] = await db.query(`
      SELECT p.*, c.name AS category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      WHERE (p.slug = ? OR p.slug = ?) AND p.is_active = 1
    `, [slug, normSlug]);

    if (prodRows && prodRows.length > 0) {
      product = prodRows[0];
    }
  } catch (error) {
    console.error('Error fetching product detail:', error.message);
  }

  // Fallback to default product list if DB is offline or slug missing in DB
  if (!product) {
    const foundFallback = allFallbackProducts.find(p => p.slug === slug || p.slug === normSlug || p.slug.replace(/-sopet-/, '-sopet-vil-') === slug);
    if (foundFallback) {
      product = {
        ...foundFallback,
        category_name: 'Gas Dân Dụng & Công Nghiệp'
      };
    } else {
      notFound();
    }
  }

  // Enforce humanized Keyword Trust SEO Article structure for maximum Google ranking authority
  const foundFallback = allFallbackProducts.find(p => p.slug === product.slug || p.slug === normSlug || p.slug.replace(/-sopet-/, '-sopet-vil-') === slug);
  if (foundFallback && (!product.description || product.description.length < 300)) {
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
    relatedProducts = allFallbackProducts.filter(p => p.slug !== product.slug).slice(0, 3);
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

          {/* Long Description Section - Humanized Keyword Trust Article */}
          {product.description && (
            <div className="product-long-description-section card" style={{ marginTop: '40px', padding: '36px', background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
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
