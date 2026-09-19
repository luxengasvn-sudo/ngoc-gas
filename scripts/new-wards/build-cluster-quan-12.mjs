import fs from 'fs';
import path from 'path';
import { generateTechTable, generateBrandSection, generateTroubleshootingSection, banners } from './content-helpers.mjs';

const quan12Data = [
  {
    id: 32,
    slug: 'giao-gas-phuong-dong-hung-thuan',
    ward: 'Phường Đông Hưng Thuận',
    oldWards: 'Tân Thới Nhất, Tân Hưng Thuận và Đông Hưng Thuận cũ của Quận 12',
    title: 'Đổi Bình Gas Phường Đông Hưng Thuận (Quận 12 Mới) — KDC An Sương & Ga Metro Tham Lương',
    summary: 'Đại lý đổi bình gas Phường Đông Hưng Thuận mới (sáp nhập Tân Thới Nhất, Tân Hưng Thuận, Đông Hưng Thuận - Quận 12). Cung ứng Sopet Gas One, Luxen Gas, Phoenix Gas đủ vỏ xám, đỏ, xanh, vàng. Giao hỏa tốc 15 phút KDC An Sương, Ga Metro Tham Lương, đường Nguyễn Văn Quá, Trường Chinh, Prosper Plaza, Tecco Green Nest. Cân đủ 12kg tại bếp. Hotline 1900 9396.',
    streets: 'đường Trường Chinh, Quốc Lộ 1A, Nguyễn Văn Quá, Phan Văn Hớn, Song Hành QL22, Đông Hưng Thuận 2, Đông Hưng Thuận 6, Tân Thới Nhất 8',
    landmarks: 'Khu đô thị kiểu mẫu An Sương (64ha), Ga Depot Metro số 2 Tham Lương, Cầu Tham Lương, Chợ Cầu, Chung cư Prosper Plaza, Tecco Green Nest, Topaz Home',
    painPoints: [
      'Nỗi sợ đổi phải bình gas rút ruột từ các xe ba gác dạo quanh ngã tư An Sương: Cửa ngõ bến xe An Sương tập trung nhiều đối tượng tiếp thị gas dởm, bình 12kg thực tế chỉ có 8.5kg - 9kg gas.',
      'Hiểm họa rò rỉ khí gas trong các căn hộ chung cư cao tầng: Hàng vạn cư dân tại Prosper Plaza, Topaz Home rất lo ngại việc xì gas âm ỉ trong phòng kín máy lạnh, gây nguy cơ ngạt khí hoặc cháy nổ.',
      'Khí gas lẫn cặn bùn parafin làm đen nồi inox và hao gas: Ngọn lửa đỏ quạch làm hỏng các bộ nồi niêu đắt tiền của các gia đình KDC An Sương và làm tăng 25% chi phí nhiên liệu.',
      'Chuột bọ cắn phá dây dẫn gas trong tủ bếp: Dây cao su mềm dễ bị chuột cống cắn thủng lỗ li ti, tạo điểm rò rỉ gas cực kỳ nguy hiểm mỗi khi bật bếp.',
      'Thợ giao gas chậm trễ vì kẹt xe nút giao Tham Lương - Trường Chinh: Vào giờ cao điểm nấu cơm chiều, khách hàng phải chờ đợi cả tiếng đồng hồ mòn mỏi.'
    ],
    faqs: [
      {
        q: 'Tôi ở Chung cư Prosper Plaza đường Phan Văn Hớn có giao lên tận căn hộ tầng 18 không?',
        a: 'Kỹ thuật viên Ngọc Gas luôn giao gas tận kệ bếp căn hộ tầng cao tại Prosper Plaza, Tecco Green Nest, hỗ trợ cân đối chứng điện tử và kiểm tra rò rỉ bọt xà phòng hoàn toàn miễn phí.'
      },
      {
        q: 'KDC An Sương đổi gas có được chọn bình vỏ xám Sopet Gas One van ngắt tự động không?',
        a: 'Ngọc Gas luôn có sẵn Sopet Gas One vỏ xám Nhật Bản, Luxen Gas và Phoenix Gas đủ 4 màu sắc, trang bị hệ van chụp ngắt gas tự động an toàn tuyệt đối cho nhà phố.'
      },
      {
        q: 'Nhà tôi ở hẻm sâu đường Nguyễn Văn Quá thường xuyên ngập nước mùa mưa thì kê bình gas thế nào?',
        a: 'Thợ Ngọc Gas tặng kèm hoặc hỗ trợ chân đế kê cao su chuyên dụng, giúp bình gas cách ly với nền ẩm ướt, chống rỉ sét chân đế bình.'
      },
      {
        q: 'Giá đổi bình gas tại Phường Đông Hưng Thuận hôm nay bao nhiêu?',
        a: 'Mời quý khách xem bảng giá cập nhật theo ngày tại <a href="/gia-gas-hom-nay" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">Bảng giá gas hôm nay</a> hoặc liên hệ hotline 1900 9396.'
      }
    ]
  },
  {
    id: 33,
    slug: 'giao-gas-phuong-trung-my-tay',
    ward: 'Phường Trung Mỹ Tây',
    oldWards: 'Trung Mỹ Tây và Tân Chánh Hiệp cũ của Quận 12',
    title: 'Đổi Bình Gas Phường Trung Mỹ Tây (Quận 12 Mới) — CV Phần Mềm Quang Trung & Tô Ký',
    summary: 'Đại lý đổi bình gas Phường Trung Mỹ Tây mới (sáp nhập Trung Mỹ Tây và Tân Chánh Hiệp - Quận 12). Phân phối Sopet Gas One, Luxen Gas, Phoenix Gas đủ vỏ xám, đỏ, xanh, vàng. Giao hỏa tốc 15 phút Công viên Phần mềm Quang Trung (QTSC), ĐH GTVT cơ sở 3, đường Tô Ký, Nguyễn Ảnh Thủ, Bệnh viện Quận 12, Chung cư Hưng Ngân. Cân đủ 12kg tại bếp. Hotline 1900 9396.',
    streets: 'đường Tô Ký, Nguyễn Ảnh Thủ, Quốc Lộ 1A, Quốc Lộ 22, Trung Mỹ Tây 13, Tân Chánh Hiệp 10, Tân Chánh Hiệp 21, Lâm Thị Hố',
    landmarks: 'Công viên Phần mềm Quang Trung (QTSC), Trường ĐH Giao thông Vận tải (cơ sở 3), Trường ĐH Hoa Sen, Bệnh viện Quận 12, Chợ Ba Bầu, Chung cư Hưng Ngân Garden',
    painPoints: [
      'Sinh viên và kỹ sư phần mềm lo ngại đổi phải bình gas giả, thiếu ký: Khu vực tập trung đông sinh viên ĐH GTVT, ĐH Hoa Sen và nhân viên QTSC thường bị tiếp thị bình gas lậu giá rẻ nhưng thiếu cân trầm trọng.',
      'Nguy cơ cháy nổ tại các khu nhà trọ chật hẹp đường Lâm Thị Hố: Phòng trọ khép kín, bình gas cũ rỉ sét, van lỏng lẻo tiềm ẩn hiểm họa khôn lường.',
      'Khí gas đỏ lửa làm ám muội đen kịt xoong chảo: Nấu nướng bằng gas pha tạp chất parafin làm hao tốn gas và phá hỏng đáy nồi chảo inox.',
      'Quán ăn, quán cà phê cơm trưa quanh QTSC bị hết gas đột ngột: Giờ phục vụ cao điểm trưa đông đúc, đại lý giao chậm làm gián đoạn việc bán hàng.',
      'Thợ giao gas không kiểm tra an toàn sau khi lắp đặt: Thay bình xong lấy tiền vội vã, không kiểm tra bọt xà phòng hay hướng dẫn phòng ngừa rò rỉ khí gas.'
    ],
    faqs: [
      {
        q: 'Nhân viên và kỹ sư làm việc tại QTSC hoặc sinh viên ở trọ đường Tô Ký có được giao tận phòng không?',
        a: 'Có! Ngọc Gas giao tận kệ bếp văn phòng, căn hộ hoặc phòng trọ sinh viên, hỗ trợ cân đối chứng điện tử đủ 12.0kg gas và kiểm tra an toàn miễn phí.'
      },
      {
        q: 'Tôi ở Chung cư Hưng Ngân Garden đường Tân Chánh Hiệp 21 có giao lên tầng cao không?',
        a: 'Thợ Ngọc Gas giao gas tận cửa căn hộ Chung cư Hưng Ngân và Thái An Apartment, tháo dép lịch sự và kiểm tra rò rỉ bọt xà phòng kỹ lưỡng.'
      },
      {
        q: 'Làm sao nhận biết bình gas chính hãng nạp đủ 12kg?',
        a: 'Bình gas Ngọc Gas có màng co nhiệt niêm phong, tem chống giả công nghệ nước. Quý khách lấy tổng cân nặng trừ đi trọng lượng vỏ dập trên quai xách (12.5 - 14kg) luôn đạt đúng 12kg gas.'
      },
      {
        q: 'Giá bình gas 12kg hôm nay tại Phường Trung Mỹ Tây là bao nhiêu?',
        a: 'Quý khách vui lòng tra cứu trực tiếp tại <a href="/gia-gas-hom-nay" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">Bảng giá gas hôm nay</a> để có giá niêm yết chính xác nhất.'
      }
    ]
  },
  {
    id: 34,
    slug: 'giao-gas-phuong-tan-thoi-hiep',
    ward: 'Phường Tân Thới Hiệp',
    oldWards: 'Tân Thới Hiệp và Hiệp Thành cũ của Quận 12',
    title: 'Đổi Bình Gas Phường Tân Thới Hiệp (Quận 12 Mới) — KCN Tân Thới Hiệp & Hiệp Thành City',
    summary: 'Đại lý đổi bình gas Phường Tân Thới Hiệp mới (sáp nhập Tân Thới Hiệp và Hiệp Thành - Quận 12). Cung cấp Sopet Gas One, Luxen Gas, Phoenix Gas đủ vỏ xám, đỏ, xanh, vàng. Giao hỏa tốc 15 phút KCN Tân Thới Hiệp, KDC Hiệp Thành City, UBND Quận 12, Lê Văn Khương, Nguyễn Thị Búp, Hương Lộ 80B, Chung cư Võ Đình. Cân đủ 12kg tại bếp. Hotline 1900 9396.',
    streets: 'đường Lê Văn Khương, Nguyễn Thị Búp, Hương Lộ 80B, Dương Thị Mười, Tân Thới Hiệp 07, Tân Thới Hiệp 21, Hiệp Thành 13, Nguyễn Ảnh Thủ',
    landmarks: 'Khu công nghiệp Tân Thới Hiệp, Trung tâm Hành chính UBND Quận 12, Khu đô thị Hiệp Thành City, Chợ Hiệp Thành, Chợ Hạt Điều, Chung cư Võ Đình',
    painPoints: [
      'Công nhân xóm trọ và hộ gia đình lo ngại bình gas sang chiết lậu: Khu vực quanh KCN Tân Thới Hiệp có nhiều điểm sang chiết trái phép, bình 12kg bị rút ruột còn 8kg - 9kg.',
      'Ngọn lửa đỏ phè phè bốc khói đen kịt đáy xoong chảo: Khí gas bẩn pha lẫn nước và cặn nặng làm đen thui đáy nồi inox, hao gas gấp rưỡi so với gas chuẩn.',
      'Hiểm họa rò rỉ khí gas trong các khu dân cư đông đúc: Hẻm đường Lê Văn Khương, Nguyễn Thị Búp sâu và chật hẹp, rò rỉ khí gas trong nhà ống rất nguy hiểm.',
      'Bình gas cũ rỉ sét, van kẹt khó khóa mở: Vỏ bình quá hạn kiểm định trôi nổi trên thị trường, tiềm ẩn nguy cơ bục thủng mối hàn chịu lực.',
      'Thợ giao gas chậm trễ giờ nấu cơm: Gọi gas buổi chiều tan ca công nhân thường bị trễ hẹn do đại lý không đủ nhân lực điều phối.'
    ],
    faqs: [
      {
        q: 'KDC Hiệp Thành City và Chung cư Võ Đình đổi gas trong bao lâu thì có?',
        a: 'Ngọc Gas có trạm giao vận chốt tại trục Lê Văn Khương - Nguyễn Thị Búp, cam kết kỹ thuật viên giao hỏa tốc đến tận căn hộ chỉ trong 10 đến 15 phút.'
      },
      {
        q: 'Nhà tôi dùng bếp gas công nghiệp cho bếp ăn công nhân KCN có lắp bình 45kg không?',
        a: 'Có! Ngọc Gas chuyên cung cấp và thi công hệ thống giàn bình gas công nghiệp 45kg Luxen kèm van ngắt tự động đạt chuẩn PCCC cho doanh nghiệp và quán ăn.'
      },
      {
        q: 'Tôi đang dùng bình gas màu đỏ có đổi sang bình Sopet Gas One vỏ xám được không?',
        a: 'Được 100%! Ngọc Gas hỗ trợ đổi ngang vỏ miễn phí giữa các màu xám, đỏ, xanh, vàng của mọi thương hiệu mà không phát sinh bất kỳ khoản cọc nào.'
      },
      {
        q: 'Giá gas Phường Tân Thới Hiệp hôm nay cập nhật ở đâu?',
        a: 'Mời quý khách tra cứu trực tiếp tại <a href="/gia-gas-hom-nay" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">Bảng giá gas hôm nay</a> hoặc gọi hotline 1900 9396.'
      }
    ]
  },
  {
    id: 35,
    slug: 'giao-gas-phuong-thoi-an',
    ward: 'Phường Thới An',
    oldWards: 'Thới An và Thạnh Xuân cũ của Quận 12',
    title: 'Đổi Bình Gas Phường Thới An (Quận 12 Mới) — Lê Thị Riêng & Ven Sông Vàm Thuật',
    summary: 'Đại lý đổi bình gas Phường Thới An mới (sáp nhập Thới An và Thạnh Xuân - Quận 12). Phân phối Sopet Gas One, Luxen Gas, Phoenix Gas đủ vỏ xám, đỏ, xanh, vàng. Giao hỏa tốc 15 phút đường Lê Thị Riêng, Hà Huy Giáp, Quốc Lộ 1A, Tô Ngọc Vân Q12, Chung cư Zen Tower, Chợ Thới An, Bến xe buýt Thới An. Cân đủ 12kg tại bếp. Hotline 1900 9396.',
    streets: 'đường Lê Thị Riêng, Hà Huy Giáp, Quốc Lộ 1A, Tô Ngọc Vân (Quận 12), Thạnh Xuân 25, Thạnh Xuân 13, Thới An 16, Thới An 19',
    landmarks: 'Trục trung tâm hành chính đường Lê Thị Riêng, Bến xe buýt Thới An, Cầu Ba Thôn, Chợ Thới An, Chợ Thạnh Xuân, Chung cư Zen Tower',
    painPoints: [
      'Địa bàn rộng lớn ven sông Vàm Thuật khiến nhiều đại lý ngại giao xa: Các khu dân cư mới đường Thạnh Xuân 25, Thới An 16 thường bị giao trễ 45 phút - 1 tiếng.',
      'Khí hậu ven sông ẩm ướt làm đáy bình gas rỉ sét mục chân đế: Hơi ẩm bốc lên từ sông rạch làm vỏ bình kim loại nhanh bị ăn mòn, gây nguy cơ rò rỉ khí gas đáy bình.',
      'Nỗi sợ đổi phải bình gas rút ruột từ các tờ rơi dán cột điện: Nhiều gia đình bị lừa bởi các cơ sở không phép, bình 12kg chỉ đun được hơn 1 tháng đã cạn.',
      'Ngọn lửa đỏ phè phè ám muội đen kịt đáy nồi: Khí gas bẩn pha tạp chất parafin làm hao tốn nhiên liệu và làm đen nhám xoong chảo inox.',
      'Thợ giao gas không kiểm tra an toàn van khóa: Thay bình qua loa, không thử bọt xà phòng hay hướng dẫn quy trình phòng chống cháy nổ cho người dân.'
    ],
    faqs: [
      {
        q: 'Nhà tôi ở sâu trong đường Thạnh Xuân 25 gần sông Vàm Thuật có giao gas nhanh không?',
        a: 'Kỹ thuật viên Ngọc Gas thông thạo toàn bộ ngõ hẻm Thạnh Xuân và Thới An, cam kết có mặt tận nhà quý khách chỉ sau 10 đến 15 phút kể từ khi tiếp nhận cuộc gọi.'
      },
      {
        q: 'Chung cư Zen Tower đường Quốc Lộ 1A có hỗ trợ giao lên tận tầng 16 không?',
        a: 'Có! Thợ Ngọc Gas mang bình vào tận kệ bếp căn hộ Chung cư Zen Tower, thực hiện cân đối chứng điện tử và kiểm tra rò rỉ bọt xà phòng hoàn toàn miễn phí.'
      },
      {
        q: 'Tôi muốn dùng bình gas van chụp tự ngắt có an toàn hơn van ngang không?',
        a: 'Van chụp Compact có tính năng tự động ngắt gas khi phát hiện tụt áp đột ngột (như đứt dây dẫn), rất phù hợp cho các gia đình có trẻ nhỏ và người cao tuổi.'
      },
      {
        q: 'Giá đổi bình gas tại Phường Thới An hôm nay là bao nhiêu?',
        a: 'Quý khách vui lòng tra cứu trực tiếp tại <a href="/gia-gas-hom-nay" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">Bảng giá gas hôm nay</a> để có thông tin giá niêm yết chính xác nhất.'
      }
    ]
  },
  {
    id: 36,
    slug: 'giao-gas-phuong-an-phu-dong',
    ward: 'Phường An Phú Đông',
    oldWards: 'Thạnh Lộc và An Phú Đông cũ của Quận 12',
    title: 'Đổi Bình Gas Phường An Phú Đông (Quận 12 Mới) — Bán Đảo Sông Sài Gòn & Tu Viện Khánh An',
    summary: 'Đại lý đổi bình gas Phường An Phú Đông mới (sáp nhập Thạnh Lộc và An Phú Đông - Quận 12). Cung cấp Sopet Gas One, Luxen Gas, Phoenix Gas đủ vỏ xám, đỏ, xanh, vàng. Giao hỏa tốc 15 phút Vườn Lài, Hà Huy Giáp, Quốc Lộ 1A, Cầu sắt An Phú Đông, Tu viện Khánh An, ĐH Nguyễn Tất Thành, KDC Senturia. Cân đủ 12kg tại bếp. Hotline 1900 9396.',
    streets: 'đường Vườn Lài, Hà Huy Giáp, Quốc Lộ 1A, An Phú Đông 03, An Phú Đông 09, An Phú Đông 25, Thạnh Lộc 15, Thạnh Lộc 19, Thạnh Lộc 29',
    landmarks: 'Bán đảo xanh An Phú Đông ven sông Sài Gòn, Cầu sắt An Phú Đông nối Gò Vấp, Tu viện Khánh An nổi tiếng, Trường ĐH Nguyễn Tất Thành (cơ sở Q12), KDC Senturia Vườn Lài',
    painPoints: [
      'Địa hình bán đảo ba bề sông nước, hẻm bờ bao ngoằn ngoèo khiến đại lý giao chậm: Khu vực Vườn Lài, An Phú Đông thường bị các đại lý ngoài phường từ chối hoặc hẹn giao rất lâu.',
      'Nỗi ám ảnh bình gas thiếu ký, rút ruột từ các ghe thuyền sang chiết lậu ven sông: Lợi dụng địa hình sông nước, một số điểm sang chiết gas lậu tuồn bình thiếu 2 - 3kg vào khu dân cư.',
      'Khí gas ẩm lẫn tạp chất làm lửa đỏ quạch và đen nồi: Đun nấu hao gas, khói khét ám mùi khó chịu trong không gian nhà bếp.',
      'Độ ẩm ven sông cao dễ làm rỉ sét mục chân đế bình gas: Đặt bình gas sát mặt đất ẩm ướt dễ gây ăn mòn kim loại, nguy cơ bục thủng đáy bình.',
      'Thợ giao gas chạy xe phóng nhanh vượt ẩu trên đường đê hẹp: Thiếu cẩn trọng gây mất an toàn cho người dân trên các tuyến đường đê bao nhỏ.'
    ],
    faqs: [
      {
        q: 'Nhà tôi ở khu biệt thự Senturia Vườn Lài có giao gas nhanh và thợ lịch sự không?',
        a: 'Kỹ thuật viên Ngọc Gas phục vụ chuẩn mực, mang bọc giày vải khi vào nhà, cân điện tử kiểm định trước mặt gia chủ và kiểm tra hệ thống bếp an toàn tuyệt đối.'
      },
      {
        q: 'Sinh viên ĐH Nguyễn Tất Thành đường Hà Huy Giáp đổi gas có được hỗ trợ gì không?',
        a: 'Ngọc Gas hỗ trợ sinh viên cân đối chứng đủ 12.0kg gas, kiểm tra bảo dưỡng bếp gas mini/bếp đôi miễn phí và cam kết không phát sinh bất kỳ phụ phí nào.'
      },
      {
        q: 'Bình gas chính hãng Ngọc Gas có bảo hiểm an toàn không?',
        a: 'Có! Toàn bộ bình gas phân phối bởi Ngọc Gas đều có bảo hiểm trách nhiệm sản phẩm theo đúng quy chuẩn an toàn PCCC và quy định hiện hành của pháp luật.'
      },
      {
        q: 'Xem giá đổi bình gas Phường An Phú Đông hôm nay ở đâu?',
        a: 'Quý khách vui lòng tra cứu trực tiếp tại <a href="/gia-gas-hom-nay" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">Bảng giá gas hôm nay</a> hoặc gọi hotline 1900 9396.'
      }
    ]
  }
];

function buildQuan12Content(item) {
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
  Theo Nghị quyết số 1685/NQ-UBTVQH15 của Ủy ban Thường vụ Quốc hội về sắp xếp các đơn vị hành chính tại TP. Hồ Chí Minh, <strong>${item.ward}</strong> được thành lập dựa trên việc sáp nhập <strong>${item.oldWards}</strong>. Địa bàn mới sở hữu vị thế cửa ngõ Tây Bắc sầm uất, kết nối trực tiếp các trục đường huyết mạch như <em>${item.streets}</em>, đồng thời là nơi tọa lạc của các địa danh trọng điểm: <em>${item.landmarks}</em>.
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
  const articles = quan12Data.map(item => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    summary: item.summary,
    imageUrl: banners[item.slug],
    is_published: 0,
    content: buildQuan12Content(item)
  }));

  const fileContent = `import fs from 'fs';
import path from 'path';

const banners = JSON.parse(fs.readFileSync(path.resolve('scratch/28_new_wards_banner_urls.json'), 'utf8'));

export const quan12Articles = ${JSON.stringify(articles, null, 2)};
`;

  fs.writeFileSync(path.resolve('scripts/new-wards/cluster-quan-12.mjs'), fileContent, 'utf8');
  console.log('✅ Đã tái tạo thành công cluster-quan-12.mjs với 5 bài viết chuyên sâu chuẩn 9 trụ cột!');
}

run();
