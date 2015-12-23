/**
 * Created by ZhiyuanSun on 15/12/1.
 */
ctrlModule
.controller('orderFoodsCtrl',['$scope','$rootScope','$http','$ionicScrollDelegate','userOrder','foodMenu',function($scope,$rootScope,$http,$ionicScrollDelegate,userOrder,foodMenu){
        $scope.totalMoney = 0;
        //构建side bar用的数据
        if(foodMenu.menuSideBar == null){
            foodMenu.GetAllFoodTypes(function(err, ret){
                if(err){    //异常处理

                }
                else{
                    $scope.foodTypes = ret;

                    InitGetFoodsByType(foodMenu, $scope);
                    $scope.$apply();
                }
            })
        }
        else{
            $scope.foodTypes = foodMenu.menuSideBar;

            InitGetFoodsByType(foodMenu, $scope);
        }



        $scope.GetFoodsByTypeClick = function(foodType){
            //设置content scroll到顶部
            $ionicScrollDelegate.$getByHandle('contentScroll').scrollTop();

            foodMenu.GetFoodsByType(foodType, $scope, function(err, ret){
                if(err){

                }
                else{
                    $scope.foods=foodMenu.selectedFoods;
                    $scope.$apply();
                }
            });
        };

        $scope.addFoodClick = function(foodName){
            var selectedVolume = $scope.foodSelectedArray[foodName];
            if(selectedVolume != undefined){
                userOrder.addFood(foodName, selectedVolume.name, selectedVolume.price);
                selectedVolume.num = userOrder.getFoodNum(foodName,selectedVolume.name);
            }
            else{
                throw new Error("不能确定您当前所选的菜的份量。");
            }

            $scope.totalMoney = userOrder.totalMoney;
            $rootScope.totalNum = userOrder.totalNum;

        };
        $scope.minusFoodClick = function(foodName){
            var selectedVolume = $scope.foodSelectedArray[foodName];
            if(selectedVolume != undefined){
                userOrder.minusFood(foodName, selectedVolume.name, selectedVolume.price);
                selectedVolume.num = userOrder.getFoodNum(foodName, selectedVolume.name);
            }
            else{
                throw new Error("不能确定您当前所选的菜的份量。");
            }

            $scope.totalMoney = userOrder.totalMoney;
            $rootScope.totalNum = userOrder.totalNum;
        };

        $scope.SelectVolume = function(foodName, selectVolume){
            var selectVolumeItem = foodMenu.foodVolumeSelectedArray[foodName];

            if(selectVolumeItem != undefined){
                selectVolumeItem.name = selectVolume.name;
                selectVolumeItem.price = selectVolume.price;
                selectVolumeItem.num = userOrder.getFoodNum(foodName, selectVolume.name);

                //该数组表示每一种菜当前select控件的选择情况
                $scope.foodSelectedArray = foodMenu.foodVolumeSelectedArray;
            }
            else{
                throw new Error("不能确定您当前所选的菜的份量。");
            }
        };
    }]);

function InitGetFoodsByType(foodMenu, $scope){
    if(foodMenu.selectedFoods == null){
        if($scope.foodTypes != null && $scope.foodTypes[0] != null){
            foodMenu.GetFoodsByType($scope.foodTypes[0], $scope, function(err, ret){
                if(err){    //异常处理

                }
                else{
                    $scope.foods = ret;

                    //该数组表示每一种菜当前select控件的选择情况
                    $scope.foodSelectedArray = foodMenu.foodVolumeSelectedArray;
                }
            });
        }
        else{

        }

    }
    else{

    }
}