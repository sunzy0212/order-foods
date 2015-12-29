/**
 * Created by ZhiyuanSun on 15/12/19.
 */
ctrlModule
    .controller('cartCtrl',['$scope', '$rootScope', '$q', 'userOrder', 'userInfo','foodMenu',function($scope, $rootScope, $q, userOrder, userInfo, foodMenu){
        $scope.foods = userOrder.foods;

        userInfo.getRestaurantInfo()
            .then(function(restaurantInfo){
                $scope.restaurantInfo = userInfo.restaurantInfo;
                $scope.userInfo = userInfo.userInfo;
            });

        $scope.restaurantInfo = userInfo.restaurantInfo;
        $scope.userInfo = userInfo.userInfo;

        $scope.addFoodClick = function(foodName, volumeName, price){
            foodMenu.GetFoodsByType(foodMenu.menuSideBar.currentSideItemName)
                .then(function(typeFoods){
                    userOrder.addFood(typeFoods.foodVolumeSelectedArray, foodName, volumeName, price);
                    $scope.foodSelectedArray = typeFoods.foodVolumeSelectedArray;

                    $scope.totalMoney = userOrder.totalMoney;
                    $rootScope.totalNum = userOrder.totalNum;
                });
        };

        $scope.minusFoodClick = function(foodName, volumeName, price){
            foodMenu.GetFoodsByType(foodMenu.menuSideBar.currentSideItemName)
                .then(function(typeFoods){
                    userOrder.minusFood(typeFoods.foodVolumeSelectedArray, foodName, volumeName, price);
                    $scope.foodSelectedArray = typeFoods.foodVolumeSelectedArray;

                    $scope.totalMoney = userOrder.totalMoney;
                    $rootScope.totalNum = userOrder.totalNum;
                });
        };

        $scope.selectSeatNum = function(seatNum){
            userInfo.userInfo.seatNum = seatNum;
        };

        $scope.selectPeopleNum = function(peopleNum){
            userInfo.userInfo.peopleNum = peopleNum;
        };
    }]);

