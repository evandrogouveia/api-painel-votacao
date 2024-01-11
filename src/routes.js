const userController = require('../controllers/login/userController');
const authController = require('../controllers/login/authController');
const configuracoesController = require('../controllers/painel-votacao/configuracoesController');
const dadosCamaraController = require('../controllers/painel-votacao/dadosCamaraController');

const router = require('express').Router();

router.get('/', (req, res) => {});

/*--------------------------- ROTAS DE USUÁRIO ---------------------------*/
//adiciona um novo usuário
router.post('/register', userController.register);
//login do usuário
router.post('/login', userController.login);
//obtem o usuário autenticado
router.get('/user', authController.verifyToken, userController.getUser);
//obtem todos os usuários
router.get('/user-all', userController.getUserAll);
//fazer logout
router.post('/logout', userController.logout);

/*--------------------------- ROTAS DE DADOS DA CAMARA ---------------------------*/
router.get('/user-all-camara', dadosCamaraController.getUserAllCamara);

/*--------------------------- ROTAS DE CONFIGURAÇÕES ---------------------------*/
//adiciona uma nova configuração
router.post('/new-configuracoes', configuracoesController.newConfiguracoes);
//obtem configurações
router.get('/all-configuracoes', configuracoesController.getConfiguracoes);
//atualiza configurações
router.patch('/update-configuracoes/:id', configuracoesController.updateConfiguracoes);
//deleta as configurações
router.delete('/delete-configuracoes/:id', configuracoesController.deleteConfiguracoes);

/*--------------------------- ROTAS DE SESSÕES ---------------------------*/
//obtem sessoes limitadas
router.get('/all-session-limited', dadosCamaraController.getSessionsLimited);

module.exports = router;