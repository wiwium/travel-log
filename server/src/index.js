
const express = require('express');
const morgen = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const middlewares = require('./middlewares');
const logs = require('./api/logs');

const app = express();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});

app.use(morgen('common'));
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: '🌏🌎🌍',
  });
});

app.use('/api/logs', logs);

app.use(middlewares.notFound);

app.use(middlewares.errorHandler);

const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`listening at port ${port}`);
});
