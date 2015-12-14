/**
 * Created by ZhiyuanSun on 15/12/12.
 */
var userOrdersModel = require('../db/user-orders-model');
var fs = require('fs');
var async=require('async');

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

//添加新纪录，如果openId已经存在，则修改原有的记录
UserOrders.prototype.addAndUpdate = function(userOrder, callback){
    var that =this;
    userOrdersModel.findOne({'openId' : userOrder.openId}, function(err, doc){
        if(err){
            callback(err);
        }
        if(doc){
            try{
                that.copyARecordTo(userOrder, doc);
            }
            catch (err){
                callback(err);
            }
            doc.save();
            callback(null,userOrder);
        }
        else{
            userOrdersModel.create(userOrder, function(err, ret){
                callback(err, ret);
            });
        }
    });
};

//复制一条user order记录信息（从src到dest，属于值复制）
UserOrders.prototype.copyARecordTo = function(src, dest){
    for(var key in src){
        if(dest[key] != 'undefined'){
            dest[key] = src[key];
        }
        else{
            throw Error('Copy a user order record to ' + dest + ' Failed, it does not contain the key of '+key);
        }
    }
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
