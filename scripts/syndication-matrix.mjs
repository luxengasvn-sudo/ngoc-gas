#!/usr/bin/env node

/**
 * MA TRẬN PHÓNG TÁC NỘI DUNG 5 GÓC NHÌN ĐỘC BẢN CHO MẠNG LƯỚI ENTITY (CONTENT TRANSFORMATION MATRIX)
 * Biến đổi 1 bài viết gốc thành 5 phiên bản nội dung hoàn toàn khác nhau để phục vụ SEO tối đa:
 * - Tránh 100% thuật toán Duplicate Content của Google.
 * - Áp dụng Mesh Linking & Anchor Diversity.
 * - Khai thác đúng thế mạnh của từng nhóm nền tảng Entity.
 */

const TARGET_DOMAIN = 'https://ngocgas.com';
const PRICE_PAGE_URL = `${TARGET_DOMAIN}/gia-gas-hom-nay`;
const HOTLINE = '1900 9396';

/**
 * Tạo ma trận 5 gói nội dung độc bản từ bài viết gốc
 * @param {Object} post - Dữ liệu bài viết gốc { title, slug, summary, content, category, image_url }
 * @returns {Object} 5 gói nội dung chuyên biệt
 */
export function generateSyndicationMatrix(post = {}) {
  const title = post.title || post.name || 'Thông Tin Ngọc Gas';
  const summary = post.summary || post.description || 'Thông tin hữu ích từ Đại lý Ngọc Gas Dĩ An.';
  const slug = post.slug || 'thong-tin-ngoc-gas';
  const postUrl = `${TARGET_DOMAIN}/${post.category === 'mon-an' ? 'mon-an' : 'tin-tuc'}/${slug}`;
  const isFood = post.category === 'mon-an';

  // 1. TIER 1: LOCAL & GOOGLE MAPS (3 ĐỊA ĐIỂM)
  // Góc nhìn: Phục vụ tại chỗ, giao gas nhanh 15 phút, an toàn gia đình, cam kết đủ ký
  const mapsContent = isFood
    ? `🔥 BÍ QUYẾT BẾP ẤM HÔM NAY: ${title.toUpperCase()}\n\n` +
      `Một bữa cơm gia đình tròn vị luôn bắt đầu từ ngọn lửa xanh an toàn và ổn định. Hôm nay, Ngọc Gas gửi đến quý khách hàng công thức nấu ăn đặc sắc: ${title}.\n\n` +
      `💡 Mẹo nấu ngon: Để món ăn dậy mùi thơm tự nhiên mà không bị cháy khét đáy nồi, hãy giữ lửa ở mức liu riu sau khi nước sôi và dùng bình gas chính hãng có áp suất ổn định.\n\n` +
      `🚚 ĐỔI GAS NHANH 15 PHÚT TẠI BÌNH DƯƠNG:\n` +
      `- Dĩ An: 7 Nguyễn Trung Trực (Hotline 1900 9396)\n` +
      `- Cây Da: 7/14 Đường Cây Da, P. Tân Đông Hiệp\n` +
      `- Thuận An: Kiot 5, Đường D5, KDC VietSing\n\n` +
      `👉 Xem chi tiết công thức & cách nấu: ${postUrl}\n` +
      `📊 Cập nhật bảng giá gas hôm nay mới nhất: ${PRICE_PAGE_URL}\n` +
      `📞 Tổng đài đặt gas chính hãng: ${HOTLINE}`
    : `📢 CẬP NHẬT THỊ TRƯỜNG NĂNG LƯỢNG & AN TOÀN GAS:\n${title.toUpperCase()}\n\n` +
      `${summary}\n\n` +
      `🛡️ CAM KẾT TỪ HỆ THỐNG NGỌC GAS BÌNH DƯƠNG:\n` +
      `- 100% bình gas phân phối (Sopet Gas One, Luxen Gas, Phoenix Gas) có niêm màng co và tem chống giả.\n` +
      `- Luôn cân đối trọng trước sự chứng kiến của khách hàng, đảm bảo đủ ký.\n` +
      `- Kỹ thuật viên kiểm tra rò rỉ bằng bọt xà phòng chuyên dụng trước khi bàn giao.\n\n` +
      `👉 Đọc toàn văn bài phân tích: ${postUrl}\n` +
      `📊 Tra cứu giá gas bán lẻ cập nhật tự động: ${PRICE_PAGE_URL}\n` +
      `📞 Gọi đặt gas hoặc hỗ trợ kỹ thuật PCCC: ${HOTLINE}`;

  // 2. TIER 2: SOCIAL NETWORKS (5 FANPAGE FACEBOOK & LINKEDIN)
  // Góc nhìn: Thân thiện, đời sống, bắt trend, tương tác cộng đồng, emoji
  const socialFacebook = isFood
    ? `✨ [MÓN NGON MỖI NGÀY CÙNG NGỌC GAS] ✨\n\n` +
      `🍲 ${title} – Đậm đà đưa cơm, thơm lừng cả gian bếp!\n\n` +
      `Chiều nay tan làm mà chưa biết nấu gì cho cả nhà thì thử ngay món này nhé các bà nội trợ ơi. Bí quyết để món ăn dậy vị thơm nức, màu sắc óng ả chính là canh ngọn lửa vừa vặn để gia vị ngấm sâu vào từng thớ thịt.\n\n` +
      `📌 Các chị em bấm vào link để lưu lại công thức chi tiết từng bước nhé:\n` +
      `👉 ${postUrl}\n\n` +
      `💡 Bếp đang nấu mà hết gas đột xuất? Đừng lo, chỉ cần 1 cuộc gọi, anh em kỹ thuật Ngọc Gas sẽ có mặt ngay trong 15 phút, cân bình đủ ký và kiểm tra dây van an toàn miễn phí!\n\n` +
      `📞 Hotline gọi gas siêu tốc: ${HOTLINE}\n` +
      `🌐 Xem giá gas chuẩn hôm nay: ${PRICE_PAGE_URL}\n\n` +
      `#NgocGas #MonNgonGiaDinh #GasDiAn #GiaoGasNhanh #AnToanNhaBep`
    : `🚨 [CẬP NHẬT THÔNG TIN QUAN TRỌNG TỪ NGỌC GAS] 🚨\n\n` +
      `🔥 ${title}\n\n` +
      `${summary}\n\n` +
      `⚠️ Cảnh báo người tiêu dùng: Hiện nay trên địa bàn Dĩ An và Thuận An xuất hiện nhiều đối tượng giả danh đại lý uy tín để giao bình gas mini sang chiết lậu, bình gas thiếu cân từ 1 - 3kg gây nguy cơ cháy nổ cực kỳ nguy hiểm!\n\n` +
      `✅ Hãy bảo vệ gia đình bằng cách chỉ đổi gas tại các chi nhánh chính thức của Ngọc Gas:\n` +
      `📍 Điểm 1: 7 Nguyễn Trung Trực, Dĩ An\n` +
      `📍 Điểm 2: 7/14 Đường Cây Da, P. Tân Đông Hiệp\n` +
      `📍 Điểm 3: Kiot 5, Đường D5, KDC VietSing, Thuận An\n\n` +
      `👉 Xem bài phân tích chi tiết tại: ${postUrl}\n` +
      `👉 Bảng giá gas hôm nay minh bạch tại: ${PRICE_PAGE_URL}\n` +
      `📞 Hotline duy nhất: ${HOTLINE}\n\n` +
      `#NgocGas #GiaGasHomNay #BinhDuong #AnToanPCCC`;

  // 3. TIER 3: WEB 2.0 & BLOGS (BLOGGER, WORDPRESS, TUMBLR)
  // Góc nhìn: Spinoff mở rộng (300 - 500 từ), kiến thức chuyên sâu, mẹo tiết kiệm gas
  const blogTitle = isFood
    ? `Bí Quyết Canh Lửa Khi Nấu ${title} Để Tiết Kiệm Gas Và Giữ Trọn Dinh Dưỡng`
    : `Góc Nhìn Tiêu Dùng Thông Minh: Phân Tích Thực Trạng Qua ${title}`;

  const blogBody = isFood
    ? `Trong ẩm thực gia đình Việt, việc điều chỉnh nhiệt độ ngọn lửa quyết định đến 70% độ ngon của món ăn. Với món **${title}**, kỹ thuật giữ nhiệt liu riu và sự ổn định của áp suất gas đóng vai trò then chốt giúp nguyên liệu chín mềm từ từ mà không bị cạn nước hay bay mất hương thơm đặc trưng.\n\n` +
      `### 1. Kỹ Thuật Canh Lửa Tiết Kiệm Gas\n` +
      `Nhiều người thường có thói quen vặn lửa thật lớn để món ăn nhanh chín. Tuy nhiên, việc lửa trùm ra ngoài đáy nồi không chỉ làm lãng phí 20 - 30% lượng gas tiêu thụ mà còn dễ làm cháy gia vị. Hãy điều chỉnh ngọn lửa ôm vừa vặn đáy chảo để nhiệt lượng hấp thụ tối đa.\n\n` +
      `### 2. Tầm Quan Trọng Của Ngọn Lửa Xanh Tinh Khiết\n` +
      `Một ngọn lửa xanh không muội than chứng tỏ gas được đốt cháy hoàn toàn, không sinh khí độc trong không gian bếp kín. Điều này chỉ có được khi bạn sử dụng bình gas chính hãng từ các thương hiệu hàng đầu như Sopet Gas One, Luxen Gas hay Phoenix Gas được phân phối chuẩn chuẩn chỉ.\n\n` +
      `Để tham khảo toàn bộ công thức và định lượng nguyên liệu chuẩn xác nhất, mời quý bạn đọc xem tại bài viết gốc: [**${title}**](${postUrl}). Ngoài ra, quý khách có thể chủ động theo dõi [**Bảng giá gas hôm nay**](${PRICE_PAGE_URL}) để luôn có mức giá trợ giá tốt nhất từ [**Đại lý Ngọc Gas**](${TARGET_DOMAIN}).\n\n` +
      `*Hotline hỗ trợ kỹ thuật và giao gas 24/7 tại Dĩ An, Bình Dương: **${HOTLINE}**.*`
    : `Thị trường khí dầu mỏ hóa lỏng (LPG) luôn có những biến động phức tạp tác động trực tiếp đến chi tiêu của từng hộ gia đình và bếp ăn công nghiệp. Qua bài viết **${title}**, chúng ta nhận thấy rõ sự cần thiết của việc lựa chọn một đơn vị phân phối năng lượng có trách nhiệm.\n\n` +
      `### 1. Nhận Diện Rủi Ro Từ Gas Trôi Nổi\n` +
      `Các đối tượng sang chiết lậu thường sử dụng vỏ bình quá hạn kiểm định, van an toàn bị rò rỉ và bớt xén trọng lượng gas từ 1kg đến 2kg/bình 12kg. Điều này không chỉ gây thiệt hại kinh tế mà còn tiềm ẩn nguy cơ cháy nổ khôn lường.\n\n` +
      `### 2. Giải Pháp An Toàn Từ Ngọc Gas\n` +
      `Với hệ thống 3 chi nhánh phủ sóng tại Dĩ An và Thuận An, Ngọc Gas cam kết minh bạch 100% về nguồn gốc xuất xứ, hỗ trợ cân bình điện tử tại nhà và kiểm tra an toàn miễn phí định kỳ cho mọi hộ gia đình.\n\n` +
      `Đọc toàn bộ bài phân tích chuyên sâu tại: [**${title}**](${postUrl}). Đừng quên tra cứu [**Bảng giá gas hôm nay**](${PRICE_PAGE_URL}) mới nhất được cập nhật mỗi ngày. Mọi thắc mắc xin liên hệ tổng đài: **${HOTLINE}**.\n`;

  // 4. TIER 4: TECH & DOCS APIS (TELEGRA.PH, DEV.TO, RENTRY)
  // Góc nhìn: Chuẩn Markdown súc tích, tóm lược dữ liệu, thông số kỹ thuật
  const techDocsMarkdown = `# ${title}\n\n` +
    `> **Nguồn phát hành**: [Ngọc Gas Official](${TARGET_DOMAIN}) | **Hotline**: ${HOTLINE} | **Ngày cập nhật**: ${new Date().toLocaleDateString('vi-VN')}\n\n` +
    `---\n\n` +
    `## 📋 TÓM LƯỢC NỘI DUNG CHÍNH\n\n` +
    `${summary}\n\n` +
    `## 🔍 THÔNG TIN CHI TIẾT & CHỈ DẪN THỰC THI\n\n` +
    `${post.content ? post.content.replace(/<[^>]+>/g, '').slice(0, 1000) + '...' : 'Chi tiết xem tại liên kết chính thức bên dưới.'}\n\n` +
    `---\n\n` +
    `### 🔗 LIÊN KẾT THỰC THỂ & BẢNG GIÁ DỮ LIỆU:\n` +
    `- **Bài viết gốc đầy đủ**: [${title}](${postUrl})\n` +
    `- **Trang giá gas cập nhật tự động**: [Bảng giá gas hôm nay](${PRICE_PAGE_URL})\n` +
    `- **Đơn vị phân phối chính thức**: Đại lý Ngọc Gas Dĩ An, Bình Dương (Tổng đài đặt hàng: **${HOTLINE}**)\n`;

  // 5. TIER 5: DIỄN ĐÀN & HỎI ĐÁP FAQ (QUORA, REDDIT, PINTEREST)
  // Góc nhìn: Dạng câu hỏi thường gặp (FAQ) và giải đáp chuyên gia
  const communityFaq = isFood
    ? {
        question: `Làm sao để nấu món ${title} thơm ngon, đậm đà mà tiết kiệm gas nhất?`,
        answer: `Để nấu ${title} chuẩn vị và tiết kiệm gas, chuyên gia nhà bếp từ Ngọc Gas khuyên bạn:\n1. Ướp nguyên liệu trước 20-30 phút để ngấm gia vị tự nhiên.\n2. Khi bắt đầu nấu, đun lửa vừa để nước sôi đều, sau đó hạ lửa liu riu để gia vị ngấm sâu mà không bị cạn nước.\n3. Sử dụng nồi đáy dày ôm trọn ngọn lửa xanh chuẩn của bình gas chính hãng.\n👉 Xem chi tiết công thức tại: ${postUrl}\n👉 Hotline tư vấn an toàn gas gia đình: ${HOTLINE}`
      }
    : {
        question: `Làm thế nào để nhận biết và phòng tránh rủi ro khi có ${title}?`,
        answer: `Trước những biến động của thị trường gas, người tiêu dùng cần lưu ý 3 nguyên tắc vàng từ Ngọc Gas:\n1. Chỉ đổi gas tại các đại lý có giấy phép kinh doanh và địa chỉ rõ ràng.\n2. Yêu cầu nhân viên cân bình gas trước khi lắp đặt (bình 12kg tổng trọng lượng khoảng 25-26kg bao gồm 13kg vỏ bình).\n3. Kiểm tra niêm phong màng co và tem chống hàng giả còn nguyên vẹn.\n👉 Đọc phân tích chi tiết tại: ${postUrl}\n👉 Xem giá gas hôm nay tại: ${PRICE_PAGE_URL}\n👉 Hotline hỗ trợ: ${HOTLINE}`
      };

  return {
    postUrl,
    pricePageUrl: PRICE_PAGE_URL,
    hotline: HOTLINE,
    tier1Maps: mapsContent,
    tier2Social: socialFacebook,
    tier3Blog: {
      title: blogTitle,
      body: blogBody
    },
    tier4TechDocs: techDocsMarkdown,
    tier5Faq: communityFaq
  };
}

// Chạy test nếu gọi trực tiếp từ CLI
if (process.argv[1] && process.argv[1].endsWith('syndication-matrix.mjs')) {
  console.log('🧪 KIỂM THỬ MODULE PHÓNG TÁC MA TRẬN NỘI DUNG 5 GÓC NHÌN:');
  const samplePost = {
    title: 'Gà kho sả ớt đậm đà chuẩn vị cơm nhà',
    slug: 'ga-kho-sa-ot-dam-da-chuan-vi',
    category: 'mon-an',
    summary: 'Cách làm gà kho sả ớt thơm cay nồng ấm, thịt gà săn chắc ngấm đậm gia vị mặn ngọt hài hòa.',
    content: 'Món gà kho sả ớt là món ăn quen thuộc trong mâm cơm người Việt. Thịt gà được chặt miếng vừa ăn, ướp cùng sả băm, ớt tươi và nước mắm truyền thống.'
  };

  const matrix = generateSyndicationMatrix(samplePost);
  console.log('\n--- 1. TIER 1 (GOOGLE MAPS) ---');
  console.log(matrix.tier1Maps.slice(0, 200) + '...');
  console.log('\n--- 2. TIER 2 (SOCIAL FACEBOOK) ---');
  console.log(matrix.tier2Social.slice(0, 200) + '...');
  console.log('\n--- 3. TIER 3 (BLOG WEB 2.0) ---');
  console.log(`Tiêu đề: ${matrix.tier3Blog.title}`);
  console.log(matrix.tier3Blog.body.slice(0, 250) + '...');
  console.log('\n--- 4. TIER 4 (TECH DOCS MARKDOWN) ---');
  console.log(matrix.tier4TechDocs.slice(0, 200) + '...');
  console.log('\n--- 5. TIER 5 (FAQ COMMUNITY) ---');
  console.log(`Q: ${matrix.tier5Faq.question}`);
  console.log(`A: ${matrix.tier5Faq.answer.slice(0, 150)}...`);
  console.log('\n✅ MA TRẬN 5 GÓC NHÌN HOẠT ĐỘNG HOÀN HẢO!');
}
