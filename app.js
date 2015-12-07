//lib modules
var express = require("express");
var logger=require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require('path');
/*var session = require('express-session');
 var MongoStore = require('connect-mongo')(session);*/

//modules defined by myself
var getMenu=require('./api/menu/get-menu');

var app = express();

// Configuration
app.use(express.static(path.join(__dirname, 'app')));
app.set('views', __dirname + '/app');
app.engine('html', require('ejs').renderFile);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
/*app.use(bodyParser());*/
app.use('/menu',getMenu);

app.get('/', function(request, response) {
    response.render('index.html');
});

module.exports = app;