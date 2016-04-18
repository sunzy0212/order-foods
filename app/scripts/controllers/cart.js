/**
 * Created by ZhiyuanSun on 15/12/19.
 */
ctrlModule
    .controller('cartCtrl',[
        '$scope',
        '$rootScope',
        '$q',
        '$ionicModal',
        'userOrder',
        'userInfo',
        'foodMenu',
        'paymentMethodService',
        'cart',
        'orderFoodsCache',
        function($scope, $rootScope, $q, $ionicModal, userOrder, userInfo, foodMenu, paymentMethodService, cart, orderFoodsCache){
          $scope.foods = cart.foods;
          $scope.money = cart.money;
          $scope.userOrderId = null;

          $scope.isPaymentMethodModalShow = false;

          $scope.restaurantInfo = userInfo.restaurantInfo;
          $scope.userInfo = userInfo.userInfo;

          //        使用优惠券的相关操作
          $ionicModal.fromTemplateUrl('views/coupon.html',{
              scope       :   $scope,
              animation   :   'slide-left-right'
          }).then(function(modal){
              $scope.modal = modal;
          });
          $scope.selectCouponOpen = function(){
              $scope.modal.show();
          };

          $scope.selectCouponDone = function(){
              $scope.modal.hide();
              $scope.money = userOrder.discount();
          };

          $scope.addFoodClick = function(foodName, volumeObj){
            cart.addFood(foodName,volumeObj);
          };

          $scope.minusFoodClick = function(foodName, volumeObj){
            cart.minFood(foodName,volumeObj);
          };

          $scope.selectSeatNum = function(seatNum){
              userInfo.userInfo.seatNum = seatNum;
          };

          $scope.selectPeopleNum = function(peopleNum){
              userInfo.userInfo.peopleNum = peopleNum;
          };

          $scope.selectInvoiceNeed = function(isInvoiceNeed){
              userInfo.userInfo.isInvoiceNeed = isInvoiceNeed;
          };

          $scope.conformUserOrderClick = function(){
              if($scope.money.beforeDiscount <= 0 ){
                  return ;
              }

              $scope.orderConforming = true;
              userOrder.conformUserOrder()
                  .then(function(retData){
                      $scope.orderConforming = false;
                      // $scope.paymentModal.show();
                      $scope.userOrderId = retData;

                      userOrder.clearCart();
                      $scope.foods={};
                      $scope.totalMoney = 0;
                      $rootScope.totalNum = 0;



                      $scope.isPaymentMethodModalShow = true;

                      $scope.paymentInfo = {
                          userOrderId: retData,
                          totalMoney: userOrder.money.afterDiscountMoney,
                          status: 1,
                          paymentMethods: paymentMethodService.paymentMethods
                      }
                  });
          };

          $scope.saveInvoice = function(invoice){
              userInfo.userInfo.invoice = invoice;
          };
    }]);

