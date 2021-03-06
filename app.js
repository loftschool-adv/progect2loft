'use strict';

let fs = require('fs');
let path = require('path');
let express = require('express');
let pug = require('pug');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let mongoose = require('./modules/libs/mongoose.js');
let bodyParser = require('body-parser');
let session = require('express-session');
let MongoStore = require('connect-mongo')(session);
let log = require('./modules/libs/log')(module);
let creatUsersFolder = require('./modules/createUserFolder.js');


let app = express();

//let server = require('./server.js');

// Create session
app.use(session({
  secret: 'photo',
  store : new MongoStore({mongooseConnection: mongoose.connection}),
  saveUnitialized: false,
  resave: false,
  saveUninitialized: false
}));

// view engine setup
app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/img/', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'users')));


// Генерируем id
/*app.param('id', function (req, res, next, id) {
  next();
});*/

//===маршруты===
app.use('/', require('./routes/index.js'));
app.use('/:id', require('./routes/main-page.js'));
app.use('/:id', require('./routes/user.js'));
app.use('/:id/albums', require('./routes/album.js'));
app.use('/:id/components', require('./routes/components.js'));
app.use('/:id/search', require('./routes/search.js'));
app.use('/:id/user', require('./routes/user.js'));

// // debug
// app.use('/', require('./routes/login.js'));
// app.use('/main', require('./routes/main-page.js'));
// app.use('/album', require('./routes/album.js'));
// app.use('/upload', require('./routes/oldUpload.js'));
// app.use('/components', require('./routes/components.js'));
// app.use('/search', require('./routes/search.js'));
// app.use('/user', require('./routes/user.js'));
//=============

// catch 404 and forward to error handler


app.use((req, res, next)  => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

