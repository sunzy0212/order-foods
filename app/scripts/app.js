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
  .module('orderFoodsApp', ['ionic','orderFoodsApp.controllers','orderFoodsApp.services','orderFoodsApp.directives'])
    .run(['$ionicPlatform','userInfo',function($ionicPlatform,userInfo) {
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
            userInfo.openId=angular.element("#render_openId").text().trim();
        });
    }])
    .config(function($stateProvider,$urlRouterProvider){
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
                        templateUrl:'../views/tab-order-foods.html',
                        controller:'orderFoodsCtrl'
                    }
                }
            })
            .state('tab.cart',{
                url:'/cart',
                cache: false,
                views:{
                    'tab-cart':{
                        templateUrl:'../views/tab-cart.html',
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
    })
    .controller('orderFoodsAppCtrl',['$scope','$rootScope','userOrder',function($scope,$rootScope,userOrder){
        $rootScope.totalNum = userOrder.totalNum;
    }]);

var ctrlModule = angular.module('orderFoodsApp.controllers',['orderFoodsApp.services']);
var serviceModule = angular.module('orderFoodsApp.services',[]);
var directiveModule = angular.module('orderFoodsApp.directives',[]);
