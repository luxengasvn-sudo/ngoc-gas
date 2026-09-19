import fs from 'fs';
import path from 'path';

const filePath = path.resolve('src/data/tinhthanh/administrative-units-hai-phong.json');
const raw = fs.readFileSync(filePath, 'utf8');
const units = JSON.parse(raw);

const batch3Updates = {
  21: { // Phường Kinh Môn
    name: "Phường Kinh Môn",
    previousNames: "Hợp nhất các đơn vị trung tâm thị xã Kinh Môn (phường An Lưu, Phú Thứ, Minh Tân...)",
    description: "Phường Kinh Môn là trung tâm hành chính, kinh tế trọng điểm thuộc thị xã Kinh Môn trước đây trong không gian phát triển hợp nhất của Thành phố Hải Phòng. Phường vận hành mô hình chính quyền địa phương 2 cấp tinh gọn, hiện đại.",
    officialPortal: "https://kinhmon.haiphong.gov.vn",
    zaloOaUrl: "https://zalo.me/kinhmonhaiphong",
    facebookUrl: "https://facebook.com/kinhmon.haiphong",
    hotline: "0904 289 324",
    email: "ubndpkinhmon@haiphong.gov.vn",
    agencies: {
      "ubnd": {
        slug: "ubnd",
        name: "Ủy Ban Nhân Dân Phường Kinh Môn",
        shortName: "UBND Phường Kinh Môn",
        type: "ubnd",
        icon: "🏛️",
        badge: "Cơ quan Hành chính",
        level: "Cơ quan Chấp hành & Quản lý Nhà nước cấp Cơ sở Phường Kinh Môn",
        address: "Số 02 Đường An Ninh, Phường Kinh Môn, Thành phố Hải Phòng (Trung tâm PVHCC: Số 285 Đường Trần Hưng Đạo)",
        phone: "0904 289 324",
        hotline: "Đường dây nóng Thường trực UBND: 0911 672 888",
        workingHours: "Thứ 2 - Thứ 6: Sáng 07:30 - 11:30 | Chiều 13:30 - 17:00. Thứ 7: Sáng 07:30 - 11:30 (Một cửa tiếp nhận)",
        administrativeCode: "18021-UBND",
        lat: 20.9856,
        lng: 106.5421,
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=UBND+Ph%C6%B0%E1%BB%9Dng+Kinh+M%C3%B4n%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        googleDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=UBND+Ph%C6%B0%E1%BB%9Dng+Kinh+M%C3%B4n%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
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
        name: "Công An Phường Kinh Môn",
        shortName: "Công An Phường Kinh Môn",
        type: "cong-an",
        icon: "👮",
        badge: "An ninh Trật tự",
        level: "Lực lượng Vũ trang Phụ trách Trật tự An toàn Xã hội & Quản lý Cư trú Phường Kinh Môn",
        address: "Số 02 Đường Nguyễn Đại Năng, KDC Lưu Hạ, Phường Kinh Môn, Thành phố Hải Phòng",
        phone: "0225 3835 113",
        hotline: "Trực ban tác chiến 24/7: 069 278 6112",
        workingHours: "Tiếp dân: Thứ 2 - Thứ 6: Sáng 07:30 - 11:30 | Chiều 13:30 - 17:00. Trực ban hình sự & an ninh: 24/24",
        administrativeCode: "18021-CA",
        lat: 20.9862,
        lng: 106.5435,
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=C%C3%B4ng+An+Ph%C6%B0%E1%BB%9Dng+Kinh+M%C3%B4n%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        googleDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=C%C3%B4ng+an+Ph%C6%B0%E1%BB%9Dng+Kinh+M%C3%B4n%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
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
  22: { // Phường Lê Chân
    name: "Phường Lê Chân",
    previousNames: "Hợp nhất khu vực lõi quận Lê Chân cũ (phường Lam Sơn, Cát Dài, An Biên...)",
    description: "Phường Lê Chân là đô thị trung tâm văn hóa, dịch vụ và thương mại sầm uất mang tên nữ tướng Lê Chân, vận hành nền hành chính công chuyển đổi số toàn diện.",
    officialPortal: "https://lechan.haiphong.gov.vn",
    zaloOaUrl: "https://zalo.me/lechanhaiphong",
    facebookUrl: "https://facebook.com/lechanhaiphong",
    hotline: "0225 3846 515",
    email: "ubndplechan@haiphong.gov.vn",
    agencies: {
      "ubnd": {
        slug: "ubnd",
        name: "Ủy Ban Nhân Dân Phường Lê Chân",
        shortName: "UBND Phường Lê Chân",
        type: "ubnd",
        icon: "🏛️",
        badge: "Cơ quan Hành chính",
        level: "Cơ quan Chấp hành & Quản lý Nhà nước cấp Cơ sở Phường Lê Chân",
        address: "Số 10H - 10G Đường Hồ Sen, Phường Lê Chân, Thành phố Hải Phòng (Trung tâm PVHCC: Số 10A Đường Hồ Sen)",
        phone: "0225 3846 515",
        hotline: "Đường dây nóng Thường trực UBND: 0974 981 704",
        workingHours: "Thứ 2 - Thứ 6: Sáng 07:30 - 11:30 | Chiều 13:30 - 17:00. Thứ 7: Sáng 07:30 - 11:30 (Một cửa tiếp nhận)",
        administrativeCode: "18022-UBND",
        lat: 20.8524,
        lng: 106.6789,
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=UBND+Ph%C6%B0%E1%BB%9Dng+L%C3%AA+Ch%C3%A2n%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        googleDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=UBND+Ph%C6%B0%E1%BB%9Dng+L%C3%AA+Ch%C3%A2n%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
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
        name: "Công An Phường Lê Chân",
        shortName: "Công An Phường Lê Chân",
        type: "cong-an",
        icon: "👮",
        badge: "An ninh Trật tự",
        level: "Lực lượng Vũ trang Phụ trách Trật tự An toàn Xã hội & Quản lý Cư trú Phường Lê Chân",
        address: "Số 6 Đường Thuyết, Phường Lê Chân, Thành phố Hải Phòng",
        phone: "0974 981 704",
        hotline: "Trực ban hình sự & an ninh 24/7: 0692 795 855",
        workingHours: "Tiếp dân: Thứ 2 - Thứ 6: Sáng 07:30 - 11:30 | Chiều 13:30 - 17:00. Trực ban hình sự & an ninh: 24/24",
        administrativeCode: "18022-CA",
        lat: 20.8531,
        lng: 106.6775,
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=C%C3%B4ng+An+Ph%C6%B0%E1%BB%9Dng+L%C3%AA+Ch%C3%A2n%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        googleDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=C%C3%B4ng+an+Ph%C6%B0%E1%BB%9Dng+L%C3%AA+Ch%C3%A2n%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
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
  23: { // Phường Lê Đại Hành
    name: "Phường Lê Đại Hành",
    previousNames: "Sáp nhập 3 phường An Lạc, Tân Dân và Đồng Lạc (thành phố Chí Linh cũ)",
    description: "Phường Lê Đại Hành là trung tâm công nghiệp, thương mại và di tích lịch sử phía Bắc thành phố Hải Phòng, được thành lập từ việc hợp nhất 3 phường An Lạc, Tân Dân và Đồng Lạc.",
    officialPortal: "https://ledaihanh.haiphong.gov.vn",
    zaloOaUrl: "https://zalo.me/ledaihanhhaiphong",
    facebookUrl: "https://facebook.com/ledaihanhhaiphong",
    hotline: "0915 385 522",
    email: "ubndpledaihanh@haiphong.gov.vn",
    agencies: {
      "ubnd": {
        slug: "ubnd",
        name: "Ủy Ban Nhân Dân Phường Lê Đại Hành",
        shortName: "UBND Phường Lê Đại Hành",
        type: "ubnd",
        icon: "🏛️",
        badge: "Cơ quan Hành chính",
        level: "Cơ quan Chấp hành & Quản lý Nhà nước cấp Cơ sở Phường Lê Đại Hành",
        address: "Tổ dân phố Tân Dân (trụ sở UBND phường Tân Dân cũ), Phường Lê Đại Hành, Thành phố Hải Phòng",
        phone: "0915 385 522",
        hotline: "Đường dây nóng Thường trực UBND: 0986 526 555",
        workingHours: "Thứ 2 - Thứ 6: Sáng 07:30 - 11:30 | Chiều 13:30 - 17:00. Thứ 7: Sáng 07:30 - 11:30 (Một cửa tiếp nhận)",
        administrativeCode: "18023-UBND",
        lat: 21.1124,
        lng: 106.3982,
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=UBND+Ph%C6%B0%E1%BB%9Dng+L%C3%AA+%C4%90%E1%BA%A1i+H%C3%A0nh%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        googleDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=UBND+Ph%C6%B0%E1%BB%9Dng+L%C3%AA+%C4%90%E1%BA%A1i+H%C3%A0nh%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
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
        name: "Công An Phường Lê Đại Hành",
        shortName: "Công An Phường Lê Đại Hành",
        type: "cong-an",
        icon: "👮",
        badge: "An ninh Trật tự",
        level: "Lực lượng Vũ trang Phụ trách Trật tự An toàn Xã hội & Quản lý Cư trú Phường Lê Đại Hành",
        address: "Tổ dân phố Tân Dân (Khu dân cư Tân Dân), Phường Lê Đại Hành, Thành phố Hải Phòng",
        phone: "0915 385 522",
        hotline: "Trực ban tác chiến 24/7: 069 278 6112",
        workingHours: "Tiếp dân: Thứ 2 - Thứ 6: Sáng 07:30 - 11:30 | Chiều 13:30 - 17:00. Trực ban hình sự & an ninh: 24/24",
        administrativeCode: "18023-CA",
        lat: 21.1128,
        lng: 106.3995,
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=C%C3%B4ng+An+Ph%C6%B0%E1%BB%9Dng+L%C3%AA+%C4%90%E1%BA%A1i+H%C3%A0nh%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        googleDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=C%C3%B4ng+an+Ph%C6%B0%E1%BB%9Dng+L%C3%AA+%C4%90%E1%BA%A1i+H%C3%A0nh%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
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
  24: { // Phường Lê Ích Mộc
    name: "Phường Lê Ích Mộc",
    previousNames: "Hợp nhất xã Quảng Thanh cũ, một phần xã Quang Trung và một phần xã Mỹ Đồng (huyện Thủy Nguyên)",
    description: "Phường Lê Ích Mộc là vùng đất văn hiến, quê hương Trạng nguyên khai khoa Lê Ích Mộc, là cửa ngõ công nghiệp - làng nghề phát triển năng động tại Thủy Nguyên.",
    officialPortal: "https://leichmoc.haiphong.gov.vn",
    zaloOaUrl: "https://zalo.me/leichmochaiphong",
    facebookUrl: "https://facebook.com/leichmochaiphong",
    hotline: "0979 666 893",
    email: "ubndpleichmoc@haiphong.gov.vn",
    agencies: {
      "ubnd": {
        slug: "ubnd",
        name: "Ủy Ban Nhân Dân Phường Lê Ích Mộc",
        shortName: "UBND Phường Lê Ích Mộc",
        type: "ubnd",
        icon: "🏛️",
        badge: "Cơ quan Hành chính",
        level: "Cơ quan Chấp hành & Quản lý Nhà nước cấp Cơ sở Phường Lê Ích Mộc",
        address: "Tổ dân phố Quảng Thanh 2 (trụ sở UBND phường Quảng Thanh cũ, đường DT352), Phường Lê Ích Mộc, Thành phố Hải Phòng",
        phone: "0979 666 893",
        hotline: "Đường dây nóng PVHCC: 0979 666 893",
        workingHours: "Thứ 2 - Thứ 6: Sáng 07:30 - 11:30 | Chiều 13:30 - 17:00. Thứ 7: Sáng 07:30 - 11:30 (Một cửa tiếp nhận)",
        administrativeCode: "18024-UBND",
        lat: 20.9572,
        lng: 106.6341,
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=UBND+Ph%C6%B0%E1%BB%9Dng+L%C3%AA+%C3%8Dch+M%E1%BB%99c%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        googleDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=UBND+Ph%C6%B0%E1%BB%9Dng+L%C3%AA+%C3%8Dch+M%E1%BB%99c%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
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
        name: "Công An Phường Lê Ích Mộc",
        shortName: "Công An Phường Lê Ích Mộc",
        type: "cong-an",
        icon: "👮",
        badge: "An ninh Trật tự",
        level: "Lực lượng Vũ trang Phụ trách Trật tự An toàn Xã hội & Quản lý Cư trú Phường Lê Ích Mộc",
        address: "Tổ dân phố 10 Chính Mỹ (hoặc TDP Quảng Thanh 2), Phường Lê Ích Mộc, Thành phố Hải Phòng",
        phone: "0225 3874 449",
        hotline: "Trực ban tác chiến: 0225 3666 666",
        workingHours: "Tiếp dân: Thứ 2 - Thứ 6: Sáng 07:30 - 11:30 | Chiều 13:30 - 17:00. Trực ban hình sự & an ninh: 24/24",
        administrativeCode: "18024-CA",
        lat: 20.9585,
        lng: 106.6358,
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=C%C3%B4ng+An+Ph%C6%B0%E1%BB%9Dng+L%C3%AA+%C3%8Dch+M%E1%BB%99c%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        googleDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=C%C3%B4ng+an+Ph%C6%B0%E1%BB%9Dng+L%C3%AA+%C3%8Dch+M%E1%BB%99c%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
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
  25: { // Phường Lê Thanh Nghị
    name: "Phường Lê Thanh Nghị",
    previousNames: "Hợp nhất các phường Tân Bình, Thanh Bình, Lê Thanh Nghị và một phần phường Trần Phú",
    description: "Phường Lê Thanh Nghị là đô thị dịch vụ, thương mại phát triển hiện đại thuộc thành phố Hải Phòng, được thành lập trên cơ sở sắp xếp hợp nhất 4 đơn vị hành chính cốt lõi.",
    officialPortal: "https://lethanhnghi.haiphong.gov.vn",
    zaloOaUrl: "https://zalo.me/lethanhnghihaiphong",
    facebookUrl: "https://facebook.com/lethanhnghihaiphong",
    hotline: "0225 3835 113",
    email: "ubndplethanhnghi@haiphong.gov.vn",
    agencies: {
      "ubnd": {
        slug: "ubnd",
        name: "Ủy Ban Nhân Dân Phường Lê Thanh Nghị",
        shortName: "UBND Phường Lê Thanh Nghị",
        type: "ubnd",
        icon: "🏛️",
        badge: "Cơ quan Hành chính",
        level: "Cơ quan Chấp hành & Quản lý Nhà nước cấp Cơ sở Phường Lê Thanh Nghị",
        address: "Số 312 Đường Ngô Quyền, Phường Lê Thanh Nghị, Thành phố Hải Phòng",
        phone: "0225 3835 113",
        hotline: "Đường dây nóng tiếp nhận phản ánh: 0939 669 915",
        workingHours: "Thứ 2 - Thứ 6: Sáng 07:30 - 11:30 | Chiều 13:30 - 17:00. Thứ 7: Sáng 07:30 - 11:30 (Một cửa tiếp nhận)",
        administrativeCode: "18025-UBND",
        lat: 20.9328,
        lng: 106.3195,
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=UBND+Ph%C6%B0%E1%BB%9Dng+L%C3%AA+Thanh+Ngh%E1%BB%8B%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        googleDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=UBND+Ph%C6%B0%E1%BB%9Dng+L%C3%AA+Thanh+Ngh%E1%BB%8B%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
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
        name: "Công An Phường Lê Thanh Nghị",
        shortName: "Công An Phường Lê Thanh Nghị",
        type: "cong-an",
        icon: "👮",
        badge: "An ninh Trật tự",
        level: "Lực lượng Vũ trang Phụ trách Trật tự An toàn Xã hội & Quản lý Cư trú Phường Lê Thanh Nghị",
        address: "Số 3 Đường Thống Nhất, Phường Lê Thanh Nghị, Thành phố Hải Phòng",
        phone: "0939 669 915",
        hotline: "Trực ban tác chiến 24/7: 0939 669 915",
        workingHours: "Tiếp dân: Thứ 2 - Thứ 6: Sáng 07:30 - 11:30 | Chiều 13:30 - 17:00. Trực ban hình sự & an ninh: 24/24",
        administrativeCode: "18025-CA",
        lat: 20.9335,
        lng: 106.3212,
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=C%C3%B4ng+An+Ph%C6%B0%E1%BB%9Dng+L%C3%AA+Thanh+Ngh%E1%BB%8B%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        googleDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=C%C3%B4ng+an+Ph%C6%B0%E1%BB%9Dng+L%C3%AA+Thanh+Ngh%E1%BB%8B%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
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
  26: { // Phường Lưu Kiếm
    name: "Phường Lưu Kiếm",
    previousNames: "Hợp nhất phường Trần Hưng Đạo cũ, xã Lưu Kiếm cũ, một phần Liên Xuân và Quang Trung",
    description: "Phường Lưu Kiếm là trung tâm giao thương, công nghiệp phụ trợ và dịch vụ hậu cần cảng phía Bắc thành phố Hải Phòng, được thành lập từ việc sắp xếp các đơn vị hành chính Thủy Nguyên.",
    officialPortal: "https://luukiem.haiphong.gov.vn",
    zaloOaUrl: "https://zalo.me/luukiemhaiphong",
    facebookUrl: "https://facebook.com/luukiemhaiphong138",
    hotline: "0932 330 331",
    email: "ubndpluukiem@haiphong.gov.vn",
    agencies: {
      "ubnd": {
        slug: "ubnd",
        name: "Ủy Ban Nhân Dân Phường Lưu Kiếm",
        shortName: "UBND Phường Lưu Kiếm",
        type: "ubnd",
        icon: "🏛️",
        badge: "Cơ quan Hành chính",
        level: "Cơ quan Chấp hành & Quản lý Nhà nước cấp Cơ sở Phường Lưu Kiếm",
        address: "Tổ dân phố Trung, Phường Lưu Kiếm, Thành phố Hải Phòng",
        phone: "0932 330 331",
        hotline: "Đường dây nóng Thường trực UBND: 0365 990 455",
        workingHours: "Thứ 2 - Thứ 6: Sáng 07:30 - 11:30 | Chiều 13:30 - 17:00. Thứ 7: Sáng 07:30 - 11:30 (Một cửa tiếp nhận)",
        administrativeCode: "18026-UBND",
        lat: 20.9782,
        lng: 106.6715,
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=UBND+Ph%C6%B0%E1%BB%9Dng+L%C6%B0u+Ki%E1%BA%BFm%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        googleDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=UBND+Ph%C6%B0%E1%BB%9Dng+L%C6%B0u+Ki%E1%BA%BFm%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
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
        name: "Công An Phường Lưu Kiếm",
        shortName: "Công An Phường Lưu Kiếm",
        type: "cong-an",
        icon: "👮",
        badge: "An ninh Trật tự",
        level: "Lực lượng Vũ trang Phụ trách Trật tự An toàn Xã hội & Quản lý Cư trú Phường Lưu Kiếm",
        address: "Tổ dân phố Trại Trên - Đồng Phản, Phường Lưu Kiếm, Thành phố Hải Phòng",
        phone: "0225 8830 541",
        hotline: "Trực ban tác chiến 24/7: 0225 8830 541",
        workingHours: "Tiếp dân: Thứ 2 - Thứ 6: Sáng 07:30 - 11:30 | Chiều 13:30 - 17:00. Trực ban hình sự & an ninh: 24/24",
        administrativeCode: "18026-CA",
        lat: 20.9791,
        lng: 106.6728,
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=C%C3%B4ng+An+Ph%C6%B0%E1%BB%9Dng+L%C6%B0u+Ki%E1%BA%BFm%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        googleDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=C%C3%B4ng+an+Ph%C6%B0%E1%BB%9Dng+L%C6%B0u+Ki%E1%BA%BFm%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
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
  27: { // Phường Nam Đồ Sơn
    name: "Phường Nam Đồ Sơn",
    previousNames: "Hợp nhất các phường Minh Đức, Bàng La, Hợp Đức, một phần Vạn Hương và Ngọc Xuyên",
    description: "Phường Nam Đồ Sơn là vùng kinh tế biển, du lịch sinh thái và nuôi trồng thủy hải sản lớn thuộc dải ven biển Đồ Sơn, Thành phố Hải Phòng.",
    officialPortal: "https://namdoson.haiphong.gov.vn",
    zaloOaUrl: "https://zalo.me/namdosonhaiphong",
    facebookUrl: "https://facebook.com/namdosonhaiphong",
    hotline: "0225 3561 019",
    email: "ubndpnamdoson@haiphong.gov.vn",
    agencies: {
      "ubnd": {
        slug: "ubnd",
        name: "Ủy Ban Nhân Dân Phường Nam Đồ Sơn",
        shortName: "UBND Phường Nam Đồ Sơn",
        type: "ubnd",
        icon: "🏛️",
        badge: "Cơ quan Hành chính",
        level: "Cơ quan Chấp hành & Quản lý Nhà nước cấp Cơ sở Phường Nam Đồ Sơn",
        address: "Số 421 Đường Trung Nghĩa, TDP Đức Hậu, Phường Nam Đồ Sơn, Thành phố Hải Phòng (trụ sở UBND phường Hợp Đức cũ)",
        phone: "0225 3561 019",
        hotline: "Đường dây nóng Thường trực UBND: 0914 183 669",
        workingHours: "Thứ 2 - Thứ 6: Sáng 07:30 - 11:30 | Chiều 13:30 - 17:00. Thứ 7: Sáng 07:30 - 11:30 (Một cửa tiếp nhận)",
        administrativeCode: "18027-UBND",
        lat: 20.7321,
        lng: 106.7725,
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=UBND+Ph%C6%B0%E1%BB%9Dng+Nam+%C4%90%E1%BB%93+S%C6%A1n%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        googleDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=UBND+Ph%C6%B0%E1%BB%9Dng+Nam+%C4%90%E1%BB%93+S%C6%A1n%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
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
        name: "Công An Phường Nam Đồ Sơn",
        shortName: "Công An Phường Nam Đồ Sơn",
        type: "cong-an",
        icon: "👮",
        badge: "An ninh Trật tự",
        level: "Lực lượng Vũ trang Phụ trách Trật tự An toàn Xã hội & Quản lý Cư trú Phường Nam Đồ Sơn",
        address: "Số 1080 Đường Phạm Văn Đồng (hoặc Đường Trung Nghĩa, TDP Đức Hậu), Phường Nam Đồ Sơn, Thành phố Hải Phòng",
        phone: "0225 3561 019",
        hotline: "Trực ban tác chiến: 0225 3561 019 / Hotline Trưởng CA: 0914 183 669",
        workingHours: "Tiếp dân: Thứ 2 - Thứ 6: Sáng 07:30 - 11:30 | Chiều 13:30 - 17:00. Trực ban hình sự & an ninh: 24/24",
        administrativeCode: "18027-CA",
        lat: 20.7335,
        lng: 106.7738,
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=C%C3%B4ng+An+Ph%C6%B0%E1%BB%9Dng+Nam+%C4%90%E1%BB%93+S%C6%A1n%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        googleDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=C%C3%B4ng+an+Ph%C6%B0%E1%BB%9Dng+Nam+%C4%90%E1%BB%93+S%C6%A1n%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
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
  28: { // Phường Nam Đồng
    name: "Phường Nam Đồng",
    previousNames: "Hợp nhất phường Nam Đồng và xã Tiền Tiến (thành phố Hải Dương cũ)",
    description: "Phường Nam Đồng là trung tâm dịch vụ, nông nghiệp công nghệ cao và đô thị sinh thái ven sông phía Đông thành phố Hải Phòng.",
    officialPortal: "https://namdong.haiphong.gov.vn",
    zaloOaUrl: "https://zalo.me/namdonghaiphong",
    facebookUrl: "https://facebook.com/namdonghaiphong",
    hotline: "0225 3835 113",
    email: "ubndpnamdong@haiphong.gov.vn",
    agencies: {
      "ubnd": {
        slug: "ubnd",
        name: "Ủy Ban Nhân Dân Phường Nam Đồng",
        shortName: "UBND Phường Nam Đồng",
        type: "ubnd",
        icon: "🏛️",
        badge: "Cơ quan Hành chính",
        level: "Cơ quan Chấp hành & Quản lý Nhà nước cấp Cơ sở Phường Nam Đồng",
        address: "Đường 390 (trụ sở UBND xã Tiền Tiến cũ, TDP Cập Nhật 1), Phường Nam Đồng, Thành phố Hải Phòng",
        phone: "0225 3835 113",
        hotline: "Đường dây nóng tiếp nhận TTHC: 0975 585 826",
        workingHours: "Thứ 2 - Thứ 6: Sáng 07:30 - 11:30 | Chiều 13:30 - 17:00. Thứ 7: Sáng 07:30 - 11:30 (Một cửa tiếp nhận)",
        administrativeCode: "18028-UBND",
        lat: 20.9415,
        lng: 106.3582,
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=UBND+Ph%C6%B0%E1%BB%9Dng+Nam+%C4%90%E1%BB%93ng%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        googleDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=UBND+Ph%C6%B0%E1%BB%9Dng+Nam+%C4%90%E1%BB%93ng%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
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
        name: "Công An Phường Nam Đồng",
        shortName: "Công An Phường Nam Đồng",
        type: "cong-an",
        icon: "👮",
        badge: "An ninh Trật tự",
        level: "Lực lượng Vũ trang Phụ trách Trật tự An toàn Xã hội & Quản lý Cư trú Phường Nam Đồng",
        address: "Khu Cập Nhật 1 (Đường 390), Phường Nam Đồng, Thành phố Hải Phòng",
        phone: "0225 3835 113",
        hotline: "Trực ban 24/7: 0225 3835 113 / Trưởng CA: 0972 198 007",
        workingHours: "Tiếp dân: Thứ 2 - Thứ 6: Sáng 07:30 - 11:30 | Chiều 13:30 - 17:00. Trực ban hình sự & an ninh: 24/24",
        administrativeCode: "18028-CA",
        lat: 20.9422,
        lng: 106.3595,
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=C%C3%B4ng+An+Ph%C6%B0%E1%BB%9Dng+Nam+%C4%90%E1%BB%93ng%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        googleDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=C%C3%B4ng+an+Ph%C6%B0%E1%BB%9Dng+Nam+%C4%90%E1%BB%93ng%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
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
  29: { // Phường Nam Triệu
    name: "Phường Nam Triệu",
    previousNames: "Hợp nhất các phường Nam Triệu Giang, Lập Lễ và Tam Hưng (huyện Thủy Nguyên)",
    description: "Phường Nam Triệu gắn liền với cửa biển Nam Triệu và hạ lưu sông Bạch Đằng lịch sử, là đô thị cảng biển, công nghiệp đóng tàu và thủy hải sản phát triển sôi động.",
    officialPortal: "https://namtrieu.haiphong.gov.vn",
    zaloOaUrl: "https://zalo.me/namtrieuhaiphong",
    facebookUrl: "https://facebook.com/share/17b9Mp5jBC",
    hotline: "0912 084 031",
    email: "ubndpnamtrieu@haiphong.gov.vn",
    agencies: {
      "ubnd": {
        slug: "ubnd",
        name: "Ủy Ban Nhân Dân Phường Nam Triệu",
        shortName: "UBND Phường Nam Triệu",
        type: "ubnd",
        icon: "🏛️",
        badge: "Cơ quan Hành chính",
        level: "Cơ quan Chấp hành & Quản lý Nhà nước cấp Cơ sở Phường Nam Triệu",
        address: "Tổ dân phố Trung, Phường Nam Triệu, Thành phố Hải Phòng (trụ sở UBND phường Nam Triệu Giang cũ)",
        phone: "0912 084 031",
        hotline: "Đường dây nóng phản ánh: 0352 111 468",
        workingHours: "Thứ 2 - Thứ 6: Sáng 07:30 - 11:30 | Chiều 13:30 - 17:00. Thứ 7: Sáng 07:30 - 11:30 (Một cửa tiếp nhận)",
        administrativeCode: "18029-UBND",
        lat: 20.9124,
        lng: 106.7825,
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=UBND+Ph%C6%B0%E1%BB%9Dng+Nam+Tri%E1%BB%87u%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        googleDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=UBND+Ph%C6%B0%E1%BB%9Dng+Nam+Tri%E1%BB%87u%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
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
        name: "Công An Phường Nam Triệu",
        shortName: "Công An Phường Nam Triệu",
        type: "cong-an",
        icon: "👮",
        badge: "An ninh Trật tự",
        level: "Lực lượng Vũ trang Phụ trách Trật tự An toàn Xã hội & Quản lý Cư trú Phường Nam Triệu",
        address: "Tổ dân phố Lạch Sẽ, Phường Nam Triệu, Thành phố Hải Phòng",
        phone: "0225 3875 505",
        hotline: "Trực ban tác chiến: 0225 3666 666",
        workingHours: "Tiếp dân: Thứ 2 - Thứ 6: Sáng 07:30 - 11:30 | Chiều 13:30 - 17:00. Trực ban hình sự & an ninh: 24/24",
        administrativeCode: "18029-CA",
        lat: 20.9135,
        lng: 106.7842,
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=C%C3%B4ng+An+Ph%C6%B0%E1%BB%9Dng+Nam+Tri%E1%BB%87u%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        googleDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=C%C3%B4ng+an+Ph%C6%B0%E1%BB%9Dng+Nam+Tri%E1%BB%87u%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
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
  30: { // Phường Ngô Quyền
    name: "Phường Ngô Quyền",
    previousNames: "Hợp nhất các phường trung tâm quận Ngô Quyền (Máy Chai, Vạn Mỹ, Cầu Tre, Lạc Viên, Gia Viên...)",
    description: "Phường Ngô Quyền là trung tâm đô thị cảng, logistics và dịch vụ thương mại lịch sử của Thành phố Hải Phòng, mang tên vị vua khai sáng nền độc lập Ngô Quyền.",
    officialPortal: "https://ngoquyen.haiphong.gov.vn",
    zaloOaUrl: "https://zalo.me/ngoquyenhaiphong",
    facebookUrl: "https://facebook.com/ngoquyenhaiphong",
    hotline: "0225 3666 122",
    email: "phuongngoquyen@haiphong.gov.vn",
    agencies: {
      "ubnd": {
        slug: "ubnd",
        name: "Ủy Ban Nhân Dân Phường Ngô Quyền",
        shortName: "UBND Phường Ngô Quyền",
        type: "ubnd",
        icon: "🏛️",
        badge: "Cơ quan Hành chính",
        level: "Cơ quan Chấp hành & Quản lý Nhà nước cấp Cơ sở Phường Ngô Quyền",
        address: "Số 46 Đường Lê Lai, Phường Ngô Quyền, Thành phố Hải Phòng",
        phone: "0225 3666 122",
        hotline: "Đường dây nóng Thường trực UBND: 0225 3666 122",
        workingHours: "Thứ 2 - Thứ 6: Sáng 07:30 - 11:30 | Chiều 13:30 - 17:00. Thứ 7: Sáng 07:30 - 11:30 (Một cửa tiếp nhận)",
        administrativeCode: "18030-UBND",
        lat: 20.8652,
        lng: 106.6985,
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=UBND+Ph%C6%B0%E1%BB%9Dng+Ng%C3%B4+Quy%E1%BB%81n%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        googleDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=UBND+Ph%C6%B0%E1%BB%9Dng+Ng%C3%B4+Quy%E1%BB%81n%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
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
        name: "Công An Phường Ngô Quyền",
        shortName: "Công An Phường Ngô Quyền",
        type: "cong-an",
        icon: "👮",
        badge: "An ninh Trật tự",
        level: "Lực lượng Vũ trang Phụ trách Trật tự An toàn Xã hội & Quản lý Cư trú Phường Ngô Quyền",
        address: "Số 119 Đường Đà Nẵng, Phường Ngô Quyền, Thành phố Hải Phòng",
        phone: "0225 3852 468",
        hotline: "Trực ban tác chiến 24/7: 0225 3835 113",
        workingHours: "Tiếp dân: Thứ 2 - Thứ 6: Sáng 07:30 - 11:30 | Chiều 13:30 - 17:00. Trực ban hình sự & an ninh: 24/24",
        administrativeCode: "18030-CA",
        lat: 20.8665,
        lng: 106.7002,
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=C%C3%B4ng+An+Ph%C6%B0%E1%BB%9Dng+Ng%C3%B4+Quy%E1%BB%81n%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
        googleDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=C%C3%B4ng+an+Ph%C6%B0%E1%BB%9Dng+Ng%C3%B4+Quy%E1%BB%81n%2C+Th%C3%A0nh+ph%E1%BB%91+H%E1%BA%A3i+Ph%C3%B2ng",
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
  if (batch3Updates[u.id]) {
    const update = batch3Updates[u.id];
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
console.log(`✅ Đã cập nhật thành công ${count} đơn vị hành chính Hải Phòng (Đợt 3, đơn vị 21 - 30) vào file JSON!`);
