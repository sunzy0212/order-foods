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
                    callback(null,data[0]);
                }).error(function(XMLHttpRequest, textStatus, errorThrown){

                });
            },
            function GetFoodsByType(foodType,callback){
                if(foodType == 'undefined'){
                    callback(null,'done');
                }
                else{
                    var url='/menu/GetFoodsByType';
                    var sendData={
                        'foodType':foodType
                    };
                    $http.post(url,sendData)
                        .success(function(data){
                            $scope.foods=data;
                            callback(null,'done');
                        })
                        .error(function(XMLHttpRequest, textStatus, errorThrown){

                        });
                }

            }

        ],function(err,ret){

        });

        $scope.GetFoodsByType = function(sideItem){
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
                })
                .error(function(XMLHttpRequest, textStatus, errorThrown){

                });
        };

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