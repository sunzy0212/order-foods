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

    this.getFoodNum = function(foodName, volumeName){
        var foodNameKey = foodName + '(' + volumeName + ')';
        if(this.foods[foodNameKey] == undefined){
            return 0;
        }
        return this.foods[foodNameKey].foodNum;
    };

    //该方法被重载过：可以接受2个参数和4个参数
    //2个参数的方法：用于order-foods页面调用
    //4个参数的方法：用于cart页面调用
    this.addFood = function(foodVolumeSelectedArray, foodName, volumeName, price){
        //用于实现方法的重载：只接受2个参数时
        if(2 == arguments.length){
            volumeName = foodVolumeSelectedArray[foodName].name;
            price = foodVolumeSelectedArray[foodName].price;

        }

        if(foodVolumeSelectedArray[foodName] && volumeName == foodVolumeSelectedArray[foodName].name){
            foodVolumeSelectedArray[foodName].num += 1;
        }
        this.totalNum += 1;

        var foodNameKey = foodName + '(' + volumeName + ')';
        if(this.foods[foodNameKey] == undefined){
            this.foods[foodNameKey] = new Foods(foodName, 1, volumeName, price);
        }
        else{
            this.foods[foodNameKey].foodNum += 1;
        }


        this.totalMoney += price;
    };

    //该方法被重载过：可以接受2个参数和4个参数
    //2个参数的方法：用于order-foods页面调用
    //4个参数的方法：用于cart页面调用
    this.minusFood = function(foodVolumeSelectedArray, foodName, volumeName, price){
        //用于实现方法的重载：只接受2个参数时
        if(2 == arguments.length){
            volumeName = foodVolumeSelectedArray[foodName].name;
            price = foodVolumeSelectedArray[foodName].price;
        }

        if(this.totolNum < 1){
            throw new Error("购物车里已经没有购物纪录了。");
        }
        else{
            this.totalNum -= 1;
        }

        var foodNameKey = foodName + '(' + volumeName + ')';
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

        if(foodVolumeSelectedArray[foodName] && volumeName == foodVolumeSelectedArray[foodName].name){
            foodVolumeSelectedArray[foodName].num -= 1;
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

