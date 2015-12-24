/**
 * Created by ZhiyuanSun on 15/12/19.
 */
ctrlModule
    .controller('cartCtrl',['$scope', '$rootScope', 'userOrder', function($scope, $rootScope, userOrder){
        $scope.foods = userOrder.foods;

        $scope.addFoodClick = function(foodName, volume, price){
            userOrder.addFood(foodName, volume, price);

            $scope.totalMoney = userOrder.totalMoney;
            $rootScope.totalNum = userOrder.totalNum;
        }

        $scope.minusFoodClick = function(foodName, volume, price){
            userOrder.minusFood(foodName, volume, price);

            $scope.totalMoney = userOrder.totalMoney;
            $rootScope.totalNum = userOrder.totalNum;
        }
    }]);