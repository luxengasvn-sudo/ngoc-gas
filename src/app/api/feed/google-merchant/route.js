import { getAllProducts } from '@/lib/productsHelper';
import { getAllSettings } from '@/lib/settingsHelper';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function stripHtml(html) {
  if (!html) return '';
  return html
    .replace(/<[^>]*>?/gm, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export async function GET(request) {
  try {
    const products = await getAllProducts();
    const settings = await getAllSettings();

    const host = request.headers.get('host') || 'ngocgas.com';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `${protocol}://${host}`;

    const brandName = settings.company_name || settings.site_name || 'Ngọc Gas';
    const phone = settings.phone || '19009396';
    const siteTitle = `${brandName} - Bảng Giá Gas Chính Hãng Đủ Ký Giao Nhanh 15 Phút`;
    const siteDesc = settings.slogan || `Đại lý phân phối bình gas chính hãng Sopet, Phoenix, Luxen Gas 12kg và 45kg tại Dĩ An, Thuận An, Bình Dương và TP.HCM. Hotline đặt gas 24/7: ${phone}.`;

    // Filter active products
    const activeProducts = products.filter(p => p.is_active == 1 || p.is_active === true || p.is_active === undefined);

    let itemsXml = '';

    for (const p of activeProducts) {
      const prodId = `NGOCGAS-${p.id}`;
      const prodTitle = `${p.name} - Chính Hãng Đủ Ký`;
      
      let rawDesc = p.short_description || p.description || `${p.name} chính hãng chất lượng cao tại ${brandName}. Giao gas nhanh 15 phút, cân thử đủ ký tại chỗ, kiểm tra an toàn van gas miễn phí.`;
      const cleanDesc = stripHtml(rawDesc).slice(0, 4900);

      const prodLink = `${baseUrl}/san-pham/${p.slug}`;
      
      let mainImg = p.image_url || '/images/sopet-xam.png';
      if (!mainImg.startsWith('http')) {
        mainImg = `${baseUrl}${mainImg.startsWith('/') ? '' : '/'}${mainImg}`;
      }

      // Additional images
      let additionalImgs = [];
      try {
        const parsedImgs = typeof p.images === 'string' ? JSON.parse(p.images) : p.images;
        if (Array.isArray(parsedImgs)) {
          additionalImgs = parsedImgs
            .filter(img => img && img !== p.image_url)
            .map(img => img.startsWith('http') ? img : `${baseUrl}${img.startsWith('/') ? '' : '/'}${img}`);
        }
      } catch (e) {}

      // Price calculation
      const origPrice = Number(p.price || p.sale_price || 395000);
      const salePrice = p.sale_price && Number(p.sale_price) > 0 ? Number(p.sale_price) : null;

      const displayPrice = origPrice > 0 ? origPrice : 395000;
      const formattedPrice = `${Math.round(displayPrice)} VND`;
      const formattedSalePrice = salePrice ? `${Math.round(salePrice)} VND` : null;

      // Brand detection
      let detectedBrand = brandName;
      const lowerName = (p.name || '').toLowerCase();
      if (lowerName.includes('sopet')) detectedBrand = 'Sopet Gas';
      else if (lowerName.includes('phoenix')) detectedBrand = 'Phoenix Gas';
      else if (lowerName.includes('luxen')) detectedBrand = 'Luxen Gas';
      else if (lowerName.includes('petrolimex')) detectedBrand = 'Petrolimex';
      else if (lowerName.includes('saigon')) detectedBrand = 'Saigon Petro';

      // Category detection
      let googleCategory = '543477'; // Home & Garden > Fireplaces, Stoves & Heating > Fuels > Propane
      let productType = 'Bình Gas > Gas Dân Dụng 12kg';
      if (lowerName.includes('45kg') || lowerName.includes('công nghiệp')) {
        productType = 'Bình Gas > Gas Công Nghiệp 45kg';
      } else if (lowerName.includes('van') || lowerName.includes('dây') || lowerName.includes('bếp')) {
        googleCategory = '666'; // Home & Garden > Kitchen & Dining > Kitchen Appliances > Stoves
        productType = 'Phụ Kiện > Thiết Bị Gas';
      }

      itemsXml += `
    <item>
      <g:id>${escapeXml(prodId)}</g:id>
      <g:title>${escapeXml(prodTitle)}</g:title>
      <g:description>${escapeXml(cleanDesc)}</g:description>
      <g:link>${escapeXml(prodLink)}</g:link>
      <g:image_link>${escapeXml(mainImg)}</g:image_link>
${additionalImgs.slice(0, 5).map(img => `      <g:additional_image_link>${escapeXml(img)}</g:additional_image_link>`).join('\n')}
      <g:condition>new</g:condition>
      <g:availability>in_stock</g:availability>
      <g:price>${formattedPrice}</g:price>
${formattedSalePrice ? `      <g:sale_price>${formattedSalePrice}</g:sale_price>` : ''}
      <g:brand>${escapeXml(detectedBrand)}</g:brand>
      <g:google_product_category>${googleCategory}</g:google_product_category>
      <g:product_type>${escapeXml(productType)}</g:product_type>
      <g:identifier_exists>no</g:identifier_exists>
      <g:shipping>
        <g:country>VN</g:country>
        <g:service>Giao Gas Nhanh 15 Phút Tận Nơi</g:service>
        <g:price>0 VND</g:price>
      </g:shipping>
    </item>`;
    }

    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${escapeXml(siteTitle)}</title>
    <link>${escapeXml(baseUrl)}</link>
    <description>${escapeXml(siteDesc)}</description>
${itemsXml}
  </channel>
</rss>`;

    return new Response(xmlContent, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });
  } catch (error) {
    console.error('Error generating Google Merchant Center Feed:', error);
    return new Response(`<?xml version="1.0" encoding="UTF-8"?><error><message>${escapeXml(error.message)}</message></error>`, {
      status: 500,
      headers: { 'Content-Type': 'application/xml; charset=utf-8' }
    });
  }
}
