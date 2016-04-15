/**
 * Created by ZhiyuanSun on 15/12/1.
 */
ctrlModule
.controller('orderFoodsCtrl',[
    '$scope',
    '$rootScope',
    '$q',
    '$http',
    '$ionicScrollDelegate',
    'userOrder',
    'foodMenu',
    'userInfo',
    'orderFoodsCache',
    'menu',
    function($scope,$rootScope,$q,$http,$ionicScrollDelegate,userOrder,foodMenu,userInfo,orderFoodsCache,menu){
        $scope.totalMoney  =userOrder.money.beforeDiscountMoney;

        //构建side bar用的数据
        // foodMenu.getAllFoodTypes()
        //     .then(function(foodTypes){
        //         $scope.foodTypes = foodTypes;
        //         return foodMenu.getFoodsByType(foodTypes.items[foodTypes.activeIndex]);
        //     })
        //     .then(function(typeFoods){
        //         $scope.foods = typeFoods.selectedFoods;
        //         $scope.foodSelectedArray = foodMenu.getFoodVolumeSelectedArray();
        //     });

        var foodType = null;
        orderFoodsCache.getFoodTypes()
            .then(function(foodTypes){
                $scope.foodTypes = foodTypes;
                return menu.getFoodsByType(foodTypes && foodTypes.items && foodTypes.items[foodTypes.activeIndex] && (foodType = foodTypes.items[foodTypes.activeIndex].name));
            })
            .then(function(foods){
                $scope.foods = foods;
                return orderFoodsCache.getFoodsSelectedStatusByType(foodType);
            })
            .then(function(foodsSelectedStatus){
                $scope.foodsSelectedStatus = foodsSelectedStatus;
                foodType = null;
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

        $scope.SelectVolume = function(foodName, volume){
          orderFoodsCache.getSelectedType()
            .then(function(foodType){
              orderFoodsCache.setFoodsSelectedStatus(foodType,foodName,volume);
            });
        };

        $scope.gotoCart = function(){
            window.location.href = "#/tab/cart";
        };

        $scope.changeFoodType = function(type){
            //设置content scroll到顶部
            $ionicScrollDelegate.$getByHandle('contentScroll').scrollTop();

            //设置当前选择的菜的种类
            menu.getFoodsByType(type)
              .then(function(foods){
                 $scope.foods = foods;
                 return orderFoodsCache.getFoodsSelectedStatusByType(type);
              })
              .then(function(foodsSelectedStatus){
                $scope.foodsSelectedStatus = foodsSelectedStatus;
              });
        };

        function currentSelectedFoodType(){
          return $scope.foodTypes.items[$scope.foodTypes.activeIndex];
        }



    }]);