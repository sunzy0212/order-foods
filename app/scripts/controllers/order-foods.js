/**
 * Created by ZhiyuanSun on 15/12/1.
 */
ctrlModule
.controller('orderFoodsCtrl',['$scope','$http','$ionicScrollDelegate',function($scope,$http,$ionicScrollDelegate){
        $scope.isSideBarItemActive

        async.waterfall([
            function GetAllFoodTypes(callback){
                $.ajax({
                    type:'GET',
                    url:'/menu/GetFoodType',
                    dataType:'json'
                }).success(function(data){
                    //构建side bar用的数据
                    $scope.foodTypes = ConstructSideBar(data);
                    //初始设第一项为选中项
                    if($scope.foodTypes.length > 0){
                        $scope.foodTypes[0].isActive = true;
                    }
                    callback(null,$scope.foodTypes[0]);
                }).error(function(XMLHttpRequest, textStatus, errorThrown){

                });
            },
            function (foodType,callback){
                if(foodType == 'undefined'){
                    callback(null,'done');
                }
                else{
                    /*var url='/menu/GetFoodsByType';
                    var sendData={
                        'foodType':foodType
                    };
                    $http.post(url,sendData)
                        .success(function(data){
                            $scope.foods=data;
                            callback(null,'done');
                        })
                        .error(function(XMLHttpRequest, textStatus, errorThrown){

                        });*/
                    GetFoodsByType(foodType);
                }

            }

        ],function(err,ret){

        });

        $scope.GetFoodsByTypeClick = GetFoodsByType;

        function GetFoodsByType(sideItem){
            //设置选中的side bar项
            SideBarItemSelect(sideItem);

            //设置content scroll到顶部
            $ionicScrollDelegate.$getByHandle('contentScroll').scrollTop();

            //请求该菜型所对应的所有菜
            var url='/menu/GetFoodsByType';
            var sendData={
                'foodType':sideItem.name
            };
            $http.post(url,sendData)
                .success(function(data){
                    $scope.foods=data;

                    //用于处理同一种菜，不同份量时，价格不同时的显示与点餐
                    //会修改$scope.foods
                    ConstructFoodPrice(data);
                })
                .error(function(XMLHttpRequest, textStatus, errorThrown){

                });
        };

        //用于处理同一种菜，不同份量时，价格不同时的显示与点餐
        function ConstructFoodPrice(foods){
            for(var i=0; i < foods.length; i++){
                var foodPrice = foods[i].price;
                var foodPriceRet = new Array();
                for(var key in foodPrice){
                    if(foodPrice[key] != -1){
                        foodPriceRet.push({
                            name:   GetFoodWeightDisplayName(key),
                            num:    foodPrice[key]
                        });
                    }
                }

                //当菜不区分份量时，
                if(foodPriceRet.length == 1){
                    foodPriceRet[0].name = "普通份";
                }

                $scope.foods[i].price = foodPriceRet;
            }
        }

        //将数据库中用于表示菜的份量的关键词，转换成用于显示的中文字符
        // small --> 小份
        // middle --> 中份
        // large --> 大份
        function GetFoodWeightDisplayName(str){
            var ret = "";
            switch (str){
                case 'small':
                    ret = "小份";
                    break;
                case 'middle':
                    ret = "中份";
                    break;
                case 'large':
                    ret = "大份";
                    break;
                default :
                    ret = "中份";
                    break;
            }

            return ret;
        }

        //设置选中的side bar项
        function SideBarItemSelect(sideItem){
            for(var i=0; i < $scope.foodTypes.length; i++){
                if($scope.foodTypes[i].name == sideItem.name){
                    $scope.foodTypes[i].isActive = true;
                }
                else{
                    $scope.foodTypes[i].isActive = false;
                }
            }
        }

    }]);

//构建side bar用的数据：包含菜的名字和选中项
function ConstructSideBar(foodsArray){
    var ret = new Array();
    for(var i=0; i<foodsArray.length; i++){
        ret.push({
            name: foodsArray[i],
            isActive: false
        })
    }
    return ret;
}