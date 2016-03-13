/**
 * Created by ZhiyuanSun on 15/12/1.
 */
ctrlModule
    .controller('ordersCtrl',['$scope', '$q', '$http','$ionicScrollDelegate', 'userInfo', function($scope, $q, $http, $ionicScrollDelegate, userInfo){
//        userInfo.openId = 'wechat_openId';
        setScrollHeight();

        var ORDER_PROCESS_TYPE = {
            ALL             :   0,
            UNFINISHED      :   1,
            NEEDEVALUATE    :   2
        };
        init();

        //如果餐厅信息未被加载，则加载餐厅信息
        userInfo.getRestaurantInfo()
            .then(function(restaurantInfo){
            });


        $scope.selectOrderProcessType = function(processType){
            $scope.orderProcessTypes.forEach(function(item){
                if(item.processType == processType){
                    item.isActive = true;
                }
                else{
                    item.isActive = false;
                }
            });

            getUserOrderByOpenIdAndStatus(userInfo.openId,processType,0,10)
                .then(function(orderAbstracts){
                    $scope.orderLoaded = true;
                    $scope.orderAbstracts = orderAbstracts;
                    $ionicScrollDelegate.$getByHandle('orderAbstractScroll').scrollTop();
                })
                .catch(function(err){
                    $scope.orderLoaded = true;
                });
        };

        function init(){


            $scope.orderProcessTypes = [
                {
                    name        :   "全部订单",
                    isActive    :   true,
                    processType :   0
                },
                {
                    name        :   "未完成",
                    isActive    :   false,
                    processType :   1
                },
                {
                    name        :   "待评价",
                    isActive    :   false,
                    processType :   2
                }
            ];

            getUserOrderByOpenIdAndStatus(userInfo.openId,0,0,10)
                .then(function(orderAbstracts){
                    $scope.orderLoaded = true;
                    $scope.orderAbstracts = orderAbstracts;
                })
                .catch(function(err){
                    $scope.orderLoaded = true;
                });
        }

        function getUserOrderByOpenIdAndStatus(openId, status, skipNum, limitNum){
            $scope.orderLoaded = false;
            var deferred = $q.defer();
            var postData = {
                openId  :   openId,
                status  :   status,
                skipNum :   skipNum,
                limitNum:   limitNum
            };
            var url = '/userOrder/getUserOrderByOpenIdAndStatus';

            $http.post(url,postData)
                .success(function(data){
                    deferred.resolve(data);
                })
                .error(function(err){
                    deferred.reject(err);
                });
            return deferred.promise;
        }

        function setScrollHeight(){
            var headerHeight = 45;
            var footerHeight = 49;
            var orderAbstractScrollHeight = document.body.scrollHeight - headerHeight - footerHeight;

            orderAbstractScrollHeight += 'px';
            angular.element("#orderAbstractScroll").css("height",orderAbstractScrollHeight);
        }
    }]);