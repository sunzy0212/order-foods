/**
 * Created by ZhiyuanSun on 16/1/23.
 */
directiveModule.directive('orderAbstractItem', function(){
    return {
        restrict: 'E',
        scope:{
            orderAbstractItem: '='
        },
        templateUrl:'../../views/directives/order-abstract-item.html',
        link: function(scope, element, attrs){

        }
    }
});