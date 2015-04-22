'use strict'
var $ = require('jquery');
var _ = require('underscore');
var vendor = require('./girafeee_vendor');


function storage (argument) {

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
	return this;
}
module.exports = storage();
