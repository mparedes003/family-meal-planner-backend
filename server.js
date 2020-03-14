const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRouter = require('./api/auth/auth-router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/auth', authRouter);

server.get('/', (req, res) => {
  res.status(200).json({ Success: 'We have lift off!!!' });
});

module.exports = server;
