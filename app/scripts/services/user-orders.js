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
      var url = '/secureApi/getUserOrderByOpenIdAndStatus?' + queryString;

      var config = {
        method: 'GET',
        url: url,
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
    }
}]);