(function(){
  'use strict';
  //lib modules
  var express = require("express");
  var logger = require('morgan');
  var cookieParser = require('cookie-parser');
  var bodyParser = require('body-parser');
  var path = require('path');
  var wechat = require('wechat');
  var authoriztion = require('./routes/authorization');
  var async = require('async');
  var crypto = require('crypto');

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
  var wechatConfig = authoriztion.wechatConfig;

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
        res.cookie('openId',data.openid);
        res.cookie('accessToken',data.access_token);

        res.render('index.html',{
          openId: data.openid,
          accessToken: data.access_token
        })
      }
      else{
        unauthCallback('get token error',res);
      }

    });
  });

  //浏览器访问
  app.get('/dist', function(req, res) {
    var openId = 'os1N1v1asWV4hAzEqANL-e2c4E5E';
    var accessToken = 'koE6bAKAlZf8e6Yr5mniAeDYQzlujw';
    
    res.cookie('openId',openId);
    res.cookie('accessToken',accessToken);
    res.render('index.html',{
      openId:openId,
      accessToken: accessToken
    });

  });

  app.all('/inwechat', function(req, res){
    if(req.query){
      res.end("false");
    }
    var echostr = req.query.echostr;
    var arr = [wechatConfig.token, req.query.timestamp, req.query.nonce];
    if(checkSigature(arr, req.query.signature)){
      res.end(echostr);
    }    
    else{
      res.end("false");
    }
  });

  function checkSigature(arr, sig){
    arr.sort();
    var tmpStr = arr.join('');
    var sha1Str = crypto.createHash('sha1').update(tmpStr).digest('hex'); 
    console.log(sha1Str);
    if(sig == sha1Str)
      return true;
    else
      return false;
  }


  module.exports = app;

})();