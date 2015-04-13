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
  // 'use strict';
  //只适应了Node模块,别的模块以后再修正
  if (typeof exports === 'object') {
    // Node
    module.exports = factory(require('underscore'), require('./girafeee_vendor'), require('URIjs'));
  } else if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['underscore', 'girafeee_vendor', 'URIjs'], factory);
  } else {
    // Browser globals (root is window)
    root.chromeMsg = factory(root._, root.girafeee_vendor, root.URI, root);
  }
}(this, function ( _, vendor, URI, root) {
	// 'use strict';

	// chromeMsgCT
	function chromeMsgCT(){return this;}
	chromeMsgCT.prototype.send = function(msg){
		this.port.postMessage(msg);
		return this;
	}
	chromeMsgCT.prototype.onMsg = function(funcs){
		var self = this;
		funcs = vendor.OBJnw(funcs);
		_.each(funcs, function(func){
  		self.port.onMessage.addListener(func);
  	});
		return self;
	}
	chromeMsgCT.prototype.rmMsg = function(funcs){
		var self = this;
		funcs = vendor.OBJnw(funcs);
  	_.each(funcs, function(func){
  		self.port.onMessage.removeListener(func);
  	});
  	return self;
	}
	chromeMsgCT.prototype.onDsc = function(onDscFunc){
		// 没测试过 以后再测试了
		this.port.onDisconnect.addListener(function(portOd){
			onDscFunc();
		});
	}

	// chromeMsgBG
	//uniqe object for same background
	function chromeMsgBG(onConnectFn){return this;}
	chromeMsgBG.prototype.background_id = _.uniqueId("background_");
	chromeMsgBG.prototype.ports = new Object();
	chromeMsgBG.prototype.onConnect = function(onConnectFn){
		var self = this;
		var _onConnectFn = onConnectFn || function(){};
		if(!_.isFunction(_onConnectFn) ) throw "argm not a func";

		chrome.runtime.onConnect.addListener(function(port){
			var _uniqueId = _.uniqueId();
			self.ports[_uniqueId] = port;
			port.onDisconnect.addListener(function(portOd){
				// console.log("portOd:", self.ports[_.findKey(self.ports, portOd)]);
				delete self.ports[_.findKey(self.ports, portOd)];
			});
			port.send = port.postMessage;
			port.url = new URI(port.sender.url).query("").fragment("").toString();
			port.onMsg = function(funcs, filter){
				// asyn mode, use it in onConnect
				if(filter === undefined || _.isMatch(port, filter)){
					funcs = vendor.OBJnw(funcs);
			  	_.each(funcs, function(func){
			  		port.onMessage.addListener(func);
			  	});
				}
			}

			_onConnectFn(port);
		});
		return this;
	};
	chromeMsgBG.prototype.dsc = function(filter){
		var _ports = _.where(this.ports, filter);
		_.each(_ports, function(port){
	  	_.each(funcs, function(func){
	  		port.disconnect();
	  	});
	  });
	}
	chromeMsgBG.prototype.onMsg = function(funcs, filter){
		// sync mode, use it beyond port connect time
		funcs = vendor.OBJnw(funcs);
		var _ports = (filter === undefined) ? this.ports : _.where(this.ports, filter);
	  _.each(_ports, function(port){
	  	_.each(funcs, function(func){
	  		port.onMessage.addListener(func);
	  	});
	  });
	}
	chromeMsgBG.prototype.rmMsg = function(funcs, filter){
		funcs = vendor.OBJnw(funcs);
		var _ports = (filter === undefined) ? this.ports : _.where(this.ports, filter);
	  _.each(_ports, function(port){
	  	_.each(funcs, function(func){
	  		port.onMessage.removeListener(func);
	  	});
	  });
	}

	// export
	function chromeMsgExport(){
		switch (window.GIRAFEEEWINDOW){
			case "background":
				var uniqueBG = vendor.UNQ(	function(){
					return new chromeMsgBG();
				})();
				return {
					onConnect : function(onConnectFn){
						return uniqueBG.onConnect(onConnectFn);
					}
				};
				break;
			case "content_script":
				return {
					connect : function(wmi){
						var portName = wmi || _.uniqueId('ctPort_');
					  var _chromeMsgCT = new chromeMsgCT();
					  _chromeMsgCT.port = chrome.runtime.connect({name: portName });
					  _chromeMsgCT.port.send = _chromeMsgCT.port.postMessage;
					  return _chromeMsgCT;
					}
				}
				break;
			default:
				throw new Error("who are you???? window.GIRAFEEEWINDOW: " + window.GIRAFEEEWINDOW);
		}

	}

	return chromeMsgExport();
}));
