const mysql = require('mysql2');

const pool = mysql.createPool({
    multipleStatements: true,
    host: process.env.DATABASE_HOST_PAINEL,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER_PAINEL,
    password: process.env.DATABASE_PASSWORD_PAINEL,
    database: process.env.DATABASE_PAINEL,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0
});

pool.getConnection(function (err) {
    if (err) return console.log(err);
    console.log('conectou');
});

module.exports = pool;