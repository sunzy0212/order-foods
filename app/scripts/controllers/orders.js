/**
 * Created by ZhiyuanSun on 15/12/1.
 */
ctrlModule
    .controller('ordersCtrl',['$scope', '$q', 'userInfo', function($scope, $q, userInfo){
        //如果餐厅信息未被加载，则加载餐厅信息
        if(null == userInfo.allSeats){
            userInfo.requestRestaurantInfo()
                .then(function(data){

                },function(err){

                });
        }
    }]);