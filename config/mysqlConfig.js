import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process?.env?.HOST,
  user: process?.env?.USER,
  password: process?.env?.MYPASSWORD,
  database: process?.env?.DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
    } else {
        console.log('Connected to MySQL database');
        connection.release();
    }
});

export default pool;