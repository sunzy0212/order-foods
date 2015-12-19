/**
 * Created by ZhiyuanSun on 15/12/12.
 */
var mongodb = require('./mongodb');

var Schema = mongodb.mongoose.Schema;

var FoodsSchema = new Schema ({
    foodName : {    //菜名
        type : String,
        required : Number
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
        type : Number,
        required : true
    }
    /*time : {
        type : Date,
        required : true,
        default : new Date().now
    }*/

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