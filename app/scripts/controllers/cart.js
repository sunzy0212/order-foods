/**
 * Created by ZhiyuanSun on 15/12/19.
 */
ctrlModule
    .controller('cartCtrl',[
        '$scope', '$rootScope', '$q', '$ionicModal', 'userOrder', 'userInfo', 'foodMenu', 'paymentMethodService',
        function($scope, $rootScope, $q, $ionicModal, userOrder, userInfo, foodMenu, paymentMethodService){
        $scope.foods = userOrder.foods;
        $scope.money = userOrder.getMoney();
        $scope.userOrderId = null;

        $scope.isPaymentMethodModalShow = false;
        /*userInfo.getRestaurantInfo()
            .then(function(restaurantInfo){
                $scope.restaurantInfo = userInfo.restaurantInfo;
                $scope.userInfo = userInfo.userInfo;
            });*/

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

        $scope.addFoodClick = function(foodName, volumeName, price){
            foodMenu.getFoodsByType()
                .then(function(typeFoods){
                    userOrder.addFood(typeFoods.foodVolumeSelectedArray, foodName, volumeName, price);
                    $scope.foodSelectedArray = typeFoods.foodVolumeSelectedArray;

                    $scope.money = userOrder.getMoney();
                    $rootScope.totalNum = userOrder.totalNum;
                });
        };

        $scope.minusFoodClick = function(foodName, volumeName, price){
            foodMenu.getFoodsByType()
                .then(function(typeFoods){
                    userOrder.minusFood(typeFoods.foodVolumeSelectedArray, foodName, volumeName, price);
                    $scope.foodSelectedArray = typeFoods.foodVolumeSelectedArray;

                    $scope.money = userOrder.getMoney();
                    $rootScope.totalNum = userOrder.totalNum;
                });
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
            if($scope.money.beforeDiscountMoney <= 0 ){
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

