var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var
var app = express();


var mongoose = require('mongoose');
let options = {
  db: {native_parser: true},
  server: {poolSize: 5},
  user: 'jerry',
  pass: 'rokmc856',
    useNewUrlParser: true
};


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/jerryDB', options).then(
    () => {
      console.log("connect db hell successfully");
    },
    err => {
      console.log('connect failed. error: ${err}');
    }
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
