const mysql = require('mysql2');
const jwt = require('jsonwebtoken');

const connectionPools = {};

async function getConnectionPool(req) {

    let userEmail = '';

    jwt.verify(req.headers.authorization, "secret", function (err, decoded) {
        if (decoded) {
            req.user = decoded.data;
            userEmail = req.user.email;
            
        }
    });
    
    if (!connectionPools[userEmail]) {
     
        const userCredentialsDb = getUserCredentialsDb(userEmail);
        const pool = mysql.createPool({
            multipleStatements: true,
            host: process.env.DATABASE_HOST,
            port: process.env.DATABASE_PORT,
            user: userCredentialsDb.user,
            password: userCredentialsDb.password,
            database: userCredentialsDb.database,
            waitForConnections: true,
            connectionLimit: 10,
            maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
            idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
            queueLimit: 0
        });

        connectionPools[userEmail] = pool;

        connectionPools[userEmail].getConnection(function (err) {
            if (err) return console.log(err);
            console.log('conectou multiplos');
        });
    }

    return connectionPools[userEmail];
}

function getUserCredentialsDb(userEmail) {
    if (userEmail === 'admin@camaracrateus.ce.gov.br') {
        return {
            database: process.env.DATABASE_CRATEUS,
            user: process.env.DATABASE_USER_NAME_CRATEUS,
            password: process.env.DATABASE_PASSWORD_CRATEUS
        }
    } else if (userEmail === 'admin@camaranovarussas.ce.gov.br') {
        return {
            database: process.env.DATABASE_NOVA_RUSSAS,
            user: process.env.DATABASE_USER_NAME_NOVA_RUSSAS,
            password: process.env.DATABASE_PASSWORD_NOVA_RUSSAS
        }
    } else if (userEmail === 'admin@camaratamboril.ce.gov.br') {
        return {
            database: process.env.DATABASE_TAMBORIL,
            user: process.env.DATABASE_USER_NAME_TAMBORIL,
            password: process.env.DATABASE_PASSWORD_TAMBORIL
        }
    } else if (userEmail === 'admin@camaraindependencia.ce.gov.br') {
        return {
            database: process.env.DATABASE_INDEPENDENCIA,
            user: process.env.DATABASE_USER_NAME_INDEPENDENCIA,
            password: process.env.DATABASE_PASSWORD_INDEPENDENCIA
        }
    }
}

module.exports = { getConnectionPool };