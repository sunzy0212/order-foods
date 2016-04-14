serviceModule.service('menu',[
	'$http',
	'$q',
	function($http,$q){
		this.foodTypes = null;
		this.foods = {};
		var that = this;

		this.getFoodTypes = function(){
			var deferred = $q.defer();
			if(this.foodTypes == null){
				$http.get('/menu/GetFoodType')
				.success(function(data){
					deferred.resolve(that.foodTypes = data);
				})
				.error(function(err){
					deferred.reject(err);
				});
			}
			else{
				deferred.resolve(that.foodTypes);
			}
			return deferred.promise;
		}

		this.getFoodsByType = function(type){
			var deferred = $q.defer();
			if(this.foods[type] == null){
				var url = '/menu/GetFoodsByType?foodType=' + type;
				$http.get(url)
				.success(function(data){
					deferred.resolve(that.foods[type] = data);
				})
				.error(function(err){
					deferred.reject(err);
				});
			}
			else{
				deferred.resolve(that.foods[type]);
			}
			return deferred.promise;
		}
}])