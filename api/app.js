var express       = require('express');
var bodyParser    = require('body-parser');
var path          = require("path")
var cookieParser  = require('cookie-parser');
var mongoose      = require('mongoose');
var passport	  = require('passport');
var cors          = require('cors');
var app           = express();
var morgan        = require('morgan');

// TEST DATABASE
//var configDb = require('../data/mockData'); // get db config file
//mongoose.Promise = global.Promise;
//mongoose.connect(configDb.database);

//add dependencies to stack
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.static(path.join(__dirname, '../client3/'))); //connect to Angular client
app.use(cookieParser());
app.use(cors()); 
app.use(morgan('dev'));
app.use(passport.initialize());


//routes
//var routes = require('./src/routes');
//app.use('/', routes);

//error handler
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    /*res.send(err.status || 500);
    res.send('error', {
      message: err.message,
      error: err
    });*/
    console.log(err);
  });
}

module.exports = app;