/**
 * Created by ZhiyuanSun on 15/12/19.
 */
ctrlModule
    .controller('cartCtrl',['$scope','userOrder',function($scope, userOrder){
        $scope.foods = userOrder.foods;

        $scope.addFoodClick = function(foodName, volume, price){
            userOrder.addFood(foodName, volume, price);
        }
    }]);