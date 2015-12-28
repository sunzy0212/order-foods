
var WechatMenu=require('./models/wechat/wechat-menu');

var wechatMenu = new WechatMenu('./data/wechat-menu.json');

wechatMenu.createMenu(function(err,data){
    if(err){
        console.log('Error:')
        console.log(err);
    }
    console.log('Succeed: ')
    console.log(data);
});


/*

var dic = {}
dic["key1"] = "value1";
dic["key2"] = "value2";
dic["key3"] = "value3";

delete dic["key2"];

console.log(dic);*/
