const mysql = require('mysql2/promise');

const connectionString = 'mysql://user_fdc43e65776d:X1hCZExuJbFvdRaCcO5kaXHO4o9gdy1F@tinhgon.xyz:30050/ngoc_gas';

async function run() {
  const connection = await mysql.createConnection(connectionString);
  console.log('Connected to MySQL successfully!');

  // Search products for "Phú Quốc" or "Đảo Ngọc"
  const [products] = await connection.query('SELECT id, name, description, slug FROM products');
  console.log('\n--- Checking Products ---');
  products.forEach(p => {
    if (p.name.includes('Phú Quốc') || p.name.includes('Đảo Ngọc') || p.description.includes('Phú Quốc') || p.description.includes('Đảo Ngọc')) {
      console.log(`Product ID ${p.id} (${p.name}):`);
      console.log(`- Slug: ${p.slug}`);
      if (p.name.includes('Phú Quốc') || p.name.includes('Đảo Ngọc')) console.log(`  Name: ${p.name}`);
      if (p.description.includes('Phú Quốc')) console.log('  Description contains: "Phú Quốc"');
      if (p.description.includes('Đảo Ngọc')) console.log('  Description contains: "Đảo Ngọc"');
    }
  });

  // Search posts for "Phú Quốc" or "Đảo Ngọc"
  const [posts] = await connection.query('SELECT id, title, content FROM posts');
  console.log('\n--- Checking Posts ---');
  posts.forEach(p => {
    if (p.title.includes('Phú Quốc') || p.title.includes('Đảo Ngọc') || p.content.includes('Phú Quốc') || p.content.includes('Đảo Ngọc')) {
      console.log(`Post ID ${p.id} (${p.title}):`);
      if (p.title.includes('Phú Quốc') || p.title.includes('Đảo Ngọc')) console.log(`  Title: ${p.title}`);
      if (p.content.includes('Phú Quốc')) console.log('  Content contains: "Phú Quốc"');
      if (p.content.includes('Đảo Ngọc')) console.log('  Content contains: "Đảo Ngọc"');
    }
  });

  // Search settings for "Phú Quốc" or "Đảo Ngọc"
  const [settings] = await connection.query('SELECT id, setting_key, setting_value FROM settings');
  console.log('\n--- Checking Settings ---');
  settings.forEach(s => {
    if (s.setting_value.includes('Phú Quốc') || s.setting_value.includes('Đảo Ngọc')) {
      console.log(`Setting ID ${s.id} (${s.setting_key}):`);
      console.log(`  Value: ${s.setting_value}`);
    }
  });

  // Search stores for "Phú Quốc" or "Đảo Ngọc"
  const [stores] = await connection.query('SELECT id, name, address FROM stores');
  console.log('\n--- Checking Stores ---');
  stores.forEach(s => {
    if (s.name.includes('Phú Quốc') || s.name.includes('Đảo Ngọc') || s.address.includes('Phú Quốc') || s.address.includes('Đảo Ngọc')) {
      console.log(`Store ID ${s.id} (${s.name}):`);
      console.log(`  Address: ${s.address}`);
    }
  });

  await connection.end();
}

run().catch(err => console.error(err));
