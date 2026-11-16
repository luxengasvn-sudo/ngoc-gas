import fs from 'fs';
import path from 'path';

/**
 * Trả về danh sách chi nhánh Google Business Profile chính thức đã xác thực
 */
export function getEntityBranches() {
  return [
    {
      id: 'branch-di-an',
      name: 'Ngọc Gas - Giao gas nhanh chính hãng - Dĩ An (Trụ sở chính)',
      streetAddress: '7 Nguyễn Trung Trực, Phường Dĩ An',
      addressLocality: 'Dĩ An',
      addressRegion: 'Bình Dương',
      postalCode: '75300',
      addressCountry: 'VN',
      phone: '19009396',
      latitude: 10.90833,
      longitude: 106.77222,
      mapUrl: 'https://www.google.com/maps/place/Ng%E1%BB%8Dc+Gas+-+Giao+gas+nhanh+ch%C3%ADnh+h%C3%A3ng+-+D%C4%A9+An/data=!4m2!3m1!1s0x0:0x87aafab9287822cc',
      description: 'Trụ sở chính và điểm giao gas siêu tốc số 1 tại TP. Dĩ An. Cam kết bình gas chính hãng đủ ký, bảo hiểm PCCC.'
    },
    {
      id: 'branch-cay-da',
      name: 'Ngọc Gas - Giao gas nhanh chính hãng - Cây Da',
      streetAddress: '7/14 Đường Cây Da, Khu phố Tân Phú 1, Phường Tân Đông Hiệp',
      addressLocality: 'Dĩ An',
      addressRegion: 'Bình Dương',
      postalCode: '75300',
      addressCountry: 'VN',
      phone: '19009396',
      latitude: 10.92305,
      longitude: 106.77944,
      mapUrl: 'https://www.google.com/maps/place/Ng%E1%BB%8Dc+Gas+-+Giao+gas+nhanh+ch%C3%ADnh+h%C3%A3ng+-+C%C3%A2y+Da/data=!4m2!3m1!1s0x0:0xdb05b7c2cd1d4cd9',
      description: 'Chi nhánh giao gas khu vực Cây Da, Tân Đông Hiệp, Bình Thung và lân cận. Giao nhanh trong 15 phút.'
    },
    {
      id: 'branch-vietsing',
      name: 'Cửa hàng Ngọc Gas - Đường D5 An Phú (KDC VietSing)',
      streetAddress: 'Kiot 5, Đường D5, KDC VietSing, Phường An Phú',
      addressLocality: 'Thuận An',
      addressRegion: 'Bình Dương',
      postalCode: '75200',
      addressCountry: 'VN',
      phone: '19009396',
      latitude: 10.94167,
      longitude: 106.71944,
      mapUrl: 'https://www.google.com/maps/place/C%E1%BB%ADa+h%C3%A0ng+Ng%E1%BB%8Dc+Gas+-+%C4%90%C6%B0%E1%BB%9Dng+D5+An+Ph%C3%BA+(C%E1%BB%ADa+h%C3%A0ng+Gas+Vietsing+Visip)/data=!4m2!3m1!1s0x0:0x96898a80c390391a',
      description: 'Chi nhánh phục vụ cư dân KDC VietSing, KCN VSIP 1, An Phú và TP. Thuận An.'
    }
  ];
}

/**
 * Trích xuất danh sách tất cả các liên kết Entity profiles hợp lệ (sameAs)
 */
export function getVerifiedEntityProfiles() {
  const filePath = path.join(process.cwd(), 'data', 'entity-profiles.json');
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      const profiles = JSON.parse(content);
      return profiles.filter(p => p.url && p.url.trim().length > 0 && p.nap_verified === true);
    }
  } catch (error) {
    console.error('Lỗi khi đọc file entity-profiles.json:', error);
  }

  // Fallback các kênh chính nếu file lỗi
  return [
    { name: 'Google Sites', url: 'https://sites.google.com/view/ngocgas', category: 'Google Ecosystem' },
    { name: 'Blogger', url: 'https://ngocgascom.blogspot.com', category: 'Web 2.0' },
    { name: 'YouTube', url: 'https://www.youtube.com/@ngocgas', category: 'Video & Social' },
    { name: 'WordPress', url: 'https://ngocgas.wordpress.com', category: 'Web 2.0' },
    { name: 'Tumblr', url: 'https://www.tumblr.com/ngocgas', category: 'Microblogging' },
    { name: 'Pinterest', url: 'https://www.pinterest.com/gasngoc/', category: 'Visual Search' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/gas-ng%E1%BB%8Dc-ab341b439/', category: 'Business Network' },
    { name: 'Facebook Fanpage', url: 'https://www.facebook.com/ngocgascom', category: 'Social Media' },
    { name: 'Webflow', url: 'https://ngoc-gas.webflow.io', category: 'Web 2.0 VIP' }
  ];
}

/**
 * Tạo đối tượng Schema.org Knowledge Graph chuẩn SEO Entity cho toàn bộ website
 * @param {Object} settings - Cài đặt hệ thống từ getAllSettings()
 */
export function generateEntitySchema(settings = {}) {
  const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || 'https://ngocgas.com').replace(/\/+$/, '');
  const brandName = settings.company_name || settings.site_name || 'Ngọc Gas';
  const cleanPhone = (settings.phone || '19009396').replace(/[\s\.]/g, '').trim();

  const verifiedProfiles = getVerifiedEntityProfiles();
  const sameAsUrls = verifiedProfiles.map(p => p.url);

  const branches = getEntityBranches();
  const hasMapUrls = branches.map(b => b.mapUrl);

  const logoUrl = settings.logo_url && settings.logo_url.startsWith('http')
    ? settings.logo_url
    : `${baseUrl}${settings.logo_url || '/uploads/1784863563190-682917009.png'}`;

  const avatarLogoUrl = `${baseUrl}/uploads/1790211770332-292804492.jpg`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      // 1. Core Brand Organization & LocalBusiness
      {
        "@type": ["GasStation", "LocalBusiness", "Organization"],
        "@id": `${baseUrl}/#organization`,
        "name": brandName,
        "legalName": "Đại Lý Phân Phối Gas Chính Hãng Ngọc Gas Dĩ An",
        "alternateName": [
          "Đại Lý Gas Ngọc Gas Dĩ An Bình Dương",
          "Hệ Thống Giao Gas Nhanh Ngọc Gas",
          "Ngoc Gas Official"
        ],
        "url": baseUrl,
        "logo": {
          "@type": "ImageObject",
          "@id": `${baseUrl}/#logo`,
          "url": logoUrl,
          "contentUrl": logoUrl,
          "caption": "Logo Ngọc Gas - Năng lượng xanh, An tâm cho mọi nhà"
        },
        "image": avatarLogoUrl,
        "description": settings.meta_description || settings.slogan || "Ngọc Gas chuyên phân phối các loại bình gas chính hãng Sopet Gas One, Phoenix Gas, Luxen Gas. Giao gas siêu tốc 15 phút tại Dĩ An, Thuận An, Thủ Đức và Bình Dương.",
        "telephone": cleanPhone,
        "email": settings.email || "contact@ngocgas.com",
        "priceRange": "$$",
        "currenciesAccepted": "VND",
        "paymentAccepted": "Tiền mặt, Chuyển khoản ngân hàng, Quét mã QR",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "7 Nguyễn Trung Trực, Phường Dĩ An",
          "addressLocality": "TP. Dĩ An",
          "addressRegion": "Bình Dương",
          "postalCode": "75300",
          "addressCountry": "VN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 10.90833,
          "longitude": 106.77222
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday"
            ],
            "opens": "06:00",
            "closes": "22:00"
          }
        ],
        "areaServed": [
          {
            "@type": "AdministrativeArea",
            "name": "Dĩ An"
          },
          {
            "@type": "AdministrativeArea",
            "name": "Thuận An"
          },
          {
            "@type": "AdministrativeArea",
            "name": "Thủ Dầu Một"
          },
          {
            "@type": "AdministrativeArea",
            "name": "TP. Hồ Chí Minh"
          },
          {
            "@type": "AdministrativeArea",
            "name": "Bình Dương"
          }
        ],
        "hasMap": hasMapUrls,
        "sameAs": sameAsUrls,
        "subOrganization": branches.map(b => ({
          "@type": "GasStation",
          "@id": `${baseUrl}/#${b.id}`,
          "name": b.name,
          "telephone": b.phone,
          "url": baseUrl,
          "hasMap": b.mapUrl,
          "description": b.description,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": b.streetAddress,
            "addressLocality": b.addressLocality,
            "addressRegion": b.addressRegion,
            "postalCode": b.postalCode,
            "addressCountry": b.addressCountry
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": b.latitude,
            "longitude": b.longitude
          },
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              "opens": "06:00",
              "closes": "22:00"
            }
          ]
        }))
      },
      // 2. WebSite Knowledge Graph
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        "url": baseUrl,
        "name": brandName,
        "description": "Website chính thức của đại lý gas Ngọc Gas - Đặt gas online, cập nhật giá gas hôm nay 24/7.",
        "publisher": {
          "@id": `${baseUrl}/#organization`
        },
        "inLanguage": "vi-VN"
      }
    ]
  };
}
