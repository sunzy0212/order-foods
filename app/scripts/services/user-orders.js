/**
 * Created by ZhiyuanSun on 16/4/18.
 */
serviceModule.service('userOrders',[
  '$q',
  '$http',
  'authorization',
  function($q,$http,authorization){
    this.getUserOrderByOpenIdAndStatus = function (openId, status, skipNum, limitNum){
      var deferred = $q.defer();
      var queryObj = {
        openId  :   openId,
        status  :   status,
        skipNum :   skipNum,
        limitNum:   limitNum
      };
      var queryString = $.param(queryObj);
      var url = '/secureApi/getUserOrdersByOpenIdAndStatus?' + queryString;

      var config = {
        method: 'GET',
        url: url
      };
      config = authorization.addAuthorizationHeader(config);

      $http(config)
        .success(function(data){
          deferred.resolve(data);
        })
        .error(function(err){
          deferred.reject(err);
        });
      return deferred.promise;
    };

    this.getUserOrderDetailByOrderId = function(orderId){
      var url = '/secureApi/getUserOrderDetailByOrderId?orderId=' + orderId;
      var deferred = $q.defer();
      var config = {
        method: 'GET',
        url: url
      };
      config = authorization.addAuthorizationHeader(config);

      $http(config)
        .success(function(data){
          data.foods = constructFoodsList(data.foods);
          deferred.resolve(data);
        })
        .error(function(err){
          deferred.reject(err);
        });
      return deferred.promise;
    };

    function constructFoodsList(foods){
      var foodVolumeMap = {
        large: "大份",
        middle: "普通份",
        small: "小份"
      };

      var foodList = [];
      foods.forEach(function(item){
        foodList.push({
          foodName: item.foodName + '(' + foodVolumeMap[item.volume] + ')',
          num: item.foodNum,
          price: item.price
        });
      });
      return foodList;
    }
}]);