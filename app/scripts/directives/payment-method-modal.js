'use strict'

directiveModule.directive('paymentMethodModal', ['paymentMethodService',function (paymentMethodService) {
  return {
    templateUrl: 'views/directives/payment-method-modal.html',
    restrict: 'AE',
    transclude: true,
    replace:true,
    scope:{
        paymentInfo: '=',
        isPaymentMethodModalShow: '='
    },
    link: function (scope, element, attrs) {
        var $ele = $(element);

        $ele.odModal('hide');

        scope.selectPaymentMethod = function(id){
            scope.paymentInfo.paymentMethods = paymentMethodService.setActive(id);
        }

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
    }
  };
}]);