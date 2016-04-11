'use strict'

directiveModule.directive('paymentMethodModal', [function () {
  return {
    templateUrl: '../../views/directives/payment-method-modal.html',
    restrict: 'E',
    transclude: true,
    replace:true,
    scope:{
        paymentInfo: '=',
        isPaymentMethodModalShow: '='
    },
    link: function (scope, element, attrs) {
        var $ele = $(element);
        scope.$watch('isPaymentMethodModalShow',function(newValue){
            if(newValue){
                $ele.modal('show');            
            }
            else{
                $ele.modal('hide');
            }
        })
    }
  };
}]);