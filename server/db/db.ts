import mysql from 'mysql2/promise';

// 데이터베이스 연결 설정
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 50, // 동시 연결 제한
  queueLimit: 0 // 대기열 제한 (0은 무제한)
});

export const db = pool;
