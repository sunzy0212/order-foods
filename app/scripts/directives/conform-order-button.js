/**
 * Created by ZhiyuanSun on 16/1/1.
 */
directiveModule.directive('conformOrderButton',function(){
    return {
        restrict: 'E',
        scope:{
            money: '='
        },
        templateUrl:'../../views/directives/conform-order-button.html',
        link: function(scope, element, attrs){

        }
    }
})