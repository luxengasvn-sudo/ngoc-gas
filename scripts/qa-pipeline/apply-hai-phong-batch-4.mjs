import fs from 'fs';
import path from 'path';

const filePath = path.resolve('src/data/tinhthanh/administrative-units-hai-phong.json');
const raw = fs.readFileSync(filePath, 'utf8');
const units = JSON.parse(raw);

const batch4Updates = {
  31: { // Phường Nguyễn Đại Năng
    name: "Phường Nguyễn Đại Năng",
    previousNames: "Sáp nhập 3 đơn vị: phường Thái Thịnh, phường Hiến Thành và xã Minh Hòa (thị xã Kinh Môn cũ)",
    description: "Phường Nguyễn Đại Năng là trung tâm phát triển công nghiệp phụ trợ, logistics và dịch vụ cảng sông lớn tại khu vực Kinh Môn, Thành phố Hải Phòng.",
    officialPortal: "https://nguyendainang.haiphong.gov.vn",
    zaloOaUrl: "https://zalo.me/nguyendainanghaiphong",
    facebookUrl: "https://facebook.com/nguyendainanghaiphong",
    hotline: "0225 3835 113",
    email: "ubndpnguyendainang@haiphong.gov.vn",
    agencies: {
      "ubnd": {
        slug: "ubnd",
        name: "Ủy Ban Nhân Dân Phường Nguyễn Đại Năng",
        shortName: "UBND Phường Nguyễn Đại Năng",
        type: "ubnd",
        icon: "🏛️",
        badge: "Cơ quan Hành chính",
        level: "Cơ quan Chấp hành & Quản lý Nhà nước cấp Cơ sở Phường Nguyễn Đại Năng",
        address: "Số 145 Phố Nguyễn Du, Phường Nguyễn Đại Năng, Thành phố Hải Phòng",
        phone: "0225 3835 113",
        hotline: "Đường dây nóng Thường trực UBND: 069 278 6112",
        workingHours: "Thứ 2 - Thứ 6: Sáng 07:30 - 11:30 | Chiều 13:30 - 17:00. Thứ 7: Sáng 07:30 - 11:30 (Một cửa tiếp nhận)",
        administrativeCode: "18031-UBND",
        lat: 20.9712,
        lng: 106.5218,
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=UBND+Ph%C6%B0%E1%BB%9Dng+Nguy%E1%BB%85n+%C4%90%E1%BA%A1i+N%C4%83ng%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        googleDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=UBND+Ph%C6%B0%E1%BB%9Dng+Nguy%E1%BB%85n+%C4%90%E1%BA%A1i+N%C4%83ng%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        keyProcedures: [
          { title: "Chứng thực bản sao từ bản chính, chứng thực chữ ký", time: "Trong ngày làm việc", fee: "Theo quy định nhà nước" },
          { title: "Đăng ký khai sinh, kết hôn, khai tử trực tuyến", time: "01 - 03 ngày làm việc", fee: "Miễn phí / Theo quy định" },
          { title: "Cấp giấy xác nhận tình trạng hôn nhân", time: "Trong ngày làm việc", fee: "Theo biểu mức quy định" },
          { title: "Liên thông thủ tục Khai sinh - Thường trú - BHYT trẻ em", time: "03 ngày làm việc", fee: "Miễn phí" },
          { title: "Tiếp nhận hồ sơ đăng ký biến động đất đai, nhà ở", time: "05 - 10 ngày làm việc", fee: "Theo biểu phí địa chính" }
        ]
      },
      "cong-an": {
        slug: "cong-an",
        name: "Công An Phường Nguyễn Đại Năng",
        shortName: "Công An Phường Nguyễn Đại Năng",
        type: "cong-an",
        icon: "👮",
        badge: "An ninh Trật tự",
        level: "Lực lượng Vũ trang Phụ trách Trật tự An toàn Xã hội & Quản lý Cư trú Phường Nguyễn Đại Năng",
        address: "Số 145 Phố Nguyễn Du (hoặc TDP Hiến Thành), Phường Nguyễn Đại Năng, Thành phố Hải Phòng",
        phone: "0225 3835 113",
        hotline: "Trực ban tác chiến 24/7: 069 278 6112",
        workingHours: "Tiếp dân: Thứ 2 - Thứ 6: Sáng 07:30 - 11:30 | Chiều 13:30 - 17:00. Trực ban hình sự & an ninh: 24/24",
        administrativeCode: "18031-CA",
        lat: 20.9718,
        lng: 106.5225,
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=C%C3%B4ng+An+Ph%C6%B0%E1%BB%9Dng+Nguy%E1%BB%85n+%C4%90%E1%BA%A1i+N%C4%83ng%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        googleDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=C%C3%B4ng+an+Ph%C6%B0%E1%BB%9Dng+Nguy%E1%BB%85n+%C4%90%E1%BA%A1i+N%C4%83ng%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        keyProcedures: [
          { title: "Đăng ký thường trú, tạm trú, khai báo lưu trú", time: "03 - 07 ngày làm việc", fee: "Theo quy định Bộ Công An" },
          { title: "Kích hoạt định danh điện tử VNeID mức 2", time: "Giải quyết ngay tại quầy", fee: "Miễn phí" },
          { title: "Xác nhận thông tin cư trú (CT07)", time: "Trong ngày làm việc", fee: "Miễn phí" },
          { title: "Tiếp nhận tin báo tội phạm & trật tự an ninh", time: "Tiếp nhận xử lý khẩn cấp 24/7", fee: "Miễn phí" }
        ]
      }
    },
    isVerified: true,
    verificationStatus: "verified"
  },
  32: { // Phường Nguyễn Trãi
    name: "Phường Nguyễn Trãi",
    previousNames: "Sáp nhập 3 đơn vị: phường Bến Tắm, xã Bắc An và xã Hoàng Hoa Thám (Chí Linh cũ)",
    description: "Phường Nguyễn Trãi là trung tâm du lịch sinh thái, di tích danh thắng và nông lâm nghiệp công nghệ cao phía Bắc thành phố Hải Phòng.",
    officialPortal: "https://nguyentrai.haiphong.gov.vn",
    zaloOaUrl: "https://zalo.me/nguyentraihaiphong",
    facebookUrl: "https://facebook.com/nguyentraihaiphong",
    hotline: "0836 836 227",
    email: "ubndpnguyentrai@haiphong.gov.vn",
    agencies: {
      "ubnd": {
        slug: "ubnd",
        name: "Ủy Ban Nhân Dân Phường Nguyễn Trãi",
        shortName: "UBND Phường Nguyễn Trãi",
        type: "ubnd",
        icon: "🏛️",
        badge: "Cơ quan Hành chính",
        level: "Cơ quan Chấp hành & Quản lý Nhà nước cấp Cơ sở Phường Nguyễn Trãi",
        address: "Tổ dân phố Bến Tắm (trụ sở UBND phường Bến Tắm cũ), Phường Nguyễn Trãi, Thành phố Hải Phòng",
        phone: "0836 836 227",
        hotline: "Đường dây nóng Thường trực UBND: 0836 836 227",
        workingHours: "Thứ 2 - Thứ 6: Sáng 07:30 - 11:30 | Chiều 13:30 - 17:00. Thứ 7: Sáng 07:30 - 11:30 (Một cửa tiếp nhận)",
        administrativeCode: "18032-UBND",
        lat: 21.2182,
        lng: 106.4521,
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=UBND+Ph%C6%B0%E1%BB%9Dng+Nguy%E1%BB%85n+Tr%C3%A3i%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        googleDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=UBND+Ph%C6%B0%E1%BB%9Dng+Nguy%E1%BB%85n+Tr%C3%A3i%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        keyProcedures: [
          { title: "Chứng thực bản sao từ bản chính, chứng thực chữ ký", time: "Trong ngày làm việc", fee: "Theo quy định nhà nước" },
          { title: "Đăng ký khai sinh, kết hôn, khai tử trực tuyến", time: "01 - 03 ngày làm việc", fee: "Miễn phí / Theo quy định" },
          { title: "Cấp giấy xác nhận tình trạng hôn nhân", time: "Trong ngày làm việc", fee: "Theo biểu mức quy định" },
          { title: "Liên thông thủ tục Khai sinh - Thường trú - BHYT trẻ em", time: "03 ngày làm việc", fee: "Miễn phí" },
          { title: "Tiếp nhận hồ sơ đăng ký biến động đất đai, nhà ở", time: "05 - 10 ngày làm việc", fee: "Theo biểu phí địa chính" }
        ]
      },
      "cong-an": {
        slug: "cong-an",
        name: "Công An Phường Nguyễn Trãi",
        shortName: "Công An Phường Nguyễn Trãi",
        type: "cong-an",
        icon: "👮",
        badge: "An ninh Trật tự",
        level: "Lực lượng Vũ trang Phụ trách Trật tự An toàn Xã hội & Quản lý Cư trú Phường Nguyễn Trãi",
        address: "Khu dân cư Mệnh Trường, Phường Nguyễn Trãi, Thành phố Hải Phòng",
        phone: "0225 3842 298",
        hotline: "Trực ban tác chiến 24/7: 069 278 6112",
        workingHours: "Tiếp dân: Thứ 2 - Thứ 6: Sáng 07:30 - 11:30 | Chiều 13:30 - 17:00. Trực ban hình sự & an ninh: 24/24",
        administrativeCode: "18032-CA",
        lat: 21.2195,
        lng: 106.4538,
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=C%C3%B4ng+An+Ph%C6%B0%E1%BB%9Dng+Nguy%E1%BB%85n+Tr%C3%A3i%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        googleDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=C%C3%B4ng+an+Ph%C6%B0%E1%BB%9Dng+Nguy%E1%BB%85n+Tr%C3%A3i%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        keyProcedures: [
          { title: "Đăng ký thường trú, tạm trú, khai báo lưu trú", time: "03 - 07 ngày làm việc", fee: "Theo quy định Bộ Công An" },
          { title: "Kích hoạt định danh điện tử VNeID mức 2", time: "Giải quyết ngay tại quầy", fee: "Miễn phí" },
          { title: "Xác nhận thông tin cư trú (CT07)", time: "Trong ngày làm việc", fee: "Miễn phí" },
          { title: "Tiếp nhận tin báo tội phạm & trật tự an ninh", time: "Tiếp nhận xử lý khẩn cấp 24/7", fee: "Miễn phí" }
        ]
      }
    },
    isVerified: true,
    verificationStatus: "verified"
  },
  33: { // Phường Nhị Chiểu
    name: "Phường Nhị Chiểu",
    previousNames: "Sáp nhập 4 phường: Tân Dân, Minh Tân, Duy Tân và Phú Thứ (thị xã Kinh Môn)",
    description: "Phường Nhị Chiểu là đô thị công nghiệp vật liệu xây dựng, cảng thủy nội địa và khai khoáng quy mô lớn, vận hành mô hình quản lý 2 cấp đô thị hiện đại.",
    officialPortal: "https://nhichieu.haiphong.gov.vn",
    zaloOaUrl: "https://zalo.me/nhichieuhaiphong",
    facebookUrl: "https://facebook.com/nhichieuhaiphong",
    hotline: "0974 752 387",
    email: "tranhongtuc76@haiphong.gov.vn",
    agencies: {
      "ubnd": {
        slug: "ubnd",
        name: "Ủy Ban Nhân Dân Phường Nhị Chiểu",
        shortName: "UBND Phường Nhị Chiểu",
        type: "ubnd",
        icon: "🏛️",
        badge: "Cơ quan Hành chính",
        level: "Cơ quan Chấp hành & Quản lý Nhà nước cấp Cơ sở Phường Nhị Chiểu",
        address: "Số 03 Đường Vũ Mạnh Hùng, Phường Nhị Chiểu, Thành phố Hải Phòng",
        phone: "0974 752 387",
        hotline: "Đường dây nóng Thường trực UBND: 0974 752 387",
        workingHours: "Thứ 2 - Thứ 6: Sáng 07:30 - 11:30 | Chiều 13:30 - 17:00. Thứ 7: Sáng 07:30 - 11:30 (Một cửa tiếp nhận)",
        administrativeCode: "18033-UBND",
        lat: 21.0182,
        lng: 106.5825,
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=UBND+Ph%C6%B0%E1%BB%9Dng+Nh%E1%BB%8B+Chi%E1%BB%83u%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        googleDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=UBND+Ph%C6%B0%E1%BB%9Dng+Nh%E1%BB%8B+Chi%E1%BB%83u%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        keyProcedures: [
          { title: "Chứng thực bản sao từ bản chính, chứng thực chữ ký", time: "Trong ngày làm việc", fee: "Theo quy định nhà nước" },
          { title: "Đăng ký khai sinh, kết hôn, khai tử trực tuyến", time: "01 - 03 ngày làm việc", fee: "Miễn phí / Theo quy định" },
          { title: "Cấp giấy xác nhận tình trạng hôn nhân", time: "Trong ngày làm việc", fee: "Theo biểu mức quy định" },
          { title: "Liên thông thủ tục Khai sinh - Thường trú - BHYT trẻ em", time: "03 ngày làm việc", fee: "Miễn phí" },
          { title: "Tiếp nhận hồ sơ đăng ký biến động đất đai, nhà ở", time: "05 - 10 ngày làm việc", fee: "Theo biểu phí địa chính" }
        ]
      },
      "cong-an": {
        slug: "cong-an",
        name: "Công An Phường Nhị Chiểu",
        shortName: "Công An Phường Nhị Chiểu",
        type: "cong-an",
        icon: "👮",
        badge: "An ninh Trật tự",
        level: "Lực lượng Vũ trang Phụ trách Trật tự An toàn Xã hội & Quản lý Cư trú Phường Nhị Chiểu",
        address: "Số 02 Đường Hoàng Thạch, Bích Nhôi 2, Phường Nhị Chiểu, Thành phố Hải Phòng",
        phone: "0225 3835 113",
        hotline: "Trực ban tác chiến 24/7: 069 278 6112",
        workingHours: "Tiếp dân: Thứ 2 - Thứ 6: Sáng 07:30 - 11:30 | Chiều 13:30 - 17:00. Trực ban hình sự & an ninh: 24/24",
        administrativeCode: "18033-CA",
        lat: 21.0195,
        lng: 106.5842,
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=C%C3%B4ng+An+Ph%C6%B0%E1%BB%9Dng+Nh%E1%BB%8B+Chi%E1%BB%83u%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        googleDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=C%C3%B4ng+an+Ph%C6%B0%E1%BB%9Dng+Nh%E1%BB%8B+Chi%E1%BB%83u%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        keyProcedures: [
          { title: "Đăng ký thường trú, tạm trú, khai báo lưu trú", time: "03 - 07 ngày làm việc", fee: "Theo quy định Bộ Công An" },
          { title: "Kích hoạt định danh điện tử VNeID mức 2", time: "Giải quyết ngay tại quầy", fee: "Miễn phí" },
          { title: "Xác nhận thông tin cư trú (CT07)", time: "Trong ngày làm việc", fee: "Miễn phí" },
          { title: "Tiếp nhận tin báo tội phạm & trật tự an ninh", time: "Tiếp nhận xử lý khẩn cấp 24/7", fee: "Miễn phí" }
        ]
      }
    },
    isVerified: true,
    verificationStatus: "verified"
  },
  34: { // Phường Phạm Sư Mạnh
    name: "Phường Phạm Sư Mạnh",
    previousNames: "Sáp nhập 3 phường: Phạm Thái, An Sinh và Hiệp Sơn (thị xã Kinh Môn)",
    description: "Phường Phạm Sư Mạnh mang tên danh sĩ kiệt xuất thời Trần, là trung tâm công nghiệp luyện kim, vật liệu và dịch vụ thương mại phát triển mạnh mẽ.",
    officialPortal: "https://phamsumanh.haiphong.gov.vn",
    zaloOaUrl: "https://zalo.me/phamsumanhhaiphong",
    facebookUrl: "https://facebook.com/phamsumanhhaiphong",
    hotline: "0868 615 975",
    email: "chinhquyenphamsumanh@gmail.com",
    agencies: {
      "ubnd": {
        slug: "ubnd",
        name: "Ủy Ban Nhân Dân Phường Phạm Sư Mạnh",
        shortName: "UBND Phường Phạm Sư Mạnh",
        type: "ubnd",
        icon: "🏛️",
        badge: "Cơ quan Hành chính",
        level: "Cơ quan Chấp hành & Quản lý Nhà nước cấp Cơ sở Phường Phạm Sư Mạnh",
        address: "Số 684 Đường Trần Hưng Đạo, Phường Phạm Sư Mạnh, Thành phố Hải Phòng",
        phone: "0868 615 975",
        hotline: "Đường dây nóng PVHCC: 0225 3822 678",
        workingHours: "Thứ 2 - Thứ 6: Sáng 07:30 - 11:30 | Chiều 13:30 - 17:00. Thứ 7: Sáng 07:30 - 11:30 (Một cửa tiếp nhận)",
        administrativeCode: "18034-UBND",
        lat: 20.9654,
        lng: 106.4982,
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=UBND+Ph%C6%B0%E1%BB%9Dng+Ph%E1%BA%A1m+S%C6%B0+M%E1%BA%A1nh%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        googleDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=UBND+Ph%C6%B0%E1%BB%9Dng+Ph%E1%BA%A1m+S%C6%B0+M%E1%BA%A1nh%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        keyProcedures: [
          { title: "Chứng thực bản sao từ bản chính, chứng thực chữ ký", time: "Trong ngày làm việc", fee: "Theo quy định nhà nước" },
          { title: "Đăng ký khai sinh, kết hôn, khai tử trực tuyến", time: "01 - 03 ngày làm việc", fee: "Miễn phí / Theo quy định" },
          { title: "Cấp giấy xác nhận tình trạng hôn nhân", time: "Trong ngày làm việc", fee: "Theo biểu mức quy định" },
          { title: "Liên thông thủ tục Khai sinh - Thường trú - BHYT trẻ em", time: "03 ngày làm việc", fee: "Miễn phí" },
          { title: "Tiếp nhận hồ sơ đăng ký biến động đất đai, nhà ở", time: "05 - 10 ngày làm việc", fee: "Theo biểu phí địa chính" }
        ]
      },
      "cong-an": {
        slug: "cong-an",
        name: "Công An Phường Phạm Sư Mạnh",
        shortName: "Công An Phường Phạm Sư Mạnh",
        type: "cong-an",
        icon: "👮",
        badge: "An ninh Trật tự",
        level: "Lực lượng Vũ trang Phụ trách Trật tự An toàn Xã hội & Quản lý Cư trú Phường Phạm Sư Mạnh",
        address: "Số 815A Đường Trần Hưng Đạo, Phường Phạm Sư Mạnh, Thành phố Hải Phòng",
        phone: "0225 3835 113",
        hotline: "Trực ban tác chiến 24/7: 069 278 6112",
        workingHours: "Tiếp dân: Thứ 2 - Thứ 6: Sáng 07:30 - 11:30 | Chiều 13:30 - 17:00. Trực ban hình sự & an ninh: 24/24",
        administrativeCode: "18034-CA",
        lat: 20.9662,
        lng: 106.4995,
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=C%C3%B4ng+An+Ph%C6%B0%E1%BB%9Dng+Ph%E1%BA%A1m+S%C6%B0+M%E1%BA%A1nh%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        googleDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=C%C3%B4ng+an+Ph%C6%B0%E1%BB%9Dng+Ph%E1%BA%A1m+S%C6%B0+M%E1%BA%A1nh%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        keyProcedures: [
          { title: "Đăng ký thường trú, tạm trú, khai báo lưu trú", time: "03 - 07 ngày làm việc", fee: "Theo quy định Bộ Công An" },
          { title: "Kích hoạt định danh điện tử VNeID mức 2", time: "Giải quyết ngay tại quầy", fee: "Miễn phí" },
          { title: "Xác nhận thông tin cư trú (CT07)", time: "Trong ngày làm việc", fee: "Miễn phí" },
          { title: "Tiếp nhận tin báo tội phạm & trật tự an ninh", time: "Tiếp nhận xử lý khẩn cấp 24/7", fee: "Miễn phí" }
        ]
      }
    },
    isVerified: true,
    verificationStatus: "verified"
  },
  35: { // Phường Phù Liễn
    name: "Phường Phù Liễn",
    previousNames: "Đô thị lịch sử thuộc quận Kiến An (nơi đặt Đài Thiên văn & Khí tượng Phù Liễn)",
    description: "Phường Phù Liễn là vùng đệm sinh thái và khoa học công nghệ, gắn liền với di tích đồi Thiên Văn và trạm khí tượng thủy văn Phù Liễn lịch sử trên 120 năm tuổi.",
    officialPortal: "https://phulien.haiphong.gov.vn",
    zaloOaUrl: "https://zalo.me/phulienhaiphong",
    facebookUrl: "https://facebook.com/phulienhaiphong",
    hotline: "0225 3876 637",
    email: "ubndphulien@haiphong.gov.vn",
    agencies: {
      "ubnd": {
        slug: "ubnd",
        name: "Ủy Ban Nhân Dân Phường Phù Liễn",
        shortName: "UBND Phường Phù Liễn",
        type: "ubnd",
        icon: "🏛️",
        badge: "Cơ quan Hành chính",
        level: "Cơ quan Chấp hành & Quản lý Nhà nước cấp Cơ sở Phường Phù Liễn",
        address: "Số 618 Đường Nguyễn Lương Bằng, Phường Phù Liễn, Quận Kiến An, Thành phố Hải Phòng",
        phone: "0225 3876 637",
        hotline: "Đường dây nóng giải quyết TTHC: 0827 286 689",
        workingHours: "Thứ 2 - Thứ 6: Sáng 07:30 - 11:30 | Chiều 13:30 - 17:00. Thứ 7: Sáng 07:30 - 11:30 (Một cửa tiếp nhận)",
        administrativeCode: "18035-UBND",
        lat: 20.7985,
        lng: 106.6182,
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=UBND+Ph%C6%B0%E1%BB%9Dng+Ph%C3%B9+Li%E1%BB%85n%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        googleDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=UBND+Ph%C6%B0%E1%BB%9Dng+Ph%C3%B9+Li%E1%BB%85n%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        keyProcedures: [
          { title: "Chứng thực bản sao từ bản chính, chứng thực chữ ký", time: "Trong ngày làm việc", fee: "Theo quy định nhà nước" },
          { title: "Đăng ký khai sinh, kết hôn, khai tử trực tuyến", time: "01 - 03 ngày làm việc", fee: "Miễn phí / Theo quy định" },
          { title: "Cấp giấy xác nhận tình trạng hôn nhân", time: "Trong ngày làm việc", fee: "Theo biểu mức quy định" },
          { title: "Liên thông thủ tục Khai sinh - Thường trú - BHYT trẻ em", time: "03 ngày làm việc", fee: "Miễn phí" },
          { title: "Tiếp nhận hồ sơ đăng ký biến động đất đai, nhà ở", time: "05 - 10 ngày làm việc", fee: "Theo biểu phí địa chính" }
        ]
      },
      "cong-an": {
        slug: "cong-an",
        name: "Công An Phường Phù Liễn",
        shortName: "Công An Phường Phù Liễn",
        type: "cong-an",
        icon: "👮",
        badge: "An ninh Trật tự",
        level: "Lực lượng Vũ trang Phụ trách Trật tự An toàn Xã hội & Quản lý Cư trú Phường Phù Liễn",
        address: "Số 169 Đường Quy Tức, Phường Phù Liễn, Quận Kiến An, Thành phố Hải Phòng",
        phone: "0225 3876 018",
        hotline: "Trực ban tác chiến 24/7: 0225 3876 505",
        workingHours: "Tiếp dân: Thứ 2 - Thứ 6: Sáng 07:30 - 11:30 | Chiều 13:30 - 17:00. Trực ban hình sự & an ninh: 24/24",
        administrativeCode: "18035-CA",
        lat: 20.7992,
        lng: 106.6198,
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=C%C3%B4ng+An+Ph%C6%B0%E1%BB%9Dng+Ph%C3%B9+Li%E1%BB%85n%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        googleDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=C%C3%B4ng+an+Ph%C6%B0%E1%BB%9Dng+Ph%C3%B9+Li%E1%BB%85n%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        keyProcedures: [
          { title: "Đăng ký thường trú, tạm trú, khai báo lưu trú", time: "03 - 07 ngày làm việc", fee: "Theo quy định Bộ Công An" },
          { title: "Kích hoạt định danh điện tử VNeID mức 2", time: "Giải quyết ngay tại quầy", fee: "Miễn phí" },
          { title: "Xác nhận thông tin cư trú (CT07)", time: "Trong ngày làm việc", fee: "Miễn phí" },
          { title: "Tiếp nhận tin báo tội phạm & trật tự an ninh", time: "Tiếp nhận xử lý khẩn cấp 24/7", fee: "Miễn phí" }
        ]
      }
    },
    isVerified: true,
    verificationStatus: "verified"
  },
  36: { // Phường Tân Hưng
    name: "Phường Tân Hưng",
    previousNames: "Hợp nhất toàn bộ diện tích của phường Hải Tân, phường Tân Hưng cũ, xã Ngọc Sơn và một phần phường Trần Phú",
    description: "Phường Tân Hưng là trung tâm thương mại, dịch vụ, y tế và giáo dục quy mô lớn tại cửa ngõ phía Nam đô thị Hải Phòng.",
    officialPortal: "https://tanhung.haiphong.gov.vn",
    zaloOaUrl: "https://zalo.me/tanhunghaiphong",
    facebookUrl: "https://facebook.com/people/C%C3%B4ng-an-Ph%C6%B0%E1%BB%9Dng-T%C3%A2n-H%C6%B0ng-TP-H%E1%BA%A3i-Ph%C3%B2ng/100091945834931",
    hotline: "0225 3835 113",
    email: "phuongtanhung@haiphong.gov.vn",
    agencies: {
      "ubnd": {
        slug: "ubnd",
        name: "Ủy Ban Nhân Dân Phường Tân Hưng",
        shortName: "UBND Phường Tân Hưng",
        type: "ubnd",
        icon: "🏛️",
        badge: "Cơ quan Hành chính",
        level: "Cơ quan Chấp hành & Quản lý Nhà nước cấp Cơ sở Phường Tân Hưng",
        address: "Số 1 Phố Bá Liễu, Phường Tân Hưng, Thành phố Hải Phòng (trụ sở UBND phường Hải Tân cũ)",
        phone: "0225 3835 113",
        hotline: "Đường dây nóng Thường trực UBND: 0225 3835 113",
        workingHours: "Thứ 2 - Thứ 6: Sáng 07:30 - 11:30 | Chiều 13:30 - 17:00. Thứ 7: Sáng 07:30 - 11:30 (Một cửa tiếp nhận)",
        administrativeCode: "18036-UBND",
        lat: 20.9182,
        lng: 106.3315,
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=UBND+Ph%C6%B0%E1%BB%9Dng+T%C3%A2n+H%C6%B0ng%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        googleDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=UBND+Ph%C6%B0%E1%BB%9Dng+T%C3%A2n+H%C6%B0ng%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        keyProcedures: [
          { title: "Chứng thực bản sao từ bản chính, chứng thực chữ ký", time: "Trong ngày làm việc", fee: "Theo quy định nhà nước" },
          { title: "Đăng ký khai sinh, kết hôn, khai tử trực tuyến", time: "01 - 03 ngày làm việc", fee: "Miễn phí / Theo quy định" },
          { title: "Cấp giấy xác nhận tình trạng hôn nhân", time: "Trong ngày làm việc", fee: "Theo biểu mức quy định" },
          { title: "Liên thông thủ tục Khai sinh - Thường trú - BHYT trẻ em", time: "03 ngày làm việc", fee: "Miễn phí" },
          { title: "Tiếp nhận hồ sơ đăng ký biến động đất đai, nhà ở", time: "05 - 10 ngày làm việc", fee: "Theo biểu phí địa chính" }
        ]
      },
      "cong-an": {
        slug: "cong-an",
        name: "Công An Phường Tân Hưng",
        shortName: "Công An Phường Tân Hưng",
        type: "cong-an",
        icon: "👮",
        badge: "An ninh Trật tự",
        level: "Lực lượng Vũ trang Phụ trách Trật tự An toàn Xã hội & Quản lý Cư trú Phường Tân Hưng",
        address: "Khu Ngọc Lặc, Phường Tân Hưng, Thành phố Hải Phòng",
        phone: "0225 3835 113",
        hotline: "Trực ban tác chiến 24/7: 069 278 6112",
        workingHours: "Tiếp dân: Thứ 2 - Thứ 6: Sáng 07:30 - 11:30 | Chiều 13:30 - 17:00. Trực ban hình sự & an ninh: 24/24",
        administrativeCode: "18036-CA",
        lat: 20.9191,
        lng: 106.3328,
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=C%C3%B4ng+An+Ph%C6%B0%E1%BB%9Dng+T%C3%A2n+H%C6%B0ng%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        googleDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=C%C3%B4ng+an+Ph%C6%B0%E1%BB%9Dng+T%C3%A2n+H%C6%B0ng%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        keyProcedures: [
          { title: "Đăng ký thường trú, tạm trú, khai báo lưu trú", time: "03 - 07 ngày làm việc", fee: "Theo quy định Bộ Công An" },
          { title: "Kích hoạt định danh điện tử VNeID mức 2", time: "Giải quyết ngay tại quầy", fee: "Miễn phí" },
          { title: "Xác nhận thông tin cư trú (CT07)", time: "Trong ngày làm việc", fee: "Miễn phí" },
          { title: "Tiếp nhận tin báo tội phạm & trật tự an ninh", time: "Tiếp nhận xử lý khẩn cấp 24/7", fee: "Miễn phí" }
        ]
      }
    },
    isVerified: true,
    verificationStatus: "verified"
  },
  37: { // Phường Thạch Khôi
    name: "Phường Thạch Khôi",
    previousNames: "Sáp nhập toàn bộ phường Thạch Khôi cũ, xã Gia Xuyên, xã Liên Hồng và một phần xã Thống Nhất",
    description: "Phường Thạch Khôi là trung tâm phát triển công nghiệp phụ trợ, đầu mối giao thông kết nối liên vùng cao tốc Hà Nội - Hải Phòng với các khu đô thị vệ tinh.",
    officialPortal: "https://thachkhoi.haiphong.gov.vn",
    zaloOaUrl: "https://zalo.me/thachkhoihaiphong",
    facebookUrl: "https://facebook.com/thachkhoihaiphong",
    hotline: "0963 511 155",
    email: "ubndpthachkhoi@haiphong.gov.vn",
    agencies: {
      "ubnd": {
        slug: "ubnd",
        name: "Ủy Ban Nhân Dân Phường Thạch Khôi",
        shortName: "UBND Phường Thạch Khôi",
        type: "ubnd",
        icon: "🏛️",
        badge: "Cơ quan Hành chính",
        level: "Cơ quan Chấp hành & Quản lý Nhà nước cấp Cơ sở Phường Thạch Khôi",
        address: "Số 265 Phố Thạch Khôi (tiếp công dân: Số 261 Phố Thạch Khôi), Phường Thạch Khôi, Thành phố Hải Phòng",
        phone: "0963 511 155",
        hotline: "Đường dây nóng Thường trực UBND: 0963 511 155",
        workingHours: "Thứ 2 - Thứ 6: Sáng 07:30 - 11:30 | Chiều 13:30 - 17:00. Thứ 7: Sáng 07:30 - 11:30 (Một cửa tiếp nhận)",
        administrativeCode: "18037-UBND",
        lat: 20.8954,
        lng: 106.3121,
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=UBND+Ph%C6%B0%E1%BB%9Dng+Th%E1%BA%A1ch+Kh%C3%B4i%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        googleDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=UBND+Ph%C6%B0%E1%BB%9Dng+Th%E1%BA%A1ch+Kh%C3%B4i%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        keyProcedures: [
          { title: "Chứng thực bản sao từ bản chính, chứng thực chữ ký", time: "Trong ngày làm việc", fee: "Theo quy định nhà nước" },
          { title: "Đăng ký khai sinh, kết hôn, khai tử trực tuyến", time: "01 - 03 ngày làm việc", fee: "Miễn phí / Theo quy định" },
          { title: "Cấp giấy xác nhận tình trạng hôn nhân", time: "Trong ngày làm việc", fee: "Theo biểu mức quy định" },
          { title: "Liên thông thủ tục Khai sinh - Thường trú - BHYT trẻ em", time: "03 ngày làm việc", fee: "Miễn phí" },
          { title: "Tiếp nhận hồ sơ đăng ký biến động đất đai, nhà ở", time: "05 - 10 ngày làm việc", fee: "Theo biểu phí địa chính" }
        ]
      },
      "cong-an": {
        slug: "cong-an",
        name: "Công An Phường Thạch Khôi",
        shortName: "Công An Phường Thạch Khôi",
        type: "cong-an",
        icon: "👮",
        badge: "An ninh Trật tự",
        level: "Lực lượng Vũ trang Phụ trách Trật tự An toàn Xã hội & Quản lý Cư trú Phường Thạch Khôi",
        address: "Đường Âu Cơ, KDC Thanh Xá, Phường Thạch Khôi, Thành phố Hải Phòng",
        phone: "0904 737 878",
        hotline: "Trực ban tác chiến 24/7: 0225 3835 113",
        workingHours: "Tiếp dân: Thứ 2 - Thứ 6: Sáng 07:30 - 11:30 | Chiều 13:30 - 17:00. Trực ban hình sự & an ninh: 24/24",
        administrativeCode: "18037-CA",
        lat: 20.8962,
        lng: 106.3135,
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=C%C3%B4ng+An+Ph%C6%B0%E1%BB%9Dng+Th%E1%BA%A1ch+Kh%C3%B4i%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        googleDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=C%C3%B4ng+an+Ph%C6%B0%E1%BB%9Dng+Th%E1%BA%A1ch+Kh%C3%B4i%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        keyProcedures: [
          { title: "Đăng ký thường trú, tạm trú, khai báo lưu trú", time: "03 - 07 ngày làm việc", fee: "Theo quy định Bộ Công An" },
          { title: "Kích hoạt định danh điện tử VNeID mức 2", time: "Giải quyết ngay tại quầy", fee: "Miễn phí" },
          { title: "Xác nhận thông tin cư trú (CT07)", time: "Trong ngày làm việc", fee: "Miễn phí" },
          { title: "Tiếp nhận tin báo tội phạm & trật tự an ninh", time: "Tiếp nhận xử lý khẩn cấp 24/7", fee: "Miễn phí" }
        ]
      }
    },
    isVerified: true,
    verificationStatus: "verified"
  },
  38: { // Phường Thành Đông
    name: "Phường Thành Đông",
    previousNames: "Sáp nhập 4 đơn vị: phường Cẩm Thượng, phường Bình Hàn, phường Nguyễn Trãi và xã An Thượng (TP Hải Dương cũ)",
    description: "Phường Thành Đông mang tên kinh đô Thành Đông cổ kính, là trung tâm hành chính, lịch sử và văn hóa đặc sắc trong không gian phát triển mới của Thành phố Hải Phòng.",
    officialPortal: "https://thanhdong.haiphong.gov.vn",
    zaloOaUrl: "https://zalo.me/g/rktjht984",
    facebookUrl: "https://facebook.com/ubndthanhdong",
    hotline: "0978 848 831",
    email: "phuongthanhdong@haiphong.gov.vn",
    agencies: {
      "ubnd": {
        slug: "ubnd",
        name: "Ủy Ban Nhân Dân Phường Thành Đông",
        shortName: "UBND Phường Thành Đông",
        type: "ubnd",
        icon: "🏛️",
        badge: "Cơ quan Hành chính",
        level: "Cơ quan Chấp hành & Quản lý Nhà nước cấp Cơ sở Phường Thành Đông",
        address: "Số 48 Tự Đông, Phường Thành Đông, Thành phố Hải Phòng",
        phone: "0978 848 831",
        hotline: "Đường dây nóng Thường trực UBND: 0978 848 831",
        workingHours: "Thứ 2 - Thứ 6: Sáng 07:30 - 11:30 | Chiều 13:30 - 17:00. Thứ 7: Sáng 07:30 - 11:30 (Một cửa tiếp nhận)",
        administrativeCode: "18038-UBND",
        lat: 20.9452,
        lng: 106.3315,
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=UBND+Ph%C6%B0%E1%BB%9Dng+Th%C3%A0nh+%C4%90%C3%B4ng%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        googleDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=UBND+Ph%C6%B0%E1%BB%9Dng+Th%C3%A0nh+%C4%90%C3%B4ng%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        keyProcedures: [
          { title: "Chứng thực bản sao từ bản chính, chứng thực chữ ký", time: "Trong ngày làm việc", fee: "Theo quy định nhà nước" },
          { title: "Đăng ký khai sinh, kết hôn, khai tử trực tuyến", time: "01 - 03 ngày làm việc", fee: "Miễn phí / Theo quy định" },
          { title: "Cấp giấy xác nhận tình trạng hôn nhân", time: "Trong ngày làm việc", fee: "Theo biểu mức quy định" },
          { title: "Liên thông thủ tục Khai sinh - Thường trú - BHYT trẻ em", time: "03 ngày làm việc", fee: "Miễn phí" },
          { title: "Tiếp nhận hồ sơ đăng ký biến động đất đai, nhà ở", time: "05 - 10 ngày làm việc", fee: "Theo biểu phí địa chính" }
        ]
      },
      "cong-an": {
        slug: "cong-an",
        name: "Công An Phường Thành Đông",
        shortName: "Công An Phường Thành Đông",
        type: "cong-an",
        icon: "👮",
        badge: "An ninh Trật tự",
        level: "Lực lượng Vũ trang Phụ trách Trật tự An toàn Xã hội & Quản lý Cư trú Phường Thành Đông",
        address: "Số 6 Đường Hoàng Hoa Thám, Phường Thành Đông, Thành phố Hải Phòng",
        phone: "0383 311 681",
        hotline: "Trực ban tác chiến 24/7: 069 278 5827",
        workingHours: "Tiếp dân: Thứ 2 - Thứ 6: Sáng 07:30 - 11:30 | Chiều 13:30 - 17:00. Trực ban hình sự & an ninh: 24/24",
        administrativeCode: "18038-CA",
        lat: 20.9461,
        lng: 106.3328,
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=C%C3%B4ng+An+Ph%C6%B0%E1%BB%9Dng+Th%C3%A0nh+%C4%90%C3%B4ng%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        googleDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=C%C3%B4ng+an+Ph%C6%B0%E1%BB%9Dng+Th%C3%A0nh+%C4%90%C3%B4ng%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        keyProcedures: [
          { title: "Đăng ký thường trú, tạm trú, khai báo lưu trú", time: "03 - 07 ngày làm việc", fee: "Theo quy định Bộ Công An" },
          { title: "Kích hoạt định danh điện tử VNeID mức 2", time: "Giải quyết ngay tại quầy", fee: "Miễn phí" },
          { title: "Xác nhận thông tin cư trú (CT07)", time: "Trong ngày làm việc", fee: "Miễn phí" },
          { title: "Tiếp nhận tin báo tội phạm & trật tự an ninh", time: "Tiếp nhận xử lý khẩn cấp 24/7", fee: "Miễn phí" }
        ]
      }
    },
    isVerified: true,
    verificationStatus: "verified"
  },
  39: { // Phường Thiên Hương
    name: "Phường Thiên Hương",
    previousNames: "Sáp nhập phường Thiên Hương cũ, phường Hoàng Lâm cũ, một phần Lê Hồng Phong và Hoa Động (huyện Thủy Nguyên)",
    description: "Phường Thiên Hương là đô thị công nghiệp phụ trợ, dịch vụ thương mại sầm uất ven Quốc lộ 10, thuộc khu vực phát triển năng động của Thành phố Hải Phòng.",
    officialPortal: "https://thienhuong.haiphong.gov.vn",
    zaloOaUrl: "https://zalo.me/thienhuonghaiphong",
    facebookUrl: "https://facebook.com/thienhuonghaiphong",
    hotline: "0225 3868 168",
    email: "ubndpthienhuong@haiphong.gov.vn",
    agencies: {
      "ubnd": {
        slug: "ubnd",
        name: "Ủy Ban Nhân Dân Phường Thiên Hương",
        shortName: "UBND Phường Thiên Hương",
        type: "ubnd",
        icon: "🏛️",
        badge: "Cơ quan Hành chính",
        level: "Cơ quan Chấp hành & Quản lý Nhà nước cấp Cơ sở Phường Thiên Hương",
        address: "Tổ dân phố 5, Phường Thiên Hương, Thành phố Hải Phòng",
        phone: "0225 3868 168",
        hotline: "Đường dây nóng Thường trực UBND: 0225 3868 168",
        workingHours: "Thứ 2 - Thứ 6: Sáng 07:30 - 11:30 | Chiều 13:30 - 17:00. Thứ 7: Sáng 07:30 - 11:30 (Một cửa tiếp nhận)",
        administrativeCode: "18039-UBND",
        lat: 20.9182,
        lng: 106.6452,
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=UBND+Ph%C6%B0%E1%BB%9Dng+Thi%C3%AAn+H%C6%B0%C6%A1ng%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        googleDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=UBND+Ph%C6%B0%E1%BB%9Dng+Thi%C3%AAn+H%C6%B0%C6%A1ng%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        keyProcedures: [
          { title: "Chứng thực bản sao từ bản chính, chứng thực chữ ký", time: "Trong ngày làm việc", fee: "Theo quy định nhà nước" },
          { title: "Đăng ký khai sinh, kết hôn, khai tử trực tuyến", time: "01 - 03 ngày làm việc", fee: "Miễn phí / Theo quy định" },
          { title: "Cấp giấy xác nhận tình trạng hôn nhân", time: "Trong ngày làm việc", fee: "Theo biểu mức quy định" },
          { title: "Liên thông thủ tục Khai sinh - Thường trú - BHYT trẻ em", time: "03 ngày làm việc", fee: "Miễn phí" },
          { title: "Tiếp nhận hồ sơ đăng ký biến động đất đai, nhà ở", time: "05 - 10 ngày làm việc", fee: "Theo biểu phí địa chính" }
        ]
      },
      "cong-an": {
        slug: "cong-an",
        name: "Công An Phường Thiên Hương",
        shortName: "Công An Phường Thiên Hương",
        type: "cong-an",
        icon: "👮",
        badge: "An ninh Trật tự",
        level: "Lực lượng Vũ trang Phụ trách Trật tự An toàn Xã hội & Quản lý Cvr trú Phường Thiên Hương",
        address: "Tổ dân phố 4 (khu vực Hoàng Động cũ), Phường Thiên Hương, Thành phố Hải Phòng",
        phone: "0225 8830 913",
        hotline: "Trực ban tác chiến 24/7: 0225 3666 666",
        workingHours: "Tiếp dân: Thứ 2 - Thứ 6: Sáng 07:30 - 11:30 | Chiều 13:30 - 17:00. Trực ban hình sự & an ninh: 24/24",
        administrativeCode: "18039-CA",
        lat: 20.9195,
        lng: 106.6468,
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=C%C3%B4ng+An+Ph%C6%B0%E1%BB%9Dng+Thi%C3%AAn+H%C6%B0%C6%A1ng%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        googleDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=C%C3%B4ng+an+Ph%C6%B0%E1%BB%9Dng+Thi%C3%AAn+H%C6%B0%C6%A1ng%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        keyProcedures: [
          { title: "Đăng ký thường trú, tạm trú, khai báo lưu trú", time: "03 - 07 ngày làm việc", fee: "Theo quy định Bộ Công An" },
          { title: "Kích hoạt định danh điện tử VNeID mức 2", time: "Giải quyết ngay tại quầy", fee: "Miễn phí" },
          { title: "Xác nhận thông tin cư trú (CT07)", time: "Trong ngày làm việc", fee: "Miễn phí" },
          { title: "Tiếp nhận tin báo tội phạm & trật tự an ninh", time: "Tiếp nhận xử lý khẩn cấp 24/7", fee: "Miễn phí" }
        ]
      }
    },
    isVerified: true,
    verificationStatus: "verified"
  },
  40: { // Phường Thủy Nguyên
    name: "Phường Thủy Nguyên",
    previousNames: "Trung tâm hành chính đô thị mới Thủy Nguyên",
    description: "Phường Thủy Nguyên là trung tâm chính trị, hành chính, tài chính và dịch vụ đô thị kiểu mẫu tại khu vực đô thị mới phía Bắc Thành phố Hải Phòng.",
    officialPortal: "https://thuynguyen.haiphong.gov.vn",
    zaloOaUrl: "https://zalo.me/thuynguyenhaiphong",
    facebookUrl: "https://facebook.com/thuynguyen.haiphong.gov.vn",
    hotline: "0225 3874 420",
    email: "ubphuongthuynguyen@haiphong.gov.vn",
    agencies: {
      "ubnd": {
        slug: "ubnd",
        name: "Ủy Ban Nhân Dân Phường Thủy Nguyên",
        shortName: "UBND Phường Thủy Nguyên",
        type: "ubnd",
        icon: "🏛️",
        badge: "Cơ quan Hành chính",
        level: "Cơ quan Chấp hành & Quản lý Nhà nước cấp Cơ sở Phường Thủy Nguyên",
        address: "Số 5 Đường Đà Nẵng, Phường Thủy Nguyên, Thành phố Hải Phòng",
        phone: "0225 3874 420",
        hotline: "Đường dây nóng Thường trực UBND: 0225 3874 420",
        workingHours: "Thứ 2 - Thứ 6: Sáng 07:30 - 11:30 | Chiều 13:30 - 17:00. Thứ 7: Sáng 07:30 - 11:30 (Một cửa tiếp nhận)",
        administrativeCode: "18040-UBND",
        lat: 20.9152,
        lng: 106.6852,
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=UBND+Ph%C6%B0%E1%BB%9Dng+Th%E1%BB%A7y+Nguy%C3%AAn%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        googleDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=UBND+Ph%C6%B0%E1%BB%9Dng+Th%E1%BB%A7y+Nguy%C3%AAn%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        keyProcedures: [
          { title: "Chứng thực bản sao từ bản chính, chứng thực chữ ký", time: "Trong ngày làm việc", fee: "Theo quy định nhà nước" },
          { title: "Đăng ký khai sinh, kết hôn, khai tử trực tuyến", time: "01 - 03 ngày làm việc", fee: "Miễn phí / Theo quy định" },
          { title: "Cấp giấy xác nhận tình trạng hôn nhân", time: "Trong ngày làm việc", fee: "Theo biểu mức quy định" },
          { title: "Liên thông thủ tục Khai sinh - Thường trú - BHYT trẻ em", time: "03 ngày làm việc", fee: "Miễn phí" },
          { title: "Tiếp nhận hồ sơ đăng ký biến động đất đai, nhà ở", time: "05 - 10 ngày làm việc", fee: "Theo biểu phí địa chính" }
        ]
      },
      "cong-an": {
        slug: "cong-an",
        name: "Công An Phường Thủy Nguyên",
        shortName: "Công An Phường Thủy Nguyên",
        type: "cong-an",
        icon: "👮",
        badge: "An ninh Trật tự",
        level: "Lực lượng Vũ trang Phụ trách Trật tự An toàn Xã hội & Quản lý Cư trú Phường Thủy Nguyên",
        address: "Tổ dân phố 2, Tỉnh lộ 359, Phường Thủy Nguyên, Thành phố Hải Phòng",
        phone: "0225 3874 420",
        hotline: "Trực ban tác chiến 24/7: 0225 3666 666",
        workingHours: "Tiếp dân: Thứ 2 - Thứ 6: Sáng 07:30 - 11:30 | Chiều 13:30 - 17:00. Trực ban hình sự & an ninh: 24/24",
        administrativeCode: "18040-CA",
        lat: 20.9161,
        lng: 106.6865,
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=C%C3%B4ng+An+Ph%C6%B0%E1%BB%9Dng+Th%E1%BB%A7y+Nguy%C3%AAn%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        googleDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=C%C3%B4ng+an+Ph%C6%B0%E1%BB%9Dng+Th%E1%BB%A7y+Nguy%C3%AAn%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        keyProcedures: [
          { title: "Đăng ký thường trú, tạm trú, khai báo lưu trú", time: "03 - 07 ngày làm việc", fee: "Theo quy định Bộ Công An" },
          { title: "Kích hoạt định danh điện tử VNeID mức 2", time: "Giải quyết ngay tại quầy", fee: "Miễn phí" },
          { title: "Xác nhận thông tin cư trú (CT07)", time: "Trong ngày làm việc", fee: "Miễn phí" },
          { title: "Tiếp nhận tin báo tội phạm & trật tự an ninh", time: "Tiếp nhận xử lý khẩn cấp 24/7", fee: "Miễn phí" }
        ]
      }
    },
    isVerified: true,
    verificationStatus: "verified"
  }
};

let count = 0;
for (const u of units) {
  if (batch4Updates[u.id]) {
    const update = batch4Updates[u.id];
    u.name = update.name;
    u.previousNames = update.previousNames;
    u.description = update.description;
    u.officialPortal = update.officialPortal;
    u.zaloOaUrl = update.zaloOaUrl;
    u.facebookUrl = update.facebookUrl;
    u.hotline = update.hotline;
    u.email = update.email;
    u.agencies = {
      ...u.agencies,
      ...update.agencies
    };
    u.isVerified = true;
    u.verificationStatus = "verified";
    count++;
  }
}

fs.writeFileSync(filePath, JSON.stringify(units, null, 2), 'utf8');
console.log(`✅ Đã cập nhật thành công ${count} đơn vị hành chính Hải Phòng (Đợt 4, đơn vị 31 - 40) vào file JSON!`);
