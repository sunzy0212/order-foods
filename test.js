/**
 * Created by ZhiyuanSun on 15/12/3.
 */

var Menu = require('./models/app/menu');
var FoodType=require('./models/app/food-type');

//导入菜单
var menu = new Menu();
menu.importMenu('./data/menu.json',function(err,data){
    if(err){
        console.log(err);
    }
});

/*//导入菜的类型
var foodType=new FoodType();

//var foodTypes=['热菜','凉菜','甜点','饮料'];
var foodTypes=[
    {
        'name':'热菜',
        'description':'dhgfdfghj'
    },
    {
        'name':'凉菜',
        'description':'dhgfdfghj'
    },
    {
        'name':'甜点',
        'description':'dhgfdfghj'
    },
    {
        'name':'饮料',
        'description':'dhgfdfghj'
    }
];

foodTypes.forEach(function(data){
    foodType.addFoodType(data,function(err){
        console.log(err);
    });
});*/


/*foodType.getAllFoodType(function(err,ret){
    if(err){
        console.log(err);
    }
    console.log(ret);
});*/

