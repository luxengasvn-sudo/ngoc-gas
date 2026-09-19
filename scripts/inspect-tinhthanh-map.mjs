async function getCoords(slug) {
  try {
    const res = await fetch(`https://tinhthanhvn.com/province/ho-chi-minh/${slug}`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });
    const html = await res.text();
    const m = html.match(/"latitude":\s*(\d+\.\d+),\s*"longitude":\s*(\d+\.\d+)/);
    if (m) {
      console.log(`${slug}: lat = ${m[1]}, lng = ${m[2]}`);
    } else {
      console.log(`${slug}: no geo found`);
    }
  } catch (e) {
    console.error(slug, e.message);
  }
}

async function run() {
  await getCoords('xa-thuong-tan');
  await getCoords('phuong-di-an');
  await getCoords('phuong-an-dong');
  await getCoords('phuong-ben-cat');
  await getCoords('phuong-binh-duong');
}

run();
