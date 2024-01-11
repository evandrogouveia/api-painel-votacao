const connectionsMultiples = require('../../database/connectionsMultiples');

module.exports = {

    //getUserAll
    async getUserAllCamara(req, res) {
        
        const pool = await connectionsMultiples.getConnectionPool(req);

        const selectUsers = `SELECT * FROM agents`;

        pool.query(selectUsers, [], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao obter usuários', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    },

     //retorna sessões limitadas
    async getSessionsLimited(req, res) {

        const pool = await connectionsMultiples.getConnectionPool(req);

        const selectSession = `SELECT * FROM sessions ORDER BY exercise DESC, number DESC LIMIT 3`;

        pool.query(selectSession, [], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao obter dados', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    },
}