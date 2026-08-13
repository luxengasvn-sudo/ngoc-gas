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
  let faviconUrl = '/favicon.ico';
  let iconType = 'image/x-icon';
  let title = "Ngọc Gas - Năng lượng xanh, An tâm cho mọi nhà";
  let description = "Ngọc Gas chuyên cung cấp các loại bình gas dân dụng, gas công nghiệp và phụ kiện gas chính hãng an toàn.";

  try {
    const settings = await getAllSettings();
    if (settings.favicon_url) {
      faviconUrl = settings.favicon_url;
      if (faviconUrl.endsWith('.png')) iconType = 'image/png';
      else if (faviconUrl.endsWith('.jpg') || faviconUrl.endsWith('.jpeg')) iconType = 'image/jpeg';
      else if (faviconUrl.endsWith('.svg')) iconType = 'image/svg+xml';
    }
    if (settings.meta_title) title = settings.meta_title;
    if (settings.meta_description) description = settings.meta_description;
  } catch (e) {
    console.error('Error fetching favicon settings:', e);
  }

  const finalFaviconUrl = faviconUrl.includes('?') ? faviconUrl : `${faviconUrl}?v=${encodeURIComponent(faviconUrl)}`;

  return {
    title,
    description,
    icons: {
      icon: [{ url: finalFaviconUrl, type: iconType }],
      shortcut: [{ url: finalFaviconUrl, type: iconType }],
      apple: [{ url: finalFaviconUrl, type: iconType }]
    }
  };
}

export default async function RootLayout({ children }) {
  let faviconUrl = '/favicon.ico';
  let iconType = 'image/x-icon';
  try {
    const settings = await getAllSettings();
    if (settings.favicon_url) {
      faviconUrl = settings.favicon_url;
      if (faviconUrl.endsWith('.png')) iconType = 'image/png';
      else if (faviconUrl.endsWith('.jpg') || faviconUrl.endsWith('.jpeg')) iconType = 'image/jpeg';
      else if (faviconUrl.endsWith('.svg')) iconType = 'image/svg+xml';
    }
  } catch (e) {}

  const finalFaviconUrl = faviconUrl.includes('?') ? faviconUrl : `${faviconUrl}?v=${encodeURIComponent(faviconUrl)}`;

  return (
    <html lang="vi" className={`${inter.variable} ${roboto.variable}`}>
      <head>
        <link rel="icon" href={finalFaviconUrl} type={iconType} key="favicon" />
        <link rel="shortcut icon" href={finalFaviconUrl} type={iconType} key="shortcut-favicon" />
        <link rel="apple-touch-icon" href={finalFaviconUrl} key="apple-favicon" />
      </head>
      <body style={{ fontFamily: 'var(--font-roboto), sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {children}
      </body>
    </html>
  );
}
