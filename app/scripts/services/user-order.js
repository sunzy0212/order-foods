/**
 * Created by ZhiyuanSun on 15/12/19.
 */
serviceModule.service('userOrder', function(){
    var that = this;

    this.foods = {};
    this.status = 0;
    this.totalMoney = 0;
    this.totalNum = 0;
    this.time = new Date().now;

    this.getFoodNum = function(foodName, volume){
        var foodNameKey = foodName + '(' + volume + ')';
        if(this.foods[foodNameKey] == undefined){
            return 0;
        }
        return this.foods[foodNameKey].foodNum;
    };

    this.addFood = function(foodName, volume, price){
        this.totalNum += 1;

        var foodNameKey = foodName + '(' + volume + ')';
        if(this.foods[foodNameKey] == undefined){
            this.foods[foodNameKey] = new Foods(foodName, 1, volume, price);
        }
        else{
            this.foods[foodNameKey].foodNum += 1;
        }

        if(this.foodVolumeSelectedArray[foodName].name == volume){
            this.foodVolumeSelectedArray[foodName].num += 1;
        }

        this.totalMoney += price;
    };

    this.minusFood = function(foodName, volume, price){
        if(this.totolNum < 1){
            throw new Error("购物车里已经没有购物纪录了。");
        }
        else{
            this.totalNum -= 1;
        }

        var foodNameKey = foodName + '(' + volume + ')';
        if(this.foods[foodNameKey] != undefined && this.foods[foodNameKey].foodNum > 0){
            this.foods[foodNameKey].foodNum -= 1;

            //如果该菜的数量为0，从对象中删除
            if(0 == this.foods[foodNameKey].foodNum){
                delete this.foods[foodNameKey];
            }
        }
        else{
            throw new Error("购物车没有对应的点菜纪录。");
        }

        if(this.foodVolumeSelectedArray[foodName].name == volume){
            this.foodVolumeSelectedArray[foodName].num -= 1;
        }

        this.totalMoney -= price;
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
//        this.foodName = foodName + '(' + volume + ')';
        this.foodName = foodName;
    }

    return this;

});

