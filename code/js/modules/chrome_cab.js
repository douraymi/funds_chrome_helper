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
  }

}
