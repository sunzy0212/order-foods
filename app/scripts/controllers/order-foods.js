/**
 * Created by ZhiyuanSun on 15/12/1.
 */
ctrlModule
.controller('orderFoodsCtrl',['$scope','$rootScope','$q','$http','$ionicScrollDelegate','userOrder','foodMenu', 'userInfo',function($scope,$rootScope,$q,$http,$ionicScrollDelegate,userOrder,foodMenu,userInfo){
        $scope.totalMoney  =userOrder.money.beforeDiscountMoney;

        //构建side bar用的数据
        foodMenu.getAllFoodTypes()
            .then(function(foodTypes){
                $scope.foodTypes = foodTypes;
                return foodMenu.getFoodsByType(foodTypes.items[foodTypes.activeIndex]);
            })
            .then(function(typeFoods){
                $scope.foods = typeFoods.selectedFoods;
                $scope.foodSelectedArray = foodMenu.getFoodVolumeSelectedArray();
            });

        //如果餐厅信息未被加载，则加载餐厅信息
        userInfo.getRestaurantInfo()
            .then(function(restaurantInfo){
            });

        $scope.addFoodClick = function(foodName){
            foodMenu.getFoodsByType()
                .then(function(typeFoods){
                    userOrder.addFood(typeFoods.foodVolumeSelectedArray, foodName);
                    $scope.foodSelectedArray = typeFoods.foodVolumeSelectedArray;

                    $scope.totalMoney = userOrder.money.beforeDiscountMoney;
                    $rootScope.totalNum = userOrder.totalNum;
                });
        };

        $scope.minusFoodClick = function(foodName){
            foodMenu.getFoodsByType()
                .then(function(typeFoods){
                    userOrder.minusFood(typeFoods.foodVolumeSelectedArray, foodName);
                    $scope.foodSelectedArray = typeFoods.foodVolumeSelectedArray;

                    $scope.totalMoney = userOrder.money.beforeDiscountMoney;
                    $rootScope.totalNum = userOrder.totalNum;
                });
        };

        $scope.SelectVolume = function(foodName, selectVolume){

            foodMenu.setFoodVolumeSelectedArray(foodName, selectVolume);

            //该数组表示每一种菜当前select控件的选择情况
            $scope.foodSelectedArray = foodMenu.getFoodVolumeSelectedArray();
        };

        $scope.gotoCart = function(){
            window.location.href = "#/tab/cart";
        };

        $scope.changeFoodType = function(foodTypeName){
            //设置content scroll到顶部
            $ionicScrollDelegate.$getByHandle('contentScroll').scrollTop();

            //设置当前选择的菜的种类
            foodMenu.getFoodsByType(foodTypeName)
                .then(function(typeFoods){
                    $scope.foods = typeFoods.selectedFoods;
                    $scope.foodSelectedArray = foodMenu.getFoodVolumeSelectedArray();
                });
        };

        function currentSelectedFoodType(){
          return $scope.foodTypes.items[$scope.foodTypes.activeIndex];
        }

    }]);