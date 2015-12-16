/**
 * Created by ZhiyuanSun on 15/12/15.
 */
directiveModule.directive('foodRate',function(){
    return {
        restrict: 'E',
        scope:{
            level: '='
        },
        templateUrl:'../../views/directives/food-rate.html',
        link: function(scope, element, attrs){
            scope.isActive = new Array(false,false,false,false,false);

            switch (scope.level){
                case 0:
                    SetIsActiveStar(0);
                    break;
                case 1:
                    SetIsActiveStar(1);
                    break;
                case 2:
                    SetIsActiveStar(2);
                    break;
                case 3:
                    SetIsActiveStar(3);
                    break;
                case 4:
                    SetIsActiveStar(4);
                    break;
                case 5:
                    SetIsActiveStar(5);
                    break;
                default:
                    SetIsActiveStar(3);
                    break;
            }

            function SetIsActiveStar(n_level){
                for(var i=0; i < n_level; i++){
                    scope.isActive[i] = true;
                }
            }
        }
    }
});