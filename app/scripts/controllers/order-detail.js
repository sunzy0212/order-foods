ctrlModule
.controller('orderDetailCtrl',[
  '$scope',
	'$http',
	'$q',
	'$stateParams',
  '$state',
  'userOrders',
	function($scope,$http,$q,$stateParams,$state,userOrders){
    setScrollHeight();
		var orderId = $stateParams.orderId;
    $scope.loaded = false;
    userOrders.getUserOrderDetailByOrderId(orderId)
      .then(function(data){
        console.log(data);
        $scope.orderDetail = dataProxy(data);
        $scope.loaded = true;
      })
      .catch(function(err){
        $scope.loaded = true;
      });

    $scope.backToOrders = function(){
      $state.go('tab.orders');
    };


    function setScrollHeight(){
      var headerHeight = 45;
      var footerHeight = 49;
      var scrollHeight = window.innerHeight - headerHeight - footerHeight;
      scrollHeight += 'px';
      $("ion-scroll").css("height",scrollHeight);
    }

    function dataProxy(data){
      var statusMap = {
        "1": "未付款",
        "2": "待评价",
        "3": "已完成"
      };

      data.status = statusMap[data.status];
      data.time = formatTime(new Date(data.time));
      return data;
    }

    // format a Date object to "YYYY-MM-DD hh:mm:ss"
    function formatTime(obj){
      var dateArr = [obj.getFullYear(), obj.getMonth()+1, obj.getDate()];
      var timeArr = [obj.getHours(), obj.getMinutes(), obj.getSeconds()];
      return dateArr.join('-') + ' ' + timeArr.join(':');
    }
	}
]);