/**
 * Created by ZhiyuanSun on 16/4/9.
 */
directiveModule.directive('sideBar',['$ionicModal',function($ionicModal){
  return {
    restrict: 'E',
    scope:{
      list: '=',
      changeItem: '&'
    },
    templateUrl:'views/directives/side-bar.html',
    link: function(scope, element, attrs){
      setTimeout((function(element){
        return function(){
          var itemDOMs = element[0].getElementsByClassName("tab-item");
          $(itemDOMs[scope.list.activeIndex]).addClass("side-bar-item-active");
        }
      })(element),0);

      scope.getItems = function(ev){
        var selectedDOMItem = $(ev.target).parents("div.side-bar-item-null");
        var selectedIndex = selectedDOMItem.data("food-type");
        if(selectedIndex !== scope.list.activeIndex){
          $(element).find("div[data-food-type=" + scope.list.activeIndex + "] div.tab-item").removeClass('side-bar-item-active');
          selectedDOMItem.find("div.tab-item").addClass('side-bar-item-active');
          scope.list.activeIndex = selectedIndex;

          scope.changeItem(scope.list.activeIndex);
        }
      };
    }
  }
}]);