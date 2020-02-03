const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const middlewares = require('./middlewares');
require('dotenv').config();

const app = express();
mongoose.connect(`mongodb://${process.env.MONGO_URL}/`, {
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  dbName: process.env.DB_NAME,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// #region
const { connection: db } = mongoose;
db.on('connected', () => {
  console.log('database connected!');
});
// #endregion

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
