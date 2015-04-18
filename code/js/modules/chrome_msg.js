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
(function (root, factory) {
  // 'use strict';

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
  'use strict';
  function connectorCT(port){
    var _port = port;
    this.send = function(type, msg){
      var _msg = {};
      _msg.type = type;
      _msg[type] = msg;
      _port.postMessage(_msg);
    }
    this.onMsg = function(type, func){
      _port.onMessage.addListener(function(msg){
        if(msg.type===type && msg[type]){     
        func(msg[type]);
        }
      });
    }
    return this;
  }
  function chromeMsgCT(){
    // portName, tunnelKey, callback
    var args = arguments;
    var tunnelKey, callback,
      portName = args[0];
    if(args.length===2 && _.isString(args[0]) && _.isFunction(args[1])){
      callback = args[1];
    }else if(args.length===3 && _.isString(args[0]) && _.isString(args[1]) && _.isFunction(args[2])){
      tunnelKey = args[1];
      callback = args[2];
    }else{
      throw "error arguments in chromeMsgCT"
    }

    var _connector = new connectorCT(chrome.runtime.connect({name:portName}));
    var preConnect = function (msg, port){
      parseMsg("connect", "status", {
        connectOk : function(){
          var _tunnelKey = tunnelKey || undefined;
          port.postMessage({type:"connect",connect:{tunnelKey:_tunnelKey}});
        },
        tunnelKey : function(){
          callback(_connector);
          port.onMessage.removeListener(preConnect);
        }
      });

      // if(msg.type==="connect" && msg.connect){
      //   if(msg.connect.status==="connectOk"){
      //     var _tunnelKey = tunnelKey || undefined;
      //     port.postMessage({type:"connect",connect:{tunnelKey:_tunnelKey}});
      //   }
      //   if(msg.connect.status==="tunnelOk"){
      //     callback(_connector);
      //     port.onMessage.removeListener(preConnect);
      //   }        
      // }
    }
    _connector.onMessage.addListener(preConnect);
    return _connector;
  }

  function parseMsg(type, switcher, funcs){
    if(msg.type===type && msg[type]){
      _.each(funcs, function(func, index){
        if(msg[type][switcher] === index){
          func();
        }
      });      
    }
  }

  // export
  function chromeMsgExport(){
    switch (window.GIRAFEEEWINDOW){
      case "background":
        var uniqueBG = vendor.UNQ(  function(){
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
          connect : function(){
            return new chromeMsgCT.call(chromeMsgCT, arguments);
          }
          // ,
          // mutiConnect : function(portName, callback){
          //   return new chromeMsgCT(portName, "muti", callback);
          // }
        }
        break;
      default:
        throw new Error("who are you???? window.GIRAFEEEWINDOW: " + window.GIRAFEEEWINDOW);
    }

  }

  return chromeMsgExport();


}));

// (function (root, factory) {
//   // 'use strict';

//   if (typeof exports === 'object') {
//     // Node
//     module.exports = factory(require('underscore'), require('./girafeee_vendor'), require('URIjs'));
//   } else if (typeof define === 'function' && define.amd) {
//     // AMD. Register as an anonymous module.
//     define(['underscore', 'girafeee_vendor', 'URIjs'], factory);
//   } else {
//     // Browser globals (root is window)
//     root.chromeMsg = factory(root._, root.girafeee_vendor, root.URI, root);
//   }
// }(this, function ( _, vendor, URI, root) {
// 	// 'use strict';

// 	// chromeMsgCT
// 	// dsc after used! it's important!
// 	function chromeMsgCT(){return this;}
// 	// chromeMsgCT.prototype.connectAfter = function(msg){
// 	// }
// 	chromeMsgCT.prototype.send = function(msg){
// 		this.port.postMessage(msg);
// 		return this;
// 	}
// 	chromeMsgCT.prototype.onMsg = function(funcs){
// 		var self = this;
// 		funcs = vendor.OBJnw(funcs);
// 		_.each(funcs, function(func){
//   		self.port.onMessage.addListener(func);
//   	});
// 		return self;
// 	}
// 	chromeMsgCT.prototype.rmMsg = function(funcs){
// 		var self = this;
// 		funcs = vendor.OBJnw(funcs);
//   	_.each(funcs, function(func){
//   		self.port.onMessage.removeListener(func);
//   	});
//   	return self;
// 	}
// 	chromeMsgCT.prototype.onDsc = function(onDscFunc){
// 		this.port.onDisconnect.addListener(function(portOd){
// 			onDscFunc(portOd);
// 		});
// 	}
// 	chromeMsgCT.prototype.dsc = function(){
// 		this.port.disconnect();
// 		this.port = undefined;
// 	}

// 	// chromeMsgBG
// 	//uniqe object for same background
// 	var answerBG = {
// 		isOnConnect : {
// 			type : "isOnConnect"
// 		}
// 	}
// 	function chromeMsgBG(){return this;}
// 	chromeMsgBG.prototype.ports = new Object();
// 	chromeMsgBG.prototype.onConnect = function(){
// 		if(arguments.length == 1 && _.isFunction(arguments[0])){
// 			return onCnSingleChl.call(this, arguments[0]);
// 		}else if(arguments.length == 2 && _.isFunction(arguments[1]) && _.isObject(arguments[0]) ){
// 			return onCnMutiChl.apply(this, arguments);
// 		}else{
// 			throw "onConnect arguments error";
// 		}
// 		return this;
// 	};

// 	function _mutiConnector(ths, obj){
// 		var self = this;
// 		var _chromeMsgBG = ths;
// 		self.filter = obj.filter;
// 		self.funcs = obj.funcs;
// 		self.send = function (msg){
// 			var _ports = _.where(_chromeMsgBG.ports, self.filter);
// 			// console.log(this.filter);
// 		  _.each(_ports, function(port){
// 		  	// console.log(port);
// 		  	port.postMessage(msg);
// 		  });
// 		  return self;
// 		}
// 		self.msgs = {};
// 		self.onMsg = function(msgObj, callback){
// 			// console.log("onMsg times");
// 			var _ports = _.where(_chromeMsgBG.ports, self.filter);
// 			console.log("(1)_ports:", _ports);
// 			var key = msgKey(msgObj);
// 			if(_.has(self.msgs, key ) ){
// 				_ports = _.difference(_ports, self.msgs[key].ports);
// 				console.log("(2)_ports:", _ports);
// 				self.msgs[key].ports = self.msgs[key].ports.concat(_ports);
// 			}else{
// 				self.msgs[key] = {};
// 				self.msgs[key].ports = [];
// 				self.msgs[key].func = function(_msg){
// 					var compareKey = _msg.key || (_.isString(_msg)?_msg:false);
// 	  			if(compareKey === key) callback();
// 		  		self.msgs[key].ports = _ports;
// 	  		};
// 			}
// 			console.log("(3)_ports:", _ports);
// 		  _.each(_ports, function(port){
// 	  		port.onMessage.addListener(self.msgs[key].func);
// 		  });	
// 		  return self;
// 		}
// 		var msgKey = function(msgObj){
// 			if(_.isString(msgObj)){
// 				return msgObj;
// 			}else if(_.isObject(msgObj) && msgObj.key ){
// 				return msgObj.key;
// 			}else{
// 				throw "msgObj without msgObj.key or not a string"
// 			}
// 		}

// 		return this;
// 	}

// 	function onCnMutiChl(mutiConnectorArray, callback){
// 		var self = this;
// 		var _mutiConnectors = new Array();
// 		_.each(mutiConnectorArray, function(obj){
// 			obj.funcs = (obj.funcs !== undefined) ? vendor.OBJnw(obj.funcs) : undefined;
// 			_mutiConnectors.push(new _mutiConnector(self, obj));
// 			// if(obj.funcs){
// 			// 	self.onConnect(function(port){
// 			// 		port.onMsg(obj);
// 			// 	});
// 			// }
// 		});
// 		self.isLocked = false;
// 		chrome.runtime.onConnect.addListener(function(port){
// 				initPort.call(self, port);
// 				port.postMessage(answerBG.isOnConnect);
// 				_.each(_mutiConnectors, function(cntor){
// 					port.onMsg(cntor);
// 				});
// 				// while(self.isLocked === false){
// 				// 	self.isLocked = true;
// 			callback.apply(callback, _mutiConnectors);
				
// 				// console.log("abc:", self.isLocked);
// 				// var t;
// 				// var timeCount = function(){
// 				// 	if(self.isLocked === false){
// 				// 		clearTimeout(t);
// 				// 		self.isLocked = true;
// 				// 		self.isLocked = callback.apply(callback, _mutiConnectors);
// 				// 	}else{
// 				// 		t=setTimeout("timedCount()",1000);
// 				// 		console.log("time");
// 				// 	}
// 				// }();
				
// 			// }

// 		});
// 		return this;
// 	}
// 	function onCnSingleChl(onConnectFn){
// 		var self = this;
// 		chrome.runtime.onConnect.addListener(function(port){
// 			initPort.call(self, port);
// 			onConnectFn(port);
// 		});
// 		return this;
// 	};
// 	function initPort(port){
// 		var self = this;
// 		var _uniqueId = _.uniqueId();
// 		this.ports[_uniqueId] = port;
// 		port.onDisconnect.addListener(function(portOd){
// 			delete self.ports[_.findKey(self.ports, portOd)];
// 		});
// 		port.send = port.postMessage;
// 		port.url = new URI(port.sender.url).query("").fragment("").toString();
// 		port.onMsg = function(obj){
// 			// asyn mode, use it in onConnect
// 			if( (obj.filter === undefined) || _.isMatch(port, obj.filter)){
// 				if(obj.funcs !== undefined){
// 					obj.funcs = vendor.OBJnw(obj.funcs);
// 			  	_.each(obj.funcs, function(func){
// 			  		port.onMessage.addListener(func);
// 			  	});				
// 				}
// 			}
// 		}
// 	}
// 	chromeMsgBG.prototype.dsc = function(obj){
// 		var _ports = _.where(this.ports, obj.filter);
// 		_.each(_ports, function(port){
//   		port.disconnect();
// 	  });
// 	  return this;
// 	}
// 	chromeMsgBG.prototype.onMsg = function(obj){
// 		// sync mode, use it beyond port connect time
// 		obj.funcs = vendor.OBJnw(obj.funcs);
// 		var _ports = (obj.filter === undefined) ? this.ports : _.where(this.ports, obj.filter);
// 	  _.each(_ports, function(port){
// 	  	_.each(obj.funcs, function(func){
// 	  		port.onMessage.addListener(func);
// 	  	});
// 	  });
// 	  return this;
// 	}
// 	chromeMsgBG.prototype.rmMsg = function(obj){
// 		// funcs, filter
// 		obj.funcs = vendor.OBJnw(obj.funcs);
// 		var _ports = (obj.filter === undefined) ? this.ports : _.where(this.ports, obj.filter);
// 	  _.each(_ports, function(port){
// 	  	_.each(obj.funcs, function(func){
// 	  		port.onMessage.removeListener(func);
// 	  	});
// 	  });
// 	  return this;
// 	}

// 	// export
// 	function chromeMsgExport(){
// 		switch (window.GIRAFEEEWINDOW){
// 			case "background":
// 				var uniqueBG = vendor.UNQ(	function(){
// 					return new chromeMsgBG();
// 				})();
// 				return {
// 					onConnect : function(){
// 						return uniqueBG.onConnect.apply(uniqueBG, arguments);
// 					}
// 				};
// 				break;
// 			case "content_script":
// 				return {
// 					connect : function(wmi){
// 						var portName = wmi || _.uniqueId('ctPort_');
// 					  var _chromeMsgCT = new chromeMsgCT();
// 					  _chromeMsgCT.port = chrome.runtime.connect({name: portName });
// 					  _chromeMsgCT.port.send = _chromeMsgCT.port.postMessage;
// 					  return _chromeMsgCT;
// 					},
// 					connectAfter : function(wmi, connector){
// 						// console.log(window);
// 						while(connector !== undefined){
// 							return this.connect(wmi);
// 						}
// 					}
// 				}
// 				break;
// 			default:
// 				throw new Error("who are you???? window.GIRAFEEEWINDOW: " + window.GIRAFEEEWINDOW);
// 		}

// 	}

// 	return chromeMsgExport();
// }));
