import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileContactWidget from "@/components/MobileContactWidget";
import BottomNav from "@/components/BottomNav";
import { getAllSettings } from "@/lib/settingsHelper";
import { generateEntitySchema } from "@/lib/entityHelper";

export const revalidate = 60;

export default async function PublicLayout({ children }) {
  let settings = {};
  try {
    settings = await getAllSettings();
  } catch (e) {
    console.error('Error fetching layout settings:', e);
  }

  const schemaData = generateEntitySchema(settings);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <Header initialSettings={settings} />
      <div className="main-content-wrapper">{children}</div>
      <MobileContactWidget phone={settings.phone} />
      <BottomNav initialSettings={settings} />
      <Footer initialSettings={settings} />
    </>
  );
}
