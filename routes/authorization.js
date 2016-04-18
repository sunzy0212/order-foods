(function(){
  var express = require('express');
	var OAuth=require('wechat-oauth')
	var WechatApi=require('wechat-api');
	var fs = require('fs');
	var router = express.Router();

	var wechatAppConfigPath = 'data/wechat-app-config.json';
	var config = JSON.parse(fs.readFileSync(wechatAppConfigPath,'utf8'))[0];

	var oauth = new OAuth(config.appid,config.appsecret);
	var api = new WechatApi(config.appid,config.appsecret);

	router.all('*',function(req,res,next){
		console.log(req.query);
		next();
	});

	module.exports={
	    wechatConfig:   config,
	    oauthClient:    oauth,
	    wechatApi:      api,
	    router: router
	};
})();
