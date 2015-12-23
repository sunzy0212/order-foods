/**
 * Created by ZhiyuanSun on 15/12/19.
 */
ctrlModule
    .controller('cartCtrl',['$scope','userOrder',function($scope, userOrder){
        console.log('cartCtrl');
        $scope.foods = userOrder.foods;
    }]);