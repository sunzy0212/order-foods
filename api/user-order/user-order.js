/**
 * Created by ZhiyuanSun on 16/1/2.
 */
var express = require('express');
var router = express.Router();
var CommonFun = require('../../models/common/common-func');
var UserOrder = require('../../models/app/user-order');

var userUser = new UserOrder();

router.post('/conformUserOrder',function(req, res, next){
    var userOrderIdObj = CommonFun.createUserOrderID();

    var userOrderData = req.body;
    userOrderData.userOrderId = userOrderIdObj.userOrderId;
    userOrderData.time = userOrderIdObj.time;

    userUser.addAndUpdate(userOrderData)
        .then(function(ret){
            console.log(ret);
        })
        .catch(function(err){
            console.log('catched the error: ',err);
        });

    console.log(userOrderData);

    res.status(200).send("OK");
});

module.exports = router;
