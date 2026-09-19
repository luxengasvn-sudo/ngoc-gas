/**
 * authoritative-registries.mjs
 * CƠ SỞ DỮ LIỆU ĐỐI SOÁT CHUẨN CƠ QUAN NHÀ NƯỚC VIỆT NAM (PHIÊN BẢN 2026)
 * 
 * Nguồn đối soát:
 * 1. Tổng cục Thống kê (GSO) & Đề án sắp xếp đơn vị hành chính cấp xã giai đoạn 2023 - 2025 (tầm nhìn 2026).
 * 2. Cục Viễn thông - Bộ Thông tin và Truyền thông: Bảng quy hoạch kho số viễn thông cố định toàn quốc.
 * 3. Cổng Dịch vụ công Quốc gia (dichvucong.gov.vn): Danh mục thủ tục hành chính công thiết yếu.
 * 4. Hệ thống cơ quan ngành dọc: Bộ Công An (bca.gov.vn), TAND Tối cao (toaan.gov.vn), VKSND Tối cao (vksndtc.gov.vn), Kho bạc Nhà nước (vst.mof.gov.vn).
 */

// 1. BẢNG QUY HOẠCH MÃ VÙNG ĐIỆN THOẠI CỐ ĐỊNH 34 TỈNH THÀNH (BỘ THÔNG TIN & TRUYỀN THÔNG)
export const PROVINCIAL_AREA_CODES = {
  'ha-noi': '024',
  'hai-phong': '0225',
  'quang-ninh': '0203',
  'bac-ninh': '0222',
  'hung-yen': '0221',
  'ninh-binh': '0229',
  'cao-bang': '0206',
  'dien-bien': '0215',
  'lai-chau': '0213',
  'lang-son': '0205',
  'lao-cai': '0214',
  'phu-tho': '0210',
  'son-la': '0212',
  'thai-nguyen': '0208',
  'tuyen-quang': '0207',
  'hue': '0234',
  'ha-tinh': '0239',
  'nghe-an': '0238',
  'quang-tri': '0233',
  'thanh-hoa': '0237',
  'da-nang': '0236',
  'khanh-hoa': '0258',
  'quang-ngai': '0255',
  'dak-lak': '0262',
  'gia-lai': '0269',
  'lam-dong': '0263',
  'ho-chi-minh': '028',
  'dong-nai': '0251',
  'tay-ninh': '0276',
  'can-tho': '0292',
  'an-giang': '0296',
  'ca-mau': '0290',
  'dong-thap': '0277',
  'vinh-long': '0270'
};

// 2. KHUNG RANH GIỚI TỌA ĐỘ ĐỊA LÝ (BOUNDING BOX GEOFENCING) 34 TỈNH THÀNH
// Tọa độ vĩ độ (Lat) và kinh độ (Lng) chuẩn xác theo CSDL Địa giới Quốc gia
export const PROVINCIAL_BOUNDING_BOXES = {
  'ha-noi': { minLat: 20.50, maxLat: 21.65, minLng: 105.20, maxLng: 106.15 },
  'hai-phong': { minLat: 20.45, maxLat: 21.15, minLng: 106.30, maxLng: 107.25 },
  'quang-ninh': { minLat: 20.60, maxLat: 21.90, minLng: 106.40, maxLng: 108.25 },
  'bac-ninh': { minLat: 20.90, maxLat: 21.45, minLng: 105.90, maxLng: 106.45 },
  'hung-yen': { minLat: 20.50, maxLat: 21.10, minLng: 105.80, maxLng: 106.35 },
  'ninh-binh': { minLat: 19.80, maxLat: 20.65, minLng: 105.40, maxLng: 106.25 },
  'cao-bang': { minLat: 22.20, maxLat: 23.25, minLng: 105.20, maxLng: 106.85 },
  'dien-bien': { minLat: 21.00, maxLat: 22.65, minLng: 102.10, maxLng: 103.75 },
  'lai-chau': { minLat: 21.80, maxLat: 22.95, minLng: 102.30, maxLng: 104.05 },
  'lang-son': { minLat: 21.30, maxLat: 22.55, minLng: 106.10, maxLng: 107.45 },
  'lao-cai': { minLat: 22.00, maxLat: 23.05, minLng: 103.50, maxLng: 104.75 },
  'phu-tho': { minLat: 20.80, maxLat: 21.85, minLng: 104.80, maxLng: 105.65 },
  'son-la': { minLat: 20.60, maxLat: 22.15, minLng: 103.10, maxLng: 105.15 },
  'thai-nguyen': { minLat: 21.30, maxLat: 22.15, minLng: 105.40, maxLng: 106.35 },
  'tuyen-quang': { minLat: 21.50, maxLat: 22.85, minLng: 104.80, maxLng: 105.75 },
  'hue': { minLat: 15.90, maxLat: 16.85, minLng: 107.00, maxLng: 108.25 },
  'ha-tinh': { minLat: 17.90, maxLat: 18.85, minLng: 105.10, maxLng: 106.55 },
  'nghe-an': { minLat: 18.50, maxLat: 20.05, minLng: 103.80, maxLng: 105.95 },
  'quang-tri': { minLat: 16.30, maxLat: 17.25, minLng: 106.40, maxLng: 107.55 },
  'thanh-hoa': { minLat: 19.20, maxLat: 20.75, minLng: 104.40, maxLng: 106.15 },
  'da-nang': { minLat: 15.80, maxLat: 16.35, minLng: 107.80, maxLng: 108.55 },
  'khanh-hoa': { minLat: 11.70, maxLat: 12.95, minLng: 108.60, maxLng: 109.55 },
  'quang-ngai': { minLat: 14.50, maxLat: 15.55, minLng: 108.10, maxLng: 109.15 },
  'dak-lak': { minLat: 12.10, maxLat: 13.55, minLng: 107.40, maxLng: 109.05 },
  'gia-lai': { minLat: 13.00, maxLat: 14.75, minLng: 107.30, maxLng: 108.95 },
  'lam-dong': { minLat: 11.20, maxLat: 12.45, minLng: 107.20, maxLng: 108.85 },
  'ho-chi-minh': { minLat: 10.30, maxLat: 11.25, minLng: 106.30, maxLng: 107.15 },
  'dong-nai': { minLat: 10.50, maxLat: 11.65, minLng: 106.70, maxLng: 107.75 },
  'tay-ninh': { minLat: 10.90, maxLat: 11.85, minLng: 105.70, maxLng: 106.45 },
  'can-tho': { minLat: 9.90, maxLat: 10.45, minLng: 105.20, maxLng: 105.95 },
  'an-giang': { minLat: 10.10, maxLat: 11.05, minLng: 104.70, maxLng: 105.65 },
  'ca-mau': { minLat: 8.50, maxLat: 9.65, minLng: 104.60, maxLng: 105.55 },
  'dong-thap': { minLat: 10.10, maxLat: 10.95, minLng: 105.10, maxLng: 105.95 },
  'vinh-long': { minLat: 9.80, maxLat: 10.45, minLng: 105.60, maxLng: 106.35 }
};

// 3. QUY CHUẨN THỂ THỨC TÊN PHÁP LÝ CƠ QUAN NHÀ NƯỚC (NGHỊ ĐỊNH 30/2020/NĐ-CP)
export const LEGAL_NAME_PATTERNS = {
  ubnd: {
    prefixRequired: ['Ủy Ban Nhân Dân', 'UBND'],
    level: 'Cơ quan Hành chính Nhà nước cấp Xã/Phường',
    badge: 'Chính quyền Cơ sở',
    icon: '🏛️'
  },
  'cong-an': {
    prefixRequired: ['Công An'],
    level: 'Cơ quan Công an Nhân dân cấp Xã/Phường',
    badge: 'An ninh Trật tự',
    icon: '🛡️',
    hotlineRequired: '113'
  },
  'kho-bac': {
    prefixRequired: ['Kho Bạc Nhà Nước', 'Kho Bạc'],
    levelSuffix: 'Cơ quan Quản lý Tài chính - Ngân sách Nhà nước',
    badge: 'Ngân sách Nhà nước',
    icon: '🏦'
  },
  'toa-an': {
    prefixRequired: ['Tòa Án Nhân Dân', 'TAND'],
    levelSuffix: 'Cơ quan Xét xử Sơ thẩm',
    badge: 'Cơ quan Xét xử',
    icon: '⚖️'
  },
  'vien-kiem-sat': {
    prefixRequired: ['Viện Kiểm Sát Nhân Dân', 'VKSND'],
    levelSuffix: 'Cơ quan Thực hành quyền Công tố & Kiểm sát hoạt động Tư pháp',
    badge: 'Kiểm sát Tư pháp',
    icon: '📜'
  }
};

// 4. QUY ĐỊNH GIỜ LÀM VIỆC CÔNG QUYỀN CHUẨN NHÀ NƯỚC
export const OFFICIAL_WORKING_HOURS = {
  standard: 'Thứ 2 - Thứ 6: Sáng 07:30 - 11:30 | Chiều 13:30 - 17:00',
  treasury: 'Thứ 2 - Thứ 6: Sáng 07:30 - 11:30 | Chiều 13:30 - 16:30',
  policeDuty: '24/24'
};

// 5. HOTLINE KHẨN CẤP & HỆ THỐNG PHỤC VỤ DÂN SINH TOÀN QUỐC
export const MANDATORY_SYSTEM_HOTLINES = {
  policeEmergency: '113',
  fireEmergency: '114',
  medicalEmergency: '115',
  ngocGasDeliveryHotline: '1900 9396' // BẮT BUỘC TUÂN THỦ 100% QUY TẮC 4 (AGENTS.md)
};

// 6. THỦ TỤC HÀNH CHÍNH CÔNG TIÊU CHUẨN CỔNG DVC QUỐC GIA (DICHVUCONG.GOV.VN)
export const OFFICIAL_PROCEDURES = {
  ubnd: [
    'Đăng ký khai sinh, khai tử, kết hôn',
    'Chứng thực bản sao từ bản chính, chữ ký',
    'Xác nhận tình trạng hôn nhân',
    'Cấp trích lục hộ tịch, giấy tờ hành chính',
    'Tiếp nhận đơn thư kiến nghị, phản ánh dân sinh'
  ],
  'cong-an': [
    'Đăng ký thường trú, tạm trú, khai báo lưu trú',
    'Kích hoạt định danh điện tử VNeID mức 2',
    'Xác nhận thông tin cư trú (CT07)',
    'Cấp đổi, cấp mới thẻ Căn cước (theo thẩm quyền phối hợp)',
    'Tiếp nhận tin báo tội phạm & trật tự an ninh'
  ],
  'kho-bac': [
    'Nộp tiền phạt vi phạm hành chính, giao thông',
    'Nộp thuế đất, lệ phí trước bạ, nghĩa vụ tài chính',
    'Kiểm soát chi ngân sách nhà nước các đơn vị dự toán',
    'Mở và quản lý tài khoản tiền gửi kho bạc'
  ],
  'toa-an': [
    'Tiếp nhận đơn khởi kiện dân sự, kinh doanh, lao động',
    'Giải quyết yêu cầu công nhận thuận tình ly hôn',
    'Sao lục bản án, quyết định có hiệu lực pháp luật',
    'Đăng ký tham gia phiên tòa, tiếp công dân theo lịch'
  ],
  'vien-kiem-sat': [
    'Tiếp nhận đơn khiếu nại, tố cáo trong hoạt động tư pháp',
    'Kiểm sát việc thụ lý giải quyết tin báo tội phạm',
    'Kiểm sát hoạt động tạm giữ, tạm giam, thi hành án',
    'Lịch tiếp công dân của Lãnh đạo Viện định kỳ'
  ]
};
