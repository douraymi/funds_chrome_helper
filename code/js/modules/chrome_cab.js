// 'use strict';
var $ = require('jquery');

module.exports = {
  alm : function(callback, delaym, periodm){
		//only work in event page, not in content script page
  	var createObj = {
	  	delayInMinutes : delaym || 0.1,
	  	periodInMinutes : periodm || 0.1
  	}
  	chrome.alarms.create(createObj);
  	chrome.alarms.onAlarm.addListener(callback);
  },
  css : function(url){
		$.ajax(chrome.extension.getURL(url))
		.done(function(data){
			$("<style>")
			.append(data)
			.appendTo("head");			
		})
  },
  html : function(url, callback){
		$.ajax(chrome.extension.getURL(url))
		.done(function(data){
			callback(data);			
		})
  },
  storage : function(){
		this.set = function(items, callback){
			chrome.storage.sync.set(items, callback);
		};
		this.get = function(keys, callback){
			chrome.storage.sync.get(keys, callback);
		};
		this.onKeyChange = function(listenerObj){
			var _obj = vendor.OBJnw(listenerObj);
			_.each(_obj, function(func, key){
				chrome.onChanged.addListener(func);		
			});
		}
		this.rmKeyChange = function(listenerObj){
			var _obj = vendor.OBJnw(listenerObj);
			_.each(_obj, function(func, key){
				chrome.onChanged.addListener(func);		
			});
		}
		this.bind = function(domObj, key){

		}
		this.unBind = function(){

		}
		return this;
	}()

}
