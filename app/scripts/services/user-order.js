/**
 * Created by ZhiyuanSun on 15/12/19.
 */
serviceModule.service('userOrder', [
    '$q', '$http', 'userInfo',
    function($q, $http, userInfo){
    var that = this;

    this.foods = {};
    this.status = 0;
    this.money = {
        beforeDiscountMoney     :   0,
        discountMoney           :   0,
        afterDiscountMoney      :   0
    };
    this.totalNum = 0;
    this.userOrderId = 0;

    this.conformUserOrder = function(){
        var deferred = $q.defer();
        var promise = deferred.promise;

        var url = '/userOrder/conformUserOrder';

        var foodData = new Array();
        for(var key in that.foods){
            foodData.push(that.foods[key]);
        }

        var userInfoData = new UserInfoModel(userInfo.userInfo.seatNum, userInfo.userInfo.peopleNum, userInfo.userInfo.paymentMethod.paymentMethodId, userInfo.userInfo.invoice);

        var userOrderData = new UserOrderModel(userInfo.openId,foodData,that.status,that.money.beforeDiscountMoney,that.money.discountMoney,userInfoData);

        var postData = userOrderData;

        $http.post(url, postData)
            .success(function(retData){
                deferred.resolve(retData);
            })
            .error(function(err){
                deferred.reject(err);
            });

        return promise;
    };

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
            this.foods[foodNameKey] = new FoodModel(foodName, 1, volumeName, price);
        }
        else{
            this.foods[foodNameKey].foodNum += 1;
        }


        this.money.beforeDiscountMoney += price;
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

        this.money.beforeDiscountMoney -= price;
    };

    this.clearCart = function(){
        this.foods = {};
        this.money.beforeDiscountMoney = 0;
        this.totalNum = 0;
    };

    //打折或使用优惠券操作
    this.discount = function(){
        //计算折扣
        this.money.discountMoney = 0;
        //计算实际需要付款值
        this.money.afterDiscountMoney = this.money.beforeDiscountMoney - this.money.discountMoney;

        return this.money;
    };

    this.getMoney = function(){
        this.money.afterDiscountMoney = this.money.beforeDiscountMoney - this.money.discountMoney;
        return this.money;
    };

    return this;

}]);

