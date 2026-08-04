import mysql from 'mysql2/promise';

let pool;

if (!global.mysqlPool) {
  const connectionString = process.env.DATABASE_URL || 'mysql://user_fdc43e65776d:X1hCZExuJbFvdRaCcO5kaXHO4o9gdy1F@tinhgon.xyz:30050/ngoc_gas';
  global.mysqlPool = mysql.createPool({
    uri: connectionString,
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0
  });
}
pool = global.mysqlPool;

export default pool;
