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

    this.foodVolumeSelectedArray = null;

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
        }
        else{
            throw new Error("购物车没有对应的点菜纪录。");
        }

        if(this.foodVolumeSelectedArray[foodName].name == volume){
            this.foodVolumeSelectedArray[foodName].num -= 1;
        }

        this.totalMoney -= price;
    };

    //初始化 service的foodVolumeSelectedArray成员
    //该数组表示每一种菜当前select控件的选择情况
    //初始化为service的selectedFoods[i].price的第0个元素
    this.initFoodVolumeSelectedArray = function (selectedFoods){
        that.foodVolumeSelectedArray = {};

        selectedFoods.forEach(function(item){
            that.foodVolumeSelectedArray[item.name] = new FoodVolumeModel(item.price[0].name, item.price[0].num, item.price[0].price);
        });
    };

    this.setFoodVolumeSelectedArray = function(foodName, selectVolume){
        var selectVolumeItem = that.foodVolumeSelectedArray[foodName];

        if(selectVolumeItem != undefined){
            selectVolumeItem.name = selectVolume.name;
            selectVolumeItem.price = selectVolume.price;
            selectVolumeItem.num = that.getFoodNum(foodName, selectVolume.name);


        }
        else{
            throw new Error("不能确定您当前所选的菜的份量。");
        }
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

function FoodVolumeModel(name, num, price){
    this.name = name;
    this.num = num;
    this.price = price;
}