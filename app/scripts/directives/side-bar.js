/**
 * Created by ZhiyuanSun on 16/4/9.
 */
directiveModule.directive('sideBar',['$ionicModal',function($ionicModal){
  return {
    restrict: 'E',
    scope:{
      items: '=',
      changeItem: '&?'
    },
    templateUrl:'views/directives/side-bar.html',
    link: function(scope, element, attrs){ 
      scope.getItems = function(ev){
        var selectedDOMItem = $(ev.target).parents("div.side-bar-item-null");
        var selectedIndex = selectedDOMItem.data("food-type");
        clearSelected(scope.items);
        scope.items[selectedIndex].isSelected = true;

        scope.changeItem(selectedIndex);
      };

      // 将items数组的每个元素的isSelected属性设为false
      function clearSelected(items){
        items.forEach(function(item){
          item.isSelected = false;
        })
      }
    }
  }
}]);

