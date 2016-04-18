/**
 * Created by ZhiyuanSun on 15/12/1.
 */
ctrlModule
    .controller('ordersCtrl',[
    '$scope',
    '$ionicScrollDelegate',
    'userOrders',
    'cart',
    function($scope, $ionicScrollDelegate, userOrders, cart){
        setScrollHeight();

        var ORDER_PROCESS_TYPE = {
            ALL             :   0,
            UNFINISHED      :   1,
            NEEDEVALUATE    :   2
        };
        init();

        $scope.selectOrderProcessType = function(processType){
          //设置content scroll到顶部
          $ionicScrollDelegate.$getByHandle('orderAbstractScroll').scrollTop();

          $scope.orderProcessTypes.forEach(function(item){
              if(item.processType == processType){
                  item.isActive = true;
              }
              else{
                  item.isActive = false;
              }
          });

          $scope.orderLoaded = false;
          userOrders.getUserOrderByOpenIdAndStatus(cart.openId,processType,0,10)
            .then(function(orderAbstracts){
              $scope.orderLoaded = true;
              $scope.orderAbstracts = orderAbstracts;
            })
            .catch(function(err){
              $scope.orderLoaded = true;
            });
        };

        $scope.continueOrder = function(ev){
            var orderAbstractItem = ev.target.getAttribute("order-abstract-item");
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

          $scope.orderLoaded = false;
          userOrders.getUserOrderByOpenIdAndStatus(cart.openId,0,0,10)
                .then(function(orderAbstracts){
                    $scope.orderLoaded = true;
                    $scope.orderAbstracts = orderAbstracts;
                })
                .catch(function(err){
                    $scope.orderLoaded = true;
                });
        }

        function setScrollHeight(){
            var headerHeight = 45;
            var footerHeight = 49;
            var orderAbstractScrollHeight = document.body.scrollHeight - headerHeight - footerHeight;

            orderAbstractScrollHeight += 'px';
            angular.element("#orderAbstractScroll").css("height",orderAbstractScrollHeight);
        }
    }]);