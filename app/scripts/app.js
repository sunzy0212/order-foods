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
  .module('orderFoodsApp', ['ionic','orderFoodsApp.controllers','orderFoodsApp.services'])
    .run(['$ionicPlatform','user',function($ionicPlatform,user) {
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
            user.openId=angular.element("#render_openId").text().trim();
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
                views:{
                    'tab-order-foods':{
                        templateUrl:'../views/tab-order-foods.html',
                        controller:'orderFoodsCtrl'
                    }
                }
            })
            .state('tab.orders',{
                url:'/orders',
                views:{
                    'tab-orders':{
                        templateUrl:'views/tab-orders.html',
                        controller:'ordersCtrl'
                    }
                }
            })
            .state('tab.mine',{
                url:'/mine',
                views:{
                    'tab-mine':{
                        templateUrl:'views/tab-mine.html',
                        controller:'mineCtrl'
                    }
                }
            });
        $urlRouterProvider.otherwise('/tab/order-foods');
    });

var ctrlModule = angular.module('orderFoodsApp.controllers',[]);
var serviceModule = angular.module('orderFoodsApp.services',[]);
