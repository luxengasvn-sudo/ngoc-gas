const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function capture() {
  const url = process.argv[2] || 'http://localhost:3000/tinh-thanh/province/ho-chi-minh/phuong-di-an';
  const outPath = process.argv[3] || path.join(__dirname, '..', 'screenshot.png');
  const isMobile = process.argv.includes('--mobile');
  const isFullPage = process.argv.includes('--full');

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  try {
    const page = await browser.newPage();
    if (isMobile) {
      await page.setViewport({ width: 393, height: 852, isMobile: true, hasTouch: true });
    } else {
      await page.setViewport({ width: 1280, height: 900 });
    }

    console.log(`Navigating to: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 25000 }).catch(() => {});
    await new Promise(r => setTimeout(r, 4000)); // Đợi render client-side hoàn toàn

    const dir = path.dirname(outPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    await page.screenshot({ path: outPath, fullPage: isFullPage });
    console.log(`Screenshot saved successfully: ${outPath}`);
  } catch (err) {
    console.error(`Screenshot error: ${err.message}`);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
}

capture();
