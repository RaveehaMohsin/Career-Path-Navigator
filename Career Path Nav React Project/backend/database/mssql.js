require('dotenv').config();
const sql = require('mssql');

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

sql.connect(config)
    .then(() => console.log('Connected to SQL Server - (Career Path Navigator DB Connected)'))
    .catch(err => console.error('Database connection error:', err));
