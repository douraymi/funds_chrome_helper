// 'use strict';

module.exports = function(){
	// var $ = window.$ ? window.$ : require('jquery');
	// var M = require('./chrome_msg');
	// console.log("M:", M);
	var rt = {
	  alm : function(callback, delaym, periodm){
			//only work in event page, not in content script page
	  	var createObj = {
		  	delayInMinutes : delaym || 0.1,
		  	periodInMinutes : periodm || 0.1
	  	}
	  	chrome.alarms.create(createObj);
	  	chrome.alarms.onAlarm.addListener(callback);
	  },
		UNQ : function(fn){
			// 牛逼的单例 马勒戈壁
			var uniqueInstance;
			return function(){
				return uniqueInstance || (uniqueInstance = fn.apply(this, arguments) );
			}
		},
		OBJnw : function(obj){
			if(obj===undefined) return null;
			var objContainer = {};
			if(_.isFunction(obj)){
				var _uniqueId = _.uniqueId('random_id_');
				objContainer[_uniqueId] = obj;
			}else if(_.isObject(obj) ){
				objContainer = obj;
			}else{
				throw new Error('need a function or a object'); 
			}
			return objContainer;
		},
		chromeUrl : function(url){
			return (url.slice(0,4) === "http")?url:chrome.extension.getURL(url);
		},
	  css : function(url){
			url = this.chromeUrl(url);
			M.connect("xhr", function(cntor){
				cntor.xhr(url, function(data){
					$("<style>")
					.append(data)
					.appendTo("head");	
				});
			});
	  },
	  html : function(url, callback){
			url = this.chromeUrl(url);
			M.connect("xhr", function(cntor){
				cntor.xhr(url, callback);
			});
	  },
	  ng : function(tplUrl, contrlFunc){
			angular.module('myApp', [])
			.config(['$routeProvider',function($routeProvider) {
				$routeProvider
					.when('/', {templateUrl: C.chromeUrl(tplUrl), controller: contrlFunc})
					.otherwise({redirectTo: '/'});
			}]);

			var ele = $('html').find('#girafeeeApp');
			angular.bootstrap(ele, ['myApp']);	  	
	  },
	  storage : function(){
			this.set = function(items, callback){
				chrome.storage.sync.set(items, callback);
			};
			this.get = function(keys, callback){
				chrome.storage.sync.get(keys, callback);
			};
			this.onChange = function(listenerObj){
				var _obj = rt.OBJnw(listenerObj);
				_.each(_obj, function(func, key){
					chrome.storage.onChanged.addListener(func);		
				});
			};
			this.rmChange = function(listenerObj){
				var _obj = rt.OBJnw(listenerObj);
				_.each(_obj, function(func, key){
					chrome.storage.onChanged.removeListener(func);		
				});
			};
			this.ngBind = function(scope, storageKey, callback, optionOnChange){
				this.get(storageKey, function(items){
					if(items[storageKey]){
						scope.$apply(function(){
							scope[storageKey] = items[storageKey];
						});
						if(callback) callback(items[storageKey]);					
					}else{
						if(callback) callback();
					}
				});
				this.onChange(function(changes){
					if(changes[storageKey]){
						scope[storageKey] = changes[storageKey].newValue;
					}
				});
				if(optionOnChange) this.onChange(optionOnChange);
			};
			this.remove = function(keys, callback){
				// chrome.storage.sync.clear();
				chrome.storage.sync.remove(keys, callback);
			}
			this.clear = function(callback){
				chrome.storage.sync.clear(callback);
			}

			return this;
		}()

	}

	return rt;

}()
