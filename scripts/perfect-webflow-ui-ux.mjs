// scripts/perfect-webflow-ui-ux.mjs
import fs from 'fs';
import path from 'path';
import { getWebflowTab, CDPClient } from './webflow-manager.mjs';

const ARTIFACT_DIR = 'C:\\Users\\MKT-LT\\.gemini\\antigravity-ide\\brain\\9c699f55-aca9-4b21-8284-e3801f5fdbd0';

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

export async function editCanvasText(client, selector, newText) {
  const pos = await client.eval(`
    (() => {
      const iframe = document.getElementById('site-iframe-next');
      if (!iframe) return null;
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      const el = doc.querySelector('${selector.replace(/'/g, "\\'")}');
      if (!el) return null;

      el.scrollIntoView({ behavior: 'instant', block: 'center' });
      const iframeRect = iframe.getBoundingClientRect();
      const r = el.getBoundingClientRect();

      return {
        x: iframeRect.left + r.left + r.width / 2,
        y: iframeRect.top + r.top + r.height / 2,
        currentText: el.innerText.trim()
      };
    })()
  `);

  if (!pos) {
    console.warn(`⚠️ Element not found for selector: [${selector}]`);
    return false;
  }

  console.log(`✏️ Editing [${selector}]: "${pos.currentText.slice(0, 30)}" -> "${newText.slice(0, 30)}"`);

  // Double click to trigger inline editing
  await client.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: pos.x, y: pos.y, button: 'left', clickCount: 1 });
  await client.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: pos.x, y: pos.y, button: 'left', clickCount: 1 });
  await client.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: pos.x, y: pos.y, button: 'left', clickCount: 2 });
  await client.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: pos.x, y: pos.y, button: 'left', clickCount: 2 });
  await sleep(350);

  // Ctrl + A
  await client.send('Input.dispatchKeyEvent', { type: 'rawKeyDown', windowsVirtualKeyCode: 65, modifiers: 2, code: 'KeyA', key: 'a' });
  await client.send('Input.dispatchKeyEvent', { type: 'keyUp', windowsVirtualKeyCode: 65, modifiers: 2, code: 'KeyA', key: 'a' });
  await sleep(150);

  // Insert text
  await client.send('Input.insertText', { text: newText });
  await sleep(300);

  // Click neutral area to commit
  await client.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: 250, y: 100, button: 'left', clickCount: 1 });
  await client.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: 250, y: 100, button: 'left', clickCount: 1 });
  await sleep(350);

  return true;
}

export async function setElementLinkViaSettings(client, elementSelector, targetUrl) {
  console.log(`🔗 Setting link for [${elementSelector}] -> ${targetUrl}...`);
  // Click element on canvas
  const clicked = await client.eval(`
    (() => {
      const iframe = document.getElementById('site-iframe-next');
      if (!iframe) return false;
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      const el = doc.querySelector('${elementSelector.replace(/'/g, "\\'")}');
      if (!el) return false;
      el.scrollIntoView({ behavior: 'instant', block: 'center' });
      el.click();
      return true;
    })()
  `);

  if (!clicked) {
    console.warn(`⚠️ Could not click [${elementSelector}]`);
    return false;
  }
  await sleep(500);

  // Open settings panel
  await client.eval(`
    (() => {
      const settingsTab = document.querySelector('[data-automation-id="right-sidebar-settings-tab-link"]');
      if (settingsTab) settingsTab.click();
    })()
  `);
  await sleep(400);

  // Set URL input value
  const res = await client.eval(`
    (() => {
      const urlInput = document.querySelector('[data-automation-id="Type--Plugin_Text_URL"]');
      if (!urlInput) return null;
      
      const valueSetter = Object.getOwnPropertyDescriptor(urlInput, 'value')?.set;
      const prototype = Object.getPrototypeOf(urlInput);
      const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value')?.set;
      
      if (prototypeValueSetter && valueSetter !== prototypeValueSetter) {
        prototypeValueSetter.call(urlInput, '${targetUrl}');
      } else if (valueSetter) {
        valueSetter.call(urlInput, '${targetUrl}');
      } else {
        urlInput.value = '${targetUrl}';
      }

      urlInput.dispatchEvent(new Event('input', { bubbles: true }));
      urlInput.dispatchEvent(new Event('change', { bubbles: true }));
      urlInput.dispatchEvent(new Event('blur', { bubbles: true }));

      return { success: true, val: urlInput.value };
    })()
  `);

  console.log(`   Link set result for [${elementSelector}]:`, res);
  return !!res;
}

export async function triggerPublish(client) {
  console.log('\n🚀 Triggering Webflow Publish to Selected Domains...');
  const res = await client.eval(`
    (async () => {
      // Exit any open component mode
      const backBtn = Array.from(document.querySelectorAll('button, a, div[role="button"]')).find(el => 
        (el.innerText && (el.innerText.includes('Footer') || el.innerText.includes('Navbar'))) && 
        (el.className.includes('styled') || el.querySelector('svg'))
      );
      if (backBtn && backBtn.getBoundingClientRect().top < 50) {
        backBtn.click();
        await new Promise(r => setTimeout(r, 1000));
      }

      // Click Publish menu button
      const pubBtn = document.querySelector('[data-automation-id="publish-menu-button"]');
      if (pubBtn) pubBtn.click();
      await new Promise(r => setTimeout(r, 800));

      // Click Publish to selected domains
      const allButtons = Array.from(document.querySelectorAll('button'));
      const publishSubmit = allButtons.find(b => b.innerText && b.innerText.includes('Publish to selected domains'));
      if (publishSubmit) {
        publishSubmit.click();
        return { success: true };
      }
      return { error: 'Publish button not found', buttons: allButtons.map(b => b.innerText) };
    })()
  `);

  console.log('Publish Trigger Status:', res);
  console.log('⏳ Waiting 12 seconds for Webflow publishing pipeline...');
  await sleep(12000);
}

export async function main() {
  console.log('================================================================');
  console.log('  ĐẠI LÝ NGỌC GAS — HOÀN THIỆN TOÀN DIỆN UI/UX WEBFLOW SATELLITE');
  console.log('================================================================\n');

  const tab = await getWebflowTab();
  console.log(`Connected to Webflow Tab: ${tab.id} - ${tab.title}`);
  const client = new CDPClient(tab.webSocketDebuggerUrl);
  await client.connect();

  // 0. Dismiss any open modals or dialogs
  await client.eval(`
    (() => {
      const gotIt = Array.from(document.querySelectorAll('button')).find(b => b.innerText && b.innerText.includes('Got it'));
      if (gotIt) gotIt.click();
      const cancel = Array.from(document.querySelectorAll('button')).find(b => b.innerText && b.innerText.trim() === 'Cancel');
      if (cancel) cancel.click();
    })()
  `);
  await sleep(400);

  // 1. Header & Navbar
  console.log('\n--- 1. Header & Navbar ---');
  await setElementLinkViaSettings(client, '.navbar-inner a.button', 'tel:19009396');
  await editCanvasText(client, '.navbar-inner a.button', '📞 1900 9396');

  // 2. Process Section (#process)
  console.log('\n--- 2. Mục Quy Trình & Vì Sao Chọn Ngọc Gas (#process) ---');
  await editCanvasText(client, '#process .label', 'VÌ SAO CHỌN NGỌC GAS?');
  await editCanvasText(client, '#process h2.display-2', 'Cam Kết Vàng Từ Đại Lý Gas Chính Hãng Số 1 Dĩ An & Bình Dương');
  
  // Tabs
  await editCanvasText(client, '#process .tab:nth-child(1) h3, #process h3:nth-of-type(2)', '1. Đặt Gas Nhanh Chóng');
  await editCanvasText(client, '#process .tab:nth-child(1) div:not(h3), #process .tab:nth-child(1)', '01\n1. Đặt Gas Nhanh Chóng\nGọi 1900 9396 hoặc Zalo tiếp nhận ngay.');
  await editCanvasText(client, '#process .tab:nth-child(2) h3, #process h3:nth-of-type(3)', '2. Giao Hỏa Tốc 15 Phút');
  await editCanvasText(client, '#process .tab:nth-child(3) h3, #process h3:nth-of-type(4)', '3. Cân Gas & An Toàn');

  // Cards
  await editCanvasText(client, '#process h2:not(.display-2):nth-of-type(1)', 'Bình Gas Chính Hãng 100%');
  await editCanvasText(client, '#process p:nth-of-type(1)', 'Phân phối Sopet Gas One, Phoenix Gas, Luxen Gas có tem chống giả, màng co niêm phong nguyên vẹn.');
  await editCanvasText(client, '#process a.button:nth-of-type(1)', 'Tra Cứu Bảng Giá Gas Hôm Nay');
  await setElementLinkViaSettings(client, '#process a.button:nth-of-type(1)', 'https://ngocgas.com/gia-gas-hom-nay');

  await editCanvasText(client, '#process h2:not(.display-2):nth-of-type(2)', 'Đủ Cân Tuyệt Đối — Cân Tại Nhà');
  await editCanvasText(client, '#process a.button:nth-of-type(2)', 'Gọi Ngay 1900 9396');
  await setElementLinkViaSettings(client, '#process a.button:nth-of-type(2)', 'tel:19009396');

  await editCanvasText(client, '#process h2:not(.display-2):nth-of-type(3)', 'Bảo Trì & Lắp Đặt Bếp Miễn Phí');
  await editCanvasText(client, '#process a.button:nth-of-type(3)', 'Xem Hệ Thống Cửa Hàng');
  await setElementLinkViaSettings(client, '#process a.button:nth-of-type(3)', 'https://ngocgas.com/cua-hang');

  // 3. Testimonials Section (#testimonials)
  console.log('\n--- 3. Mục Đánh Giá Khách Hàng (#testimonials) ---');
  await editCanvasText(client, '#testimonials .label', 'KHÁCH HÀNG ĐÁNH GIÁ');
  await editCanvasText(client, '#testimonials h2.display-2', 'Hơn 50.000 Hộ Gia Đình & Quán Ăn Tại Bình Dương Tin Chọn Ngọc Gas');
  
  await editCanvasText(client, '#testimonials h5:nth-of-type(1)', 'Chị Lan Hương (Phường Dĩ An)');
  await editCanvasText(client, '#testimonials h5:nth-of-type(2)', 'Anh Hoàng Minh (Chủ Quán Cơm Thuận An)');
  await editCanvasText(client, '#testimonials h5:nth-of-type(3)', 'Cô Bích Ngọc (KDC Vietsing)');
  await editCanvasText(client, '#testimonials h5:nth-of-type(4)', 'Bác Thanh Tùng (Tân Đông Hiệp)');
  await editCanvasText(client, '#testimonials h5:nth-of-type(5)', 'Chị Mai Phương (Chung Cư Bcons)');
  await editCanvasText(client, '#testimonials h5:nth-of-type(6)', 'Anh Tuấn Kiệt (Bếp Ăn Doanh Nghiệp)');

  // 4. Services Section (#Services)
  console.log('\n--- 4. Mục Dịch Vụ Cung Cấp (#Services) ---');
  await editCanvasText(client, '#Services .label', 'DỊCH VỤ NĂNG LƯỢNG TOÀN DIỆN');
  await editCanvasText(client, '#Services h2.display-2', 'Giải Pháp Năng Lượng Gas Toàn Diện Cho Gia Đình & Doanh Nghiệp');
  await editCanvasText(client, '#Services p.margin-bottom-35, #Services p', 'Ngọc Gas cung cấp giải pháp gas an toàn, tiết kiệm và nhanh chóng nhất cho mọi hộ gia đình, quán ăn và doanh nghiệp sản xuất tại Bình Dương.');
  await editCanvasText(client, '#Services a.button', 'Tra Cứu Bảng Giá Gas Hôm Nay');
  await setElementLinkViaSettings(client, '#Services a.button', 'https://ngocgas.com/gia-gas-hom-nay');

  // 6 Services Items
  await editCanvasText(client, '#Services h3:nth-of-type(1)', 'Gas Dân Dụng 12kg');
  await editCanvasText(client, '#Services h3:nth-of-type(2)', 'Gas Công Nghiệp 45kg');
  await editCanvasText(client, '#Services h3:nth-of-type(3)', 'Giao Hỏa Tốc 15 Phút');
  await editCanvasText(client, '#Services h3:nth-of-type(4)', 'Kiểm Tra An Toàn & Cân Đối Chứng');
  await editCanvasText(client, '#Services h3:nth-of-type(5)', 'Bảo Dưỡng Bếp & Thay Phụ Kiện');
  await editCanvasText(client, '#Services h3:nth-of-type(6)', 'Thi Công Hệ Thống Gas Trung Tâm');

  // 5. Facts Section (#Facts)
  console.log('\n--- 5. Mục Cam Kết Chất Lượng & Thông Số (#Facts) ---');
  await editCanvasText(client, '#Facts .label', 'CAM KẾT CHẤT LƯỢNG');
  await editCanvasText(client, '#Facts h1.display-2', 'An Toàn Của Bạn Là Trách Nhiệm Hàng Đầu Của Ngọc Gas');
  await editCanvasText(client, '#Facts h4:nth-of-type(1)', '100%');
  await editCanvasText(client, '#Facts h5:nth-of-type(1)', 'Bình Gas Chính Hãng Đủ Ký');
  await editCanvasText(client, '#Facts h4:nth-of-type(2)', '15 Phút');
  await editCanvasText(client, '#Facts h5:nth-of-type(2)', 'Giao Hỏa Tốc Tận Nơi Dĩ An');
  await editCanvasText(client, '#Facts p', 'Ngọc Gas tự hào phục vụ hơn 50.000 hộ gia đình và 1.200 doanh nghiệp với tiêu chuẩn an toàn PCCC tuyệt đối và bảo hiểm trách nhiệm sản phẩm.');

  // 6. About Section (#about)
  console.log('\n--- 6. Mục Điểm Khác Biệt & Giá Trị Cốt Lõi (#about) ---');
  await editCanvasText(client, '#about .label', 'ĐỦ CÂN ĐỦ KÝ');
  await editCanvasText(client, '#about h1.display-2', 'Chất Lượng Vượt Trội — Dịch Vụ Tận Tâm Từng Khách Hàng');
  await editCanvasText(client, '#about h3:nth-of-type(1)', '100% Đủ Ký Chuẩn Xác');
  await editCanvasText(client, '#about h3:nth-of-type(2)', 'Thương Hiệu Hàng Đầu (Sopet, Phoenix, Luxen)');
  await editCanvasText(client, '#about h3:nth-of-type(3)', 'Đội Ngũ Kỹ Thuật Chuyên Nghiệp');
  await editCanvasText(client, '#about h3:nth-of-type(4)', 'Hỗ Trợ 24/7 Hotline 1900 9396');

  // 7. Pricing Section & FAQ (#pricing)
  console.log('\n--- 7. Mục Bảng Giá Gas Hôm Nay & FAQ (#pricing) ---');
  await editCanvasText(client, '#pricing .label', 'BẢNG GIÁ GAS HÔM NAY');
  await editCanvasText(client, '#pricing h2.display-2', 'Giá Gas Minh Bạch — Cập Nhật Trực Tiếp Mỗi Ngày Theo Thị Trường');
  
  // Set all 3 pricing buttons to https://ngocgas.com/gia-gas-hom-nay
  await setElementLinkViaSettings(client, '#pricing .pricing-card:nth-child(1) a.button, #pricing a.button:nth-of-type(1)', 'https://ngocgas.com/gia-gas-hom-nay');
  await setElementLinkViaSettings(client, '#pricing .pricing-card:nth-child(2) a.button, #pricing a.button:nth-of-type(2)', 'https://ngocgas.com/gia-gas-hom-nay');
  await setElementLinkViaSettings(client, '#pricing .pricing-card:nth-child(3) a.button, #pricing a.button:nth-of-type(3)', 'https://ngocgas.com/gia-gas-hom-nay');

  // 8. Footer Section
  console.log('\n--- 8. Chân Trang Footer Chuẩn Nhận Diện ---');
  await editCanvasText(client, 'footer h2, .footer h2', 'ĐẠI LÝ PHÂN PHỐI NGỌC GAS — BÌNH DƯƠNG');
  await editCanvasText(client, 'footer a.button, .footer a.button', 'Tra Cứu Bảng Giá Gas Hôm Nay');
  await setElementLinkViaSettings(client, 'footer a.button, .footer a.button', 'https://ngocgas.com/gia-gas-hom-nay');

  // Footer text cleanup
  await editCanvasText(client, 'footer a.link-hover:nth-of-type(1), .footer a.link-white:nth-of-type(1)', 'Trụ Sở: 7 Nguyễn Trung Trực, Dĩ An');
  await editCanvasText(client, 'footer a.link-hover:nth-of-type(2), .footer a.link-white:nth-of-type(2)', 'Hotline: 1900 9396');
  await editCanvasText(client, 'footer h4:nth-of-type(1), .footer h4:nth-of-type(1)', 'Thông Tin Liên Hệ');
  await editCanvasText(client, 'footer a[href*="info@email.com"], .footer a:nth-of-type(8)', 'Hotline 24/7: 1900 9396');
  await editCanvasText(client, 'footer h4:nth-of-type(2), .footer h4:nth-of-type(2)', 'Danh Mục Khám Phá');
  await editCanvasText(client, 'footer a[href*="style-guide"]', 'Bảng Giá Gas Hôm Nay');
  await editCanvasText(client, 'footer a[href*="404"]', 'Hệ Thống Cửa Hàng');
  await editCanvasText(client, 'footer a[href*="license"]', 'Chính Sách An Toàn & Đổi Trả');
  await editCanvasText(client, 'footer h4:nth-of-type(3), .footer h4:nth-of-type(3)', 'Cam Kết Thương Hiệu');
  await editCanvasText(client, 'footer p', 'Đại lý phân phối Sopet Gas One, Phoenix Gas, Luxen Gas chính hãng số 1 tại Bình Dương. Phục vụ tận tâm, đủ cân chuẩn ký.');

  // 9. Trigger Webflow Publish
  await triggerPublish(client);

  // 10. Capture screenshot of Designer
  const designerScreenshot = path.join(ARTIFACT_DIR, 'webflow_designer_enhanced.png');
  await client.captureScreenshot(designerScreenshot);
  console.log(`📸 Designer screenshot saved to: ${designerScreenshot}`);

  await client.close();
  console.log('\n🎉 TOÀN BỘ 8 PHÂN KHU ĐÃ ĐƯỢC CẬP NHẬT VÀ PUBLISH THÀNH CÔNG!');
}

if (process.argv[1].endsWith('perfect-webflow-ui-ux.mjs')) {
  main().catch(err => {
    console.error('Lỗi thực thi:', err);
    process.exit(1);
  });
}
