/*!
 * easy-chrome-msg.js - so, easy-chrome-msg
 *
 * Version: 1.1.0
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
	// dsc after used! it's important!
	function chromeMsgCT(){return this;}
	// chromeMsgCT.prototype.connectAfter = function(msg){
	// }
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
			onDscFunc(portOd);
		});
	}
	chromeMsgCT.prototype.dsc = function(){
		this.port.disconnect();
		this.port = undefined;
	}

	// chromeMsgBG
	//uniqe object for same background
	function chromeMsgBG(){return this;}
	chromeMsgBG.prototype.ports = new Object();
	chromeMsgBG.prototype.onConnect = function(){
		if(arguments.length == 1 && _.isFunction(arguments[0])){
			return onCnSingleChl.call(this, arguments[0]);
		}else if(arguments.length == 2 && _.isFunction(arguments[1]) && _.isObject(arguments[0]) ){
			return onCnMutiChl.apply(this, arguments);
		}else{
			throw "onConnect arguments error";
		}
		return this;
	};

	function _mutiConnector(ths, obj){
		var _chromeMsgBG = ths;
		this.filter = obj.filter;
		this.funcs = obj.funcs;
		this.send = function(msg){
			var _ports = _.where(_chromeMsgBG.ports, this.filter);
			console.log(this.filter);
		  _.each(_ports, function(port){
		  	// console.log(port);
		  	port.postMessage(msg);
		  });
		  return this;
		}
		this.onMsg = function(msg, callback){
			// console.log("msg:",msg," callback:",callback);
			var _ports = _.where(_chromeMsgBG.ports, this.filter);
			// console.log(_chromeMsgBG.ports);
		  _.each(_ports, function(port){
	  		port.onMessage.addListener(function(_msg){
	  			if(_msg === msg) callback();
	  		});
		  });
		  return this;
		}
		return this;
	}

	function onCnMutiChl(mutiConnectorArray, callback){
		var self = this;
		var _mutiConnectors = new Array();
		_.each(mutiConnectorArray, function(obj){
			obj.funcs = vendor.OBJnw(obj.funcs);
			_mutiConnectors.push(new _mutiConnector(self, obj));
			// if(obj.funcs){
			// 	self.onConnect(function(port){
			// 		port.onMsg(obj);
			// 	});
			// }
		});
		chrome.runtime.onConnect.addListener(function(port){
			initPort.call(self, port);
			_.each(_mutiConnectors, function(cntor){
				port.onMsg(cntor);
			});
			callback.apply(callback, _mutiConnectors);
		});
		return this;
	}
	function onCnSingleChl(onConnectFn){
		var self = this;
		chrome.runtime.onConnect.addListener(function(port){
			initPort.call(self, port);
			onConnectFn(port);
		});
		return this;
	};
	function initPort(port){
		var self = this;
		var _uniqueId = _.uniqueId();
		this.ports[_uniqueId] = port;
		port.onDisconnect.addListener(function(portOd){
			delete self.ports[_.findKey(self.ports, portOd)];
		});
		port.send = port.postMessage;
		port.url = new URI(port.sender.url).query("").fragment("").toString();
		port.onMsg = function(obj){
			// asyn mode, use it in onConnect
			if(obj.filter === undefined || _.isMatch(port, obj.filter)){
				obj.funcs = vendor.OBJnw(obj.funcs);
		  	_.each(obj.funcs, function(func){
		  		port.onMessage.addListener(func);
		  	});
			}
		}
	}
	chromeMsgBG.prototype.dsc = function(obj){
		var _ports = _.where(this.ports, obj.filter);
		_.each(_ports, function(port){
  		port.disconnect();
	  });
	  return this;
	}
	chromeMsgBG.prototype.onMsg = function(obj){
		// sync mode, use it beyond port connect time
		obj.funcs = vendor.OBJnw(obj.funcs);
		var _ports = (obj.filter === undefined) ? this.ports : _.where(this.ports, obj.filter);
	  _.each(_ports, function(port){
	  	_.each(obj.funcs, function(func){
	  		port.onMessage.addListener(func);
	  	});
	  });
	  return this;
	}
	chromeMsgBG.prototype.rmMsg = function(obj){
		// funcs, filter
		obj.funcs = vendor.OBJnw(obj.funcs);
		var _ports = (obj.filter === undefined) ? this.ports : _.where(this.ports, obj.filter);
	  _.each(_ports, function(port){
	  	_.each(obj.funcs, function(func){
	  		port.onMessage.removeListener(func);
	  	});
	  });
	  return this;
	}

	// export
	function chromeMsgExport(){
		switch (window.GIRAFEEEWINDOW){
			case "background":
				var uniqueBG = vendor.UNQ(	function(){
					return new chromeMsgBG();
				})();
				return {
					onConnect : function(){
						return uniqueBG.onConnect.apply(uniqueBG, arguments);
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
					},
					connectAfter : function(wmi, connector){
						// console.log(window);
						while(connector !== undefined){
							return this.connect(wmi);
						}
					}
				}
				break;
			default:
				throw new Error("who are you???? window.GIRAFEEEWINDOW: " + window.GIRAFEEEWINDOW);
		}

	}

	return chromeMsgExport();
}));
