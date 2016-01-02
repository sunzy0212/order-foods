/**
 * Created by zhiyuans on 1/2/2016.
 */
directiveModule.directive('useCoupon',['$ionicModal',function($ionicModal){
    return {
        restrict: 'E',
        scope:{
            coupons: '=',
            totalMoney: '@',
            discountMoney: '=',
            afterDiscountMoney: '='
        },
        templateUrl:'../../views/directives/use-coupon.html',
        link: function(scope, element, attrs){
            $ionicModal.fromTemplateUrl('views/coupon.html',{
                ionicScope       :   scope,
                animation   :   'slide-left-right'
            }).then(function(modal){
                scope.modal = modal;
            });

            scope.$on('$destroy',function(){
                scope.modal.remove();
            });

            scope.selectCouponDone = function(){
                scope.modal.hide();
            };

            scope.selectCouponOpen = function(){
                scope.modal.show();
            };
        }
    }

}]);