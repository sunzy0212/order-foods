var OAuth=require('wechat-oauth');

var config={
    token: 'order_food_wechat_hybrid_app',
    appid: 'wx8802127829e580bb',
    encodingAESKey: 'k2XZcERrRAaqKA4gFu0O6mSar61bVa8ZvYWTto9Zhbj',
    appsecret:'d4624c36b6795d1d99dcf0547af5443d'
};

var oauth=new OAuth(config.appid,config.appsecret);
var url=oauth.getAuthorizeURL('http://zhiyuanagent.cloudapp.net/app','','snsapi_userinfo');
console.log(url);