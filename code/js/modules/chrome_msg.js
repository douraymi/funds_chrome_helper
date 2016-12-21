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
    module.exports = factory(require('underscore'), require('URIjs'), require('jquery'));
  } else if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['underscore', 'URIjs', 'jquery'], factory);
  } else {
    // Browser globals (root is window)
    root.chromeMsg = factory(root._, root.URI, root.jquery, root);
  }
}(this, function ( _, URI, $, root) {
  'use strict';

  function tunnelCT(tunnelKey, connector){
  	this.send = function(msg){
  		msg.tunnelKey = tunnelKey;
  		connector.send(msg);
  		return this;
  	}
  	this.onMsg = function(msgsObj){
  		connector.onMsg(msgsObj);
  		return this;
  	}
  	this.onClose = {
  		listener : [],
  		addListener : function(listener){
  			this.listener.push(listener);
  		}
  	};
    this.close = function(){
      connector.close();
    }
  	// callback(this);
    return this;
  }

  function connectorCT(port){
    var self = this;
    var _port = port;
    this.send = function(msg){
      _port.postMessage(msg);
      return this;
    }
    this.onMsg = function(msgsObj){
      _.each(msgsObj, function(codeObj, typeKey){
        _port.onMessage.addListener(function(msg){
          parseMsg(msg, typeKey, codeObj);
        });
      });
      return this;
    }
    this.close = function(){
      _port.disconnect();
    }
    this.tunnel = function(tunnelKey, callback){
      _port.postMessage({
        type : "connect",
        code : "tunnelKey",
        body : {
        	tunnelKey : tunnelKey
        }
      });
      var tn = new tunnelCT(tunnelKey, self);
      var preConnect = function (msg){
        parseMsg(msg, "connect", {
          tunnelKeyOK : function(msg){
            callback(tn);
          },
          tunnelClose : function(msg){
          	_.each(tn.onClose.listener, function(func, key){
          		func(tn);
          	});
            _port.onMessage.removeListener(preConnect);
          }
        });
      }
      _port.onMessage.addListener(preConnect);
      return tn;
    }
    // this.xhr = function(url, callback){
    this.xhr = function(settingBody, callback){
      // console.log("in xhr");
      _port.postMessage({
        type : "connect",
        code : "xhr",
        body : settingBody
        // body : {
        //   url : url
        // }
      });
      _port.onMessage.addListener(function(msg){
        if(msg.fail){
          callback();
        }else{ 
          callback(msg.body);
        }
        // �Զ��ر�port
        _port.disconnect();
      });
    }
    this.newTab = function(createData, callback){
      if(callback == undefined){
        callback = function(){}
      }
      _port.postMessage({
        type : "connect",
        code : "newTab",
        body : createData
      });
      _port.onMessage.addListener(function(msg){
        if(msg.fail){
          callback();
        }else{
          callback(msg.body);
        }
        // �Զ��ر�port
        _port.disconnect();
      });
    }
    this.closeTab = function(){
      _port.postMessage({
        type : "connect",
        code : "closeTab"
      });
    }
    return this;
  }

  function chromeMsgCT(portName, callback){
    var _port = chrome.runtime.connect({name:portName});
    var _connector = new connectorCT(_port);
    var preConnect = function (msg){
      parseMsg(msg, "connect", {
        connectOk : function(msg){
          // console.log("in connectOK");
          callback(_connector);
          _port.onMessage.removeListener(preConnect);
        }
      });
    }
    _port.onMessage.addListener(preConnect);
    return _connector;
  }

  // ����msg������
  function parseMsg(msg, type, codeObj, p){
    if(msg.type===type){
      _.each(codeObj, function(func, key){
        if(msg.code === key){
          // func(msg.body, p);
          func(msg, p);
        }
      });      
    }
  }

  function chromeMsgBG(callback){
  	var self = this;
    // var _connectorBG = new connectorBG();
  	var tnCtner = {};
		// ͨ��port����
		var tunnelShake = function(tunnelKey, head, foot){
			var replyMsg = {
				type: "connect",
				code: "tunnelKeyOK"
			}
			tnCtner[tunnelKey].headFunc = function(msg){
				if(msg.tunnelKey === tunnelKey){
					foot.postMessage(msg);
				}
			};
			tnCtner[tunnelKey].footFunc = function(msg){
				if(msg.tunnelKey === tunnelKey){
					head.postMessage(msg);
				}
			};
			head.onMessage.addListener(tnCtner[tunnelKey].headFunc);
			foot.onMessage.addListener(tnCtner[tunnelKey].footFunc);
			head.postMessage(replyMsg);
			foot.postMessage(replyMsg);
		}
		// ͨ������port�ر�֪ͨ
		var onDsc = function(port){
			//	����tunnel����
			var head = _.findKey(tnCtner, {head:port});
			var foot = _.findKey(tnCtner, {foot:port});
			if(head && tnCtner[head].foot!==undefined){
				tnCtner[head].foot.postMessage({type:"connect",code:"tunnelClose"});
				tnCtner[head].foot.onMessage.removeListener(tnCtner[head].footFunc);
				delete tnCtner[head];
			}else if(foot && tnCtner[foot].head!==undefined){
				tnCtner[foot].head.postMessage({type:"connect",code:"tunnelClose"});
				tnCtner[foot].head.onMessage.removeListener(tnCtner[foot].headFunc);
				delete tnCtner[foot];
			}else if(head){
				delete tnCtner[head];
			}
		}
    // ͨ������listener
    var onTnKey = function(msg, port){
      parseMsg(msg, "connect", {
        tunnelKey : function(_msg){
          var _tk = _msg.body.tunnelKey;
          if(tnCtner[_tk]&&tnCtner[_tk].foot===undefined){
            //  ��ֹͬ·����
            if(tnCtner[_tk].head.name===port.name){
              tnCtner[_tk].head.postMessage({type:"connect",code:"tunnelClose"});
              tnCtner[_tk].head = port;
            }else{
              tnCtner[_tk].foot=port;
              tunnelShake(_tk, tnCtner[_tk].head, port);     
            }
          }else{
            //  �ݷŵ�һ��port�ȴ�����һ��port����
            // tnCtner[_tk] = tnCtner[_tk] || {};  // ����Ϊɶ����д
            // ����Ѿ���һ��һ����ͨ��port, ������Ƴ�tnCtner����,����Ȼ������
            tnCtner[_tk] = {};
            tnCtner[_tk].head = port;
          }
        }
      });
    }

		chrome.runtime.onConnect.addListener(function(port){
      switch (port.name){
        case "xhr":
          port.onMessage.addListener(function(msg, _port){
            // $.ajax({ url: _url, async:true, success: function(data, textStatus){
            //   _port.postMessage({body:data});
            // } });

            // var _url = msg.body.url;
            // $.ajax({url: _url })
            $.ajax(msg.body)
            .done(function(data) {
              _port.postMessage({body:data});
            })
            .fail(function() {
              _port.postMessage({fail:true});
            });

          });
          break;
        case "closeTab":
          port.onMessage.addListener(function(msg, _port){
            // console.log(_port);
            var _tabId = _port.sender.tab.id;
            chrome.tabs.remove(_tabId);
          });
          break;
          case "newTab":
          port.onMessage.addListener(function(msg, _port){
            var _createData = msg.body;
            var _tabIndex = _port.sender.tab.index;
            _createData.index = _createData.index?_createData.index:_tabIndex;
            // console.log(_port);
            // chrome.windows.create({url:_url, focused:false}, function(_window){
            chrome.tabs.create(_createData, function(_tab){
              if(_tab == undefined){
                _port.postMessage({fail:true});
              }else{
                _port.postMessage({body:'ok'});
              }
            });
            // $.ajax({url: _url })
            // .done(function(data) {
            //   _port.postMessage({body:data});
            // })
            // .fail(function() {
            //   _port.postMessage({fail:true});
            // });

          });
          break;
        default :
      		port.onDisconnect.addListener(onDsc);
      		port.onMessage.addListener(onTnKey);

          port.onMsg = function(msgsObj){
            _.each(msgsObj, function(codeObj, typeKey){
              port.onMessage.addListener(function(msg, _port){
                parseMsg(msg, typeKey, codeObj, _port);
              });
            });     
          }
          port.send = port.postMessage;
    		  callback(port);
      }
      port.postMessage({type:"connect", code:"connectOk"});

    });

  	// return _connectorBG;
  }

  // export
  function chromeMsgExport(){
    switch (window.GIRAFEEEWINDOW){
      case "background":
        // var uniqueBG = _C.UNQ(  function(){
        //   return new chromeMsgBG();
        // })();
        return {
          onConnect : function(callback){
          	return new chromeMsgBG(callback);
            // return uniqueBG.onConnect.apply(uniqueBG, arguments);
          }
        };
        break;
      case "content_script":
        return {
          connect : function(){
            // portName, tunnelKey, callback
            var args = arguments;
            var tunnelKey, callback,
              portName = args[0];
            if(args.length===1 && _.isString(args[0])){
              callback = function(){};
            }else if(args.length===2 && _.isString(args[0]) && _.isFunction(args[1])){
              callback = args[1];
            }else if(args.length===3 && _.isString(args[0]) && _.isString(args[1]) && _.isFunction(args[2])){
              tunnelKey = args[1];
              callback = args[2];
            }else{
              throw "error arguments in chromeMsgCT"
            }
            if(tunnelKey === undefined){
              return new chromeMsgCT(portName, callback);
            }else{
              return new chromeMsgCT(portName, function(connector){
                connector.tunnel(tunnelKey, callback);
              });
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
