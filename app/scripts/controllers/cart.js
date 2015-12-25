/**
 * Created by ZhiyuanSun on 15/12/19.
 */
ctrlModule
    .controller('cartCtrl',['$scope', '$rootScope', '$q', 'userOrder', 'userInfo',function($scope, $rootScope, $q, userOrder, userInfo){
        $scope.foods = userOrder.foods;

        if(null == userInfo.allSeats){
            userInfo.requestRestaurantInfo()
                .then(function(data){
                    $scope.allSeats = userInfo.allSeats;

                    $scope.currentSelectSeat = userInfo.seatNum;
                },function(err){

                });
        }
        else{
            $scope.allSeats = userInfo.allSeats;

            $scope.currentSelectSeat = userInfo.seatNum;
        }

        $scope.addFoodClick = function(foodName, volume, price){
            userOrder.addFood(foodName, volume, price);

            $scope.totalMoney = userOrder.totalMoney;
            $rootScope.totalNum = userOrder.totalNum;
        };

        $scope.minusFoodClick = function(foodName, volume, price){
            userOrder.minusFood(foodName, volume, price);

            $scope.totalMoney = userOrder.totalMoney;
            $rootScope.totalNum = userOrder.totalNum;
        };

        $scope.selectSeatNum = function(seatNum){
            userInfo.seatNum = seatNum;
        };
    }]);

