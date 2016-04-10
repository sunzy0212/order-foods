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
    link: function(scope, element){ 

      //防止全局作用域命名污染，全局变量使用完要及时回收
      window.sideBarGlobal = {
        activeIndex: 0,
        // activeIndex: scope.list.activeIndex,
        ele: element
      } 

      setTimeout(function(){
        var itemDOMs = window.sideBarGlobal.ele[0].getElementsByClassName("tab-item");
        $(itemDOMs[window.sideBarGlobal.activeIndex]).addClass("side-bar-item-active");
        window.sideBarGlobal = null;  //回收全局资源
      },0)

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

