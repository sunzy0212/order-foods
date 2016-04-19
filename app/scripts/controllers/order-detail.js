ctrlModule
.controller('orderDetailCtrl',[
	'$http',
	'$q',
	'$stateParams',
	function($http,$q,$stateParams){
		var orderId = $stateParams.orderId;
	}
]);