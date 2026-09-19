import fs from 'fs';
import path from 'path';
import { generateTechTable, generateBrandSection, generateTroubleshootingSection, banners } from './content-helpers.mjs';

const binhThanhData = [
  {
    id: 21,
    slug: 'giao-gas-phuong-gia-dinh',
    ward: 'Phường Gia Định',
    oldWards: 'Phường 1, 2, 7, 17 và một phần Phường 15 cũ của quận Bình Thạnh',
    title: 'Đổi Bình Gas Phường Gia Định (Bình Thạnh Cũ) — Giao Nhanh 15 Phút, Cân Đủ Ký, An Toàn',
    summary: 'Đại lý đổi bình gas Phường Gia Định (sáp nhập Phường 1, 2, 7, 17 và 15 cũ của Bình Thạnh). Phân phối chính hãng Sopet Gas One, Luxen Gas, Phoenix Gas đủ vỏ xám, đỏ, xanh, vàng (van ngang, van chụp). Cân điện tử đủ 12kg tại bếp, giao nhanh 15 phút Chợ Bà Chiểu, Lê Văn Duyệt, Phan Đăng Lưu. Hotline 1900 9396.',
    streets: 'đường Lê Văn Duyệt (Đinh Tiên Hoàng cũ), Phan Đăng Lưu, Bạch Đằng, Xô Viết Nghệ Tĩnh đoạn ngã tư Hàng Xanh, Hoàng Hoa Thám, Phan Chu Trinh, Vũ Tùng',
    landmarks: 'Chợ Bà Chiểu, Lăng Tả quân Lê Văn Duyệt, Bệnh viện Nhân dân Gia Định, Bệnh viện Ung Bướu, KDC Hoàng Hoa Thám',
    painPoints: [
      'Nỗi lo gas thiếu ký, bị gian lận rút ruột từ các đại lý sang chiết lậu: Nhiều đại lý nhỏ lẻ chào mời giá rẻ nhưng rút bớt từ 1.5kg đến 3kg gas.',
      'Nỗi ám ảnh lửa đỏ, ám muội đen kịt đáy nồi inox: Khí gas trôi nổi lẫn nhiều cặn tạp chất khiến ngọn lửa cháy đỏ phè phè làm hư hỏng xoong chảo cao cấp.',
      'Hiểm họa rò rỉ khí gas trong các khu hẻm sâu ẩm ướt: Bình gas rỉ mục chân đế dễ bị bục thủng hoặc hở gioăng van trong nhà ống kín gió.',
      'Dây dẫn gas bị chuột cống gặm nhấm ngầm trong hộc bếp: Dây cao su mềm bị cắn thủng li ti tạo điểm rò rỉ gas âm ỉ nguy hiểm.',
      'Thợ giao hàng chậm trễ, cẩu thả đi giày bẩn vào nhà: Khách hàng chờ đợi mòn mỏi cả tiếng đồng hồ giờ nấu cơm trưa.'
    ],
    faqs: [
      {
        q: 'Nhà tôi trong hẻm sâu đường Hoàng Hoa Thám xe lớn không vào được thì giao gas thế nào?',
        a: 'Kỹ thuật viên Ngọc Gas sử dụng xe máy gắn giá chở gas chuyên dụng gọn gàng, luồn lách qua mọi ngõ hẻm nhỏ nhất tại Hoàng Hoa Thám và bê vác tận kệ bếp nhà bạn hoàn toàn miễn phí.'
      },
      {
        q: 'Tôi muốn biết giá đổi bình gas hôm nay tại Phường Gia Định là bao nhiêu?',
        a: 'Giá gas tại Ngọc Gas được điều chỉnh công khai theo thị trường năng lượng quốc tế vào ngày đầu mỗi tháng. Quý khách có thể xem giá chính xác theo từng thương hiệu tại <a href="/gia-gas-hom-nay" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">Bảng giá gas hôm nay</a> hoặc gọi hotline 1900 9396.'
      },
      {
        q: 'Quán ăn quanh Chợ Bà Chiểu đổi gas đêm có giao không?',
        a: 'Ngọc Gas phục vụ liên tục giao nhanh 10 - 15 phút cho các quán ăn đêm tại khu vực Chợ Bà Chiểu, cam kết đủ 12kg và không tăng giá ca đêm.'
      },
      {
        q: 'Bình gas chính hãng có bảo hiểm không?',
        a: 'Toàn bộ bình gas phân phối bởi Ngọc Gas đều có bảo hiểm trách nhiệm sản phẩm theo đúng quy chuẩn an toàn PCCC và pháp luật nhà nước.'
      }
    ]
  },
  {
    id: 22,
    slug: 'giao-gas-phuong-binh-thanh',
    ward: 'Phường Bình Thạnh',
    oldWards: 'Phường 12, 14, 24 và một phần Phường 26 cũ của quận Bình Thạnh',
    title: 'Đổi Bình Gas Phường Bình Thạnh Mới — Trục Chu Văn An, Phan Chu Trinh & Chợ Bà Chiểu',
    summary: 'Đại lý đổi bình gas Phường Bình Thạnh mới (sáp nhập Phường 12, 14, 24 và một phần Phường 26 cũ). Cung cấp Sopet Gas One, Luxen Gas, Phoenix Gas đủ vỏ xám, đỏ, xanh, vàng. Giao hỏa tốc 15 phút đường Chu Văn An, Bùi Đình Túy, Phan Chu Trinh, Nơ Trang Long, Bạch Đằng, Học viện Cán bộ TP.HCM. Cân đủ 12kg tại bếp. Hotline 1900 9396.',
    streets: 'đường Chu Văn An, Bùi Đình Túy, Phan Chu Trinh nối dài, Nơ Trang Long, Bạch Đằng, Lê Quang Định, Đinh Bộ Lĩnh',
    landmarks: 'Học viện Cán bộ TP.HCM, KDC Chu Văn An (khu phân lô cán bộ văn minh), Chợ Cây Điệp, Chợ Phan Văn Trị, Bệnh viện Ung Bướu cơ sở cũ',
    painPoints: [
      'Nỗi sợ bình gas rút ruột từ các tờ rơi dán tường quanh khu cư xá: Đổi bình 12kg nhưng thực chất chỉ có 9kg khí gas, đun rất nhanh cạn.',
      'Khí gas đỏ lửa làm đen thui xoong chảo đắt tiền: Gas kém chất lượng bốc khói khét lẹt, ám đen đáy nồi inox và gây tốn gas.',
      'Hiểm họa rò rỉ khí gas trong các con hẻm trũng hay ngập: Hơi ẩm làm rỉ sét mục đáy bình gas kim loại, gây nguy cơ xì gas nguy hiểm.',
      'Chuột cống cắn phá dây dẫn gas trong tủ bếp nhà phố: Dây dẫn cao su mềm dễ bị cắn thủng lỗ kim.',
      'Thợ giao gas chậm trễ vì kẹt xe nút giao Bạch Đằng - Đinh Bộ Lĩnh: Khách hàng phải chờ đợi lâu giờ cơm chiều.'
    ],
    faqs: [
      {
        q: 'KDC Chu Văn An đường Bùi Đình Túy giao gas trong bao lâu?',
        a: 'Kỹ thuật viên Ngọc Gas có trạm chốt tại trục Chu Văn An - Nơ Trang Long, cam kết có mặt tận nhà quý khách chỉ sau 10 đến 15 phút.'
      },
      {
        q: 'Tôi ở Chung cư Đất Phương Nam đường Chu Văn An có giao lên tận căn hộ không?',
        a: 'Có! Thợ Ngọc Gas mang bình vào tận kệ bếp căn hộ, thực hiện cân đối chứng điện tử và kiểm tra rò rỉ bọt xà phòng hoàn toàn miễn phí.'
      },
      {
        q: 'Tôi đang dùng bình gas màu đỏ có đổi sang Sopet Gas One vỏ xám được không?',
        a: 'Được 100%! Ngọc Gas hỗ trợ đổi ngang vỏ miễn phí giữa mọi thương hiệu và màu sắc bình gas mà không thu cọc.'
      },
      {
        q: 'Xem giá đổi bình gas Phường Bình Thạnh hôm nay ở đâu?',
        a: 'Quý khách vui lòng tra cứu trực tiếp tại <a href="/gia-gas-hom-nay" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">Bảng giá gas hôm nay</a> hoặc gọi hotline 1900 9396.'
      }
    ]
  },
  {
    id: 23,
    slug: 'giao-gas-phuong-binh-loi-trung',
    ward: 'Phường Bình Lợi Trung',
    oldWards: 'Phường 13 và phần còn lại Phường 26 cũ của quận Bình Thạnh',
    title: 'Đổi Bình Gas Phường Bình Lợi Trung (Bình Thạnh Cũ) — KDC Bình Lợi & ĐH Văn Lang CS3',
    summary: 'Đại lý đổi bình gas Phường Bình Lợi Trung (sáp nhập Phường 13 và 26 cũ của Bình Thạnh). Phân phối Sopet Gas One, Luxen Gas, Phoenix Gas đủ vỏ xám, đỏ, xanh, vàng. Giao hỏa tốc 15 phút KDC Bình Lợi (đường Trục 30m), ĐH Văn Lang cơ sở 3, đường Đặng Thùy Trâm, Phạm Văn Đồng, Chung cư Richmond City. Cân đủ 12kg tại bếp. Hotline 1900 9396.',
    streets: 'đường Đặng Thùy Trâm, đường Trục 30m, Phạm Văn Đồng, Nơ Trang Long, Nguyễn Xí, Lương Ngọc Quyến, Bình Lợi',
    landmarks: 'Khu đô thị biệt thự ven sông Bình Lợi, Trường ĐH Văn Lang (cơ sở 3), Bến xe Miền Đông cũ, Chung cư Richmond City, Chung cư Thủy Lợi 4',
    painPoints: [
      'Sinh viên ĐH Văn Lang và cư dân xóm trọ bị lừa đổi bình gas thiếu ký: Nhiều tờ rơi dán tường chào giá rẻ nhưng rút ruột chỉ còn 8kg gas.',
      'Khí gas đỏ lửa làm đen đáy nồi sinh viên và gia đình: Gas pha lẫn tạp chất làm cháy tốn kém và bẩn gian bếp.',
      'Nguy cơ cháy nổ tại các dãy phòng trọ chật hẹp đường Đặng Thùy Trâm: Phòng kín gió, bình gas rỉ sét van kẹt rất nguy hiểm.',
      'Chuột cống từ bờ sông Vàm Thuật cắn đứt dây dẫn gas mềm: Dây dẫn cao su trong hộc tủ bếp bị cắn thủng gây rò rỉ âm ỉ.',
      'Thợ giao gas từ chối vác lầu hoặc thu thêm phụ phí vô lý đối với sinh viên ở trọ lầu 3, lầu 4.'
    ],
    faqs: [
      {
        q: 'Sinh viên Văn Lang ở trọ lầu 3 đường Đặng Thùy Trâm đổi gas có bị tính thêm phí vác không?',
        a: 'Hoàn toàn không! Ngọc Gas hỗ trợ sinh viên mang bình gas lên tận phòng trọ lầu 3, lầu 4 và lắp đặt kiểm tra an toàn miễn phí 100%.'
      },
      {
        q: 'Biệt thự KDC Bình Lợi muốn lắp hệ thống 2 bình gas có van đảo tự động được không?',
        a: 'Hoàn toàn được. Đội ngũ kỹ thuật của Ngọc Gas chuyên thi công hệ thống van đảo chiều tự động và trang bị cảm biến rò gas an toàn cho biệt thự và nhà phố.'
      },
      {
        q: 'Chung cư Richmond City đường Nguyễn Xí đổi gas thợ có được lên tận căn hộ không?',
        a: 'Có! Kỹ thuật viên Ngọc Gas có thẻ đăng ký thang hàng, mang bọc giày sạch sẽ vào căn hộ, cân đủ 12kg tại bếp cho quý khách.'
      },
      {
        q: 'Giá gas hôm nay tại Phường Bình Lợi Trung bao nhiêu?',
        a: 'Mời quý khách xem bảng giá cập nhật theo ngày tại <a href="/gia-gas-hom-nay" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">Bảng giá gas hôm nay</a> hoặc liên hệ hotline 1900 9396.'
      }
    ]
  },
  {
    id: 24,
    slug: 'giao-gas-phuong-thanh-my-tay',
    ward: 'Phường Thạnh Mỹ Tây',
    oldWards: 'Phường 19, 22 và 25 cũ của quận Bình Thạnh',
    title: 'Đổi Bình Gas Phường Thạnh Mỹ Tây (Bình Thạnh Cũ) — Vinhomes Landmark 81 & Cụm ĐH D2 D5',
    summary: 'Đại lý đổi bình gas Phường Thạnh Mỹ Tây (sáp nhập Phường 19, 22, 25 cũ của Bình Thạnh). Phân phối chính hãng Sopet Gas One, Luxen Gas, Phoenix Gas đủ vỏ xám, đỏ, xanh, vàng. Giao hỏa tốc 15 phút Vinhomes Central Park (Landmark 81), Saigon Pearl, Manor, cụm ĐH D2 D5, HUTECH, Ngoại Thương. Cân đủ 12kg tại bếp. Hotline 1900 9396.',
    streets: 'đường Nguyễn Gia Trí (D2 cũ), D5, Ung Văn Khiêm, Điện Biên Phủ, Nguyễn Hữu Cảnh, Xô Viết Nghệ Tĩnh, Ngô Tất Tố',
    landmarks: 'Khu đô thị Vinhomes Central Park & Landmark 81, Saigon Pearl, The Manor, Sunwah Pearl, Cụm ĐH HUTECH, ĐH Ngoại Thương, ĐH Giao Thông Vận Tải',
    painPoints: [
      'Cư dân căn hộ cao cấp Vinhomes, Saigon Pearl yêu cầu chuẩn mực PCCC khắt khe: Rất sợ rò rỉ khí gas trong phòng kín điều hòa trung tâm.',
      'Thợ giao gas cẩu thả đi giày bẩn làm trầy xước sàn gỗ và sàn đá cẩm thạch cao cấp: Gây phiền toái và mất vệ sinh nhà cửa.',
      'Hàng trăm quán ăn vặt, quán lẩu nướng đường D2, D5 tiêu thụ lượng gas lớn bị hết gas giờ cao điểm: Đại lý giao chậm làm gián đoạn việc bán hàng.',
      'Khí gas đỏ lửa làm ám muội than đen kịt các bộ nồi inox nhập khẩu đắt tiền.',
      'Nỗi sợ đổi phải bình gas rút ruột từ các điểm tiếp thị dạo ven đường Ung Văn Khiêm.'
    ],
    faqs: [
      {
        q: 'Căn hộ tại Landmark 81 hoặc Vinhomes Central Park đặt gas thì thợ có mang lên tận bếp được không?',
        a: 'Có! Kỹ thuật viên Ngọc Gas có thẻ đăng ký thang máy hàng tại sảnh B2, mang bọc giày chuyên dụng, cân đủ 12kg tại bếp và kiểm tra rò rỉ bọt xà phòng cho quý khách.'
      },
      {
        q: 'Quán lẩu nướng trên đường D2 cần dùng nhiều bình gas một tuần có chính sách ưu đãi gì?',
        a: 'Ngọc Gas hỗ trợ lắp đặt hệ thống van ngắt an toàn đạt chuẩn PCCC, bảo trì bếp công nghiệp định kỳ và chiết khấu giá hấp dẫn cho nhà hàng.'
      },
      {
        q: 'Tôi muốn dùng bình Sopet Gas One vỏ xám Nhật Bản có van tự ngắt an toàn cho chung cư không?',
        a: 'Sopet Gas One đạt chuẩn JIS G3116 Nhật Bản kết hợp cùng van chụp Compact tự động ngắt khi có sự cố đứt dây dẫn, là giải pháp số 1 cho căn hộ cao tầng.'
      },
      {
        q: 'Giá bình gas hôm nay tại Phường Thạnh Mỹ Tây bao nhiêu?',
        a: 'Quý khách vui lòng tra cứu trực tiếp tại <a href="/gia-gas-hom-nay" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">Bảng giá gas hôm nay</a> hoặc gọi hotline 1900 9396.'
      }
    ]
  },
  {
    id: 25,
    slug: 'giao-gas-phuong-binh-quoi',
    ward: 'Phường Bình Quới',
    oldWards: 'Phường 27 và Phường 28 cũ của quận Bình Thạnh',
    title: 'Đổi Bình Gas Phường Bình Quới (Bình Thạnh Cũ) — Bán Đảo Thanh Đa & Làng Ẩm Thực Sinh Thái',
    summary: 'Đại lý đổi bình gas Phường Bình Quới mới (sáp nhập Phường 27 và 28 - Bình Thạnh). Cung cấp Sopet Gas One, Luxen Gas, Phoenix Gas đủ vỏ xám, đỏ, xanh, vàng. Giao hỏa tốc 15 phút Bán đảo Thanh Đa, Làng du lịch Bình Quới 1-2-3, Cư xá Thanh Đa, đường Bình Quới, Cầu Kinh. Cân đủ 12kg tại bếp, phục vụ nhà hàng sinh thái. Hotline 1900 9396.',
    streets: 'đường Bình Quới, đường Thanh Đa, Cầu Kinh Thanh Đa, hẻm bờ kè sông Sài Gòn, các ngõ xóm ven sông',
    landmarks: 'Bán đảo Thanh Đa xanh mát, Làng Du lịch Sinh thái Bình Quới 1, 2, 3, Khu Cư xá Thanh Đa lâu đời, Bờ kè sông Sài Gòn, Khu câu cá giải trí',
    painPoints: [
      'Địa hình bán đảo độc đạo qua Cầu Kinh, nhiều đại lý xa từ chối giao hoặc giao trễ cả tiếng đồng hồ: Cư dân Thanh Đa chờ đợi lâu.',
      'Độ ẩm cao từ sông rạch bao quanh làm đáy bình gas rỉ sét mục chân đế: Tiềm ẩn nguy cơ bục thủng rò rỉ khí gas nguy hiểm.',
      'Các nhà hàng ẩm thực sinh thái Bình Quới nấu nướng công suất lớn bị tụt áp gas khi đông khách: Đòi hỏi bình gas chịu áp lực cao và nguồn cấp liên tục.',
      'Nỗi sợ đổi phải bình gas sang chiết lậu từ các ghe thuyền trôi nổi trên sông: Bình nhẹ cân, pha tạp chất làm đen nồi chảo.',
      'Khu Cư xá Thanh Đa cũ không có thang máy, thợ giao gas ngại leo lầu hoặc thu thêm phụ phí vô lý.'
    ],
    faqs: [
      {
        q: 'Nhà tôi ở sâu trong khu du lịch Bình Quới 3 gần cuối bán đảo có giao gas nhanh không?',
        a: 'Có! Kỹ thuật viên Ngọc Gas túc trực ngay tại đầu Cầu Kinh Thanh Đa, cam kết luồn lách ngõ hẻm và có mặt tận bếp nhà bạn chỉ sau 10 đến 15 phút.'
      },
      {
        q: 'Tôi ở Lô số Cư xá Thanh Đa lầu 4 không có thang máy thợ có mang lên tận nhà không?',
        a: 'Thợ Ngọc Gas mang bình lên tận lầu 4 Cư xá Thanh Đa, lắp đặt và kiểm tra an toàn miễn phí 100%, tuyệt đối không thu thêm bất kỳ khoản phụ phí nào.'
      },
      {
        q: 'Nhà hàng sinh thái cần dùng giàn bình 45kg Luxen Gas có hỗ trợ thi công không?',
        a: 'Ngọc Gas hỗ trợ trọn gói khảo sát, lắp đặt đường ống gas công nghiệp đạt chuẩn PCCC và bảo trì định kỳ hàng tháng cho nhà hàng.'
      },
      {
        q: 'Xem giá đổi bình gas Phường Bình Quới hôm nay ở đâu?',
        a: 'Mời quý khách tra cứu trực tiếp tại <a href="/gia-gas-hom-nay" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">Bảng giá gas hôm nay</a> hoặc gọi hotline 1900 9396.'
      }
    ]
  }
];

function buildBinhThanhContent(item) {
  const painPointsList = item.painPoints.map(p => `  <li>${p}</li>`).join('\n');
  const faqsHtml = item.faqs.map(f => `
<div class="faq-item" style="margin-bottom:16px;background:#F8FAFC;padding:16px 20px;border-radius:8px;border-left:4px solid #2563EB;">
  <h4 style="margin:0 0 8px 0;font-size:16px;color:#1E40AF;">${f.q}</h4>
  <p style="margin:0;color:#334155;line-height:1.6;"><strong>Trả lời:</strong> ${f.a}</p>
</div>`).join('\n');

  return `
<div class="quick-summary" style="background:#EFF6FF;border-left:5px solid #2563EB;padding:18px 20px;margin-bottom:28px;border-radius:8px;font-size:15px;line-height:1.7;color:#1E40AF;">
  <strong>Dịch vụ đổi bình gas chính hãng uy tín tại ${item.ward} (địa bàn sáp nhập ${item.oldWards}):</strong> Cung cấp đa dạng các dòng bình gas chính hãng <strong>Luxen Gas, Sopet Gas One, Phoenix Gas</strong> với đủ 4 màu sắc vỏ bình: <em>vỏ xám tiêu chuẩn, vỏ đỏ nổi bật, vỏ xanh dương, vỏ vàng cam</em> (hệ van ngang ren vặn POL và van chụp compact tự động ngắt). Phục vụ chu đáo cư dân và các cơ sở kinh doanh tại <em>${item.landmarks} cùng các trục đường huyết mạch ${item.streets}</em>. Cam kết cân điện tử chuẩn xác đủ 12kg tại bếp, giao hỏa tốc 10 - 15 phút, thợ mang bọc giày lịch thiệp, bảo trì an toàn miễn phí. Khách hàng dễ dàng tra cứu <a href="/gia-gas-hom-nay" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">Bảng giá gas hôm nay</a> hoặc liên hệ mạng lưới <a href="/cua-hang" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">Hệ thống cửa hàng Ngọc Gas</a> qua hotline: <a href="tel:19009396" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">1900 9396</a>.
</div>

<div class="article-banner-wrap" style="text-align:center;margin:24px 0 32px 0;">
  <img src="${banners[item.slug]}" alt="${item.title}" style="max-width:100%;height:auto;border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,0.08);" />
</div>

<h2>1. Vị Trí Địa Lý ${item.ward} Mới & Thấu Hiểu 5 Nỗi Đau Khách Hàng</h2>
<p>
  Theo Nghị quyết số 1685/NQ-UBTVQH15 của Ủy ban Thường vụ Quốc hội về sắp xếp các đơn vị hành chính tại TP. Hồ Chí Minh, <strong>${item.ward}</strong> được thành lập dựa trên việc sáp nhập <strong>${item.oldWards}</strong>. Địa bàn mới sở hữu vị thế kinh tế - đô thị chiến lược của quận Bình Thạnh, kết nối trực tiếp các trục đường huyết mạch như <em>${item.streets}</em>, đồng thời là nơi tọa lạc của các địa danh trọng điểm: <em>${item.landmarks}</em>.
</p>
<p>
  Qua quá trình đồng hành và phục vụ hàng ngàn hộ gia đình, khu dân cư xóm trọ và nhà hàng ẩm thực tại ${item.ward}, Ngọc Gas thấu hiểu sâu sắc <strong>5 nỗi lo lớn nhất</strong> mà người tiêu dùng thường xuyên gặp phải khi gọi gas:
</p>
<ul>
${painPointsList}
</ul>

${generateTechTable(item.ward)}

${generateBrandSection(item.ward)}

${generateTroubleshootingSection()}

<h2>5. Mạng Lưới Tuyến Đường Giao Hỏa Tốc 10 - 15 Phút Tại ${item.ward} Mới</h2>
<p>
  Nhờ trạm giao vận chiến lược cắm chốt ngay tại trung tâm địa bàn, đội ngũ kỹ thuật viên xe máy chuyên dụng của Ngọc Gas cam kết có mặt trong <strong>10 đến 15 phút</strong> tại mọi cung đường, ngõ hẻm thuộc ${item.ward}:
</p>
<ul>
  <li><strong>Trục đường chính &amp; ngõ hẻm:</strong> Toàn bộ các ngõ ngách thuộc ${item.streets}.</li>
  <li><strong>Cụm dân cư &amp; thương mại:</strong> Khu vực quanh ${item.landmarks}.</li>
  <li><strong>Cụm chung cư cao tầng:</strong> Hỗ trợ mang vác lên tận căn hộ tầng cao bằng thang máy hoặc thang bộ không thu thêm bất kỳ phụ phí nào.</li>
</ul>

<h2>6. Câu Hỏi Thường Gặp (FAQ) ${item.ward} Mới</h2>
${faqsHtml}

<div style="background:#EFF6FF;border:2px dashed #2563EB;padding:24px;text-align:center;border-radius:12px;margin-top:36px;">
  <h3 style="color:#1E40AF;margin-top:0;font-size:20px;">GỌI GAS ${item.ward.toUpperCase()} — GIAO NHANH 15 PHÚT, CÂN ĐỦ KÝ AN TOÀN</h3>
  <p style="color:#1D4ED8;font-size:16px;margin-bottom:18px;">Phục vụ cư dân ${item.oldWards} • Vỏ Xám, Đỏ, Xanh, Vàng • Hotline 1900 9396</p>
  <a href="tel:19009396" style="background:#2563EB;color:#fff;padding:14px 34px;border-radius:30px;font-weight:bold;font-size:18px;text-decoration:none;display:inline-block;box-shadow:0 4px 14px rgba(37,99,235,0.35);">📞 TỔNG ĐÀI ĐẶT GAS: 1900 9396</a>
</div>
`;
}

function run() {
  const articles = binhThanhData.map(item => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    summary: item.summary,
    imageUrl: banners[item.slug],
    is_published: 0,
    content: buildBinhThanhContent(item)
  }));

  const fileContent = `import fs from 'fs';
import path from 'path';

const banners = JSON.parse(fs.readFileSync(path.resolve('scratch/28_new_wards_banner_urls.json'), 'utf8'));

export const binhThanhArticles = ${JSON.stringify(articles, null, 2)};
`;

  fs.writeFileSync(path.resolve('scripts/new-wards/cluster-binh-thanh.mjs'), fileContent, 'utf8');
  console.log('✅ Đã tái tạo thành công cluster-binh-thanh.mjs với 5 bài viết chuyên sâu chuẩn 9 trụ cột!');
}

run();
