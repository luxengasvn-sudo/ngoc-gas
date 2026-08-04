import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileContactWidget from "@/components/MobileContactWidget";
import BottomNav from "@/components/BottomNav";
import db from "@/lib/db";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PublicLayout({ children }) {
  let settings = {};
  try {
    const [rows] = await db.query('SELECT setting_key, setting_value FROM settings');
    rows.forEach(row => {
      if (row.setting_value !== undefined && row.setting_value !== null) {
        settings[row.setting_key] = row.setting_value;
      }
    });
  } catch (e) {
    console.error('Error fetching layout settings:', e);
  }

  return (
    <>
      <Header initialSettings={settings} />
      <div className="main-content-wrapper">{children}</div>
      <MobileContactWidget phone={settings.phone} />
      <BottomNav phone={settings.phone} />
      <Footer initialSettings={settings} />
    </>
  );
}
