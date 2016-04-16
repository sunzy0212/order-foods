serviceModule.service('orderFoodsCache',[
	'$q',
	'menu',
  'cart',
	function($q,menu,cart){
		var that = this;
		this.foodTypes = null;
		this.foodsSelectedStatus = {};

		this.getFoodTypes = function(){
			var deferred = $q.defer();
			if(this.foodTypes == null){
				menu.getFoodTypes()
					.then(function(foodTypes){
						deferred.resolve(that.foodTypes = constructFoodTypes(foodTypes));
					});
			}
			else{
				deferred.resolve(that.foodTypes);
			}
			return deferred.promise;	
		};

		this.getFoodsSelectedStatusByType = function(type){
			var deferred = $q.defer();
			if(this.foodsSelectedStatus[type] == null){
				menu.getFoodsByType(type)
					.then(function(foods){
						deferred.resolve(that.foodsSelectedStatus[type] = constructFoodsSelectedStatus(foods));
					});
			}
			else{
//				deferred.resolve(updateFoodsSelectedNumStatus(that.foodsSelectedStatus[type]));
        updateFoodsSelectedNumStatus(that.foodsSelectedStatus[type]);
				deferred.resolve(that.foodsSelectedStatus[type]);
			}
			return deferred.promise;			
		};

    this.setFoodsSelectedVolumeStatus = function(type, foodName, volume){
      return this.foodsSelectedStatus[type][foodName].volume = volume;
    };

    this.setFoodsSelectedNumStatus = function(type, foodName, num){
      return this.foodsSelectedStatus[type][foodName].num = num;
    };

    this.getSelectedType = function(){
      var deferred = $q.defer();
      if(this.foodTypes != null){
        deferred.resolve(this.foodTypes.items[this.foodTypes.activeIndex].name);
      }
      else{
        this.getFoodTypes()
          .then(function(foodTypes){
            deferred.resolve(foodTypes.items[foodTypes.activeIndex].name);
          })
      }
      return deferred.promise;
    };

    function updateFoodsSelectedNumStatus(obj){
      for(var key in obj){
        obj[key].num = cart.getFoodNum(key, obj[key].volume.displayName);
      }
      return obj;
    }


		
		// 将字符数组转化为结构数组
		// ['str1'] --> [{
		// 	name: '',
		// 	isSelected: bool
		// }]
		function constructFoodTypes(arr){
			var foodTypes = {
        items: [],
        activeIndex: 0
      };
			for(var i=0; i<arr.length; i++){
				if(i === 0){
					foodTypes.items.push({
						name: arr[i],
						isSelected: true
					});
				}
				else{
					foodTypes.items.push({
						name: arr[i],
						isSelected: false
					})
				}
			}
			return foodTypes;
		}

		// 根据food数组生成表示food被选情况的字典
		// [food] --> Dictionary<foodName, {
		// 	volume: '',
		// 	num： x
		// }>
		function constructFoodsSelectedStatus(arr){
			var foodsSelectedStatus = [];
			arr.forEach(function(item){
				foodsSelectedStatus[item.name] = {
					volume: item.price[0],
					num: cart.getFoodNum(item.name, item.price[0].name)
				}
			});
      return foodsSelectedStatus;
		}

		// 初始化份量列表
		// 返回第一个价格不等于-1的份量
		// {
		// 	"small": -1,
		// 	"middle": 30,    --> middle
		// 	"large": 50
		// }  
		/*function getFirstExistingVolume(volumeObj){
			for(var i in volumeObj){
				if(volumeObj[i] != -1){
					return i;
				}
			}
		}*/
}]);