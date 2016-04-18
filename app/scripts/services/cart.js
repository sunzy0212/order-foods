serviceModule.service('cart',[
	'$http',
	'$q',
	function($http,$q){
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
    }

}]);