const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();
const middlewares = require('./middlewares');

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
);
app.use(morgan('common'));
app.use(helmet());

app.get('/', (req, res) => {
  res.json({ hello: 'world!' });
});

app.use(middlewares.errorHandler);
app.use(middlewares.notFound);

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log('server is now listening on port ', server.address().port);
});

console.log(process.env.NODE_ENV);
