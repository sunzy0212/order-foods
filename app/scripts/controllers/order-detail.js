ctrlModule
.controller('orderDetailCtrl',[
  '$scope',
	'$http',
	'$q',
	'$stateParams',
  'userOrders',
	function($scope,$http,$q,$stateParams,userOrders){
    setScrollHeight();
		var orderId = $stateParams.orderId;
    userOrders.getUserOrderDetailByOrderId(orderId)
      .then(function(data){
        $scope.orderDetail = data;
      });


    function setScrollHeight(){
      var headerHeight = 45;
      var footerHeight = 49;
      var scrollHeight = window.innerHeight - headerHeight - footerHeight;
      scrollHeight += 'px';
      $("ion-scroll").css("height",scrollHeight);
    }
	}
]);