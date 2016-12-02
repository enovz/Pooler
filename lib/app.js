const express       = require('express');
const bodyParser    = require('body-parser');
const path          = require("path")
const cookieParser  = require('cookie-parser');
const mongoose      = require('mongoose');
const passport	    = require('passport');
const cors          = require('cors');
const app           = express();
const morgan        = require('morgan');

// TEST DATABASE
const configDb = require('./config/database'); // get db config file
mongoose.Promise = global.Promise;
mongoose.connect(configDb.database);

//add dependencies to stack
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../../../pooler-client/'))); //connect to Angular client
app.use(cookieParser());
app.use(cors()); 
app.use(morgan('dev'));
app.use(passport.initialize());


//routes
let routes = require('./api/routes');
app.use('/', routes);

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