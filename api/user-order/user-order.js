/**
 * Created by ZhiyuanSun on 16/1/2.
 */
var express = require('express');
var router = express.Router();
var CommonFun = require('../../models/common/common-func');
var UserOrder = require('../../models/app/user-order');

/*
 @params:    {
                 openId     :   ***
                 foods      :   ***
                 status     :   ***
                 money      :   ***
                 userInfo   :   ***
             }
 */
router.post('/conformUserOrder',function(req, res, next){
    var userOrderIdObj = CommonFun.createUserOrderID();

    var userOrderData = req.body;

    //设置userOrderId和time
    userOrderData.userOrderId = userOrderIdObj.userOrderId;
    userOrderData.time = userOrderIdObj.time;

    //修改status为1: Conformed
    userOrderData.status = 1;

    UserOrder.addAndUpdate(userOrderData)
        .then(function(ret){

            console.log(ret);

            res.status(200).send("OK");
        })
        .catch(function(err){

            console.log('catched the error: ',err);

            res.status(500).send("OK");
        });

    console.log(userOrderData);

});

/*
 @params:    {
                 userOrderId  :   ***
                 status :   ***
             }
 */
router.post('/setUserOrderStatus',function(req, res, next){

    UserOrder.setUserOrderStatus(req.body.userOrderId, req.body.status)
        .then(function(ret){
            console.log(ret);

            res.status(200).send("OK");
        })
        .catch(function(err){
            console.log('catched the error: ',err);

            res.status(500).send("OK");
        });
});

/*
@params:    {
                openId  :   ***
                skipNum :   ***
                limitNum:   ***
            }
*/
router.post('/getUserOrderByOpenId', function(req, res, next){

    UserOrder.getUserOrderByOpenId(req.body.openId, req.body.skipNum, req.body.limitNum)
        .then(function(ret){
            console.log(ret);

            res.status(200).send(ret);
        })
        .catch(function(err){
            console.log('catched the error: ',err);

            res.status(500).send("Failed");
        });
});

module.exports = router;
