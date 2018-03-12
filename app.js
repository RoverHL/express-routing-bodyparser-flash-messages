// app.js
var express = require('express');
var path = require('path');
var photos = require('./routes/photos');
var bodyparser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

// set up 'utility' middleware
var app = express();
app.use(cookieParser('cscie31-secret'));
app.use(session({
  secret:"cscie31",
  resave: "true",
  saveUninitialized: "true"
}));
app.use(bodyparser.urlencoded({extended: false}));

// use pug view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// set up routes and routers
app.use('/static', express.static(path.join(__dirname, 'public')));
app.get('/', (req, res)=>{
  res.end("root requested")
});
app.use('/photos', photos);

// catch any remaining routing errors
app.use((req, res, next)=>{
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;
