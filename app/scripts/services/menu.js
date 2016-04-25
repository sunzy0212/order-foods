serviceModule.service('menu',[
	'$http',
	'$q',
	function($http,$q){
		this.foodTypes = null;
		this.foods = {};
		this.restaurantInfo = null;
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

		this.getRestaurantInfo = function(){
			var deferred = $q.defer();
			if(null == that.restaurantInfo){
            $http.get('/openApi/GetRestaurantInfo')
                .success(function(data){
                    that.restaurantInfo = {
                        allSeats    :   constructSeatSelectData(data.seats),
                        allPeople   :   constructPeopleSelectData(data.maxNumPerOrder)
                    };
                    deferred.resolve(that.restaurantInfo);
                })
                .error(function(err){
                    deferred.reject(err);
                });
	        }
	        else{
	            deferred.resolve(that.restaurantInfo);
	        }
			return deferred.promise;
		}

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

	    function constructSeatSelectData(data){
		    var seatSelectData = new Array();

		    for(var key in data){
		        for(var i = 0; i < data[key]; i++){
		            seatSelectData.push( key + i);
		        }
		    }
		    return seatSelectData;
		}

		function constructPeopleSelectData(data){
		    var peopleSelectData = new Array();

		    for(var i = 0; i < data; i++){
		        peopleSelectData.push(i+1);
		    }

		    return peopleSelectData;
		}

}]);