/**
 * Created by ZhiyuanSun on 15/12/12.
 */
var userOrderModel = require('../db/user-order-model');
var fs = require('fs');
var async=require('async');
var Q = require('q');

function UserOrder(){

};

module.exports = UserOrder;

//从json文件中导入用户的订单记录到数据库
UserOrder.prototype.import = function(path, callback){
    var that = this;
    fs.readFile(path,'utf8',function(err, data){
        if(err){
            callback(err);
        }
        var UserOrderData = JSON.parse(data);

        var count = 0;
        var length = UserOrderData.length;
        async.whilst(
            function(){
                return count < length;
            },
            function(callback){
                that.addAndUpdate(UserOrderData[count], callback);
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
UserOrder.addAndUpdate = function(userOrder){
    var query = {
        userOrderId : userOrder.userOrderId
    };

    var options = {
        upsert      : true,
        multi       : false,
        overwrite   : true      //update-only
    };

    var deferred = Q.defer();

    userOrderModel.update(query, userOrder, options, function(err, raw){
        if(err){
            deferred.reject(new Error(err));
        }
        else{
            deferred.resolve(raw);
        }
    });

    return deferred.promise;
};

UserOrder.setUserOrderStatus = function(parUserOrderId, parStatus){
    var query = {
        userOrderId : parUserOrderId
    };

    var options = {
        upsert      : true,
        multi       : false,
        overwrite   : true      //update-only
    };

    var updates = {
        $set : {
            status : parStatus
        }
    };

    var deferred = Q.defer();

    userOrderModel.update(query, updates, options, function(err, raw){
        if(err){
            deferred.reject(new Error(err));
        }
        else{
            deferred.resolve(raw);
        }
    });

    return deferred.promise;
};

UserOrder.getUserOrderByOpenId = function(parOpenId, skipNum, limitNum){
    var query = {
        openId : parOpenId
    };

    var sortObj = {
        status : -1,
        time : -1
    };

//    var selectFeilds = '';

    var deferred = Q.defer();

    userOrderModel.find(query).sort(sortObj).skip(skipNum).limit(limitNum).exec(function(err, ret){
        if(err){
            deferred.reject(new Error(err));
        }
        else{
            deferred.resolve(ret);
        }
    });

    return deferred.promise;
};

