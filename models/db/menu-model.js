/**
 * Created by ZhiyuanSun on 15/12/3.
 */
var mongodb=require('./mongodb');
var Schema=mongodb.mongoose.Schema;

var menuSchema=new Schema({
    name: {
        type: String,
        required: true
    },   //菜的名字
    img: {
        type: String,
        required: true
    },    //菜的图片的url
    type: {
        type: String
    },   //菜的类型
    description: String, //菜的描述
    price: {
        small: {
            type: Number,
            min: 0
        },  //小份
        middel: {
            type: Number,
            min: 0
        }, //中份
        large: {
            type: Number,
            min: 0
        }   //大份
    },  //菜的价格
    sellNumPerMonth: {
        type: Number,
        min: 0
    },    //菜的月销量
    state: Boolean, //是否售完
    level: {
        type: Number,
        enum: [0,1,2,3,4,5]
    },  //菜的评分等级
    valuation: [String] //菜的评论
});

var Menu=mongodb.mongoose.model('Menu',menuSchema);

module.exports=Menu;

