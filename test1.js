var WechatMenu=require('./models/wechat/wechat-menu');

var wechatMenu = new WechatMenu('./data/wechat-menu.json');

wechatMenu.createMenu(function(err,data){
    if(err){
        console.log(err);
    }
    console.log(data);
});