/**
 * Created by ZhiyuanSun on 16/4/9.
 */
directiveModule.directive('sideBar',['$ionicModal',function($ionicModal){
  return {
    restrict: 'E',
    scope:{
      list: '=',
      changeItem: '&?'
    },
    templateUrl:'views/directives/side-bar.html',
    link: function(scope, element, attrs){ 
      scope.getItems = function(ev){
        var selectedDOMItem = $(ev.target).parents("div.side-bar-item-null");
        var selectedIndex = selectedDOMItem.data("food-type");

        if(scope.list.activeIndex != selectedIndex){
          scope.list.items[scope.list.activeIndex].isSelected = false;
          scope.list.items[selectedIndex].isSelected = true;
          scope.list.activeIndex = selectedIndex;
          scope.changeItem();
        }
      };
    }
  }
}]);

