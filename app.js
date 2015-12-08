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
    appid: 'wx8802127829e580bb',
    encodingAESKey: 'k2XZcERrRAaqKA4gFu0O6mSar61bVa8ZvYWTto9Zhbj'
//    appsecret:'6b5c8cd47198df0fcc8734cc08b05789'
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

app.get('/app', function(request, response) {
    response.render('index.html');
});

app.use('/wechat', wechat(config,function(req,res,next){
    // 微信输入信息都在req.weixin上
    var message=req.weixin;

    switch(message.type){
        case 'click':
            if(message.key=='V1001_TODAY_MUSIC"'){
                res.redirect('/app');
            }
            break;
    }
}));

module.exports = app;