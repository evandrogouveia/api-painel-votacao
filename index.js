const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const http = require('http').Server(app);
//const io = require('socket.io')(http, {path:"/api-camara/socket.io" ,cors: { origins: ['*'] } });
const io = require('socket.io')(http, {cors: { origins: ['*'] } });

var cors = require('cors');
dotenv.config();

app.use(cors({origin: '*'}));

io.on('connection', (socket) => {
    socket.on('standbyPainel', (dados) => {
        io.emit('standbyPainel', dados);
    });

    socket.on('dadosPainel', (dados) => {
        io.emit('dadosPainel', dados);
    });

    socket.on('dadosVotacaoBloco', (dados) => {
        io.emit('dadosVotacaoBloco', dados);
    });

    socket.on('removeItemIdStorage', (dados) => {
        io.emit('removeItemIdStorage', dados);
    });

    socket.on('dadosInscricao', (dados) => {
        io.emit('dadosInscricao', dados);
    });

    socket.on('timer', (dados) => {
        io.emit('timer', dados);
    });

    socket.on('quorum', (dados) => {
        io.emit('quorum', dados);
    });

    socket.on('modalQuorum', (dados) => {
        io.emit('modalQuorum', dados);
    });

    socket.on('disconnect', () => {
        console.log(`Socket ${socket.id} has just disconnected. `);
    });

    console.log(`Socket ${socket.id} has connected. `);
})

app.use(bodyParser.json({ limit: '250mb' }));
app.use(bodyParser.urlencoded({ limit: '250mb', extended: true }));
app.use(cookieParser());

const router = require('./src/routes');

app.use(router);

//app.use('/api-camara', router);
app.use('/', cors(), router);

http.listen(port);
console.log('API funcionando!');