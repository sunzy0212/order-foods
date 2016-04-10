/**
 * Created by ZhiyuanSun on 16/1/1.
 */
/**
 * Created by ZhiyuanSun on 16/1/1.
 */
directiveModule.directive('cartOperationButton',['$rootScope','userOrder',function($rootScope,userOrder){
    return {
        restrict: 'E',
        scope:{
            foods: '=',
            totalMoney: '='
        },
        templateUrl:'views/directives/cart-operation-button.html',
        link: function(scope, element, attrs){
            scope.gotoOrderFoods = function(){
                window.location.href='#/tab/order-foods';
            };

            scope.clearCart = function(){
                userOrder.clearCart();
                scope.foods={};
                scope.totalMoney = 0;
                $rootScope.totalNum = 0;
            };
        }
    }
}]);