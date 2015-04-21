'use strict'
var $ = require('jquery');

function storageDef(){
	var df = $.Deferred();
	this.onKeyChange = function(key){
		chrome.onChanged.addListener(function(changes){
			// callback(changes[key]);
			$.resolve(changes[key]);
		});
	}
	return df;
}

function storage (argument) {

	this.set = function(key, value){
		chrome.storage.sync.set();
	};
	this.onKeyChange = function(key){
		
	}
	return this;
}

module.exports = new storage();
