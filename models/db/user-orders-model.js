/**
 * Created by ZhiyuanSun on 15/12/12.
 */
var mongodb = require('./mongodb');

var Schema = mongodb.mongoose.Schema;

var FoodValueSchema = new Schema({
    foodName : {    //菜名
        type : String,
        required : true
    },
    foodNum : {     //份数
        type : Number,
        default : 1
    },
    price : {       //价格
        type : Number
    },
    volume : {      //份量
        type : String
    }
});

var FoodsSchema = new Schema ({
    name    :  {
        type        :   String,
        required    :   true
    },
    value   :   {
        type        :   FoodValueSchema,
        required    : true
    }
});

var MoneySchema = new Schema({
    beforeDiscountMoney :   Number,
    discountMoney       :   Number,
    afterDiscountMoney  :   Number
});

// 支付方式说明
//      0   -- 现金支付
//      1   -- 支付宝支付
//      2   -- 微信支付
var UserInfoSchema = new Schema({
    seatNum     :   String,
    peopleNum   :   Number,
    invoice     :   String,
    paymentMethod   :   Number
});

// Status状态说明：
//      0   --  "Created",
//      1   --  "Conformed",
//      2   --  "Paid"
var OrderSchema = new Schema ({
    foods : [FoodsSchema],
    status : {
        type : Number,
        enum : [0,1,2]
    },
    money : {
        type : MoneySchema,
        required : true
    },
    time : {
        type : Date,
        required : true,
        default : new Date().now
    },
    userInfo : {
        type : UserInfoSchema,
        require : true
    }
});

var UserOrdersSchema = new Schema ({
    openId : {
        type : String,
        required : true,
        unique : true
    },
    orders : {
        type : [OrderSchema]
    }
});

var UserOrders=mongodb.mongoose.model('UserOrders',UserOrdersSchema);

module.exports=UserOrders;