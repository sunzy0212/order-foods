/**
 * Created by ZhiyuanSun on 15/12/19.
 */
serviceModule.service('userOrder', function(){
    this.foods = new Array();
    this.status = 0;
    this.money = 0;
    this.time = new Date().now;

    this.getFoodNum = function(foodName, volume){
        var foodNameKey = foodName + '(' + volume + ')';
        if(this.foods[foodNameKey] == undefined){
            return 0;
        }
        return this.foods[foodNameKey].foodNum;
    };

    this.addFood = function(foodName, volume, price){
        var foodNameKey = foodName + '(' + volume + ')';

        if(this.foods[foodNameKey] == undefined){
            this.foods[foodNameKey] = new Foods(foodName, 1, volume, price);
        }
        else{
            this.foods[foodNameKey].foodNum += 1;
        }
    };

    this.minusFood = function(foodName, volume){
        var foodNameKey = foodName + '(' + volume + ')';

        if(this.foods[foodNameKey] != undefined && this.foods[foodNameKey].foodNum > 0){
            this.foods[foodNameKey].foodNum -=1;
        }
        else{
            throw new Error("购物车没有对应的点菜纪录。");
        }
    };

    function Foods(foodName, foodNum, volume, price){
        if(foodNum == 'undefined'){
            this.foodNum = 1;
        }
        else{
            this.foodNum = foodNum;
        }

        if(price == 'undefined'){
            this.price = 0;
        }
        else{
            this.price = price;
        }

        if(volume == 'undefined'){
            this.volume = "普通份";
        }
        else{
            this.volume = volume;
        }

        if(foodName == 'undefined'){
            foodName = '';
        }
        this.foodName = foodName + '(' + volume + ')';
    }

    return this;

});