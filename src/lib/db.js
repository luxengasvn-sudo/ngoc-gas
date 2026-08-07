import mysql from 'mysql2/promise';

function getPool() {
  if (!global.mysqlPool) {
    const connectionString = process.env.DATABASE_URL || 'mysql://localhost:3306/ngoc_gas';
    global.mysqlPool = mysql.createPool({
      uri: connectionString,
      connectionLimit: 10,
      waitForConnections: true,
      queueLimit: 0
    });
  }
  return global.mysqlPool;
}

const db = {
  query: (...args) => getPool().query(...args),
  execute: (...args) => getPool().execute(...args),
  getConnection: (...args) => getPool().getConnection(...args)
};

export default db;
