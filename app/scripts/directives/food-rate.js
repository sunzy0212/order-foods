/**
 * Created by ZhiyuanSun on 15/12/15.
 */
directiveModule.directive('foodRate',function(){
    return {
        restrict: 'E',
        scope:{

        },
        templateUrl:'',
        link: function(scope, element, attrs){
            level: '='
        }
    }
});