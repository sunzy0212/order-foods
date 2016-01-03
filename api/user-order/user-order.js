/**
 * Created by ZhiyuanSun on 16/1/2.
 */
var express = require('express');
var router = express.Router();
var CommonFun = require('../../models/common/common-func');

router.post('/conformUserOrder',function(req, res, next){
    var userOrderID = CommonFun.createUserOrderID();
    console.log(userOrderID);
    console.log(req.body);
    res.status(200).send("OK");
});

module.exports = router;
