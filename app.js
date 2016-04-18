//lib modules
var express = require("express");
var logger=require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require('path');
var wechat=require('wechat');
var authoriztion = require('./routes/authorization');
var async=require('async');

/*var session = require('express-session');
 var MongoStore = require('connect-mongo')(session);*/

//modules defined by myself
var getMenu=require('./api/get-menu');
var getRestaurantInfo = require('./api/restaurant-info');
var userOrder = require('./api/user-order');
var globalValue=require('./models/common/global-values');

var app = express();
var oauthClient = authoriztion.oauthClient;
var oauthMethod = authoriztion.router;
var unauthCallback = authoriztion.unauthCallback;

// Configuration
app.use(express.static(path.join(__dirname, 'app')));
app.set('views', __dirname + '/app');
app.engine('html', require('ejs').renderFile);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.query());
/*app.use(bodyParser());*/

app.use('/secureApi', oauthMethod);

app.use(getMenu);
app.use(getRestaurantInfo);
app.use(userOrder);

//微信访问
app.get('/app', function(req, res) {
  var code=req.query.code;
  if(code == undefined){
    res.render('404.html');
  }

  oauthClient.getAccessToken(code, function(err, data){
    if(err){
      unauthCallback(err,res);
    }
    if(data && data.access_token && data.openid){
      res.render('index.html',{
        openId: data.openid,
        access_token: data.access_token
      })
    }
    else{
      unauthCallback('get token error',res);
    }

  })

  // var maxTime = 3;
  // var count = 0;
  // var accessToken = null
  // var openId = null;
  // async.whilst(
  //   function(){
  //     return (accessToken == null) && count<maxTime;
  //   },
  //   function(callback){
  //     //从微信获取最新的access token，并以store[openId]的形式存储在内存中，可以通过getToken(openId)的形式获取。
  //     oauthClient.getAccessToken(code, function(err, ret){
  //       count++;
  //       if(ret.data !=undefined && ret.data.access_token !=undefined){
  //         accessToken = ret.data.access_token;
  //         openId = ret.data.openid;
  //         callback(null, openId);
  //       }
  //     });
  //   },
  //   function(err){
  //     if(err || count >= maxTime){
  //       res.render('404.html');
  //     }
  //     res.render('index.html',{
  //       openId:openId
  //     });
  //   });


});

//浏览器访问
app.get('/dist', function(req, res) {
  var openId='os1N1v1asWV4hAzEqANL-e2c4E5E';
  res.render('index.html',{
    openId:openId
  });

});

//浏览器访问
app.get('/app', function(req, res) {
  var openId='os1N1v1asWV4hAzEqANL-e2c4E5E';
  res.render('index.html',{
    openId:openId
  });

});


app.use('/wechat1', wechat(globalValue.wechatConfig,function(req,res,next){
  // 微信输入信息都在req.weixin上
  var message=req.weixin;

}));

module.exports = app;