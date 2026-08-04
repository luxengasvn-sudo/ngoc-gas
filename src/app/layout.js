import { Inter, Roboto } from "next/font/google";
import "./globals.css";

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

import db from '@/lib/db';

export async function generateMetadata() {
  let faviconUrl = '/favicon.ico';
  try {
    const [rows] = await db.query("SELECT setting_value FROM settings WHERE setting_key = 'favicon_url'");
    if (rows.length > 0 && rows[0].setting_value) {
      faviconUrl = rows[0].setting_value;
    }
  } catch (e) {
    console.error('Error fetching favicon settings:', e);
  }

  return {
    title: "Ngọc Gas - Năng lượng xanh, An tâm cho mọi nhà",
    description: "Ngọc Gas chuyên cung cấp các loại bình gas dân dụng, gas công nghiệp và phụ kiện gas chính hãng an toàn.",
    icons: {
      icon: faviconUrl,
    }
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="vi" className={`${inter.variable} ${roboto.variable}`}>
      <body style={{ fontFamily: 'var(--font-roboto), sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {children}
      </body>
    </html>
  );
}
