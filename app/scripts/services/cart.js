serviceModule.service('cart',[
	'$http',
	'$q',
	function($http,$q){
		this.foods = {};
		this.money = {
			beforeDiscout: 0,
			discount: 0,
			afterDiscount: 0
		};

		this.addFood = function(){

		};
		this.minFood = function(){

		};
}])