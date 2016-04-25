'use strict';
serviceModule.service('authorization',[
	'$cookies',
	function($cookies){
		this.accessToken = null;
		this.openId = null;
		this.addAuthorizationHeader = function(config){
			var accessToken = this.accessToken || $cookies.get('accessToken');
			var openId = this.openId || $cookies.get('openId');
			if(!config.headers){
				config.headers = {};
			}
			config.headers.Authorization = 'bearer ' + accessToken + ' ' + openId;
			return config;
		};
	}
]);
// 'use strict';
// serviceModule.service('authorization',[
// 	function(){
// 		this.accessToken = null;
// 		this.addAuthorizationHeader = function(config){
// 			var accessToken = this.accessToken
// 			if(!config.headers){
// 				config.headers = {};
// 			}
// 			config.headers.Authorization = 'bearer ' + accessToken + ' ';
// 			return config;
// 		};
// 	}
// ]);