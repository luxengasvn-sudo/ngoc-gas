import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import { getAllSettings } from '@/lib/settingsHelper';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "700"],
});

export async function generateMetadata() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ngocgas.com';
  let faviconUrl = '/favicon.ico';
  let iconType = 'image/x-icon';
  let title = "Ngọc Gas - Năng lượng xanh, An tâm cho mọi nhà";
  let description = "Ngọc Gas chuyên cung cấp các loại bình gas dân dụng, gas công nghiệp và phụ kiện gas chính hãng an toàn.";
  let keywords = "ngọc gas, bình gas 12kg, đổi gas dĩ an, gas bình dương, gas thủ đức";
  let logoUrl = '/favicon.ico';

  try {
    const settings = await getAllSettings();
    if (settings.favicon_url) {
      faviconUrl = settings.favicon_url;
      const lowerUrl = faviconUrl.toLowerCase();
      if (lowerUrl.endsWith('.png')) iconType = 'image/png';
      else if (lowerUrl.endsWith('.jpg') || lowerUrl.endsWith('.jpeg')) iconType = 'image/jpeg';
      else if (lowerUrl.endsWith('.svg')) iconType = 'image/svg+xml';
    }
    if (settings.logo_url) logoUrl = settings.logo_url;
    if (settings.meta_title) title = settings.meta_title;
    if (settings.meta_description) description = settings.meta_description;
    if (settings.meta_keywords) keywords = settings.meta_keywords;
  } catch (e) {
    console.error('Error fetching favicon settings:', e);
  }

  const finalFaviconUrl = faviconUrl.includes('?') ? faviconUrl : `${faviconUrl}?v=${encodeURIComponent(faviconUrl)}`;

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: title,
      template: `%s | Ngọc Gas`
    },
    description,
    keywords,
    alternates: {
      canonical: './'
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title,
      description,
      url: baseUrl,
      siteName: 'Ngọc Gas',
      locale: 'vi_VN',
      type: 'website',
      images: [
        {
          url: logoUrl,
          width: 800,
          height: 600,
          alt: 'Ngọc Gas - Năng lượng xanh, An tâm cho mọi nhà'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [logoUrl]
    },
    icons: {
      icon: [{ url: finalFaviconUrl, type: iconType }],
      shortcut: [{ url: finalFaviconUrl, type: iconType }],
      apple: [{ url: finalFaviconUrl, type: iconType }]
    }
  };
}

export default async function RootLayout({ children }) {
  let faviconUrl = '/favicon.ico';
  let iconType = 'image/png';
  try {
    const settings = await getAllSettings();
    if (settings.favicon_url) {
      faviconUrl = settings.favicon_url;
      const lowerUrl = faviconUrl.toLowerCase();
      if (lowerUrl.endsWith('.png')) iconType = 'image/png';
      else if (lowerUrl.endsWith('.jpg') || lowerUrl.endsWith('.jpeg')) iconType = 'image/jpeg';
      else if (lowerUrl.endsWith('.svg')) iconType = 'image/svg+xml';
      else if (lowerUrl.endsWith('.ico')) iconType = 'image/x-icon';
    }
  } catch (e) {}

  const antiCacheUrl = faviconUrl.includes('?') ? faviconUrl : `${faviconUrl}?v=${encodeURIComponent(faviconUrl)}`;

  return (
    <html lang="vi" className={`${inter.variable} ${roboto.variable}`}>
      <head>
        <link rel="icon" href={antiCacheUrl} type={iconType} sizes="any" />
        <link rel="shortcut icon" href={antiCacheUrl} type={iconType} />
        <link rel="apple-touch-icon" href={antiCacheUrl} />
      </head>
      <body style={{ fontFamily: 'var(--font-roboto), sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {children}
      </body>
    </html>
  );
}
