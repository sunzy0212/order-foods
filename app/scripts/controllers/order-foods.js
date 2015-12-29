/**
 * Created by ZhiyuanSun on 15/12/1.
 */
ctrlModule
.controller('orderFoodsCtrl',['$scope','$rootScope','$q','$http','$ionicScrollDelegate','userOrder','foodMenu', 'userInfo',function($scope,$rootScope,$q,$http,$ionicScrollDelegate,userOrder,foodMenu,userInfo){
        $scope.totalMoney  =userOrder.totalMoney

        //构建side bar用的数据
        foodMenu.GetAllFoodTypes()
            .then(function(menuSideBar){
                $scope.foodTypes = menuSideBar.menuItems;
                return foodMenu.GetFoodsByType(menuSideBar.currentSideItemName);
            })
            .then(function(typeFoods){
                $scope.foods = typeFoods.selectedFoods;
                $scope.foodSelectedArray = typeFoods.foodVolumeSelectedArray;
            });

        //如果餐厅信息未被加载，则加载餐厅信息
        userInfo.getRestaurantInfo()
            .then(function(restaurantInfo){
            });

        $scope.addFoodClick = function(foodName){
            foodMenu.GetFoodsByType(foodMenu.menuSideBar.currentSideItemName)
                .then(function(typeFoods){
                    userOrder.addFood(typeFoods.foodVolumeSelectedArray, foodName);
                    $scope.foodSelectedArray = typeFoods.foodVolumeSelectedArray;

                    $scope.totalMoney = userOrder.totalMoney;
                    $rootScope.totalNum = userOrder.totalNum;
                });

        };

        $scope.minusFoodClick = function(foodName){
            foodMenu.GetFoodsByType(foodMenu.menuSideBar.currentSideItemName)
                .then(function(typeFoods){
                    userOrder.minusFood(typeFoods.foodVolumeSelectedArray, foodName);
                    $scope.foodSelectedArray = typeFoods.foodVolumeSelectedArray;

                    $scope.totalMoney = userOrder.totalMoney;
                    $rootScope.totalNum = userOrder.totalNum;
                });
        };

        $scope.SelectVolume = function(foodName, selectVolume){

            selectVolume.num = userOrder.getFoodNum(foodName, selectVolume.name);

            foodMenu.setFoodVolumeSelectedArray(foodName, selectVolume);

            //该数组表示每一种菜当前select控件的选择情况
            $scope.foodSelectedArray = foodMenu.getFoodVolumeSelectedArray();
        };

        $scope.gotoCart = function(){
            window.location.href = "#/tab/cart";
        };

        $scope.GetFoodsByTypeClick = function(foodTypeName){
            //设置content scroll到顶部
            $ionicScrollDelegate.$getByHandle('contentScroll').scrollTop();

            //设置当前选择的菜的种类
            foodMenu.menuSideBar.currentSideItemName = foodTypeName;

            foodMenu.GetFoodsByType(foodTypeName)
                .then(function(typeFoods){
                    $scope.foods = typeFoods.selectedFoods;
                    $scope.foodSelectedArray = typeFoods.foodVolumeSelectedArray;
                });
        };
    }]);

function InitGetFoodsByType(foodMenu, userOrder, $scope){
    if(foodMenu.selectedFoods == null){
        if(foodMenu.menuSideBar != null && foodMenu.menuSideBar[0] != null){
            foodMenu.GetFoodsByType(foodMenu.menuSideBar[0], $scope, function(err, ret){
                if(err){    //异常处理

                }
                else{
                    $scope.foods = ret;

                    if(userOrder.foodVolumeSelectedArray == null){
                        userOrder.initFoodVolumeSelectedArray($scope.foods);
                    }
                    //该数组表示每一种菜当前select控件的选择情况
                    $scope.foodSelectedArray = userOrder.foodVolumeSelectedArray;

                    $scope.$apply();
                }
            });
        }
        else{

        }

    }
    else{
        $scope.foods = foodMenu.selectedFoods;

        //该数组表示每一种菜当前select控件的选择情况
        $scope.foodSelectedArray = userOrder.foodVolumeSelectedArray;
    }
}