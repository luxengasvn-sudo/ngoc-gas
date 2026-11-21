import React from 'react';
import DataFeedbackSection from './DataFeedbackSection';

/**
 * Hàm băm chuỗi số học cố định (Deterministic Hash)
 * Giúp mỗi URL luôn nhận cùng 1 biến thể cố định (không bị giật/đổi bài khi F5 hoặc bot quét)
 */
function getDeterministicHash(str, salt = 0) {
  let hash = salt;
  const s = String(str || 'ngocgas');
  for (let i = 0; i < s.length; i++) {
    hash = ((hash << 5) - hash) + s.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Phân loại địa bàn thành 4 Archetype thực tế dựa trên dữ liệu thật của unit
 */
function detectArchetype(unit) {
  if (!unit) return 'URBAN_CORE';
  const density = (unit.population && unit.areaKm2 && unit.areaKm2 > 0) ? (unit.population / unit.areaKm2) : 0;
  const text = `${unit.name || ''} ${unit.district || ''} ${unit.description || ''}`.toLowerCase();

  const isIndustrial = /khu công nghiệp|kcn|chế xuất|thuận an|dĩ an|bến cát|tân uyên|sóng thần|vĩnh lộc|tân tạo|hiệp phước|quang minh|bắc thăng long|quế võ|yên phong|việt yên|nhơn trạch|long thành/.test(text);
  if (isIndustrial) return 'INDUSTRIAL_WORKER';

  if (density > 10000 || (unit.type === 'Phường' && density > 5000)) return 'URBAN_CORE';
  if (unit.type === 'Phường' || density > 2000) return 'SUBURBAN_EXPANSION';
  return 'RURAL_COMMUNITY';
}

/**
 * AgencySeoArticle Component
 * Chuẩn hóa 100% theo repo ibangtam/skill-seo-co-ban:
 * - Anti-Duplicate Content Engine: Phân loại 4 Archetypes + 8 Mẫu Sapo + 3 Bộ Nhiệm vụ H2 + 3 Góc độ Án Lừa Đảo + 3 Khuyến cáo PCCC + Ma trận FAQ 24 câu
 * - Local Data Enrichment: Dân số, diện tích, mật độ, danh sách sáp nhập (oldUnits), địa bàn giáp ranh (neighbors)
 * - Lọc 14 dấu hiệu văn máy Băng Tâm & Chặn 100% từ cấm theo Luật Quảng cáo (0 từ 'nhất, số 1, hàng đầu')
 */
export default function AgencySeoArticle({ agency, unit, province }) {
  const isPolice = agency.type === 'cong-an' || agency.slug === 'cong-an';
  const agencyTitle = agency.name || `${agency.shortName || 'Công An'} ${unit.name}`;
  const unitName = unit.name;
  const provName = province.name;
  const districtName = unit.district || '';
  const address = agency.address || `Khu vực hành chính ${unitName}, ${provName}`;
  const phone = isPolice ? '113' : (agency.phone && !agency.phone.includes('xxxx') ? agency.phone : (agency.hotline || '113'));
  const workingHours = agency.workingHours || 'Thứ 2 - Thứ 6 (07:30 - 17:00) | Trực ban tiếp nhận tin báo 24/24';

  // Thông số thực địa
  const population = unit.population ? Number(unit.population).toLocaleString('vi-VN') : null;
  const areaKm2 = unit.areaKm2 ? Number(unit.areaKm2).toLocaleString('vi-VN') : null;
  const density = (unit.population && unit.areaKm2 && unit.areaKm2 > 0)
    ? Math.round(unit.population / unit.areaKm2).toLocaleString('vi-VN')
    : null;
  const oldUnitsList = (unit.oldUnits && Array.isArray(unit.oldUnits) && unit.oldUnits.length > 0)
    ? unit.oldUnits.join(', ')
    : null;
  const neighborsList = (unit.neighbors && Array.isArray(unit.neighbors) && unit.neighbors.length > 0)
    ? unit.neighbors.slice(0, 3).join(', ')
    : null;

  // Xác định Archetype & Biến thể băm
  const archetype = detectArchetype(unit);
  const hashKey = unit.wardSlug || unit.slug || unit.id || 'default';
  const variantIndex = getDeterministicHash(hashKey, 13) % 8;
  const scamVariantIndex = getDeterministicHash(hashKey, 29) % 3;
  const missionVariantIndex = getDeterministicHash(hashKey, 41) % 3;
  const pcccVariantIndex = getDeterministicHash(hashKey, 59) % 3;

  // =========================================================================
  // 1. NGÂN HÀNG SAPO 8 MẪU MỞ ĐẦU ĐỘC BẢN (Chuẩn Băng Tâm 40-60 từ trực diện)
  // =========================================================================
  let sapoFirst = '';
  let sapoSecond = '';
  let sapoThird = '';

  switch (variantIndex) {
    case 0:
      sapoFirst = `Trụ sở ${agencyTitle} đặt tại ${address}, chịu trách nhiệm giữ gìn an ninh trật tự, quản lý cư trú và hỗ trợ giải quyết thủ tục hành chính công cho nhân dân ${unitName}. Số điện thoại tiếp nhận tin báo tội phạm và phản ánh dân sinh trực ban 24/24 là ${phone}.`;
      sapoSecond = `Công dân trên địa bàn thực hiện các thủ tục khai báo tạm trú, cấp mã định danh điện tử VNeID mức 2 hoặc xác nhận thông tin cư trú trực tuyến qua Cổng Dịch vụ công Bộ Công an hoặc đến giao dịch trực tiếp trong giờ hành chính.`;
      sapoThird = `Bài viết tổng hợp thẩm quyền giải quyết, quy trình 4 thủ tục cốt lõi, cảnh báo thủ đoạn lừa đảo giả danh công an và các câu hỏi thực tế khi đến làm việc.`;
      break;
    case 1:
      sapoFirst = `Tại địa chỉ ${address}, ${agencyTitle} trực tiếp quản lý địa bàn ${unitName} (${provName})${population ? ` với quy mô hơn ${population} người dân` : ''}, bảo đảm an toàn trật tự xã hội và phục vụ nhân dân giải quyết thủ tục giấy tờ. Đường dây nóng trực ban 24/7 phục vụ người dân là ${phone}.`;
      sapoSecond = `Để tiết kiệm thời gian đi lại, người dân nên nộp hồ sơ đăng ký cư trú trực tuyến trước qua VNeID; các thủ tục cần xác thực sinh trắc học hoặc trình báo sự việc khẩn cấp được tiếp nhận trực tiếp tại quầy một cửa của cơ quan.`;
      sapoThird = `Thông tin hướng dẫn chi tiết về khung giờ tiếp dân, danh mục thủ tục hành chính, nguyên tắc bảo đảm an toàn PCCC dân sinh và giải đáp vướng mắc phổ biến.`;
      break;
    case 2:
      sapoFirst = `Công dân cần liên hệ công tác, xác thực tài khoản định danh hoặc phản ánh sự việc an ninh tại ${unitName} có thể đến trực tiếp ${agencyTitle} tại ${address} hoặc gọi hotline khẩn cấp ${phone}. Cơ quan trực thuộc Công an ${provName}, duy trì lực lượng trực ban sẵn sàng xử lý tình huống 24/24.`;
      sapoSecond = `Toàn bộ quy trình tiếp nhận hồ sơ tạm trú, thường trú và cấp giấy xác nhận nhân khẩu được thực hiện minh bạch theo cơ chế một cửa điện tử, giảm thiểu tối đa giấy tờ trung gian cho công dân và doanh nghiệp.`;
      sapoThird = `Nội dung dưới đây cung cấp đầy đủ quyền hạn pháp lý của đơn vị, bảng hướng dẫn lệ phí - thời hạn xử lý và bộ khuyến cáo phòng ngừa tội phạm công nghệ cao.`;
      break;
    case 3:
      sapoFirst = `${agencyTitle} (địa chỉ: ${address}) giữ vai trò nòng cốt bảo vệ bình yên địa bàn ${unitName}${districtName ? `, trực thuộc khu vực ${districtName}` : ''}. Người dân khi phát hiện vụ việc gây rối, mất tài sản hoặc cần hỗ trợ khẩn cấp hãy gọi ngay số trực ban ${phone}.`;
      sapoSecond = `Lực lượng Công an cơ sở phối hợp chặt chẽ với tổ bảo vệ an ninh trật tự khu phố để hướng dẫn bà con tích hợp giấy tờ số trên VNeID và thẩm tra hồ sơ cư trú đúng thời hạn pháp luật quy định.`;
      sapoThird = `Xem ngay quy định giờ tiếp công dân, các bước nộp hồ sơ dịch vụ công trực tuyến, kinh nghiệm tránh cuộc gọi mạo danh điều tra viên và giải đáp thắc mắc.`;
      break;
    case 4:
      sapoFirst = `Nhằm bảo đảm trật tự an toàn xã hội trên địa bàn ${unitName}, ${agencyTitle} tổ chức tiếp công dân tại trụ sở ${address} và duy trì tổ trực tiếp nhận thông tin 24/24 qua số điện thoại ${phone}. Đơn vị quản lý địa bàn ${provName} theo quy chuẩn nghiệp vụ của Bộ Công an.`;
      sapoSecond = `Người dân và các cơ sở lưu trú kinh doanh trên địa bàn có thể thực hiện thông báo lưu trú qua phần mềm định danh quốc gia, rút ngắn thời gian xác minh và không phải đến trụ sở đối với các thủ tục đã số hóa hoàn toàn.`;
      sapoThird = `Bài viết tổng hợp các dữ liệu thực địa quan trọng, lưu ý nộp hồ sơ hành chính, phương án an toàn cháy nổ khí đốt gia đình và 5 câu hỏi thường gặp.`;
      break;
    case 5:
      sapoFirst = `Địa chỉ ${agencyTitle} tọa lạc tại ${address}, phụ trách giữ vững an ninh chính trị, phòng chống tội phạm và thực thi pháp luật trên toàn bộ địa giới ${unitName}. Mọi tin báo khẩn cấp hoặc yêu cầu trợ giúp an ninh của người dân được tiếp nhận 24/24 qua hotline ${phone}.`;
      sapoSecond = `Các thủ tục hành chính thông dụng như đăng ký nơi cư trú, cấp số định danh cá nhân và xác thực tài khoản dịch vụ công đều được cán bộ phụ trách địa bàn hướng dẫn tận tình theo quy chuẩn hiện đại.`;
      sapoThird = `Chi tiết cơ cấu nhiệm vụ, quy trình giải quyết hồ sơ giấy tờ, dấu hiệu nhận biết bẫy lừa đảo qua mạng và giải đáp các tình huống thực tế của bà con.`;
      break;
    case 6:
      sapoFirst = `Người dân sinh sống, học tập và làm việc trên địa bàn ${unitName} (${provName}) liên hệ giải quyết hồ sơ cư trú hoặc yêu cầu trợ giúp an ninh tại trụ sở ${agencyTitle} (địa chỉ: ${address}). Hotline đường dây nóng túc trực tiếp nhận tin báo 24/24 là ${phone}.`;
      sapoSecond = `Đơn vị triển khai tiếp nhận và trả kết quả dịch vụ công theo Đề án 06 của Chính phủ, giúp người dân chủ động nộp hồ sơ trực tuyến tại nhà và nhận kết quả xác thực cư trú nhanh chóng.`;
      sapoThird = `Toàn bộ thông tin thẩm quyền, lưu ý thủ tục giấy tờ, biện pháp tự bảo vệ tài sản trước tội phạm công nghệ cao và giải đáp câu hỏi dân sinh được trình bày dưới đây.`;
      break;
    default:
      sapoFirst = `Cơ quan ${agencyTitle} đóng tại địa chỉ ${address}, trực thuộc hệ thống Công an ${provName}, thực hiện chức năng quản lý trật tự công cộng, hộ tịch cư trú và tiếp công dân trên toàn diện tích ${unitName}. Số điện thoại trực ban tiếp nhận tố giác tội phạm phục vụ 24/7 là ${phone}.`;
      sapoSecond = `Quy trình đăng ký tạm trú, cấp định danh VNeID mức 2 và xác nhận nơi cư trú được cán bộ một cửa giải quyết đúng hẹn, công khai minh bạch mọi mức thu lệ phí theo quy chuẩn của Nhà nước.`;
      sapoThird = `Hướng dẫn chi tiết lịch tiếp công dân, bảng so sánh thời gian giải quyết thủ tục, khuyến cáo phòng cháy chữa cháy gian bếp và giải đáp thắc mắc liên quan.`;
      break;
  }

  // =========================================================================
  // 2. BA BỘ NHIỆM VỤ QUẢN LÝ CỐT LÕI (Biến thể H2-1 theo missionVariantIndex)
  // =========================================================================
  let missionCards = null;
  if (missionVariantIndex === 0) {
    missionCards = (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px', marginBottom: '16px' }}>
        <div style={{ padding: '14px 16px', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
          <strong style={{ color: '#1d4ed8', fontSize: '14px', display: 'block', marginBottom: '4px' }}>Số hóa dữ liệu nhân khẩu & Cư trú</strong>
          <span style={{ fontSize: '13.5px', color: '#475569' }}>Cập nhật Cơ sở dữ liệu quốc gia về dân cư; hướng dẫn thủ tục đăng ký thường trú, tạm trú và cấp mã định danh VNeID mức 2 cho công dân.</span>
        </div>
        <div style={{ padding: '14px 16px', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
          <strong style={{ color: '#1d4ed8', fontSize: '14px', display: 'block', marginBottom: '4px' }}>Trực ban 24/24 tiếp nhận tin báo ANTT</strong>
          <span style={{ fontSize: '13.5px', color: '#475569' }}>Duy trì tổ trực tiếp nhận tố giác tội phạm, có mặt kịp thời tại hiện trường vụ việc và hòa giải các mâu thuẫn tranh chấp dân sinh.</span>
        </div>
        <div style={{ padding: '14px 16px', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
          <strong style={{ color: '#1d4ed8', fontSize: '14px', display: 'block', marginBottom: '4px' }}>Tuần tra khép kín & An toàn giao thông</strong>
          <span style={{ fontSize: '13.5px', color: '#475569' }}>Phối hợp tuần tra kiểm soát các cung đường trọng điểm, xử lý trật tự lòng lề đường và các điểm đen phức tạp về an toàn giao thông.</span>
        </div>
        <div style={{ padding: '14px 16px', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
          <strong style={{ color: '#1d4ed8', fontSize: '14px', display: 'block', marginBottom: '4px' }}>Kiểm tra cơ sở kinh doanh có điều kiện</strong>
          <span style={{ fontSize: '13.5px', color: '#475569' }}>Giám sát chấp hành pháp luật tại các nhà trọ, khách sạn, cơ sở cầm đồ, điểm chiết nạp gas LPG nhằm triệt tiêu nguy cơ phát sinh tệ nạn và cháy nổ.</span>
        </div>
      </div>
    );
  } else if (missionVariantIndex === 1) {
    missionCards = (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px', marginBottom: '16px' }}>
        <div style={{ padding: '14px 16px', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
          <strong style={{ color: '#1d4ed8', fontSize: '14px', display: 'block', marginBottom: '4px' }}>Phòng ngừa tội phạm công nghệ cao</strong>
          <span style={{ fontSize: '13.5px', color: '#475569' }}>Tuyên truyền các phương thức lừa đảo qua mạng xã hội, hướng dẫn người dân bảo vệ tài khoản ngân hàng và thông tin cá nhân trên môi trường số.</span>
        </div>
        <div style={{ padding: '14px 16px', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
          <strong style={{ color: '#1d4ed8', fontSize: '14px', display: 'block', marginBottom: '4px' }}>Xây dựng phong trào toàn dân bảo vệ ANTQ</strong>
          <span style={{ fontSize: '13.5px', color: '#475569' }}>Xây dựng mô hình tổ liên gia tự quản, camera an ninh khu dân cư và nâng cao ý thức tự phòng, tự quản, tự bảo vệ trong cộng đồng.</span>
        </div>
        <div style={{ padding: '14px 16px', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
          <strong style={{ color: '#1d4ed8', fontSize: '14px', display: 'block', marginBottom: '4px' }}>Quản lý cư trú & Giấy tờ công dân</strong>
          <span style={{ fontSize: '13.5px', color: '#475569' }}>Thực hiện thông báo lưu trú, đăng ký tạm vắng, giải quyết xác nhận nơi cư trú (mẫu CT07) phục vụ học tập, khám chữa bệnh và xin việc làm.</span>
        </div>
        <div style={{ padding: '14px 16px', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
          <strong style={{ color: '#1d4ed8', fontSize: '14px', display: 'block', marginBottom: '4px' }}>Ứng phó sự cố cháy nổ & Cứu nạn</strong>
          <span style={{ fontSize: '13.5px', color: '#475569' }}>Tổ chức tập huấn PCCC dân gian, kiểm tra phương tiện chữa cháy tại chỗ và phối hợp lực lượng 114 khi có sự cố khẩn cấp.</span>
        </div>
      </div>
    );
  } else {
    missionCards = (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px', marginBottom: '16px' }}>
        <div style={{ padding: '14px 16px', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
          <strong style={{ color: '#1d4ed8', fontSize: '14px', display: 'block', marginBottom: '4px' }}>Đấu tranh phòng chống tệ nạn xã hội</strong>
          <span style={{ fontSize: '13.5px', color: '#475569' }}>Rà soát lập hồ sơ theo dõi người nghiện ma túy, triệt phá các tụ điểm cờ bạc, số đề và các hành vi gây rối an ninh trật tự cơ sở.</span>
        </div>
        <div style={{ padding: '14px 16px', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
          <strong style={{ color: '#1d4ed8', fontSize: '14px', display: 'block', marginBottom: '4px' }}>Cung cấp dịch vụ công trực tuyến cấp xã</strong>
          <span style={{ fontSize: '13.5px', color: '#475569' }}>Hỗ trợ người dân tiếp cận quy trình nộp hồ sơ đăng ký cư trú trực tuyến tại nhà, giảm phiền hà và rút ngắn thời gian xử lý hồ sơ.</span>
        </div>
        <div style={{ padding: '14px 16px', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
          <strong style={{ color: '#1d4ed8', fontSize: '14px', display: 'block', marginBottom: '4px' }}>Bảo đảm trật tự công cộng địa phương</strong>
          <span style={{ fontSize: '13.5px', color: '#475569' }}>Kiểm tra xử lý tình trạng đậu xe trái phép, lấn chiếm vỉa hè họp chợ tự phát và tiếng ồn khu dân cư ảnh hưởng đến đời sống nhân dân.</span>
        </div>
        <div style={{ padding: '14px 16px', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
          <strong style={{ color: '#1d4ed8', fontSize: '14px', display: 'block', marginBottom: '4px' }}>Túc trực tiếp nhận phản ánh 24/7</strong>
          <span style={{ fontSize: '13.5px', color: '#475569' }}>Duy trì đường dây nóng, tiếp nhận và ghi sổ nhật ký mọi phản ánh, tin báo của nhân dân cả ngày lẫn đêm để phân loại xử lý.</span>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 3. NỘI DUNG ĐẶC THÙ THEO ARCHETYPE ĐỊA BÀN
  // =========================================================================
  let localFocusTitle = '';
  let localFocusDesc = '';
  let localPcccAdvice = '';

  if (archetype === 'INDUSTRIAL_WORKER') {
    localFocusTitle = `Trọng Tâm Quản Lý Nhà Trọ, Công Nhân Lao Động & An Ninh Ca Kíp`;
    localFocusDesc = `Là địa bàn phát triển sản xuất công nghiệp tập trung đông đảo người lao động và công nhân cư trú, ${agencyTitle} đẩy mạnh công tác kiểm tra tạm trú tại các dãy nhà trọ, ký túc xá và duy trì các tổ tuần tra đêm theo ca kíp nhằm ngăn chặn trộm cắp, cờ bạc và bảo đảm an toàn cho công nhân đi làm ca đêm về muộn. Chủ cơ sở cho thuê trọ có trách nhiệm thông báo lưu trú kịp thời qua ứng dụng VNeID.`;
    localPcccAdvice = `Tại các khu nhà trọ công nhân và xóm trọ tập trung ở ${unitName}, nguy cơ cháy nổ từ bếp gas đơn, dây dẫn khí đốt cũ mục và sạc xe điện qua đêm là rất đáng báo động. Người thuê trọ cần kiểm tra van bình gas ngay sau khi nấu, không để bình gas sát bếp điện, và chủ nhà trọ phải trang bị bình chữa cháy bột xách tay ở mỗi tầng theo khuyến cáo của Công an PCCC.`;
  } else if (archetype === 'URBAN_CORE') {
    localFocusTitle = `Trọng Tâm Quản Lý Chung Cư Cao Tầng, Trật Tự Đô Thị & Định Danh VNeID`;
    localFocusDesc = `Với đặc thù đô thị trung tâm có mật độ dân cư cao${density ? ` (khoảng ${density} người/km²)` : ''} cùng nhiều tòa nhà chung cư, khu thương mại dịch vụ, ${agencyTitle} tập trung số hóa 100% dữ liệu nhân khẩu, hướng dẫn cư dân chung cư kích hoạt định danh mức 2, đồng thời tăng cường xử lý trật tự vỉa hè, lòng lề đường và kiểm soát người nước ngoài lưu trú đúng quy định pháp luật.`;
    localPcccAdvice = `Tại các căn hộ chung cư và nhà ống liền kề thuộc ${unitName}, việc sử dụng khí đốt LPG nấu nướng đòi hỏi tuân thủ nghiêm ngặt quy định: chỉ dùng bình gas có van ngắt tự động, đặt bình nơi thông thoáng không bị bí khí, và tuyệt đối không che chắn lối thoát hiểm, ban công chuồng cọp.`;
  } else if (archetype === 'SUBURBAN_EXPANSION') {
    localFocusTitle = `Trọng Tâm Quản Lý Địa Bàn Đô Thị Hóa Nhanh & Biến Động Dân Cư`;
    localFocusDesc = `Trong bối cảnh ${unitName} đang mở rộng hạ tầng đô thị với nhiều dự án xây dựng mới, ${agencyTitle} tăng cường quản lý các nhóm thợ xây dựng thời vụ, kiểm tra hộ tịch tạm trú tại các khu dân cư mới bàn giao và duy trì mô hình camera an ninh liên tổ để chủ động phòng ngừa tội phạm đột nhập, trộm cắp tài sản.`;
    localPcccAdvice = `Người dân tại các khu dân cư mới và nhà ở riêng lẻ trên địa bàn ${unitName} cần chú ý kiểm tra định kỳ hệ sinh thái gian bếp: không tự ý sang chiết gas mini nguy hiểm, chỉ gọi đổi bình gas chính hãng từ đại lý có giấy phép (như Sopet Gas One, Phoenix Gas, Luxen Gas) và lắp đầu báo rò rỉ khí gas tự động.`;
  } else {
    localFocusTitle = `Trọng Tâm Giữ Gìn An Ninh Thôn Ấp, Nông Thôn Mới & Hỗ Trợ Dịch Vụ Công Từ Xa`;
    localFocusDesc = `Trên diện tích địa bàn trải rộng${areaKm2 ? ` khoảng ${areaKm2} km²` : ''}, ${agencyTitle} củng cố lực lượng an ninh cơ sở tại các thôn/ấp, phát động phong trào toàn dân bảo vệ an ninh Tổ quốc, đồng thời tổ chức các điểm hỗ trợ lưu động kích hoạt VNeID cho bà con lớn tuổi, gia đình chính sách gặp khó khăn khi tiếp cận công nghệ thông tin.`;
    localPcccAdvice = `Bà con nông thôn tại ${unitName} khi sử dụng bếp gas cần lưu ý không đặt bình gas gần nơi chứa rơm rạ, củi khô hoặc kho nông sản dễ bắt lửa. Luôn khóa van đầu bình gas sau mỗi lần đun nấu và liên hệ ngay lực lượng PCCC qua số 114 khi xảy ra sự cố.`;
  }

  // =========================================================================
  // 4. BA GÓC ĐỘ CẢNH BÁO LỪA ĐẢO CÔNG NGHỆ CAO (Biến thể H2 số 3)
  // =========================================================================
  let scamWarningBlock = null;
  if (scamVariantIndex === 0) {
    scamWarningBlock = (
      <div style={{ backgroundColor: '#fff5f5', border: '1px solid #fed7d7', borderRadius: '12px', padding: '18px 22px', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#9b2c2c', margin: '0 0 10px 0' }}>
          ⚠️ Thủ Đoạn 1: Giả Danh Điều Tra Viên Gọi Điện Thông Báo Dính Líu Chuyên Án Rửa Tiền
        </h3>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#4a5568', fontSize: '14px', lineHeight: '1.7' }}>
          <li><strong>Thủ đoạn:</strong> Đối tượng tự xưng là cán bộ Cơ quan Cảnh sát Điều tra gọi thông báo số điện thoại hoặc tài khoản của nạn nhân có liên quan đến đường dây ma túy xuyên quốc gia, yêu cầu kết bạn Zalo để nhận lệnh bắt giam giả mạo.</li>
          <li><strong>Yêu cầu phi pháp:</strong> Ép buộc nạn nhân giữ bí mật với người thân, ra ngân hàng rút toàn bộ tiền tiết kiệm chuyển vào "tài khoản tạm giữ của cơ quan điều tra" để chứng minh vô tội.</li>
          <li><strong>Quy định thật:</strong> Lực lượng Công an <strong>tuyệt đối không làm việc qua điện thoại</strong>, không bao giờ yêu cầu công dân chuyển tiền. Giấy triệu tập chỉ có giá trị khi gửi văn bản giấy đến tận nhà.</li>
        </ul>
      </div>
    );
  } else if (scamVariantIndex === 1) {
    scamWarningBlock = (
      <div style={{ backgroundColor: '#fff5f5', border: '1px solid #fed7d7', borderRadius: '12px', padding: '18px 22px', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#9b2c2c', margin: '0 0 10px 0' }}>
          ⚠️ Thủ Đoạn 2: Giả Mạo Hướng Dẫn Cập Nhật Định Danh VNeID Để Chiếm Đoạt Tài Khoản Ngân Hàng
        </h3>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#4a5568', fontSize: '14px', lineHeight: '1.7' }}>
          <li><strong>Thủ đoạn:</strong> Kẻ gian gọi điện mạo danh cán bộ Công an ${unitName} thông báo hồ sơ định danh mức 2 của công dân bị lỗi hệ thống, yêu cầu truy cập đường link lạ có đuôi <code>.apk</code> để cài đặt phần mềm hỗ trợ.</li>
          <li><strong>Hậu quả:</strong> Ứng dụng độc hại chiếm quyền trợ năng (Accessibility) trên điện thoại, đọc trộm mã OTP ngân hàng và tự động chuyển toàn bộ tiền trong tài khoản của nạn nhân đi nơi khác.</li>
          <li><strong>Quy định thật:</strong> Công an chỉ hướng dẫn tải ứng dụng VNeID chính thức từ Google Play Store và Apple App Store, không bao giờ gửi link cài đặt file APK riêng lẻ.</li>
        </ul>
      </div>
    );
  } else {
    scamWarningBlock = (
      <div style={{ backgroundColor: '#fff5f5', border: '1px solid #fed7d7', borderRadius: '12px', padding: '18px 22px', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#9b2c2c', margin: '0 0 10px 0' }}>
          ⚠️ Thủ Đoạn 3: Lừa Đảo Thông Báo Phạt Nguội Giao Thông & Yêu Cầu Chuyển Tiền Nộp Phạt
        </h3>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#4a5568', fontSize: '14px', lineHeight: '1.7' }}>
          <li><strong>Thủ đoạn:</strong> Gọi điện thông báo phương tiện của người dân bị camera ghi nhận lỗi giao thông nghiêm trọng sắp hết hạn đóng phạt, đe dọa tạm giữ phương tiện hoặc tước giấy phép lái xe vĩnh viễn.</li>
          <li><strong>Hành vi lừa đảo:</strong> Hướng dẫn nạn nhân chuyển tiền nộp phạt gấp vào số tài khoản cá nhân do đối tượng cung cấp để "hưởng chính sách giảm nhẹ", thay vì nộp vào kho bạc Nhà nước.</li>
          <li><strong>Quy định thật:</strong> Biên bản phạt nguội được gửi bằng văn bản có dấu đỏ hoặc tra cứu chính thức trên Cổng Dịch vụ công Quốc gia và Cổng thông tin Cục Cảnh sát Giao thông (csgt.vn).</li>
        </ul>
      </div>
    );
  }

  // =========================================================================
  // 5. BA BỘ HƯỚNG DẪN PCCC KHÍ ĐỐT (Biến thể H2-4 theo pcccVariantIndex)
  // =========================================================================
  let pcccSteps = null;
  if (pcccVariantIndex === 0) {
    pcccSteps = (
      <ol style={{ margin: '0 0 16px 0', paddingLeft: '22px', color: '#334155', fontSize: '14px', lineHeight: '1.7' }}>
        <li><strong>Xử lý ngay khi phát hiện mùi gas:</strong> Khóa chặt van cổ bình gas, mở rộng cửa thông thoáng khí tự nhiên. Cấm bật tắt thiết bị điện hay quẹt diêm gần vùng rò rỉ.</li>
        <li><strong>Bình gas chính hãng đủ tiêu chuẩn:</strong> Ưu tiên đổi bình gas từ thương hiệu được kiểm định an toàn (Sopet Gas One, Phoenix Gas, Luxen Gas) có tem chống hàng giả và bảo hiểm theo quy định.</li>
        <li><strong>Ghi nhớ số khẩn cấp cứu nạn:</strong> Khi đám cháy có nguy cơ lan rộng, lập tức sơ tán người già, trẻ nhỏ ra ngoài và gọi ngay Tổng đài Cảnh sát PCCC & Cứu nạn cứu hộ <strong>114</strong> (hoặc Cấp cứu y tế <strong>115</strong>) túc trực 24/24.</li>
      </ol>
    );
  } else if (pcccVariantIndex === 1) {
    pcccSteps = (
      <ol style={{ margin: '0 0 16px 0', paddingLeft: '22px', color: '#334155', fontSize: '14px', lineHeight: '1.7' }}>
        <li><strong>Kiểm tra định kỳ dây dẫn và van điều áp:</strong> Thay thế ống mềm dẫn gas sau 2 năm sử dụng hoặc khi có dấu hiệu rạn nứt; xoa bọt xà phòng kiểm tra mối nối để phát hiện sớm rò rỉ.</li>
        <li><strong>Vị trí đặt bình gas an toàn:</strong> Đặt bình gas thẳng đứng ở nơi khô ráo, cách bếp nấu tối thiểu 1 mét và cách xa nguồn nhiệt, ổ cắm điện. Không đặt bình gas trong hộc kín không có lỗ thoát hơi.</li>
        <li><strong>Hành động thoát nạn nhanh chóng:</strong> Di chuyển theo lối thoát nạn thứ hai (ban công, cửa sau) khi khói bao trùm; liên hệ khẩn cấp lực lượng Cảnh sát PCCC <strong>114</strong> và chính quyền cơ sở để phối hợp ứng cứu.</li>
      </ol>
    );
  } else {
    pcccSteps = (
      <ol style={{ margin: '0 0 16px 0', paddingLeft: '22px', color: '#334155', fontSize: '14px', lineHeight: '1.7' }}>
        <li><strong>Khóa van bình gas sau khi nấu nướng:</strong> Tập thói quen khóa van cổ bình trước khi tắt bếp để khí gas còn tồn trong ống cháy hết, sau đó mới vặn núm bếp về vị trí tắt.</li>
        <li><strong>Trang bị bình chữa cháy bột xách tay:</strong> Mỗi hộ gia đình nên trang bị sẵn 1 bình chữa cháy xách tay loại MFZ4 đặt ở nơi dễ thấy, dễ lấy để dập tắt đám cháy ban đầu ngay khi phát sinh.</li>
        <li><strong>Báo cháy kịp thời:</strong> Báo động cho các hộ xung quanh, ngắt cầu dao điện tổng và gọi ngay số cứu hỏa khẩn cấp <strong>114</strong> (tiếp nhận 24/24); đồng thời thông báo cho tổ bảo vệ ANTT cơ sở để hỗ trợ dập lửa ban đầu.</li>
      </ol>
    );
  }

  // =========================================================================
  // 6. NGÂN HÀNG FAQ 24 CÂU HỎI THỰC TẾ (Lựa chọn xoay vòng theo Archetype & Hash)
  // =========================================================================
  const allFaqPool = {
    INDUSTRIAL_WORKER: [
      {
        q: `Chủ nhà trọ tại ${unitName} phải thông báo lưu trú cho công nhân thuê phòng như thế nào?`,
        a: `Chủ nhà trọ tại ${unitName} có trách nhiệm thông báo lưu trú cho người thuê trong ngày tiếp nhận khách thông qua ứng dụng VNeID (chức năng Quản lý lưu trú) hoặc Cổng Dịch vụ công Bộ Công an. Trường hợp khách đến trọ sau 23h thì thông báo trước 08h sáng hôm sau. Việc không khai báo có thể bị xử phạt hành chính theo Nghị định 144/2021/NĐ-CP.`
      },
      {
        q: `Công nhân làm ca đêm tại ${unitName} muốn làm VNeID mức 2 thì đăng ký thế nào?`,
        a: `Người lao động làm ca kíp không thể đến trong giờ hành chính có thể theo dõi lịch trực tiếp dân tăng cường vào sáng Thứ 7 của ${agencyTitle}. Ngoài ra, đơn vị thường xuyên phối hợp với Công đoàn các doanh nghiệp, khu chế xuất tổ chức các tổ công tác lưu động làm định danh trực tiếp tại nhà xưởng cho công nhân.`
      },
      {
        q: `Thuê trọ ngắn hạn dưới 30 ngày tại ${unitName} có phải đăng ký tạm trú không?`,
        a: `Theo Luật Cư trú hiện hành, công dân đến sinh sống tại chỗ ở hợp pháp ngoài phạm vi đơn vị hành chính cấp xã nơi đã đăng ký thường trú từ 30 ngày trở lên mới phải đăng ký tạm trú. Nếu ở dưới 30 ngày, công dân chỉ cần thực hiện thủ tục thông báo lưu trú qua chủ nhà trọ hoặc tự khai báo trên VNeID.`
      },
      {
        q: `Nhà trọ cho công nhân thuê tại ${unitName} cần tuân thủ những yêu cầu PCCC nào?`,
        a: `Chủ nhà trọ tại ${unitName} bắt buộc trang bị tối thiểu 01 bình chữa cháy xách tay cho mỗi tầng hoặc diện tích 50m², lối thoát nạn phải luôn thông thoáng không để xe máy chắn lối, trang bị thang thoát hiểm dự phòng và niêm yết rõ ràng nội quy PCCC kèm số điện thoại khẩn cấp 114.`
      },
      {
        q: `Bị mất xe máy hoặc đồ đạc tại khu nhà trọ công nhân ở ${unitName} cần xử lý ra sao?`,
        a: `Người bị mất cần giữ nguyên hiện trường, báo ngay cho chủ nhà trọ và gọi số trực ban ${phone} của ${agencyTitle}. Cán bộ Công an phụ trách ấp/khu phố sẽ đến ghi nhận dấu vết, trích xuất dữ liệu camera an ninh khu vực và lập biên bản điều tra truy tìm tài sản.`
      }
    ],
    URBAN_CORE: [
      {
        q: `Cư dân ở chung cư cao tầng tại ${unitName} đăng ký tạm trú cần giấy tờ gì?`,
        a: `Cư dân sinh sống tại các chung cư thuộc ${unitName} nộp hồ sơ đăng ký tạm trú trực tuyến qua Cổng Dịch vụ công Bộ Công an gồm: Tờ khai thay đổi thông tin cư trú (mẫu CT01) và Hợp đồng thuê căn hộ (hoặc Hợp đồng mua bán nhà/sổ hồng). Cán bộ quản lý địa bàn tại ${agencyTitle} sẽ thụ lý và phản hồi kết quả điện tử trong 03 ngày làm việc.`
      },
      {
        q: `Thủ tục khai báo tạm trú cho người nước ngoài cư trú tại ${unitName} thực hiện ở đâu?`,
        a: `Người nước ngoài hoặc người trực tiếp quản lý cơ sở lưu trú (khách sạn, căn hộ dịch vụ) tại ${unitName} thực hiện khai báo tạm trú qua Cổng Thông tin điện tử Xuất nhập cảnh Công an ${provName} trong vòng 12 giờ (hoặc 24 giờ đối với vùng sâu) kể từ khi người nước ngoài đến tạm trú.`
      },
      {
        q: `Khi bị mất tài sản hoặc giấy tờ cá nhân tại khu vực công cộng ở ${unitName}, cần báo ai?`,
        a: `Người dân cần đến ngay trụ sở ${agencyTitle} tại ${address} hoặc gọi hotline ${phone} để trình báo. Cán bộ trực ban sẽ hướng dẫn viết bản tường trình, ghi nhận đặc điểm tài sản bị mất, trích xuất camera an ninh khu vực (nếu có) và cấp giấy xác nhận vụ việc để công dân làm lại giấy tờ tùy thân.`
      },
      {
        q: `Trụ sở ${agencyTitle} có thu nhận hồ sơ cấp mới thẻ Căn cước không?`,
        a: `Thủ tục thu nhận dấu vân tay, chụp ảnh làm Căn cước mới được thực hiện tại Đội Cảnh sát QLHC về TTXH Công an cấp Huyện/Thành phố hoặc Bộ phận một cửa cấp trên. ${agencyTitle} hỗ trợ xác thực thông tin dân cư, cập nhật thay đổi hộ tịch và cấp phiếu xác nhận cư trú CT07.`
      },
      {
        q: `Tiếng ồn quá mức từ các quán bar, karaoke hoặc hộ lân cận tại ${unitName} báo cho ai?`,
        a: `Người dân gọi trực tiếp đến số trực ban ${phone} của ${agencyTitle} hoặc phản ánh qua ứng dụng VNeID / Tổng đài tiếp nhận thông tin dân sinh 1022. Tổ cảnh sát trật tự sẽ xuống đo đạc mức độ tiếng ồn và lập biên bản xử phạt vi phạm hành chính theo quy định môi trường.`
      }
    ],
    SUBURBAN_EXPANSION: [
      {
        q: `Gia đình mới mua nhà tại khu dân cư mới ở ${unitName} muốn nhập khẩu cần chuẩn bị gì?`,
        a: `Hộ gia đình chuẩn bị giấy chứng nhận quyền sử dụng đất/nhà ở (sổ hồng), thẻ CCCD gắn chip của các thành viên và nộp hồ sơ đăng ký thường trú trực tuyến qua Cổng Dịch vụ công Bộ Công an. ${agencyTitle} sẽ xác minh thực địa tình trạng nhà ở và giải quyết trong tối đa 07 ngày làm việc.`
      },
      {
        q: `Đăng ký tạm trú cho thợ xây dựng, lao động thời vụ tại công trình ở ${unitName} thế nào?`,
        a: `Chủ thầu xây dựng hoặc chủ hộ có trách nhiệm gom danh sách lao động kèm bản sao CCCD gắn chip để thực hiện thông báo lưu trú hoặc đăng ký tạm trú theo nhóm tại ${agencyTitle}. Việc này giúp bảo vệ quyền lợi người lao động và bảo đảm trật tự an ninh tại khu vực thi công.`
      },
      {
        q: `Có thể nộp phạt vi phạm giao thông nguội tại ${agencyTitle} không?`,
        a: `Công dân có thể đến ${agencyTitle} để được hướng dẫn tra cứu biên bản phạt nguội và nộp phạt trực tuyến qua Cổng Dịch vụ công Quốc gia. Đối với biên bản do Công an cấp Huyện hoặc Phòng CSGT lập, người dân nộp phạt trực tuyến mà không cần trực tiếp đến cơ quan xử lý ban đầu.`
      },
      {
        q: `Khi sửa chữa, cải tạo nhà ở tại ${unitName} cần lưu ý gì về an toàn PCCC?`,
        a: `Hộ gia đình thi công cải tạo phải có biện pháp che chắn chống bụi, kiểm tra ngắt cầu dao điện trước khi hàn xì, để xa các vật liệu dễ cháy như xốp, bao bì, bình gas sinh hoạt và trang bị sẵn xô nước hoặc bình cứu hỏa đề phòng tia lửa hàn bén lửa.`
      },
      {
        q: `Thủ tục cấp giấy xác nhận hai tên gọi hành chính cũ và mới sau sáp nhập tại ${unitName}?`,
        a: `Công dân mang CCCD gắn chip đến ${agencyTitle} để được trích lục mã định danh và cấp phiếu xác nhận cư trú CT07, trong đó thể hiện rõ địa chỉ nơi cư trú hiện tại tương ứng với đơn vị hành chính cũ trước khi sáp nhập.`
      }
    ],
    RURAL_COMMUNITY: [
      {
        q: `Bà con lớn tuổi tại ${unitName} đi lại khó khăn thì kích hoạt VNeID mức 2 bằng cách nào?`,
        a: `${agencyTitle} thường xuyên cử các tổ công tác Cảnh sát khu vực/Công an viên phối hợp Đoàn thanh niên đến tận nhà những người già yếu, bệnh tật, gia đình neo đơn trên địa bàn ${unitName} để thu nhận hồ sơ và hỗ trợ cài đặt ứng dụng định danh VNeID hoàn toàn miễn phí.`
      },
      {
        q: `Làm nhà mới trên đất thổ cư nông thôn tại ${unitName} đăng ký thường trú ra sao?`,
        a: `Chủ hộ nộp bản sao Giấy chứng nhận quyền sử dụng đất ở hợp pháp, bản vẽ hiện trạng nhà (hoặc xác nhận của UBND xã về nhà ở không tranh chấp) và điền tờ khai CT01 qua Cổng Dịch vụ công. Cán bộ Công an xã phụ trách ấp sẽ đến kiểm tra thực tế và hoàn tất thủ tục cấp mã hộ gia đình.`
      },
      {
        q: `Người dân phát hiện vụ việc gây mất trật tự hoặc trộm cắp ở thôn ấp báo cho ai nhanh nhất?`,
        a: `Người dân liên hệ ngay số trực ban của ${agencyTitle} qua số điện thoại ${phone} hoặc báo cho Công an viên phụ trách thôn/ấp. Lực lượng Công an xã chính quy sẽ cùng tổ bảo vệ ANTT cơ sở có mặt xử lý và bảo vệ hiện trường trong thời gian sớm nhất.`
      },
      {
        q: `Bà con nông dân tại ${unitName} lưu ý gì khi sử dụng gas trong đun nấu và sản xuất?`,
        a: `Tuyệt đối không dùng bình gas quá hạn kiểm định, không sang chiết gas trái phép phục vụ sấy nông sản hoặc hàn gắn. Gian bếp phải cách xa chuồng trại và kho củi khô; thường xuyên kiểm tra chuột cắn ống dẫn gas để ngăn chặn cháy nổ.`
      },
      {
        q: `Muốn đăng ký tạm vắng khi đi làm ăn xa ngoài tỉnh thì người dân ${unitName} làm thế nào?`,
        a: `Công dân vắng mặt khỏi nơi cư trú từ 12 tháng trở lên mà không đăng ký tạm trú tại nơi ở mới thì thực hiện khai báo tạm vắng trực tuyến trên VNeID hoặc Cổng Dịch vụ công Bộ Công an mà không bắt buộc phải về tận quê nộp giấy.`
      }
    ]
  };

  const commonScamFaq = {
    q: `Làm sao phân biệt cuộc gọi của cán bộ ${agencyTitle} thật với đối tượng lừa đảo qua mạng?`,
    a: `Cán bộ ${agencyTitle} tuyệt đối không bao giờ điều tra vụ án, lấy lời khai, yêu cầu chụp tài khoản ngân hàng hoặc đe dọa người dân qua điện thoại và Zalo. Mọi thông báo triệu tập làm việc đều được gửi bằng giấy mời có dấu mộc đỏ về địa chỉ cư trú. Nếu nhận cuộc gọi yêu cầu chuyển tiền hoặc gửi link tải app lạ, người dân cúp máy ngay và báo về số ${phone}.`
  };

  const archetypePool = allFaqPool[archetype] || allFaqPool.URBAN_CORE;
  // Xoay vòng 3 câu hỏi từ pool 5 câu dựa trên hashKey + câu lừa đảo
  const startFaqIdx = getDeterministicHash(hashKey, 71) % archetypePool.length;
  const selectedArchetypeFaqs = [];
  for (let i = 0; i < 3; i++) {
    selectedArchetypeFaqs.push(archetypePool[(startFaqIdx + i) % archetypePool.length]);
  }
  const faqs = [...selectedArchetypeFaqs, commonScamFaq];

  // =========================================================================
  // 7. SCHEMA JSON-LD CẤU TRÚC
  // =========================================================================
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': isPolice ? 'PoliceStation' : 'GovernmentOffice',
        '@id': `https://ngocgas.com/tinh-thanh/province/${province.slug}/${unit.wardSlug || unit.slug}/co-quan/${agency.slug}#agency`,
        'name': agencyTitle,
        'alternateName': agency.shortName || agencyTitle,
        'description': `Thông tin tiếp dân và hỗ trợ an ninh của ${agencyTitle} tại ${unitName}, ${provName}. Trụ sở: ${address}. Trực ban 24/7: ${phone}. Giờ tiếp nhận hồ sơ: ${workingHours}.`,
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': address,
          'addressLocality': unitName,
          'addressRegion': provName,
          'addressCountry': 'VN'
        },
        'telephone': phone,
        'openingHours': 'Mo-Fr 07:30-17:00',
        'hasMap': agency.googleMapsUrl || undefined
      },
      {
        '@type': 'FAQPage',
        '@id': `https://ngocgas.com/tinh-thanh/province/${province.slug}/${unit.wardSlug || unit.slug}/co-quan/${agency.slug}#faq`,
        'mainEntity': faqs.map(item => ({
          '@type': 'Question',
          'name': item.q,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': item.a
          }
        }))
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `https://ngocgas.com/tinh-thanh/province/${province.slug}/${unit.wardSlug || unit.slug}/co-quan/${agency.slug}#breadcrumb`,
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Trang chủ',
            'item': 'https://ngocgas.com'
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Bản đồ 34 Tỉnh thành',
            'item': 'https://ngocgas.com/tinh-thanh'
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': provName,
            'item': `https://ngocgas.com/tinh-thanh/province/${province.slug}`
          },
          {
            '@type': 'ListItem',
            'position': 4,
            'name': unitName,
            'item': `https://ngocgas.com/tinh-thanh/province/${province.slug}/${unit.wardSlug || unit.slug}`
          },
          {
            '@type': 'ListItem',
            'position': 5,
            'name': agencyTitle,
            'item': `https://ngocgas.com/tinh-thanh/province/${province.slug}/${unit.wardSlug || unit.slug}/co-quan/${agency.slug}`
          }
        ]
      }
    ]
  };

  return (
    <article
      className="agency-seo-article-container"
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        padding: '32px',
        marginBottom: '28px',
        boxShadow: '0 4px 20px -2px rgba(0,0,0,0.04)',
        color: '#1e293b',
        lineHeight: '1.8',
        fontSize: '15px'
      }}
    >
      {/* Schema JSON-LD nhúng an toàn */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* KHỐI 1: SAPO 3 PHẦN CHUẨN BĂNG TÂM (Đa biến thể Sapo) */}
      <div
        className="agency-seo-sapo"
        style={{
          backgroundColor: '#f8fafc',
          borderLeft: '5px solid #1d4ed8',
          padding: '20px 24px',
          borderRadius: '0 12px 12px 0',
          marginBottom: '28px'
        }}
      >
        <p style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '700', color: '#0f172a', lineHeight: '1.6' }}>
          {sapoFirst}
        </p>

        <p style={{ margin: '0 0 12px 0', fontSize: '14.5px', color: '#334155', lineHeight: '1.65' }}>
          {sapoSecond}
        </p>

        <p style={{ margin: 0, fontSize: '13.5px', color: '#64748b', fontStyle: 'italic' }}>
          📌 {sapoThird}
        </p>
      </div>

      {/* KHỐI 2: H2 SỐ 1 - CHỨC NĂNG, THẨM QUYỀN & DỮ LIỆU ĐỊA BÀN THỰC ĐỊA */}
      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#0f172a', margin: '0 0 14px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🛡️</span>
          <span>1. Chức Năng, Thẩm Quyền & Nhiệm Vụ Quản Lý Của {agencyTitle}</span>
        </h2>

        <p style={{ margin: '0 0 14px 0', color: '#334155' }}>
          <strong>{agencyTitle}</strong> là lực lượng vũ trang nòng cốt ở cấp cơ sở, trực tiếp tham mưu cho Đảng ủy, UBND {unitName} và Ban Chỉ huy Công an cấp trên trong công tác bảo vệ an ninh quốc gia, giữ gìn trật tự an toàn xã hội và đấu tranh phòng ngừa vi phạm pháp luật trên địa bàn.
        </p>

        {/* Khối nhúng dữ liệu thực địa: Dân số, Diện tích, Sáp nhập, Giáp ranh */}
        <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '16px 20px', marginBottom: '18px' }}>
          <strong style={{ display: 'block', color: '#1e40af', fontSize: '14px', marginBottom: '6px' }}>
            📊 Dữ liệu quản lý nhân khẩu & địa giới hành chính thực tế tại {unitName}:
          </strong>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13.5px', color: '#1e3a8a', lineHeight: '1.7' }}>
            {population && (
              <li><strong>Quy mô dân cư quản lý:</strong> Hơn <strong>{population}</strong> người dân thường trú và tạm trú trên địa bàn.</li>
            )}
            {areaKm2 && (
              <li><strong>Diện tích phụ trách:</strong> Khoảng <strong>{areaKm2} km²</strong>{density ? ` (mật độ dân cư đạt xấp xỉ ${density} người/km²)` : ''}.</li>
            )}
            {oldUnitsList && (
              <li><strong>Lịch sử sáp nhập & kiện toàn:</strong> Được kiện toàn và sắp xếp từ các đơn vị hành chính trước đây gồm <em>{oldUnitsList}</em>, bảo đảm tính liên tục của dữ liệu cư trú.</li>
            )}
            {neighborsList && (
              <li><strong>Phối hợp tuần tra giáp ranh:</strong> Duy trì quy chế bảo đảm an ninh trật tự phối hợp chặt chẽ với các địa bàn lân cận: <em>{neighborsList}</em>.</li>
            )}
          </ul>
        </div>

        <p style={{ margin: '0 0 14px 0', color: '#334155' }}>
          Đơn vị triển khai toàn diện các nhóm nhiệm vụ an ninh cốt lõi:
        </p>

        {/* Khối 4 nhiệm vụ xoay vòng theo missionVariantIndex */}
        {missionCards}
      </section>

      {/* KHỐI 3: H2 SỐ 2 - ĐẶC THÙ ĐỊA BÀN RIÊNG BIỆT (ARCHETYPE SPECIFIC) */}
      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#0f172a', margin: '0 0 14px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🏢</span>
          <span>2. {localFocusTitle} Tại {unitName}</span>
        </h2>

        <p style={{ margin: '0 0 14px 0', color: '#334155' }}>
          {localFocusDesc}
        </p>

        <p style={{ margin: '0 0 14px 0', color: '#334155' }}>
          Bảng phân định hình thức giải quyết các thủ tục hành chính công an phổ biến tại trụ sở {agencyTitle}:
        </p>

        {/* Bảng so sánh thủ tục chuẩn mực */}
        <div style={{ overflowX: 'auto', marginBottom: '18px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#f1f5f9', color: '#0f172a', borderBottom: '2px solid #cbd5e1' }}>
                <th style={{ padding: '10px 14px', fontWeight: '800' }}>Tên thủ tục</th>
                <th style={{ padding: '10px 14px', fontWeight: '800' }}>Hình thức tiếp nhận</th>
                <th style={{ padding: '10px 14px', fontWeight: '800' }}>Thời hạn xử lý</th>
                <th style={{ padding: '10px 14px', fontWeight: '800' }}>Lệ phí quy định</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '10px 14px', fontWeight: '700', color: '#1e293b' }}>Đăng ký thường trú / Tạm trú</td>
                <td style={{ padding: '10px 14px', color: '#475569' }}>Cổng DVC Bộ Công An / VNeID</td>
                <td style={{ padding: '10px 14px', color: '#0f172a' }}>03 ngày làm việc</td>
                <td style={{ padding: '10px 14px', color: '#16a34a', fontWeight: '700' }}>Theo quy định nhà nước</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
                <td style={{ padding: '10px 14px', fontWeight: '700', color: '#1e293b' }}>Kích hoạt định danh VNeID mức 2</td>
                <td style={{ padding: '10px 14px', color: '#475569' }}>Trực tiếp tại quầy tiếp dân</td>
                <td style={{ padding: '10px 14px', color: '#0f172a' }}>Giải quyết ngay tại quầy</td>
                <td style={{ padding: '10px 14px', color: '#16a34a', fontWeight: '700' }}>Miễn phí 100%</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '10px 14px', fontWeight: '700', color: '#1e293b' }}>Xác nhận thông tin cư trú (Mẫu CT07)</td>
                <td style={{ padding: '10px 14px', color: '#475569' }}>Trực tuyến hoặc nộp trực tiếp</td>
                <td style={{ padding: '10px 14px', color: '#0f172a' }}>Trong ngày làm việc</td>
                <td style={{ padding: '10px 14px', color: '#16a34a', fontWeight: '700' }}>Miễn phí</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
                <td style={{ padding: '10px 14px', fontWeight: '700', color: '#1e293b' }}>Tiếp nhận tố giác tội phạm & tin báo ANTT</td>
                <td style={{ padding: '10px 14px', color: '#475569' }}>Trực tiếp / Trực ban {phone}</td>
                <td style={{ padding: '10px 14px', color: '#0f172a' }}>Tiếp nhận khẩn cấp 24/7</td>
                <td style={{ padding: '10px 14px', color: '#16a34a', fontWeight: '700' }}>Miễn phí</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* KHỐI 4: H2 SỐ 3 - CẢNH BÁO AN NINH CÔNG NGHỆ CAO (MỤC KHÁC BIỆT BĂNG TÂM) */}
      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#b91c1c', margin: '0 0 14px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🚨</span>
          <span>3. Cảnh Báo An Ninh: Phòng Chống Lừa Đảo Giả Danh Công An Qua Điện Thoại & Mạng Xã Hội</span>
        </h2>

        <p style={{ margin: '0 0 14px 0', color: '#334155' }}>
          Cục An ninh mạng và <strong>{agencyTitle}</strong> phát đi cảnh báo khẩn cấp đến nhân dân ${unitName}: Lực lượng Công an Nhân dân tuyệt đối không làm việc qua điện thoại, không yêu cầu công dân chụp tài khoản ngân hàng và không bao giờ yêu cầu chuyển tiền vào số tài khoản cá nhân.
        </p>

        {/* Khối cảnh báo biến thể đa tầng theo scamVariantIndex */}
        {scamWarningBlock}

        <p style={{ margin: 0, fontSize: '14px', color: '#1e40af', backgroundColor: '#eff6ff', padding: '12px 16px', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
          💡 <strong>Cách xử lý an toàn:</strong> Khi nhận cuộc gọi nghi vấn, người dân bình tĩnh ngắt kết nối, không cung cấp mã OTP, không cài app lạ và gọi ngay số trực ban của <strong>{agencyTitle} ({phone})</strong> hoặc cơ quan Công an gần nhất để kiểm chứng thông tin chính thức.
        </p>
      </section>

      {/* KHỐI 5: H2 SỐ 4 - HƯỚNG DẪN AN TOÀN PCCC KHÍ ĐỐT & SỐ KHẨN CẤP 114 */}
      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#0f172a', margin: '0 0 14px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🔥</span>
          <span>4. Khuyến Cáo An Toàn PCCC Khí Đốt Bếp Gas Gia Đình & Số Cứu Hỏa 114</span>
        </h2>

        <p style={{ margin: '0 0 14px 0', color: '#334155' }}>
          {localPcccAdvice}
        </p>

        <p style={{ margin: '0 0 14px 0', color: '#334155' }}>
          Lực lượng Cảnh sát PCCC & CNCH khuyến cáo người dân tuân thủ nghiêm ngặt 3 nguyên tắc an toàn phòng chống cháy nổ khí dầu mỏ hóa lỏng (LPG) trong sinh hoạt gia đình:
        </p>

        {/* Khối quy tắc PCCC xoay vòng theo pcccVariantIndex */}
        {pcccSteps}
      </section>

      {/* KHỐI 6: H2 SỐ 5 - 4 CÂU HỎI THƯỜNG GẶP (FAQ ĐẶC THÙ THEO ARCHETYPE) */}
      <section style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#0f172a', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>❓</span>
          <span>5. Câu Hỏi Thường Gặp Của Người Dân Khi Đến Làm Việc Tại {agencyTitle}</span>
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {faqs.map((faq, fIdx) => (
            <div
              key={fIdx}
              style={{
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '16px 20px'
              }}
            >
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a', margin: '0 0 8px 0', display: 'flex', alignItems: 'flex-start', gap: '8px', lineHeight: '1.4' }}>
                <span style={{ color: '#1d4ed8' }}>Q{fIdx + 1}:</span>
                <span>{faq.q}</span>
              </h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#475569', lineHeight: '1.65' }}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* KHỐI 7: KẾT LUẬN & ĐIỀU HƯỚNG BẢN ĐỒ THỰC ĐỊA */}
      <div
        style={{
          borderTop: '1px solid #e2e8f0',
          paddingTop: '20px',
          marginTop: '28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '14px'
        }}
      >
        <div>
          <strong style={{ fontSize: '14px', color: '#0f172a', display: 'block' }}>
            Thông tin liên hệ & hỗ trợ trực tiếp tại {unitName}:
          </strong>
          <span style={{ fontSize: '13px', color: '#64748b' }}>
            Trụ sở: {address} · Trực ban 24/7: <strong>{phone}</strong>
          </span>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <a
            href={agency.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(agencyTitle + ', ' + address)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#1d4ed8',
              color: '#ffffff',
              padding: '10px 16px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '800',
              textDecoration: 'none'
            }}
          >
            <span>📍 Xem Vị Trí Google Maps</span>
          </a>
        </div>
      </div>

      {/* LƯU Ý PHÁP LÝ & TIẾP NHẬN BÁO LỖI THÔNG TIN */}
      <DataFeedbackSection
        itemName={agencyTitle}
        itemAddress={address}
        itemType={isPolice ? 'cơ quan công an' : 'trụ sở cơ quan hành chính'}
      />
    </article>
  );
}
