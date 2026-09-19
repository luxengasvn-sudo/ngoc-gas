import fs from 'fs';
import path from 'path';

const banners = JSON.parse(fs.readFileSync(path.resolve('scratch/bd_vt_banner_urls.json'), 'utf8'));

// DỮ LIỆU ĐỘC BẢN 17 PHƯỜNG/XÃ VŨNG TÀU (IDs 137 - 153)
export const vungTauData = [
  {
    id: 137,
    slug: 'giao-gas-phuong-1-vung-tau',
    ward: 'Phường 1',
    city: 'TP. Vũng Tàu',
    title: 'Đổi Bình Gas Phường 1 (TP. Vũng Tàu) — Trung Tâm Bãi Trước & Bạch Dinh',
    summary: 'Đại lý giao gas chính hãng Phường 1 (TP. Vũng Tàu). Cung cấp Sopet Gas One, Luxen Gas, Phoenix Gas đủ 4 màu vỏ xám, đỏ, xanh, vàng. Giao hỏa tốc 15 phút Bãi Trước, đường Quang Trung, Trần Phú, Bạch Dinh, Cáp treo Hồ Mây, bến tàu cánh ngầm. Cân đủ 12kg tại bếp, vỏ mạ kẽm kháng mặn, van tự ngắt. Hotline 1900 9396.',
    subArea: 'trung tâm danh lam thắng cảnh, bến tàu du lịch và phố ẩm thực ngắm hoàng hôn Bãi Trước',
    landmarks: 'Bãi Trước (Front Beach), Công viên Bãi Trước, đường Quang Trung, đường Trần Phú ôm chân Núi Lớn, Di tích Bạch Dinh (Villa Blanche), Ga Cáp treo Hồ Mây, Bến tàu cánh ngầm, chuỗi nhà hàng hải sản ven biển',
    introP1: 'Là trung tâm lịch sử, hành chính và du lịch danh thắng lâu đời nhất thành phố biển Vũng Tàu, Phường 1 trải dài theo bờ biển Bãi Trước thơ mộng với những rặng dừa xanh soi bóng, ngắm hoàng hôn rực rỡ buông xuống mặt biển, nơi quy tụ Di tích lịch sử Bạch Dinh cổ kính, Khu du lịch Cáp treo Hồ Mây, Bến tàu cánh ngầm và chuỗi nhà hàng cà phê sang trọng dọc đường Quang Trung, Trần Phú.',
    challenges: [
      'Môi trường gió biển mang hơi muối mặn quanh năm: Vỏ bình gas và cổ van điều áp đối diện nguy cơ bị oxy hóa rỉ sét mục đáy và kẹt rít cổ van đồng thau.',
      'Chuỗi nhà hàng hải sản ngắm biển Bãi Trước cần lửa khè cực mạnh: Nhu cầu đun nấu các món hấp, nướng, lẩu hải sản phục vụ thực khách du lịch vào chiều tối và ngày cuối tuần.',
      'Khu biệt thự nghỉ dưỡng và khách sạn ven biển: Yêu cầu bình gas chuẩn Nhật Bản Sopet Gas One xám, thợ giao gas mang bọc giày bảo vệ sàn nhà và dịch vụ giao nhanh 15 phút.'
    ],
    techTable: {
      header: 'Chuẩn Vỏ Bình & Van Kháng Mặn Gió Biển Tại Phường 1 Vũng Tàu',
      colBad: 'Bình Gas Tạp Vỏ Sơn Mỏng Mau Rỉ',
      colGood: 'Chuẩn Bình Gas Kháng Mặn Ngọc Gas Tại Phường 1',
      rows: [
        ['Công nghệ chống rỉ thân vỏ', 'Sơn dầu mỏng, vỏ rỉ sét mục đáy sau 1 tháng', 'Thép SG255 mạ kẽm sơn tĩnh điện 80µm chống muối biển 100%'],
        ['Vật liệu van điều áp cổ bình', 'Hợp kim nhôm gang dễ bị muối ăn mòn kẹt van', 'Đồng thau CW617N đúc nguyên khối chống đóng ten xanh'],
        ['Nhiệt độ ngọn lửa xào hải sản', 'Lửa vàng dưới 1.400°C làm dai tôm mực', 'Lửa xanh cực đại 1.900°C giữ trọn độ ngọt giòn hải sản tươi'],
        ['Khối lượng tịnh cân tại bếp', 'Hụt từ 2.0kg đến 2.8kg mỗi bình 12kg', 'Cân điện tử số đối chứng đủ 12.0kg ± 0.1kg trước mặt khách']
      ]
    },
    guide: {
      title: 'Vệ Sinh Kim Sứ Đánh Lửa IC Khi Bị Hơi Muối Biển Mặn Bám Dính',
      intro: 'Gió biển Bãi Trước mang theo vi hạt muối NaCl bám vào đầu sứ đánh lửa bếp gas sẽ làm tia lửa điện bị phóng phân tán:',
      steps: [
        'Quan sát đầu kim sứ đánh lửa: Nhìn cạnh mâm đồng chia lửa, nếu thấy đầu kim sứ bám lớp bột trắng mờ hoặc ten đồng xanh xám thì đó là muối biển đóng cặn.',
        'Dùng giấy ráp mịn chà nhẹ đầu kim kim loại: Đánh sạch lớp muối mặn và muội than bám ngoài đầu kim phóng tia lửa.',
        'Dùng tăm bông tẩm cồn y tế lau thân sứ: Lau sạch toàn bộ thân trụ sứ cách điện màu trắng để loại bỏ lớp muối ẩm dẫn điện rò rỉ.',
        'Bật thử kiểm tra tia lửa: Nhấn núm vặn, tia lửa điện xanh tím sẽ phóng dứt khoát vào khe mâm đồng, giúp bếp bắt lửa ngay tức thì.'
      ]
    },
    faqs: [
      ['Giao gas ra các nhà hàng sát biển đường Trần Phú có phụ thu phí không?', 'Ngọc Gas miễn phí 100% công vận chuyển và kiểm tra an toàn hệ thống bếp gas tận nơi tại Phường 1 Vũng Tàu.'],
      ['Bình gas có bị gỉ sét do gió biển Bãi Trước không?', '100% bình gas phân phối tại Ngọc Gas đều sử dụng công nghệ mạ kẽm nhúng nóng và sơn tĩnh điện cao tần, cam kết không rỉ sét trước gió biển.'],
      ['Khách sạn cần xuất hóa đơn VAT điện tử có được không?', 'Ngọc Gas cung cấp đầy đủ hóa đơn GTGT điện tử hợp pháp gửi qua email ngay sau khi hoàn tất giao hàng.']
    ]
  },

  {
    id: 138,
    slug: 'giao-gas-phuong-2-vung-tau',
    ward: 'Phường 2',
    city: 'TP. Vũng Tàu',
    title: 'Đổi Bình Gas Phường 2 (TP. Vũng Tàu) — Bãi Sau, Bãi Dứa & Mũi Nghinh Phong',
    summary: 'Đại lý giao gas chính hãng Phường 2 (TP. Vũng Tàu). Cung cấp Sopet Gas One, Luxen Gas, Phoenix Gas đủ 4 màu vỏ xám, đỏ, xanh, vàng. Giao hỏa tốc 15 phút Bãi Sau, Bãi Dứa, Mũi Nghinh Phong, Tượng Chúa Kito, Miếu Hòn Bà, đường Hạ Long, Phan Chu Trinh. Cân đủ 12kg tại bếp, van tự ngắt an toàn, ngọn lửa xanh cực đại. Hotline 1900 9396.',
    subArea: 'cung đường ven biển đẹp nhất Việt Nam, quần thể danh thắng tâm linh và khu nghỉ dưỡng Bãi Dứa',
    landmarks: 'Bãi Sau (Back Beach), Bãi Dứa thanh bình lãng mạn, Mũi Nghinh Phong lộng gió bốn mùa, Tượng Chúa Kito Vua trên đỉnh núi Tao Phùng, Di tích Miếu Hòn Bà giữa biển, cung đường Hạ Long uốn lượn ven vách núi, đường Phan Chu Trinh, Hoàng Hoa Thám',
    introP1: 'Sở hữu địa thế phong thủy tuyệt mỹ "tựa sơn hướng hải", Phường 2 là nơi hội tụ những biểu tượng du lịch lẫy lừng của thành phố biển Vũng Tàu: Mũi Nghinh Phong vươn mình ra biển lớn đón gió, Tượng Chúa Kito Vua sừng sững trên đỉnh núi Tao Phùng, Miếu Hòn Bà kỳ bí nổi trên sóng biển, cung đường ven biển Hạ Long ngoạn mục cùng chuỗi resort khách sạn cao cấp Bãi Dứa.',
    challenges: [
      'Địa hình dốc cao quanh co men theo sườn Núi Nhỏ: Đòi hỏi đội thợ giao gas phải có tay lái xe máy vững vàng, thông thạo đường dốc Phan Chu Trinh, Hải Đăng để giao gas đúng hẹn trong 15 phút.',
      'Áp lực gió biển giật mạnh từ Mũi Nghinh Phong: Bếp gas nấu nướng ngoài trời hoặc gần ban công dễ bị gió tạt tắt lửa; cần giải pháp kiềng chắn gió và ngọn lửa xanh gom nhiệt.',
      'Cụm homestay, villa nghỉ dưỡng cao cấp: Yêu cầu bình gas chính hãng có van ngắt an toàn Compact tự động, bảo đảm an toàn cháy nổ cho du khách lưu trú.'
    ],
    techTable: {
      header: 'Tiêu Chuẩn Năng Lượng Cho Khách Sạn & Homestay Sườn Núi Phường 2',
      colBad: 'Bình Gas Tạp Không Nhãn Mác',
      colGood: 'Chuẩn Năng Lượng Cao Cấp Ngọc Gas Tại Phường 2',
      rows: [
        ['Khả năng giao hàng đường dốc cao', 'Từ chối giao hoặc đòi phụ phí dốc núi', 'Giao tận nơi mọi dốc núi Tao Phùng, không phụ thu'],
        ['Cơ chế ngắt an toàn khi có sự cố', 'Van lỏng lẻo dễ xì gas nguy hiểm cho khách', 'Van Compact bi thép tự ngắt áp suất tức thì trong 0.5s'],
        ['Độ bền vỏ bình trước gió muối biển', 'Vỏ rỉ sét bong tróc mất mỹ quan villa', 'Vỏ bình xám Nhật Sopet Gas One sơn tĩnh điện sáng bóng'],
        ['Trọng lượng khí cân đối chứng', 'Hụt từ 2.0kg đến 2.5kg gas', 'Đủ 12.0kg ± 0.1kg đối chứng tận mắt trên cân điện tử']
      ]
    },
    guide: {
      title: 'Khắc Phục Hiện Tượng Lửa Bếp Bị Gió Biển Nghinh Phong Tạt Tắt',
      intro: 'Tại các căn hộ và nhà hàng gần Mũi Nghinh Phong, gió biển thổi lồng lộng thường làm ngọn lửa bếp gas phập phù:',
      steps: [
        'Lắp vành inox chắn gió kiềng bếp: Đặt một vành chắn gió chuyên dụng cao 5cm quanh kiềng bếp để che chắn gió tạt ngang họng đốt.',
        'Điều chỉnh khe gió sơ cấp dưới bụng bếp: Gạt nhẹ cần điều chỉnh gió đáy bếp về vị trí hẹp bớt để lượng oxy hút vào hòa khí không bị dư thừa.',
        'Kiểm tra ngọn lửa gom tâm đáy nồi: Khi chỉnh đúng, ngọn lửa sẽ có màu xanh biếc chụm vào giữa đáy nồi, không bị xòe tản mát ra ngoài.',
        'Sử dụng bình gas có tỷ lệ Propane chuẩn: Bình gas Ngọc Gas có tỷ lệ Propane 30% giúp áp suất dòng khí phun mạnh mẽ chống tạt gió hiệu quả.'
      ]
    },
    faqs: [
      ['Giao gas lên các homestay trên dốc núi đường Hải Đăng có phụ thu phí không?', 'Ngọc Gas miễn phí 100% chi phí vận chuyển lên các dốc cao sườn núi cho mọi khách hàng tại Phường 2 Vũng Tàu.'],
      ['Homestay cần kiểm tra an toàn van gas định kỳ có được hỗ trợ không?', 'Kỹ thuật viên Ngọc Gas hỗ trợ kiểm tra rò rỉ khí gas bằng máy đo chuyên dụng và bảo dưỡng bếp miễn phí cho các cơ sở lưu trú.'],
      ['Đang nấu tiệc cho khách du lịch hết gas gọi bao lâu có?', 'Đội xe giao gas Ngọc Gas túc trực ngay khu vực Bãi Sau, cam kết có mặt chỉ sau 10 đến 15 phút sau khi nhận cuộc gọi qua hotline 1900 9396.']
    ]
  },

  {
    id: 139,
    slug: 'giao-gas-phuong-3-vung-tau',
    ward: 'Phường 3',
    city: 'TP. Vũng Tàu',
    title: 'Đổi Bình Gas Phường 3 (TP. Vũng Tàu) — Chợ Mới Vũng Tàu & Tuyến Phố Ba Cu',
    summary: 'Đại lý giao gas chính hãng Phường 3 (TP. Vũng Tàu). Cung cấp Sopet Gas One, Luxen Gas, Phoenix Gas đủ 4 màu vỏ xám, đỏ, xanh, vàng. Giao hỏa tốc 15 phút Chợ Mới Vũng Tàu, đường Ba Cu, Nam Kỳ Khởi Nghĩa, Lê Hồng Phong, Trường THPT Vũng Tàu. Cân đủ 12kg tại bếp, van tự ngắt, ngọn lửa xanh cực đại. Hotline 1900 9396.',
    subArea: 'trung tâm thương mại bán lẻ sầm uất và thủ phủ thời trang phố thị Vũng Tàu',
    landmarks: 'Chợ Mới Vũng Tàu sầm uất, Trục phố đi bộ thời trang Ba Cu, đường Nam Kỳ Khởi Nghĩa, đại lộ Lê Hồng Phong, Trường THPT Vũng Tàu, đường Trương Công Định, Chùa Từ Quang',
    introP1: 'Được ví như khu thương mại bán lẻ phồn hoa và sôi động bậc nhất nội đô thành phố biển, Phường 3 là nơi tọa lạc của Chợ Mới Vũng Tàu đầu mối giao thương nông sản thực phẩm lớn, trục đường thời trang sầm uất Ba Cu được mệnh danh là "phố Đồng Khởi của Vũng Tàu", cùng mạng lưới hàng trăm cửa hàng kinh doanh ẩm thực, quán ăn gia đình tấp nập ngày đêm.',
    challenges: [
      'Lưu lượng giao thông phố chợ đông đúc, hẻm dân cư san sát: Cần đội xe giao gas máy cơ động luồn lách thông thạo ngõ hẻm đường Ba Cu, Nam Kỳ Khởi Nghĩa để giao hàng đúng 15 phút.',
      'Hàng quán ăn uống quanh Chợ Mới đun nấu liên tục: Nhu cầu bình gas lửa xanh nhiệt lượng cao 11.800 kcal/kg để hầm nước lèo, nấu chè, chiên rán nhanh chóng không bám muội đen.',
      'Nỗi bức xúc về tình trạng gas lậu thiếu cân tại khu phố chợ: Tiểu thương và người dân cần đơn vị uy tín cân điện tử đối chứng công khai tại bếp.'
    ],
    techTable: {
      header: 'Tiêu Chuẩn Lửa Xanh Cho Khu Phố Chợ Sầm Uất Phường 3',
      colBad: 'Bình Gas Dạo Vỉa Hè Thiếu Ký',
      colGood: 'Quy Chuẩn Ngọc Gas Phường 3 Vũng Tàu',
      rows: [
        ['Khối lượng khí cân tại bếp', 'Hụt từ 2.0kg đến 2.8kg mỗi bình', 'Đủ 12.0kg ± 0.1kg đối chứng tận mắt trên cân điện tử'],
        ['Thời gian đun sôi nồi nước 40L', 'Mất 45 - 55 phút, tốn gas', 'Chỉ mất 25 - 30 phút nhờ nhiệt trị chuẩn 11.800 kcal/kg'],
        ['Tốc độ giao hàng giờ cao điểm', 'Trễ 45 - 60 phút do kẹt xe phố chợ', 'Xe máy luồn lách ngõ hẻm có mặt sau 10 - 15 phút'],
        ['Bảo hành và chăm sóc khách hàng', 'Không bảo hành, né tránh trách nhiệm', 'Bảo hành 1 đổi 1, bảo dưỡng bếp gas định kỳ miễn phí']
      ]
    },
    guide: {
      title: 'Phân Biệt Bình Gas Chính Hãng Nguyên Niêm Phong Với Bình Gas Sang Chiết Lậu',
      intro: 'Tại khu vực phố chợ Phường 3, nhiều cơ sở sang chiết lậu dùng màng co giả để đánh lừa người tiêu dùng:',
      steps: [
        'Quan sát màng co nhiệt niêm phong cổ van: Màng co chính hãng của Sopet Gas One, Luxen Gas được co nhiệt bằng máy tự động, ôm khít cổ van, không nhăn nheo, không bị rách vá.',
        'Kiểm tra tem chống hàng giả công nghệ cao: Quét mã QR Code hoặc chiếu đèn UV lên tem Hologram phát quang nhận diện thương hiệu rõ nét.',
        'Kiểm tra chữ dập nổi trên vai bình: Tên thương hiệu Luxen, Sopet Gas One được dập khuôn nổi sắc sảo trên quai bình, không có dấu vết mài mòn tẩy xóa.',
        'Yêu cầu cân kiểm tra trọng lượng trước khi nhận: Cân tổng trọng lượng bình gas trừ đi số cân vỏ dập trên quai xách phải đủ đúng 12.0kg ruột gas.'
      ]
    },
    faqs: [
      ['Quán ăn quanh Chợ Mới Vũng Tàu gọi gas lúc 5h00 sáng có giao không?', 'Có! Ngọc Gas có đội ngũ trực ca sáng sớm phục vụ chu đáo các quán ăn sáng tại Phường 3 mở hàng đúng giờ.'],
      ['Bình gas có được bảo hiểm PCCC không?', '100% bình gas phân phối tại Ngọc Gas đều có bảo hiểm trách nhiệm sản phẩm theo quy chuẩn an toàn PCCC và quy định hiện hành của pháp luật.'],
      ['Đổi vỏ bình gas hãng khác sang Luxen hoặc Sopet có mất tiền cọc không?', 'Hoàn toàn không! Ngọc Gas hỗ trợ đổi vỏ ngang miễn phí giữa tất cả các hãng gas hợp pháp trên thị trường.']
    ]
  },

  {
    id: 140,
    slug: 'giao-gas-phuong-4-vung-tau',
    ward: 'Phường 4',
    city: 'TP. Vũng Tàu',
    title: 'Đổi Bình Gas Phường 4 (TP. Vũng Tàu) — Chợ Bến Đình & Tuyến Đường Lê Lợi',
    summary: 'Đại lý giao gas chính hãng Phường 4 (TP. Vũng Tàu). Cung cấp Sopet Gas One, Luxen Gas, Phoenix Gas đủ 4 màu vỏ xám, đỏ, xanh, vàng. Giao hỏa tốc 15 phút Chợ Bến Đình, đường Lê Lợi, Nguyễn Du, Nhà thờ Bến Đình, Nguyễn An Ninh. Cân đủ 12kg tại bếp, van tự ngắt, ngọn lửa xanh cực đại. Hotline 1900 9396.',
    subArea: 'khu phố chài truyền thống, cái nôi ẩm thực hải sản và chợ cá Bến Đình lâu đời',
    landmarks: 'Chợ Bến Đình lâu đời tấp nập, ngã tư Lê Lợi - Nguyễn Du, Nhà thờ Bến Đình cổ kính, trục đường Nguyễn An Ninh, đường Cô Giang, Cô Bắc, khu dân cư xóm chài Bến Đình',
    introP1: 'Là vùng đất định cư lâu đời của các thế hệ ngư dân bám biển Vũng Tàu, Phường 4 gắn liền với ngôi Chợ Bến Đình trăm năm tuổi luôn tấp nập hải sản cá tôm tươi rói vừa cập bến, Nhà thờ Bến Đình rêu phong cổ kính cùng những con hẻm nhà phố đan xen nhộn nhịp quanh trục đường Lê Lợi, Nguyễn Du, Cô Giang.',
    challenges: [
      'Nguy cơ chuột cống cắn phá dây dẫn gas tại các khu phố chợ ẩm ướt: Môi trường buôn bán thủy sản nhiều chuột cống sinh sống; đòi hỏi dây dẫn gas bắt buộc phải có lưới bọc inox 304 bảo vệ.',
      'Nhu cầu gas công suất lớn để hấp luộc hải sản tươi sống: Các vựa cá và sạp chợ Bến Đình cần ngọn lửa gas xanh nhiệt cao gom nhiệt để giữ trọn độ giòn ngọt tự nhiên của tôm ghẹ.',
      'Nhà phố cổ san sát trong ngõ hẻm nhỏ: Yêu cầu bình gas phải có van ngắt Compact tự động phòng ngừa rò rỉ khí gas gây hỏa hoạn.'
    ],
    techTable: {
      header: 'Tiêu Chuẩn Gas Kháng Chuột & An Toàn Bếp Chợ Bến Đình',
      colBad: 'Bình Gas Tạp Dây Cao Su Mỏng',
      colGood: 'Chuẩn Khí Sạch Ngọc Gas Tại Phường 4',
      rows: [
        ['Độ an toàn ống dẫn gas', 'Dây cao su giòn bị chuột cắn thủng gây xì', 'Tặng dây bọc lưới sợi Inox 304 chống chuột cắn 100%'],
        ['Thời gian luộc chín nồi ghẹ 20kg', 'Mất 30 - 35 phút, thịt ghẹ bị teo nước', 'Chỉ mất 15 - 18 phút nhờ nhiệt trị chuẩn 11.800 kcal/kg'],
        ['Khối lượng khí cân tại bếp', 'Hụt từ 2.0kg đến 2.5kg gas', 'Cân điện tử số đối chứng đủ 12.0kg ± 0.1kg tại bếp'],
        ['Vệ sinh bếp gas sau lắp đặt', 'Không hỗ trợ, thu tiền đi ngay', 'Vệ sinh họng đốt, mâm đồng chia lửa miễn phí']
      ]
    },
    guide: {
      title: 'Kiểm Tra Độ Kín Khớp Nối Van Bằng Nước Rửa Chén Trong Bếp Nhà Phố Chài',
      intro: 'Tại khu dân cư xóm chài Bến Đình, kiểm tra rò rỉ gas sau khi thay bình mới là kỹ năng an toàn cơ bản:',
      steps: [
        'Chuẩn bị dung dịch bọt: Pha một muỗng nước rửa chén vào nửa chén nước, đánh bọt thật nhiều.',
        'Bôi đều bọt xà phòng lên các khớp nối: Quét bọt quanh cổ van bình gas, khớp nối van điều áp và hai đầu siết cổ dê ống cao su dẫn gas.',
        'Quan sát bọt khí: Nếu lớp bọt giữ nguyên không biến đổi thì hệ thống kín 100%. Nếu có bóng bóng xà phòng phình to liên tục, khí gas đang rò rỉ tại khớp nối đó.',
        'Khóa van và siết lại cổ dê: Khóa van bình gas ngay lập tức, dùng tua-vít siết chặt lại đai ốc cổ dê rồi thử lại bằng bọt đến khi kín hoàn toàn.'
      ]
    },
    faqs: [
      ['Giao gas vào các hẻm nhỏ đường Cô Giang, Cô Bắc có tính thêm phí không?', 'Ngọc Gas miễn phí 100% chi phí vận chuyển vào tận bếp nhà khách hàng trên toàn địa bàn Phường 4 Vũng Tàu.'],
      ['Vựa hải sản luộc ghẹ tại Chợ Bến Đình lấy nhiều bình có được giảm giá không?', 'Ngọc Gas áp dụng chính sách chiết khấu giá sỉ ưu đãi và hỗ trợ mượn vỏ bình miễn phí cho các cơ sở kinh doanh hải sản.'],
      ['Đang nấu cơm bị hết gas gọi bao lâu nhân viên tới?', 'Kỹ thuật viên Ngọc Gas túc trực ngay khu vực Bến Đình, cam kết có mặt tận nhà khách hàng chỉ sau 10 đến 15 phút.']
    ]
  },

  {
    id: 141,
    slug: 'giao-gas-phuong-5-vung-tau',
    ward: 'Phường 5',
    city: 'TP. Vũng Tàu',
    title: 'Đổi Bình Gas Phường 5 (TP. Vũng Tàu) — Làng Chài Bến Đá & Cụm Hải Sản Gành Hào',
    summary: 'Đại lý giao gas chính hãng Phường 5 (TP. Vũng Tàu). Cung cấp Sopet Gas One, Luxen Gas, Phoenix Gas đủ 4 màu vỏ xám, đỏ, xanh, vàng. Giao hỏa tốc 15 phút Làng chài Bến Đá, đường Trần Phú ôm Núi Lớn, cụm nhà hàng hải sản Gành Hào ven gềnh đá, Cảng cá Bến Đá. Cân đủ 12kg tại bếp, van tự ngắt, vỏ mạ kẽm kháng mặn. Hotline 1900 9396.',
    subArea: 'thủ phủ làng chài đánh bắt thủy sản truyền thống và cụm nhà hàng hải sản ven gềnh đá',
    landmarks: 'Làng chài Bến Đá sầm uất, cung đường Trần Phú uốn lượn ôm chân Núi Lớn, cụm nhà hàng hải sản gềnh đá Gành Hào ven sóng biển, Cảng cá Bến Đá, Chợ Bến Đá, Chùa Thích Ca Phật Đài kề cận',
    introP1: 'Tựa lưng vào triền Núi Lớn hùng vĩ và hướng mặt ra biển Bến Đá lộng gió, Phường 5 nổi danh là cái nôi nghề biển Vũng Tàu với Làng chài Bến Đá tấp nập tàu thuyền đánh bắt xa bờ cập cảng mỗi sớm mai, Chợ hải sản Bến Đá tươi ngon cùng cung đường biển Trần Phú quy tụ chuỗi nhà hàng hải sản gềnh đá Gành Hào nổi tiếng bậc nhất phương Nam.',
    challenges: [
      'Chuỗi nhà hàng hải sản sát mép biển cần ngọn lửa khè công suất cực đại: Đòi hỏi áp suất dòng khí liên tục để chế biến các món cua hấp, mực nướng, tôm xào giữ trọn vị giòn ngọt phục vụ hàng ngàn thực khách mỗi ngày.',
      'Sóng biển và gió mặn biển Tây đánh trực tiếp vào bờ: Hơi muối mặn có tính ăn mòn kim loại cực cao; vỏ bình gas phải được mạ kẽm nhúng nóng và sơn tĩnh điện chịu muối biển nghiêm ngặt.',
      'Địa hình ngõ dốc men sườn Núi Lớn: Cần đội xe giao gas lành nghề, thông thạo đường dốc để giao bình gas tận gian bếp sau trong 15 phút.'
    ],
    techTable: {
      header: 'Tiêu Chuẩn Gas Kháng Mặn Cho Cụm Nhà Hàng Gành Hào Phường 5',
      colBad: 'Bình Gas Tạp Vỏ Cũ Rỉ Sét',
      colGood: 'Chuẩn Khí Sạch Kháng Mặn Ngọc Gas Tại Phường 5',
      rows: [
        ['Kháng ăn mòn hơi muối sát mép sóng', 'Vỏ rỉ sét loang lổ sau 2 tuần gió biển', 'Mạ kẽm nhúng nóng sơn tĩnh điện JIS G3116 Nhật Bản'],
        ['Nhiệt độ tâm ngọn lửa xào nấu', 'Dưới 1.400°C làm dai thịt mực cua', 'Đạt trên 1.900°C lửa xanh biếc gom nhiệt chín giòn hải sản'],
        ['Chất liệu van điều áp cổ bình', 'Hợp kim nhôm gang dễ kẹt van đóng ten', 'Đồng thau CW617N đúc nguyên khối chịu mặn tuyệt hảo'],
        ['Kiểm định cân nặng công khai', 'Hụt từ 2.0kg đến 2.8kg mỗi bình', 'Cân điện tử số đối chứng đủ 12.0kg ± 0.1kg tại bếp']
      ]
    },
    guide: {
      title: 'Cân Đối Tỷ Lệ Gió - Gas Dưới Bụng Bếp Để Ngọn Lửa Gom Xanh Biếc',
      intro: 'Tại các nhà hàng ven biển Phường 5, gió biển lùa vào thường làm tỷ lệ hòa khí bị lệch gây lửa vàng đỏ hao gas:',
      steps: [
        'Quan sát màu sắc ngọn lửa: Nếu ngọn lửa có đầu màu vàng cam và bốc khói đen làm đen nồi, bếp đang bị thiếu oxy hòa khí.',
        'Cúi xuống đáy bụng bếp gas: Mỗi họng đốt đều có một cần gạt lá gió bằng kim loại mỏng che lỗ hút khí sơ cấp.',
        'Gạt nhẹ cần lá gió mở rộng khe hút khí: Mở dần khe lá gió cho đến khi ngọn lửa chuyển hoàn toàn từ vàng cam sang màu xanh biếc trong vắt.',
        'Kiểm tra ngọn lửa không bị tách họng: Không mở lá gió quá to làm lửa phát ra tiếng rít xì xì và bị gió biển tạt tắt ngóm.'
      ]
    },
    faqs: [
      ['Nhà hàng hải sản lấy nhiều bình gas công nghiệp và 12kg có được hỗ trợ giàn góp không?', 'Ngọc Gas hỗ trợ khảo sát thiết kế và lắp đặt hệ thống giàn góp gas an toàn đạt chuẩn PCCC hoàn toàn miễn phí cho nhà hàng.'],
      ['Giao gas lên các sườn dốc Núi Lớn đường Trần Phú có tính thêm phụ phí không?', 'Ngọc Gas cam kết miễn phí 100% công vận chuyển và lắp đặt lên tận nơi cho mọi khách hàng tại Phường 5 Vũng Tàu.'],
      ['Bình gas có được bảo hiểm PCCC không?', 'Tất cả sản phẩm bình gas tại Ngọc Gas đều được bảo hiểm trách nhiệm sản phẩm theo quy chuẩn an toàn PCCC pháp luật.']
    ]
  },

  {
    id: 142,
    slug: 'giao-gas-phuong-7-vung-tau',
    ward: 'Phường 7',
    city: 'TP. Vũng Tàu',
    title: 'Đổi Bình Gas Phường 7 (TP. Vũng Tàu) — Khu 5 Tầng Dầu Khí & Nguyễn Thái Học',
    summary: 'Đại lý giao gas chính hãng Phường 7 (TP. Vũng Tàu). Cung cấp Sopet Gas One, Luxen Gas, Phoenix Gas đủ 4 màu vỏ xám, đỏ, xanh, vàng. Giao hỏa tốc 15 phút Khu 5 tầng ngõ phố Liên doanh Vietsovpetro, đường Nguyễn Thái Học, Trương Công Định, Chợ Nguyễn Tri Phương. Cân đủ 12kg tại bếp, van tự ngắt, ngọn lửa xanh cực đại. Hotline 1900 9396.',
    subArea: 'khu cư xá chuyên gia dầu khí Nga - Việt và khu đô thị dân cư trí thức lâu đời',
    landmarks: 'Khu cư xá 5 tầng Dầu khí Liên doanh Vietsovpetro, đường Nguyễn Thái Học, trục đường Trương Công Định, đường Lê Lợi, Chợ Nguyễn Tri Phương, Trường THCS Trương Công Định',
    introP1: 'Gắn liền với thời kỳ hoàng kim xây dựng ngành công nghiệp khai thác dầu khí Việt Nam, Phường 7 là nơi tọa lạc của Khu cư xá 5 tầng Dầu khí huyền thoại do Liên doanh Vietsovpetro xây dựng cho hàng ngàn cán bộ, chuyên gia Nga và kỹ sư Việt Nam sinh sống, cùng khu phố buôn bán sầm uất Nguyễn Thái Học, Trương Công Định và Chợ Nguyễn Tri Phương tấp nập.',
    challenges: [
      'Tiêu chuẩn an toàn PCCC kỹ thuật cực kỳ nghiêm ngặt của cư dân ngành dầu khí: Kỹ sư dầu khí hiểu rất rõ về an toàn khí đốt; bình gas bắt buộc phải chuẩn kiểm định áp lực 34 bar, van tự ngắt Compact có chứng nhận an toàn.',
      'Khu chung cư 5 tầng cũ không có thang máy: Cần đội ngũ thợ giao gas trẻ khỏe, nhiệt tình vác bình gas lên tận tầng 4, tầng 5 lắp đặt tận căn hộ.',
      'Yêu cầu nguồn gas tinh khiết chuẩn Nhật Bản: Đa số các gia đình cán bộ dầu khí tin dùng dòng bình gas Sopet Gas One vỏ xám mạ kẽm cao cấp.'
    ],
    techTable: {
      header: 'Tiêu Chuẩn Kỹ Thuật Khắt Khe Cho Cư Xá Dầu Khí Phường 7',
      colBad: 'Bình Gas Sang Chiết Lậu Trôi Nổi',
      colGood: 'Chuẩn Kỹ Thuật Dầu Khí Ngọc Gas Tại Phường 7',
      rows: [
        ['Áp suất kiểm nghiệm thủy lực vỏ bình', 'Không rõ kiểm định, rủi ro nứt nẻ vỏ', 'Kiểm định thủy lực 34 bar theo chuẩn JIS G3116 Nhật Bản'],
        ['Hệ thống van ngắt tự động', 'Van cũ lỏng ren tiềm ẩn rò rỉ khí', 'Van Compact ngắt tự động trong 0.5s bảo vệ căn hộ khép kín'],
        ['Giao hàng lên tầng cao không thang máy', 'Từ chối giao hoặc đòi phụ thu tầng cao', 'Bê bình gas lên tận tầng 5 chung cư 5 tầng hoàn toàn miễn phí'],
        ['Khối lượng tịnh kiểm chứng tại bếp', 'Hụt từ 2.0kg đến 2.5kg gas', 'Cân điện tử số đối chứng đủ 12.0kg ± 0.1kg trước mặt khách']
      ]
    },
    guide: {
      title: 'Cách Xả Áp Và Reset Viên Bi An Toàn Trên Van Chụp Compact Khi Bị Ngắt Gas',
      intro: 'Tại các căn hộ chung cư dùng van chụp Compact cao cấp, thỉnh thoảng bếp không lên lửa do viên bi an toàn tự ngắt:',
      steps: [
        'Nhận diện nguyên nhân ngắt bi an toàn: Khi bạn bật công tắc bếp quá nhanh hoặc có xung áp đột ngột trong đường ống, viên bi thép trong van chụp sẽ tự động nhảy lên chặn dòng khí.',
        'Xoay núm gạt van về vị trí khóa nằm ngang: Gạt chốt khóa van Compact về vị trí OFF.',
        'Nhấn nút reset bằng đồng trên thân van: Dùng ngón tay ấn mạnh vào nút đồng tròn nhỏ bên hông van và giữ trong 3 giây để cân bằng áp suất hai đầu ống dẫn.',
        'Gạt mở van từ từ sang vị trí ON: Xoay núm van sang vị trí mở một cách chậm rãi, viên bi thép sẽ rơi về vị trí thông khí và bếp gas sẽ bắt lửa êm ái.'
      ]
    },
    faqs: [
      ['Vác bình gas lên tầng 4, tầng 5 Khu chung cư 5 tầng có tính thêm tiền không?', 'Ngọc Gas miễn phí 100% công bưng vác lên tận căn hộ tầng cao tại Khu 5 tầng Dầu khí Phường 7, tuyệt đối không phụ thu.'],
      ['Bình gas Sopet Gas One vỏ xám Nhật Bản có những loại van nào?', 'Có đầy đủ cả hệ van ren xoay POL chuẩn thông dụng và hệ van chụp Compact bấm khóa tự động cao cấp.'],
      ['Có giao gas vào các ngày thứ Bảy, Chủ Nhật không?', 'Ngọc Gas phục vụ liên tục 7 ngày trong tuần từ 6h00 sáng đến 22h00 đêm, kể cả ngày lễ Tết.']
    ]
  },

  {
    id: 143,
    slug: 'giao-gas-phuong-8-vung-tau',
    ward: 'Phường 8',
    city: 'TP. Vũng Tàu',
    title: 'Đổi Bình Gas Phường 8 (TP. Vũng Tàu) — Vòng Xoay Đài Liệt Sĩ & Đường Bình Giã',
    summary: 'Đại lý giao gas chính hãng Phường 8 (TP. Vũng Tàu). Cung cấp Sopet Gas One, Luxen Gas, Phoenix Gas đủ 4 màu vỏ xám, đỏ, xanh, vàng. Giao hỏa tốc 15 phút Vòng xoay Đài Liệt Sĩ, đường Bình Giã, Lê Hồng Phong, Chợ Phường 8, Trương Công Định. Cân đủ 12kg tại bếp, van tự ngắt, ngọn lửa xanh cực đại. Hotline 1900 9396.',
    subArea: 'cửa ngõ giao thông trung tâm nội đô và khu dân cư sầm uất thành phố Vũng Tàu',
    landmarks: 'Tượng đài Liệt Sĩ Vũng Tàu (vòng xoay lớn nhất Đông Nam Á), đường Bình Giã, trục đại lộ Lê Hồng Phong, đường Trương Công Định, Chợ Phường 8, Trường THPT Chuyên Lê Quý Đôn cũ, KDC Chu Mạnh Trinh',
    introP1: 'Đóng vai trò là nút giao thông cửa ngõ quan trọng bậc nhất kết nối các trục đường chính của thành phố Vũng Tàu, Phường 8 tự hào với công trình Tượng đài Liệt Sĩ Vũng Tàu sừng sững giữa vòng xoay lớn nhất Đông Nam Á, trục đường thương mại Bình Giã tấp nập, đại lộ Lê Hồng Phong thênh thang cùng mạng lưới trường học, chợ dân sinh Phường 8 đông đúc.',
    challenges: [
      'Mật độ giao thông cao quanh nút giao Đài Liệt Sĩ vào giờ cao điểm: Đòi hỏi đội xe máy giao gas phải có tay lái linh hoạt, thông thạo đường nhánh Bình Giã để tiếp cận khách hàng sau 15 phút.',
      'Hàng trăm quán ăn gia đình và tiệm ẩm thực phố Bình Giã: Nhu cầu đun nấu lớn, cần ngọn lửa gas xanh nhiệt cao 11.800 kcal/kg giúp nấu chín thức ăn nhanh chóng mà không làm đen đáy nồi.',
      'Yêu cầu an toàn cháy nổ nhà phố liền kề: Cần bình gas có van ngắt tự động, ống dẫn bọc inox chống chuột cắn và kiểm tra rò rỉ khí gas cẩn thận.'
    ],
    techTable: {
      header: 'Tiêu Chuẩn Giao Nhanh & Lửa Xanh Cho Nhà Phố Phường 8',
      colBad: 'Đại Lý Gas Thông Thường Hay Trễ Hẹn',
      colGood: 'Quy Chuẩn Giao Hỏa Tốc Ngọc Gas Phường 8',
      rows: [
        ['Thời gian giao hàng giờ cao điểm', 'Trễ 40 - 50 phút do kẹt xe vòng xoay', 'Xe máy luồn lách hẻm tắt có mặt sau 10 - 15 phút'],
        ['Màu sắc ngọn lửa và đáy nồi', 'Lửa đỏ bám muội đen xì đáy xoong chảo', 'Lửa xanh biếc 11.800 kcal/kg giữ nồi nấu luôn sáng bóng'],
        ['Khối lượng khí cân tại bếp', 'Hụt từ 2.0kg đến 2.5kg gas', 'Cân điện tử số đối chứng đủ 12.0kg ± 0.1kg tại bếp'],
        ['Dịch vụ kiểm tra an toàn sau giao', 'Không kiểm tra độ kín van', 'Quét bọt xà phòng kiểm tra độ kín khớp nối miễn phí']
      ]
    },
    guide: {
      title: 'Nhận Diện Hiện Tượng Lửa Bị Đỏ Do Bụi Bẩn Và Cách Tháo Rửa Mâm Đồng',
      intro: 'Tại các gia đình tại Phường 8, bếp gas dùng lâu ngày ngọn lửa hay bị đỏ do bụi bẩn bám dính:',
      steps: [
        'Nhận diện nguyên nhân: Bụi khí quyển và cặn dầu mỡ thức ăn trào bám vào các rãnh chia lửa trên mâm đồng làm cản trở dòng oxy hòa khí.',
        'Tháo rời mâm đồng chia lửa ngâm nước ấm: Chờ bếp nguội hẳn, nhấc mâm đồng ra ngâm trong nước ấm có pha chút nước rửa chén trong 15 phút.',
        'Dùng bàn chải nhỏ cọ sạch từng rãnh thoát khí: Cọ sạch các cặn đen bám dính, dùng tăm thông các lỗ kim phun bị tắc.',
        'Lau khô và lắp lại cân đối: Dùng khăn khô lau sạch hoàn toàn trước khi đặt lại họng bếp. Bật lửa thử, ngọn lửa sẽ chuyển sang màu xanh biếc gom nhiệt.'
      ]
    },
    faqs: [
      ['Đổi vỏ bình gas màu đỏ sang màu xám Sopet Gas One có mất tiền cọc không?', 'Hoàn toàn không! Ngọc Gas hỗ trợ đổi vỏ ngang miễn phí giữa 4 màu sắc xám, đỏ, xanh, vàng mà không yêu cầu đóng thêm bất kỳ chi phí cược vỏ nào.'],
      ['Bình gas giao đến có được cân đối chứng không?', '100% nhân viên giao gas Ngọc Gas luôn mang theo cân điện tử kiểm định, cân đủ 12.0kg gas trước sự chứng kiến của gia chủ.'],
      ['Giao gas vào các hẻm đường Bình Giã có tính thêm phí vận chuyển không?', 'Ngọc Gas miễn phí 100% công vận chuyển và lắp đặt tận bếp trên toàn địa bàn Phường 8 Vũng Tàu.']
    ]
  },

  {
    id: 144,
    slug: 'giao-gas-phuong-9-vung-tau',
    ward: 'Phường 9',
    city: 'TP. Vũng Tàu',
    title: 'Đổi Bình Gas Phường 9 (TP. Vũng Tàu) — Trụ Sở Vietsovpetro & Sân Bay Vũng Tàu',
    summary: 'Đại lý giao gas chính hãng Phường 9 (TP. Vũng Tàu). Cung cấp Sopet Gas One, Luxen Gas, Phoenix Gas đủ 4 màu vỏ xám, đỏ, xanh, vàng. Giao hỏa tốc 15 phút Trụ sở Liên doanh Vietsovpetro, Sân bay trực thăng Vũng Tàu, đường 30/4, Nguyễn An Ninh. Cân đủ 12kg tại bếp, van tự ngắt an toàn, ngọn lửa xanh cực đại. Hotline 1900 9396.',
    subArea: 'trung tâm điều hành dầu khí quốc gia và căn cứ hậu cần hàng không sân bay trực thăng',
    landmarks: 'Trụ sở Tổng công ty Liên doanh Vietsovpetro, Sân bay trực thăng Vũng Tàu (phục vụ bay giàn khoan mỏ Bạch Hổ, Rồng), trục đại lộ 30/4, đường Nguyễn An Ninh, Khu dân cư Dầu khí, Trường Đại học Bà Rịa - Vũng Tàu cơ sở 30/4',
    introP1: 'Được coi là "bộ não" điều hành của ngành công nghiệp khai thác dầu khí biển Việt Nam, Phường 9 nổi bật với quần thể Trụ sở Tổng công ty Liên doanh Dầu khí Vietsovpetro nguy nga, Sân bay trực thăng Vũng Tàu tấp nập những chuyến bay chuyên chở kỹ sư ra giàn khoan ngoài khơi, trục đại lộ huyết mạch 30/4 cùng khu đô thị dân cư văn minh của các gia đình cán bộ công nhân viên ngành năng lượng.',
    challenges: [
      'Tiêu chuẩn PCCC và an toàn năng lượng khắt khe vùng lân cận sân bay trực thăng: Yêu cầu tuyệt đối không để rò rỉ khí đốt, bình gas phải có nguồn gốc pháp lý minh bạch và đầy đủ bảo hiểm trách nhiệm sản phẩm.',
      'Cộng đồng kỹ sư dầu khí có kiến thức kỹ thuật sâu rộng: Yêu cầu bình gas chuẩn công nghệ Nhật Bản Sopet Gas One vỏ xám mạ kẽm SG255 chịu áp lực 34 bar, van Compact tự ngắt chuẩn mực.',
      'Giao hàng nhanh chóng và lịch sự: Đội ngũ thợ giao gas mang bọc giày vải nhung bảo vệ sàn nhà, tác phong chuyên nghiệp đúng hẹn.'
    ],
    techTable: {
      header: 'Chuẩn PCCC & An Toàn Năng Lượng Cho Cư Dân Dầu Khí Phường 9',
      colBad: 'Bình Gas Trôi Nổi Không Rõ Xuất Xứ',
      colGood: 'Chuẩn Kỹ Thuật Dầu Khí Ngọc Gas Tại Phường 9',
      rows: [
        ['Áp suất thử nghiệm an toàn vỏ bình', 'Không rõ kiểm định, nguy cơ rò rỉ cao', 'Kiểm nghiệm thủy lực 34 bar, chịu áp lực nổ trên 68 bar'],
        ['Hệ thống van ngắt tự động', 'Van ren lỏng lẻo dễ xì gas', 'Van Compact Nhật Bản ngắt dòng khí tức thì trong 0.5 giây'],
        ['Bảo hiểm trách nhiệm sản phẩm', 'Không có bảo hiểm pháp lý', 'Bảo hiểm PCCC đầy đủ theo quy định pháp luật'],
        ['Kiểm tra rò rỉ sau lắp đặt', 'Không kiểm tra độ kín', 'Dùng máy đo khí gas và dung dịch bọt rà soát 100% khớp nối']
      ]
    },
    guide: {
      title: 'Kiểm Tra Hạn Kiểm Định An Toàn Dập Trên Quai Bình Gas',
      intro: 'Tại các gia đình kỹ sư dầu khí Phường 9, việc kiểm tra hạn kiểm định an toàn vỏ bình là thói quen kiểm tra bắt buộc:',
      steps: [
        'Quan sát quai xách bình gas: Mỗi bình gas chính hãng đều được dập chìm thông tin kiểm định trên quai xách kim loại.',
        'Đọc ký hiệu tháng và năm kiểm định: Chữ dập thường có dạng như "10-28" (nghĩa là hạn kiểm định đến tháng 10 năm 2028) hoặc "Q4-27" (Quý 4 năm 2027).',
        'Đối chiếu với thời điểm hiện tại: Nếu năm hiện tại vượt quá năm dập trên quai, bình gas đó đã hết hạn lưu hành và bắt buộc phải đưa về nhà máy tái kiểm định thủy lực.',
        'Cam kết tại Ngọc Gas: 100% bình gas xuất kho đều còn hạn kiểm định an toàn PCCC từ 2 đến 5 năm, tuyệt đối không xuất bình quá hạn.'
      ]
    },
    faqs: [
      ['Kỹ sư dầu khí cần xuất hóa đơn VAT điện tử có được không?', 'Ngọc Gas cung cấp đầy đủ hóa đơn GTGT điện tử hợp pháp gửi qua email ngay sau khi hoàn tất giao hàng.'],
      ['Bình gas Sopet Gas One vỏ xám Nhật Bản có những kích cỡ nào?', 'Ngọc Gas cung cấp dòng Sopet Gas One bình 12kg van ngang POL và van chụp Compact cao cấp, đầy đủ tem kiểm định và bảo hiểm an toàn.'],
      ['Giao gas vào các hẻm đường 30/4 có tính phụ phí không?', 'Ngọc Gas miễn phí 100% công vận chuyển và kiểm tra an toàn hệ thống bếp gas tận nơi tại Phường 9 Vũng Tàu.']
    ]
  },

  {
    id: 145,
    slug: 'giao-gas-phuong-10-vung-tau',
    ward: 'Phường 10',
    city: 'TP. Vũng Tàu',
    title: 'Đổi Bình Gas Phường 10 (TP. Vũng Tàu) — KĐT Chí Linh & Chung Cư DIC Phoenix',
    summary: 'Đại lý giao gas chính hãng Phường 10 (TP. Vũng Tàu). Cung cấp Sopet Gas One, Luxen Gas, Phoenix Gas đủ 4 màu vỏ xám, đỏ, xanh, vàng. Giao hỏa tốc 15 phút KĐT Chí Linh, Cụm chung cư DIC Phoenix, Gateway, Seaview, Bãi tắm Thủy Tiên, Biệt thự Thanh Bình. Cân đủ 12kg tại bếp, van tự ngắt căn hộ, ngọn lửa xanh cực đại. Hotline 1900 9396.',
    subArea: 'đại đô thị chung cư cao tầng hiện đại và quần thể biệt thự nghỉ dưỡng ven biển Thủy Tiên',
    landmarks: 'Khu đô thị kiểu mẫu Chí Linh rộng lớn, Cụm chung cư DIC Phoenix, Vũng Tàu Gateway, Seaview 1-2-4, Bãi tắm Thủy Tiên hoang sơ thơ mộng, Làng biệt thự Thanh Bình, trục đường Nguyễn Hữu Cảnh, đường 3/2 (51C)',
    introP1: 'Là khu đô thị mới hiện đại và có quy mô dân số chung cư lớn nhất thành phố biển Vũng Tàu, Phường 10 nổi bật với Đại đô thị kiểu mẫu Chí Linh, quần thể các tòa tháp chung cư cao cấp DIC Phoenix view hồ Bàu Trũng, Vũng Tàu Gateway, chuỗi chung cư Seaview, Làng biệt thự ven biển Thanh Bình và bãi biển Thủy Tiên xanh ngắt sóng vỗ.',
    challenges: [
      'Quy định PCCC nhà cao tầng và an ninh sảnh chung cư cực kỳ khắt khe: Thợ giao gas phải có thẻ nhân viên, đồng phục chuẩn mực, mang bọc giày bảo vệ sàn gỗ căn hộ cao tầng.',
      'Căn hộ chung cư khép kín phòng máy lạnh view biển: Yêu cầu bình gas phải có van chụp Compact tự ngắt an toàn tức thì khi có biến thiên áp suất để phòng ngừa rò rỉ khí gas.',
      'Gió biển Thủy Tiên mang hơi ẩm mặn cao: Đòi hỏi vỏ bình gas phải được mạ kẽm sơn tĩnh điện công nghệ Nhật Bản JIS G3116 chống rỉ sét đáy bình.'
    ],
    techTable: {
      header: 'Tiêu Chuẩn Van Tự Ngắt Cho Căn Hộ Chung Cư DIC Phoenix Phường 10',
      colBad: 'Bình Gas Tạp Trôi Nổi Không Thương Hiệu',
      colGood: 'Chuẩn Bình Gas Ngọc Gas Tại Phường 10',
      rows: [
        ['Cơ chế van chụp tự ngắt', 'Van thủ công không tự khóa khi đứt dây dẫn', 'Van Compact Nhật Bản ngắt gas tự động trong 0.5 giây khi tuột dây'],
        ['Kháng hơi nước biển Thủy Tiên', 'Sơn xịt sơ sài, đáy bình mục rỉ chỉ sau 2 tháng', 'Thép SG255 sơn tĩnh điện 2 lớp chống ăn mòn ẩm biển 100%'],
        ['Quy trình bọc giày khi vào căn hộ', 'Đi giày bẩn đạp lên thảm và sàn gỗ căn hộ', '100% thợ mang bọc giày sạch sẽ, có thảm lót cao su bảo vệ sàn'],
        ['Khối lượng khí cân thực tế', 'Bị bớt 2.0kg - 2.5kg, giao gas không có cân', 'Cân điện tử số đối chứng tận mắt: Đủ 12.0kg gas ± 0.1kg']
      ]
    },
    guide: {
      title: 'Xử Lý Khẩn Cấp Khi Ngửi Thấy Mùi Gas Trong Căn Hộ Chung Cư View Biển Khép Kín',
      intro: 'Tại các căn hộ chung cư cao tầng DIC Phoenix hoặc Gateway có phòng khách liền bếp máy lạnh, quy trình xử lý khẩn cấp gồm:',
      steps: [
        'Khóa van bình gas ngay lập tức: Gạt chốt van chụp Compact xuống vị trí khóa hoặc xoay núm van ren theo chiều kim đồng hồ.',
        'Mở toang cửa ban công và cửa sổ phòng khách: Tạo gió đối lưu đẩy khí gas thoát ra ngoài hướng biển. Tuyệt đối không bật quạt máy hay quạt hút mùi.',
        'TUYỆT ĐỐI KHÔNG BẬT TẮT THIẾT BỊ ĐIỆN: Không chạm vào công tắc đèn, không rút cắm phích điện, không dùng bật lửa hay điện thoại trong gian bếp.',
        'Gọi ngay tổng đài Ngọc Gas: Bấm số 1900 9396 để thợ kỹ thuật có mặt sau 10 phút xử lý an toàn bằng máy dò khí chuyên dụng.'
      ]
    },
    faqs: [
      ['Giao gas lên các tầng cao chung cư DIC Phoenix có phụ thu phí thang máy không?', 'Ngọc Gas miễn phí 100% công vận chuyển lên tận căn hộ tầng cao tại tất cả các tòa chung cư trên địa bàn Phường 10 Vũng Tàu.'],
      ['Đang nấu cơm chiều bị hết gas thì gọi bao lâu có hàng?', 'Nhờ trạm điều phối cắm chốt ngay KĐT Chí Linh, nhân viên giao gas Ngọc Gas cam kết có mặt tại nhà quý khách chỉ sau 10 đến 15 phút.'],
      ['Tôi muốn đổi từ vỏ màu đỏ sang vỏ xám Sopet Gas One được không?', 'Hoàn toàn được! Ngọc Gas hỗ trợ đổi ngang miễn phí giữa 4 màu sắc vỏ bình xám, đỏ, xanh, vàng mà không yêu cầu đóng thêm tiền đặt cọc.']
    ]
  },

  {
    id: 146,
    slug: 'giao-gas-phuong-11-vung-tau',
    ward: 'Phường 11',
    city: 'TP. Vũng Tàu',
    title: 'Đổi Bình Gas Phường 11 (TP. Vũng Tàu) — KĐT Bắc Vũng Tàu & Trục Đại Lộ 2/9',
    summary: 'Đại lý giao gas chính hãng Phường 11 (TP. Vũng Tàu). Cung cấp Sopet Gas One, Luxen Gas, Phoenix Gas đủ 4 màu vỏ xám, đỏ, xanh, vàng. Giao hỏa tốc 15 phút KĐT Bắc Vũng Tàu, Đại lộ 2/9, Đô Lương, cụm kho bãi logistic, đường 30/4. Cân đủ 12kg tại bếp, van tự ngắt, ngọn lửa xanh cực đại. Hotline 1900 9396.',
    subArea: 'khu đô thị mở rộng phía Bắc, đầu mối kho bãi logistic và dân cư phát triển nhanh',
    landmarks: 'Khu đô thị Bắc Vũng Tàu, trục đại lộ 2/9 (đường 51B cũ) rộng thênh thang, đường Đô Lương, cụm kho bãi hậu cần logistic, đường 30/4, KDC Cát Lái Phước Cơ, Chợ Phường 11',
    introP1: 'Nằm trong quy hoạch mở rộng không gian đô thị của thành phố biển Vũng Tàu, Phường 11 sở hữu hạ tầng giao thông hiện đại với trục đại lộ 2/9 rộng 6 làn xe, đường Đô Lương kết nối cụm kho bãi hậu cần logistic, các khu dân cư mới phân lô khang trang cùng nhịp sống sản xuất kinh doanh sôi động.',
    challenges: [
      'Nhu cầu năng lượng đa dạng từ sinh hoạt gia đình đến kho xưởng chế biến: Cần cung ứng cả bình gas công nghiệp 45kg và bình dân dụng 12kg với áp suất dòng khí ổn định.',
      'Địa bàn rộng lớn với các trục đại lộ thênh thang: Đòi hỏi đơn vị giao gas có phương tiện cơ động nhanh chóng để giao hàng trong 15 phút đúng hẹn.',
      'Yêu cầu bình gas đủ cân đối chứng: Khách hàng yêu cầu thợ giao gas mang theo cân điện tử kiểm tra tận mắt, tránh tình trạng gian lận khí gas.'
    ],
    techTable: {
      header: 'Tiêu Chuẩn Năng Lượng Cho Kho Xưởng & Dân Cư Phường 11',
      colBad: 'Bình Gas Tạp Trôi Nổi Không Nhãn Mác',
      colGood: 'Chuẩn Khí Sạch Ngọc Gas Tại Phường 11',
      rows: [
        ['Độ ổn định áp suất dòng khí', 'Tụt áp nhanh, lửa phập phù khi bình còn 1/3', 'Áp suất phun duy trì ổn định đến giọt gas cuối cùng'],
        ['Nhiệt trị ngọn lửa đun nấu', 'Dưới 9.500 kcal/kg, lửa vàng yếu làm hao gas', 'Đạt chuẩn 11.800 kcal/kg, lửa xanh gom nhiệt nấu cực nhanh'],
        ['Trọng lượng kiểm chứng tại bếp', 'Hụt từ 2.0kg đến 2.8kg mỗi bình 12kg', 'Cân điện tử số đối chứng tận mắt đủ 12.0kg ± 0.1kg'],
        ['Bảo hiểm PCCC sản phẩm', 'Không có bảo hiểm, rủi ro cao', 'Có bảo hiểm trách nhiệm sản phẩm theo quy chuẩn PCCC pháp luật']
      ]
    },
    guide: {
      title: 'Đo Lượng Gas Lỏng Còn Lại Bằng Khăn Ấm Không Cần Lắc Bình',
      intro: 'Nhiều người tại Phường 11 có thói quen lắc mạnh bình gas khi thấy lửa yếu, điều này rất nguy hiểm. Kỹ thuật viên hướng dẫn phương pháp an toàn:',
      steps: [
        'Chuẩn bị một chiếc khăn bông thấm nước ấm: Nhúng khăn vào nước ấm khoảng 40 - 50°C, vắt nhẹ cho ráo nước.',
        'Áp khăn ấm vuốt dọc thân bình: Lau khăn ấm quanh chu vi thân bình kim loại từ trên cổ bình xuống tận đáy trong 15 giây rồi lấy khăn ra.',
        'Dùng lòng bàn tay sờ chậm rãi từ trên xuống dưới: Phần thân bình phía trên chứa khí gas dạng hơi sẽ nhanh chóng ấm lên theo nhiệt độ của khăn.',
        'Xác định ranh giới ngưng tụ hơi lạnh: Phần thân bình phía dưới còn chứa gas lỏng sẽ hấp thu nhiệt cực mạnh, sờ vào thấy mát lạnh rõ rệt và có hơi ẩm đọng sương li ti. Đường ranh giới phân tách giữa phần ấm và phần lạnh chính là mức gas lỏng thực tế còn lại.'
      ]
    },
    faqs: [
      ['Kho xưởng tại Phường 11 lấy gas 45kg có xuất hóa đơn VAT không?', 'Ngọc Gas cung cấp đầy đủ hóa đơn GTGT điện tử hợp pháp, chứng chỉ kiểm định an toàn và bảo hiểm PCCC đầy đủ.'],
      ['Bình gas giao đến có được cân đối chứng không?', '100% nhân viên giao gas Ngọc Gas luôn mang theo cân điện tử kiểm định, đặt bình gas lên cân trước sự chứng kiến của khách hàng để đối chứng đủ 12kg gas nguyên chất.'],
      ['Tôi đang có vỏ bình màu vàng có đổi sang màu đỏ hoặc xanh được không?', 'Được đổi ngang miễn phí! Ngọc Gas hỗ trợ chuyển đổi linh hoạt giữa 4 màu sắc vỏ bình xám, đỏ, xanh, vàng mà không yêu cầu đóng thêm bất kỳ chi phí cược vỏ nào.']
    ]
  },

  {
    id: 147,
    slug: 'giao-gas-phuong-12-vung-tau',
    ward: 'Phường 12',
    city: 'TP. Vũng Tàu',
    title: 'Đổi Bình Gas Phường 12 (TP. Vũng Tàu) — Cửa Ngõ Cầu Cỏ May & Quốc Lộ 51',
    summary: 'Đại lý giao gas chính hãng Phường 12 (TP. Vũng Tàu). Cung cấp Sopet Gas One, Luxen Gas, Phoenix Gas đủ 4 màu vỏ xám, đỏ, xanh, vàng. Giao hỏa tốc 15 phút Cửa ngõ Cầu Cỏ May, Quốc Lộ 51, KDC Phước Thắng, trạm trung chuyển hải sản, đường Đô Lương. Cân đủ 12kg tại bếp, van tự ngắt, ngọn lửa xanh cực đại. Hotline 1900 9396.',
    subArea: 'cửa ngõ giao thông kết nối huyết mạch TP.HCM - Vũng Tàu và vựa hải sản trung chuyển',
    landmarks: 'Cửa ngõ thành phố biển chân Cầu Cỏ May, trục đại lộ Quốc Lộ 51, Khu dân cư Phước Thắng, trạm dừng chân du lịch, cụm vựa thu mua sơ chế hải sản xuất khẩu, đường Chi Lăng, Đô Lương',
    introP1: 'Tọa lạc tại cửa ngõ phía Bắc nơi huyết mạch Quốc Lộ 51 vượt qua dòng sông Cỏ May tiến vào thành phố biển, Phường 12 là đầu mối giao thông trung chuyển quan trọng bậc nhất của Vũng Tàu với Cầu Cỏ May biểu tượng cánh chim hải âu, Khu dân cư Phước Thắng trù phú cùng chuỗi vựa thu mua, sơ chế và đóng thùng hải sản tươi sống đi khắp các tỉnh miền Đông.',
    challenges: [
      'Các cơ sở sơ chế hấp hải sản hoạt động liên tục ngày đêm: Cần nguồn gas công suất cao, áp suất dòng khí dồi dào để hấp tôm mực giữ trọn độ tươi ngọt trước khi cấp đông vận chuyển.',
      'Gió mặn cửa sông Cỏ May có độ ẩm và nồng độ muối cao: Vỏ bình gas cần công nghệ mạ kẽm sơn tĩnh điện chống ăn mòn điện hóa.',
      'Giao gas hỏa tốc cho các trạm dừng chân và nhà hàng cửa ngõ: Đội thợ giao gas túc trực liên tục phục vụ các đoàn khách du lịch dừng chân ăn uống.'
    ],
    techTable: {
      header: 'Tiêu Chuẩn Năng Lượng Cửa Ngõ Cầu Cỏ May Phường 12',
      colBad: 'Bình Gas Tạp Rỉ Sét Cửa Sông',
      colGood: 'Chuẩn Gas Kháng Mặn Ngọc Gas Tại Phường 12',
      rows: [
        ['Kháng ăn mòn hơi muối sông biển', 'Vỏ rỉ mục chân đế sau vài tuần gió mặn', 'Mạ kẽm nhúng nóng phủ sơn tĩnh điện tiêu chuẩn JIS G3116'],
        ['Nhiệt lượng ngọn lửa hấp sơ chế', 'Lửa yếu làm chín lâu thớ thịt hải sản', 'Lửa xanh cực đại 1.900°C hấp chín nhanh giữ độ giòn ngọt'],
        ['Trọng lượng khí cân đối chứng', 'Hụt từ 2.0kg đến 2.8kg mỗi bình', 'Cân điện tử số đối chứng đủ 12.0kg ± 0.1kg tại bếp'],
        ['Tốc độ phục vụ cửa ngõ QL51', 'Trễ hẹn hàng tiếng do đường xa', 'Trạm cắm chốt cửa ngõ giao hỏa tốc trong 15 phút']
      ]
    },
    guide: {
      title: 'Bảo Dưỡng Cổ Van Và Gioăng Cao Su Chống Oxy Hóa Hơi Muối Cửa Biển',
      intro: 'Tại khu vực cửa sông Cỏ May Phường 12, hơi muối mặn dễ làm gioăng cao su van gas bị chai cứng gây rò rỉ:',
      steps: [
        'Khóa van bình gas và tháo van điều áp: Để bếp nguội hẳn, tháo cụm van điều áp ra khỏi cổ bình.',
        'Kiểm tra vòng đệm cao su O-ring: Nếu thấy gioăng cao su bị bám muối trắng mờ hoặc bị cứng nứt, gioăng đã giảm khả năng làm kín.',
        'Lau sạch muối mặn và bôi một lớp mỏng dầu silicon: Dùng khăn khô lau sạch tinh thể muối bám quanh ren đồng và gioăng cao su.',
        'Thay gioăng cao su NBR chịu mặn mới: Kỹ thuật viên Ngọc Gas luôn hỗ trợ thay mới gioăng cao su NBR chuyên dụng chịu mặn miễn phí cho khách hàng.'
      ]
    },
    faqs: [
      ['Vựa hải sản lấy số lượng nhiều bình gas có được hỗ trợ giá sỉ không?', 'Ngọc Gas có chính sách chiết khấu giá sỉ ưu đãi và hỗ trợ mượn vỏ bình miễn phí cho các cơ sở kinh doanh hải sản tại Phường 12.'],
      ['Bình gas có được kiểm tra rò rỉ trước khi bàn giao không?', '100% bình gas giao tới đều được quét bọt xà phòng kiểm tra độ kín khớp nối trước sự chứng kiến của khách hàng.'],
      ['Giao gas vào các đường nhánh gần Cầu Cỏ May có tính phụ phí không?', 'Ngọc Gas miễn phí 100% công vận chuyển và lắp đặt tận bếp trên toàn địa bàn Phường 12 Vũng Tàu.']
    ]
  },

  {
    id: 148,
    slug: 'giao-gas-phuong-thang-nhat',
    ward: 'Phường Thắng Nhất',
    city: 'TP. Vũng Tàu',
    title: 'Đổi Bình Gas Phường Thắng Nhất (TP. Vũng Tàu) — KCN Đông Xuyên & Cảng PTSC',
    summary: 'Đại lý giao gas chính hãng Phường Thắng Nhất (TP. Vũng Tàu). Cung cấp Sopet Gas One, Luxen Gas, Phoenix Gas đủ 4 màu vỏ xám, đỏ, xanh, vàng. Giao hỏa tốc 15 phút KCN Đông Xuyên, Cảng dịch vụ dầu khí PTSC, đường 30/4, Chợ Thắng Nhất. Cân đủ 12kg tại bếp, van tự ngắt, ngọn lửa xanh cực đại. Hotline 1900 9396.',
    subArea: 'trung tâm công nghiệp cơ khí đóng tàu và cảng biển dịch vụ kỹ thuật dầu khí PTSC',
    landmarks: 'Khu công nghiệp Đông Xuyên, Cụm cảng dịch vụ kỹ thuật dầu khí PTSC, trục đại lộ 30/4, Chợ Thắng Nhất, khu lưu trú công nhân và kỹ sư đóng tàu, đường Thi Sách, Tiền Cảng',
    introP1: 'Là trung tâm công nghiệp cơ khí đóng tàu và dịch vụ kỹ thuật dầu khí quy mô lớn nhất thành phố biển Vũng Tàu, Phường Thắng Nhất sở hữu Khu công nghiệp Đông Xuyên sầm uất, Cụm cảng nước sâu PTSC phục vụ các giàn khoan khai thác dầu khí ngoài khơi, trục đại lộ 30/4 cùng cộng đồng hàng vạn kỹ sư, công nhân kỹ thuật sinh sống.',
    challenges: [
      'Cung ứng bình gas công nghiệp 45kg phục vụ bếp ăn tập thể hàng ngàn công nhân: Đòi hỏi nguồn cung dồi dào, áp suất dòng khí liên tục và tiêu chuẩn an toàn PCCC khắt khe.',
      'Giao gas ca kíp sau giờ làm việc xưởng đóng tàu: Phục vụ nhanh chóng cho các dãy nhà trọ công nhân sau 17h30 chiều và ca đêm.',
      'Yêu cầu hóa đơn chứng từ VAT và chứng chỉ an toàn PCCC đầy đủ: Phục vụ các nhà máy, xí nghiệp trong KCN Đông Xuyên.'
    ],
    techTable: {
      header: 'Tiêu Chuẩn Năng Lượng Cho KCN Đông Xuyên & Bếp Ăn Công Nhân',
      colBad: 'Bình Gas Tạp Không Rõ Nguồn Gốc',
      colGood: 'Chuẩn Năng Lượng Công Nghiệp Ngọc Gas Phường Thắng Nhất',
      rows: [
        ['Áp suất giàn góp công nghiệp 45kg', 'Tụt áp nhanh, không đủ cấp cho 10 bếp khè', 'Duy trì áp suất ổn định cấp đồng thời cho toàn bộ giàn bếp'],
        ['Hóa đơn GTGT và chứng từ pháp lý', 'Không xuất được VAT, né tránh pháp luật', 'Xuất đầy đủ hóa đơn điện tử VAT hợp pháp trong ngày'],
        ['Định lượng khí cân điện tử', 'Hụt từ 2.0kg đến 4.0kg mỗi bình công nghiệp', 'Cân đối chứng chuẩn xác 45.0kg ± 0.2kg tại chân giàn'],
        ['Chế độ bảo dưỡng PCCC định kỳ', 'Không bảo dưỡng hệ thống', 'Bảo dưỡng van điều áp và kiểm tra đường ống định kỳ miễn phí']
      ]
    },
    guide: {
      title: 'Quy Tắc An Toàn Khi Vận Hành Giàn Góp Bình Gas Công Nghiệp 45kg',
      intro: 'Tại các bếp ăn tập thể xưởng đóng tàu KCN Đông Xuyên, vận hành giàn góp gas cần tuân thủ nghiêm ngặt:',
      steps: [
        'Bố trí trạm bình gas riêng biệt ngoài trời có mái che thông thoáng: Tuyệt đối không đặt bình gas 45kg trong không gian bếp kín ngầm dưới lòng đất.',
        'Lắp đặt van điều áp trung áp có đồng hồ đo: Giúp đầu bếp theo dõi chính xác áp lực dòng khí cấp vào giàn bếp khè.',
        'Sử dụng van ngắt khẩn cấp (Emergency Shut-off Valve): Đặt nút ngắt khẩn cấp ngay cửa ra vào gian bếp để có thể khóa toàn bộ nguồn gas chỉ bằng một thao tác ấn khi có sự cố.',
        'Định kỳ kiểm tra rò rỉ đường ống góp bằng dung dịch bọt: Kiểm tra toàn bộ mối hàn, cút nối và van chặn định kỳ mỗi tuần một lần.'
      ]
    },
    faqs: [
      ['Xí nghiệp trong KCN Đông Xuyên lấy gas 45kg có được hỗ trợ lắp đặt giàn góp không?', 'Ngọc Gas hỗ trợ khảo sát, tư vấn thiết kế và thi công hệ thống giàn góp gas công nghiệp đạt chuẩn PCCC hoàn toàn miễn phí cho doanh nghiệp.'],
      ['Công nhân ở trọ tại Thắng Nhất gọi gas ca tối có giao không?', 'Ngọc Gas phục vụ liên tục đến 22h00 đêm mỗi ngày, cam kết giao hỏa tốc 15 phút đúng giá niêm yết ban ngày.'],
      ['Bình gas có đầy đủ tem kiểm định và bảo hiểm không?', '100% bình gas tại Ngọc Gas đều có tem kiểm định an toàn PCCC còn hiệu lực và bảo hiểm trách nhiệm sản phẩm theo quy định pháp luật.']
    ]
  },

  {
    id: 149,
    slug: 'giao-gas-phuong-thang-nhi',
    ward: 'Phường Thắng Nhì',
    city: 'TP. Vũng Tàu',
    title: 'Đổi Bình Gas Phường Thắng Nhì (TP. Vũng Tàu) — Chợ Thắng Nhì & Trục Trần Hưng Đạo',
    summary: 'Đại lý giao gas chính hãng Phường Thắng Nhì (TP. Vũng Tàu). Cung cấp Sopet Gas One, Luxen Gas, Phoenix Gas đủ 4 màu vỏ xám, đỏ, xanh, vàng. Giao hỏa tốc 15 phút Chợ Thắng Nhì, đường Trần Hưng Đạo, Nguyễn An Ninh, Đình thần Thắng Nhì, Lê Lợi. Cân đủ 12kg tại bếp, van tự ngắt, ngọn lửa xanh cực đại. Hotline 1900 9396.',
    subArea: 'đô thị cổ truyền thống, vùng đất địa linh nhân kiệt và di tích lịch sử lâu đời',
    landmarks: 'Chợ Thắng Nhì lâu đời sầm uất, trục đường Trần Hưng Đạo, đường Nguyễn An Ninh, Di tích lịch sử Đình thần Thắng Nhì hơn 200 năm tuổi, đường Lê Lợi, Hẻm phố cổ Thắng Nhì',
    introP1: 'Là một trong ba làng Thắng cổ xưa kiến tạo nên thành phố Vũng Tàu, Phường Thắng Nhì là vùng đất địa linh nhân kiệt với di tích lịch sử Đình thần Thắng Nhì hơn 2 thế kỷ lưu giữ nét văn hóa thờ cúng cá Ông và các bậc tiền hiền khai hoang, đan xen cùng nhịp sống phố thị nhộn nhịp quanh Chợ Thắng Nhì và trục đại lộ Trần Hưng Đạo.',
    challenges: [
      'Nhiều gia đình người lớn tuổi sinh sống trong các khu phố cổ: Cần sự an tâm tuyệt đối, thái độ phục vụ lễ phép, cân đủ ký và hỗ trợ kiểm tra an toàn bếp gas tận tình.',
      'Nhà phố liền kề hẻm sâu, chuột bọ cắn phá dây dẫn: Cần dây dẫn gas bọc lưới thép inox 304 chống chuột cắn và van tự ngắt phòng chống hỏa hoạn.',
      'Tiểu thương buôn bán tại Chợ Thắng Nhì cần giao gas hỏa tốc: Không để việc nấu nướng của gia đình và tiệm ăn bị gián đoạn.'
    ],
    techTable: {
      header: 'Tiêu Chuẩn Phục Vụ Tận Tâm Cho Khu Phố Cổ Phường Thắng Nhì',
      colBad: 'Cơ Sở Giao Gas Nhỏ Lẻ Cẩu Thả',
      colGood: 'Quy Chuẩn Tận Tâm Ngọc Gas Phường Thắng Nhì',
      rows: [
        ['Thái độ phục vụ người lớn tuổi', 'Gắt gỏng, vội vã, không kiểm tra bếp', 'Lễ phép, ân cần, kiểm tra bảo dưỡng bếp gas chu đáo'],
        ['Bảo vệ ống mềm chống chuột cắn', 'Dây cao su mỏng bị chuột gặm thủng xì gas', 'Tặng ống dẫn bọc lưới sợi Inox 304 chống chuột cắn 100%'],
        ['Khối lượng khí cân tại bếp', 'Hụt từ 2.0kg đến 2.5kg mỗi bình', 'Cân điện tử số đối chứng đủ 12.0kg ± 0.1kg tại bếp'],
        ['Tác phong vệ sinh khi vào nhà', 'Đi dép bẩn làm dơ nhà gia chủ', 'Mang bọc giày vải sạch sẽ, trải thảm bảo vệ sàn nhà']
      ]
    },
    guide: {
      title: 'Các Bước Kiểm Tra Nhanh Rò Rỉ Gas Bằng Thính Giác Và Khứu Giác',
      intro: 'Đối với các cô bác lớn tuổi tại Thắng Nhì, nhận biết mùi gas rò rỉ bằng giác quan là kỹ năng quan trọng:',
      steps: [
        'Nhận biết mùi Ethyl Mercaptan đặc trưng: Khí gas được pha chất tạo mùi có mùi hôi nồng giống mùi trứng thối hoặc bắp cải luộc thiu; nếu ngửi thấy mùi này trong bếp hãy cẩn trọng ngay.',
        'Lắng nghe tiếng xì khí gas: Áp tai gần cổ van và đường ống dẫn; nếu nghe tiếng "xì xì" nhỏ, đó là luồng khí đang thoát ra ngoài qua khe hở.',
        'Khóa van bình gas ngay lập tức: Xoay núm van theo chiều kim đồng hồ để ngắt nguồn khí.',
        'Không bật quẹt diêm hay công tắc đèn: Mở toang cửa chính và cửa sổ cho thoáng khí, sau đó gọi số 1900 9396 để thợ kỹ thuật Ngọc Gas đến xử lý an toàn.'
      ]
    },
    faqs: [
      ['Người lớn tuổi ở nhà một mình có được nhân viên hỗ trợ kiểm tra bếp không?', '100% nhân viên Ngọc Gas khi giao gas đều hỗ trợ cọ rửa mâm đồng, kiểm tra dây dẫn và rà soát độ kín van gas hoàn toàn miễn phí.'],
      ['Đổi vỏ bình gas màu xanh sang màu xám Sopet Gas One có mất tiền cọc không?', 'Hoàn toàn không! Ngọc Gas hỗ trợ đổi vỏ ngang miễn phí giữa 4 màu sắc xám, đỏ, xanh, vàng mà không yêu cầu đóng thêm tiền đặt cọc.'],
      ['Giao gas vào các hẻm đường Trần Hưng Đạo có tính thêm phí vận chuyển không?', 'Ngọc Gas miễn phí 100% công vận chuyển và lắp đặt tận bếp trên toàn địa bàn Phường Thắng Nhì Vũng Tàu.']
    ]
  },

  {
    id: 150,
    slug: 'giao-gas-phuong-thang-tam',
    ward: 'Phường Thắng Tam',
    city: 'TP. Vũng Tàu',
    title: 'Đổi Bình Gas Phường Thắng Tam (TP. Vũng Tàu) — Bãi Sau Thùy Vân & Đình Thần Thắng Tam',
    summary: 'Đại lý giao gas chính hãng Phường Thắng Tam (TP. Vũng Tàu). Cung cấp Sopet Gas One, Luxen Gas, Phoenix Gas đủ 4 màu vỏ xám, đỏ, xanh, vàng. Giao hỏa tốc 15 phút Bãi Sau Thùy Vân, Quảng trường Cột Cờ, Đình Thần Thắng Tam, Lăng Ông Nam Hải, Hoàng Hoa Thám. Cân đủ 12kg tại bếp, van tự ngắt, ngọn lửa xanh cực đại. Hotline 1900 9396.',
    subArea: 'thủ phủ du lịch biển Bãi Sau, quần thể di tích tâm linh quốc gia và trung tâm lễ hội thành phố',
    landmarks: 'Bãi Sau đường Thùy Vân trải dài cát trắng sóng vỗ, Quảng trường Cột Cờ trung tâm lễ hội, Di tích Lịch sử Văn hóa Quốc gia Đình Thần Thắng Tam, Miếu Bà Ngũ Hành, Lăng Ông Nam Hải, trục đường Hoàng Hoa Thám, Phan Chu Trinh',
    introP1: 'Là trái tim du lịch biển phồn hoa và sôi động bậc nhất thành phố Vũng Tàu, Phường Thắng Tam sở hữu bãi tắm Thùy Vân (Bãi Sau) dài thoai thoải thu hút hàng triệu lượt du khách mỗi năm, Quảng trường Cột Cờ biểu tượng thành phố, quần thể Di tích Lịch sử Văn hóa Quốc gia Đình Thần Thắng Tam linh thiêng cùng chuỗi khách sạn, resort, nhà hàng hải sản san sát.',
    challenges: [
      'Công suất phục vụ ẩm thực du lịch bùng nổ cuối tuần và các dịp lễ hội: Hàng trăm nhà hàng nướng BBQ, lẩu hải sản đường Thùy Vân, Hoàng Hoa Thám cần nguồn gas hỏa tốc, không để thiếu gas giờ cao điểm.',
      'Gió biển Bãi Sau mang nồng độ muối NaCl và hơi ẩm cực cao: Vỏ bình gas cần công nghệ mạ kẽm sơn tĩnh điện chống oxy hóa gỉ sét.',
      'Tiêu chuẩn an toàn PCCC khắt khe của ngành du lịch khách sạn: Bình gas chính hãng có van Compact tự ngắt an toàn và bảo hiểm PCCC đầy đủ.'
    ],
    techTable: {
      header: 'Tiêu Chuẩn Phục Vụ Hỏa Tốc Cho Phố Biển Du Lịch Bãi Sau Thắng Tam',
      colBad: 'Đại Lý Gas Nhỏ Lẻ Hay Cháy Hàng',
      colGood: 'Chuẩn Năng Lượng Du Lịch Ngọc Gas Tại Thắng Tam',
      rows: [
        ['Khả năng đáp ứng giờ cao điểm thứ 7, CN', 'Cháy hàng, tắt máy không giao', 'Trực chiến 100% quân số, giao hỏa tốc trong 15 phút'],
        ['Nhiệt lượng ngọn lửa nướng lẩu hải sản', 'Lửa đỏ khói than làm dai tôm mực', 'Lửa xanh cực đại 11.800 kcal/kg giữ trọn vị ngọt tươi'],
        ['Chống ăn mòn muối biển Thùy Vân', 'Vỏ rỉ sét loang lổ sau 2 tuần', 'Mạ kẽm sơn tĩnh điện chuẩn JIS G3116 Nhật Bản'],
        ['Định lượng khí cân điện tử', 'Hụt từ 2.0kg đến 2.8kg mỗi bình', 'Cân điện tử số đối chứng đủ 12.0kg ± 0.1kg tại bếp']
      ]
    },
    guide: {
      title: 'Mẹo Chống Nghẹt Béc Đồng Khi Mỡ Hành Nướng Hải Sản Chảy Vào Họng Bếp',
      intro: 'Tại các quán nướng hải sản Bãi Sau Thắng Tam, mỡ hành và gia vị nướng chảy vào khe chia lửa thường làm nghẹt béc phun:',
      steps: [
        'Vệ sinh ngay sau mỗi ca nướng tiệc: Khi mâm đồng còn hơi ấm, dùng khăn vải lau sạch lớp mỡ hành bám ngoài bề mặt mâm chia lửa.',
        'Dùng sợi dây đồng nhỏ thông lỗ kim phun: Tuyệt đối không dùng tăm tre vì dễ gãy thụt vào trong béc; dùng sợi dây đồng luồn nhẹ nhàng thông sạch lỗ phun mỡ.',
        'Sấy khô mâm đồng trước khi lắp lại: Đảm bảo các khe rãnh chia lửa khô ráo hoàn toàn để tia lửa điện bắt cháy đều.',
        'Sử dụng vỉ nướng có khay hứng mỡ chuyên dụng: Giúp ngăn mỡ chảy tràn trực tiếp vào họng đốt của bếp gas.'
      ]
    },
    faqs: [
      ['Khách sạn và nhà hàng Bãi Sau lấy số lượng nhiều bình gas có được giá sỉ không?', 'Ngọc Gas cung cấp chính sách chiết khấu giá sỉ ưu đãi và hỗ trợ mượn vỏ bình miễn phí cho các cơ sở kinh doanh du lịch tại Thắng Tam.'],
      ['Tối thứ Bảy đông khách gọi gas gấp khoảng bao lâu có?', 'Đội xe giao gas Ngọc Gas túc trực ngay tại Bãi Sau Thùy Vân, cam kết giao hỏa tốc tận bếp chỉ sau 10 đến 15 phút.'],
      ['Tôi muốn đổi từ vỏ màu đỏ sang vỏ xám Sopet Gas One được không?', 'Hoàn toàn được! Ngọc Gas hỗ trợ đổi vỏ ngang miễn phí giữa 4 màu sắc vỏ bình xám, đỏ, xanh, vàng mà không yêu cầu đóng thêm tiền đặt cọc.']
    ]
  },

  {
    id: 151,
    slug: 'giao-gas-phuong-rach-dua',
    ward: 'Phường Rạch Dừa',
    city: 'TP. Vũng Tàu',
    title: 'Đổi Bình Gas Phường Rạch Dừa (TP. Vũng Tàu) — KCN Rạch Dừa & Chợ Rạch Dừa',
    summary: 'Đại lý giao gas chính hãng Phường Rạch Dừa (TP. Vũng Tàu). Cung cấp Sopet Gas One, Luxen Gas, Phoenix Gas đủ 4 màu vỏ xám, đỏ, xanh, vàng. Giao hỏa tốc 15 phút KCN Rạch Dừa, Chợ Rạch Dừa, ngã tư Nơ Trang Long, đường 30/4, KDC Rạch Dừa. Cân đủ 12kg tại bếp, van tự ngắt, ngọn lửa xanh cực đại. Hotline 1900 9396.',
    subArea: 'trung tâm công nghiệp chế biến thủy sản, dệt may và khu phố chợ công nhân sầm uất',
    landmarks: 'Khu công nghiệp Rạch Dừa, Chợ Rạch Dừa sầm uất đông đúc, ngã tư Nơ Trang Long - đường 30/4, Trường THPT Nguyễn Huệ, Khu dân cư công nhân Rạch Dừa, đường Bình Giã nối dài',
    introP1: 'Được biết đến là một trong những trung tâm sản xuất công nghiệp và chế biến thủy sản xuất khẩu năng động của thành phố biển Vũng Tàu, Phường Rạch Dừa sở hữu Khu công nghiệp Rạch Dừa tập trung hàng chục nhà máy may mặc, thủy sản, khu Chợ Rạch Dừa tấp nập cùng nhịp sống sôi nổi của hàng vạn gia đình công nhân và người lao động.',
    challenges: [
      'Gia đình công nhân ở trọ cần nguồn gas chính hãng giá tốt: Tiết kiệm tối đa chi phí sinh hoạt, bình gas đủ cân 12kg kiểm tra tận mắt để không bị gian lận.',
      'Phục vụ ca kíp linh hoạt: Đổi bình gas sau giờ tan ca chiều 17h30 và buổi tối muộn khi công nhân tăng ca về cần nấu cơm ngay.',
      'An toàn PCCC phòng trọ chật hẹp: Đòi hỏi ống dẫn gas bọc lưới thép inox chống chuột cắn và van tự ngắt nhạy cảm.'
    ],
    techTable: {
      header: 'Tiêu Chuẩn Năng Lượng Tiết Kiệm & An Toàn Cho Công Nhân Phường Rạch Dừa',
      colBad: 'Bình Gas Dạo Vỉa Hè Sang Chiết Lậu',
      colGood: 'Chuẩn Gas Sạch Tiết Kiệm Ngọc Gas Phường Rạch Dừa',
      rows: [
        ['Khối lượng khí cân tại bếp', 'Hụt từ 2.0kg đến 3.0kg khí', 'Đủ 12.0kg ± 0.1kg kiểm chứng tận mắt trên cân điện tử'],
        ['Thời gian sử dụng cho gia đình 4 người', 'Chỉ dùng được 35 - 40 ngày là hết', 'Dùng bền bỉ từ 65 đến 75 ngày nhờ khí tinh khiết đủ cân'],
        ['Thời gian giao hàng ca tối', 'Sau 18h00 tắt máy không giao', 'Trực chiến giao gas hỏa tốc đến 22h00 đêm trong 15 phút'],
        ['Quà tặng an toàn gia đình', 'Không có quà, không bảo hành', 'Tặng dây bọc lưới inox chống chuột hoặc van tự ngắt an toàn']
      ]
    },
    guide: {
      title: 'Cách Xử Lý Khi Bếp Gas Bị Kẹt Núm Vặn Không Bật Được',
      intro: 'Tại các gia đình công nhân Phường Rạch Dừa, bếp gas sau thời gian dài sử dụng dễ bị kẹt cứng núm xoay do dầu mỡ bám dính:',
      steps: [
        'Khóa van bình gas trước khi thao tác: Đảm bảo nguồn gas đã được khóa an toàn tuyệt đối.',
        'Rút núm vặn nhựa thẳng đứng ra ngoài: Kéo mạnh núm vặn nhựa theo hướng vuông góc với mặt bếp để lộ trục kim loại xoay của cụm đánh lửa.',
        'Xịt dung dịch chống rỉ sét RP7 vào trục xoay: Xịt một lượng nhỏ dung dịch bôi trơn RP7 vào quanh chân trục kim loại và chờ 3 phút cho rã cặn dầu mỡ.',
        'Dùng kìm kẹp nhẹ trục và xoay nhẹ nhàng qua lại: Xoay nhẹ nhàng trục kim loại cho trơn tru, sau đó lắp núm vặn nhựa lại. Bật thử, núm bếp sẽ xoay êm ái nhẹ nhàng.'
      ]
    },
    faqs: [
      ['Công nhân tan ca sau 18h00 gọi gas có giao liền không?', 'Ngọc Gas phục vụ liên tục đến 22h00 đêm mỗi ngày, cam kết giao hỏa tốc 15 phút tận phòng trọ đúng giá niêm yết ban ngày.'],
      ['Đổi vỏ bình gas màu đỏ sang vỏ xám Sopet Gas One có mất tiền cọc không?', 'Hoàn toàn không! Ngọc Gas hỗ trợ đổi vỏ ngang miễn phí giữa 4 màu sắc xám, đỏ, xanh, vàng mà không yêu cầu đóng thêm bất kỳ chi phí cược vỏ nào.'],
      ['Giao gas vào các hẻm đường Nơ Trang Long có tính thêm phí vận chuyển không?', 'Ngọc Gas miễn phí 100% công vận chuyển và bưng bê lắp đặt tận chân bếp cho mọi khách hàng tại Phường Rạch Dừa Vũng Tàu.']
    ]
  },

  {
    id: 152,
    slug: 'giao-gas-phuong-nguyen-an-ninh',
    ward: 'Phường Nguyễn An Ninh',
    city: 'TP. Vũng Tàu',
    title: 'Đổi Bình Gas Phường Nguyễn An Ninh (TP. Vũng Tàu) — Sân Golf Paradise & Đường Ra Biển',
    summary: 'Đại lý giao gas chính hãng Phường Nguyễn An Ninh (TP. Vũng Tàu). Cung cấp Sopet Gas One, Luxen Gas, Phoenix Gas đủ 4 màu vỏ xám, đỏ, xanh, vàng. Giao hỏa tốc 15 phút Sân golf Paradise 27 lỗ, Khu liên hợp Thể thao Vũng Tàu, trục đường Nguyễn An Ninh ra biển Bãi Sau. Cân đủ 12kg tại bếp, van tự ngắt, ngọn lửa xanh cực đại. Hotline 1900 9396.',
    subArea: 'khu đô thị thể thao nghỉ dưỡng cao cấp, sân golf ven biển và phố thương mại thênh thang',
    landmarks: 'Sân golf Paradise Vũng Tàu 27 lỗ chuẩn quốc tế, Khu liên hợp Thể thao Vũng Tàu, trục đại lộ Nguyễn An Ninh nối thẳng ra biển Bãi Sau, đường 3/2, KDC Nguyễn An Ninh, Trường THPT Vũng Tàu mới',
    introP1: 'Sở hữu không gian đô thị rộng mở và hiện đại bậc nhất thành phố biển, Phường Nguyễn An Ninh nổi bật với Quần thể Sân golf Paradise 27 lỗ đạt tiêu chuẩn quốc tế uốn lượn ven biển, Khu liên hợp Thể thao Vũng Tàu tầm vóc, trục đại lộ Nguyễn An Ninh thênh thang nối dài ra biển Bãi Sau cùng chuỗi biệt thự sân vườn, nhà phố thương mại sang trọng.',
    challenges: [
      'Cộng đồng cư dân thượng lưu và chuyên gia quốc tế: Yêu cầu bình gas chuẩn Nhật Bản Sopet Gas One vỏ xám sang trọng, thợ giao gas mang bọc giày vải nhung bảo vệ sàn đá cẩm thạch và sàn gỗ cao cấp.',
      'Biệt thự sân vườn và nhà phố hiện đại thiết kế bếp kín: Đòi hỏi van điều áp Compact tự ngắt an toàn tuyệt đối và dây dẫn bọc thép inox 304 chống chuột cắn.',
      'Giao gas hỏa tốc đúng hẹn: Dịch vụ phục vụ tận tâm, lịch thiệp, cân đối chứng tại bếp.'
    ],
    techTable: {
      header: 'Tiêu Chuẩn Năng Lượng Thượng Lưu Cho Biệt Thự Sân Golf Phường Nguyễn An Ninh',
      colBad: 'Bình Gas Cũ Kỹ Bãi Phế Liệu',
      colGood: 'Chuẩn Năng Lượng Đẳng Cấp Sopet Gas One (Ngọc Gas)',
      rows: [
        ['Thẩm mỹ vỏ bình trong gian bếp mở', 'Vỏ trầy xước rỉ sét làm xấu gian bếp sang', 'Vỏ bình xám Nhật Sopet Gas One sơn tĩnh điện sang trọng'],
        ['Tác phong phục vụ vào biệt thự', 'Đi giày dép bẩn làm trầy xước sàn gỗ', 'Mang bọc giày vải sạch sẽ, trải thảm cao su bảo vệ sàn'],
        ['Cơ chế khóa an toàn tự động', 'Van ren lỏng lẻo dễ xì gas', 'Van Compact bi thép tự ngắt tức thì bảo vệ gia đình 100%'],
        ['Khối lượng khí cân kiểm chứng', 'Hụt từ 2.0kg đến 2.5kg gas', 'Đủ 12.0kg ± 0.1kg kiểm tra tận mắt trên cân điện tử']
      ]
    },
    guide: {
      title: 'Hướng Dẫn Lắp Đặt Van Compact Đúng Khớp Ngàm Bấm An Toàn Không Xì Gas',
      intro: 'Tại các biệt thự Phường Nguyễn An Ninh dùng van chụp Compact cao cấp, thao tác lắp đặt đúng ngàm bấm bảo đảm an toàn:',
      steps: [
        'Kéo vòng đệm khóa lên phía trên: Dùng hai tay kéo nhẹ vòng đệm nhựa bên ngoài cụm van Compact lên trên vị trí mở ngàm.',
        'Đặt cụm van thẳng đứng vào cổ bình gas: Ấn mạnh cụm van thẳng đứng xuống cổ bình cho đến khi nghe tiếng "tách" dứt khoát của ngàm bi thép ăn khớp vào rãnh cổ bình.',
        'Đẩy vòng đệm khóa trượt xuống dưới: Đẩy vòng khóa nhựa xuống dưới để khóa chặt ngàm bi thép.',
        'Gạt núm xoay sang vị trí mở ON và thử bọt: Gạt núm xoay theo chiều kim đồng hồ góc 90 độ, quét bọt xà phòng kiểm tra độ kín tuyệt đối.'
      ]
    },
    faqs: [
      ['Biệt thự gần Sân golf Paradise gọi gas có giao tận nơi không?', 'Ngọc Gas phục vụ chu đáo tận nơi cho tất cả các căn biệt thự, nhà phố xung quanh Sân golf Paradise và trục đường Nguyễn An Ninh.'],
      ['Bình gas Sopet Gas One vỏ xám Nhật Bản có những loại van nào?', 'Có đầy đủ cả hệ van ren xoay POL chuẩn thông dụng và hệ van chụp Compact bấm khóa tự động cao cấp.'],
      ['Đổi vỏ bình gas màu xanh sang màu xám Sopet Gas One có mất tiền cọc không?', 'Hoàn toàn không! Ngọc Gas hỗ trợ đổi vỏ ngang miễn phí giữa 4 màu sắc xám, đỏ, xanh, vàng mà không yêu cầu đóng thêm tiền đặt cọc.']
    ]
  },

  {
    id: 153,
    slug: 'giao-gas-xa-long-son',
    ward: 'Xã Long Sơn',
    city: 'TP. Vũng Tàu',
    title: 'Đổi Bình Gas Xã Long Sơn (TP. Vũng Tàu) — Làng Bè Hàu Sông Rạng & Tổ Hợp Hóa Dầu LSP',
    summary: 'Đại lý giao gas chính hãng Xã Long Sơn (TP. Vũng Tàu). Cung cấp Sopet Gas One, Luxen Gas, Phoenix Gas đủ 4 màu vỏ xám, đỏ, xanh, vàng. Giao hỏa tốc 15 phút Xã đảo Long Sơn, Di tích Nhà Lớn Long Sơn, Làng bè hàu sông Rạng, Tổ hợp Hóa dầu LSP, đường Hoàng Sa. Cân đủ 12kg tại bếp, van tự ngắt, vỏ mạ kẽm kháng mặn. Hotline 1900 9396.',
    subArea: 'xã đảo sinh thái sông nước, thủ phủ nuôi hàu lồng bè và tổ hợp hóa dầu tỷ USD',
    landmarks: 'Xã đảo sinh thái Long Sơn, Di tích Lịch sử Kiến trúc Nghệ thuật Nhà Lớn Long Sơn (Đền Ông Trần), Làng bè nuôi hàu nổi tiếng trên sông Rạng, Tổ hợp Hóa dầu Miền Nam Long Sơn (LSP) quy mô hàng tỷ USD, trục đại lộ Hoàng Sa, Cầu Chà Và, Cầu Ba Nanh',
    introP1: 'Được mệnh danh là "hòn đảo ngọc sinh thái" độc đáo bậc nhất thành phố biển Vũng Tàu, Xã đảo Long Sơn nổi tiếng bốn phương với Di tích Nhà Lớn Long Sơn gắn liền với đạo Ông Trần và phong tục mặc áo bà ba đen đi chân đất, Làng ẩm thực bè hàu sông Rạng bồng bềnh sóng nước cùng đại dự án Tổ hợp Hóa dầu Miền Nam Long Sơn (LSP) quy mô hàng tỷ USD hiện đại hàng đầu Đông Nam Á.',
    challenges: [
      'Vận chuyển bình gas ra các nhà hàng bè nổi bồng bềnh trên sông Rạng: Đòi hỏi kỹ thuật bưng bê an toàn qua cầu phao, xuồng máy và chống rung lắc chấn động sóng nước.',
      'Khí hậu sông nước ngập mặn bao quanh bốn bề: Hơi muối biển và nước mặn sông Rạng có tính ăn mòn cực mạnh; vỏ bình gas bắt buộc phải được mạ kẽm nhúng nóng và sơn tĩnh điện bảo vệ chuyên dụng.',
      'Phục vụ các chuyên gia quốc tế và bếp ăn dự án Tổ hợp Hóa dầu LSP: Yêu cầu bình gas chính hãng đạt tiêu chuẩn an toàn PCCC quốc tế cao nhất.'
    ],
    techTable: {
      header: 'Tiêu Chuẩn Bình Gas Kháng Mặn Cho Làng Bè Sông Rạng Xã Long Sơn',
      colBad: 'Bình Gas Tạp Trôi Nổi Nhanh Rỉ Sét',
      colGood: 'Chuẩn Gas Sạch Kháng Mặn Ngọc Gas Tại Long Sơn',
      rows: [
        ['Kháng ăn mòn nước mặn sông bè', 'Vỏ rỉ sét mục rách chân bình sau 1 tháng', 'Mạ kẽm nhúng nóng sơn tĩnh điện chuẩn JIS G3116 Nhật Bản'],
        ['Vận chuyển ra bè nổi sông Rạng', 'Từ chối giao hoặc đòi phụ phí ghe đò', 'Giao tận cầu bè nổi sông Rạng không tính thêm phụ phí'],
        ['Nhiệt lượng ngọn lửa hấp hàu', 'Lửa yếu làm hàu bị teo thịt ra nhiều nước', 'Lửa xanh cực đại 1.900°C hàu mở nắp chín mọng ngọt thơm'],
        ['Khối lượng tịnh kiểm chứng tại bè', 'Hụt từ 2.0kg đến 2.8kg mỗi bình', 'Cân điện tử số đối chứng đủ 12.0kg ± 0.1kg tại bè']
      ]
    },
    guide: {
      title: 'Kỹ Thuật Bảo Vệ Bình Gas Và Van Khóa Trên Bè Nổi Sông Nước',
      intro: 'Tại các nhà hàng bè hàu sông Rạng Xã Long Sơn, việc đặt bình gas trên bè gỗ nổi bồng bềnh cần lưu ý:',
      steps: [
        'Kê bình gas trên giá đỡ cao su hoặc gỗ cách mặt sàn bè 15cm: Ngăn nước sông mặn bắn vào chân đế bình gas gây oxy hóa.',
        'Buộc dây cố định thân bình gas vào cột bè: Ngăn bình gas bị ngã đổ khi có sóng lớn do tàu thuyền chạy qua gây chấn động.',
        'Sử dụng van điều áp có khóa hai nấc và ống dẫn bọc inox: Bảo vệ ống dẫn không bị cọ xát vào cạnh gỗ sàn bè gây mòn rách.',
        'Bôi mỡ bảo dưỡng vào các khớp ren kim loại định kỳ: Giúp ngăn chặn hơi muối mặn bám dính làm kẹt cứng khớp nối van.'
      ]
    },
    faqs: [
      ['Giao gas ra các bè nổi ẩm thực sông Rạng có phụ thu tiền ghe thuyền không?', 'Ngọc Gas hỗ trợ vận chuyển bình gas ra tận bè nổi cho các nhà hàng ẩm thực sông Rạng hoàn toàn miễn phí phụ thu.'],
      ['Nhà hàng bè hàu lấy số lượng nhiều bình gas có được hỗ trợ giá sỉ không?', 'Ngọc Gas có chính sách chiết khấu giá sỉ ưu đãi và hỗ trợ mượn vỏ bình miễn phí cho các cơ sở kinh doanh tại Xã đảo Long Sơn.'],
      ['Bình gas có bảo hiểm trách nhiệm sản phẩm PCCC không?', '100% bình gas tại Ngọc Gas đều được bảo hiểm trách nhiệm sản phẩm theo quy chuẩn an toàn PCCC và quy định hiện hành của pháp luật.']
    ]
  }
];

const quickSummaryTemplates = [
  (d) => `<strong>Dịch vụ đổi bình gas chính hãng ${d.ward} uy tín chuẩn PCCC (${d.subArea}):</strong> Chuyên phân phối hỏa tốc các dòng bình gas sạch chính hãng <strong>Sopet Gas One, Luxen Gas, Phoenix Gas</strong> với 4 màu sắc vỏ bình phong thủy: <em>vỏ xám công nghệ Nhật Bản, vỏ đỏ may mắn, vỏ xanh tươi mát, vỏ vàng cam nhiệt lượng lớn</em> (sẵn sàng hệ van bấm Compact ngắt gas tự động và van ren POL bằng đồng thau kháng mặn). Phục vụ tận tâm các hộ gia đình, nhà hàng và cơ sở kinh doanh tại <em>${d.landmarks}</em>. Cam kết <strong>giao gas nhanh ${d.ward}</strong> trong 15 phút, <strong>đổi bình gas ${d.ward}</strong> cân đủ 12kg tại bếp, vỏ bình mạ kẽm sơn tĩnh điện chống rỉ gió biển. Xem ngay <a href="/gia-gas-hom-nay" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">Bảng giá gas hôm nay</a> hoặc liên hệ <a href="/cua-hang" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">Hệ thống cửa hàng Ngọc Gas</a> qua hotline: <a href="tel:19009396" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">1900 9396</a>.`,

  (d) => `<strong>Trung tâm phân phối khí gas hóa lỏng PCCC chính hãng ${d.ward} (${d.subArea}):</strong> Cung ứng hỏa tốc các sản phẩm bình gas cao cấp <strong>Sopet Gas One, Luxen Gas, Phoenix Gas</strong> đầy đủ 4 gam màu tiêu chuẩn: <em>vỏ xám Nhật Bản chống oxy hóa, vỏ đỏ thịnh vượng, vỏ xanh tiết kiệm gas, vỏ vàng cam áp suất mạnh</em>. Đội ngũ kỹ thuật túc trực phục vụ cư dân và cơ sở thương mại tại <em>${d.landmarks}</em>. Tiêu chuẩn vàng: <strong>giao gas nhanh ${d.ward}</strong> 15 phút, <strong>đổi bình gas ${d.ward}</strong> đủ cân 12kg tận nhà, bảo dưỡng bếp gas miễn phí. Tham khảo <a href="/gia-gas-hom-nay" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">Bảng giá gas hôm nay</a> và <a href="/cua-hang" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">Hệ thống cửa hàng Ngọc Gas</a>, gọi ngay: <a href="tel:19009396" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">1900 9396</a>.`,

  (d) => `<strong>Đại lý ủy quyền giao gas hỏa tốc 15 phút tại ${d.ward} (${d.subArea}):</strong> Hệ thống cung cấp bình gas chính ngạch từ các thương hiệu hàng đầu <strong>Sopet Gas One, Luxen Gas, Phoenix Gas</strong> với 4 màu sắc nhận diện: <em>vỏ xám công nghệ JIS, vỏ đỏ may mắn gia đình, vỏ xanh ngọn lửa thanh khiết, vỏ vàng cam công suất vượt trội</em>. Giao hàng phủ sóng toàn bộ <em>${d.landmarks}</em>. Cam kết độc quyền: <strong>đổi bình gas ${d.ward}</strong> chuẩn khối lượng 12kg, <strong>giao gas nhanh ${d.ward}</strong> van khóa ngắt tự động, bảo hiểm an toàn toàn diện. Cập nhật <a href="/gia-gas-hom-nay" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">Bảng giá gas hôm nay</a> hoặc tra cứu <a href="/cua-hang" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">Cửa hàng Ngọc Gas</a>, đường dây nóng: <a href="tel:19009396" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">1900 9396</a>.`,

  (d) => `<strong>Giải pháp đổi bình gas PCCC an toàn tuyệt đối khu vực ${d.ward} (${d.subArea}):</strong> Trạm tiếp vận năng lượng sạch chính hãng <strong>Sopet Gas One, Luxen Gas, Phoenix Gas</strong> với 4 sắc màu vỏ bình: <em>vỏ xám đúc thép chịu lực, vỏ đỏ truyền thống, vỏ xanh nhiệt trị cao, vỏ vàng cam ngọn lửa dồi dào</em> (tương thích van chụp Compact hiện đại và van ren POL bằng đồng thau). Phục vụ nhanh chóng toàn diện tại <em>${d.landmarks}</em>. Khẳng định uy tín: <strong>giao gas nhanh ${d.ward}</strong> trong 15 phút, <strong>đổi bình gas ${d.ward}</strong> kiểm tra rò rỉ bọt xà phòng tại bếp, cân đối chứng đủ 12kg. Xem chi tiết <a href="/gia-gas-hom-nay" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">Bảng giá gas hôm nay</a> hoặc ghé thăm <a href="/cua-hang" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">Hệ thống showroom Ngọc Gas</a> qua hotline: <a href="tel:19009396" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">1900 9396</a>.`
];

const brandTemplates = [
  (d) => `
<p>Đại lý <strong>giao gas chính hãng ${d.ward}</strong> cung cấp đa dạng sản phẩm chất lượng cao đáp ứng mọi nhu cầu:</p>
<ul>
  <li><strong>Sopet Gas One (Vỏ Xám Chuẩn Nhật):</strong> Dòng sản phẩm lọc sạch tinh khiết theo tiêu chuẩn công nghệ Nhật Bản, vỏ bình đúc thép SG255 chịu áp lực 34 bar, công nghệ chống ăn mòn biển bảo vệ tối đa thiết bị bếp gas và gian bếp cao cấp.</li>
  <li><strong>Luxen Gas (Vỏ Xanh, Đỏ, Vàng):</strong> Tỷ lệ Propane/Butane 30:70 chuẩn hóa, ngọn lửa xanh nhiệt độ cao 11.800 kcal/kg giúp người nội trợ nấu ăn nhanh chóng mà không làm đen đáy xoong nồi.</li>
  <li><strong>Phoenix Gas (Vỏ Vàng Cam, Vỏ Xám):</strong> Sức ép ngọn lửa dồi dào, thân bình sơn tĩnh điện chống oxy hóa bền bỉ, lựa chọn số 1 của chuỗi nhà hàng hải sản, quán nướng lẩu và khách sạn ven biển.</li>
</ul>
<p>Tất cả bình gas 12kg đều có khối lượng tịnh đủ 12.0kg ± 0.1kg, vỏ từ 12.5kg - 14.0kg. Sản phẩm được bảo chứng bởi <strong>bảo hiểm trách nhiệm sản phẩm theo quy chuẩn an toàn PCCC và quy định hiện hành của pháp luật</strong>. Hỗ trợ đổi vỏ ngang miễn phí 100% giữa 4 màu sắc xám, đỏ, xanh, vàng.</p>`,

  (d) => `
<p>Hệ thống Ngọc Gas tại <strong>${d.ward}</strong> phân phối 3 dòng bình gas tiêu chuẩn hàng đầu thị trường:</p>
<ul>
  <li><strong>Sopet Gas One (Vỏ Xám Nhật Bản):</strong> Tinh lọc qua hệ thống phân tách khí hiện đại, khử sạch tạp chất lưu huỳnh, van điều áp bấm Compact ngắt tức thì trong 0.5s bảo đảm an toàn cháy nổ tuyệt đối.</li>
  <li><strong>Luxen Gas (Vỏ Đỏ, Xanh, Vàng):</strong> Áp suất hơi bão hòa ổn định, ngọn lửa xanh cực đại nhiệt trị 11.800 kcal/kg, tiết kiệm đến 15% lượng gas tiêu thụ so với các dòng khí đốt thông thường.</li>
  <li><strong>Phoenix Gas (Vỏ Vàng Cam, Vỏ Xám):</strong> Vỏ thép cường lực dập nổi logo sắc nét, chịu tải cơ học va đập cực tốt, cung cấp năng lượng mạnh mẽ cho các thiết bị bếp công suất lớn.</li>
</ul>
<p>Mỗi bình gas xuất kho đều dán tem niêm phong chống hàng giả, van nạp nguyên seal, có hóa đơn và phiếu kiểm định an toàn PCCC. Khách hàng thoải mái chuyển đổi vỏ giữa 4 màu xám, đỏ, xanh, vàng không lo mất phí cọc.</p>`,

  (d) => `
<p>Đáp ứng linh hoạt không gian bếp của cư dân <strong>${d.ward}</strong>, Ngọc Gas mang đến 3 thương hiệu chất lượng:</p>
<ul>
  <li><strong>Sopet Gas One (Vỏ Xám Tinh Tế):</strong> Sản xuất theo quy trình kiểm định Nhật Bản khắt khe, lớp sơn epoxy tĩnh điện đa tầng chống bong tróc và gỉ sét do độ ẩm không khí, cực kỳ bền bỉ.</li>
  <li><strong>Luxen Gas (Vỏ Xanh Thanh Mát, Vỏ Đỏ May Mắn, Vỏ Vàng):</strong> Tinh chế từ mỏ khí tự nhiên sạch, không để lại muội than đáy nồi, bảo vệ sức khỏe gia đình và giữ không gian nấu nướng luôn tinh tươm.</li>
  <li><strong>Phoenix Gas (Vỏ Vàng Cam Năng Lượng, Vỏ Xám):</strong> Ngọn lửa đều và gom nhiệt sâu, tối ưu hóa thời gian hầm ninh và xào nấu cường độ cao của các quán ăn và bếp gia đình hiện đại.</li>
</ul>
<p>Bình gas đủ 12kg gas lỏng chuẩn hóa, đi kèm <strong>bảo hiểm trách nhiệm an toàn sản phẩm PCCC toàn diện</strong> theo quy định. Miễn phí đổi bù vỏ giữa các thương hiệu và 4 màu sắc phong thủy.</p>`,

  (d) => `
<p>Tại khu vực <strong>${d.ward}</strong>, khách hàng hoàn toàn an tâm khi lựa chọn 3 nhãn hiệu uy tín do Ngọc Gas cung cấp:</p>
<ul>
  <li><strong>Sopet Gas One (Vỏ Xám Công Nghệ Cao):</strong> Đạt chuẩn an toàn quốc tế, van kết nối ren đồng POL kháng muối và van bấm tiện lợi, chống hiện tượng rò rỉ khí gas vi mô hiệu quả nhất.</li>
  <li><strong>Luxen Gas (Vỏ Xanh Sinh Thái, Đỏ, Vàng):</strong> Tỷ lệ hòa khí Pro-Bu hoàn hảo, ngọn lửa đạt nhiệt lượng cao giúp món ăn giữ trọn hương vị tươi ngon và rút ngắn thời gian chuẩn bị bữa cơm.</li>
  <li><strong>Phoenix Gas (Vỏ Vàng Cam Bền Bỉ):</strong> Lớp vỏ mạ kẽm nhúng nóng kháng môi trường khắc nghiệt, chống va đập tốt, vận hành êm ái với mọi loại bếp gas đơn, đôi hay bếp âm.</li>
</ul>
<p>Cam kết 100% bình gas có tem truy xuất nguồn gốc, đủ trọng lượng 12kg khí hóa lỏng. Đổi vỏ ngang không thu phí cược bình giữa 4 màu sắc xám, đỏ, xanh, vàng.</p>`
];

const processTemplates = [
  (d) => `
<ol style="line-height:1.8;">
  <li><strong>Tiếp nhận nhanh qua Hotline 1900 9396:</strong> Xác nhận địa chỉ tại ${d.landmarks.split(',').slice(0, 3).join(', ')}.</li>
  <li><strong>Xuất trạm hỏa tốc 15 phút:</strong> Kỹ thuật viên di chuyển nhanh chóng bằng xe chuyên dụng đến tận căn bếp hoặc cầu bè của khách hàng.</li>
  <li><strong>Cân gas công khai trước mặt khách:</strong> Đặt bình gas lên cân điện tử cầm tay để khách hàng tự tay xác thực trọng lượng đủ 100%.</li>
  <li><strong>Lắp đặt & kiểm tra an toàn PCCC:</strong> Lắp van điều áp, quét bọt xà phòng kiểm tra độ kín và vệ sinh mâm lửa bếp gas miễn phí.</li>
  <li><strong>Bàn giao hóa đơn và dán tem bảo hành:</strong> Dán tem cứu hộ kỹ thuật 1900 9396 hỗ trợ khách hàng 24/7.</li>
</ol>`,

  (d) => `
<ol style="line-height:1.8;">
  <li><strong>Ghi nhận thông tin tức thì:</strong> Tổng đài 1900 9396 lưu nhận yêu cầu và định vị địa chỉ khách hàng quanh khu vực ${d.landmarks.split(',').slice(0, 2).join(', ')}.</li>
  <li><strong>Kỹ thuật viên xuất phát sau 60 giây:</strong> Di chuyển qua các trục đường chính, cam kết có mặt tại nhà khách hàng trong vòng 15 phút.</li>
  <li><strong>Đối chứng khối lượng tịnh:</strong> Sử dụng cân điện tử chính xác đến từng lạng, bảo đảm bình gas đủ 12.0kg gas sạch trước khi lắp ráp.</li>
  <li><strong>Thay thế gioăng & kiểm tra an toàn:</strong> Thay mới gioăng cao su miễn phí, siết chặt cổ dê và thử kín van khóa bằng dung dịch tạo bọt.</li>
  <li><strong>Bảo dưỡng bếp & dán tem khẩn cấp:</strong> Cạo cặn dầu mỡ đầu đốt, chỉnh gió ngọn lửa xanh và bàn giao phiếu bảo hành chính hãng.</li>
</ol>`,

  (d) => `
<ol style="line-height:1.8;">
  <li><strong>Tiếp nhận cuộc gọi và đặt hẹn:</strong> Hotline 1900 9396 tiếp nhận nhu cầu đổi bình gas và tư vấn màu vỏ bình phù hợp gian bếp.</li>
  <li><strong>Giao hàng chuẩn xác 15 phút:</strong> Đội ngũ thợ thạo đường luồn lách nhanh chóng vào tận hẻm nhỏ hoặc sảnh thang máy chung cư.</li>
  <li><strong>Kiểm chứng trọng lượng công khai:</strong> Khách hàng trực tiếp kiểm tra cân nặng của bình gas trước và sau khi lắp đặt.</li>
  <li><strong>Quy trình lắp ráp chuẩn PCCC:</strong> Kiểm tra áp suất dây dẫn, khớp nối ren van khóa, dùng bọt xà phòng kiểm soát triệt để nguy cơ xì gas.</li>
  <li><strong>Nghiệm thu an toàn & lưu số cứu hộ:</strong> Bàn giao hóa đơn niêm yết, dán decal phản quang hotline 1900 9396 sẵn sàng hỗ trợ 24/24.</li>
</ol>`,

  (d) => `
<ol style="line-height:1.8;">
  <li><strong>Liên hệ tổng đài 1900 9396:</strong> Nhân viên trực tổng đài ghi nhận loại bình yêu cầu và địa chỉ giao hàng tại ${d.ward}.</li>
  <li><strong>Điều phối xe chuyên dụng hỏa tốc:</strong> Thợ kỹ thuật mang bình gas mạ kẽm mới 100% đến địa chỉ khách hàng chỉ trong 15 phút.</li>
  <li><strong>Cân đo minh bạch tại gian bếp:</strong> Đặt bình gas lên cân số điện tử, xác nhận đủ 12.0kg khí lỏng đúng quy chuẩn đo lường.</li>
  <li><strong>Lắp đặt thiết bị an toàn:</strong> Gắn van giảm áp, kiểm tra độ kín khớp nối van bình, làm sạch họng đốt bếp gas miễn phí.</li>
  <li><strong>Hướng dẫn sử dụng & trao tem bảo hiểm:</strong> Dán tem hotline 1900 9396, hướng dẫn thao tác khóa mở van gas đúng cách sau khi đun nấu.</li>
</ol>`
];

// HÀM BUILD TOÀN BỘ NỘI DUNG VŨNG TÀU
export function buildVungTauArticles() {
  return vungTauData.map((d, index) => {
    const tIdx = index % 4;
    return {
      id: d.id,
      slug: d.slug,
      ward: d.ward,
      title: d.title,
      summary: d.summary,
      imageUrl: banners[d.slug],
      is_published: 0,
      content: `
<div class="quick-summary" style="background:#EFF6FF;border-left:5px solid #2563EB;padding:18px 20px;margin-bottom:28px;border-radius:8px;font-size:15px;line-height:1.7;color:#1E40AF;">
  ${quickSummaryTemplates[tIdx](d)}
</div>

<div class="article-banner-wrap" style="text-align:center;margin:24px 0 32px 0;">
  <img src="${banners[d.slug]}" alt="Giao gas chính hãng ${d.ward} ${d.city}" style="max-width:100%;height:auto;border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,0.08);" />
</div>

<h2>1. Vị Thế Địa Lý ${d.ward} & Tiêu Chuẩn Năng Lượng Kháng Gió Biển Mặn</h2>
<p>
  ${d.introP1}
</p>
<p>
  Môi trường gió biển mặn và nhịp sống đô thị du lịch biển tại ${d.ward} đặt ra những tiêu chí khắt khe đối với dịch vụ cung cấp khí đốt:
</p>
<ul>
  ${d.challenges.map(c => `<li><strong>${c.split(':')[0]}:</strong>${c.split(':')[1] || ''}</li>`).join('\n  ')}
</ul>

<h2>2. Bảng Tiêu Chuẩn Vỏ Thép & Van Khóa Kháng Ăn Mòn Gió Biển Mặn Tại ${d.ward}</h2>
<p>
  Bảo đảm bình gas vận hành an toàn tuyệt đối trước sức tàn phá của hơi muối biển, Ngọc Gas thiết lập quy chuẩn chuyên dụng miền biển:
</p>

<div style="overflow-x:auto;margin:24px 0;">
  <table style="width:100%;border-collapse:collapse;text-align:left;font-size:14.5px;">
    <thead>
      <tr style="background:#1E40AF;color:#fff;">
        <th style="padding:12px;border:1px solid #1D4ED8;">Chỉ Tiêu Vận Hành Miền Biển</th>
        <th style="padding:12px;border:1px solid #1D4ED8;">${d.techTable.colBad}</th>
        <th style="padding:12px;border:1px solid #1D4ED8;">${d.techTable.colGood}</th>
      </tr>
    </thead>
    <tbody>
      ${d.techTable.rows.map((r, idx) => `
      <tr style="${idx % 2 === 0 ? 'background:#F8FAFC;' : ''}">
        <td style="padding:10px;border:1px solid #E2E8F0;font-weight:600;">${r[0]}</td>
        <td style="padding:10px;border:1px solid #E2E8F0;color:#DC2626;">${r[1]}</td>
        <td style="padding:10px;border:1px solid #E2E8F0;color:#059669;font-weight:bold;">${r[2]}</td>
      </tr>`).join('')}
    </tbody>
  </table>
</div>

<h2>3. Hệ Thống 3 Thương Hiệu Uy Tín & 4 Màu Sắc Bình Gas Tại ${d.ward}</h2>
${brandTemplates[tIdx](d)}

<h2>4. Cẩm Nang Kỹ Thuật: ${d.guide.title}</h2>
<p>
  ${d.guide.intro}
</p>
<ol style="line-height:1.8;">
  ${d.guide.steps.map(s => `<li><strong>${s.split(':')[0]}:</strong>${s.split(':')[1] || ''}</li>`).join('\n  ')}
</ol>

<h2>5. Quy Trình Giao Gas Hỏa Tốc 5 Bước Tại ${d.ward}</h2>
${processTemplates[tIdx](d)}

<h2>6. Câu Hỏi Thường Gặp Của Cư Dân ${d.ward}</h2>
${d.faqs.map(f => `
<div class="faq-item" style="margin-bottom:16px;">
  <h3 style="font-size:16px;color:#1E40AF;margin-bottom:6px;">${f[0]}</h3>
  <p style="margin:0;color:#374151;">${f[1]}</p>
</div>`).join('')}
      `
    };
  });
}

// XUẤT FILE CLUSTER VŨNG TÀU
const finalVungTau = buildVungTauArticles();
const fileContent = `// Tự động tạo bởi build-cluster-vung-tau.mjs
export const vungTauArticles = ${JSON.stringify(finalVungTau, null, 2)};
`;

fs.writeFileSync(path.resolve('scripts/new-wards/cluster-vung-tau.mjs'), fileContent, 'utf8');
console.log(`🎉 ĐÃ XUẤT THÀNH CÔNG ${finalVungTau.length} BÀI VIẾT VŨNG TÀU VÀO scripts/new-wards/cluster-vung-tau.mjs!`);
