import fs from 'fs';
import path from 'path';
import { generateTechTable, generateBrandSection, generateTroubleshootingSection, banners } from './content-helpers.mjs';

const goVapData = [
  {
    id: 26,
    slug: 'giao-gas-phuong-hanh-thong',
    ward: 'Phường Hạnh Thông',
    oldWards: 'Phường 1 và Phường 3 cũ của quận Gò Vấp',
    title: 'Đổi Bình Gas Phường Hạnh Thông (Gò Vấp Mới) — Cửa Ngõ Sân Bay & Bệnh Viện Quân Y 175',
    summary: 'Đại lý đổi bình gas Phường Hạnh Thông mới (sáp nhập Phường 1 và Phường 3 - Gò Vấp). Phân phối Sopet Gas One, Luxen Gas, Phoenix Gas đủ vỏ xám, đỏ, xanh, vàng. Giao hỏa tốc 15 phút Công viên Gia Định, Bệnh viện Quân Y 175, Lê Quang Định, Phạm Văn Đồng, Bạch Đằng, Nguyễn Văn Công. Cân đủ 12kg tại bếp. Hotline 1900 9396.',
    streets: 'đường Lê Quang Định, Phạm Văn Đồng, Bạch Đằng, Nguyễn Văn Công, Hoàng Minh Giám, Nguyễn Kiệm, Thích Bửu Đăng, Thiên Hộ Dương, Nguyễn Thái Sơn',
    landmarks: 'Công viên Gia Định, Bệnh viện Quân Y 175, Cư xá Sĩ quan quân đội, Cửa ngõ sân bay Tân Sơn Nhất, Chung cư Hà Đô Green View',
    painPoints: [
      'Nỗi sợ đại lý nhỏ lẻ giao bình thiếu ký, rút ruột khí gas: Khu dân cư đông đúc gần sân bay thường bị các cơ sở sang chiết trái phép tiếp thị bình gas giá rẻ nhưng bên trong chỉ có 9kg gas, đun rất nhanh cạn.',
      'Khí gas lẫn tạp chất làm đen đáy nồi inox: Nấu nướng bằng gas kém chất lượng khiến ngọn lửa đỏ rực, bám một lớp muội than dày đặc dưới đáy nồi chảo cao cấp, gây mất thẩm mỹ và hao tốn gas.',
      'Hiểm họa rò rỉ khí gas trong khu phố nhà ống san sát: Khu vực hẻm đường Lê Quang Định, Nguyễn Văn Công có mật độ nhà ống dày đặc, khí gas rò rỉ không thoát được dễ tích tụ gây nguy cơ hỏa hoạn.',
      'Chuột bọ cắn phá đường ống dẫn gas ngầm trong tủ bếp: Dây dẫn cao su thông thường dễ bị chuột gặm nhấm thủng lỗ kim, tạo ra sự cố rò rỉ âm ỉ cực kỳ nguy hiểm.',
      'Thợ giao gas thiếu lịch sự, đi giày bẩn vào nhà: Cư dân cán bộ công chức, hưu trí tại khu cư xá 175 rất chú trọng vệ sinh nhà cửa, thợ giao gas cẩu thả đi dép bẩn làm dơ sàn gỗ phòng khách.'
    ],
    faqs: [
      {
        q: 'Khu cư xá sĩ quan quân đội đường Nguyễn Văn Công thợ giao gas có đảm bảo yên tĩnh không?',
        a: 'Kỹ thuật viên Ngọc Gas được đào tạo tác phong văn minh, di chuyển xe nhẹ nhàng, mang bọc giày vải trước khi vào nhà, kiểm tra an toàn chu đáo và không gây ồn ào giờ nghỉ ngơi của khu dân cư.'
      },
      {
        q: 'Nhà tôi ở hẻm sâu đường Thích Bửu Đăng xe máy có vào giao tận bếp được không?',
        a: 'Toàn bộ thợ giao gas Ngọc Gas thông thạo từng ngõ hẻm tại Hạnh Thông, trang bị giá chở gas thon gọn luồn lách dễ dàng và hỗ trợ bê vác đặt lên tận kệ bếp nhà bạn hoàn toàn miễn phí.'
      },
      {
        q: 'Giá đổi bình gas tại Phường Hạnh Thông hôm nay là bao nhiêu?',
        a: 'Giá gas được cập nhật công khai hàng tháng theo chuẩn thị trường năng lượng. Quý khách vui lòng tra cứu trực tiếp tại <a href="/gia-gas-hom-nay" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">Bảng giá gas hôm nay</a> hoặc gọi hotline 1900 9396 để nhận ưu đãi mới nhất.'
      },
      {
        q: 'Tôi dùng bếp từ kết hợp bếp gas đôi, có hỗ trợ kiểm tra an toàn định kỳ không?',
        a: 'Có! Mỗi lần đổi gas, kỹ thuật viên Ngọc Gas đều dùng bọt thử kín kiểm tra toàn bộ van điều áp, cổ bình và đường dây dẫn gas miễn phí 100% cho gia đình bạn.'
      }
    ]
  },
  {
    id: 27,
    slug: 'giao-gas-phuong-an-nhon',
    ward: 'Phường An Nhơn',
    oldWards: 'Phường 5 và Phường 6 cũ của quận Gò Vấp',
    title: 'Đổi Bình Gas Phường An Nhơn (Gò Vấp Mới) — ĐH Công Nghiệp IUH & Chợ An Nhơn',
    summary: 'Đại lý đổi bình gas Phường An Nhơn mới (sáp nhập Phường 5 và Phường 6 - Gò Vấp). Cung ứng Sopet Gas One, Luxen Gas, Phoenix Gas đủ vỏ xám, đỏ, xanh, vàng. Giao nhanh 15 phút ĐH Công Nghiệp IUH, Chợ An Nhơn, Dương Quảng Hàm, Nguyễn Thái Sơn, Lê Đức Thọ, Trần Bá Giao. Cân đủ 12kg, phục vụ sinh viên & quán ăn. Hotline 1900 9396.',
    streets: 'đường Nguyễn Thái Sơn, Dương Quảng Hàm, Lê Đức Thọ, Trần Bá Giao, Lương Ngọc Quyến, Nguyễn Bỉnh Khiêm, Lê Lợi, Nguyễn Xí nối dài',
    landmarks: 'Trường Đại học Công nghiệp TP.HCM (IUH), Chợ An Nhơn, Bờ kè Sông Bến Cát, KDC Cityland Park Hills giáp ranh, KDC An Nhơn',
    painPoints: [
      'Sinh viên và xóm trọ bị lừa đổi bình gas mini hoặc bình gas 12kg thiếu ký: Hơn 35.000 sinh viên trường IUH thường xuyên bị các tờ rơi dán tường dụ dỗ đổi gas giá rẻ, nhưng thực tế bị rút ruột chỉ còn 7 - 8kg gas.',
      'Nguy cơ cháy nổ kinh hoàng tại các dãy phòng trọ chật hẹp: Phòng trọ sinh viên và công nhân quanh đường Dương Quảng Hàm có diện tích nhỏ, thông gió kém, bình gas rỉ sét mục van cực kỳ nguy hiểm.',
      'Lửa đỏ làm muội than đen kịt đáy nồi sinh viên: Khí gas pha lẫn tạp chất parafin làm ngọn lửa đỏ quạch, cháy tốn gas và làm hỏng xoong chảo nấu ăn hàng ngày.',
      'Quán ăn, quán ốc, trà sữa đêm bị hết gas giữa chừng: Các trục đường ẩm thực sinh viên Nguyễn Thái Sơn, Lê Đức Thọ buôn bán tấp nập lúc chiều tối, hết gas đột ngột mà đại lý giao trễ làm mất khách.',
      'Bình gas cũ móp méo, van kẹt cứng khó khóa mở: Vỏ bình quá hạn kiểm định, van bị nhờn ren khiến người dùng lo sợ mỗi khi vặn núm bếp.'
    ],
    faqs: [
      {
        q: 'Sinh viên trường IUH ở trọ đường Dương Quảng Hàm đổi gas có được cân thử tại chỗ không?',
        a: 'Chắc chắn có! Thợ Ngọc Gas mang theo cân điện tử kiểm định, cân trực tiếp trước mắt bạn để đối chứng (tổng trọng lượng trừ vỏ = đủ 12.0kg gas), cam kết không thiếu dù chỉ 1 lạng.'
      },
      {
        q: 'Nhà trọ tôi ở lầu 3 không có thang máy thợ có vác lên tận phòng không?',
        a: 'Kỹ thuật viên Ngọc Gas hỗ trợ vác gas lên tận lầu 3, lầu 4 các dãy nhà trọ và lắp đặt, thử kín hoàn toàn miễn phí, tuyệt đối không thu thêm bất kỳ phụ phí nào.'
      },
      {
        q: 'Làm sao để biết bình gas giao tới là hàng chính hãng?',
        a: 'Bình gas Ngọc Gas có màng co nhiệt niêm phong cổ van nguyên bản, tem chống giả công nghệ cao và quai xách dập nổi logo thương hiệu Sopet Gas One, Luxen Gas hoặc Phoenix Gas rõ nét.'
      },
      {
        q: 'Giá đổi bình gas sinh viên tại Phường An Nhơn hiện nay bao nhiêu?',
        a: 'Giá bán niêm yết minh bạch theo thị trường. Bạn có thể tra cứu trực tiếp tại <a href="/gia-gas-hom-nay" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">Bảng giá gas hôm nay</a> để cập nhật giá ưu đãi tốt nhất.'
      }
    ]
  },
  {
    id: 28,
    slug: 'giao-gas-phuong-go-vap',
    ward: 'Phường Gò Vấp',
    oldWards: 'Phường 4 và Phường 7 cũ của quận Gò Vấp',
    title: 'Đổi Bình Gas Phường Gò Vấp Mới — Chợ Gò Vấp, Căn Cứ 26 & Trục Nguyễn Oanh',
    summary: 'Đại lý đổi bình gas Phường Gò Vấp mới (sáp nhập Phường 4 và Phường 7 - Gò Vấp). Phân phối Sopet Gas One, Luxen Gas, Phoenix Gas đủ vỏ xám, đỏ, xanh, vàng. Giao hỏa tốc 15 phút Chợ Gò Vấp, KDC Căn Cứ 26, Nguyễn Oanh, Phan Văn Trị, Nguyễn Văn Nghi, Lê Thị Hồng, Ga Gò Vấp. Cân đủ 12kg, phục vụ 24/7. Hotline 1900 9396.',
    streets: 'đường Nguyễn Oanh, Nguyễn Văn Nghi, Lê Thị Hồng, Phan Văn Trị, Lý Thường Kiệt, Nguyễn Du, Trần Thị Nghỉ, Huỳnh Khương An, Lê Lợi',
    landmarks: 'Chợ Gò Vấp trăm năm tuổi, KDC Căn Cứ 26, Căn Cứ 17, Ngã sáu Gò Vấp, Ga đường sắt Gò Vấp, KDC Cityland Center Hills',
    painPoints: [
      'Ám ảnh kẹt xe ngã sáu Gò Vấp khiến đại lý giao hàng trễ cả tiếng đồng hồ: Trục Nguyễn Oanh, Phan Văn Trị giờ cao điểm ùn tắc kéo dài, các đại lý xa thường để khách chờ đợi mòn mỏi khi đang nấu dở bữa cơm.',
      'Tiểu thương Chợ Gò Vấp lo ngại gas thiếu ký, hao tổn chi phí: Các quán bún, phở, hủ tiếu quanh chợ nấu nước lèo liên tục, dùng phải bình gas sang chiết lậu khiến chi phí nhiên liệu đội lên 20 - 30%.',
      'Lửa đỏ phè phè bám muội than đen kịt xoong chảo: Khí gas bẩn pha lẫn nước và cặn parafin làm hỏng dụng cụ nấu nướng và gây ô nhiễm không gian nhà bếp.',
      'Bình gas rỉ sét đáy do khí hậu ẩm thấp: Khu vực gần tuyến đường sắt và các con hẻm trũng, bình gas kém chất lượng dễ bị rỉ mục đáy gây xì gas nguy hiểm.',
      'Thợ giao gas cẩu thả, không kiểm tra an toàn sau khi thay bình: Nhiều nơi chỉ gắn van rồi lấy tiền đi ngay, không thử bọt xà phòng hay hướng dẫn cách xử lý sự cố cho người cao tuổi.'
    ],
    faqs: [
      {
        q: 'Nhà tôi ở trong KDC Căn Cứ 26 gọi gas lúc 11h30 trưa có giao kịp nấu cơm không?',
        a: 'Ngọc Gas có trạm giao hàng cắm chốt ngay trục Nguyễn Oanh - Lê Thị Hồng, cam kết giao hỏa tốc chỉ trong 10 đến 15 phút, không để gián đoạn bữa cơm trưa của gia đình bạn.'
      },
      {
        q: 'Quán ăn quanh Chợ Gò Vấp dùng nhiều bình gas một tháng có chính sách ưu đãi không?',
        a: 'Có! Ngọc Gas cung cấp mức chiết khấu thương mại hấp dẫn cho các quán ăn, nhà hàng, đồng thời hỗ trợ bảo dưỡng định kỳ đầu đốt và cân đối chứng tại chỗ từng bình gas.'
      },
      {
        q: 'Tôi muốn đổi bình Sopet Gas One vỏ xám Nhật Bản thì có sẵn hàng không?',
        a: 'Ngọc Gas luôn có sẵn đầy đủ Sopet Gas One vỏ xám, Luxen Gas và Phoenix Gas đủ 4 màu (xám, đỏ, xanh, vàng) với cả hệ van ngang ren vặn và van chụp tự động ngắt.'
      },
      {
        q: 'Giá gas Phường Gò Vấp hôm nay cập nhật ở đâu?',
        a: 'Quý khách vui lòng tra cứu trực tiếp tại <a href="/gia-gas-hom-nay" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">Bảng giá gas hôm nay</a> để có thông tin giá niêm yết chính xác nhất.'
      }
    ]
  },
  {
    id: 29,
    slug: 'giao-gas-phuong-thong-tay-hoi',
    ward: 'Phường Thông Tây Hội',
    oldWards: 'Phường 8, 9 và 11 cũ của quận Gò Vấp',
    title: 'Đổi Bình Gas Phường Thông Tây Hội (Gò Vấp Mới) — Làng Hoa & Chợ Hạnh Thông Tây',
    summary: 'Đại lý đổi bình gas Phường Thông Tây Hội mới (sáp nhập Phường 8, 9 và 11 - Gò Vấp). Phân phối Sopet Gas One, Luxen Gas, Phoenix Gas đủ vỏ xám, đỏ, xanh, vàng. Giao hỏa tốc 15 phút Công viên Làng Hoa, Chợ đêm Hạnh Thông Tây, Quang Trung, Cây Trâm (Nguyễn Văn Khối), Lê Văn Thọ, Thống Nhất. Cân đủ 12kg tại bếp. Hotline 1900 9396.',
    streets: 'đường Quang Trung, Cây Trâm (Nguyễn Văn Khối), Lê Văn Thọ, Thống Nhất, Phạm Văn Chiêu, Đường số 8, Đường số 9, Đường số 10, Đường số 18',
    landmarks: 'Công viên Làng Hoa Gò Vấp, Chợ đêm Hạnh Thông Tây sầm uất, Di tích Đình Thông Tây Hội cổ kính, Chung cư Dream Home Luxury, Chung cư I-Home',
    painPoints: [
      'Chợ đêm Hạnh Thông Tây kinh doanh ẩm thực tấp nập, nỗi sợ hết gas lúc nửa đêm: Hàng trăm quầy đồ ăn vặt, trà sữa, xiên que hoạt động đến 23h - 24h đêm, hết gas không có ai giao kịp thời.',
      'Nỗi lo đổi phải bình gas rút ruột từ các tờ rơi dán cột điện: Khu vực dân cư Làng Hoa thường xuyên bị dán tờ rơi giả mạo đại lý uy tín, giao bình gas nhẹ hơn chuẩn từ 1.5kg đến 2.5kg.',
      'Ngọn lửa đỏ lòm làm đen nồi chảo inox đắt tiền: Khí gas bẩn pha tạp chất khiến ngọn lửa cháy phè phè, hao gas gấp rưỡi và ám muội than dày cộm.',
      'Nguy cơ cháy nổ tại các căn hộ chung cư cao tầng: Cư dân Chung cư Dream Home, I-Home đặc biệt lo ngại việc rò rỉ khí gas trong không gian kín điều hòa, đòi hỏi van ngắt tự động chuẩn xác.',
      'Thợ giao gas chạy ẩu, thô lỗ và làm xước sàn gạch men: Nhân viên giao gas cẩu thả kéo lê bình gas trên sàn nhà gây trầy xước và gây ồn ào khó chịu cho gia chủ.'
    ],
    faqs: [
      {
        q: 'Gian hàng ẩm thực tại Chợ đêm Hạnh Thông Tây gọi gas lúc 21h30 tối có giao không?',
        a: 'Ngọc Gas phục vụ liên tục đến tận đêm khuya cho các tiểu thương Chợ Hạnh Thông Tây, thợ giao gas có mặt sau 10 - 15 phút, cân đủ ký và lắp đặt an toàn tuyệt đối.'
      },
      {
        q: 'Tôi ở Chung cư Dream Home Luxury lầu cao có giao tận cửa căn hộ không?',
        a: 'Có! Thợ Ngọc Gas mang bình gas vào tận kệ bếp căn hộ chung cư, kiểm tra bọt xà phòng thử kín cổ van và dây dẫn hoàn toàn miễn phí, không thu thêm phí phụ thu thang máy.'
      },
      {
        q: 'Bình gas vỏ xám Sopet Gas One và vỏ xanh Luxen loại nào tiết kiệm hơn?',
        a: 'Cả hai dòng sản phẩm đều đạt tiêu chuẩn khí gas LPG tinh khiết với tỷ lệ nhiệt trị cao ~11.800 kcal/kg, cho ngọn lửa xanh chụm đáy nồi, tiết kiệm gas từ 15% - 20% so với gas trôi nổi.'
      },
      {
        q: 'Giá bình gas 12kg hôm nay tại Phường Thông Tây Hội là bao nhiêu?',
        a: 'Quý khách vui lòng kiểm tra tại <a href="/gia-gas-hom-nay" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">Bảng giá gas hôm nay</a> để có báo giá cập nhật theo ngày minh bạch nhất.'
      }
    ]
  },
  {
    id: 30,
    slug: 'giao-gas-phuong-an-hoi-tay',
    ward: 'Phường An Hội Tây',
    oldWards: 'Phường 12 và 14 cũ của quận Gò Vấp',
    title: 'Đổi Bình Gas Phường An Hội Tây (Gò Vấp Mới) — Chợ Cầu, Tân Sơn & Phan Huy Ích',
    summary: 'Đại lý đổi bình gas Phường An Hội Tây mới (sáp nhập Phường 12 và 14 - Gò Vấp). Phân phối Sopet Gas One, Luxen Gas, Phoenix Gas đủ vỏ xám, đỏ, xanh, vàng. Giao hỏa tốc 15 phút Chợ Cầu, Chợ Tân Sơn, Phan Huy Ích, Quang Trung, Bùi Quang Là, Huỳnh Văn Nghệ, Kênh Tham Lương. Cân đủ 12kg, chuẩn PCCC. Hotline 1900 9396.',
    streets: 'đường Quang Trung, Tân Sơn, Phan Huy Ích, Bùi Quang Là, Huỳnh Văn Nghệ, Nguyễn Tư Giản, Phạm Văn Chiêu, Cây Trâm',
    landmarks: 'Chợ Cầu giáp ranh Quận 12, Chợ Tân Sơn, Khu đô thị ven Kênh Tham Lương, Chung cư Khang Gia Gò Vấp, Chung cư Felix Homes',
    painPoints: [
      'Nỗi sợ gas thiếu ký từ các điểm sang chiết chui dọc Kênh Tham Lương: Khu vực giáp ranh Quận 12 và Tân Bình có nhiều điểm giao gas trôi nổi, bình 12kg chỉ có 8.5kg - 9kg khí gas thực tế.',
      'Nguy cơ cháy nổ tại các căn hộ chung cư đông đúc: Cư dân Chung cư Khang Gia, Felix Homes rất sợ hở van hoặc chuột cắn dây dẫn gas trong hộc bếp kín.',
      'Lửa đỏ phè phè, muội than làm bẩn gian bếp: Gas kém chất lượng khiến ngọn lửa đỏ quạch, cháy hao và ám đen đáy nồi xoong đắt tiền.',
      'Vỏ bình gas cũ rỉ sét, mục chân đế do khu vực trũng ngập: Hẻm Bùi Quang Là, Huỳnh Văn Nghệ thường xuyên ngập nước mùa mưa, bình gas để sát sàn dễ bị mục đáy rò rỉ khí gas.',
      'Thợ giao gas chậm trễ vì kẹt xe nút giao Chợ Cầu - Phan Huy Ích: Đang nấu dở bữa ăn mà gọi gas 45 phút chưa tới, gây bức xúc cho người nội trợ.'
    ],
    faqs: [
      {
        q: 'Chung cư Khang Gia Gò Vấp đường Phan Huy Ích có giao lên tận căn hộ tầng cao không?',
        a: 'Kỹ thuật viên Ngọc Gas giao gas tận cửa căn hộ Chung cư Khang Gia và Felix Homes, hỗ trợ cân đối chứng điện tử và kiểm tra rò rỉ gas bằng bọt xà phòng miễn phí.'
      },
      {
        q: 'Nhà tôi ở hẻm trũng hay ngập đường Bùi Quang Là thì nên kê bình gas thế nào?',
        a: 'Thợ Ngọc Gas luôn mang sẵn đế kê bình gas cao su hoặc nhựa chuyên dụng, giúp bình gas cách ly hoàn toàn với mặt sàn ẩm ướt, chống rỉ sét mục đáy bình tuyệt đối an toàn.'
      },
      {
        q: 'Làm sao phân biệt bình gas chính hãng với gas sang chiết lậu?',
        a: 'Bình gas chính hãng Ngọc Gas có màng co niêm phong nhiệt dập nổi thương hiệu, tem chống giả công nghệ nước, thân bình dập chìm hạn kiểm định và trọng lượng vỏ sắc nét.'
      },
      {
        q: 'Giá gas hôm nay tại Phường An Hội Tây bao nhiêu?',
        a: 'Mời quý khách xem bảng giá cập nhật niêm yết tại <a href="/gia-gas-hom-nay" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">Bảng giá gas hôm nay</a> hoặc gọi hotline 1900 9396.'
      }
    ]
  },
  {
    id: 31,
    slug: 'giao-gas-phuong-an-hoi-dong',
    ward: 'Phường An Hội Đông',
    oldWards: 'Phường 13, 15, 16 và 17 cũ của quận Gò Vấp',
    title: 'Đổi Bình Gas Phường An Hội Đông (Gò Vấp Mới) — Chợ Xóm Mới & Sông Vàm Thuật',
    summary: 'Đại lý đổi bình gas Phường An Hội Đông mới (sáp nhập Phường 13, 15, 16 và 17 - Gò Vấp). Phân phối Sopet Gas One, Luxen Gas, Phoenix Gas đủ vỏ xám, đỏ, xanh, vàng. Giao hỏa tốc 15 phút Chợ Xóm Mới, Chợ Thạch Đà, Lê Đức Thọ, Thống Nhất, Nguyễn Oanh, Bệnh viện Gò Vấp, Osimi Tower. Cân đủ 12kg tại bếp. Hotline 1900 9396.',
    streets: 'đường Lê Đức Thọ, Thống Nhất, Nguyễn Oanh, Lê Hoàng Phái, Nguyễn Văn Lượng, An Hội, Phạm Văn Chiêu, Dương Quảng Hàm',
    landmarks: 'Chợ Xóm Mới sầm uất, Chợ Thạch Đà, Bệnh viện Quận Gò Vấp mới, Bờ kè Sông Vàm Thuật, Chung cư Osimi Tower, Chung cư Gia Phát',
    painPoints: [
      'Địa bàn rộng lớn, hẻm sâu ngoằn ngoèo khiến đại lý giao hàng chậm trễ: Hợp nhất từ 4 phường cũ tạo nên dải đô thị rộng lớn, nhiều đại lý xa giao trễ 45 phút - 1 tiếng.',
      'Nỗi lo gas lậu rút ruột tràn lan tại các khu xóm đạo Xóm Mới: Nhiều cơ sở không có giấy phép sang chiết gas lậu chào giá rẻ, rút bớt 2kg - 3kg khí gas của bà con giáo dân.',
      'Lửa đỏ quạch ám muội than làm hư hại nồi niêu đắt tiền: Khí gas trôi nổi lẫn nhiều cặn tạp chất, ngọn lửa đỏ phè phè cản trở truyền nhiệt và làm đen đáy xoong nồi.',
      'Hiểm họa rò rỉ khí gas trong hẻm sâu khó thoát hiểm: Hẻm đường Lê Hoàng Phái, An Hội nhỏ hẹp, nhà cửa san sát, nếu xảy ra rò rỉ khí gas rất nguy hiểm cho cả khu phố.',
      'Vỏ bình rỉ sét, van kẹt khó thao tác: Bình gas trôi nổi sử dụng vỏ quá hạn kiểm định, van bị nhờn ren khiến người nội trợ bất an.'
    ],
    faqs: [
      {
        q: 'Nhà tôi ở hẻm sâu đường Lê Đức Thọ gần Chợ Xóm Mới giao gas trong bao lâu?',
        a: 'Ngọc Gas có trạm giao vận chốt tại trục Thống Nhất - Lê Đức Thọ, cam kết kỹ thuật viên luồn lách ngõ hẻm và có mặt tận nhà quý khách chỉ sau 10 đến 15 phút.'
      },
      {
        q: 'Tôi ở Chung cư Osimi Tower đường Lê Đức Thọ có mang lên tận tầng 12 không?',
        a: 'Có! Thợ Ngọc Gas mang bình vào tận bếp căn hộ Chung cư Osimi Tower, thực hiện cân đối chứng điện tử và kiểm tra rò rỉ bọt xà phòng hoàn toàn miễn phí.'
      },
      {
        q: 'Tôi đang dùng bình gas Total màu xám có đổi sang bình Sopet Gas One được không?',
        a: 'Hoàn toàn được! Ngọc Gas hỗ trợ đổi ngang vỏ miễn phí 100% cho mọi thương hiệu bình xám, đỏ, xanh, vàng mà không phải bù cọc hay trả thêm phí chuyển đổi.'
      },
      {
        q: 'Xem giá đổi bình gas Phường An Hội Đông hôm nay ở đâu?',
        a: 'Quý khách vui lòng tra cứu trực tiếp tại <a href="/gia-gas-hom-nay" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">Bảng giá gas hôm nay</a> để có thông tin giá niêm yết chính xác nhất.'
      }
    ]
  }
];

function buildGoVapContent(item) {
  const painPointsList = item.painPoints.map(p => `  <li>${p}</li>`).join('\n');
  const faqsHtml = item.faqs.map(f => `
<div class="faq-item" style="margin-bottom:16px;background:#F8FAFC;padding:16px 20px;border-radius:8px;border-left:4px solid #2563EB;">
  <h4 style="margin:0 0 8px 0;font-size:16px;color:#1E40AF;">${f.q}</h4>
  <p style="margin:0;color:#334155;line-height:1.6;"><strong>Trả lời:</strong> ${f.a}</p>
</div>`).join('\n');

  return `
<div class="quick-summary" style="background:#EFF6FF;border-left:5px solid #2563EB;padding:18px 20px;margin-bottom:28px;border-radius:8px;font-size:15px;line-height:1.7;color:#1E40AF;">
  <strong>Dịch vụ đổi bình gas chính hãng uy tín tại ${item.ward} (địa bàn sáp nhập ${item.oldWards}):</strong> Cung cấp đa dạng các dòng bình gas chính hãng <strong>Luxen Gas, Sopet Gas One, Phoenix Gas</strong> với đủ 4 màu sắc vỏ bình: <em>vỏ xám tiêu chuẩn, vỏ đỏ nổi bật, vỏ xanh dương, vỏ vàng cam</em> (hệ van ngang ren vặn POL và van chụp compact tự động ngắt). Phục vụ tận tâm cư dân và các cơ sở kinh doanh tại <em>${item.landmarks} cùng các trục đường huyết mạch ${item.streets}</em>. Cam kết cân điện tử chuẩn xác đủ 12kg tại bếp, giao hỏa tốc 10 - 15 phút, thợ mang bọc giày lịch thiệp, bảo trì an toàn miễn phí. Khách hàng dễ dàng tra cứu <a href="/gia-gas-hom-nay" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">Bảng giá gas hôm nay</a> hoặc liên hệ mạng lưới <a href="/cua-hang" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">Hệ thống cửa hàng Ngọc Gas</a> qua hotline: <a href="tel:19009396" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">1900 9396</a>.
</div>

<div class="article-banner-wrap" style="text-align:center;margin:24px 0 32px 0;">
  <img src="${banners[item.slug]}" alt="${item.title}" style="max-width:100%;height:auto;border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,0.08);" />
</div>

<h2>1. Vị Trí Địa Lý ${item.ward} Mới & Thấu Hiểu 5 Nỗi Đau Khách Hàng</h2>
<p>
  Theo Nghị quyết số 1685/NQ-UBTVQH15 của Ủy ban Thường vụ Quốc hội về sắp xếp các đơn vị hành chính tại TP. Hồ Chí Minh, <strong>${item.ward}</strong> được thành lập dựa trên việc sáp nhập <strong>${item.oldWards}</strong>. Địa bàn mới sở hữu vị thế giao thương sầm uất, kết nối trực tiếp các trục đường huyết mạch như <em>${item.streets}</em>, đồng thời là nơi tọa lạc của các địa danh trọng điểm: <em>${item.landmarks}</em>.
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
  const articles = goVapData.map(item => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    summary: item.summary,
    imageUrl: banners[item.slug],
    is_published: 0,
    content: buildGoVapContent(item)
  }));

  const fileContent = `import fs from 'fs';
import path from 'path';

const banners = JSON.parse(fs.readFileSync(path.resolve('scratch/28_new_wards_banner_urls.json'), 'utf8'));

export const goVapArticles = ${JSON.stringify(articles, null, 2)};
`;

  fs.writeFileSync(path.resolve('scripts/new-wards/cluster-go-vap.mjs'), fileContent, 'utf8');
  console.log('✅ Đã tái tạo thành công cluster-go-vap.mjs với 6 bài viết chuyên sâu chuẩn 9 trụ cột!');
}

run();
