

//var mysql = require('mysql');





const morgan = require('morgan');
const helmet = require('helmet');
const express = require('express');
const app = express();
const logger = require('./middleware/logger');
//const Joi = require('joi');
//var mysql = require('mysql');
const user = require('./api/routes/users');
const stock = require('./api/routes/stocks');
const item = require('./api/routes/items');
const shop = require('./api/routes/shops');
const profile = require('./api/routes/profiles');






app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use('/neerseva/users', user);
app.use('/neerseva/stocks', stock);
app.use('/neerseva/items', item);
app.use('/neerseva/shops', shop);
app.use('/neerseva/profiles', profile);



app.use((req, res, next) => {
  const error = new Error('Invalid Url');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

//app.listen(3000, () => console.log('listening on port 3000...'));

const port = process.env.PORT || 3000 
app.listen(port, () => console.log(`listening on port ${port}...`));
