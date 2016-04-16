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
      return {
        num: this.foods[foodNameKey].num,
        money: this.money.beforeDiscount
      };
		};

		this.minFood = function(){

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

}]);