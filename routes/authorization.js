(function(){
	var express = require('express');
	var OAuth=require('../middlewares/wechat-oauth')
	var WechatApi=require('wechat-api');
	var fs = require('fs');
	var router = express.Router();

	var wechatAppConfigPath = 'data/wechat-app-config.json';
	var config = JSON.parse(fs.readFileSync(wechatAppConfigPath,'utf8'))[0];

	var oauth = new OAuth(config.appid,config.appsecret);
	var api = new WechatApi(config.appid,config.appsecret);

	router.all('*',function(req,res,next){
		var authorizationHeader = req.get('Authorization');
		var regString = "Bearer ";
		if(!validateAuthorizationHeader(authorizationHeader)){
			// Unauthorization
		}
		var headerParams = authorizationHeader.substr(regString.length).split(' ');
		if(headerParams.length !== 2){
			// Unauthorization
		}
		var accessToken = headerParams[0];
		var openId = headerParams[1];
		oauth.verifyToken(openId, accessToken, function(err,data,res){
			console.log(data.errcode);
			if(err || (data && data.errcode != 0)){
				//Unauthorization
				//Dev Environment
				if(global.isDev){
					next();
				}
				else{
					handleUnauthorization(oauth,res);
				}
			}
			else{
				next();
			}
		})
	});

	function validateAuthorizationHeader(authorizationHeader){
		var reg = /^(Bearer )/g;
		return reg.test(authorizationHeader);
	}

	function handleUnauthorization(oauth, res){
		var authUrl = oauth.getAuthorizeURL('http://zhiyuanagent.cloudapp.net/app','','snsapi_userinfo');
		res.redirect(authUrl);
	}

	module.exports={
		wechatConfig: config,
		oauthClient: oauth,
		wechatApi: api,
		router: router,
		unauthCallback: handleUnauthorization
	};
})();
