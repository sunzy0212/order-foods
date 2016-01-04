/**
 * Created by ZhiyuanSun on 15/12/12.
 */
var userOrderModel = require('../db/user-order-model');
var fs = require('fs');
var async=require('async');
var CommonFun = require('../common/common-func');

function UserOrders(){

};

module.exports = UserOrders;

//从json文件中导入用户的订单记录到数据库
UserOrders.prototype.import = function(path, callback){
    var that = this;
    fs.readFile(path,'utf8',function(err, data){
        if(err){
            callback(err);
        }
        var userOrdersData = JSON.parse(data);

        var count = 0;
        var length = userOrdersData.length;
        async.whilst(
            function(){
                return count < length;
            },
            function(callback){
                that.addAndUpdate(userOrdersData[count], callback);
                count++;
            },
            function(err, n){
                if(err){
                    callback(err);
                }
                else{
                    callback(null,true);
                }
            });
    });
};

//添加新纪录，如果userOrderId已经存在，则修改原有的记录
UserOrders.prototype.addAndUpdate = function(userOrder, callback){
    var options = {
        upsert      : true,
        multi       : false,
        overwrite   : true      //update-only
    };

    userOrderModel.update({userOrderId : userOrder.userOrderId}, userOrder, options, function(err, numAffected, raw){
        if(err){
            callback(err);
        }
        console.log('The number of updated documents was %d', numAffected);
        console.log('The raw response from Mongo was ', raw);
        callback(null, userOrder);
    });

};

//添加新记录，如果openId已经存在，则报错
UserOrders.prototype.add = function(userOrder, callback){
    userOrdersModel.create(userOrder,function(err, ret){
        callback(err, ret);
    });
};

//获取某用户的所有订单记录
UserOrders.prototype.getUserOrderByOpenId = function(openId,callback){
    userOrdersModel.findOne({'openId' : openId}, function(err, doc){
        callback(err, doc);
    });
};
