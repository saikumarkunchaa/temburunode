var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var newsRouter = require('./routes/news');
var expressValidator = require('express-validator');
var expressSession = require('express-session');
var multer = require('multer');
var app = express();
var upload = multer();
app.use(upload.array()); 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(expressSession({secret: 'krunal', saveUninitialized: false, resave: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/cssbower', express.static(__dirname + '/public/adminlte/bower_components'));
app.use('/cssdist', express.static(__dirname + '/public/adminlte/dist/css/'));
app.use('/jsdist', express.static(__dirname + '/public/adminlte/dist/'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/news', newsRouter);

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