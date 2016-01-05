/**
 * Created by ZhiyuanSun on 16/1/4.
 */
var UserOrder = require('./models/app/user-order');

var userOrderData = {
    userOrderId : "1234",
    openId : "zhiyuanId",
    foods : {
        foodNum: 1,
        price: 20,
        volume: '小份',
        foodName: '水煮牛蛙'
    },
    status : 0,
    money : {
        beforeDiscountMoney: 90,
        discountMoney: 0
    },
    time : new Date(),
    userInfo : {
        seatNum: 'A0',
        peopleNum: 1,
        invoice: 'df',
        paymentMethod: 0
    }
};

var userOrder = new UserOrder();
userOrder.addAndUpdate(userOrderData).done(function(lastError){
    console.log(lastError);
});