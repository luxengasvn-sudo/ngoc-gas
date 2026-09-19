import fs from 'fs';
import path from 'path';

const banners = JSON.parse(fs.readFileSync(path.resolve('scratch/bd_vt_banner_urls.json'), 'utf8'));

// DỮ LIỆU ĐỘC BẢN 14 PHƯỜNG BÌNH DƯƠNG (IDs 123 - 136)
export const binhDuongData = [
  {
    id: 123,
    slug: 'giao-gas-phuong-tan-binh-di-an',
    ward: 'Phường Tân Bình',
    city: 'TP. Dĩ An',
    title: 'Đổi Bình Gas Phường Tân Bình (TP. Dĩ An) — Ngã Tư Tân Bình & KDC Biconsi',
    summary: 'Đại lý giao gas chính hãng Phường Tân Bình (TP. Dĩ An, Bình Dương). Cung cấp Sopet Gas One, Luxen Gas, Phoenix Gas đủ 4 màu vỏ xám, đỏ, xanh, vàng. Giao hỏa tốc 15 phút Ngã tư Tân Bình, Bùi Thị Xuân, Cây Điệp, Chợ Tân Bình, KDC Biconsi, KCN Tân Bình Dĩ An. Cân đủ 12kg tại bếp, van tự ngắt an toàn, ngọn lửa xanh cực đại. Hotline 1900 9396.',
    subArea: 'cửa ngõ công nghiệp và đô thị dịch vụ phía Bắc TP. Dĩ An - Bình Dương',
    landmarks: 'trục Ngã tư Tân Bình, đường Bùi Thị Xuân, đường Cây Điệp, Chợ Tân Bình, Khu đô thị Biconsi, Cụm công nghiệp Tân Bình Dĩ An, trục ĐT743 và KDC Tân Phước',
    introP1: 'Tọa lạc tại phía Bắc của TP. Dĩ An tiếp giáp với TP. Thuận An và TP. Tân Uyên, Phường Tân Bình là đầu mối giao thương nhộn nhịp quanh Ngã tư Tân Bình, trục đường Bùi Thị Xuân, Cây Điệp, Nguyễn Thị Tươi, Khu dân cư Biconsi hiện đại và Cụm công nghiệp Tân Bình Dĩ An. Nơi đây quy tụ hàng chục ngàn công nhân may mặc, giày da, cơ khí sinh sống trong các dãy nhà trọ khép kín xen lẫn các khu biệt thự liền kề Biconsi.',
    challenges: [
      'Nhu cầu giao gas linh hoạt theo ca kíp công nhân: Đổi bình gas sau 17h30 chiều và ca đêm khi công nhân tăng ca về cần nấu cơm tối ngay mà không lo cơ sở đóng cửa.',
      'Phòng chống cháy nổ tại các dãy phòng trọ diện tích nhỏ (15 - 20m²): Khí gas tích tụ trong phòng trọ kín là mối đe dọa trực tiếp; đòi hỏi bình gas phải có van tự ngắt Compact nhạy cảm và dây dẫn bọc thép chống chuột cắn.',
      'Bảo đảm cân đủ ký 100%: Tình trạng giao gas giá rẻ rút bớt 2kg - 3kg tại các tiệm dạo khiến công nhân hao hụt ngân sách; Ngọc Gas cam kết cân điện tử công khai tận bếp.'
    ],
    techTable: {
      header: 'Tiêu Chuẩn Gas An Toàn Cho Phòng Trọ Công Nhân & KDC Biconsi Tân Bình',
      colBad: 'Bình Gas Tạp Sang Chiết Lậu Vỉa Hè',
      colGood: 'Bình Gas Chính Hãng Phường Tân Bình (Ngọc Gas)',
      rows: [
        ['Khối lượng khí nạp thực tế', 'Bị bòn rút từ 2.0kg đến 3.0kg khí', 'Đủ 12.0kg ± 0.1kg kiểm chứng tận mắt trên cân điện tử'],
        ['Van ngắt an toàn phòng trọ kín', 'Van thủ công ren lỏng, không tự ngắt khi tuột dây', 'Van Compact bi thép tự ngắt tức thì trong 0.5s khi có sự cố'],
        ['Bảo vệ ống mềm chống chuột cắn', 'Ống cao su giòn, chuột cống gặm thủng xì gas', 'Tặng ống dẫn bọc lưới sợi Inox 304 chống chuột cắn 100%'],
        ['Thời gian phục vụ ca kíp', 'Sau 18h00 tắt máy, không giao hàng', 'Trực chiến giao gas hỏa tốc đến 22h00 đêm trong 15 phút']
      ]
    },
    guide: {
      title: 'Phát Hiện Rò Rỉ Khí Gas Bằng Bọt Nước Rửa Chén Trong Phòng Trọ',
      intro: 'Trong không gian phòng trọ kín gió tại Tân Bình, việc kiểm tra độ kín khớp nối van bình gas sau khi đổi là cực kỳ quan trọng:',
      steps: [
        'Pha dung dịch tạo bọt: Lấy một chút nước rửa chén pha vào chén nhỏ với ít nước, khuấy mạnh để tạo lớp bọt bồng bềnh.',
        'Quét bọt quanh các mối nối: Dùng miếng bọt biển hoặc ngón tay quệt bọt xà phòng bôi đều quanh cổ van, gioăng cao su, và hai đầu siết cổ dê ống dẫn gas.',
        'Quan sát hiện tượng phồng bóng bọt khí: Nếu lớp bọt nằm yên nghĩa là hệ thống kín 100%. Nếu thấy bọt khí phập phồng hoặc phình to thành bóng bóng xà phòng, đó là vị trí đang bị rò rỉ khí gas.',
        'Khóa van bình gas và siết chặt lại: Lập tức khóa van bình gas, tháo cổ dê và cắm sâu ống dẫn rồi siết chặt ốc vít. Nếu vẫn còn bóng bóng, gọi ngay tổng đài 1900 9396 để thợ kỹ thuật hỗ trợ miễn phí.'
      ]
    },
    faqs: [
      ['Công nhân tan ca sau 18h00 gọi gas có giao không và có tăng giá không?', 'Ngọc Gas phục vụ liên tục đến 22h00 đêm, cam kết giao nhanh 15 phút đúng giá niêm yết ban ngày, tuyệt đối không tăng giá hay phụ thu ca đêm.'],
      ['Đổi vỏ bình gas màu xanh sang màu xám Sopet Gas One có mất tiền cọc không?', 'Hoàn toàn không! Ngọc Gas hỗ trợ đổi vỏ ngang miễn phí giữa 4 màu sắc xám, đỏ, xanh, vàng mà không yêu cầu đóng thêm bất kỳ chi phí cược vỏ nào.'],
      ['Giao gas vào các hẻm sâu đường Bùi Thị Xuân có tính thêm phí vận chuyển không?', 'Ngọc Gas miễn phí 100% công vận chuyển và bưng bê lắp đặt tận chân bếp cho mọi khách hàng tại Phường Tân Bình Dĩ An.']
    ]
  },

  {
    id: 124,
    slug: 'giao-gas-phuong-lai-thieu',
    ward: 'Phường Lái Thiêu',
    city: 'TP. Thuận An',
    title: 'Đổi Bình Gas Phường Lái Thiêu (TP. Thuận An) — Chợ Lái Thiêu & Lotte Mart',
    summary: 'Đại lý giao gas chính hãng Phường Lái Thiêu (TP. Thuận An, Bình Dương). Cung cấp Sopet Gas One, Luxen Gas, Phoenix Gas đủ 4 màu vỏ xám, đỏ, xanh, vàng. Giao hỏa tốc 15 phút Chợ Lái Thiêu, TTTM Lotte Mart, BV Quốc tế Becamex, Cầu Sắt Lái Thiêu, Nguyễn Văn Tiết, Cách Mạng Tháng Tám. Cân đủ 12kg tại bếp, van tự ngắt, ngọn lửa xanh cực đại. Hotline 1900 9396.',
    subArea: 'trung tâm hành chính, thương mại và ẩm thực lâu đời bậc nhất TP. Thuận An - Bình Dương',
    landmarks: 'khu Chợ Lái Thiêu sầm uất, TTTM Lotte Mart Bình Dương, Bệnh viện Quốc tế Becamex, đường Nguyễn Văn Tiết, Cách Mạng Tháng Tám, Phan Đình Phùng, Cầu Sắt Lái Thiêu, KDC Bình Đức',
    introP1: 'Được mệnh danh là trái tim lịch sử và thương mại của TP. Thuận An, Phường Lái Thiêu trải dài ven sông Sài Gòn với các địa danh biểu tượng: Chợ Lái Thiêu hàng trăm năm tuổi, Trung tâm Thương mại Lotte Mart Bình Dương, Bệnh viện Đa khoa Quốc tế Becamex, Tòa nhà UBND TP. Thuận An, Cầu Sắt Lái Thiêu lịch sử và trục đường Nguyễn Văn Tiết sầm uất.',
    challenges: [
      'Hàng trăm quán bún riêu, bánh canh, hủ tiếu quanh Chợ Lái Thiêu: Nhu cầu đun nấu nước dùng liên tục từ 4h sáng đến tận đêm khuya, cần nguồn gas nhiệt trị lớn 11.800 kcal/kg để nước dùng luôn sôi sùng sục.',
      'Khu nhà phố cổ hẻm nhỏ ven sông Sài Gòn: Mối lo rò rỉ khí gas trong không gian hẹp đòi hỏi vỏ bình gas phải được kiểm định áp lực 34 bar nghiêm ngặt và van điều áp ngắt tự động.',
      'Cụm căn hộ hiện đại và khu dân cư Becamex: Cư dân yêu cầu thợ giao gas mang bọc giày bảo vệ sàn nhà, tác phong lịch thiệp và hỗ trợ kiểm tra bảo dưỡng bếp gas định kỳ.'
    ],
    techTable: {
      header: 'Chuẩn Khí Gas Lửa Xanh Cho Tiệm Ẩm Thực & Nhà Phố Phường Lái Thiêu',
      colBad: 'Cơ Sở Giao Gas Nhỏ Lẻ Trôi Nổi',
      colGood: 'Quy Chuẩn Ngọc Gas Phường Lái Thiêu',
      rows: [
        ['Thời gian sôi nồi nước dùng 40L', 'Mất 45 - 55 phút, hao tốn nhiều gas', 'Chỉ mất 25 - 30 phút nhờ nhiệt trị chuẩn 11.800 kcal/kg'],
        ['Màu sắc ngọn lửa & đáy nồi', 'Lửa đỏ nhiều khói than, làm đen xoong nồi inox', 'Lửa xanh biếc tinh khiết 100%, giữ nồi nấu luôn sáng bóng'],
        ['Kiểm định cân nặng tại bếp', 'Không có cân, thường xuyên thiếu từ 2kg', 'Cân điện tử số đối chứng đủ 12.0kg ± 0.1kg trước sự chứng kiến của chủ tiệm'],
        ['Khả năng đáp ứng giờ cao điểm chợ', 'Trễ nải 45 - 60 phút do kẹt đường chợ', 'Xe máy luồn lách thông thạo ngõ chợ, có mặt sau 10 - 15 phút']
      ]
    },
    guide: {
      title: 'Xử Lý Hiện Tượng Lửa Bếp Bị Đỏ Do Cặn Bẩn Dầu Mỡ Bám Mâm Chia Lửa',
      intro: 'Các quán ăn và gia đình nấu nướng nhiều dầu mỡ tại Lái Thiêu thường gặp hiện tượng lửa đỏ ám khói đen đáy nồi:',
      steps: [
        'Nhận diện nguyên nhân: Dầu mỡ, nước canh trào bám vào các khe chia lửa trên mâm đồng làm nghẽn dòng oxy hòa khí, khiến gas cháy không kiệt sinh ra muội than.',
        'Tháo mâm đồng chia lửa ngâm nước ấm: Chờ bếp nguội hẳn, nhấc mâm đồng ra ngâm trong nước ấm có pha chút nước rửa chén và giấm trắng trong 15 phút.',
        'Dùng bàn chải đồng cọ sạch khe thoát khí: Dùng bàn chải nhỏ cọ sạch từng khe rãnh thoát lửa, dùng tăm nhọn thông các lỗ kim phun bị nghẹt muội than.',
        'Sấy khô và lắp lại cân đối: Lau khô hoàn toàn bằng khăn sạch, lắp mâm đồng khớp vào chốt định vị của họng bếp. Bật bếp thử, ngọn lửa sẽ chuyển sang màu xanh biếc gom nhiệt.'
      ]
    },
    faqs: [
      ['Quán ăn sáng tại Chợ Lái Thiêu gọi gas từ 4h30 sáng có phục vụ không?', 'Ngọc Gas có đội ngũ trực ca sáng sớm từ 5h00 để kịp thời giao gas phục vụ các quán ăn sáng mở hàng đúng giờ.'],
      ['Bình gas có được kiểm tra rò rỉ bằng thiết bị chuyên dụng không?', '100% nhân viên Ngọc Gas khi lắp bình đều dùng dung dịch thử bọt xà phòng hoặc máy đo khí gas kiểm tra độ kín khít trước khi bàn giao.'],
      ['Tôi đang dùng bình gas của hãng khác đổi sang Ngọc Gas có được không?', 'Hoàn toàn được! Ngọc Gas thu hồi đổi ngang tất cả các vỏ bình hợp pháp trên thị trường sang bình chính hãng Sopet Gas One, Luxen Gas hoặc Phoenix Gas hoàn toàn miễn phí cọc vỏ.']
    ]
  },

  {
    id: 125,
    slug: 'giao-gas-phuong-vinh-phu',
    ward: 'Phường Vĩnh Phú',
    city: 'TP. Thuận An',
    title: 'Đổi Bình Gas Phường Vĩnh Phú (TP. Thuận An) — Cầu Vĩnh Bình & BV Quốc Tế Hạnh Phúc',
    summary: 'Đại lý giao gas chính hãng Phường Vĩnh Phú (TP. Thuận An, Bình Dương). Cung cấp Sopet Gas One, Luxen Gas, Phoenix Gas đủ 4 màu vỏ xám, đỏ, xanh, vàng. Giao hỏa tốc 15 phút Cầu Vĩnh Bình giáp Thủ Đức, Bệnh viện Quốc Tế Hạnh Phúc, KĐT Vĩnh Phú 1 & 2, Marina Riverside, QL13. Cân đủ 12kg tại bếp, van tự ngắt căn hộ, ngọn lửa xanh cực đại. Hotline 1900 9396.',
    subArea: 'cửa ngõ giáp ranh TP. Thủ Đức và Quận 12 - TP. Thuận An, Bình Dương',
    landmarks: 'trục Quốc Lộ 13, Cầu Vĩnh Bình, Bệnh viện Quốc Tế Hạnh Phúc, KĐT Vĩnh Phú 1, KĐT Vĩnh Phú 2, Chung cư Marina Riverside, KDC Ehome 4, đường Vĩnh Phú 10, Vĩnh Phú 41',
    introP1: 'Tọa lạc tại cửa ngõ phía Nam của tỉnh Bình Dương ngăn cách với TP. Thủ Đức qua rạch Vĩnh Bình, Phường Vĩnh Phú là địa bàn đô thị hóa nhanh chóng với chuỗi dự án căn hộ và khu đô thị sinh thái ven sông Sài Gòn: Bệnh viện Phụ sản Quốc tế Hạnh Phúc, Khu đô thị Vĩnh Phú 1 và Vĩnh Phú 2, Chung cư Marina Riverside, Khu căn hộ Ehome 4 Bắc Sài Gòn và trục đại lộ Quốc Lộ 13 huyết mạch.',
    challenges: [
      'Quy định an toàn PCCC khắt khe tại các tòa tháp chung cư Marina Riverside & Ehome 4: Ban quản lý kiểm soát thẻ từ và an ninh nghiêm ngặt; thợ giao gas phải có đồng phục chỉn chu, mang bọc giày vải chống trầy sàn gỗ.',
      'Hệ thống van tự ngắt chống xì gas phòng máy lạnh: Căn hộ chung cư khép kín cần bình gas có van chụp Compact tự động khóa chặt dòng khí ngay khi phát hiện chênh lệch áp suất.',
      'Chống rỉ sét do hơi ẩm sông Sài Gòn: Khu vực ven rạch Vĩnh Bình có độ ẩm cao; vỏ bình gas cần được mạ kẽm và sơn tĩnh điện cao tần theo chuẩn Nhật Bản JIS G3116.'
    ],
    techTable: {
      header: 'Chuẩn Kỹ Thuật Van Tự Ngắt Cho Căn Hộ Chung Cư Phường Vĩnh Phú',
      colBad: 'Bình Gas Tạp Trôi Nổi Không Thương Hiệu',
      colGood: 'Chuẩn Bình Gas Ngọc Gas Tại Phường Vĩnh Phú',
      rows: [
        ['Cơ chế van chụp tự ngắt', 'Van thủ công không tự khóa khi đứt dây dẫn', 'Van Compact Nhật Bản ngắt gas tự động trong 0.5 giây khi tuột dây'],
        ['Kháng hơi nước rạch Vĩnh Bình', 'Sơn xịt sơ sài, đáy bình mục rỉ chỉ sau 2 tháng', 'Thép SG255 sơn tĩnh điện 2 lớp chống ăn mòn ẩm sông 100%'],
        ['Quy trình bọc giày khi vào nhà', 'Đi giày bẩn đạp lên thảm và sàn gỗ căn hộ', '100% thợ mang bọc giày sạch sẽ, có thảm lót cao su bảo vệ sàn'],
        ['Khối lượng khí cân thực tế', 'Bị bớt 2.0kg - 2.5kg, giao gas không có cân', 'Cân điện tử số đối chứng tận mắt: Đủ 12.0kg gas ± 0.1kg']
      ]
    },
    guide: {
      title: 'Hướng Dẫn Xử Lý Khi Van Chụp Compact Bị Kẹt Viên Bi Thép Tự Ngắt',
      intro: 'Tại các căn hộ chung cư dùng van chụp Compact, thỉnh thoảng khi mở van nhưng bếp không có gas do viên bi thép tự ngắt bị kẹt vị trí khóa:',
      steps: [
        'Nhận diện nguyên nhân kẹt bi an toàn: Khi bạn thao tác bật khóa quá nhanh hoặc có xung áp đột ngột trong đường ống, viên bi thép bên trong van sẽ nhảy lên bịt kín đường dẫn khí để phòng chống rò rỉ.',
        'Khóa núm van chụp về vị trí OFF: Xoay núm gạt van Compact về vị trí đóng nằm ngang hoặc tháo rời cụm van ra khỏi cổ bình.',
        'Nhấn nút reset xả áp (nút đồng tròn): Trên thân van chụp Compact luôn có một nút nhấn bằng đồng hoặc nhựa đỏ nhỏ; dùng đầu ngón tay ấn mạnh vào nút reset này và giữ trong 3 giây để cân bằng áp suất hai đầu.',
        'Gạt mở van từ từ: Gạt núm khóa sang vị trí ON theo góc 90 độ một cách chậm rãi, viên bi thép sẽ nằm yên ở vị trí mở và khí gas sẽ lưu thông êm ái lên bếp.'
      ]
    },
    faqs: [
      ['Giao gas lên các tầng cao chung cư Marina Riverside có phụ thu phí thang máy không?', 'Ngọc Gas miễn phí 100% công vận chuyển lên tận căn hộ tầng cao tại tất cả các chung cư trên địa bàn Phường Vĩnh Phú.'],
      ['Đang nấu cơm chiều bị hết gas thì gọi bao lâu có hàng?', 'Nhờ trạm điều phối cắm chốt ngay trục Quốc Lộ 13, nhân viên giao gas Ngọc Gas cam kết có mặt tại nhà quý khách chỉ sau 10 đến 15 phút.'],
      ['Tôi muốn đổi từ vỏ màu đỏ sang vỏ xám Sopet Gas One được không?', 'Hoàn toàn được! Ngọc Gas hỗ trợ đổi ngang miễn phí giữa 4 màu sắc vỏ bình xám, đỏ, xanh, vàng mà không yêu cầu đóng thêm tiền đặt cọc.']
    ]
  },

  {
    id: 126,
    slug: 'giao-gas-phuong-binh-chuan',
    ward: 'Phường Bình Chuẩn',
    city: 'TP. Thuận An',
    title: 'Đổi Bình Gas Phường Bình Chuẩn (TP. Thuận An) — Ngã Tư Bình Chuẩn & KCN Bình Chuẩn',
    summary: 'Đại lý giao gas chính hãng Phường Bình Chuẩn (TP. Thuận An, Bình Dương). Cung cấp Sopet Gas One, Luxen Gas, Phoenix Gas đủ 4 màu vỏ xám, đỏ, xanh, vàng. Giao hỏa tốc 15 phút Ngã tư Bình Chuẩn, ĐT743, Thủ Khoa Huân, KCN Bình Chuẩn, KDC Hài Mỹ, Chợ Bình Chuẩn. Cân đủ 12kg tại bếp, van tự ngắt an toàn, ngọn lửa xanh cực đại. Hotline 1900 9396.',
    subArea: 'thủ phủ công nghiệp chế biến gỗ, cơ khí và dân cư sầm uất TP. Thuận An - Bình Dương',
    landmarks: 'trục Ngã tư Bình Chuẩn, đường ĐT743, Thủ Khoa Huân, KCN Bình Chuẩn, KDC Hài Mỹ, Chợ Bình Chuẩn, đường Bình Chuẩn 14, 34, 62',
    introP1: 'Tọa lạc tại vị trí trung tâm kết nối giữa Thuận An, Thủ Dầu Một và Tân Uyên, Phường Bình Chuẩn là đầu mối giao thông công nghiệp sầm uất với các nút giao chiến lược: Ngã tư Bình Chuẩn, Ngã ba Miếu Ông Cù kề cận, trục đường Thủ Khoa Huân, ĐT743, Khu công nghiệp Bình Chuẩn và chuỗi nhà xưởng cơ khí chế biến gỗ xuất khẩu.',
    challenges: [
      'Cung ứng bình gas công nghiệp 45kg và bình dân dụng 12kg: Đáp ứng công suất nấu nướng lớn cho các bếp ăn tập thể công ty gỗ, xí nghiệp may và chuỗi quán cơm bình dân phục vụ công nhân.',
      'Phục vụ ca kíp linh hoạt: Đổi bình gas nhanh chóng cho công nhân tăng ca về trễ sau 18h00, cam kết thợ giao tới sau 15 phút không để lỡ bữa cơm gia đình.',
      'Kiểm soát an toàn PCCC nhà trọ và nhà xưởng: Đường ống dẫn gas bọc lưới inox ngăn chuột gặm nhấm, bình gas có tem kiểm định an toàn PCCC pháp lý rõ ràng.'
    ],
    techTable: {
      header: 'Chuẩn Tiêu Chí Gas Công Nghiệp & Gia Đình Tại Phường Bình Chuẩn',
      colBad: 'Bình Gas Tạp Trôi Nổi Không Nhãn Mác',
      colGood: 'Chuẩn Khí Sạch Ngọc Gas Tại Bình Chuẩn',
      rows: [
        ['Độ ổn định áp suất dòng khí', 'Tụt áp nhanh, lửa phập phù khi bình còn 1/3', 'Áp suất phun duy trì ổn định đến giọt gas cuối cùng'],
        ['Nhiệt trị ngọn lửa đun nấu', 'Dưới 9.500 kcal/kg, lửa vàng yếu làm hao gas', 'Đạt chuẩn 11.800 kcal/kg, lửa xanh gom nhiệt nấu cực nhanh'],
        ['Trọng lượng kiểm chứng tại bếp', 'Hụt từ 2.0kg đến 2.8kg mỗi bình 12kg', 'Cân điện tử số đối chứng tận mắt đủ 12.0kg ± 0.1kg'],
        ['Bảo hiểm PCCC sản phẩm', 'Không có bảo hiểm, tiềm ẩn rủi ro lớn', 'Có bảo hiểm trách nhiệm sản phẩm theo quy chuẩn PCCC pháp luật']
      ]
    },
    guide: {
      title: 'Phân Biệt Van Điều Áp Cao Áp Công Nghiệp Và Van Hạ Áp Gia Đình',
      intro: 'Nhiều người tại Bình Chuẩn vì muốn lửa to nên tự ý lắp van gas công nghiệp vào bếp gas gia đình, điều này cực kỳ nguy hiểm:',
      steps: [
        'Nhận diện van hạ áp gia đình (màu xám hoặc xanh): Áp suất đầu ra chỉ từ 28 - 30 mbar, có màng cao su điều tiết dòng khí vừa vặn họng bếp gas đôi gia đình, đảm bảo ngọn lửa xanh dịu và tiết kiệm gas.',
        'Nhận diện van cao áp công nghiệp (màu đỏ hoặc vàng có núm xoay tăng áp): Áp suất đầu ra rất lớn (lên tới 1.5 - 2.0 bar), chuyên dùng cho bếp khè xào nấu công suất lớn tại nhà hàng.',
        'Nguy hiểm khôn lường khi dùng lẫn lộn: Lắp van cao áp vào bếp gia đình sẽ làm bục đường ống dẫn cao su, xì gas tại béc phun và gây bùng lửa cháy nổ tức thì.',
        'Khuyến nghị an toàn từ chuyên gia: Bếp gia đình chỉ được dùng van hạ áp có chế độ tự ngắt an toàn Compact hoặc Katsura Nhật Bản.'
      ]
    },
    faqs: [
      ['Xưởng sản xuất tại KCN Bình Chuẩn lấy gas công nghiệp 45kg có xuất hóa đơn VAT không?', 'Ngọc Gas xuất đầy đủ hóa đơn GTGT điện tử (VAT) hợp pháp, có chứng chỉ kiểm định chất lượng và bảo hiểm trách nhiệm sản phẩm đầy đủ.'],
      ['Bình gas giao đến có được cân đối chứng không?', '100% nhân viên giao gas Ngọc Gas luôn mang theo cân điện tử kiểm định, đặt bình gas lên cân trước sự chứng kiến của khách hàng để đối chứng đủ 12kg gas nguyên chất.'],
      ['Tôi đang có vỏ bình màu vàng có đổi sang màu đỏ hoặc xanh được không?', 'Được đổi ngang miễn phí! Ngọc Gas hỗ trợ chuyển đổi linh hoạt giữa 4 màu sắc vỏ bình xám, đỏ, xanh, vàng mà không yêu cầu đóng thêm bất kỳ chi phí cược vỏ nào.']
    ]
  },

  {
    id: 127,
    slug: 'giao-gas-phuong-hung-dinh',
    ward: 'Phường Hưng Định',
    city: 'TP. Thuận An',
    title: 'Đổi Bình Gas Phường Hưng Định (TP. Thuận An) — Làng Du Lịch Cầu Ngang & Vườn Cây Lái Thiêu',
    summary: 'Đại lý giao gas chính hãng Phường Hưng Định (TP. Thuận An, Bình Dương). Cung cấp Sopet Gas One, Luxen Gas, Phoenix Gas đủ 4 màu vỏ xám, đỏ, xanh, vàng. Giao hỏa tốc 15 phút Làng du lịch sinh thái Cầu Ngang, vườn cây ăn trái Lái Thiêu ven sông Sài Gòn, đường An Thạnh - Hưng Định, ĐT745. Cân đủ 12kg tại bếp, van tự ngắt, ngọn lửa xanh cực đại. Hotline 1900 9396.',
    subArea: 'thủ phủ du lịch sinh thái vườn cây ăn trái và ẩm thực miệt vườn Lái Thiêu - TP. Thuận An, Bình Dương',
    landmarks: 'Làng du lịch sinh thái Cầu Ngang, vườn cây ăn trái ven sông Sài Gòn, trục đường ĐT745 (Cách Mạng Tháng Tám), đường Hưng Định 17, 23, 31, rạch Vàm Búng',
    introP1: 'Nằm e ấp bên dòng sông Sài Gòn thơ mộng với những vườn măng cụt, dâu da, sầu riêng sum suê trĩu quả, Phường Hưng Định từ lâu đã nổi tiếng khắp phương Nam với Khu du lịch sinh thái Cầu Ngang, các nhà hàng ẩm thực miệt vườn phục vụ món đặc sản gỏi gà măng cụt, gà nướng đất sét, cháo môn lươn và các tuyến đường ven kênh rạch xanh mát ĐT745.',
    challenges: [
      'Nhu cầu bùng nổ vào các ngày cuối tuần và mùa trái cây (tháng 5 đến tháng 8): Hàng trăm chòi ẩm thực ven mương cần nguồn gas ổn định, áp suất mạnh mẽ để phục vụ thực khách nườm nượp từ TP.HCM đổ về.',
      'Phòng ngừa chuột đồng và côn trùng cắn phá dây gas: Môi trường vườn cây rậm rạp nhiều chuột đồng và kiến gián làm tổ; đòi hỏi ống mềm dẫn gas phải có vỏ bọc lưới thép inox 304 bảo vệ tuyệt đối.',
      'Vỏ bình mạ kẽm chống rỉ sét trước hơi ẩm mương rạch: Không khí sông nước miệt vườn đòi hỏi vỏ bình gas phải được sơn tĩnh điện bảo vệ chống mục đáy bình.'
    ],
    techTable: {
      header: 'Chuẩn Khí Gas Sạch Cho Ẩm Thực Sinh Thái Vườn Cây Hưng Định',
      colBad: 'Bình Gas Tạp Pha Trộn Cặn Dầu',
      colGood: 'Chuẩn Khí Sạch Ngọc Gas Tại Hưng Định',
      rows: [
        ['Hương vị món nướng và lẩu gà', 'Ám mùi khét dầu mỏ, làm giảm độ ngon của gà ta', 'Khí cháy tinh khiết 100%, giữ trọn hương vị thanh ngọt tự nhiên'],
        ['Khả năng kháng chuột cắn dây gas', 'Dây nhựa PVC thường bị chuột đồng cắn thủng gây xì', 'Tặng dây bọc lưới Inox 304 đan dày, ngăn răng chuột 100%'],
        ['Kháng ăn mòn hơi ẩm vườn cây', 'Vỏ bình rỉ sét loang lổ đáy bình nguy hiểm', 'Mạ kẽm sơn tĩnh điện tiêu chuẩn Nhật JIS G3116 chống rỉ sét'],
        ['Giao hàng đường đan nhà vườn', 'Từ chối giao hoặc tính phụ phí đường nhỏ', 'Xe máy cơ động qua mọi cầu ván, đường đan tới tận bếp sau']
      ]
    },
    guide: {
      title: 'Phòng Tránh Chuột Đồng Cắn Dây Dẫn Khí Gas Tại Nhà Vườn',
      intro: 'Nhà vườn râm mát tại Hưng Định là môi trường chuột đồng thường xuyên tìm kiếm thức ăn và gặm nhấm vật liệu mềm:',
      steps: [
        'Tuyệt đối không dùng ống cao su mỏng không lưới thép: Ống cao su thông thường có mùi dầu thơm kích thích khứu giác của chuột, dễ bị cắn thủng chỉ sau một đêm.',
        'Sử dụng ống dẫn bọc lưới sợi Inox 304: Lớp lưới thép đan khít bao bọc ngoài ống cao su nguyên sinh chịu lực khiến răng chuột không thể cắn xuyên qua.',
        'Bôi tinh dầu bạc hà quanh khu vực đặt bình: Chuột rất sợ mùi tinh dầu bạc hà hoặc vỏ cam bưởi khô; đặt quanh chân bình gas để xua đuổi chuột từ xa.',
        'Kê bình gas cách mặt đất 10cm: Sử dụng kệ lót bình gas chuyên dụng để đáy bình không tiếp xúc trực tiếp với nền đất ẩm ướt, ngăn ngừa rỉ sét và chuột làm ổ phía dưới.'
      ]
    },
    faqs: [
      ['Cuối tuần nhà hàng Cầu Ngang đông khách gọi gas gấp có giao liền không?', 'Ngọc Gas luôn bố trí đội ngũ trực chiến riêng cho khu du lịch Cầu Ngang vào các ngày thứ Bảy, Chủ Nhật, cam kết giao hỏa tốc trong 10 đến 15 phút.'],
      ['Bình gas có được kiểm tra rò rỉ bằng bọt xà phòng tận mắt không?', 'Có! 100% nhân viên giao gas Ngọc Gas đều thực hiện quét bọt xà phòng tại cổ van và khớp nối ống dẫn trước khi bàn giao bếp cho khách hàng sử dụng.'],
      ['Đổi vỏ bình gas màu xanh sang màu xám Sopet Gas One có mất tiền cọc không?', 'Hoàn toàn không! Ngọc Gas hỗ trợ đổi vỏ ngang miễn phí giữa 4 màu sắc xám, đỏ, xanh, vàng mà không yêu cầu đóng thêm bất kỳ chi phí cược vỏ nào.']
    ]
  },

  {
    id: 128,
    slug: 'giao-gas-phuong-an-thanh',
    ward: 'Phường An Thạnh',
    city: 'TP. Thuận An',
    title: 'Đổi Bình Gas Phường An Thạnh (TP. Thuận An) — Chợ Búng & THPT Trịnh Hoài Đức',
    summary: 'Đại lý giao gas chính hãng Phường An Thạnh (TP. Thuận An, Bình Dương). Cung cấp Sopet Gas One, Luxen Gas, Phoenix Gas đủ 4 màu vỏ xám, đỏ, xanh, vàng. Giao hỏa tốc 15 phút Chợ Búng lâu đời, Trường THPT Trịnh Hoài Đức, ĐH Thủy Lợi CS2, đường Cách Mạng Tháng Tám, phố bánh bèo bì Búng. Cân đủ 12kg tại bếp, van tự ngắt, ngọn lửa xanh cực đại. Hotline 1900 9396.',
    subArea: 'trung tâm văn hóa giáo dục và ẩm thực bánh bèo bì Búng nức tiếng - TP. Thuận An, Bình Dương',
    landmarks: 'khu vực Chợ Búng sầm uất, Trường THPT Trịnh Hoài Đức cổ kính, Phân hiệu ĐH Thủy Lợi CS2, đường Cách Mạng Tháng Tám, đường An Thạnh 14, 28, 45, KDC An Thạnh',
    introP1: 'Là vùng đất học và văn hóa lâu đời của tỉnh Bình Dương, Phường An Thạnh nổi tiếng với ngôi trường trăm năm THPT Trịnh Hoài Đức, phân hiệu Trường Đại học Thủy Lợi, khu Chợ Búng tấp nập và đặc sản trứ danh bánh bèo bì Búng đã được công nhận là di sản văn hóa ẩm thực tiêu biểu Nam Bộ.',
    challenges: [
      'Hàng chục lò làm bánh bèo bì truyền thống: Cần nguồn nhiệt ổn định từ sáng sớm để hấp bột bánh chín đều xốp mịn, ngọn lửa xanh tinh khiết không làm bám muội đen lên xửng hấp.',
      'Mật độ nhà phố san sát quanh khu vực Chợ Búng: Cần dịch vụ giao gas hỏa tốc bằng xe máy chuyên dụng, không ngại hẻm nhỏ giờ tan trường học sinh.',
      'Yêu cầu an toàn PCCC cho gia đình giáo viên và trí thức: Cần bình gas có van ngắt Compact tự động và dịch vụ bảo trì bếp gas chuyên nghiệp.'
    ],
    techTable: {
      header: 'Tiêu Chuẩn Lửa Xanh Cho Lò Hấp Bánh Bèo Bì & Nhà Phố An Thạnh',
      colBad: 'Bình Gas Sang Chiết Lậu Thiếu Ký',
      colGood: 'Quy Chuẩn Gas Sạch Ngọc Gas Tại An Thạnh',
      rows: [
        ['Độ chín và màu sắc màng bánh bèo', 'Lửa đỏ làm ố xỉn mặt bánh, chín không đều', 'Lửa xanh nhiệt cao 1.800°C làm bánh nở xốp trắng tinh'],
        ['Thời gian đun sôi xửng hấp 3 tầng', 'Mất 35 - 45 phút, tốn gas', 'Chỉ mất 18 - 22 phút nhờ nhiệt trị chuẩn 11.800 kcal/kg'],
        ['Trọng lượng khí cân đối chứng', 'Hụt từ 1.8kg đến 2.5kg mỗi bình', 'Đủ 12.0kg ± 0.1kg đối chứng trên cân điện tử cầm tay'],
        ['Bảo dưỡng và vệ sinh bếp', 'Giao xong lấy tiền đi ngay, không bảo dưỡng', 'Vệ sinh kim phun, mâm chia lửa và lau dầu mỡ miễn phí']
      ]
    },
    guide: {
      title: 'Cách Vệ Sinh Mâm Chia Lửa Bằng Đồng Khi Bị Nước Bột Bánh Trào Dính',
      intro: 'Tại các gia đình và lò bánh tại An Thạnh, bột bánh trào vào họng đốt dễ làm tắc nghẽn kim phun gas:',
      steps: [
        'Tắt bếp và khóa van bình gas: Để bếp nguội hẳn trong khoảng 20 phút trước khi tiến hành vệ sinh.',
        'Tháo mâm đồng và kiềng bếp ngâm nước ấm: Pha nước rửa chén và một muỗng canh baking soda (hoặc giấm) vào thau nước ấm, ngâm mâm đồng trong 15 phút để làm rã lớp tinh bột cháy khét.',
        'Dùng tăm tre thông các khe chia lửa: Dùng que tăm tre hoặc sợi dây đồng nhỏ chọc sạch từng lỗ thoát khí quanh chu vi mâm đồng.',
        'Lau khô và sấy khô trước khi lắp lại: Đảm bảo mâm đồng khô ráo hoàn toàn trước khi đặt lên họng bếp. Bật lửa thử, bếp sẽ bắt lửa ngay và cho ngọn lửa xanh đều không kêu phè phè.'
      ]
    },
    faqs: [
      ['Lò làm bánh bèo bì Búng lấy số lượng nhiều bình gas có được giá ưu đãi không?', 'Ngọc Gas áp dụng chính sách chiết khấu giá sỉ hấp dẫn, hỗ trợ mượn vỏ bình miễn phí và lắp đặt van điều áp công suất lớn cho các hộ kinh doanh ẩm thực tại An Thạnh.'],
      ['Bình gas giao đến nhà có được cân trước mặt không?', '100% bình gas đều được nhân viên cân trực tiếp bằng cân điện tử số trước sự chứng kiến của khách hàng để đảm bảo đủ 12kg gas nguyên chất.'],
      ['Có giao gas vào buổi tối sau 19h00 không?', 'Ngọc Gas phục vụ liên tục đến 22h00 đêm mỗi ngày, cam kết giao nhanh 15 phút tại Phường An Thạnh Thuận An.']
    ]
  },

  {
    id: 129,
    slug: 'giao-gas-phuong-binh-nham',
    ward: 'Phường Bình Nhâm',
    city: 'TP. Thuận An',
    title: 'Đổi Bình Gas Phường Bình Nhâm (TP. Thuận An) — Làng Măng Cụt & Nhà Vườn Sinh Thái',
    summary: 'Đại lý giao gas chính hãng Phường Bình Nhâm (TP. Thuận An, Bình Dương). Cung cấp Sopet Gas One, Luxen Gas, Phoenix Gas đủ 4 màu vỏ xám, đỏ, xanh, vàng. Giao hỏa tốc 15 phút Làng măng cụt đặc sản Bình Nhâm, rạch Lái Thiêu, đường Bình Nhâm 07, 12, 17, nhà vườn sinh thái ven sông. Cân đủ 12kg tại bếp, van tự ngắt, ngọn lửa xanh cực đại. Hotline 1900 9396.',
    subArea: 'thủ phủ cây ăn trái măng cụt di sản và biệt thự vườn nghỉ dưỡng cao cấp - TP. Thuận An, Bình Dương',
    landmarks: 'Làng măng cụt đặc sản Bình Nhâm, rạch Lái Thiêu xanh mát, trục đường Bình Nhâm 07, Bình Nhâm 12, Bình Nhâm 17, đường Nguyễn Chí Thanh, KDC Bình Nhâm',
    introP1: 'Nằm trọn vẹn trong vùng đệm phù sa màu mỡ ven sông Sài Gòn, Phường Bình Nhâm nổi tiếng khắp cả nước với những vườn măng cụt cổ thụ hàng trăm năm tuổi cho trái ngọt thanh mọng nước, không gian sống thanh bình với các khu biệt thự vườn sinh thái nghỉ dưỡng sang trọng của các gia đình doanh nhân.',
    challenges: [
      'Gia đình biệt thự vườn yêu cầu thẩm mỹ và an toàn khắt khe: Yêu cầu bình gas vỏ xám Sopet Gas One chuẩn Nhật Bản, thợ giao gas mang bọc giày vải nhung bảo vệ sàn đá cẩm thạch và sàn gỗ cao cấp.',
      'Khí hậu ẩm ướt rợp bóng cây xanh ven rạch Lái Thiêu: Hơi ẩm mặt đất dễ làm oxy hóa chân đế bình gas; cần bình gas có công nghệ sơn mạ kẽm tĩnh điện chống rỉ sét vượt trội.',
      'Tuyến đường nội bộ nhà vườn quanh co: Cần đội thợ giao gas thông thạo từng cây cầu, lối mòn để đưa bình gas vào tận gian bếp sau trong 15 phút.'
    ],
    techTable: {
      header: 'Tiêu Chuẩn Bình Gas Đẳng Cấp Cho Biệt Thự Vườn Phường Bình Nhâm',
      colBad: 'Bình Gas Cũ Rỉ Sét Bãi Phế Liệu',
      colGood: 'Chuẩn Bình Gas Sopet Gas One Tại Bình Nhâm (Ngọc Gas)',
      rows: [
        ['Thẩm mỹ vỏ bình đặt trong gian bếp', 'Vỏ trầy xước, lem nhem sơn thủ công xấu xí', 'Vỏ xám mạ kẽm sơn tĩnh điện sáng bóng chuẩn công nghệ Nhật'],
        ['Tác phong phục vụ vào biệt thự', 'Đi giày dép bẩn làm trầy xước sàn gỗ', 'Mang bọc giày vải sạch sẽ, trải thảm lót cao su chống trầy sàn'],
        ['Khả năng chống oxy hóa hơi ẩm vườn', 'Đáy bình rỉ sét bong tróc sau vài tháng', 'Thép SG255 JIS G3116 kháng ăn mòn độ ẩm vườn cây 100%'],
        ['Kiểm định an toàn và van tự ngắt', 'Van cũ lỏng gioăng tiềm ẩn nguy cơ xì gas', 'Van Compact / Katsura tự ngắt áp suất cực nhạy trong 0.5 giây']
      ]
    },
    guide: {
      title: 'Nhận Biết Dấu Hiệu Van Gas Bị Lỏng Gioăng Cao Su NBR Và Cách Khắc Phục',
      intro: 'Tại các biệt thự dùng bếp gas nhập khẩu, gioăng cao su ở đầu van điều áp bị chai cứng hoặc rách là nguyên nhân hàng đầu gây mùi gas thoang thoảng:',
      steps: [
        'Khóa van và tháo cụm van ra khỏi bình: Vặn núm tháo van điều áp ra khỏi cổ bình gas.',
        'Quan sát vòng đệm cao su tròn (O-ring) ở đầu ren van: Nếu thấy gioăng cao su màu đen bị méo mó, nứt nẻ, chai cứng hoặc bị rách một góc, gioăng đã mất tính đàn hồi làm kín.',
        'Không dùng băng keo non quấn tạm bợ: Khí gas có tính dung môi sẽ hòa tan keo non gây rò rỉ nguy hiểm hơn.',
        'Thay gioăng cao su NBR chuyên dụng mới: Lấy gioăng cao su chịu gas chuyên dụng do kỹ thuật viên Ngọc Gas cung cấp lắp vào rãnh đầu van. Vặn chặt lại và quét bọt xà phòng kiểm tra độ kín tuyệt đối.'
      ]
    },
    faqs: [
      ['Thợ giao gas có mang bọc giày khi vào nhà biệt thự không?', '100% nhân viên giao gas Ngọc Gas khi bước vào nhà khách hàng đều mang bọc giày vải sạch sẽ và đặt bình gas lên thảm cao su chuyên dụng để bảo vệ mặt sàn.'],
      ['Bình gas Sopet Gas One vỏ xám Nhật Bản có những kích cỡ nào?', 'Ngọc Gas cung cấp dòng Sopet Gas One bình 12kg van ngang POL và van chụp Compact cao cấp, đầy đủ tem kiểm định và bảo hiểm an toàn.'],
      ['Giao gas vào các đường nhánh Bình Nhâm có tính phụ phí không?', 'Ngọc Gas miễn phí 100% chi phí vận chuyển tận bếp cho cư dân trên toàn địa bàn Phường Bình Nhâm Thuận An.']
    ]
  },

  {
    id: 130,
    slug: 'giao-gas-phuong-phu-cuong',
    ward: 'Phường Phú Cường',
    city: 'TP. Thủ Dầu Một',
    title: 'Đổi Bình Gas Phường Phú Cường (TP. Thủ Dầu Một) — Chợ Thủ Dầu Một & Phố Đi Bộ Bạch Đằng',
    summary: 'Đại lý giao gas chính hãng Phường Phú Cường (TP. Thủ Dầu Một, Bình Dương). Cung cấp Sopet Gas One, Luxen Gas, Phoenix Gas đủ 4 màu vỏ xám, đỏ, xanh, vàng. Giao hỏa tốc 15 phút Chợ Thủ Dầu Một, Nhà thờ Chánh tòa Phú Cường, Phố đi bộ Bạch Đằng, Chùa Bà Thiên Hậu, Yersin. Cân đủ 12kg tại bếp, van tự ngắt, ngọn lửa xanh cực đại. Hotline 1900 9396.',
    subArea: 'trái tim thủ phủ trung tâm tỉnh lỵ Bình Dương và phố đêm ven sông Sài Gòn',
    landmarks: 'Chợ Thủ Dầu Một cổ kính có tháp đồng hồ biểu tượng, Nhà thờ Chánh tòa Phú Cường, Phố đi bộ Bạch Đằng ven sông Sài Gòn, Chùa Bà Thiên Hậu (Lễ hội Rằm tháng Giêng), đường Yersin, đường Bác Sĩ Yersin, ngã sáu Bình Dương',
    introP1: 'Là trung tâm lịch sử, chính trị và thương mại sầm uất nhất của tỉnh lỵ Bình Dương, Phường Phú Cường sở hữu vẻ đẹp giao thoa giữa phố chợ cổ trăm năm bên sông Sài Gòn và nhịp sống đô thị hiện đại với các biểu tượng: Chợ Thủ Dầu Một với tháp đồng hồ huyền thoại, Nhà thờ Chánh tòa Phú Cường nguy nga, Phố đi bộ Bạch Đằng rực rỡ ánh đèn đêm và Chùa Bà Thiên Hậu linh thiêng.',
    challenges: [
      'Phố ẩm thực và chợ đêm Bạch Đằng hoạt động sôi động đến 2h sáng: Nhu cầu gas đun nấu áp suất cao phục vụ liên tục các quán nướng lẩu, ốc, mì cay và cà phê ven sông.',
      'Khu phố cổ nhà ống hẻm sâu mật độ dân cư cao: Yêu cầu PCCC khắt khe; bình gas phải đạt chuẩn áp lực phá hủy trên 68 bar, van Compact tự ngắt khi có sự cố.',
      'Cần đội xe giao gas ca đêm túc trực 24/7: Khi các quán ăn đêm hết gas bất ngờ, cần thợ có mặt sau 10 - 15 phút để không làm gián đoạn việc phục vụ thực khách.'
    ],
    techTable: {
      header: 'Tiêu Chuẩn Vận Hành Khí Gas Cho Phố Đêm Ẩm Thực Phường Phú Cường',
      colBad: 'Đại Lý Gas Thông Thường Ca Đêm',
      colGood: 'Quy Chuẩn Ngọc Gas Phường Phú Cường',
      rows: [
        ['Khả năng phục vụ ca đêm', 'Đóng cửa sau 20h00, không nghe máy', 'Túc trực ca đêm 24/7, có mặt trong 15 phút tại phố Bạch Đằng'],
        ['Nhiệt lượng ngọn lửa đun nấu', 'Lửa đỏ khói than, làm đen xoong chảo', 'Lửa xanh biếc 11.800 kcal/kg, giữ nồi hầm sáng bóng'],
        ['Kiểm định cân nặng tận nơi', 'Cân thiếu từ 2.0kg đến 2.8kg', 'Cân điện tử số đối chứng đủ 12.0kg ± 0.1kg trước mặt chủ quán'],
        ['Kiểm tra rò rỉ sau lắp đặt', 'Không kiểm tra, vội vàng lấy tiền', 'Dùng dung dịch bọt chuyên dụng rà kín 100% khớp nối']
      ]
    },
    guide: {
      title: 'Kỹ Thuật Kiểm Tra Hạn Kiểm Định An Toàn Dập Trên Quai Bình Gas',
      intro: 'Tại các quán ăn và gia đình tại Phú Cường, việc kiểm tra hạn kiểm định an toàn vỏ bình giúp phòng ngừa nguy cơ nổ bình do vỏ quá hạn:',
      steps: [
        'Quan sát quai xách bình gas: Mỗi bình gas chính hãng đều được dập chìm thông tin kiểm định trên một trong hai quai xách kim loại.',
        'Đọc ký hiệu tháng và năm kiểm định: Chữ dập thường có dạng như "08-28" (nghĩa là hạn kiểm định đến tháng 08 năm 2028) hoặc "Q3-27" (Quý 3 năm 2027).',
        'Đối chiếu với thời điểm hiện tại: Nếu năm hiện tại vượt quá năm dập trên quai, bình gas đó đã hết hạn lưu hành và bắt buộc phải đưa về nhà máy tái kiểm định thủy lực.',
        'Cam kết tại Ngọc Gas: 100% bình gas xuất kho đều còn hạn kiểm định an toàn PCCC từ 2 đến 5 năm, tuyệt đối không xuất bình quá hạn.'
      ]
    },
    faqs: [
      ['Quán ăn đêm trên phố đi bộ Bạch Đằng gọi gas lúc 23h00 có giao không?', 'Có! Ngọc Gas có đội ngũ trực chiến ban đêm phục vụ các nhà hàng, quán ăn đêm trên toàn địa bàn Phường Phú Cường, giao nhanh 15 phút đúng giá niêm yết.'],
      ['Bình gas có đầy đủ tem chống giả và màng co không?', '100% bình gas Ngọc Gas đều nguyên màng co niêm phong cổ van và tem chống hàng giả công nghệ cao, quét mã QR kiểm tra xuất xứ rõ ràng.'],
      ['Đổi vỏ bình gas hãng khác sang Luxen hoặc Sopet có mất tiền không?', 'Ngọc Gas hỗ trợ thu hồi đổi ngang tất cả các loại vỏ bình gas hợp pháp trên thị trường hoàn toàn miễn phí cọc vỏ.']
    ]
  },

  {
    id: 131,
    slug: 'giao-gas-phuong-phu-hoa',
    ward: 'Phường Phú Hòa',
    city: 'TP. Thủ Dầu Một',
    title: 'Đổi Bình Gas Phường Phú Hòa (TP. Thủ Dầu Một) — Đại Học Thủ Dầu Một & KDC Phú Hòa 1',
    summary: 'Đại lý giao gas chính hãng Phường Phú Hòa (TP. Thủ Dầu Một, Bình Dương). Cung cấp Sopet Gas One, Luxen Gas, Phoenix Gas đủ 4 màu vỏ xám, đỏ, xanh, vàng. Giao hỏa tốc 15 phút Đại học Thủ Dầu Một (20.000 sinh viên), đường Lê Hồng Phong, KDC Phú Hòa 1, đường D1, D2. Cân đủ 12kg tại bếp, van tự ngắt, ngọn lửa xanh cực đại. Hotline 1900 9396.',
    subArea: 'làng đại học sôi động và khu đô thị dịch vụ sầm uất bậc nhất TP. Thủ Dầu Một - Bình Dương',
    landmarks: 'Trường Đại học Thủ Dầu Một với hơn 20.000 sinh viên, trục đại lộ Lê Hồng Phong, Khu dân cư kiểu mẫu Phú Hòa 1, đường D1, D2 ẩm thực sinh viên, Chợ Phú Hòa, đường Nguyễn Thị Minh Khai',
    introP1: 'Là trung tâm giáo dục đại học và dịch vụ thương mại trẻ trung bậc nhất TP. Thủ Dầu Một, Phường Phú Hòa tập trung Trường Đại học Thủ Dầu Một quy mô trên 20.000 sinh viên, trục đại lộ sầm uất Lê Hồng Phong, Khu dân cư văn minh Phú Hòa 1 cùng hàng trăm quán ăn, quán trà sữa, tiệm cơm sinh viên và chuỗi nhà trọ khép kín.',
    challenges: [
      'Cộng đồng sinh viên và người đi làm trẻ ở trọ: Ngân sách eo hẹp cần bình gas chính hãng đúng giá niêm yết, đủ 12kg cân tận tay để không bị các cơ sở dạo lừa gạt rút ruột.',
      'Chuỗi quán cơm và trà sữa đường D1, D2 hoạt động liên tục: Nhu cầu nấu nướng dồn dập vào giờ ăn trưa 11h - 13h và chiều tối 17h - 20h, cần giao gas hỏa tốc trong 10 - 15 phút.',
      'Phòng trọ sinh viên diện tích chật hẹp: Đòi hỏi giải pháp an toàn van tự ngắt và dây dẫn gas chống chuột cắn để ngăn ngừa hỏa hoạn.'
    ],
    techTable: {
      header: 'Tiêu Chuẩn Bình Gas Sinh Viên & Quán Ăn Tại Phường Phú Hòa',
      colBad: 'Bình Gas Dạo Giá Rẻ Bất Thường',
      colGood: 'Chuẩn Gas Chính Hãng Ngọc Gas Tại Phú Hòa',
      rows: [
        ['Khối lượng khí cân thực tế', 'Bị bòn rút từ 2.0kg đến 3.0kg khí', 'Đủ 12.0kg ± 0.1kg kiểm chứng tận mắt trên cân điện tử'],
        ['Thời gian sử dụng cho 3 bạn sinh viên', 'Chỉ dùng được 30 - 35 ngày là hết', 'Dùng bền bỉ từ 65 đến 75 ngày nhờ khí tinh khiết đủ cân'],
        ['Màu sắc ngọn lửa đun nấu', 'Lửa đỏ bám muội đen xì đáy nồi', 'Lửa xanh biếc 11.800 kcal/kg nấu nhanh không đen nồi'],
        ['Chính sách quà tặng an toàn', 'Không có quà, không bảo hành', 'Tặng dây bọc lưới inox chống chuột hoặc van tự ngắt an toàn']
      ]
    },
    guide: {
      title: 'Đo Lượng Gas Lỏng Còn Lại Bằng Khăn Ấm Thay Vì Lắc Bình Nguy Hiểm',
      intro: 'Nhiều bạn sinh viên tại Phú Hòa có thói quen lắc mạnh bình gas để xem còn gas không, điều này rất nguy hiểm. Kỹ thuật viên hướng dẫn mẹo an toàn:',
      steps: [
        'Chuẩn bị một chiếc khăn bông thấm nước ấm: Nhúng khăn vào nước ấm khoảng 40 - 50°C, vắt nhẹ cho ráo nước.',
        'Áp khăn ấm vuốt dọc thân bình: Lau khăn ấm quanh chu vi thân bình kim loại từ trên cổ bình xuống tận đáy trong 15 giây rồi lấy khăn ra.',
        'Dùng lòng bàn tay sờ chậm rãi từ trên xuống dưới: Phần thân bình phía trên chứa khí gas dạng hơi sẽ nhanh chóng ấm lên theo nhiệt độ của khăn.',
        'Xác định ranh giới ngưng tụ hơi lạnh: Phần thân bình phía dưới còn chứa gas lỏng sẽ hấp thu nhiệt cực mạnh, sờ vào thấy mát lạnh rõ rệt và có hơi ẩm đọng sương li ti. Đường ranh giới phân tách giữa phần ấm và phần lạnh chính là mức gas lỏng thực tế còn lại.'
      ]
    },
    faqs: [
      ['Sinh viên đổi gas có chương trình trợ giá hoặc quà tặng không?', 'Ngọc Gas luôn có chính sách ưu đãi trợ giá và tặng kèm dây dẫn gas bọc lưới inox chống chuột cắn hoặc van tự ngắt an toàn cho các bạn sinh viên tại Phú Hòa.'],
      ['Phòng trọ trong hẻm sâu đường Lê Hồng Phong có giao tận nơi không?', 'Ngọc Gas miễn phí 100% công vận chuyển vào tận phòng trọ, hỗ trợ bê bình gas lên gác lửng và kiểm tra bếp gas miễn phí.'],
      ['Tôi muốn đổi vỏ bình gas màu xanh sang màu xám Sopet Gas One được không?', 'Được đổi ngang miễn phí 100% giữa 4 màu sắc xám, đỏ, xanh, vàng mà không yêu cầu đóng thêm bất kỳ khoản phí cược vỏ nào.']
    ]
  },

  {
    id: 132,
    slug: 'giao-gas-phuong-chanh-nghia',
    ward: 'Phường Chánh Nghĩa',
    city: 'TP. Thủ Dầu Một',
    title: 'Đổi Bình Gas Phường Chánh Nghĩa (TP. Thủ Dầu Một) — Phố Tây Ẩm Thực & Becamex Tower',
    summary: 'Đại lý giao gas chính hãng Phường Chánh Nghĩa (TP. Thủ Dầu Một, Bình Dương). Cung cấp Sopet Gas One, Luxen Gas, Phoenix Gas đủ 4 màu vỏ xám, đỏ, xanh, vàng. Giao hỏa tốc 15 phút Phố Tây Chánh Nghĩa, Tòa tháp Becamex Tower, đường Ba Mươi Tháng Tư, KDC Chánh Nghĩa. Cân đủ 12kg tại bếp, van tự ngắt căn hộ, ngọn lửa xanh cực đại. Hotline 1900 9396.',
    subArea: 'khu phố Tây thượng lưu, trung tâm tài chính và ẩm thực quốc tế sầm uất nhất Bình Dương',
    landmarks: 'KDC Chánh Nghĩa - "Phố Tây" Bình Dương, Tòa tháp Becamex Tower, Trung tâm Thương mại Becamex, đường Ba Mươi Tháng Tư, đường Ngô Gia Tự, Hoàng Văn Thụ, chuỗi nhà hàng ẩm thực Hàn Quốc, Nhật Bản, Âu - Á',
    introP1: 'Được ví như khu phố nhà giàu sầm uất và hiện đại bậc nhất tỉnh Bình Dương, Phường Chánh Nghĩa quy tụ biểu tượng Tòa tháp Becamex Tower 23 tầng, Trung tâm Thương mại Becamex, Khu dân cư kiểu mẫu Chánh Nghĩa cùng hệ thống hàng trăm nhà hàng ẩm thực, quán cà phê cao cấp của cộng đồng chuyên gia nước ngoài Hàn Quốc, Nhật Bản, Đài Loan sinh sống và làm việc.',
    challenges: [
      'Chuỗi nhà hàng ẩm thực Hàn - Nhật - Âu đòi hỏi tiêu chuẩn khắt khe: Bếp âu nhiều họng đốt cần áp suất dòng khí cực kỳ ổn định, ngọn lửa xanh nhiệt độ cao và không có mùi tạp chất.',
      'Căn hộ cao cấp và biệt thự chuyên gia: Đòi hỏi bình gas Sopet Gas One chuẩn công nghệ Nhật Bản, van tự ngắt thông minh và kỹ thuật viên giao gas có tác phong lịch sự, mang bọc giày.',
      'Yêu cầu giao gas hỏa tốc vào giờ mở cửa kinh doanh: Trực chiến giao gas 15 phút không để thực khách tại các nhà hàng phố Tây phải chờ đợi.'
    ],
    techTable: {
      header: 'Tiêu Chuẩn Năng Lượng Đẳng Cấp Cho Phố Tây Phường Chánh Nghĩa',
      colBad: 'Bình Gas Tạp Trôi Nổi Trên Thị Trường',
      colGood: 'Chuẩn Năng Lượng Sopet Gas One Tại Chánh Nghĩa',
      rows: [
        ['Độ ổn định áp suất bếp âu nhiều họng', 'Áp suất chập chờn làm tắt lửa họng phụ', 'Áp suất phun điều hòa chuẩn xác cho bếp nhiều họng đốt'],
        ['Hương vị món nướng BBQ và bít tết', 'Ám khói khét làm mất mùi vị thịt bò Wagyu', 'Khí sạch tinh khiết 100%, giữ trọn vị ngọt thơm tự nhiên'],
        ['Tác phong kỹ thuật viên phục vụ', 'Đi dép lê, không đồng phục, cẩu thả', 'Đồng phục nhận diện, bọc giày sạch sẽ, bảo dưỡng bếp tận tâm'],
        ['Bảo hiểm trách nhiệm sản phẩm', 'Không có bảo hiểm pháp lý', 'Bảo hiểm PCCC đầy đủ theo quy định hiện hành']
      ]
    },
    guide: {
      title: 'Tiêu Chuẩn Van Điều Áp Tự Ngắt Chống Quá Áp Cho Bếp Âu Nhà Hàng',
      intro: 'Tại các nhà hàng phố Tây Chánh Nghĩa sử dụng bếp âu công suất lớn, hệ thống van điều áp cần đáp ứng quy chuẩn:',
      steps: [
        'Chọn van điều áp có tích hợp rơ-le ngắt quá áp: Khi áp suất trong đường ống tăng vọt bất thường do nghẹt béc đốt, rơ-le an toàn sẽ tự động ngắt dòng khí tức thì.',
        'Sử dụng ống dẫn bọc inox chịu áp lực 20 bar: Ống dẫn mềm từ bình gas vào giàn bếp phải là loại ống chuyên dụng chịu áp suất cao và chống dầu mỡ ăn mòn.',
        'Kiểm tra đồng hồ đo áp suất định kỳ: Đồng hồ trên thân van giúp đầu bếp theo dõi lượng gas còn lại và áp suất dòng khí đang cấp vào bếp.',
        'Thay thế van định kỳ 3 năm một lần: Màng cao su điều áp sau 3 năm hoạt động liên tục sẽ bị lão hóa, cần thay thế cụm van mới để đảm bảo độ nhạy ngắt an toàn.'
      ]
    },
    faqs: [
      ['Nhà hàng Hàn Quốc nướng BBQ tại Chánh Nghĩa đổi nhiều bình có giá sỉ không?', 'Ngọc Gas cung cấp chính sách giá sỉ đặc quyền, hỗ trợ lắp đặt hệ thống giàn góp gas an toàn và bảo dưỡng bếp nướng định kỳ miễn phí.'],
      ['Chuyên gia nước ngoài không rành tiếng Việt thì đặt gas thế nào?', 'Tổng đài Ngọc Gas 1900 9396 có nhân viên hỗ trợ song ngữ Anh - Việt, tiếp nhận và giao hàng nhanh chóng chỉ sau 15 phút.'],
      ['Bình gas Sopet Gas One vỏ xám Nhật Bản có những loại van nào?', 'Có đầy đủ cả hệ van ren xoay POL chuẩn thông dụng và hệ van chụp Compact bấm khóa tự động cao cấp.']
    ]
  },

  {
    id: 133,
    slug: 'giao-gas-phuong-hiep-thanh-binh-duong',
    ward: 'Phường Hiệp Thành',
    city: 'TP. Thủ Dầu Một',
    title: 'Đổi Bình Gas Phường Hiệp Thành (TP. Thủ Dầu Một) — BV Đa Khoa Tỉnh & KDC Hiệp Thành',
    summary: 'Đại lý giao gas chính hãng Phường Hiệp Thành (TP. Thủ Dầu Một, Bình Dương). Cung cấp Sopet Gas One, Luxen Gas, Phoenix Gas đủ 4 màu vỏ xám, đỏ, xanh, vàng. Giao hỏa tốc 15 phút Bệnh viện Đa khoa tỉnh Bình Dương mới 1.500 giường, cụm KDC Hiệp Thành 1-2-3, Đại lộ Bình Dương, Phạm Ngọc Thạch. Cân đủ 12kg tại bếp, van tự ngắt, ngọn lửa xanh cực đại. Hotline 1900 9396.',
    subArea: 'trung tâm y tế kỹ thuật cao và khu dân cư trí thức kiểu mẫu TP. Thủ Dầu Một - Bình Dương',
    landmarks: 'Bệnh viện Đa khoa tỉnh Bình Dương mới quy mô 1.500 giường bệnh hiện đại, cụm Khu dân cư Hiệp Thành 1, Hiệp Thành 2, Hiệp Thành 3, trục đại lộ Phạm Ngọc Thạch, Đại lộ Bình Dương (Quốc Lộ 13), đường Huỳnh Văn Lũy',
    introP1: 'Là trung tâm y tế và chăm sóc sức khỏe hàng đầu của tỉnh Bình Dương với công trình Bệnh viện Đa khoa tỉnh quy mô 1.500 giường bệnh hiện đại, Phường Hiệp Thành sở hữu chuỗi khu đô thị kiểu mẫu văn minh Hiệp Thành 1, 2, 3 cùng các trục đại lộ thênh thang Phạm Ngọc Thạch, Đại lộ Bình Dương nơi sinh sống của đông đảo y bác sĩ, giảng viên và cán bộ công chức.',
    challenges: [
      'Tiêu chuẩn an toàn PCCC khắt khe vùng lân cận bệnh viện và khu dân cư trí thức: Yêu cầu tuyệt đối không để rò rỉ khí gas, bình gas phải có nguồn gốc pháp lý minh bạch và bảo hiểm sản phẩm.',
      'Nhu cầu đun nấu nước sôi tiệt trùng và ăn uống dinh dưỡng: Cần nguồn gas nhiệt lượng cao 11.800 kcal/kg, ngọn lửa xanh tinh khiết bảo vệ sức khỏe cho người bệnh và gia đình.',
      'Giao gas hỏa tốc đúng hẹn không làm phiền giờ nghỉ ngơi: Kỹ thuật viên di chuyển êm ái, bọc giày sạch sẽ khi vào căn hộ biệt thự Hiệp Thành 3.'
    ],
    techTable: {
      header: 'Chuẩn PCCC & An Toàn Năng Lượng Cho KDC Hiệp Thành 1-2-3',
      colBad: 'Bình Gas Trôi Nổi Không Rõ Xuất Xứ',
      colGood: 'Chuẩn An Toàn PCCC Ngọc Gas Tại Hiệp Thành',
      rows: [
        ['Áp suất thử nghiệm an toàn vỏ thép', 'Không rõ kiểm định, nguy cơ nứt vỡ', 'Kiểm nghiệm thủy lực 34 bar, chịu áp suất nổ trên 68 bar'],
        ['Hệ thống van ngắt tự động', 'Van cũ rò rỉ khí gas qua ren', 'Van Compact Nhật Bản ngắt dòng khí tự động trong 0.5 giây'],
        ['Chứng nhận bảo hiểm PCCC', 'Không có bảo hiểm bồi thường', 'Có bảo hiểm trách nhiệm sản phẩm theo quy chuẩn an toàn PCCC'],
        ['Quy trình kiểm tra tại nhà', 'Không kiểm tra, vội vã bàn giao', 'Dùng máy dò khí gas rà soát toàn bộ hệ thống bếp miễn phí']
      ]
    },
    guide: {
      title: 'Quy Trình 4 Bước Kiểm Tra Tia Lửa Điện IC Khi Bật Bếp Kêu Cạch Cạch Mà Không Cháy',
      intro: 'Tại các gia đình tại Hiệp Thành, đôi khi bật bếp gas nghe tiếng cạch cạch nhưng lửa không bắt cháy do hệ thống đánh lửa IC:',
      steps: [
        'Kiểm tra pin đánh lửa dưới đáy bếp: Hầu hết bếp gas âm dùng pin đại 1.5V (size D); nếu pin yếu tia lửa điện sẽ phát ra yếu ớt. Tháo nắp khay pin dưới bụng bếp thay pin mới.',
        'Quan sát vị trí đầu kim sứ đánh lửa: Đầu kim kim loại phải chĩa thẳng vào khe thoát khí của mâm đồng ở khoảng cách 3 - 4mm; nếu kim bị lệch góc hãy nắn nhẹ lại.',
        'Lau sạch dầu mỡ bám trên thân sứ cách điện: Nếu thân sứ bọc kim bị bám dầu mỡ ẩm ướt, tia lửa điện sẽ bị phóng tản mạn xuống sườn bếp thay vì phóng vào họng gas.',
        'Bật thử núm xoay giữ 3 giây: Xoay núm vặn giữ nguyên vị trí nhấn trong 3 giây để cảm ứng nhiệt mở van từ tính an toàn, bếp sẽ bùng cháy lửa xanh ngắt.'
      ]
    },
    faqs: [
      ['Giao gas vào khu đô thị Hiệp Thành 3 có phụ thu thêm phí không?', 'Ngọc Gas miễn phí 100% công vận chuyển và kiểm tra bảo dưỡng hệ thống bếp gas cho tất cả cư dân tại các KDC Hiệp Thành 1, 2, 3.'],
      ['Bác sĩ trực ca bệnh viện cần đổi gas lúc 21h00 đêm có được phục vụ không?', 'Ngọc Gas phục vụ liên tục đến 22h00 đêm mỗi ngày, cam kết giao hỏa tốc 15 phút đúng hẹn.'],
      ['Bình gas có được cân đối chứng bằng cân điện tử không?', '100% nhân viên giao gas Ngọc Gas đều mang theo cân điện tử kiểm định, cân đủ 12.0kg gas trước sự chứng kiến của gia chủ.']
    ]
  },

  {
    id: 134,
    slug: 'giao-gas-phuong-hoa-phu',
    ward: 'Phường Hòa Phú',
    city: 'TP. Thủ Dầu Một',
    title: 'Đổi Bình Gas Phường Hòa Phú (TP. Thủ Dầu Một) — Trung Tâm TP Mới Bình Dương & WTC Expo',
    summary: 'Đại lý giao gas chính hãng Phường Hòa Phú (TP. Thủ Dầu Một, Bình Dương). Cung cấp Sopet Gas One, Luxen Gas, Phoenix Gas đủ 4 màu vỏ xám, đỏ, xanh, vàng. Giao hỏa tốc 15 phút Trung tâm Thành phố Mới Bình Dương (New City), Tòa nhà Hành chính tỉnh, Công viên 75ha, WTC Expo, ĐH Quốc tế Miền Đông. Cân đủ 12kg tại bếp, van tự ngắt, ngọn lửa xanh cực đại. Hotline 1900 9396.',
    subArea: 'trung tâm đô thị thông minh Thành phố Mới Bình Dương và triển lãm thương mại quốc tế',
    landmarks: 'Trung tâm Thành phố Mới Bình Dương (Binh Duong New City), Tòa tháp đôi Trung tâm Hành chính tập trung tỉnh Bình Dương, Công viên Trung tâm 75ha hồ nước sinh thái, Trung tâm Triển lãm Quốc tế WTC Expo, Trường Đại học Quốc tế Miền Đông (EIU)',
    introP1: 'Được quy hoạch là hạt nhân đô thị thông minh tương lai của vùng kinh tế trọng điểm phía Nam, Phường Hòa Phú là nơi tọa lạc Thành phố Mới Bình Dương với những công trình tầm vóc quốc tế: Tòa tháp đôi Trung tâm Hành chính tỉnh cao 20 tầng, Công viên Trung tâm 75ha xanh mát, Trung tâm Triển lãm WTC Expo, Đại học Quốc tế Miền Đông và chuỗi biệt thự compound sinh thái.',
    challenges: [
      'Khu đô thị thông minh với tiêu chuẩn an ninh và môi trường nghiêm ngặt: Quy định giao hàng qua trạm kiểm soát thẻ từ an ninh; thợ giao gas phải tác phong chuyên nghiệp, xe chuyên dụng sạch đẹp.',
      'Căn hộ chung cư cao cấp và biệt thự vườn thiết kế bếp đảo hiện đại: Yêu cầu bình gas chuẩn Nhật Bản Sopet Gas One vỏ xám mạ kẽm sang trọng, van Compact chống rò rỉ tuyệt đối.',
      'Phục vụ các hội nghị, sự kiện triển lãm quốc tế WTC Expo: Nhu cầu cung ứng gas công nghiệp và dân dụng đúng giờ, đầy đủ chứng chỉ kiểm định chất lượng.'
    ],
    techTable: {
      header: 'Tiêu Chuẩn Năng Lượng Đô Thị Thông Minh Thành Phố Mới Hòa Phú',
      colBad: 'Bình Gas Tạp Trôi Nổi Không Thương Hiệu',
      colGood: 'Chuẩn Năng Lượng Xanh Ngọc Gas Tại Hòa Phú',
      rows: [
        ['Công nghệ lọc khí và khí thải CO2', 'Nhiều tạp chất, phát thải khí độc hại', 'Tinh chế triệt để, cháy sạch 100%, thân thiện môi trường'],
        ['Thẩm mỹ và độ mới của vỏ bình', 'Vỏ trầy xước rỉ sét làm xấu gian bếp đảo', 'Vỏ bình xám Nhật Sopet Gas One sơn tĩnh điện sang trọng'],
        ['Cơ chế khóa an toàn tự động', 'Van ren lỏng không tự khóa khi gặp sự cố', 'Van Compact bi thép tự ngắt tức thì bảo vệ căn hộ thông minh'],
        ['Thủ tục đăng ký an ninh tòa nhà', 'Không xuất trình giấy tờ, bị bảo vệ chặn', 'Thẻ nhân viên, đồng phục chuẩn, đáp ứng kiểm soát an ninh 100%']
      ]
    },
    guide: {
      title: 'Quy Chuẩn Thoát Khí Gas An Toàn Trong Căn Hộ Thiết Kế Bếp Đảo Trung Tâm',
      intro: 'Tại các biệt thự và căn hộ cao cấp Thành phố Mới Bình Dương thiết kế bếp đảo giữa nhà, quy tắc an toàn khí đốt cần lưu ý:',
      steps: [
        'Bố trí hộc tủ bếp có khe thoáng khí đối lưu: Khí LPG nặng hơn không khí nên sẽ chìm xuống sát sàn; hộc chứa bình gas dưới bếp đảo bắt buộc phải có khe thông gió ở đáy tủ.',
        'Tuyệt đối không để ổ cắm điện hoặc biến áp đèn LED trong hộc gas: Ngăn ngừa hoàn toàn nguy cơ tia lửa điện phát sinh gần cổ bình.',
        'Sử dụng van điều áp có khóa an toàn hai nấc: Vừa có núm xoay gạt khóa cơ học, vừa có viên bi thép tự ngắt cảm ứng áp suất.',
        'Lắp đặt đầu dò khí gas kết nối hệ thống SmartHome: Cảm biến rò rỉ gas đặt cách sàn 20cm sẽ tự động gửi cảnh báo về điện thoại gia chủ ngay khi phát hiện nồng độ gas vượt ngưỡng 0.1%.'
      ]
    },
    faqs: [
      ['Giao gas vào khu biệt thự Midori Park hay Tokyu Sora Gardens có được không?', 'Ngọc Gas là đối tác tin cậy của hàng ngàn hộ gia đình tại Midori Park, Sora Gardens, The View... đáp ứng 100% quy định an ninh tòa nhà.'],
      ['Bình gas có bảo hiểm trách nhiệm sản phẩm không?', 'Tất cả sản phẩm bình gas tại Ngọc Gas đều được bảo hiểm trách nhiệm sản phẩm theo quy chuẩn an toàn PCCC và quy định hiện hành.'],
      ['Gọi gas vào buổi trưa khoảng bao lâu thì nhân viên tới nhà?', 'Với đội ngũ xe cơ động thường trực tại Thành phố Mới Bình Dương, Ngọc Gas cam kết có mặt tại nhà quý khách sau 10 đến 15 phút.']
    ]
  },

  {
    id: 135,
    slug: 'giao-gas-phuong-thai-hoa',
    ward: 'Phường Thái Hòa',
    city: 'TP. Tân Uyên',
    title: 'Đổi Bình Gas Phường Thái Hòa (TP. Tân Uyên) — Ngã Tư Miếu Ông Cù & Chợ Chí Hùng',
    summary: 'Đại lý giao gas chính hãng Phường Thái Hòa (TP. Tân Uyên, Bình Dương). Cung cấp Sopet Gas One, Luxen Gas, Phoenix Gas đủ 4 màu vỏ xám, đỏ, xanh, vàng. Giao hỏa tốc 15 phút Ngã tư Miếu Ông Cù, ĐT743, ĐT747B, Chợ Chí Hùng, KDC Thái Hòa, giáp Dĩ An & Thuận An. Cân đủ 12kg tại bếp, van tự ngắt, ngọn lửa xanh cực đại. Hotline 1900 9396.',
    subArea: 'cửa ngõ giao thương công nghiệp huyết mạch giáp ranh Dĩ An và Thuận An - TP. Tân Uyên, Bình Dương',
    landmarks: 'Ngã tư Miếu Ông Cù huyết mạch, trục đại lộ ĐT743, ĐT747B, Chợ truyền thống Chí Hùng, Chợ Đông Đô, KDC Thái Hòa, giáp ranh trực tiếp Tân Đông Hiệp (Dĩ An) và Thuận Giao (Thuận An)',
    introP1: 'Tọa lạc tại cửa ngõ phía Nam chiến lược của TP. Tân Uyên giáp ranh với cả TP. Dĩ An và TP. Thuận An, Phường Thái Hòa là một trong những đô thị công nghiệp sôi động bậc nhất tỉnh Bình Dương với nút giao thương huyết mạch Ngã tư Miếu Ông Cù, trục đường ĐT743, ĐT747B, khu Chợ Chí Hùng sầm uất cùng hàng trăm công ty, xí nghiệp chế biến gỗ, dệt may, cơ khí.',
    challenges: [
      'Áp lực giao thông giờ cao điểm tại nút giao Miếu Ông Cù: Cần đơn vị giao gas có mạng lưới trạm cắm chốt thông thuộc mọi tuyến đường tắt để không bị trễ nải giờ nấu cơm của công nhân.',
      'Mật độ nhà trọ công nhân dày đặc: Mối lo mua phải bình gas giả, bình sang chiết lậu bị bòn rút ruột từ 2kg - 3kg tại các tiệm dạo vỉa hè.',
      'Yêu cầu an toàn chống chuột cắn trong các dãy trọ: Cần ống dẫn bọc lưới inox 304 và van tự ngắt phòng chống cháy nổ tuyệt đối.'
    ],
    techTable: {
      header: 'Chuẩn Kiểm Định An Toàn Cho Xóm Trọ & Tiểu Thương Phường Thái Hòa',
      colBad: 'Bình Gas Sang Chiết Lậu Vỉa Hè Miếu Ông Cù',
      colGood: 'Chuẩn Gas Chính Hãng Ngọc Gas Tại Thái Hòa',
      rows: [
        ['Khối lượng khí nạp đối chứng', 'Hụt từ 2.0kg đến 2.8kg mỗi bình', 'Đủ 12.0kg ± 0.1kg kiểm tra trực tiếp trên cân điện tử'],
        ['Khả năng giao nhanh giờ tan tầm', 'Kẹt xe ngã tư Miếu Ông Cù trễ 1 - 2 tiếng', 'Xe máy luồn lách đường nhánh giao nhanh trong 15 phút'],
        ['An toàn ống dẫn chống chuột cắn', 'Dây cao su mỏng bị chuột gặm thủng', 'Tặng ống dẫn bọc lưới sợi Inox 304 chống chuột 100%'],
        ['Nhiệt lượng ngọn lửa đun nấu', 'Lửa đỏ nhiều muội khói, nấu rất lâu', 'Lửa xanh nhiệt cao 11.800 kcal/kg nấu nhanh tiết kiệm']
      ]
    },
    guide: {
      title: 'Cách Phát Hiện Bình Gas Bị Rút Ruột Bằng Cân Đối Chứng Cầm Tay',
      intro: 'Tại khu vực giáp ranh Miếu Ông Cù, nạn sang chiết gas lậu diễn biến phức tạp. Kỹ thuật viên hướng dẫn công thức đối chứng:',
      steps: [
        'Đọc số cân vỏ dập chìm trên quai xách (Tare Weight): Ví dụ trên quai dập "13.2 kg", đó là trọng lượng vỏ thép rỗng khi không có gas.',
        'Tính tổng trọng lượng chuẩn khi bình đầy gas: Tổng cân = Trọng lượng vỏ + 12.0kg ruột gas. Với vỏ 13.2kg, tổng cân phải đạt đúng 25.2kg.',
        'Đặt bình lên cân điện tử số của nhân viên giao gas: Khách hàng tự tay nhìn màn hình hiển thị; nếu cân chỉ đạt 22.5kg - 23.0kg, bình gas đó đã bị bòn rút từ 2kg đến 2.5kg gas.',
        'Cam kết tại Ngọc Gas: 100% bình gas giao tới Phường Thái Hòa đều đủ cân 12.0kg ± 0.1kg, khách hàng hài lòng mới thanh toán.'
      ]
    },
    faqs: [
      ['Công nhân ở trọ tại Thái Hòa đặt gas lúc 18h30 có giao liền không?', 'Ngọc Gas phục vụ liên tục đến 22h00 đêm, cam kết giao nhanh 15 phút tận phòng trọ đúng giá niêm yết.'],
      ['Đổi vỏ bình gas hãng khác có được đổi sang Luxen hoặc Sopet không?', 'Hoàn toàn được đổi ngang miễn phí 100% giữa tất cả các hãng gas hợp pháp trên thị trường mà không mất tiền cọc vỏ.'],
      ['Giao gas vào các hẻm đường ĐT747B có tính thêm tiền vận chuyển không?', 'Ngọc Gas miễn phí 100% công vận chuyển và lắp đặt tận bếp trên toàn địa bàn Phường Thái Hòa Tân Uyên.']
    ]
  },

  {
    id: 136,
    slug: 'giao-gas-phuong-tan-phuoc-khanh',
    ward: 'Phường Tân Phước Khánh',
    city: 'TP. Tân Uyên',
    title: 'Đổi Bình Gas Phường Tân Phước Khánh (TP. Tân Uyên) — Làng Gốm Sứ 300 Năm & Chợ Tân Phước Khánh',
    summary: 'Đại lý giao gas chính hãng Phường Tân Phước Khánh (TP. Tân Uyên, Bình Dương). Cung cấp Sopet Gas One, Luxen Gas, Phoenix Gas đủ 4 màu vỏ xám, đỏ, xanh, vàng. Giao hỏa tốc 15 phút Làng nghề gốm sứ Tân Phước Khánh 300 năm, Chợ Tân Phước Khánh, ĐT746, Đình Tân Phước Khánh, giáp An Phú. Cân đủ 12kg tại bếp, van tự ngắt, ngọn lửa xanh cực đại. Hotline 1900 9396.',
    subArea: 'thủ phủ làng nghề gốm sứ truyền thống 300 năm di sản và đô thị công nghiệp năng động - TP. Tân Uyên, Bình Dương',
    landmarks: 'Làng nghề gốm sứ Tân Phước Khánh với hơn 300 năm lịch sử di sản, Chợ Tân Phước Khánh đông đúc, trục đường huyết mạch ĐT746, Đình thần Tân Phước Khánh cổ kính, Hồ sinh thái Nam Phương, giáp ranh Phường An Phú (Thuận An)',
    introP1: 'Nổi danh khắp cả nước là cái nôi của nghề gốm sứ thủ công Bình Dương với bề dày hơn 3 thế kỷ lịch sử, Phường Tân Phước Khánh lưu giữ những lò gốm cổ truyền tạo tác nên những sản phẩm gốm mỹ nghệ tinh xảo, đan xen cùng nhịp sống phố thị nhộn nhịp quanh Chợ Tân Phước Khánh, trục lộ giao thương ĐT746 và chuỗi nhà xưởng công nghiệp hiện đại.',
    challenges: [
      'Các xưởng gốm thủ công và cơ sở sản xuất cần nhiệt sấy khuôn ổn định: Đòi hỏi nguồn gas sạch, áp suất dòng khí liên tục để sấy khô phôi gốm và sinh hoạt của gia đình nghệ nhân.',
      'Bụi đất gốm và tro bụi dễ làm nghẽn béc phun gas: Khí đốt trong khu làng nghề dễ bị bụi mịn làm đỏ lửa; cần kỹ thuật viên hỗ trợ thông tắc kim phun và bảo dưỡng mâm đồng định kỳ.',
      'Gia đình tiểu thương và công nhân xóm trọ đông đúc: Nhu cầu đổi bình gas chính hãng 12kg cân đủ ký, giao hàng hỏa tốc trong 15 phút.'
    ],
    techTable: {
      header: 'Tiêu Chuẩn Khí Sạch Cho Làng Gốm Sứ & Dân Cư Tân Phước Khánh',
      colBad: 'Bình Gas Tạp Trôi Nổi Không Nhãn Mác',
      colGood: 'Chuẩn Khí Sạch Ngọc Gas Tại Tân Phước Khánh',
      rows: [
        ['Độ sạch và mùi khí khi đốt cháy', 'Nhiều tạp chất, lửa vàng ám muội đen phôi gốm', 'Khí sạch tinh khiết 100%, lửa xanh nhiệt cao không ám khói'],
        ['Hỗ trợ kỹ thuật chống nghẹt bụi', 'Không hỗ trợ, bỏ mặc khách hàng', 'Vệ sinh béc phun, thông bụi gốm mâm đồng miễn phí'],
        ['Trọng lượng khí cân thực tế', 'Bị rút bớt 2kg - 3kg gas mỗi bình', 'Cân điện tử số đối chứng đủ 12.0kg ± 0.1kg tại bếp'],
        ['Độ bền vỏ bình trong môi trường xưởng', 'Vỏ rỉ sét dễ bục rách chân đế', 'Thép SG255 sơn tĩnh điện chống va đập và bụi mài mòn']
      ]
    },
    guide: {
      title: 'Hướng Dẫn Thông Tắc Béc Đồng Phun Gas Khi Bị Bụi Gốm Bay Vào Làm Nghẹt',
      intro: 'Tại làng nghề Tân Phước Khánh, bụi đất gốm bay lơ lửng dễ lọt vào khe họng bếp làm lửa cháy phập phù:',
      steps: [
        'Khóa van bình gas và nhấc mâm chia lửa ra ngoài: Chờ họng bếp nguội hẳn, nhấc mâm đồng chia lửa để lộ lỗ kim phun béc đồng nhỏ xíu ở đáy họng bếp.',
        'Sử dụng sợi dây đồng mảnh hoặc kim may áo nhỏ: Không dùng tăm tre vì dễ bị gãy thụt vào trong; lấy sợi dây đồng luồn nhẹ nhàng vào lỗ phun kim béc đồng.',
        'Dùng ống thổi hoặc bóng bóp khí thổi sạch bụi: Thổi mạnh để bụi đất gốm bị đẩy ngược ra khỏi ống dẫn hòa khí.',
        'Lắp lại mâm đồng và bật thử: Bật núm bếp, dòng khí gas sẽ phun thẳng đứng thành tia sắc nét, bắt lửa xanh biếc gom nhiệt.'
      ]
    },
    faqs: [
      ['Xưởng gốm sứ lấy số lượng nhiều bình gas có được hỗ trợ giá không?', 'Ngọc Gas có chính sách chiết khấu giá sỉ ưu đãi và hỗ trợ kiểm tra an toàn hệ thống đường ống gas định kỳ cho các cơ sở sản xuất tại Tân Phước Khánh.'],
      ['Bình gas giao đến có cân trước mặt không?', '100% nhân viên giao gas Ngọc Gas luôn mang theo cân điện tử kiểm định, cân đủ 12kg trước sự chứng kiến của khách hàng.'],
      ['Đổi vỏ bình gas màu đỏ sang vỏ xám Sopet Gas One có mất tiền cọc không?', 'Hoàn toàn không! Ngọc Gas hỗ trợ đổi vỏ ngang miễn phí giữa 4 màu sắc xám, đỏ, xanh, vàng mà không yêu cầu đóng thêm tiền cọc vỏ.']
    ]
  }
];

const quickSummaryTemplates = [
  (d) => `<strong>Dịch vụ đổi bình gas chính hãng ${d.ward} uy tín chuẩn PCCC (${d.subArea}):</strong> Chuyên phân phối hỏa tốc các dòng bình gas sạch chính hãng <strong>Sopet Gas One, Luxen Gas, Phoenix Gas</strong> với 4 màu sắc vỏ bình phong thủy: <em>vỏ xám công nghệ Nhật Bản, vỏ đỏ may mắn, vỏ xanh tươi mát, vỏ vàng cam nhiệt lượng lớn</em> (sẵn sàng hệ van bấm Compact ngắt gas tự động và van ren POL). Phục vụ tận tâm các hộ gia đình, quán ăn và cơ sở sản xuất tại <em>${d.landmarks}</em>. Cam kết <strong>giao gas nhanh ${d.ward}</strong> trong 15 phút, <strong>đổi bình gas ${d.ward}</strong> cân đủ 12kg tại bếp, ngọn lửa xanh nhiệt cao không đen đáy nồi. Xem ngay <a href="/gia-gas-hom-nay" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">Bảng giá gas hôm nay</a> hoặc liên hệ <a href="/cua-hang" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">Hệ thống cửa hàng Ngọc Gas</a> qua hotline: <a href="tel:19009396" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">1900 9396</a>.`,

  (d) => `<strong>Hệ thống phân phối khí đốt hóa lỏng PCCC uy tín ${d.ward} (${d.subArea}):</strong> Đáp ứng hỏa tốc các dòng gas chất lượng cao <strong>Sopet Gas One, Luxen Gas, Phoenix Gas</strong> đa dạng 4 sắc màu: <em>vỏ xám công nghệ chuẩn Nhật, vỏ đỏ sum vầy tài lộc, vỏ xanh thanh khiết, vỏ vàng cam nhiệt lượng bùng nổ</em>. Đội ngũ giao hàng chuyên trách phục vụ khu vực <em>${d.landmarks}</em>. Quy chuẩn cam kết: <strong>giao gas nhanh ${d.ward}</strong> trong 15 phút, <strong>đổi bình gas ${d.ward}</strong> cân điện tử đủ 12.0kg trước mặt khách, vệ sinh bảo dưỡng bếp gas miễn phí. Tham khảo <a href="/gia-gas-hom-nay" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">Bảng giá gas hôm nay</a> và <a href="/cua-hang" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">Hệ thống showroom Ngọc Gas</a> qua hotline: <a href="tel:19009396" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">1900 9396</a>.`,

  (d) => `<strong>Đại lý ủy quyền giao gas an toàn 15 phút Phường ${d.ward} (${d.subArea}):</strong> Cung cấp bình gas chính ngạch từ các tập đoàn năng lượng uy tín <strong>Sopet Gas One, Luxen Gas, Phoenix Gas</strong> với 4 màu sắc vỏ bình: <em>vỏ xám dập nổi an toàn, vỏ đỏ may mắn, vỏ xanh tiết kiệm nhiên liệu, vỏ vàng cam áp suất mạnh</em> (phù hợp van chụp Compact tự ngắt và van vặn ren POL). Giao hàng phủ khắp <em>${d.landmarks}</em>. Khẳng định thương hiệu: <strong>đổi bình gas ${d.ward}</strong> đủ 12kg gas sạch, <strong>giao gas nhanh ${d.ward}</strong> kiểm tra rò rỉ bọt xà phòng tại bếp. Cập nhật <a href="/gia-gas-hom-nay" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">Bảng giá gas hôm nay</a> hoặc liên hệ <a href="/cua-hang" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">Điểm giao gas Ngọc Gas</a> qua số máy: <a href="tel:19009396" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">1900 9396</a>.`,

  (d) => `<strong>Giải pháp đổi bình gas PCCC tiết kiệm & an toàn Phường ${d.ward} (${d.subArea}):</strong> Trạm tiếp vận năng lượng sạch chính hãng <strong>Sopet Gas One, Luxen Gas, Phoenix Gas</strong> với 4 sắc màu phong thủy vỏ xám, đỏ, xanh, vàng. Chăm sóc tận tình các hộ gia đình, quán ăn, nhà trọ và công xưởng tại <em>${d.landmarks}</em>. Quyền lợi khách hàng: <strong>giao gas nhanh ${d.ward}</strong> 15 phút không để khách chờ lâu, <strong>đổi bình gas ${d.ward}</strong> cân đúng cân đủ 12kg, hỗ trợ đổi chéo vỏ bình miễn phí 100%. Xem <a href="/gia-gas-hom-nay" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">Bảng giá gas hôm nay</a> hoặc tìm đại lý gần nhất tại <a href="/cua-hang" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">Hệ thống Ngọc Gas</a>, hotline: <a href="tel:19009396" style="color:#1D4ED8;font-weight:bold;text-decoration:underline;">1900 9396</a>.`
];

const brandTemplates = [
  (d) => `
<p>Đại lý <strong>giao gas chính hãng ${d.ward}</strong> cung cấp đa dạng sản phẩm chất lượng cao đáp ứng mọi phân khúc:</p>
<ul>
  <li><strong>Sopet Gas One (Vỏ Xám Chuẩn Nhật):</strong> Dòng sản phẩm lọc sạch tinh khiết theo tiêu chuẩn công nghệ Nhật Bản, vỏ bình đúc thép SG255 chịu áp lực 34 bar, bảo vệ tối đa thiết bị bếp gas và sàn nhà cao cấp.</li>
  <li><strong>Luxen Gas (Vỏ Xanh, Vỏ Đỏ, Vỏ Vàng):</strong> Tỷ lệ Propane/Butane 30:70 chuẩn hóa, ngọn lửa xanh nhiệt độ cao 11.800 kcal/kg giúp người nội trợ nấu ăn nhanh chóng mà không làm đen đáy xoong nồi.</li>
  <li><strong>Phoenix Gas (Vỏ Vàng Cam, Vỏ Xám):</strong> Sức ép ngọn lửa dồi dào, thân bình sơn tĩnh điện chống oxy hóa bền bỉ, lựa chọn số 1 của chuỗi quán ăn, nhà hàng và cơ sở chế biến thực phẩm.</li>
</ul>
<p>Tất cả bình gas 12kg đều có khối lượng tịnh đủ 12.0kg ± 0.1kg, vỏ từ 12.5kg - 14.0kg. Sản phẩm được bảo chứng bởi <strong>bảo hiểm trách nhiệm sản phẩm theo quy chuẩn an toàn PCCC và quy định hiện hành của pháp luật</strong>. Hỗ trợ đổi vỏ ngang miễn phí 100% giữa 4 màu sắc xám, đỏ, xanh, vàng.</p>`,

  (d) => `
<p>Ngọc Gas tại <strong>${d.ward}</strong> mang đến cho khách hàng 3 lựa chọn thương hiệu bình gas hàng đầu:</p>
<ul>
  <li><strong>Sopet Gas One (Vỏ Xám Công Nghệ Nhật):</strong> Quy trình chiết nạp khép kín hiện đại, van ngắt tự động Compact cảm ứng áp suất ngắt ngay khi có sự cố, tuyệt đối an toàn cho không gian nhà bếp kín.</li>
  <li><strong>Luxen Gas (Vỏ Đỏ, Xanh, Vàng):</strong> Nhiệt lượng cao và ổn định, ngọn lửa xanh biếc gom nhiệt tốt giúp rút ngắn 20% thời gian đun nấu nước dùng và món xào.</li>
  <li><strong>Phoenix Gas (Vỏ Vàng Cam, Vỏ Xám):</strong> Áp lực gas dồi dào, thân bình sơn tĩnh điện chống va đập, đáp ứng hoàn hảo tần suất sử dụng cao của các quán ăn và bếp ăn công nhân.</li>
</ul>
<p>100% bình gas xuất xưởng đều có tem kiểm định an toàn PCCC, màng co niêm phong chính hãng. Miễn phí chuyển đổi qua lại giữa 4 màu sắc vỏ xám, đỏ, xanh, vàng mà không mất tiền cọc vỏ.</p>`,

  (d) => `
<p>Phục vụ trọn vẹn nhu cầu sinh hoạt và buôn bán ẩm thực tại <strong>${d.ward}</strong>, Ngọc Gas cung cấp 3 dòng gas chính ngạch:</p>
<ul>
  <li><strong>Sopet Gas One (Vỏ Xám Đẳng Cấp):</strong> Thép tấm cường độ cao dập nổi thương hiệu, chống rò rỉ khí gas vi mô, bảo đảm ngọn lửa cháy êm dịu không có mùi hôi khó chịu.</li>
  <li><strong>Luxen Gas (Vỏ Xanh Tươi Mát, Đỏ May Mắn, Vàng):</strong> Hàm lượng tạp chất gần như bằng 0, không bám cặn đáy bình giúp tận dụng tối đa đến giọt gas cuối cùng, tiết kiệm chi phí nhiên liệu.</li>
  <li><strong>Phoenix Gas (Vỏ Vàng Cam Năng Lượng, Vỏ Xám):</strong> Ngọn lửa nhiệt độ cao gom nhiệt sâu đáy xoong, giữ trọn hương vị tươi giòn của thực phẩm khi chiên xào.</li>
</ul>
<p>Bình gas đủ 12kg gas hóa lỏng, có <strong>bảo hiểm trách nhiệm an toàn PCCC</strong> theo luật định. Đổi bù vỏ bình tự do giữa 4 màu xám, đỏ, xanh, vàng.</p>`,

  (d) => `
<p>Tại <strong>${d.ward}</strong>, khách hàng luôn tín nhiệm 3 thương hiệu gas sạch uy tín do Ngọc Gas cung cấp:</p>
<ul>
  <li><strong>Sopet Gas One (Vỏ Xám Chuẩn Nhật Bản):</strong> Kiểm định siêu âm thân bình đạt tiêu chuẩn JIS Nhật Bản, độ an toàn vượt trội cho các hộ gia đình và nhà trọ công nhân.</li>
  <li><strong>Luxen Gas (Vỏ Xanh Sinh Thái, Đỏ, Vàng):</strong> Tỷ lệ phối trộn khí gas lỏng chuẩn hóa, không để lại muội than đen nồi, thân thiện với sức khỏe người nội trợ.</li>
  <li><strong>Phoenix Gas (Vỏ Vàng Cam Áp Suất Mạnh):</strong> Vỏ bình phủ kẽm chống ăn mòn hóa học, chịu va chạm cơ học tốt, nguồn năng lượng tin cậy của các đầu bếp.</li>
</ul>
<p>Đầy đủ tem nhãn chống hàng giả, van nạp nguyên seal, cân đối chứng đủ 12kg gas tại nhà. Đổi vỏ ngang không thu phí phụ thu giữa 4 màu xám, đỏ, xanh, vàng.</p>`
];

const processTemplates = [
  (d) => `
<ol style="line-height:1.8;">
  <li><strong>Tiếp nhận nhanh qua Hotline 1900 9396:</strong> Xác nhận địa chỉ tại ${d.landmarks.split(',').slice(0, 3).join(', ')}.</li>
  <li><strong>Xuất trạm hỏa tốc 15 phút:</strong> Kỹ thuật viên di chuyển nhanh chóng bằng xe chuyên dụng đến tận căn bếp của khách hàng.</li>
  <li><strong>Cân gas công khai trước mặt khách:</strong> Đặt bình gas lên cân điện tử cầm tay để khách hàng tự tay xác thực trọng lượng đủ 100%.</li>
  <li><strong>Lắp đặt & kiểm tra an toàn PCCC:</strong> Lắp van điều áp, quét bọt xà phòng kiểm tra độ kín và vệ sinh mâm lửa bếp gas miễn phí.</li>
  <li><strong>Bàn giao hóa đơn và dán tem bảo hành:</strong> Dán tem cứu hộ kỹ thuật 1900 9396 hỗ trợ khách hàng 24/7.</li>
</ol>`,

  (d) => `
<ol style="line-height:1.8;">
  <li><strong>Tiếp nhận yêu cầu hỏa tốc:</strong> Tổng đài 1900 9396 ghi nhận đơn hàng và điều phối nhân viên tại trạm gần nhất khu vực ${d.landmarks.split(',').slice(0, 2).join(', ')}.</li>
  <li><strong>Có mặt tại bếp trong 15 phút:</strong> Thợ kỹ thuật mang bình gas mới cùng cân điện tử di chuyển nhanh chóng đến đúng địa chỉ.</li>
  <li><strong>Cân kiểm tra trọng lượng minh bạch:</strong> Khách hàng trực tiếp đối chứng khối lượng vỏ và gas lỏng đủ 12.0kg ± 0.1kg.</li>
  <li><strong>Lắp đặt chuẩn kỹ thuật an toàn:</strong> Gắn van khóa, thay gioăng cao su mới, kiểm tra kín khít bằng dung dịch bọt chuyên dụng.</li>
  <li><strong>Bảo dưỡng bếp & dán decal hỗ trợ:</strong> Vệ sinh kim phun lửa, cạo sạch muội than và bàn giao tem bảo hành có hotline 1900 9396.</li>
</ol>`,

  (d) => `
<ol style="line-height:1.8;">
  <li><strong>Gọi hotline đặt gas 1900 9396:</strong> Nhân viên tư vấn thương hiệu và màu sắc vỏ bình phù hợp theo sở thích của khách hàng.</li>
  <li><strong>Giao hàng chuẩn xác 15 phút:</strong> Kỹ thuật viên rành đường hẻm khu vực ${d.ward} mang bình gas đến tận gian bếp khách hàng.</li>
  <li><strong>Cân đối chứng công khai:</strong> Treo bình gas lên cân số điện tử để khách hàng tận mắt kiểm tra đủ trọng lượng.</li>
  <li><strong>Quy trình lắp đặt & thử kín PCCC:</strong> Lắp van ngắt tự động, quét bọt xà phòng phát hiện rò rỉ và chỉnh gió lửa xanh biếc.</li>
  <li><strong>Nghiệm thu an toàn & trao hóa đơn:</strong> Dán tem bảo hiểm, hướng dẫn thao tác khóa van an toàn và cung cấp hóa đơn đầy đủ.</li>
</ol>`,

  (d) => `
<ol style="line-height:1.8;">
  <li><strong>Kết nối tổng đài 1900 9396:</strong> Hệ thống tiếp nhận thông tin đổi bình gas của khách hàng tại ${d.ward}.</li>
  <li><strong>Xuất trạm xe chuyên dụng 15 phút:</strong> Nhân viên mang bình gas sạch chính hãng di chuyển ngay lập tức đến tận nơi.</li>
  <li><strong>Kiểm tra khối lượng tịnh:</strong> Đặt bình gas lên cân điện tử, bảo đảm đủ 12kg khí hóa lỏng theo đúng niêm yết nhà máy.</li>
  <li><strong>Lắp ráp phụ kiện & kiểm tra an toàn:</strong> Kiểm tra ống dẫn, siết chặt cổ dê inox và thử nghiệm áp suất kín hoàn toàn.</li>
  <li><strong>Bàn giao tem bảo hành 24/7:</strong> Trao phiếu giao hàng và dán tem số cứu hộ khẩn cấp 1900 9396 phục vụ mọi lúc mọi nơi.</li>
</ol>`
];

// HÀM BUILD TOÀN BỘ NỘI DUNG BÌNH DƯƠNG
export function buildBinhDuongArticles() {
  return binhDuongData.map((d, index) => {
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

<h2>1. Vị Thế Địa Lý ${d.ward} & Nhu Cầu Năng Lượng Đun Nấu Thực Tế</h2>
<p>
  ${d.introP1}
</p>
<p>
  Nhịp sống đô thị và sản xuất nhộn nhịp tại ${d.ward} đặt ra những tiêu chí khắt khe đối với dịch vụ cung cấp khí đốt:
</p>
<ul>
  ${d.challenges.map(c => `<li><strong>${c.split(':')[0]}:</strong>${c.split(':')[1] || ''}</li>`).join('\n  ')}
</ul>

<h2>2. Bảng Tiêu Chuẩn Năng Lượng & An Toàn PCCC Tại ${d.ward}</h2>
<p>
  Nhằm đem lại sự an tâm tuyệt đối cho mọi gia đình và cơ sở kinh doanh tại ${d.ward}, Ngọc Gas áp dụng quy chuẩn kiểm định:
</p>

<div style="overflow-x:auto;margin:24px 0;">
  <table style="width:100%;border-collapse:collapse;text-align:left;font-size:14.5px;">
    <thead>
      <tr style="background:#1E40AF;color:#fff;">
        <th style="padding:12px;border:1px solid #1D4ED8;">Chỉ Tiêu Vận Hành</th>
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

// XUẤT FILE CLUSTER BÌNH DƯƠNG
const finalBinhDuong = buildBinhDuongArticles();
const fileContent = `// Tự động tạo bởi generate-all-bd-vt.mjs
export const binhDuongArticles = ${JSON.stringify(finalBinhDuong, null, 2)};
`;

fs.writeFileSync(path.resolve('scripts/new-wards/cluster-binh-duong.mjs'), fileContent, 'utf8');
console.log(`🎉 ĐÃ XUẤT THÀNH CÔNG ${finalBinhDuong.length} BÀI VIẾT BÌNH DƯƠNG VÀO scripts/new-wards/cluster-binh-duong.mjs!`);
