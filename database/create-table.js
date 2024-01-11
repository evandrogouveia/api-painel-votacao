const mysql = require('mysql2');

const pool = mysql.createPool({
    multipleStatements: true,
    host: '191.101.234.230',
    port: '3306',
    user: 'painel_db',
    password: 'fWjxpJSBNH8FJMj5',
    database: 'painel_db',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0
});

pool.getConnection(function (err) {
    if (err) return console.log(err);
    console.log('conectou');
    createTable(pool);
});

function createTable(conn) {

    /* CRIAR TABELA DE CONFIGURAÇÔES */
    const sqlConfiguracoes = "CREATE TABLE IF NOT EXISTS configuracoes (\n" +
    "ID int NOT NULL AUTO_INCREMENT,\n" +
    "minutos JSON,\n" +
    "tempoTotal varchar(50),\n" +
    "votacaoEmBloco BOOLEAN,\n" +
    "votacaoSecreta BOOLEAN,\n" +
    "PRIMARY KEY (ID)\n" +
    ");";

     /* CRIAR TABELA DE USUÁRIOS */
     const sqlUsuarios = "CREATE TABLE IF NOT EXISTS usuarios (\n" +
     "ID int NOT NULL AUTO_INCREMENT,\n" +
     "agentID int,\n" +
     "nome varchar(150),\n" +
     "email varchar(150),\n" +
     "senha varchar(250),\n" +
     "permissao varchar(100),\n" +
     "PRIMARY KEY (ID)\n" +
     ");";
 

    conn.query(sqlUsuarios, function (error, results, fields) {
        if (error) return console.log(error);
        console.log('criou tabela');
        pool.end();
    });

}