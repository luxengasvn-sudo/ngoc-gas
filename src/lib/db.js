import mysql from 'mysql2/promise';

let pool;

if (!global.mysqlPool) {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not defined');
  }
  global.mysqlPool = mysql.createPool({
    uri: connectionString,
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0
  });
}
pool = global.mysqlPool;

export default pool;
