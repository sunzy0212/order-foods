//lib modules
var express = require("express");
var logger=require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require('path');
var wechat=require('wechat');
var OAuth=require('wechat-oauth');

/*var session = require('express-session');
 var MongoStore = require('connect-mongo')(session);*/

//modules defined by myself
var getMenu=require('./api/menu/get-menu');

//wechat config
var config={
    token: 'order_food_wechat_hybrid_app',
    appid: 'wx8802127829e580bb',
    encodingAESKey: 'k2XZcERrRAaqKA4gFu0O6mSar61bVa8ZvYWTto9Zhbj',
    appsecret:'d4624c36b6795d1d99dcf0547af5443d'
};

var app = express();
var oauth=new OAuth(config.appid,config.appsecret);

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

//微信访问
app.get('/app', function(req, res) {
    var code=req.query.code;
    oauth.getAccessToken(code,function(err,ret){
        var accessToken=ret.data.access_token;
        var openId=ret.data.openid;
        oauth.getUser(openId, function (err,ret) {
            console.log(ret);
            res.render('index.html',{
                openId:openId
            });
        });

    });
});
//浏览器访问
app.get('/bowser', function(req, res) {
    var openId='wechat_openId';
    res.render('index.html',{
        openId:openId
    });

});


app.use('/wechat', wechat(config,function(req,res,next){
    // 微信输入信息都在req.weixin上
    var message=req.weixin;

}));

module.exports = app;