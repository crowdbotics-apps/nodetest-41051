var express = require('express');
var http = require('http');
var path = require('path');
var reload = require('reload');
var bodyParser = require('body-parser');
var logger = require('morgan');
var watch = require('watch');
var sequelize = require('sequelize');
var PrettyError = require('pretty-error');
var cookieParser = require('cookie-parser');
var cookieEncrypter = require('cookie-encrypter');
var models = require("./server/models/");
var session = require('express-session');


var cookieSecretKey = process.env.COOKIE_SECRET_KEY;
var sessionSecretKey = process.env.SESSION_SECRET_KEY;
var app = express();


app.get('/', (req, res) => {
  res.send('Hello World!')
})



var config = require('./server/config/config.js');

// Initialize pretty-error
var pe = new PrettyError();
pe.start();

// // Set port for heroku deployment
app.set('port', config.port);
app.use(logger('dev'));


app.use(bodyParser.urlencoded({
  extended: true
}));


app.use(cookieParser(cookieSecretKey));
app.use(cookieEncrypter(cookieSecretKey));
app.use(session({
  secret: sessionSecretKey,
  resave: false,
  saveUninitialized: true
}));

// // Index Routes
// require('./routes/index.js')(app);

// // Sync models THEN start server
// models.sequelize.sync({
//   force: process.env.DB_FORCE === 'true'
// }).then(function () {

  var server = http.createServer(app);
  server.listen(app.get('port'), function () {
    console.log('App is listening on port ' + config.port + '! Visit localhost:' + config.port + ' in your browser.');
  });

//   // Reload code here
//   var reloadServer = reload(server, app);

// });
