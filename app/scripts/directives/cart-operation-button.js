/**
 * Created by ZhiyuanSun on 16/1/1.
 */
/**
 * Created by ZhiyuanSun on 16/1/1.
 */
directiveModule.directive('cartOperationButton',function(){
    return {
        restrict: 'E',
        scope:{
            money: '='
        },
        templateUrl:'../../views/directives/cart-operation-button.html',
        link: function(scope, element, attrs){

        }
    }
})