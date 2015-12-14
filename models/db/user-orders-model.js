/**
 * Created by ZhiyuanSun on 15/12/12.
 */
var mongodb = require('./mongodb');

var Schema = mongodb.mongoose.Schema;

var FoodsSchema = new Schema ({
    foodName : {
        type : String,
        required : Number
    },
    foodNum : {
        type : Number,
        default : 1
    }
});

var OrderSchema = new Schema ({
    foods : [FoodsSchema],
    status : {
        type : [String],
        enum : ["Created","Conformed","Paid"]
    },
    money : {
        type : [Number],
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