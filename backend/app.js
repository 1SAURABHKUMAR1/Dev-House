require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const nocache = require('nocache');
const { Server } = require('socket.io');
const httpsServer = require('http').createServer(app);
const socketHandler = require('./Socket/socket');

app.use(morgan('tiny'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
const corsOption = {
    origin: process.env.CLIENT_URL,
    credentials: true,
};
app.use(cors(corsOption));
app.use(helmet());
app.use(nocache());
app.use(cookieParser());
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
    }),
);

app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('home');
});

const home = require('./Routes/home');
const user = require('./Routes/user');
const rooms = require('./Routes/rooms');

app.use('/api/v1', home);
app.use('/api/v1', user);
app.use('/api/v1', rooms);

const io = new Server(httpsServer, {
    cors: {
        origin: process.env.CLIENT_URL,
        methods: ['GET', 'POST', 'PUT', 'OPTIONS'],
        credentials: true,
    },
});
socketHandler(io);

exports.app = app;
exports.httpsServer = httpsServer;
