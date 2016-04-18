serviceModule.service('cart',[
	'$http',
	'$q',
  'cartCache',
	function($http,$q,cartCache){
    var that = this;
    this.openId = null;
		this.foods = {};
		this.money = {
			beforeDiscount: 0,
			discount: 0,
			afterDiscount: 0
		};
    this.totalNum = {
      value: 0
    };

		this.addFood = function(foodName, volumeObj){
      var foodNameKey = foodName + '(' + volumeObj.displayName + ')';
      if(!this.foods[foodNameKey]){
        this.foods[foodNameKey] = {
          foodName: foodName,
          volume: volumeObj,
          num: 1
        };
      }
      else{
        this.foods[foodNameKey].num++;
      }
      this.totalNum.value++;
      this.money.beforeDiscount += volumeObj.price;
      this.money.afterDiscount = this.money.beforeDiscount - this.money.discount;
      return {
        num: this.foods[foodNameKey].num,
        money: this.money.beforeDiscount
      };
		};

		this.minFood = function(foodName, volumeObj){
      var foodNameKey = foodName + '(' + volumeObj.displayName + ')';
      if(this.foods[foodNameKey] && this.foods[foodNameKey].num > 0){
        this.foods[foodNameKey].num--;
        this.totalNum.value--;
        this.money.beforeDiscount -= volumeObj.price;
        this.money.afterDiscount = this.money.beforeDiscount - this.money.discount;
        if(this.foods[foodNameKey].num == 0){
          delete this.foods[foodNameKey];
        }
      }
      return {
        num: this.foods[foodNameKey]? this.foods[foodNameKey].num : 0,
        money: this.money.beforeDiscount
      };
		};

    this.getFoodNum = function(foodName, volume){
      var foodNameKey = foodName + '(' + volume + ')';
      if(!this.foods[foodNameKey]){
        return 0;
      }
      else{
        return this.foods[foodNameKey].num || 0;
      }
    };

    this.clearCart = function(){
      for(var i in this.money){
        this.money[i] = 0;
      }
      this.totalNum.value = 0;
      for(var i in this.foods){
        delete this.foods[i];
      }
    };

    this.gotoCheckOut = function(){
      var deferred = $q.defer();
      var promise = deferred.promise;

      var url = '/secureApi/conformUserOrder';
      var userOrder = {
        openId: that.openId,
        foods: convertDicToArray(that.foods),
        totalNum: that.totalNum.value,
        status: -1,
        money: {
            beforeDiscount: that.money.beforeDiscount,
            discount: that.money.discount
        },
        cartInfo: {
            seatNum: cartCache.cartInfo.seatNum,
            peopleNum: cartCache.cartInfo.peopleNum,
            invoice: cartCache.cartInfo.invoice,
        }
      };

      $http.post(url, userOrder)
          .success(function(retData){
              deferred.resolve(retData);
          })
          .error(function(err){
              deferred.reject(err);
          });
      return promise;
    };

    this.conformPayment = function(userOrderId,paymentMethod){
      var deferred = $q.defer();
      var url = '/secureApi/conformPayment';
      var body = {
        userOrderId: userOrderId,
        paymentMethod: paymentMethod
      };
      $http.post(url,body)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function(err){
          deferred.reject(err);
        });
      return deferred.promise;
    };

    function convertDicToArray(dic){
      var arr = [];
      for(var key in dic){
        var value = dic[key];
        arr.push({
          foodName: value.foodName,
          foodNum: value.num,
          price: value.volume.price,
          volume: value.volume.name
        });
      }
      return arr;
    }

}]);