const connectionsMultiples = require('../../database/connectionsMultiples');
const authController = require('../../controllers/login/authController');

module.exports = {
     async newConfiguracoes(req, res) {
        const minutos = req.body.minutos;
        const tempoTotal = req.body.tempoTotal;
        const votacaoEmBloco = req.body.votacaoEmBloco;
        const votacaoSecreta = req.body.votacaoSecreta;
       
        const newConfiguracoes = `INSERT INTO configuracoes(
            minutos,
            tempoTotal,
            votacaoEmBloco,
            votacaoSecreta 
            ) VALUES (
                '${JSON.stringify(minutos)}',
                '${tempoTotal}',
                '${votacaoEmBloco}',
                '${votacaoSecreta}'
            )`;

        const pool = await connectionsMultiples.getConnectionPool(req);

        pool.query(newConfiguracoes, [], function (error, resultsRegister, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao cadastrar dados', error: error });
            } else {
                res.status(200).json({ status: 1, message: 'sucesso!' });
            }
        });
    },

    async getConfiguracoes(req, res) {
        const selectConfiguracoes = `SELECT * FROM configuracoes`;

        const pool = await connectionsMultiples.getConnectionPool(req);

        pool.query(selectConfiguracoes, [], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao obter dados', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    },

    async updateConfiguracoes(req, res) {
        const id = parseInt(req.params.id);
        const minutos = req.body.minutos;
        const tempoTotal = req.body.tempoTotal;
        const votacaoEmBloco = req.body.votacaoEmBloco;
        const votacaoSecreta = req.body.votacaoSecreta;

        const updateConfiguracoes = 'UPDATE `configuracoes` SET `minutos`= ?,' +
            '`tempoTotal`= ?,' +
            '`votacaoEmBloco`= ?,' +
            '`votacaoSecreta`= ?' +
            ' WHERE `configuracoes`.`ID`= ?';

        const pool = await connectionsMultiples.getConnectionPool(req);

        pool.query(updateConfiguracoes, 
            [
                JSON.stringify(minutos), 
                tempoTotal,
                votacaoEmBloco,
                votacaoSecreta,
                id
            ], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro atualizar dados', error: error });
            } else {
                res.status(200).json(results);
            }
        });

    },

    async deleteConfiguracoes(req, res) {
        const id = parseInt(req.params.id);
        const deleteConfiguracoes = `DELETE FROM configuracoes WHERE ID = ?`;

        const pool = await connectionsMultiples.getConnectionPool(req);

        pool.query(deleteConfiguracoes, [id], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao excluir configuracoes', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    }
   
}
