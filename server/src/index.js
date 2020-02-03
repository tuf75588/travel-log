const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const middlewares = require('./middlewares');
require('dotenv').config();

const app = express();
const db = mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
});

app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
);
app.use(morgan('common'));
app.use(helmet());

app.get('/', async (req, res) => {
  await db.createCollection('logs', {});
  res.json({ hello: 'world!' });
});

app.use(middlewares.errorHandler);
app.use(middlewares.notFound);

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log('server is now listening on port ', server.address().port);
});

console.log(process.env.NODE_ENV);
