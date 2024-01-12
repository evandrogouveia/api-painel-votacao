const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const http = require('http').Server(app);
//const io = require('socket.io')(http, {path:"/api-camara/socket.io" ,cors: { origins: ['*'] } });
const io = require('socket.io')(http, { cors: { origins: ['*'] } });

var cors = require('cors');
dotenv.config();

app.use(cors({ origin: '*' }));

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

    let countdownInterval;
    let countdown;
    let segundos;

    socket.on('timer', (dados) => {
        console.log(dados)
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }
       
        if (dados.status === 'start') {
            countdown = dados.minutes;
            segundos = countdown * 60;
            countdownInterval = startCountDownInterval();
        }

        if (dados.status === 'pause') {
            clearInterval(countdownInterval);
        }

        if (dados.status === 'resume') {
            countdown = segundos
            countdownInterval = startCountDownInterval();
        }

    });

    

    function startCountDownInterval() {
        let contagemRegressiva = true;
        let dataTimer;
        
        return setInterval(() => {
            
            const minutosRestantes = Math.floor(segundos / 60);
            const segundosRestantes = segundos % 60;

            if (minutosRestantes !== null && segundosRestantes !== null) {
                if (contagemRegressiva) {
                    dataTimer = { minutos: pad(minutosRestantes), segundos: pad(segundosRestantes), type: 'minus' }
                    io.emit('timer', dataTimer);
                } else {
                    dataTimer = { minutos: pad(minutosRestantes), segundos: pad(segundosRestantes), type: 'plus' }
                    io.emit('timer', dataTimer);
                }
            }

            if (segundos === 0) {
                if (contagemRegressiva) {
                    contagemRegressiva = false;
                } else {
                    clearInterval(countdownInterval);
                }
            }

            segundos += contagemRegressiva ? -1 : 1;

        }, 1000);
    }

    function pad(val) {
        return val > 9 ? val : '0' + val
    }

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

app.use('/', cors(), router);

http.listen(port);
console.log('API funcionando!');