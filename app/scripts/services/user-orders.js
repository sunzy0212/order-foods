/**
 * Created by ZhiyuanSun on 16/4/18.
 */
serviceModule.service('userOrders',[
  '$q',
  '$http',
  function($q,$http){
    this.getUserOrderByOpenIdAndStatus = function (openId, status, skipNum, limitNum){
      var deferred = $q.defer();
      var postData = {
        openId  :   openId,
        status  :   status,
        skipNum :   skipNum,
        limitNum:   limitNum
      };
      var url = '/secureApi/getUserOrderByOpenIdAndStatus';

      $http.post(url,postData)
        .success(function(data){
          deferred.resolve(data);
        })
        .error(function(err){
          deferred.reject(err);
        });
      return deferred.promise;
    }
}]);