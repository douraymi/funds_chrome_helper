/*!
 * easy-chrome-msg.js - so, easy-chrome-msg
 *
 * Version: 1.0.0
 *
 * Author: douraymi
 * Web: http://douraymi.github.io/easy-chrome-msg.js/
 *
 * Licensed under
 *   MIT License http://www.opensource.org/licenses/mit-license
 *   GPL v3 http://opensource.org/licenses/GPL-3.0
 *
 */
// _ = underscore ?

(function (root, factory) {
  'use strict';
  if (typeof exports === 'object') {
    // Node
    module.exports = factory(require('underscore'));
  } else if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['underscore'], factory);
  } else {
    // Browser globals (root is window)
    root.URI = factory(root._, root);
  }
}(this, function ( _ , root) {
	'use strict';
	// template
	function chromeMsg(){}
	chromeMsg.prototype.port = undefined;
	chromeMsg.prototype.msgList = {};
	chromeMsg.prototype.send = function(msg){
		this.port.postMessage(msg);
		return this;
	}
	//little tool
	function randConflict(listObject){
		var rand = _.random(99999999);
		while(_.has(listObject, rand) ){
			rand = _.random(99999999);
		}
		// 可能有极端的异步多线程问题,以后再修正
		return rand;
	}
	function keyConflict(listObject, key){
		if(_.has(listObject, key)){
			throw new TypeError(key + ' func is already in msgList');
		}
	}
	function onMsgPre(funcs, runInEach){
		var self = this;
		var funcList = {};
		if(_.isFunction(funcs)){
			var rand = randConflict(self.msgList);
			funcList[rand] = funcs;
		}else if(_.isObject(funcs) ){
		}else{
			throw new TypeError('wrong arg with onMsg, need a function or a funcs_object'); 
		}
		_.each(funcList, function(value, key, list){
			keyConflict(self.msgList, key);
			self.msgList[key] = value;
			if(runInEach !== undefined ) runInEach(value);
			// self.port.onMessage.addListener(value); // example
		});
	}

	// chromeMsgCT
	function chromeMsgCT(){
		if(this.port !== undefined){
			new TypeError('chromeMsgCT.port is already init, please make a new one');
		};
		return this;
	}
	chromeMsgCT.prototype = new chromeMsg();
	chromeMsgCT.prototype.onMsg = function(funcs){
		var self = this;
		onMsgPre.call(self, funcs, function(value){
			self.port.onMessage.addListener(value);
		});
		return self;
	}
	// chromeMsgCT.prototype.onMsg = function(funcs){
	// 	var self = this;
	// 	var funcList = {};
	// 	if(_.isFunction(funcs)){
	// 		var rand = randConflict(self.msgList);
	// 		funcList[rand] = funcs;
	// 	}else if(_.isObject(funcs) ){
	// 	}else{
	// 		throw new TypeError('wrong arg with onMsg, need a function or a funcs_object'); 
	// 	}
	// 	_.each(funcList, function(value, key, list){
	// 		keyConflict(self.msgList, key);
	// 		self.msgList[key] = value;
	// 		self.port.onMessage.addListener(value);
	// 	});
	// 	return this;
	// }

	// chromeMsgBG
	//uniqe object for same background
	function chromeMsgBG(){
  	var self = this;
  	window.chromeMsgBG = this;
  	chrome.runtime.onConnect.addListener(function (port){
  		self.port = port;
  		_.each(self.msgList, function(value, key, list){
  			self.port.onMessage.addListener(value);
  		});
  	})
    return this;
	}
	chromeMsgBG.prototype = new chromeMsg();
	chromeMsgBG.prototype.onMsg = function(funcs){
		var self = this;
		onMsgPre.call(self, funcs);
		return self;
	}
	// chromeMsgBG.prototype.onMsg = function(funcs){
	// 	var self = this;
	// 	var funcList = {};
	// 	if(_.isFunction(funcs) ){
	// 		var rand = randConflict(self.msgList);
	// 		funcList[rand] = funcs;
	// 	}else if(_.isObject(funcs) ){
	// 	}else{
	// 		throw new TypeError('wrong arg with onMsg, need a function or a funcs_object'); 
	// 	}
	// 	_.each(funcList, function(value, key, list){
	// 		keyConflict(self.msgList, key);
	// 		self.msgList[key] = value;
	// 	});
	// 	return this;
	// }

	// export
	function chromeMsgExport(){
		return {
			init : function(wmi){
				switch(wmi)
				{
				case "bg":
					return window.chromeMsgBG || new chromeMsgBG();
				  break;
				case "ct":
				  var _chromeMsgCT = new chromeMsgCT();
				  var protName = "ct" + _.random(99999999);
				  //我就不信8位数还能碰对一样的
				  _chromeMsgCT.port = chrome.runtime.connect({name: protName });
				  return _chromeMsgCT;
				  break;
				default:
				  throw new TypeError('wrong arg with chromeMsg init');
				}
			}
		};
	}

	return chromeMsgExport();
}));
