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
    'cart',
    function($scope,$rootScope,$q,$http,$ionicScrollDelegate,userOrder,foodMenu,userInfo,orderFoodsCache,menu,cart){
        $scope.totalMoney  =cart.money.beforeDiscount;
        $rootScope.totalNum = cart.totalNum;

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
          var currentVolumeObj = $scope.foodsSelectedStatus[foodName].volume;
          var ret= cart.addFood(foodName, currentVolumeObj);
          $scope.foodsSelectedStatus[foodName].num = ret.num;
          $scope.totalMoney = ret.money;
        };

        $scope.minusFoodClick = function(foodName){
          var currentVolumeObj = $scope.foodsSelectedStatus[foodName].volume;
          var ret = cart.minFood(foodName,currentVolumeObj);
          $scope.foodsSelectedStatus[foodName].num = ret.num;
          $scope.totalMoney = ret.money;
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

            //获取当前选择的菜的种类
            menu.getFoodsByType(type)
              .then(function(foods){
                 $scope.foods = foods;
                 return orderFoodsCache.getFoodsSelectedStatusByType(type);
              })
              .then(function(foodsSelectedStatus){
                $scope.foodsSelectedStatus = foodsSelectedStatus;
              });
        };

        $scope.getFoodNum = function(foodName, volume){
          return cart.getFoodNum(foodName,volume);
        };

        function currentSelectedFoodType(){
          return $scope.foodTypes.items[$scope.foodTypes.activeIndex];
        }



    }]);