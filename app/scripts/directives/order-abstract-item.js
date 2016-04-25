/**
 * Created by ZhiyuanSun on 16/1/23.
 */
directiveModule.directive('orderAbstract', function(){
  return {
    restrict: 'AE',
    scope:{
      orderAbstractItem: '='
    },
    templateUrl:'views/directives/order-abstract-item.html',
    link: function(scope, element, attrs){
      var ORDER_PROCESS_TYPE = [
        "交易完成",
        "未付款",
        "待评价"
      ];
      scope.orderAbstractItem.statusName = ORDER_PROCESS_TYPE[scope.orderAbstractItem.status];
    }
  }
});