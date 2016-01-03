/**
 * Created by ZhiyuanSun on 15/12/25.
 */
var mongodb=require('./mongodb');
var Schema=mongodb.mongoose.Schema;

var SeatSchema = new Schema({
    A   :   Number,
    B   :   Number,
    C   :   Number
});

var paymentMethodSchema = new Schema({
    name    :   {
        type        :   String,
        required    :   true,
        enum        :   ["现金支付","支付宝支付","微信支付"]
    },
    id      :   {
        type        :   Number,
        required    :   true,
        enum        :   [0,1,2]
    }
});

var RestaurantInfoSchema = new Schema({
    restaurantName  :   String,
    seats           :   SeatSchema,
    maxNumPerOrder  :   Number,
    paymentMethods  :   [paymentMethodSchema]
});


var RestaurantInfo=mongodb.mongoose.model('RestaurantInfo',RestaurantInfoSchema);

module.exports=RestaurantInfo;