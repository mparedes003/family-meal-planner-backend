const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRouter = require('./api/auth/auth-router');
const usersRouter = require('./api/users/users-router');
const ingredientsRouter = require('./api/ingredients/ingredients-router');
const unitsRouter = require('./api/units/units-router');
const recipesRouter = require('./api/recipes/recipes-router');
const tagsRouter = require('./api/tags/tags-router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/auth', authRouter);

server.use('/users', usersRouter);
server.use('/ingredients', ingredientsRouter);
server.use('/units', unitsRouter);
server.use('/recipes', recipesRouter);
server.use('/tags', tagsRouter);

server.get('/', (req, res) => {
  res.status(200).json({ Success: 'We have lift off!!!' });
});

module.exports = server;
