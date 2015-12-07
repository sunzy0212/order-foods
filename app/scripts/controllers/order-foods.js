/**
 * Created by ZhiyuanSun on 15/12/1.
 */
ctrlModule
.controller('orderFoodsCtrl',['$scope','$http',function($scope,$http){

        async.waterfall([
            function GetAllFoodTypes(callback){
                $.ajax({
                    type:'GET',
                    url:'/menu/GetFoodType',
                    dataType:'json'
                }).success(function(data){
                    $scope.foodTypes=data;
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


    }]);