/**
 * Created by ZhiyuanSun on 15/12/19.
 */
serviceModule.service('userOrder', ['$cookies','localStorageService',function($cookies, localStorageService){
    if($cookies.cart == undefined){
        $cookies.cart = {
            "foods" : new Array(),
            "status" : 0,
            "totalMoney" : 0,
            "totalNum" : 0,
            "time" : new Date()
        };
    }

    this.foods = function(){
        if($cookies.cart != undefined && $cookies.cart.foods != undefined){
            return $cookies.cart.foods;
        }
        else{
            return new Array();
        }
    };
    this.status = function(){
        if($cookies.cart != undefined && $cookies.cart.status != undefined){
            return $cookies.cart.status;
        }
        else{
            return 0;
        }
    };
    this.totalMoney = function(){
        if($cookies.cart != undefined && $cookies.cart.totalMoney != undefined){
            return $cookies.cart.totalMoney;
        }
        else{
            return 0;
        }
    };
    this.totalNum = function(){
        if($cookies.cart != undefined && $cookies.cart.totalNum != undefined){
            return $cookies.cart.totalNum;
        }
        else{
            return 0;
        }
    };
    this.time = function(){
        if($cookies.cart != undefined && $cookies.cart.time != undefined){
            return $cookies.cart.time;
        }
        else{
            return new Date();
        }
    };

    this.getFoodNum = function(foodName, volume){
        var foodNameKey = foodName + '(' + volume + ')';
        if($cookies.cart.foods[foodNameKey] == undefined){
            return 0;
        }
        return $cookies.cart.foods[foodNameKey].foodNum;
    };

    this.addFood = function(foodName, volume, price){
        $cookies.cart.totalNum += 1;

        var foodNameKey = foodName + '(' + volume + ')';
        if($cookies.cart.foods[foodNameKey] == undefined){
            $cookies.cart.foods[foodNameKey] = new Foods(foodName, 1, volume, price);
        }
        else{
            $cookies.cart.foods[foodNameKey].foodNum += 1;
        }

        $cookies.cart.totalMoney += price;
    };

    this.minusFood = function(foodName, volume, price){
        if(this.totolNum < 1){
            throw new Error("购物车里已经没有购物纪录了。");
        }
        else{
            $cookies.cart.totalNum -= 1;
        }

        var foodNameKey = foodName + '(' + volume + ')';
        if($cookies.cart.foods[foodNameKey] != undefined && $cookies.cart.foods[foodNameKey].foodNum > 0){
            $cookies.cart.foods[foodNameKey].foodNum -= 1;
        }
        else{
            throw new Error("购物车没有对应的点菜纪录。");
        }

        $cookies.cart.totalMoney -= price;
    };

    function Foods(foodName, foodNum, volume, price){
        if(foodNum == undefined){
            this.foodNum = 1;
        }
        else{
            this.foodNum = foodNum;
        }

        if(price == undefined){
            this.price = 0;
        }
        else{
            this.price = price;
        }

        if(volume == undefined){
            this.volume = "普通份";
        }
        else{
            this.volume = volume;
        }

        if(foodName == undefined){
            foodName = '';
        }
        this.foodName = foodName + '(' + volume + ')';
    }

    return this;

}]);