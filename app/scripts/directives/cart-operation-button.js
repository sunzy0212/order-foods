/**
 * Created by ZhiyuanSun on 16/1/1.
 */
/**
 * Created by ZhiyuanSun on 16/1/1.
 */
directiveModule.directive('cartOperationButton',[
  '$rootScope',
  'cart',
  '$state',
  function($rootScope,cart,$state){
    return {
        restrict: 'AE',
        scope:{
            foods: '=',
            totalMoney: '='
        },
        templateUrl:'views/directives/cart-operation-button.html',
        link: function(scope){
            scope.gotoOrderFoods = function(){
              $state.go('tab.order-foods');
            };

            scope.clearCart = function(){
                cart.clearCart();
            };
        }
    }
}]);