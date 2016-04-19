'use strict';

/**
 * @ngdoc overview
 * @name orderFoodApp
 * @description
 * # orderFoodApp
 *
 * Main module of the application.
 */
 angular
 .module('orderFoodsApp', [
  'ionic',
  'ngCookies',
  'orderFoodsApp.controllers',
  'orderFoodsApp.services',
  'orderFoodsApp.directives',
  'orderFoodsApp.templates'
  ])
 .run(['$ionicPlatform','$cookies','cart','authorization',function($ionicPlatform,$cookies,cart,authorization) {
  $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
      //设置用户信息
      // cart.openId=angular.element("#render_openId").text().trim();
      cart.openId = $cookies.get('openId');
      authorization.accessToken = $cookies.get('accessToken');
    });
}])
 .config(["$stateProvider", "$urlRouterProvider", function($stateProvider,$urlRouterProvider){
  $stateProvider
      // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'views/tabs.html'
      })
      .state('tab.order-foods',{
        url:'/order-foods',
        cache: false,
        views:{
          'tab-order-foods':{
            templateUrl:'views/tab-order-foods.html',
            controller:'orderFoodsCtrl'
          }
        }
      })
      .state('tab.cart',{
        url:'/cart',
        cache: false,
        views:{
          'tab-cart':{
            templateUrl:'views/tab-cart.html',
            controller:'cartCtrl'
          }
        }
      })
      .state('tab.orders',{
        url:'/orders',
        cache: false,
        views:{
          'tab-orders':{
            templateUrl:'views/tab-orders.html',
            controller:'ordersCtrl'
          }
        }
      })
      .state('tab.mine',{
        url:'/mine',
        cache: false,
        views:{
          'tab-mine':{
            templateUrl:'views/tab-mine.html',
            controller:'mineCtrl'
          }
        }
      });
      $urlRouterProvider.otherwise('/tab/order-foods');
    }])
 .controller('orderFoodsAppCtrl',['$scope','$rootScope','userOrder', 'menu',function($scope,$rootScope,userOrder,menu){
  $rootScope.totalNum = menu.totalNum;
}]);

 var ctrlModule = angular.module('orderFoodsApp.controllers',['orderFoodsApp.services']);
 var serviceModule = angular.module('orderFoodsApp.services',['ngCookies']);
 var directiveModule = angular.module('orderFoodsApp.directives',[]);
