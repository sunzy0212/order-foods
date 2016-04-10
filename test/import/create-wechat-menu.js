/**
 * Created by ZhiyuanSun on 16/4/10.
 */
var WechatMenu=require('../../models/wechat/wechat-menu');
var wechatMenu = new WechatMenu('../../data/wechat-menu.json');

wechatMenu.createMenu(function(err,data){
  if(err){
    console.log('Error:')
    console.log(err);
  }
  console.log('Succeed: ')
  console.log(data);
});
