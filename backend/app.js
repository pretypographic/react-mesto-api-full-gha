const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { errors } = require('celebrate');
require('dotenv').config();

const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/router');
const errorHandler = require('./middlewares/error-handler');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);
app.use(cookieParser());
app.use(helmet());
app.use(express.json());

app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server started on port: ${PORT}`);
});
