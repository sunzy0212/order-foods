'use strict';

directiveModule.directive('paymentMethodModal', ['paymentMethodService','cart',function (paymentMethodService,cart) {
  return {
    templateUrl: 'views/directives/payment-method-modal.html',
    restrict: 'AE',
    transclude: true,
    replace:true,
    scope:{
      paymentInfo: '=',
      isPaymentMethodModalShow: '=',
      afterConformPayment:'&'
    },
    link: function (scope, element) {
      var $ele = $(element);

      $ele.odModal('hide');

      scope.selectPaymentMethod = function(id){
          paymentMethodService.setActive(id);
      };

      var tabNavDOM = $(".tab-nav.tabs");
      scope.$watch('isPaymentMethodModalShow',function(newValue){
          if(newValue){
              $ele.odModal('show');
              tabNavDOM.css("z-index","3");
          }
          else{
              $ele.odModal('hide');
              tabNavDOM.css("z-index","5");
          }
      });
      scope.conformPayment = function(){
        scope.isPaying = true;
        cart.conformPayment(scope.paymentInfo.userOrderId,paymentMethodService.activePaymentId)
          .then(function(){
            scope.isPaying = false;
            scope.isPaymentMethodModalShow = false;
            scope.afterConformPayment();
          });
      };
    }
  };
}]);