//lib modules
var express = require("express");
var logger=require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require('path');
var wechat=require('wechat');

/*var session = require('express-session');
 var MongoStore = require('connect-mongo')(session);*/

//modules defined by myself
var getMenu=require('./api/menu/get-menu');

//wechat config
var config={
    token: 'order_food_wechat_hybrid_app',
    appid: 'wx7515064e9a56542e',
    encodingAESKey: 'k2XZcERrRAaqKA4gFu0O6mSar61bVa8ZvYWTto9Zhbj'
};

var app = express();

// Configuration
app.use(express.static(path.join(__dirname, 'app')));
app.set('views', __dirname + '/app');
app.engine('html', require('ejs').renderFile);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.query());
/*app.use(bodyParser());*/
app.use('/menu',getMenu);

/*app.get('/app', function(request, response) {
    response.render('index.html');
});*/

app.use('/app', wechat(config,function(req,res,next){
    // 微信输入信息都在req.weixin上
    var message=req.weixin;
    res.render('index.html');
}));

module.exports = app;