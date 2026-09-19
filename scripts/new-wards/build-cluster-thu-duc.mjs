import fs from 'fs';
import path from 'path';
import { generateTechTable, generateBrandSection, generateTroubleshootingSection, banners } from './content-helpers.mjs';
import { thuDucArticles as currentThuDuc } from './cluster-thu-duc.mjs';

const tamBinhArticle = currentThuDuc.find(a => a.id === 38);

const thuDucData = [
  // 37. Phường Hiệp Bình
  {
    id: 37,
    slug: 'giao-gas-phuong-hiep-binh',
    ward: 'Phường Hiệp Bình',
    oldWards: 'Hiệp Bình Chánh và Hiệp Bình Phước cũ của TP. Thủ Đức',
    title: 'Đổi Bình Gas Phường Hiệp Bình (Thủ Đức Mới) — KĐT Vạn Phúc & GigaMall Phạm Văn Đồng',
    summary: 'Đại lý đổi bình gas Phường Hiệp Bình mới (sáp nhập Hiệp Bình Chánh và Hiệp Bình Phước - TP. Thủ Đức). Phân phối Sopet Gas One, Luxen Gas, Phoenix Gas đủ vỏ xám, đỏ, xanh, vàng. Giao hỏa tốc 15 phút KĐT Vạn Phúc City, TTTM GigaMall, đường Quốc Lộ 13, Phạm Văn Đồng, Kha Vạn Cân, Hiệp Bình, Opal Riverside. Cân đủ 12kg tại bếp. Hotline 1900 9396.',
    streets: 'đường Phạm Văn Đồng, Quốc Lộ 13, Kha Vạn Cân, Hiệp Bình, Đinh Thị Thi, Đường số 23, Đường số 27, Tam Bình, Cầu Bình Triệu',
    landmarks: 'Đại đô thị Vạn Phúc City (198ha), TTTM GigaMall Phạm Văn Đồng, Chợ Bình Triệu, Chung cư Opal Riverside, Opal Garden, Sunview 1-2, 4S Riverside Linh Đông',
    painPoints: [
      'Nỗi ám ảnh giao gas trễ do kẹt xe triền miên tại Quốc Lộ 13 và ngã tư Bình Triệu: Các đại lý ngoài phường thường xuyên giao trễ 45 phút - 1 tiếng giữa lúc khách đang nấu cơm.',
      'Hiểm họa rò rỉ khí gas trong các căn hộ chung cư cao cấp ven sông: Cư dân Opal Riverside, Opal Garden rất sợ rò rỉ gas trong phòng kín điều hòa, yêu cầu van tự ngắt tuyệt đối.',
      'Khí gas lẫn cặn tạp chất làm ngọn lửa đỏ quạch và ám muội đen nồi: Đun nấu hao gas, làm hỏng các bộ nồi inox đắt tiền của cư dân Vạn Phúc City.',
      'Chuột cống từ các kênh rạch ven sông Sài Gòn cắn đứt dây dẫn gas: Dây dẫn mềm trong hộc bếp bị cắn thủng li ti tạo điểm xì gas âm ỉ nguy hiểm.',
      'Bình gas sang chiết lậu thiếu ký tràn lan: Một số điểm giao gas trôi nổi rút bớt 2 - 3kg gas của khách hàng.'
    ],
    faqs: [
      {
        q: 'KĐT Vạn Phúc City đường Quốc Lộ 13 có giao gas nhanh và thợ lịch sự không?',
        a: 'Kỹ thuật viên Ngọc Gas có mặt sau 10 - 15 phút, trang bị bọc giày vải khi vào nhà, cân đối chứng điện tử đủ 12kg và kiểm tra an toàn van khóa chuẩn mực.'
      },
      {
        q: 'Chung cư Opal Garden và Opal Riverside có giao lên tận căn hộ tầng cao không?',
        a: 'Có! Thợ Ngọc Gas giao tận kệ bếp căn hộ tầng cao, hỗ trợ kiểm tra xì bọt xà phòng cổ van và dây dẫn hoàn toàn miễn phí, không thu thêm phụ phí.'
      },
      {
        q: 'Tôi muốn dùng bình gas van chụp compact có rơ-le tự ngắt có sẵn hàng không?',
        a: 'Ngọc Gas luôn có sẵn bình van chụp Compact tự động ngắt khi đứt dây dẫn của Sopet Gas One và Luxen Gas đủ 4 màu sắc vỏ bình.'
      },
      {
        q: 'Giá gas hôm nay tại Phường Hiệp Bình bao nhiêu?',
        a: 'Mời quý khách xem giá niêm yết cập nhật theo ngày tại <a href="/gia-gas-hom-nay" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">Bảng giá gas hôm nay</a> hoặc gọi hotline 1900 9396.'
      }
    ]
  },

  // 39. Phường Thủ Đức
  {
    id: 39,
    slug: 'giao-gas-phuong-thu-duc',
    ward: 'Phường Thủ Đức',
    oldWards: 'Bình Thọ, Linh Chiểu, Trường Thọ và Linh Tây cũ của TP. Thủ Đức',
    title: 'Đổi Bình Gas Phường Thủ Đức Mới — Phố Biệt Thự Bình Thọ & Ga Metro Bình Thái',
    summary: 'Đại lý đổi bình gas Phường Thủ Đức mới (sáp nhập Bình Thọ, Linh Chiểu, Trường Thọ, Linh Tây - TP. Thủ Đức). Cung cấp Sopet Gas One, Luxen Gas, Phoenix Gas đủ vỏ xám, đỏ, xanh, vàng. Giao hỏa tốc 15 phút phố biệt thự Bình Thọ, Ga Metro Bình Thái, ĐH SPKT HCMUTE, đường Võ Văn Ngân, Đặng Văn Bi, Hoàng Diệu 2, Moonlight Residences. Cân đủ 12kg tại bếp. Hotline 1900 9396.',
    streets: 'đường Võ Văn Ngân, Đặng Văn Bi, Hoàng Diệu 2, Kha Vạn Cân, Dân Chủ, Khổng Tử, Thống Nhất, Tô Vĩnh Diện, Xa Lộ Hà Nội',
    landmarks: 'Trung tâm hành chính cũ TP. Thủ Đức, Trường ĐH Sư Phạm Kỹ Thuật (HCMUTE), ĐH Ngân Hàng, Phố cà phê biệt thự Bình Thọ, Ga Metro số 1 Bình Thái, Chung cư Moonlight Residences, Lavita Garden',
    painPoints: [
      'Cư dân biệt thự Bình Thọ yêu cầu cao về thẩm mỹ, sạch sẽ và an toàn cháy nổ: Thợ giao gas cẩu thả đi giày bẩn, kéo lê bình làm xước sàn đá hoa cương gây bức xúc.',
      'Nỗi sợ gas thiếu ký từ các tờ rơi dán cột điện: Các khu phố sinh viên ĐH SPKT, ĐH Ngân Hàng thường bị lừa đổi gas dởm nhẹ cân.',
      'Khí gas đỏ lửa làm đen đáy nồi chảo cao cấp: Gas kém chất lượng lẫn cặn nặng làm giảm tuổi thọ dụng cụ nấu bếp.',
      'Chuột bọ cắn phá dây dẫn gas trong tủ bếp biệt thự và nhà phố: Dây dẫn cao su mềm bị cắn thủng gây nguy cơ cháy nổ.',
      'Ám ảnh kẹt xe đường Võ Văn Ngân và Đặng Văn Bi khiến đại lý giao trễ: Khách hàng phải chờ đợi cả tiếng đồng hồ mòn mỏi giờ nấu cơm.'
    ],
    faqs: [
      {
        q: 'Nhà tôi ở khu biệt thự đường Dân Chủ, Bình Thọ thợ giao gas có đảm bảo vệ sinh sàn nhà không?',
        a: 'Thợ Ngọc Gas luôn mang bọc giày vải chuyên dụng, đặt bình nhẹ nhàng trên thảm lót cao su, cân kiểm tra điện tử và không làm trầy xước sàn nhà của gia chủ.'
      },
      {
        q: 'Chung cư Moonlight Residences đường Đặng Văn Bi có giao lên tận căn hộ không?',
        a: 'Kỹ thuật viên Ngọc Gas giao tận kệ bếp căn hộ, kiểm tra bọt xà phòng thử kín cổ van và không thu bất kỳ phụ phí thang máy nào.'
      },
      {
        q: 'Tôi muốn đổi sang bình Sopet Gas One vỏ xám Nhật Bản có được đổi ngang vỏ không?',
        a: 'Được 100%! Ngọc Gas hỗ trợ đổi ngang vỏ miễn phí giữa mọi thương hiệu bình xám, đỏ, xanh, vàng mà không phải bù cọc.'
      },
      {
        q: 'Xem giá đổi bình gas Phường Thủ Đức hôm nay ở đâu?',
        a: 'Quý khách vui lòng tra cứu trực tiếp tại <a href="/gia-gas-hom-nay" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">Bảng giá gas hôm nay</a> hoặc gọi hotline 1900 9396.'
      }
    ]
  },

  // 40. Phường Linh Xuân
  {
    id: 40,
    slug: 'giao-gas-phuong-linh-xuan',
    ward: 'Phường Linh Xuân',
    oldWards: 'Linh Xuân và Linh Trung cũ của TP. Thủ Đức',
    title: 'Đổi Bình Gas Phường Linh Xuân (Thủ Đức Mới) — KCX Linh Trung & Làng Đại Học ĐHQG',
    summary: 'Đại lý đổi bình gas Phường Linh Xuân mới (sáp nhập Linh Xuân và Linh Trung - TP. Thủ Đức). Phân phối Sopet Gas One, Luxen Gas, Phoenix Gas đủ vỏ xám, đỏ, xanh, vàng. Giao hỏa tốc 15 phút KCX Linh Trung 1 & 2, Làng Đại học Quốc gia ĐHQG, đường Quốc Lộ 1K, Quốc Lộ 1A, Lê Văn Chí, Bệnh viện Đa khoa Thủ Đức. Cân đủ 12kg tại bếp. Hotline 1900 9396.',
    streets: 'đường Quốc Lộ 1K, Quốc Lộ 1A, Xa Lộ Hà Nội, Lê Văn Chí, Đường số 8, Đường số 11, Đường số 5, Suối Tiên',
    landmarks: 'Khu chế xuất Linh Trung 1 & 2, Khu đô thị Đại học Quốc gia TP.HCM (hơn 70.000 sinh viên), Bệnh viện Đa khoa Khu vực Thủ Đức, KTX Khu B ĐHQG, Chung cư Sen Hồng, Bcons Green View',
    painPoints: [
      'Công nhân và sinh viên xóm trọ thường xuyên bị đổi phải bình gas rút ruột: Hàng vạn sinh viên và công nhân quanh KCX Linh Trung bị tiếp thị gas dởm, bình 12kg chỉ có 8kg gas.',
      'Nguy cơ cháy nổ tại các khu nhà trọ chật hẹp, ẩm thấp: Dãy trọ công nhân đường số 8, số 11 hẹp, bình gas cũ rỉ sét van kẹt đe dọa an toàn tính mạng.',
      'Lửa đỏ phè phè bốc khói đen kịt xoong chảo: Nấu nướng bằng gas bẩn làm đen nồi, cay mắt và hao tốn gas.',
      'Các quán cơm công nhân, quán ăn sinh viên bị hết gas giờ cao điểm: Đại lý giao chậm làm gián đoạn việc bán hàng phục vụ bữa trưa, bữa chiều.',
      'Thợ giao gas không kiểm tra rò rỉ sau khi thay bình: Nhiều thợ cẩu thả thay xong lấy tiền đi ngay, không thử bọt xà phòng.'
    ],
    faqs: [
      {
        q: 'Sinh viên xóm trọ gần KTX Khu B ĐHQG gọi gas có được cân kiểm tra đủ 12kg không?',
        a: 'Chắc chắn có! Thợ Ngọc Gas luôn mang theo cân điện tử kiểm định, cân trực tiếp trước mắt bạn (tổng trọng lượng trừ vỏ = đủ 12.0kg gas), cam kết bồi thường gấp đôi nếu thiếu.'
      },
      {
        q: 'Nhà trọ tôi ở lầu 3 hẻm đường Lê Văn Chí có vác lên tận phòng không?',
        a: 'Kỹ thuật viên Ngọc Gas hỗ trợ vác gas lên tận lầu cao các dãy trọ và lắp đặt an toàn miễn phí 100%.'
      },
      {
        q: 'Bình gas chính hãng Ngọc Gas có bảo hiểm PCCC không?',
        a: 'Toàn bộ sản phẩm bình gas do Ngọc Gas phân phối đều có bảo hiểm trách nhiệm sản phẩm theo quy chuẩn an toàn PCCC và pháp luật nhà nước.'
      },
      {
        q: 'Giá bình gas 12kg hôm nay tại Phường Linh Xuân bao nhiêu?',
        a: 'Mời bạn xem giá cập nhật theo ngày tại <a href="/gia-gas-hom-nay" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">Bảng giá gas hôm nay</a> hoặc gọi hotline 1900 9396.'
      }
    ]
  },

  // 41. Phường Tăng Nhơn Phú
  {
    id: 41,
    slug: 'giao-gas-phuong-tang-nhon-phu',
    ward: 'Phường Tăng Nhơn Phú',
    oldWards: 'Tăng Nhơn Phú A, Tăng Nhơn Phú B và Hiệp Phú cũ của TP. Thủ Đức',
    title: 'Đổi Bình Gas Phường Tăng Nhơn Phú Mới — Khu Công Nghệ Cao SHTP & Lê Văn Việt',
    summary: 'Đại lý đổi bình gas Phường Tăng Nhơn Phú mới (sáp nhập Tăng Nhơn Phú A, Tăng Nhơn Phú B, Hiệp Phú - TP. Thủ Đức). Cung ứng Sopet Gas One, Luxen Gas, Phoenix Gas đủ vỏ xám, đỏ, xanh, vàng. Giao hỏa tốc 15 phút Khu Công nghệ cao SHTP, Vincom Lê Văn Việt, Man Thiện, Lã Xuân Oai, Chung cư C1-C2 Man Thiện. Cân đủ 12kg tại bếp. Hotline 1900 9396.',
    streets: 'đường Lê Văn Việt, Man Thiện, Lã Xuân Oai, Quang Trung, Trương Văn Hải, Bác Ái, Đình Phong Phú, Tây Hòa',
    landmarks: 'Khu Công nghệ cao TP.HCM (SHTP), TTTM Vincom Plaza Lê Văn Việt, Học viện Bưu chính Viễn thông, ĐH Giao thông Vận tải cơ sở 2, Chung cư Man Thiện C1-C6',
    painPoints: [
      'Chuyên gia và kỹ sư công nghệ cao yêu cầu chuẩn an toàn van khóa khắt khe: Rất sợ bình gas cũ rỉ sét hoặc rò rỉ khí gas trong căn hộ chung cư.',
      'Nỗi sợ gas thiếu ký từ các cơ sở sang chiết chui giáp ranh Quận 9 cũ: Đổi bình giá rẻ nhưng đun nhanh cạn, thiệt hại kinh tế.',
      'Khí gas đỏ lửa làm ám muội than đen đáy nồi chảo inox: Gây mất vệ sinh gian bếp và giảm hiệu suất truyền nhiệt.',
      'Chuột cắn phá dây dẫn gas trong hộc bếp nhà phố: Dây cao su mềm bị cắn thủng lỗ li ti gây rò rỉ gas âm ỉ.',
      'Kẹt xe trục đường Lê Văn Việt khiến đại lý giao hàng chậm trễ: Chờ đợi lâu khi đang nấu dở bữa ăn gia đình.'
    ],
    faqs: [
      {
        q: 'Chung cư Man Thiện đường Lê Văn Việt có giao lên tận căn hộ tầng cao không?',
        a: 'Kỹ thuật viên Ngọc Gas mang bình gas vào tận kệ bếp căn hộ Chung cư Man Thiện, hỗ trợ cân điện tử đối chứng và kiểm tra bọt xà phòng miễn phí.'
      },
      {
        q: 'Khu Công nghệ cao SHTP dùng bếp ăn canteen có cung cấp bình 45kg không?',
        a: 'Có! Ngọc Gas chuyên cung cấp và lắp đặt hệ thống giàn bình gas công nghiệp 45kg Luxen kèm van ngắt tự động đạt chuẩn PCCC cho doanh nghiệp.'
      },
      {
        q: 'Tôi dùng bình gas màu xanh có đổi sang Sopet Gas One vỏ xám được không?',
        a: 'Được 100%! Ngọc Gas hỗ trợ đổi ngang vỏ miễn phí giữa mọi thương hiệu và màu sắc bình gas mà không thu cọc.'
      },
      {
        q: 'Giá đổi bình gas tại Phường Tăng Nhơn Phú hôm nay bao nhiêu?',
        a: 'Quý khách vui lòng tra cứu trực tiếp tại <a href="/gia-gas-hom-nay" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">Bảng giá gas hôm nay</a> hoặc gọi hotline 1900 9396.'
      }
    ]
  },

  // 42. Phường Long Bình
  {
    id: 42,
    slug: 'giao-gas-phuong-long-binh',
    ward: 'Phường Long Bình',
    oldWards: 'Long Bình và Long Thạnh Mỹ cũ của TP. Thủ Đức',
    title: 'Đổi Bình Gas Phường Long Bình Mới — Vinhomes Grand Park & Bến Xe Miền Đông Mới',
    summary: 'Đại lý đổi bình gas Phường Long Bình mới (sáp nhập Long Bình và Long Thạnh Mỹ - TP. Thủ Đức). Phân phối Sopet Gas One, Luxen Gas, Phoenix Gas đủ vỏ xám, đỏ, xanh, vàng. Giao hỏa tốc 15 phút Đại đô thị Vinhomes Grand Park (The Rainbow, Origami), Bến xe Miền Đông mới, BV Ung Bướu 2, Nguyễn Xiển, Hoàng Hữu Nam, Phước Thiện. Cân đủ 12kg tại bếp. Hotline 1900 9396.',
    streets: 'đường Nguyễn Xiển, Hoàng Hữu Nam, Phước Thiện, Nguyễn Văn Tăng, Quốc Lộ 1A, Vành Đai 3',
    landmarks: 'Đại đô thị Vinhomes Grand Park (hơn 44.000 căn hộ), Bến xe Miền Đông mới, Bệnh viện Ung Bướu (cơ sở 2), Depot Metro số 1 Suối Tiên, Công viên Lịch sử Văn hóa Dân tộc',
    painPoints: [
      'Đại đô thị Vinhomes Grand Park quy mô khổng lồ, nhiều đại lý bên ngoài không thông thạo sảnh tòa nhà và bảo vệ chặn xe: Khách hàng chờ đợi rất lâu mới nhận được gas.',
      'Cư dân căn hộ hiện đại rất sợ nguy cơ cháy nổ do xì gas trong phòng kín điều hòa: Đòi hỏi van điều áp tự ngắt cao cấp và thợ kiểm tra chuyên nghiệp.',
      'Khí gas đỏ lửa làm ám muội đen kịt nồi inox cao cấp: Nấu nướng bằng gas pha tạp chất parafin làm hỏng dụng cụ bếp đắt tiền.',
      'Nỗi lo gas thiếu ký từ các điểm tiếp thị dạo quanh công trường xây dựng: Bình 12kg bị rút bớt còn 8kg - 9kg gas.',
      'Thợ giao gas thiếu lịch sự, đi giày bẩn vào sàn gỗ căn hộ cao cấp: Làm trầy xước và dơ sàn nhà của cư dân.'
    ],
    faqs: [
      {
        q: 'Tôi ở phân khu The Rainbow / The Origami Vinhomes Grand Park giao gas trong bao lâu?',
        a: 'Ngọc Gas có trạm giao vận chốt ngay cổng Vinhomes Grand Park đường Nguyễn Xiển, thợ thông thạo từng sảnh block nhà và giao tận căn hộ sau 10 - 15 phút.'
      },
      {
        q: 'Chung cư Vinhomes thợ có mang bọc giày và kiểm tra rò rỉ an toàn không?',
        a: 'Kỹ thuật viên Ngọc Gas luôn mang bọc giày vải chuyên dụng, cân điện tử kiểm định trước mặt khách và quét bọt xà phòng thử kín cổ van tuyệt đối an toàn.'
      },
      {
        q: 'Bình gas Sopet Gas One vỏ xám Nhật Bản có phù hợp căn hộ chung cư không?',
        a: 'Rất phù hợp! Vỏ bình thép SG255 tiêu chuẩn JIS Nhật Bản kết hợp cùng van chụp tự ngắt Katsura mang lại sự an tâm tuyệt đối cho căn hộ gia đình.'
      },
      {
        q: 'Giá bình gas hôm nay tại Phường Long Bình cập nhật ở đâu?',
        a: 'Mời quý khách tra cứu trực tiếp tại <a href="/gia-gas-hom-nay" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">Bảng giá gas hôm nay</a> hoặc gọi hotline 1900 9396.'
      }
    ]
  },

  // 43. Phường Long Phước
  {
    id: 43,
    slug: 'giao-gas-phuong-long-phuoc',
    ward: 'Phường Long Phước',
    oldWards: 'Phường Long Phước (bán đảo sinh thái cù lao sông Đồng Nai)',
    title: 'Đổi Bình Gas Phường Long Phước (Thủ Đức Mới) — Bán Đảo Sinh Thái & Làng Đại Học Mới',
    summary: 'Đại lý đổi bình gas Phường Long Phước mới (TP. Thủ Đức). Cung ứng Sopet Gas One, Luxen Gas, Phoenix Gas đủ vỏ xám, đỏ, xanh, vàng. Giao hỏa tốc 15 phút bán đảo sinh thái Long Phước, Làng Đại học mới, Bảo tàng Áo Dài, đường Long Phước, Long Thuận, Cầu Trường Phước. Cân đủ 12kg tại bếp, phục vụ nhà vườn & biệt thự sinh thái. Hotline 1900 9396.',
    streets: 'đường Long Phước, Long Thuận, Cầu Trường Phước, Cầu Ba Son mới, đường số 1 đến số 9 Long Phước',
    landmarks: 'Bán đảo cù lao sinh thái Long Phước ven sông Đồng Nai và sông Tắc, Khu Làng Đại học mới Long Phước (ĐH Luật, ĐH Kiến Trúc cơ sở mới), Bảo tàng Áo Dài, Khu nhà vườn sinh thái cao cấp',
    painPoints: [
      'Địa bàn bán đảo cù lao cách trở sông nước, nhiều đại lý ngại đường xa từ chối giao hàng: Cư dân nhà vườn phải chờ đợi nửa ngày mới có gas.',
      'Khí hậu ven sông rạch ẩm ướt làm đáy bình gas kim loại nhanh bị rỉ sét mục chân đế: Tiềm ẩn nguy cơ rò rỉ khí gas đáy bình.',
      'Nỗi sợ đổi phải bình gas rút ruột từ các ghe thuyền trôi nổi: Bình 12kg bị san chiết lậu rút bớt gas.',
      'Khí gas đỏ lửa ám muội than làm hư hại nồi niêu: Gas kém chất lượng làm đen đáy nồi và hao tốn nhiên liệu.',
      'Thợ giao gas không kiểm tra an toàn sau khi lắp đặt: Giao qua loa rồi về, không hướng dẫn phòng ngừa rò rỉ khí gas cho gia chủ.'
    ],
    faqs: [
      {
        q: 'Nhà tôi ở khu nhà vườn sinh thái đường Long Thuận xa trung tâm có giao gas tận nơi không?',
        a: 'Có! Kỹ thuật viên Ngọc Gas túc trực tại địa bàn Long Phước, cam kết giao tận bếp nhà vườn, biệt thự sinh thái trong vòng 15 phút, không ngại đường xa.'
      },
      {
        q: 'Sinh viên các trường đại học mới tại Long Phước đổi gas có được hỗ trợ gì không?',
        a: 'Ngọc Gas hỗ trợ sinh viên cân đối chứng đủ 12.0kg gas, kiểm tra an toàn bếp gas miễn phí và cam kết không phát sinh phụ phí.'
      },
      {
        q: 'Bình gas chính hãng Ngọc Gas có bảo hiểm PCCC không?',
        a: 'Toàn bộ sản phẩm bình gas do Ngọc Gas phân phối đều có bảo hiểm trách nhiệm sản phẩm theo quy chuẩn an toàn PCCC và pháp luật nhà nước.'
      },
      {
        q: 'Giá gas hôm nay tại Phường Long Phước bao nhiêu?',
        a: 'Quý khách vui lòng tra cứu trực tiếp tại <a href="/gia-gas-hom-nay" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">Bảng giá gas hôm nay</a> hoặc gọi hotline 1900 9396.'
      }
    ]
  },

  // 44. Phường Long Trường
  {
    id: 44,
    slug: 'giao-gas-phuong-long-truong',
    ward: 'Phường Long Trường',
    oldWards: 'Long Trường và Trường Thạnh cũ của TP. Thủ Đức',
    title: 'Đổi Bình Gas Phường Long Trường Mới — KĐT SimCity & Trục Nguyễn Duy Trinh',
    summary: 'Đại lý đổi bình gas Phường Long Trường mới (sáp nhập Long Trường và Trường Thạnh - TP. Thủ Đức). Phân phối Sopet Gas One, Luxen Gas, Phoenix Gas đủ vỏ xám, đỏ, xanh, vàng. Giao hỏa tốc 15 phút KĐT SimCity, Centana Điền Phước Thành, đường Nguyễn Duy Trinh, Tam Đa, Lò Lu, Lã Xuân Oai, Vành Đai 3. Cân đủ 12kg tại bếp. Hotline 1900 9396.',
    streets: 'đường Nguyễn Duy Trinh, Tam Đa, Lò Lu, Lã Xuân Oai, Trường Lưu, Vành Đai 3, Cầu Ông Nhiêu, Cầu Trau Trảu',
    landmarks: 'Khu đô thị thông minh SimCity, KDC Centana Điền Phước Thành, KDC Rio Bonito, Khu đô thị ven Sông Tắc, Chợ Long Trường',
    painPoints: [
      'Trục đường Nguyễn Duy Trinh nhiều xe container xe tải nặng khiến đại lý giao chậm: Khách hàng chờ đợi mòn mỏi giờ cơm tối.',
      'Nỗi sợ gas thiếu ký từ các điểm sang chiết chui dọc tuyến Vành đai 3: Bình 12kg bị rút ruột chỉ còn 8kg - 9kg gas.',
      'Lửa đỏ phè phè ám muội đen kịt đáy nồi inox: Khí gas bẩn pha lẫn nước và cặn parafin làm đen đáy xoong chảo và hao gas.',
      'Khu vực đất vườn nhiều chuột bọ cắn phá dây dẫn gas: Dây cao su mềm bị cắn thủng lỗ li ti gây rò rỉ gas âm ỉ.',
      'Bình gas cũ rỉ sét, van kẹt khó thao tác: Vỏ bình quá hạn kiểm định đe dọa an toàn gia đình.'
    ],
    faqs: [
      {
        q: 'KĐT SimCity đường số 4 Lò Lu giao gas trong bao lâu?',
        a: 'Kỹ thuật viên Ngọc Gas có mặt sau 10 - 15 phút, trang bị bọc giày vải khi vào nhà, cân đối chứng điện tử đủ 12kg và kiểm tra an toàn van khóa chuẩn mực.'
      },
      {
        q: 'KDC Centana Điền Phước Thành đường Trường Lưu có giao tận nhà không?',
        a: 'Có! Thợ Ngọc Gas giao tận kệ bếp nhà phố và biệt thự, hỗ trợ kiểm tra xì bọt xà phòng cổ van và dây dẫn hoàn toàn miễn phí.'
      },
      {
        q: 'Tôi dùng bình gas màu đỏ có đổi sang Sopet Gas One vỏ xám được không?',
        a: 'Được 100%! Ngọc Gas hỗ trợ đổi ngang vỏ miễn phí giữa mọi thương hiệu và màu sắc bình gas mà không thu cọc.'
      },
      {
        q: 'Giá đổi bình gas tại Phường Long Trường hôm nay bao nhiêu?',
        a: 'Mời quý khách xem bảng giá cập nhật theo ngày tại <a href="/gia-gas-hom-nay" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">Bảng giá gas hôm nay</a> hoặc gọi hotline 1900 9396.'
      }
    ]
  },

  // 45. Phường Cát Lái
  {
    id: 45,
    slug: 'giao-gas-phuong-cat-lai',
    ward: 'Phường Cát Lái',
    oldWards: 'Cát Lái và Thạnh Mỹ Lợi cũ của TP. Thủ Đức',
    title: 'Đổi Bình Gas Phường Cát Lái Mới — Trung Tâm Hành Chính Thủ Đức & Đảo Kim Cương',
    summary: 'Đại lý đổi bình gas Phường Cát Lái mới (sáp nhập Cát Lái và Thạnh Mỹ Lợi - TP. Thủ Đức). Cung ứng Sopet Gas One, Luxen Gas, Phoenix Gas đủ vỏ xám, đỏ, xanh, vàng. Giao hỏa tốc 15 phút Đảo Kim Cương (Diamond Island), TTHC TP. Thủ Đức, KĐT Thạnh Mỹ Lợi, đường Đồng Văn Cống, Trương Văn Bang, Mai Chí Thọ, CitiGrand. Cân đủ 12kg tại bếp. Hotline 1900 9396.',
    streets: 'đường Đồng Văn Cống, Trương Văn Bang, Nguyễn Thị Định, Mai Chí Thọ, Võ Chí Công (Vành đai 2), Phan Văn Đáng, Lê Hiến Mai',
    landmarks: 'Trung tâm Hành chính UBND TP. Thủ Đức mới, Cảng Tân Cảng Cát Lái lớn nhất nước, Đảo Kim Cương (Diamond Island), KĐT Thạnh Mỹ Lợi ven sông Sài Gòn, Chung cư Feliz en Vista, Vista Verde, One Verandah, CitiGrand',
    painPoints: [
      'Ám ảnh kẹt xe container đường Đồng Văn Cống và Nguyễn Thị Định: Nhiều đại lý ngoài phường bị tắc đường, giao trễ 1 - 2 tiếng.',
      'Cư dân căn hộ cao cấp ven sông Đảo Kim Cương, Vista Verde yêu cầu an toàn PCCC tuyệt đối: Rất sợ rò rỉ khí gas trong phòng kín điều hòa.',
      'Khí gas đỏ lửa làm ám muội đen kịt nồi inox và chảo gang cao cấp: Gây hỏng các bộ dụng cụ bếp đắt tiền.',
      'Thợ giao gas cẩu thả đi giày bẩn vào sàn gỗ căn hộ cao cấp: Làm trầy xước và gây mất vệ sinh nhà cửa.',
      'Nỗi sợ đổi phải bình gas rút ruột từ các điểm tiếp thị dạo quanh cảng Cát Lái: Bình 12kg bị rút bớt gas.'
    ],
    faqs: [
      {
        q: 'Tôi ở Chung cư Feliz en Vista / Vista Verde đường Phan Văn Đáng giao gas thế nào?',
        a: 'Thợ Ngọc Gas thông thạo thủ tục ra vào sảnh căn hộ, mang bọc giày vải chuyên dụng, giao tận kệ bếp, cân điện tử kiểm định và kiểm tra bọt xà phòng miễn phí.'
      },
      {
        q: 'Đảo Kim Cương (Diamond Island) có giao gas tận căn hộ không?',
        a: 'Có! Kỹ thuật viên Ngọc Gas phục vụ chuẩn mực tại Đảo Kim Cương, mang bình gas vào tận kệ bếp và lắp đặt an toàn tuyệt đối.'
      },
      {
        q: 'Bình gas Sopet Gas One vỏ xám Nhật Bản có van tự ngắt an toàn cho chung cư không?',
        a: 'Sopet Gas One trang bị van chụp Compact tự động ngắt gas khi có sự cố đứt dây dẫn, là giải pháp an toàn hàng đầu cho cư dân căn hộ cao tầng.'
      },
      {
        q: 'Giá bình gas hôm nay tại Phường Cát Lái bao nhiêu?',
        a: 'Quý khách vui lòng tra cứu trực tiếp tại <a href="/gia-gas-hom-nay" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">Bảng giá gas hôm nay</a> hoặc gọi hotline 1900 9396.'
      }
    ]
  },

  // 46. Phường Bình Trưng
  {
    id: 46,
    slug: 'giao-gas-phuong-binh-trung',
    ward: 'Phường Bình Trưng',
    oldWards: 'Bình Trưng Đông và Bình Trưng Tây cũ của TP. Thủ Đức',
    title: 'Đổi Bình Gas Phường Bình Trưng Mới — KĐT Palm City, Lakeview & Nguyễn Duy Trinh',
    summary: 'Đại lý đổi bình gas Phường Bình Trưng mới (sáp nhập Bình Trưng Đông và Bình Trưng Tây - TP. Thủ Đức). Phân phối Sopet Gas One, Luxen Gas, Phoenix Gas đủ vỏ xám, đỏ, xanh, vàng. Giao hỏa tốc 15 phút KĐT Palm City, Lakeview City, BV Lê Văn Thịnh, đường Nguyễn Duy Trinh, Đỗ Xuân Hợp, Nguyễn Thị Định, Homyland, ParcSpring. Cân đủ 12kg tại bếp. Hotline 1900 9396.',
    streets: 'đường Nguyễn Duy Trinh, Đỗ Xuân Hợp, Nguyễn Thị Định, Song Hành Cao Tốc Long Thành - Dầu Giây, Lê Văn Thịnh, Thân Văn Nhiếp',
    landmarks: 'Khu đô thị Palm City, Lakeview City Novaland, Bệnh viện Lê Văn Thịnh, Chợ Bình Trưng, Chợ Cây Xoài, Chung cư Homyland 1-2-3, ParcSpring, La Astoria, Kris Vue',
    painPoints: [
      'Nỗi sợ bình gas rút ruột từ các đại lý nhỏ lẻ dọc trục Nguyễn Duy Trinh: Bình 12kg thực tế chỉ có 8.5kg - 9kg gas, nhanh cạn gây tốn kém.',
      'Nguy cơ cháy nổ trong các căn hộ chung cư cao tầng: Cư dân Homyland, ParcSpring rất sợ hở van hoặc chuột cắn dây dẫn gas trong hộc bếp kín.',
      'Lửa đỏ phè phè, muội than làm đen nồi inox đắt tiền: Khí gas kém chất lượng lẫn cặn parafin làm đen nhám xoong chảo.',
      'Ám ảnh kẹt xe nút giao An Phú và Nguyễn Thị Định khiến đại lý giao trễ: Khách hàng chờ đợi mệt mỏi giờ nấu cơm chiều.',
      'Thợ giao gas không kiểm tra an toàn sau khi lắp đặt: Thay bình qua loa rồi lấy tiền về, không thử bọt xà phòng.'
    ],
    faqs: [
      {
        q: 'Tôi ở Chung cư Homyland Riverside đường Nguyễn Duy Trinh có giao lên tận bếp không?',
        a: 'Kỹ thuật viên Ngọc Gas giao gas tận kệ bếp căn hộ Chung cư Homyland, ParcSpring, La Astoria, hỗ trợ cân đối chứng điện tử và kiểm tra rò rỉ bọt xà phòng miễn phí.'
      },
      {
        q: 'KĐT Lakeview City và Palm City đổi gas trong bao lâu?',
        a: 'Ngọc Gas có trạm giao vận chốt tại trục Song Hành Cao Tốc - Đỗ Xuân Hợp, cam kết kỹ thuật viên có mặt tận nhà quý khách chỉ sau 10 đến 15 phút.'
      },
      {
        q: 'Tôi muốn dùng bình gas van chụp Compact ngắt tự động có sẵn không?',
        a: 'Ngọc Gas luôn có sẵn bình van chụp Compact tự ngắt của Luxen Gas và Sopet Gas One đủ 4 màu sắc, an toàn tuyệt đối cho gia đình.'
      },
      {
        q: 'Xem giá đổi bình gas Phường Bình Trưng hôm nay ở đâu?',
        a: 'Mời quý khách xem bảng giá cập nhật theo ngày tại <a href="/gia-gas-hom-nay" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">Bảng giá gas hôm nay</a> hoặc gọi hotline 1900 9396.'
      }
    ]
  },

  // 47. Phường Phước Long
  {
    id: 47,
    slug: 'giao-gas-phuong-phuoc-long',
    ward: 'Phường Phước Long',
    oldWards: 'Phước Long A và Phước Long B cũ của TP. Thủ Đức',
    title: 'Đổi Bình Gas Phường Phước Long Mới — Ga Metro Rạch Chiếc & Đỗ Xuân Hợp',
    summary: 'Đại lý đổi bình gas Phường Phước Long mới (sáp nhập Phước Long A và Phước Long B - TP. Thủ Đức). Cung cấp Sopet Gas One, Luxen Gas, Phoenix Gas đủ vỏ xám, đỏ, xanh, vàng. Giao hỏa tốc 15 phút Ga Metro Rạch Chiếc, Ga Metro Phước Long, KDC Nam Long, Kiến Á, đường Đỗ Xuân Hợp, Dương Đình Hội, Tây Hòa, Flora Fuji. Cân đủ 12kg tại bếp. Hotline 1900 9396.',
    streets: 'đường Đỗ Xuân Hợp, Dương Đình Hội, Tây Hòa, Nam Hòa, Tăng Nhơn Phú, Xa Lộ Hà Nội, Thủy Lợi',
    landmarks: 'Ga Metro số 1 Rạch Chiếc, Ga Metro Phước Long, KDC Nam Long, KDC Kiến Á, Chợ Phước Long, Chung cư Flora Fuji, Flora Kikyo, EHome 1-2, Lucky Dragon',
    painPoints: [
      'Nỗi sợ đổi phải bình gas rút ruột từ các tờ rơi dán tường: Khu dân cư đông đúc đường Đỗ Xuân Hợp, Dương Đình Hội thường bị dán tờ rơi giả mạo đại lý uy tín.',
      'Hiểm họa rò rỉ khí gas trong các căn hộ chung cư cao tầng: Cư dân Flora Fuji, EHome rất sợ xì gas trong phòng kín điều hòa.',
      'Khí gas đỏ lửa làm đen đáy nồi inox và hao gas: Nấu nướng bằng gas bẩn làm đen nồi và tăng chi phí tiền gas hàng tháng.',
      'Chuột bọ cắn phá dây dẫn gas trong tủ bếp: Dây dẫn cao su mềm dễ bị chuột gặm nhấm thủng lỗ kim gây rò rỉ âm ỉ.',
      'Kẹt xe đường Đỗ Xuân Hợp giờ cao điểm khiến đại lý giao trễ: Khách hàng phải chờ đợi lâu giữa lúc đang nấu dở bữa cơm.'
    ],
    faqs: [
      {
        q: 'Chung cư Flora Fuji / Flora Kikyo đường Đỗ Xuân Hợp có giao lên tận căn hộ không?',
        a: 'Kỹ thuật viên Ngọc Gas giao tận kệ bếp căn hộ Chung cư Flora Fuji, EHome, hỗ trợ cân đối chứng điện tử và kiểm tra rò rỉ bọt xà phòng hoàn toàn miễn phí.'
      },
      {
        q: 'KDC Nam Long và Kiến Á đổi gas trong bao lâu thì có?',
        a: 'Ngọc Gas có trạm giao vận chốt ngay trục Đỗ Xuân Hợp - Dương Đình Hội, cam kết kỹ thuật viên có mặt tận nhà quý khách chỉ sau 10 đến 15 phút.'
      },
      {
        q: 'Tôi dùng bình gas màu đỏ có đổi sang Sopet Gas One vỏ xám được không?',
        a: 'Được 100%! Ngọc Gas hỗ trợ đổi ngang vỏ miễn phí giữa mọi thương hiệu và màu sắc bình gas mà không thu cọc.'
      },
      {
        q: 'Giá đổi bình gas tại Phường Phước Long hôm nay bao nhiêu?',
        a: 'Quý khách vui lòng tra cứu trực tiếp tại <a href="/gia-gas-hom-nay" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">Bảng giá gas hôm nay</a> hoặc gọi hotline 1900 9396.'
      }
    ]
  },

  // 48. Phường An Khánh
  {
    id: 48,
    slug: 'giao-gas-phuong-an-khanh',
    ward: 'Phường An Khánh',
    oldWards: 'Thảo Điền, An Phú, An Khánh, An Lợi Đông và Thủ Thiêm cũ của TP. Thủ Đức',
    title: 'Đổi Bình Gas Phường An Khánh Mới — KĐT Sala, Masteri Thảo Điền & Thủ Thiêm',
    summary: 'Đại lý đổi bình gas Phường An Khánh mới (sáp nhập Thảo Điền, An Phú, An Khánh, An Lợi Đông, Thủ Thiêm - TP. Thủ Đức). Phân phối Sopet Gas One, Luxen Gas, Phoenix Gas đủ vỏ xám, đỏ, xanh, vàng. Giao hỏa tốc 15 phút KĐT Sala Đại Quang Minh, Masteri Thảo Điền, The Metropole Thủ Thiêm, Mai Chí Thọ, Trần Não, Xuân Thủy. Cân đủ 12kg tại bếp. Hotline 1900 9396.',
    streets: 'đường Mai Chí Thọ, Xa Lộ Hà Nội, Nguyễn Văn Hưởng, Xuân Thủy, Thảo Điền, Lương Định Của, Trần Não, Nguyễn Cơ Thạch, Cầu Ba Son',
    landmarks: 'Đại đô thị tài chính quốc tế Thủ Thiêm, KĐT Sala Đại Quang Minh, Khu phố nhà giàu Thảo Điền, Masteri Thảo Điền, The Metropole Thủ Thiêm, Empire City 88 tầng, The River Thủ Thiêm',
    painPoints: [
      'Cư dân chuyên gia quốc tế và giới thượng lưu yêu cầu chuẩn mực an toàn PCCC khắt khe nhất: Đòi hỏi bình gas mới đẹp, van ngắt tự động đạt chuẩn quốc tế và thợ phục vụ văn minh.',
      'Thợ giao gas cẩu thả đi giày bẩn, làm trầy xước sàn gỗ và đá hoa cương cao cấp: Đây là nỗi lo lớn nhất của cư dân các căn hộ hạng sang tại Sala, Thảo Điền.',
      'Khí gas đỏ lửa làm ám muội đen kịt các bộ nồi chảo gang và inox đắt tiền nhập khẩu từ Đức, Nhật.',
      'Nỗi sợ rò rỉ khí gas trong các căn hộ penthouse và duplex khép kín điều hòa trung tâm: Nguy cơ ngạt khí hoặc cháy nổ đặc biệt nghiêm trọng.',
      'Nhiều đại lý bình dân không đủ điều kiện an ninh để bảo vệ tòa nhà cho phép lên sảnh căn hộ: Gây gián đoạn và phiền hà cho cư dân.'
    ],
    faqs: [
      {
        q: 'Tôi ở Chung cư Sala Sarimi / Sarina đường Nguyễn Cơ Thạch giao gas thế nào?',
        a: 'Kỹ thuật viên Ngọc Gas xuất trình thẻ nhân viên hợp lệ tại quầy lễ tân, mang bọc giày vải chuyên dụng, giao tận bếp căn hộ, cân điện tử kiểm định và kiểm tra máy dò gas chuyên dụng an toàn tuyệt đối.'
      },
      {
        q: 'Khu biệt thự Thảo Điền đường Nguyễn Văn Hưởng có giao gas nhanh không?',
        a: 'Ngọc Gas có đội ngũ kỹ thuật viên thường trực tại Thảo Điền và Trần Não, cam kết có mặt tận nhà quý khách chỉ sau 10 đến 15 phút.'
      },
      {
        q: 'Bình gas Sopet Gas One vỏ xám Nhật Bản có đáp ứng tiêu chuẩn an toàn cho căn hộ cao cấp không?',
        a: 'Sopet Gas One đạt chuẩn JIS G3116 Nhật Bản, kết hợp van điều áp Katsura cao cấp tự ngắt khi có sự cố, là lựa chọn số 1 của cộng đồng cư dân quốc tế tại An Khánh.'
      },
      {
        q: 'Giá bình gas hôm nay tại Phường An Khánh cập nhật ở đâu?',
        a: 'Mời quý khách tra cứu trực tiếp tại <a href="/gia-gas-hom-nay" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">Bảng giá gas hôm nay</a> hoặc gọi hotline 1900 9396.'
      }
    ]
  }
];

function buildThuDucContent(item) {
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
  Theo Nghị quyết số 1685/NQ-UBTVQH15 của Ủy ban Thường vụ Quốc hội về sắp xếp các đơn vị hành chính tại TP. Hồ Chí Minh, <strong>${item.ward}</strong> được thành lập dựa trên việc sáp nhập <strong>${item.oldWards}</strong>. Địa bàn mới sở hữu vị thế kinh tế - đô thị chiến lược của TP. Thủ Đức, kết nối trực tiếp các trục đường huyết mạch như <em>${item.streets}</em>, đồng thời là nơi tọa lạc của các địa danh trọng điểm: <em>${item.landmarks}</em>.
</p>
<p>
  Qua quá trình đồng hành và phục vụ hàng ngàn hộ gia đình, khu đô thị hiện đại và nhà hàng ẩm thực tại ${item.ward}, Ngọc Gas thấu hiểu sâu sắc <strong>5 nỗi lo lớn nhất</strong> mà người tiêu dùng thường xuyên gặp phải khi gọi gas:
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
  const generatedArticles = thuDucData.map(item => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    summary: item.summary,
    imageUrl: banners[item.slug],
    is_published: 0,
    content: buildThuDucContent(item)
  }));

  // Gộp cả Tam Bình (ID 38) giữ nguyên bài chuyên sâu vào đúng vị trí
  const all12Articles = [
    generatedArticles[0], // ID 37: Hiệp Bình
    tamBinhArticle,       // ID 38: Tam Bình (deep article 2,655 words)
    ...generatedArticles.slice(1) // ID 39 - 48
  ];

  const fileContent = `import fs from 'fs';
import path from 'path';

const banners = JSON.parse(fs.readFileSync(path.resolve('scratch/28_new_wards_banner_urls.json'), 'utf8'));

export const thuDucArticles = ${JSON.stringify(all12Articles, null, 2)};
`;

  fs.writeFileSync(path.resolve('scripts/new-wards/cluster-thu-duc.mjs'), fileContent, 'utf8');
  console.log('✅ Đã tái tạo thành công cluster-thu-duc.mjs với trọn vẹn 12 bài viết chuyên sâu chuẩn 9 trụ cột!');
}

run();
