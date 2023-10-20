// const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const { errors } = require('celebrate');
const cors = require('./middlewares/cors');
// const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const handleErrors = require('./utils/handleErrors');
const router = require('./routes');

const { PORT = 3001, MY_DB = 'mongodb://127.0.0.1:27017/vycohort69' } = process.env;

const app = express();
app.use(cors);
mongoose.connect(MY_DB, {
  useNewUrlParser: true,
}).then(() => {
  console.log('connected to db');
}).catch(() => {
  console.log('error db');
});

dotenv.config();

app.use(cookieParser());
app.use(bodyParser.json());

app.use(requestLogger);
// app.use(cors({
//   origin: [
//     'https://localhost:3000',
//     'http://localhost:3000',
//   ],
//   credentials: true,
//   maxAge: 30,
// }));
app.use(router);
app.use(errorLogger);

app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  console.log('hi port 3001');
});
