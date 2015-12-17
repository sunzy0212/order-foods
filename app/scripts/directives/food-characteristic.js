/**
 * Created by ZhiyuanSun on 15/12/15.
 */
directiveModule.directive('foodCharacteristic',function(){
    return {
        restrict: 'E',
        scope:{
            content: '='
        },
        templateUrl:'../../views/directives/food-characteristic.html',
        link: function(scope, element, attrs){
            var length = scope.content.length;
            var widthStyleValue = 10 * length +5;
            widthStyleValue += "px";
            element.find('div').css("width", widthStyleValue);
        }
    }
});