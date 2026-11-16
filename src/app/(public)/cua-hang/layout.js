export async function generateMetadata() {
  return {
    title: 'Hệ Thống Cửa Hàng & Điểm Giao Gas Nhanh | Ngọc Gas',
    description: 'Tìm kiếm cửa hàng gas và đại lý phân phối Ngọc Gas gần nhất tại Dĩ An, Thuận An, Thủ Đức và Bình Dương. Giao gas siêu tốc 15 phút, hotline 1900 9396.',
    alternates: {
      canonical: 'https://ngocgas.com/cua-hang'
    },
    openGraph: {
      title: 'Hệ Thống Cửa Hàng & Điểm Giao Gas Nhanh | Ngọc Gas',
      description: 'Hệ thống cửa hàng và đại lý Ngọc Gas tại TP. Dĩ An & Bình Dương. Giao gas 15 phút, hotline 1900 9396.',
      url: 'https://ngocgas.com/cua-hang',
      siteName: 'Ngọc Gas',
      locale: 'vi_VN',
      type: 'website'
    }
  };
}

export default function StoresLayout({ children }) {
  return children;
}
