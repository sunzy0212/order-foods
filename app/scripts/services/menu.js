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
				$http.get('/openApi/GetFoodType')
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
		};

		this.getFoodsByType = function(type){
			var deferred = $q.defer();
			if(this.foods[type] == null){
				var url = '/openApi/GetFoodsByType?foodType=' + type;
				$http.get(url)
				.success(function(data){
          data.forEach(function(item){
            item.price = constructPriceMap(item.price);
          });
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
		};

    function constructPriceMap(priceList){
      var nameMap={
        large: "大份",
        middle: "中份",
        small: "小份"
      };

      var priceMap = [];
      for(var key in priceList){
        if(priceList[key] != -1){
          priceMap.push({
            name: key,
            displayName: nameMap[key],
            price: priceList[key]
          })
        }
      }
      return priceMap;
    }

}]);