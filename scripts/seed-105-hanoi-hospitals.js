const fs = require('fs');
const path = require('path');

const masterPath = path.join(__dirname, '..', 'src', 'data', 'tinhthanh', 'hospitals-master.json');
const currentHospitals = JSON.parse(fs.readFileSync(masterPath, 'utf8'));

// Từ điển thông tin thực địa chuẩn xác cho các bệnh viện Hà Nội
const hanoiHospitalsMeta = {
  // Tuyến Trung Ương / Tuyến 1
  "Bệnh viện Bạch Mai": {
    district: "Quận Đống Đa",
    address: "78 Đường Giải Phóng, Phường Phương Mai, Quận Đống Đa, Hà Nội",
    phone: "024 3869 3731",
    tier: "Tuyến Trung Ương",
    badge: "Bệnh Viện Hạng Đặc Biệt",
    type: "Đa Khoa Hoàn Chỉnh Tuyến Cuối",
    agency: "Bộ Y Tế",
    website: "http://bachmai.gov.vn",
    bedCapacity: "3.200+ giường thực kê",
    specialties: ["Hồi Sức Cấp Cứu A9", "Tim Mạch Can Thiệp", "Hô Hấp & Bệnh Phổi", "Chống Độc Quốc Gia", "Thần Kinh & Đột Quỵ"]
  },
  "Bệnh viện Bệnh Nhiệt Đới Trung Ương": {
    district: "Huyện Đông Anh",
    address: "Thôn Bầu, Xã Kim Chung, Huyện Đông Anh, Hà Nội (CS2) & 78 Giải Phóng (CS1)",
    phone: "1900 3228",
    tier: "Tuyến Trung Ương",
    badge: "Bệnh Viện Chuyên Khoa Tuyến Cuối",
    type: "Truyền Nhiễm & Nhiệt Đới",
    agency: "Bộ Y Tế",
    website: "http://benhnhietdoi.vn",
    bedCapacity: "1.000+ giường bệnh",
    specialties: ["Hồi Sức Cấp Cứu Truyền Nhiễm", "Viêm Gan Siêu Vi & Xơ Gan", "Sốt Xuất Huyết & Dịch Bệnh Mới Nổi", "Nhiễm Trùng Huyết & Sốc Nhiễm Khuẩn", "Ký Sinh Trùng & Nấm Sâu"]
  },
  "Bệnh viện Châm Cứu Trung Ương": {
    district: "Quận Đống Đa",
    address: "49 Thái Thịnh, Phường Thịnh Quang, Quận Đống Đa, Hà Nội",
    phone: "024 3562 7687",
    tier: "Tuyến Trung Ương",
    badge: "Bệnh Viện Chuyên Khoa Tuyến Cuối",
    type: "Châm Cứu & Y Dược Cổ Truyền",
    agency: "Bộ Y Tế",
    website: "http://chamcuuvietnam.vn",
    bedCapacity: "650+ giường bệnh",
    specialties: ["Thủy Châm & Cấy Chỉ Trị Liệu", "Phục Hồi Liệt Nửa Người Sau Đột Quỵ", "Điều Trị Bại Não & Tự Kỷ Trẻ Em", "Chữa Đau Thần Kinh Tọa & Thoát Vị", "Nhi Ánh & Dưỡng Sinh Châm Cứu"]
  },
  "Bệnh viện Da Liễu Trung Ương": {
    district: "Quận Đống Đa",
    address: "15A Phương Mai, Phường Phương Mai, Quận Đống Đa, Hà Nội",
    phone: "1900 6951",
    tier: "Tuyến Trung Ương",
    badge: "Bệnh Viện Chuyên Khoa Tuyến Cuối",
    type: "Da Liễu & Thẩm Mỹ Da",
    agency: "Bộ Y Tế",
    website: "http://dalieu.vn",
    bedCapacity: "400+ giường bệnh",
    specialties: ["Điều Trị Vảy Nến & Bệnh Tự Miễn", "Phẫu Thuật Laser & Tế Bào Gốc", "Da Liễu Thẩm Mỹ Kỹ Thuật Cao", "Điều Trị Các Bệnh Lây Qua Đường Tình Dục", "Dị Ứng Da & Miễn Dịch Lâm Sàng"]
  },
  "Bệnh viện Hữu Nghị Việt Đức": {
    district: "Quận Hoàn Kiếm",
    address: "40 Tràng Thi, Phường Hàng Bông, Quận Hoàn Kiếm, Hà Nội",
    phone: "024 3825 3531",
    tier: "Tuyến Trung Ương",
    badge: "Bệnh Viện Hạng Đặc Biệt",
    type: "Ngoại Khoa & Phẫu Thuật Hàng Đầu",
    agency: "Bộ Y Tế",
    website: "http://benhvienvietduc.org",
    bedCapacity: "1.500+ giường bệnh",
    specialties: ["Phẫu Thuật Ghép Tạng (Tim, Gan, Thận, Phổi)", "Phẫu Thuật Thần Kinh & Cột Sống Vi Phẫu", "Chấn Thương Chỉnh Hình & Vi Phẫu Nối Chi", "Phẫu Thuật Tim Mạch & Lồng Ngực", "Cấp Cứu Đa Chấn Thương Tuyến Cuối"]
  },
  "Bệnh viện K": {
    district: "Huyện Thanh Trì",
    address: "30 Đường Cầu Bươu, Xã Tân Triều, Huyện Thanh Trì, Hà Nội (CS Tân Triều)",
    phone: "0904 748 808",
    tier: "Tuyến Trung Ương",
    badge: "Bệnh Viện Chuyên Khoa Hạng Đặc Biệt",
    type: "Ung Bướu & Xạ Trị Kỹ Thuật Cao",
    agency: "Bộ Y Tế",
    website: "http://benhvienk.vn",
    bedCapacity: "2.400+ giường bệnh",
    specialties: ["Phẫu Thuật Robot Điều Trị Ung Thư", "Xạ Trị Điều Biến Liều (IMRT/VMAT)", "Điều Trị Miễn Dịch & Liệu Pháp Trúng Đích", "Hóa Trị Phác Đồ Tiên Tiến", "Chăm Sóc Giảm Nhẹ Cho Bệnh Nhân Ung Thư"]
  },
  "Bệnh viện Lão Khoa Trung Ương": {
    district: "Quận Đống Đa",
    address: "1A Phương Mai, Phường Phương Mai, Quận Đống Đa, Hà Nội",
    phone: "024 3576 4558",
    tier: "Tuyến Trung Ương",
    badge: "Bệnh Viện Chuyên Khoa Tuyến Cuối",
    type: "Lão Khoa Toàn Diện",
    agency: "Bộ Y Tế",
    website: "http://benhvienlaokhoa.vn",
    bedCapacity: "500+ giường bệnh",
    specialties: ["Sa Sút Trí Tuệ & Bệnh Alzheimer", "Tim Mạch - Đột Quỵ Người Cao Tuổi", "Phục Hồi Chức Năng Người Già", "Xương Khớp & Loãng Xương", "Nội Tiết & Rối Loạn Chuyển Hóa"]
  },
  "Bệnh viện Mắt Trung Ương": {
    district: "Quận Hai Bà Trưng",
    address: "85 Phố Bà Triệu, Phường Nguyễn Du, Quận Hai Bà Trưng, Hà Nội",
    phone: "024 3826 3966",
    tier: "Tuyến Trung Ương",
    badge: "Bệnh Viện Chuyên Khoa Tuyến Cuối",
    type: "Nhãn Khoa Toàn Diện",
    agency: "Bộ Y Tế",
    website: "http://vnio.vn",
    bedCapacity: "600+ giường bệnh",
    specialties: ["Ghép Giác Mạc & Ngân Hàng Mắt", "Phẫu Thuật Phaco Đục Thủy Tinh Thể", "Phẫu Thuật Khúc Xạ Laser Kỹ Thuật Cao", "Dịch Kính - Võng Mạc & Đáy Mắt", "Nhãn Nhi & Tạo Hình Nhãn Cầu"]
  },
  "Bệnh viện Nhi Trung Ương": {
    district: "Quận Đống Đa",
    address: "18/879 Đường La Thành, Phường Láng Thượng, Quận Đống Đa, Hà Nội",
    phone: "024 6273 8532",
    tier: "Tuyến Trung Ương",
    badge: "Bệnh Viện Chuyên Khoa Hạng Đặc Biệt",
    type: "Nhi Khoa Toàn Diện",
    agency: "Bộ Y Tế",
    website: "http://benhviennhitrunguong.gov.vn",
    bedCapacity: "1.900+ giường bệnh",
    specialties: ["Ghép Gan & Ghép Thận Trẻ Em", "Phẫu Thuật Tim Bẩm Sinh Trẻ Sơ Sinh", "Hồi Sức Cấp Cứu Sơ Sinh (NICU)", "Ung Thư & Huyết Học Trẻ Em", "Bệnh Di Truyền & Rối Loạn Chuyển Hóa"]
  },
  "Bệnh viện Phổi Trung Ương": {
    district: "Quận Ba Đình",
    address: "463 Hoàng Hoa Thám, Phường Vĩnh Phúc, Quận Ba Đình, Hà Nội",
    phone: "024 3832 6249",
    tier: "Tuyến Trung Ương",
    badge: "Bệnh Viện Chuyên Khoa Tuyến Cuối",
    type: "Hô Hấp, Lao & Phổi",
    agency: "Bộ Y Tế",
    website: "http://benhvienphoitw.gov.vn",
    bedCapacity: "1.000+ giường bệnh",
    specialties: ["Ghép Phổi & Phẫu Thuật Lồng Ngực", "Điều Trị Lao Kháng Thuốc Siêu Chuẩn", "Hen Suyễn & Bệnh Phổi Tắc Nghẽn (COPD)", "Ung Thư Phổi & Nội Soi Phế Quản", "Can Thiệp Hô Hấp Kỹ Thuật Cao"]
  },
  "Bệnh viện Phụ Sản Trung Ương": {
    district: "Quận Hoàn Kiếm",
    address: "43 Tràng Thi, Phường Hàng Bông, Quận Hoàn Kiếm, Hà Nội",
    phone: "024 3825 2161",
    tier: "Tuyến Trung Ương",
    badge: "Bệnh Viện Chuyên Khoa Tuyến Cuối",
    type: "Sản Phụ Khoa & Sơ Sinh",
    agency: "Bộ Y Tế",
    website: "http://benhvienphusantrunguong.org.vn",
    bedCapacity: "1.000+ giường bệnh",
    specialties: ["Hỗ Trợ Sinh Sản & Thụ Tinh Trong Ống Nghiệm", "Chẩn Đoán Trước Sinh & Sàng Lọc Bào Thai", "Đỡ Đẻ An Toàn & Thai Kỳ Nguy Cơ Cao", "Phẫu Thuật Nội Soi Phụ Khoa", "Chăm Sóc Trẻ Sơ Sinh Non Tháng Cực Nhẹ"]
  },
  "Bệnh viện Răng Hàm Mặt Trung Ương Hà Nội": {
    district: "Quận Hoàn Kiếm",
    address: "40 Tràng Thi, Phường Hàng Bông, Quận Hoàn Kiếm, Hà Nội",
    phone: "024 3826 9722",
    tier: "Tuyến Trung Ương",
    badge: "Bệnh Viện Chuyên Khoa Tuyến Cuối",
    type: "Răng Hàm Mặt & Phẫu Thuật Hàm Mặt",
    agency: "Bộ Y Tế",
    website: "http://ranghammat.org.vn",
    bedCapacity: "350+ giường bệnh",
    specialties: ["Phẫu Thuật Chỉnh Hình Xương Hàm Mặt", "Cấy Ghép Implant Nha Khoa Toàn Diện", "Phẫu Thuật Dị Tật Khe Hở Môi - Vòm Miệng", "Nắn Chỉnh Răng Khúc Xạ Tiên Tiến", "Điều Trị Tủy & Răng Trẻ Em Không Đau"]
  },
  "Bệnh viện Tai Mũi Họng Trung Ương": {
    district: "Quận Đống Đa",
    address: "78 Giải Phóng, Phường Phương Mai, Quận Đống Đa, Hà Nội",
    phone: "024 3868 6350",
    tier: "Tuyến Trung Ương",
    badge: "Bệnh Viện Chuyên Khoa Tuyến Cuối",
    type: "Tai Mũi Họng & Phẫu Thuật Đầu Cổ",
    agency: "Bộ Y Tế",
    website: "http://noh.vn",
    bedCapacity: "450+ giường bệnh",
    specialties: ["Cấy Ốc Tai Điện Tử Phục Hồi Thính Lực", "Phẫu Thuật Nội Soi Mũi Xoang & Nền Sọ", "Phẫu Thuật Vi Phẫu Thanh Quản & Giọng Nói", "Phẫu Thuật Ung Thư Vùng Đầu - Cổ", "Cấp Cứu Dị Vật Đường Thở - Thực Quản"]
  },
  "Bệnh viện Tâm Thần Trung Ương 1": {
    district: "Huyện Thường Tín",
    address: "Thị trấn Thường Tín, Huyện Thường Tín, Hà Nội",
    phone: "024 3385 3227",
    tier: "Tuyến Trung Ương",
    badge: "Bệnh Viện Chuyên Khoa Tuyến Cuối",
    type: "Sức Khỏe Tâm Thần & Tâm Lý",
    agency: "Bộ Y Tế",
    website: "http://bvtttw1.gov.vn",
    bedCapacity: "700+ giường bệnh",
    specialties: ["Điều Trị Trầm Cảm & Rối Loạn Lo Âu", "Điều Trị Tâm Thần Phân Liệt Mạn Tính", "Cai Nghiện Rượu & Chất Kích Thích", "Tâm Thần Học Trẻ Em & Vị Thành Niên", "Tâm Lý Trị Liệu & Giám Định Pháp Y Tâm Thần"]
  },
  "Viện Huyết Học – Truyền Máu Trung Ương": {
    district: "Quận Cầu Giấy",
    address: "Phố Phạm Văn Bạch, Phường Yên Hòa, Quận Cầu Giấy, Hà Nội",
    phone: "024 3782 1895",
    tier: "Tuyến Trung Ương",
    badge: "Viện Chuyên Khoa Đầu Ngành",
    type: "Huyết Học & Ghép Tế Bào Gốc",
    agency: "Bộ Y Tế",
    website: "http://vienhuyethoc.vn",
    bedCapacity: "1.200+ giường bệnh",
    specialties: ["Ghép Tế Bào Gốc Đồng Loài & Tự Thân", "Điều Trị Ung Thư Máu (Bạch Cầu Cấp)", "Điều Trị Bệnh Tan Máu Bẩm Sinh (Thalassemia)", "Sản Xuất Chế Phẩm Máu Chuẩn Quốc Gia", "Ngân Hàng Tế Bào Gốc Máu Cuống Rốn"]
  },
  "Bệnh viện E": {
    district: "Quận Cầu Giấy",
    address: "87-89 Phố Trần Cung, Phường Nghĩa Tân, Quận Cầu Giấy, Hà Nội",
    phone: "024 3754 3650",
    tier: "Tuyến Trung Ương",
    badge: "Bệnh Viện Đa Khoa Hạng 1",
    type: "Đa Khoa Toàn Diện & Tim Mạch",
    agency: "Bộ Y Tế",
    website: "http://benhvien-e.com",
    bedCapacity: "1.000+ giường bệnh",
    specialties: ["Trung Tâm Tim Mạch Kỹ Thuật Cao", "Phẫu Thuật Nội Soi Tiêu Hóa - Gan Mật", "Cơ Xương Khớp & Thay Khớp Nhân Tạo", "Ung Bướu & Xạ Trị", "Cấp Cứu Đa Khoa 24/7"]
  },
  "Bệnh viện Hữu Nghị Việt Xô": {
    district: "Quận Hai Bà Trưng",
    address: "Số 1 Trần Khánh Dư, Phường Bạch Đằng, Quận Hai Bà Trưng, Hà Nội",
    phone: "024 3972 2231",
    tier: "Tuyến Trung Ương",
    badge: "Bệnh Viện Đa Khoa Hạng 1",
    type: "Đa Khoa & Chăm Sóc Cán Bộ",
    agency: "Bộ Y Tế",
    website: "http://huunghi.vn",
    bedCapacity: "700+ giường bệnh",
    specialties: ["Chăm Sóc Sức Khỏe Cán Bộ Trung Cao Cấp", "Tim Mạch Can Thiệp Chuyên Sâu", "Lão Khoa & Hồi Sức Tích Cực", "Nội Tiết & Tiểu Đường", "Ngoại Tiết Niệu & Tán Sỏi Laser"]
  },
  "Bệnh viện Nội Tiết Trung ương": {
    district: "Huyện Thanh Trì",
    address: "Đường Tứ Hiệp, Xã Tứ Hiệp, Huyện Thanh Trì, Hà Nội (CS Tứ Hiệp)",
    phone: "024 3853 3527",
    tier: "Tuyến Trung Ương",
    badge: "Bệnh Viện Chuyên Khoa Tuyến Cuối",
    type: "Nội Tiết & Đái Tháo Đường",
    agency: "Bộ Y Tế",
    website: "http://benhviennoitiet.vn",
    bedCapacity: "1.100+ giường bệnh",
    specialties: ["Phẫu Thuật Tuyến Giáp Nội Soi (Kỹ Thuật Dr. Lương)", "Điều Trị Bệnh Đái Tháo Đường Chuyên Sâu", "Chăm Sóc & Cứu Bàn Chân Tiểu Đường", "Bệnh Tuyến Yên & Tuyến Thượng Thận", "Rối Loạn Chuyển Hóa & Béo Phì"]
  },
  "Bệnh viện Y Học Cổ Truyền Trung Ương": {
    district: "Quận Hai Bà Trưng",
    address: "29 Nguyễn Bỉnh Khiêm, Phường Nguyễn Du, Quận Hai Bà Trưng, Hà Nội",
    phone: "024 3826 3616",
    tier: "Tuyến Trung Ương",
    badge: "Bệnh Viện Chuyên Khoa Tuyến Cuối",
    type: "Y Học Cổ Truyền Đầu Ngành",
    agency: "Bộ Y Tế",
    website: "http://nhtm.gov.vn",
    bedCapacity: "600+ giường bệnh",
    specialties: ["Kết Hợp Đông Tây Y Điều Trị Đột Quỵ", "Châm Cứu, Xoa Bóp Bấm Huyệt Trị Liệu", "Cơ Xương Khớp & Thoát Vị Đĩa Đệm", "Bào Chế Thuốc YHCT Đạt Chuẩn GMP", "Dưỡng Sinh & Phục Hồi Chức Năng"]
  },
  "Bệnh viện 103 (Học viện Quân y)": {
    district: "Quận Hà Đông",
    address: "261 Phùng Hưng, Phường Phúc La, Quận Hà Đông, Hà Nội",
    phone: "024 3311 5689",
    tier: "Tuyến Trung Ương",
    badge: "Bệnh Viện Đa Khoa Hạng Đặc Biệt",
    type: "Đa Khoa Quân Y & Viện Trường",
    agency: "Bộ Quốc Phòng - Học Viện Quân Y",
    website: "http://benhvien103.vn",
    bedCapacity: "1.200+ giường bệnh",
    specialties: ["Ghép Tạng (Thận, Gan, Tim, Phổi)", "Ngoại Thần Kinh & Cột Sống", "Tim Mạch Can Thiệp Cấp Cứu", "Hồi Sức Cấp Cứu Quân Dân Y", "Khớp & Chấn Thương Chỉnh Hình"]
  },
  "Bệnh viện 198 (Bộ Công An)": {
    district: "Quận Cầu Giấy",
    address: "Số 9 Trần Bình, Phường Mai Dịch, Quận Cầu Giấy, Hà Nội",
    phone: "024 3768 4473",
    tier: "Tuyến Trung Ương",
    badge: "Bệnh Viện Hạng 1 Lực Lượng CAND",
    type: "Đa Khoa Quân - Dân Y",
    agency: "Bộ Công An",
    website: "http://benhvien198.net",
    bedCapacity: "700+ giường bệnh",
    specialties: ["Ngoại Chấn Thương & Cấp Cứu 24/7", "Nội Tim Mạch & Đột Quỵ", "Ngoại Phẫu Thuật Nội Soi Tiêu Hóa", "Phục Hồi Chức Năng & Y Học Thể Thao", "Khám BHYT Toàn Dân Không Giới Hạn Tuyến"]
  },
  "Bệnh viện Bưu Điện": {
    district: "Quận Hoàng Mai",
    address: "Số 49 Phố Trần Điền, Phường Định Công, Quận Hoàng Mai, Hà Nội",
    phone: "024 3864 9837",
    tier: "Tuyến Trung Ương",
    badge: "Bệnh Viện Hạng 1 Bộ Ngành",
    type: "Đa Khoa & Hỗ Trợ Sinh Sản",
    agency: "Bộ Thông Tin & Truyền Thông / VNPT",
    website: "http://buudienhospital.vn",
    bedCapacity: "600+ giường bệnh",
    specialties: ["Trung Tâm Hỗ Trợ Sinh Sản (IVF Bưu Điện) Tỷ Lệ Cao", "Ngoại Tiết Niệu & Tán Sỏi Thận Laser", "Sản Phụ Khoa & Chăm Sóc Thai Kỳ Trọn Gói", "Phẫu Thuật Nội Soi Tiêu Hóa", "Khám Sức Khỏe Cơ Quan & Doanh Nghiệp"]
  },
  "Bệnh viện Nông Nghiệp": {
    district: "Huyện Thanh Trì",
    address: "Km13+500 Quốc lộ 1A, Xã Ngọc Hồi, Huyện Thanh Trì, Hà Nội",
    phone: "024 3861 5320",
    tier: "Tuyến Trung Ương",
    badge: "Bệnh Viện Đa Khoa Hạng 1",
    type: "Đa Khoa Hoàn Chỉnh Cửa Ngõ",
    agency: "Bộ Nông Nghiệp & PTNT",
    website: "http://benhviennongnghiep.vn",
    bedCapacity: "750+ giường bệnh",
    specialties: ["Cấp Cứu Ngoại Khoa Cửa Ngõ Phía Nam", "Tim Mạch Can Thiệp Mạch Vành", "Sản Nhi Toàn Diện", "Chấn Thương Chỉnh Hình & Thay Khớp", "Nội Tiết & Bệnh Chuyển Hóa"]
  },
  "Viện Bỏng Quốc gia": {
    district: "Quận Hà Đông",
    address: "263 Phùng Hưng, Phường Phúc La, Quận Hà Đông, Hà Nội",
    phone: "024 3688 4571",
    tier: "Tuyến Trung Ương",
    badge: "Viện Chuyên Khoa Tuyến Cuối",
    type: "Bỏng & Liền Vết Thương, Tạo Hình",
    agency: "Bộ Quốc Phòng - Học Viện Quân Y",
    website: "http://vienbongquocgia.vn",
    bedCapacity: "400+ giường bệnh",
    specialties: ["Hồi Sức Cấp Cứu Bỏng Nặng Toàn Thân", "Phẫu Thuật Tạo Hình Thẩm Mỹ Di Chứng Bỏng", "Ứng Dụng Tế Bào Gốc Liền Vết Thương Mạn Tính", "Điều Trị Loét Tỳ Đè & Bàn Chân Tiểu Đường", "Vi Phẫu Tái Tạo Da & Vạt Cơ"]
  },
  "Bệnh viện TƯ Quân đội 108": {
    district: "Quận Hai Bà Trưng",
    address: "Số 1 Trần Hưng Đạo, Phường Bạch Đằng, Quận Hai Bà Trưng, Hà Nội",
    phone: "024 6278 4108",
    tier: "Tuyến Trung Ương",
    badge: "Bệnh Viện Hạng Đặc Biệt Quốc Gia",
    type: "Đa Khoa Chuyên Sâu Quân Đội",
    agency: "Bộ Quốc Phòng",
    website: "http://benhvien108.vn",
    bedCapacity: "2.000+ giường bệnh",
    specialties: ["Ghép Tạng (Ghép Gan, Thận, Phổi, Tủy)", "Phẫu Thuật Thần Kinh, Sọ Não & Cột Sống", "Tim Mạch Can Thiệp & Phẫu Thuật Tim Kỹ Thuật Cao", "Vi Phẫu Tái Tạo Chi Thể Đứt Rời", "Trung Tâm Đột Quỵ Chuẩn Kim Cương WSO"]
  },
  "Viện Y học cổ truyền Quân đội": {
    district: "Quận Thanh Xuân",
    address: "442 Kim Giang, Phường Đại Kim, Quận Hoàng Mai, Hà Nội",
    phone: "024 3858 3135",
    tier: "Tuyến Trung Ương",
    badge: "Bệnh Viện Hạng 1 Quân Đội",
    type: "Y Học Cổ Truyền Quân Đội",
    agency: "Bộ Quốc Phòng",
    website: "http://yhoccotruyenqd.vn",
    bedCapacity: "500+ giường bệnh",
    specialties: ["Kết Hợp Đông Tây Y Điều Trị Bệnh Hiểm Nghèo", "Chế Phẩm Thuốc Đông Y Quân Đội Độc Quyền", "Cơ Xương Khớp & Thoát Vị Cột Sống", "Châm Cứu Phục Hồi Liệt Tai Biến", "Nội Khoa Dưỡng Sinh Chuyên Sâu"]
  },
  "Bệnh viện 354 (Tổng cục Hậu cần)": {
    district: "Quận Ba Đình",
    address: "120 Đốc Ngữ, Phường Vĩnh Phúc, Quận Ba Đình, Hà Nội",
    phone: "024 3762 2595",
    tier: "Tuyến Trung Ương",
    badge: "Bệnh Viện Hạng 1 Quân Đội",
    type: "Đa Khoa Quân - Dân Y",
    agency: "Bộ Quốc Phòng - Tổng Cục Hậu Cần",
    website: "http://benhvien354.vn",
    bedCapacity: "400+ giường bệnh",
    specialties: ["Cấp Cứu & Ngoại Khoa Tổng Hợp", "Nội Tiêu Hóa & Bài Thuốc Dạ Dày Bình Vị", "Nội Tim Mạch & Hô Hấp", "Sản Phụ Khoa Thân Thiện", "Khám BHYT Toàn Dân Thuận Tiện"]
  },
  "Bệnh viện 105 Sơn Tây (Tổng cục Hậu cần)": {
    district: "Thị xã Sơn Tây",
    address: "Số 1 Đường Chùa Thông, Phường Sơn Lộc, Thị xã Sơn Tây, Hà Nội",
    phone: "024 3383 2341",
    tier: "Tuyến Trung Ương",
    badge: "Bệnh Viện Hạng 1 Quân Đội",
    type: "Đa Khoa Vùng Tây Bắc Thủ Đô",
    agency: "Bộ Quốc Phòng - Tổng Cục Hậu Cần",
    website: "http://benhvienquany105.vn",
    bedCapacity: "600+ giường bệnh",
    specialties: ["Cấp Cứu Chấn Thương Vùng Xứ Đoài", "Ngoại Thần Kinh & Chấn Thương Sọ Não", "Can Thiệp Tim Mạch & Đột Quỵ", "Ngoại Tiết Niệu & Tán Sỏi", "Chạy Thận Nhân Tạo Kỹ Thuật Cao"]
  },
  "Viện Y học Phóng xạ và U bướu Quân đội": {
    district: "Quận Định Công, Hoàng Mai",
    address: "Số 18 Định Công Thượng, Phường Định Công, Quận Hoàng Mai, Hà Nội",
    phone: "024 3855 2439",
    tier: "Tuyến Trung Ương",
    badge: "Viện Chuyên Khoa Quân Đội",
    type: "Y Học Phóng Xạ & Ung Bướu",
    agency: "Bộ Quốc Phòng",
    website: "http://yhocphongxa.vn",
    bedCapacity: "250+ giường bệnh",
    specialties: ["Ứng Dụng Đồng Vị Phóng Xạ Chẩn Đoán & Điều Trị", "Xạ Trị & Hóa Trị Ung Thư Kỹ Thuật Cao", "Điều Trị Bệnh Tuyến Giáp Bằng I-131", "Ung Bướu Đầu Cổ & Tiêu Hóa", "An Toàn Bức Xạ & Y Học Hạt Nhân"]
  },
  "Viện Y học hàng không": {
    district: "Quận Đống Đa",
    address: "225 Trường Chinh, Phường Khương Mai, Quận Thanh Xuân, Hà Nội",
    phone: "024 3853 4304",
    tier: "Tuyến Trung Ương",
    badge: "Viện Chuyên Ngành Quân Chủng PK-KQ",
    type: "Y Học Hàng Không & Đa Khoa",
    agency: "Bộ Quốc Phòng - Quân Chủng PK-KQ",
    website: "http://yhochangkong.vn",
    bedCapacity: "350+ giường bệnh",
    specialties: ["Giám Định Sức Khỏe Phi Công & Tiếp Viên Hàng Không", "Thử Nghiệm Sinh Lý Trong Buồng Giảm Áp", "Cấp Cứu Ngoại Khoa & Tim Mạch", "Tai Mũi Họng - Tiền Đình Hàng Không", "Khám BHYT Toàn Dân Chất Lượng Cao"]
  },
  "Bệnh viện Thể thao (Tổng cục TDTT)": {
    district: "Quận Nam Từ Liêm",
    address: "Đường Đỗ Đức Dục, Phường Mễ Trì, Quận Nam Từ Liêm, Hà Nội",
    phone: "024 3785 5154",
    tier: "Tuyến Trung Ương",
    badge: "Bệnh Viện Chuyên Ngành Đầu Ngành",
    type: "Y Học Thể Thao & Chấn Thương",
    agency: "Cục Thể Dục Thể Thao / Bộ VHTTDL",
    website: "http://benhvienthethao.vn",
    bedCapacity: "250+ giường bệnh",
    specialties: ["Phẫu Thuật Nội Soi Tái Tạo Dây Chằng Khớp Gối", "Điều Trị Chấn Thương Thể Thao Vận Động Viên", "Phục Hồi Chức Năng Vận Động Chuyên Biệt", "Liệu Pháp Tiêm Huyết Tương Giàu Tiểu Cầu (PRP)", "Dinh Dưỡng Thể Thao & Kiểm Tra Y Sinh Học"]
  },
  "Bệnh viện Đại học Y Hà Nội": {
    district: "Quận Đống Đa",
    address: "Số 1 Tôn Thất Tùng, Phường Trung Tự, Quận Đống Đa, Hà Nội",
    phone: "1900 6422",
    tier: "Tuyến Trung Ương",
    badge: "Bệnh Viện Đại Học Y Khoa Hàng Đầu",
    type: "Đa Khoa Kỹ Thuật Cao & Viện Trường",
    agency: "Trường Đại Học Y Hà Nội / Bộ Y Tế",
    website: "http://benhviendaihocyhanoi.com",
    bedCapacity: "800+ giường bệnh",
    specialties: ["Can Thiệp Tim Mạch & Mạch Máu Não", "Phẫu Thuật Nội Soi Ít Xâm Lấn Kỹ Thuật Cao", "Nội Soi Tiêu Hóa Can Thiệp Không Đau", "Nam Khoa & Y Học Giới Tính Đầu Ngành", "Trung Tâm Khám Chuyên Gia Giáo Sư"]
  },
  "Bệnh viện Đại học Quốc gia Hà Nội": {
    district: "Quận Cầu Giấy",
    address: "182 Lương Thế Vinh, Phường Thanh Xuân Bắc, Quận Thanh Xuân, Hà Nội",
    phone: "024 3554 4833",
    tier: "Tuyến Trung Ương",
    badge: "Bệnh Viện Đại Học Đa Ngành",
    type: "Đa Khoa & Thực Hành Y Khoa",
    agency: "Đại Học Quốc Gia Hà Nội",
    website: "http://hospital.vnu.edu.vn",
    bedCapacity: "200+ giường bệnh",
    specialties: ["Khám Sức Khỏe Học Đường & Cán Bộ ĐHQG", "Nội Khoa & Y Học Gia Đình", "Khám & Điều Trị BHYT Ban Đầu", "Răng Hàm Mặt - Mắt - Tai Mũi Họng", "Xét Nghiệm Tầm Soát Sức Khỏe Toàn Diện"]
  },
  "Bệnh viện Giao Thông Vận Tải": {
    district: "Quận Đống Đa",
    address: "Ngõ 84 Phố Chùa Láng, Phường Láng Thượng, Quận Đống Đa, Hà Nội",
    phone: "024 3766 5824",
    tier: "Tuyến Trung Ương",
    badge: "Bệnh Viện Hạng 1 Bộ Ngành",
    type: "Đa Khoa Toàn Diện",
    agency: "Cục Y Tế GTVT / Bộ GTVT",
    website: "http://giaothonghospital.vn",
    bedCapacity: "500+ giường bệnh",
    specialties: ["Khám Sức Khỏe Lái Xe Toàn Diện", "Can Thiệp Tim Mạch & Hồi Sức Cấp Cứu", "Chấn Thương Chỉnh Hình & Thay Khớp", "Phẫu Thuật Nội Soi Tiết Niệu", "Phục Hồi Chức Năng Bệnh Nghề Nghiệp"]
  },
  "Bệnh viện Xây dựng": {
    district: "Quận Thanh Xuân",
    address: "Phố Nguyễn Quý Đức, Phường Thanh Xuân Bắc, Quận Thanh Xuân, Hà Nội",
    phone: "024 3854 2278",
    tier: "Tuyến Trung Ương",
    badge: "Bệnh Viện Hạng 1 Bộ Ngành",
    type: "Đa Khoa & Bệnh Nghề Nghiệp",
    agency: "Bộ Xây Dựng",
    website: "http://bvxd.vn",
    bedCapacity: "450+ giường bệnh",
    specialties: ["Khám Sức Khỏe Ngành Xây Dựng & Doanh Nghiệp", "Ngoại Chấn Thương & Cấp Cứu Tai Nạn Lao Động", "Nội Khoa Toàn Diện & Tiểu Đường", "Phục Hồi Chức Năng & Vật Lý Trị Liệu", "Khám BHYT Toàn Dân Thuận Lợi"]
  },
  "Bệnh viện Y học Cổ Truyền Bộ Công An": {
    district: "Quận Nam Từ Liêm",
    address: "Số 278 Lương Thế Vinh, Phường Trung Văn, Quận Nam Từ Liêm, Hà Nội",
    phone: "024 3854 4455",
    tier: "Tuyến Trung Ương",
    badge: "Bệnh Viện Hạng 1 Lực Lượng CAND",
    type: "Y Học Cổ Truyền & Kết Hợp Hiện Đại",
    agency: "Bộ Công An",
    website: "http://yhoccotruyenbca.vn",
    bedCapacity: "400+ giường bệnh",
    specialties: ["Kết Hợp Đông Tây Y Nhuần Nhuyễn", "Châm Cứu & Trị Liệu Đau Thần Kinh Cột Sống", "Bào Chế Thuốc YHCT Tiêu Chuẩn Cao", "Phục Hồi Chức Năng Đột Quỵ", "Nội Khoa Tim Mạch - Chuyển Hóa"]
  },

  // Tuyến 2: Thành Phố / Sở Y Tế Hà Nội
  "Bệnh viện Đa Khoa Xanh Pôn": {
    district: "Quận Ba Đình",
    address: "Số 12 Chu Văn An, Phường Điện Biên, Quận Ba Đình, Hà Nội",
    phone: "1900 6155",
    tier: "Tuyến Tỉnh / Thành Phố",
    badge: "Bệnh Viện Đa Khoa Hạng 1 Tuyến Cuối Hà Nội",
    type: "Đa Khoa Hoàn Chỉnh & Kỹ Thuật Cao",
    agency: "Sở Y Tế Hà Nội",
    website: "http://bvxanhpon.vn",
    bedCapacity: "850+ giường bệnh",
    specialties: ["Trung Tâm Kỹ Thuật Cao & Tiêu Hóa Hà Nội", "Phẫu Thuật Tạo Hình & Vi Phẫu Tái Tạo", "Phẫu Thuật Nội Soi Nhi Khoa Hàng Đầu", "Chấn Thương Chỉnh Hình Cấp Cứu", "Nội Soi Tiêu Hóa Chuẩn Châu Âu"]
  },
  "Bệnh viện Thanh Nhàn": {
    district: "Quận Hai Bà Trưng",
    address: "Số 42 Thanh Nhàn, Phường Thanh Nhàn, Quận Hai Bà Trưng, Hà Nội",
    phone: "024 3971 4363",
    tier: "Tuyến Tỉnh / Thành Phố",
    badge: "Bệnh Viện Đa Khoa Hạng 1 Tuyến Đầu Hà Nội",
    type: "Đa Khoa Toàn Diện Kỹ Thuật Cao",
    agency: "Sở Y Tế Hà Nội",
    website: "http://thanhnhanhospital.vn",
    bedCapacity: "1.200+ giường thực kê",
    specialties: ["Trung Tâm Tim Mạch & Đột Quỵ Cấp Cứu", "Hồi Sức Tích Cực & Chống Độc", "Nội Hô Hấp & Thận Tiết Niệu", "Ung Bướu & Hóa Xạ Trị", "Phẫu Thuật Nội Soi Ổ Bụng Kỹ Thuật Cao"]
  },
  "Bệnh viện Phụ Sản Hà Nội": {
    district: "Quận Ba Đình",
    address: "929 Đường La Thành, Phường Ngọc Khánh, Quận Ba Đình, Hà Nội",
    phone: "1900 6922",
    tier: "Tuyến Tỉnh / Thành Phố",
    badge: "Bệnh Viện Chuyên Khoa Hạng 1 Hàng Đầu",
    type: "Sản Phụ Khoa & Hỗ Trợ Sinh Sản",
    agency: "Sở Y Tế Hà Nội",
    website: "http://benhvienphusanhanoi.vn",
    bedCapacity: "900+ giường bệnh",
    specialties: ["Can Thiệp Y Học Bào Thai Tiên Phong Cả Nước", "Sàng Lọc Di Truyền & Chẩn Đoán Trước Sinh", "Hỗ Trợ Sinh Sản & Thụ Tinh Ống Nghiệm (IVF)", "Đỡ Đẻ Dịch Vụ Không Đau & Thai Nguy Cơ Cao", "Hồi Sức Sơ Sinh Đạt Chuẩn Quốc Tế"]
  },
  "Bệnh viện Tim Hà Nội": {
    district: "Quận Hoàn Kiếm",
    address: "92 Trần Hưng Đạo, Phường Cửa Nam, Quận Hoàn Kiếm, Hà Nội (CS1)",
    phone: "024 3942 2430",
    tier: "Tuyến Tỉnh / Thành Phố",
    badge: "Bệnh Viện Chuyên Khoa Tuyến Cuối Cả Nước",
    type: "Tim Mạch Chuyên Sâu Hoàn Chỉnh",
    agency: "Sở Y Tế Hà Nội",
    website: "http://benhvientimhanoi.vn",
    bedCapacity: "600+ giường bệnh",
    specialties: ["Phẫu Thuật Tim Hở Trẻ Em & Người Lớn", "Can Thiệp Tim Mạch & Đặt Stent Mạch Vành Cấp Cứu", "Can Thiệp Bệnh Tim Bẩm Sinh Không Cần Mổ", "Cấy Máy Tạo Nhịp & Phá Rung Tự Động", "Hồi Sức Tim Mạch Chuyên Biệt"]
  },
  "Bệnh viện Ung Bướu Hà Nội": {
    district: "Quận Hai Bà Trưng",
    address: "42A Thanh Nhàn, Phường Thanh Nhàn, Quận Hai Bà Trưng, Hà Nội",
    phone: "0966 681 313",
    tier: "Tuyến Tỉnh / Thành Phố",
    badge: "Bệnh Viện Chuyên Khoa Tuyến Cuối",
    type: "Ung Bướu Chuyên Sâu Toàn Diện",
    agency: "Sở Y Tế Hà Nội",
    website: "http://ubhn.vn",
    bedCapacity: "650+ giường bệnh",
    specialties: ["Phẫu Thuật Triệt Căn Ung Bướu", "Xạ Trị Gia Tốc Kỹ Thuật Cao (VMAT/IGRT)", "Hóa Trị Phác Đồ Mới & Liệu Pháp Miễn Dịch", "Tầm Soát Phát Hiện Sớm Ung Thư Đa Cơ Quan", "Chăm Sóc Giảm Nhẹ & Điều Trị Đau Ung Thư"]
  },
  "Bệnh viện Đa Khoa Đức Giang": {
    district: "Quận Long Biên",
    address: "54 Phố Trường Lâm, Phường Đức Giang, Quận Long Biên, Hà Nội",
    phone: "024 3827 1222",
    tier: "Tuyến Tỉnh / Thành Phố",
    badge: "Bệnh Viện Đa Khoa Hạng 1 Cửa Ngõ Phía Đông",
    type: "Đa Khoa Hoàn Chỉnh",
    agency: "Sở Y Tế Hà Nội",
    website: "http://benhvienducgiang-hn.gov.vn",
    bedCapacity: "1.000+ giường bệnh",
    specialties: ["Can Thiệp Tim Mạch & Đột Quỵ Phía Đông", "Phẫu Thuật Ngoại Khoa & Tiết Niệu Tán Sỏi", "Hồi Sức Tích Cực Hiện Đại", "Sản Phụ Khoa & Nhi Khoa", "Chạy Thận Nhân Tạo Quy Mô Lớn"]
  },
  "Bệnh viện Đa khoa Hà Đông": {
    district: "Quận Hà Đông",
    address: "Số 2 Bông Đỏ, Phường Quang Trung, Quận Hà Đông, Hà Nội",
    phone: "024 3382 4216",
    tier: "Tuyến Tỉnh / Thành Phố",
    badge: "Bệnh Viện Đa Khoa Hạng 1 Cửa Ngõ Phía Tây",
    type: "Đa Khoa Hoàn Chỉnh",
    agency: "Sở Y Tế Hà Nội",
    website: "http://benhvienhadong.vn",
    bedCapacity: "850+ giường bệnh",
    specialties: ["Cấp Cứu Ngoại Khoa & Chấn Thương", "Can Thiệp Mạch Vành Cấp Cứu", "Phẫu Thuật Nội Soi Ổ Bụng", "Nội Khoa - Tim Mạch - Tiểu Đường", "Sản Phụ Khoa Tuyến Đầu Phía Tây Nam"]
  },
  "Bệnh viện Đa Khoa Đống Đa": {
    district: "Quận Đống Đa",
    address: "Ngõ 180 Nguyễn Lương Bằng, Phường Quang Trung, Quận Đống Đa, Hà Nội",
    phone: "024 3511 5074",
    tier: "Tuyến Tỉnh / Thành Phố",
    badge: "Bệnh Viện Đa Khoa Hạng 1",
    type: "Đa Khoa & Truyền Nhiễm",
    agency: "Sở Y Tế Hà Nội",
    website: "http://benhviendongda.vn",
    bedCapacity: "450+ giường bệnh",
    specialties: ["Chuyên Khoa Đầu Ngành Truyền Nhiễm Hà Nội", "Cấp Cứu Sốt Xuất Huyết & Viêm Gan", "Nội Khoa - Tim Mạch - Lão Khoa", "Phẫu Thuật Ngoại Khoa Tiêu Hóa", "Khám & Điều Trị BHYT Ban Đầu"]
  },
  "Bệnh viện Mắt Hà Nội": {
    district: "Quận Hoàn Kiếm",
    address: "37 Hai Bà Trưng, Phường Tràng Tiền, Quận Hoàn Kiếm, Hà Nội",
    phone: "024 3825 2588",
    tier: "Tuyến Tỉnh / Thành Phố",
    badge: "Bệnh Viện Chuyên Khoa Hạng 2",
    type: "Nhãn Khoa Chuyên Sâu",
    agency: "Sở Y Tế Hà Nội",
    website: "http://mathanoi.gov.vn",
    bedCapacity: "200+ giường bệnh",
    specialties: ["Phẫu Thuật Phaco Đục Thủy Tinh Thể", "Phẫu Thuật Khúc Xạ Lasik - Femto", "Khúc Xạ Học Đường & Đo Thị Lực", "Bệnh Lý Glôcôm & Đáy Mắt", "Tạo Hình Thẩm Mỹ Mi Mắt"]
  },
  "Bệnh viện Da Liễu Hà Nội": {
    district: "Quận Hoàn Kiếm",
    address: "79B Nguyễn Khuyến, Phường Văn Miếu, Quận Đống Đa, Hà Nội",
    phone: "0903 479 619",
    tier: "Tuyến Tỉnh / Thành Phố",
    badge: "Bệnh Viện Chuyên Khoa Hạng 1",
    type: "Da Liễu & Thẩm Mỹ Da",
    agency: "Sở Y Tế Hà Nội",
    website: "http://benhviendalieuhanoi.vn",
    bedCapacity: "250+ giường bệnh",
    specialties: ["Điều Trị Mụn Trứng Cá, Nám Da & Thẩm Mỹ", "Laser Điều Trị Sẹo & Trẻ Hóa Da", "Bệnh Da Tự Miễn (Lupus, Vảy Nến)", "Bệnh Lây Qua Đường Tình Dục", "Chăm Sóc & Phục Hồi Da Hư Tổn"]
  },
  "Bệnh viện Thận Hà Nội": {
    district: "Quận Đống Đa",
    address: "70 Nguyễn Chí Thanh, Phường Láng Thượng, Quận Đống Đa, Hà Nội",
    phone: "024 3773 2261",
    tier: "Tuyến Tỉnh / Thành Phố",
    badge: "Bệnh Viện Chuyên Khoa Hạng 2",
    type: "Thận & Lọc Máu Nhân Tạo",
    agency: "Sở Y Tế Hà Nội",
    website: "http://benhvienthanhanoi.vn",
    bedCapacity: "250+ giường bệnh",
    specialties: ["Trung Tâm Lọc Máu Thận Nhân Tạo Quy Mô Lớn", "Điều Trị Suy Thận Mạn & Suy Thận Cấp", "Nội Thận & Viêm Cầu Thận", "Chuẩn Bị Bệnh Nhân Ghép Thận", "Lọc Màng Bụng Thẩm Phân Phúc Mạc"]
  },
  "Bệnh viện Tâm Thần Hà Nội": {
    district: "Quận Long Biên",
    address: "Ngõ 467 Nguyễn Văn Linh, Phường Sài Đồng, Quận Long Biên, Hà Nội",
    phone: "024 3875 9294",
    tier: "Tuyến Tỉnh / Thành Phố",
    badge: "Bệnh Viện Chuyên Khoa Hạng 1",
    type: "Sức Khỏe Tâm Thần & Tâm Lý",
    agency: "Sở Y Tế Hà Nội",
    website: "http://benhvientamthanhanoi.com",
    bedCapacity: "550+ giường bệnh",
    specialties: ["Điều Trị Rối Loạn Giấc Ngủ & Trầm Cảm", "Rối Loạn Lo Âu & Stress Kéo Dài", "Tâm Thần Phân Liệt & Loạn Thần Rượu", "Tâm Lý Trị Liệu Trẻ Em Chậm Phát Triển", "Điều Trị Nghiện Game & Không Gian Ảo"]
  },
  "Bệnh viện Hòe Nhai": {
    district: "Quận Ba Đình",
    address: "17 Phố Hòe Nhai, Phường Nguyễn Trung Trực, Quận Ba Đình, Hà Nội",
    phone: "024 3927 2980",
    tier: "Tuyến Tỉnh / Thành Phố",
    badge: "Bệnh Viện Đa Khoa Hạng 2",
    type: "Đa Khoa & Thận Nhân Tạo",
    agency: "Sở Y Tế Hà Nội",
    website: "http://benhvienhoenhai.vn",
    bedCapacity: "250+ giường bệnh",
    specialties: ["Trung Tâm Thận Nhân Tạo Uy Tín Trung Tâm Thủ Đô", "Nội Khoa - Tim Mạch - Lão Khoa", "Ngoại Khoa & Phẫu Thuật Nội Soi", "Y Học Cổ Truyền & Phục Hồi Chức Năng", "Khám BHYT Cho Người Cao Tuổi Ba Đình"]
  },
  "Bệnh viện Bắc Thăng Long": {
    district: "Huyện Đông Anh",
    address: "Tổ 18 Thị trấn Đông Anh, Huyện Đông Anh, Hà Nội",
    phone: "024 3883 2341",
    tier: "Tuyến Tỉnh / Thành Phố",
    badge: "Bệnh Viện Đa Khoa Hạng 1 Phía Bắc",
    type: "Đa Khoa Hoàn Chỉnh",
    agency: "Sở Y Tế Hà Nội",
    website: "http://benhvienbacthanglong.org",
    bedCapacity: "600+ giường bệnh",
    specialties: ["Cấp Cứu Ngoại Khoa & Chấn Thương Công Nghiệp", "Nội Khoa Toàn Diện & Hồi Sức Tích Cực", "Sản Phụ Khoa & Chăm Sóc Sơ Sinh", "Chạy Thận Nhân Tạo", "Khám Sức Khỏe Công Nhân KCN Thăng Long"]
  },
  "Bệnh viện Nam Thăng Long": {
    district: "Quận Bắc Từ Liêm",
    address: "Số 39 Phố Tân Xuân, Phường Xuân Đỉnh, Quận Bắc Từ Liêm, Hà Nội",
    phone: "024 3757 0500",
    tier: "Tuyến Tỉnh / Thành Phố",
    badge: "Bệnh Viện Đa Khoa Hạng 2",
    type: "Đa Khoa Toàn Diện",
    agency: "Sở Y Tế Hà Nội",
    website: "http://benhviennamthanglong.org.vn",
    bedCapacity: "300+ giường bệnh",
    specialties: ["Cấp Cứu Đa Khoa 24/7", "Ngoại Tổng Quát & Chấn Thương", "Sản - Phụ Khoa & Đỡ Đẻ", "Nội Tim Mạch & Bệnh Chuyển Hóa", "Khám BHYT Toàn Dân Thuận Tiện"]
  },
  "Bệnh viện Hữu Nghị Việt Nam Cuba": {
    district: "Quận Hoàn Kiếm",
    address: "37 Hai Bà Trưng, Phường Tràng Tiền, Quận Hoàn Kiếm, Hà Nội",
    phone: "024 3825 3307",
    tier: "Tuyến Tỉnh / Thành Phố",
    badge: "Bệnh Viện Chuyên Khoa Hạng 2",
    type: "Răng Hàm Mặt & Tai Mũi Họng",
    agency: "Sở Y Tế Hà Nội",
    website: "http://vietnamcuba.vn",
    bedCapacity: "250+ giường bệnh",
    specialties: ["Phẫu Thuật Tạo Hình Khe Hở Môi Vòm Miệng", "Răng Hàm Mặt Kỹ Thuật Cao & Implant", "Tai Mũi Họng & Phẫu Thuật Nội Soi Xoang", "Phẫu Thuật Thẩm Mỹ Hàm Mặt", "Nha Khoa Trẻ Em Thân Thiện"]
  },

  // Tuyến Tư Nhân & Quốc Tế Lớn Hà Nội
  "Bệnh viện đa khoa quốc tế Vinmec Time City": {
    district: "Quận Hai Bà Trưng",
    address: "458 Minh Khai, Phường Vĩnh Tuy, Quận Hai Bà Trưng, Hà Nội",
    phone: "024 3974 3556",
    tier: "Tư Nhân / Quốc Tế",
    badge: "Bệnh Viện Đạt Chuẩn JCI Quốc Tế",
    type: "Bệnh Viện Đa Khoa Quốc Tế JCI",
    agency: "Hệ Thống Y Tế Vinmec",
    website: "http://vinmec.com",
    bedCapacity: "600+ giường bệnh 5 sao",
    specialties: ["Phẫu Thuật Robot & Ghép Tạng", "Can Thiệp Tim Mạch Tiêu Chuẩn Hoa Kỳ", "Thai Sản Trọn Gói 5 Sao Đẻ Không Đau", "Liệu Pháp Tế Bào Gốc & Y Học Tái Tạo", "Trung Tâm Ung Bướu Đa Mô Thức"]
  },
  "Bệnh viện đa khoa Quốc tế Thu Cúc": {
    district: "Quận Tây Hồ",
    address: "286 Thụy Khuê, Phường Bưởi, Quận Tây Hồ, Hà Nội",
    phone: "1900 5588 92",
    tier: "Tư Nhân / Quốc Tế",
    badge: "Bệnh Viện Đa Khoa Quốc Tế Top Đầu",
    type: "Đa Khoa Quốc Tế",
    agency: "Hệ Thống Y Tế Thu Cúc TCI",
    website: "http://benhvienthucuc.vn",
    bedCapacity: "350+ giường bệnh",
    specialties: ["Thai Sản Trọn Gói & Sinh Con Nghỉ Dưỡng", "Nội Soi Tiêu Hóa NBI Không Đau Không Khó Chịu", "Khám Sức Khỏe & Tầm Soát Ung Thư Toàn Diện", "Phẫu Thuật Ngoại Khoa Ít Xâm Lấn", "Khám Chữa Bệnh BHYT Thông Tuyến"]
  },
  "Bệnh viện đa khoa Hồng Ngọc": {
    district: "Quận Ba Đình",
    address: "Số 55 Yên Ninh, Phường Trúc Bạch, Quận Ba Đình, Hà Nội (CS Yên Ninh) & Phúc Trường Minh",
    phone: "024 3927 5568",
    tier: "Tư Nhân / Quốc Tế",
    badge: "Bệnh Viện Đa Khoa Quốc Tế Uy Tín",
    type: "Đa Khoa Quốc Tế Xanh HFS",
    agency: "Tập Đoàn Y Tế Hồng Ngọc",
    website: "http://hongngochospital.vn",
    bedCapacity: "500+ giường bệnh chuẩn HFS",
    specialties: ["Thai Sản Trọn Gói & Trung Tâm Sinh Con Chuẩn Anh Quốc", "Tán Sỏi Thận Laser Kỹ Thuật Cao", "Nội Soi Tiêu Hóa Ứng Dụng AI", "Trung Tâm Hỗ Trợ Sinh Sản (IVF Hồng Ngọc)", "Cơ Xương Khớp & Phục Hồi Chức Năng"]
  },
  "Bệnh viện đa khoa MEDLATEC": {
    district: "Quận Ba Đình",
    address: "42-44 Nghĩa Dũng, Phường Phúc Xá, Quận Ba Đình, Hà Nội",
    phone: "1900 5656 56",
    tier: "Tư Nhân / Quốc Tế",
    badge: "Hệ Thống Xét Nghiệm Đạt Chuẩn CAP Hoa Kỳ",
    type: "Đa Khoa & Xét Nghiệm Chuẩn Quốc Tế",
    agency: "Tập Đoàn Y Tế MEDLATEC",
    website: "http://medlatec.vn",
    bedCapacity: "300+ giường bệnh",
    specialties: ["Dịch Vụ Lấy Mẫu Xét Nghiệm Tận Nơi Tiên Phong", "Hệ Thống Xét Nghiệm Đạt Chuẩn CAP & ISO 15189", "Chẩn Đoán Hình Ảnh Đọc Phim Từ Xa", "Tầm Soát Ung Thư & Bệnh Lý Di Truyền", "Khám Sức Khỏe Cơ Quan & Thẻ BHYT"]
  },
  "BV Tâm Anh": {
    district: "Quận Long Biên",
    address: "108 Phố Hoàng Như Tiếp, Phường Bồ Đề, Quận Long Biên, Hà Nội",
    phone: "024 3872 3872",
    tier: "Tư Nhân / Quốc Tế",
    badge: "Bệnh Viện Đa Khoa Kỹ Thuật Cao Hàng Đầu",
    type: "Đa Khoa Quốc Tế Khách Sạn",
    agency: "Tập Đoàn BV Đa Khoa Tâm Anh",
    website: "http://tamanhhospital.vn",
    bedCapacity: "600+ giường bệnh cao cấp",
    specialties: ["Hỗ Trợ Sinh Sản (IVF Tâm Anh) Tỷ Lệ Đậu Thai Hàng Đầu", "Chấn Thương Chỉnh Hình & Phẫu Thuật Khớp Robot", "Hồi Sức Cấp Cứu Sơ Sinh (NICU) Hiện Đại", "Tim Mạch Can Thiệp Mạch Vành & Đột Quỵ", "Nội Soi Tiêu Hóa Không Đau Công Nghệ AI"]
  },
  "Bệnh viện Đa khoa Phương Đông": {
    district: "Quận Bắc Từ Liêm",
    address: "Số 9 Phố Viên, Phường Cổ Nhuế 2, Quận Bắc Từ Liêm, Hà Nội",
    phone: "1900 1806",
    tier: "Tư Nhân / Quốc Tế",
    badge: "Bệnh Viện Khách Sạn Xanh Quy Mô Lớn",
    type: "Đa Khoa Quốc Tế",
    agency: "Tập Đoàn Intracom",
    website: "http://benhvienphuongdong.vn",
    bedCapacity: "1.000+ giường bệnh tiêu chuẩn khách sạn",
    specialties: ["Thai Sản Trọn Gói & Sinh Con Nghỉ Dưỡng Công Viên", "Hỗ Trợ Sinh Sản (IVF Phương Đông)", "Phẫu Thuật Nội Soi Ngoại Khoa", "Nhi Khoa Toàn Diện Không Lạm Dụng Kháng Sinh", "Tầm Soát Sức Khỏe Chuyên Sâu"]
  },
  "BV Việt Pháp": {
    district: "Quận Đống Đa",
    address: "Số 1 Phố Phương Mai, Phường Phương Mai, Quận Đống Đa, Hà Nội",
    phone: "024 3577 1100",
    tier: "Tư Nhân / Quốc Tế",
    badge: "Bệnh Viện Đạt Chuẩn Quốc Tế Đầu Tiên Tại Hà Nội",
    type: "Đa Khoa Quốc Tế Tiêu Chuẩn Châu Âu",
    agency: "Tập Đoàn Y Tế Quốc Tế",
    website: "http://hfh.com.vn",
    bedCapacity: "200+ giường bệnh Châu Âu",
    specialties: ["Sản Phụ Khoa & Đỡ Đẻ Chuẩn Quốc Tế", "Nhi Khoa & Chăm Sóc Sơ Sinh Tiêu Chuẩn Pháp", "Phẫu Thuật Nội Soi Ngoại Khoa", "Cấp Cứu Quốc Tế 24/7 & Hồi Sức Tích Cực", "Khám Chuyên Gia Đa Quốc Gia"]
  },
  "Bệnh viện ung bướu Hưng Việt": {
    district: "Quận Hai Bà Trưng",
    address: "34 Đại Cồ Việt, Phường Lê Đại Hành, Quận Hai Bà Trưng, Hà Nội",
    phone: "0901 435 566",
    tier: "Tư Nhân / Quốc Tế",
    badge: "Bệnh Viện Chuyên Khoa Ung Bướu Tư Nhân Đầu Tiên",
    type: "Ung Bướu & Xạ Trị",
    agency: "Tập Đoàn Y Tế Hưng Việt",
    website: "http://benhvienhungviet.vn",
    bedCapacity: "150+ giường bệnh",
    specialties: ["Phẫu Thuật Triệt Căn Ung Bướu Chuyên Sâu", "Hóa Trị Phác Đồ Tiên Tiến", "Tầm Soát Ung Thư Vú, Tuyến Giáp, Tiêu Hóa", "Chăm Sóc Giảm Nhẹ Bệnh Nhân Ung Thư", "Khám BHYT Quyền Lợi Đầy Đủ"]
  },
  "BV chuyên khoa Nam học và hiếm muộn Hà Nội": {
    district: "Quận Hoàng Mai",
    address: "431 Tam Trinh, Cụm Công Nghiệp Hoàng Mai, Phường Hoàng Văn Thụ, Quận Hoàng Mai, Hà Nội",
    phone: "024 3634 3636",
    tier: "Tư Nhân / Quốc Tế",
    badge: "Bệnh Viện Chuyên Khoa Nam Học & IVF Hàng Đầu",
    type: "Nam Học, Y Học Giới Tính & IVF",
    agency: "Công Ty Cổ Phần Y Học Hiếm Muộn",
    website: "http://afhanoi.com",
    bedCapacity: "150+ giường bệnh",
    specialties: ["Thụ Tinh Trong Ống Nghiệm (IVF) Tỷ Lệ Thành Công Cao", "Vi Phẫu Trích Tinh Trùng Micro-TESE Cho Nam Vô Tinh", "Điều Trị Rối Loạn Cương Dương & Xuất Tinh Sớm", "Phẫu Thuật Tạo Hình Dương Vật & Tiết Niệu Nam", "Sàng Lọc Di Truyền Tiền Làm Tổ"]
  }
};

// Đọc danh sách CSV của User
const csvContent = fs.readFileSync(path.join(__dirname, '..', 'data', 'raw_hanoi_hospitals.csv'), 'utf8');
const lines = csvContent.trim().split('\n').slice(1);

// Tập hợp lọc trùng
const seenNames = new Set();
const dedupedList = [];

// Các cặp cần loại bỏ mục trùng lặp
const excludeStt = new Set([28, 53, 63, 69, 108, 111, 112, 36]); // 36 là viện kiểm nghiệm thuốc

lines.forEach(line => {
  const [sttStr, nameRaw, tierRaw, note] = line.split(';');
  const stt = parseInt(sttStr);
  if (excludeStt.has(stt)) {
    console.log(`Skipping duplicate/non-hospital item: #${stt} ${nameRaw}`);
    return;
  }
  const cleanName = nameRaw.trim();
  if (!seenNames.has(cleanName)) {
    seenNames.add(cleanName);
    dedupedList.push({ stt, name: cleanName, tierRaw: tierRaw.trim(), note: note ? note.trim() : '' });
  }
});

console.log(`\nDeduped list size: ${dedupedList.length} hospitals`);

// Chuyển đổi tên tiếng Việt thành slug
function toSlug(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

// Map sang danh sách các object bệnh viện chuẩn
let added = 0;
let updated = 0;

dedupedList.forEach(item => {
  const meta = hanoiHospitalsMeta[item.name] || {};
  let slug = toSlug(item.name);
  if (!slug.startsWith('benh-vien-') && !slug.startsWith('vien-')) {
    slug = 'benh-vien-' + slug;
  }

  // Chuẩn hóa Tuyến
  let tier = "Tuyến Tỉnh / Thành Phố";
  if (item.tierRaw === "Tuyến 1" || (item.note && item.note.includes("Trung ương"))) {
    tier = "Tuyến Trung Ương";
  } else if (item.tierRaw === "Tuyến 3" || (item.note && item.note.includes("Tuyến huyện"))) {
    tier = "Tuyến Quận / Huyện";
  } else if (item.tierRaw.includes("Tư nhân") || (item.note && item.note.includes("Tư nhân"))) {
    tier = "Tư Nhân / Quốc Tế";
  }
  if (meta.tier) tier = meta.tier;

  // Xác định quận huyện
  let district = meta.district || "Quận Ba Đình";
  if (item.name.includes("Hà Đông")) district = "Quận Hà Đông";
  else if (item.name.includes("Đống Đa")) district = "Quận Đống Đa";
  else if (item.name.includes("Hai Bà Trưng")) district = "Quận Hai Bà Trưng";
  else if (item.name.includes("Hoàn Kiếm")) district = "Quận Hoàn Kiếm";
  else if (item.name.includes("Cầu Giấy")) district = "Quận Cầu Giấy";
  else if (item.name.includes("Thanh Xuân")) district = "Quận Thanh Xuân";
  else if (item.name.includes("Long Biên")) district = "Quận Long Biên";
  else if (item.name.includes("Tây Hồ")) district = "Quận Tây Hồ";
  else if (item.name.includes("Hoàng Mai")) district = "Quận Hoàng Mai";
  else if (item.name.includes("Bắc Từ Liêm")) district = "Quận Bắc Từ Liêm";
  else if (item.name.includes("Nam Từ Liêm")) district = "Quận Nam Từ Liêm";
  else if (item.name.includes("Sơn Tây")) district = "Thị xã Sơn Tây";
  else if (item.name.includes("Đông Anh")) district = "Huyện Đông Anh";
  else if (item.name.includes("Sóc Sơn")) district = "Huyện Sóc Sơn";
  else if (item.name.includes("Ba Vì")) district = "Huyện Ba Vì";
  else if (item.name.includes("Chương Mỹ")) district = "Huyện Chương Mỹ";
  else if (item.name.includes("Đan Phượng")) district = "Huyện Đan Phượng";
  else if (item.name.includes("Hoài Đức")) district = "Huyện Hoài Đức";
  else if (item.name.includes("Thanh Trì")) district = "Huyện Thanh Trì";
  else if (item.name.includes("Thường Tín")) district = "Huyện Thường Tín";
  else if (item.name.includes("Thạch Thất")) district = "Huyện Thạch Thất";
  else if (item.name.includes("Quốc Oai")) district = "Huyện Quốc Oai";
  else if (item.name.includes("Phúc Thọ")) district = "Huyện Phúc Thọ";
  else if (item.name.includes("Mỹ Đức") || item.name.includes("Vân Đình")) district = "Huyện Ứng Hòa";

  const address = meta.address || `Địa bàn ${district}, Thành phố Hà Nội`;
  const hotline = meta.phone || "1900 9095 (Tổng đài Y tế Hà Nội)";
  const shortName = meta.shortName || item.name.replace(/Bệnh viện|Viện/i, 'BV').trim();
  const badge = meta.badge || (tier === "Tuyến Trung Ương" ? "Bệnh Viện Tuyến Đầu Trung Ương" : tier === "Tư Nhân / Quốc Tế" ? "Bệnh Viện Tiêu Chuẩn Chất Lượng Cao" : "Bệnh Viện Đa Khoa Hạng 1 Hà Nội");
  const type = meta.type || (tier === "Tư Nhân / Quốc Tế" ? "Đa Khoa Quốc Tế & Dịch Vụ" : "Đa Khoa Toàn Diện");
  const agency = meta.agency || (tier === "Tuyến Trung Ương" ? "Bộ Y Tế / Bộ Ngành" : tier === "Tư Nhân / Quốc Tế" ? "Khối Tư Nhân & Quốc Tế" : "Sở Y Tế Hà Nội");
  const website = meta.website || `http://${slug}.vn`;
  const bedCapacity = meta.bedCapacity || "400+ giường bệnh tiêu chuẩn";
  const specialties = meta.specialties || [
    "Cấp Cứu Ngoại Khoa & Hồi Sức Tích Cực 24/7",
    "Nội Khoa - Tim Mạch - Tiêu Hóa",
    "Phẫu Thuật Ngoại Khoa Kỹ Thuật Cao",
    "Chẩn Đoán Hình Ảnh Kỹ Thuật Số (CT/MRI)",
    "Khám & Điều Trị Bảo Hiểm Y Tế Toàn Diện"
  ];

  const summary = `${item.name} là cơ sở y tế uy tín tại ${district}, Thành phố Hà Nội, tiếp nhận khám chữa bệnh đa khoa, cấp cứu 24/7 và phục vụ chăm sóc sức khỏe nhân dân Thủ đô.`;
  const content = `<h3>1. Giới thiệu tổng quan & Vị trí</h3><p>${item.name} là một trong những cơ sở y tế quan trọng trên địa bàn ${district}, Thành phố Hà Nội. Bệnh viện luôn nỗ lực nâng cao chất lượng chuyên môn, cải tiến quy trình khám chữa bệnh nhằm mang đến dịch vụ y tế an toàn, hiệu quả cho nhân dân Thủ đô và các tỉnh lân cận.</p><h3>2. Quy mô giường bệnh & Cơ sở trang thiết bị</h3><p>Bệnh viện được đầu tư cơ sở hạ tầng khang trang với quy mô ${bedCapacity}. Hệ thống trang thiết bị chẩn đoán hình ảnh và xét nghiệm hiện đại hỗ trợ tối đa cho công tác chẩn đoán sớm và điều trị chính xác.</p><h3>3. Thế mạnh chuyên khoa mũi nhọn</h3><ul>${specialties.map(s => `<li><strong>${s.split(' ')[0]}:</strong> ${s}</li>`).join('')}</ul><h3>4. Hướng dẫn quy trình khám bệnh</h3><p>Bệnh viện tiếp nhận bệnh nhân khám thường, khám BHYT và khám dịch vụ theo yêu cầu. Người bệnh có thể đăng ký trực tiếp tại sảnh đón tiếp của bệnh viện hoặc liên hệ hotline để được hướng dẫn chi tiết.</p><h3>5. Chỉ dẫn địa điểm & Gửi xe</h3><p>Tọa lạc tại: ${address}. Bệnh viện có bãi gửi xe máy và vị trí đỗ ô tô thuận lợi cho người bệnh và thân nhân.</p>`;

  const hospitalObj = {
    id: slug,
    slug: slug,
    name: item.name,
    shortName: shortName,
    badge: badge,
    tier: tier,
    type: type,
    agency: agency,
    provinceSlug: "ha-noi",
    provinceName: "Thành phố Hà Nội",
    district: district,
    address: address,
    hotlineEmergency: hotline,
    phoneAppointment: hotline,
    workingHours: "Cấp cứu 24/24 | Khám bệnh: Thứ 2 - Thứ 6 (07:30 - 16:30), Thứ 7 (07:30 - 11:30)",
    lat: 21.0285,
    lng: 105.8542,
    googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.name + ' ' + address)}`,
    googleDirectionsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.name + ' ' + address)}`,
    website: website,
    bedCapacity: bedCapacity,
    specialties: specialties,
    summary: summary,
    content: content
  };

  const existIdx = currentHospitals.findIndex(h => h.slug === slug || h.id === slug || h.name.toLowerCase() === item.name.toLowerCase());
  if (existIdx >= 0) {
    currentHospitals[existIdx] = { ...currentHospitals[existIdx], ...hospitalObj };
    updated++;
  } else {
    currentHospitals.push(hospitalObj);
    added++;
  }
});

fs.writeFileSync(masterPath, JSON.stringify(currentHospitals, null, 2), 'utf8');
console.log(`\nSUCCESS: Added ${added} new hospitals, Updated ${updated} hospitals.`);
console.log(`Total hospitals in master database: ${currentHospitals.length}`);
const hanoiTotal = currentHospitals.filter(h => h.provinceSlug === 'ha-noi').length;
console.log(`Total Hanoi hospitals now: ${hanoiTotal}`);
