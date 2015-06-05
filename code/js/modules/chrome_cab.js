// 'use strict';

module.exports = function(){
	// extend to Number
	//加法函数
	function accAdd(arg1, arg2) {
		var r1, r2, m;
    try {  
      r1 = arg1.toString().split(".")[1].length;  
    }
    catch (e) {  
      r1 = 0;  
    }
    try {  
      r2 = arg2.toString().split(".")[1].length;  
    }
    catch (e) {  
      r2 = 0;  
    }
    m = Math.pow(10, Math.max(r1, r2));  
    return (arg1 * m + arg2 * m) / m;  
	}
	//给Number类型增加一个add方法，，使用时直接用 .add 即可完成计算
	Number.prototype.jia = function (arg) {
		if(_.isString(arg)){
			arg = Number(arg);
		}
    return accAdd(arg, this);
	};
	String.prototype.jia = function (arg) {
		var _ths = Number(this);
    return _ths.jia(arg);
	};
	//减法函数
	function Subtr(arg1, arg2) {
    var r1, r2, m, n;
    try {
      r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
      r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
     //last modify by deeka
     //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
	}
	//给Number类型增加一个sub方法，，使用时直接用 .sub 即可完成计算
	Number.prototype.jian = function (arg) {
		if(_.isString(arg)){
			arg = Number(arg);
		}
	  return Subtr(this, arg);
	};
	String.prototype.jian = function (arg) {
		var _ths = Number(this);
    return _ths.jian(arg);
	};
	//乘法函数
	function accMul(arg1, arg2) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
      m += s1.split(".")[1].length;
    }
    catch (e) {
    }
    try {
      m += s2.split(".")[1].length;
    }
    catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
	}
	//给Number类型增加一个mul方法，使用时直接用 .mul 即可完成计算
	Number.prototype.cheng = function (arg) {
		if(_.isString(arg)){
			arg = Number(arg);
		}
    return accMul(arg, this);
	};
	String.prototype.cheng = function (arg) {
		var _ths = Number(this);
    return _ths.cheng(arg);
	};
	//除法函数
	function accDiv(arg1, arg2) {
    var t1 = 0, t2 = 0, r1, r2;  
    try {
      t1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
    }
    try {
      t2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
    }
    with (Math) {
      r1 = Number(arg1.toString().replace(".", ""));
      r2 = Number(arg2.toString().replace(".", ""));  
      return (r1 / r2) * pow(10, t2 - t1);
    }
	}
	//给Number类型增加一个div方法，，使用时直接用 .div 即可完成计算
	Number.prototype.chu = function (arg) {
		if(_.isString(arg)){
			arg = Number(arg);
		}
    return accDiv(this, arg);
	};
	String.prototype.chu = function (arg) {
		var _ths = Number(this);
    return _ths.chu(arg);
	};
	// round扩展
	function accRound(number,fractionDigits){
		var rt = Math.round(number*Math.pow(10,fractionDigits))/Math.pow(10,fractionDigits);
		return rt;
	}
	//给Number类型增加一个rnd方法，，使用时直接用 .rnd 即可完成计算
	Number.prototype.rnd = function (fractionDigits) {
    return accRound(this, fractionDigits);
	};
	String.prototype.rnd = function (fractionDigits) {
		var _ths = Number(this);
    return _ths.rnd(fractionDigits);
	};


	// cab tools
	var cab = {
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
		// fxNum : function(number,fractionDigits){
		// 	var rt = Math.round(number*Math.pow(10,fractionDigits))/Math.pow(10,fractionDigits);
		// 	return rt;   
		// },
		// closeWindow : function(){
		// 	if (window.confirm("您查看的页面正在试图关闭窗口。是否关闭此窗口？")) {
  //       window.open('', '_self', '');
  //       window.close();
  //     }
		// },
		closeWindow : function(){
       window.close();
		},
		chromeUrl : function(url){
			return (url.slice(0,4) === "http")?url:chrome.extension.getURL(url);
		},
	  css : function(url){
			url = cab.chromeUrl(url);
			M.connect("xhr", function(cntor){
				cntor.xhr(url, function(data){
					$("<style>")
					.append(data)
					.appendTo("head");	
				});
			});
	  },
	  html : function(){
	  	if(arguments.length != 2 && arguments.length != 3) throw "C:html() wrong arguments";
	  	// url, isNeedScript, callback
	  	// console.log("arguments:", arguments);
	  	var url = cab.chromeUrl(arguments[0]);
	  	var isNeedScript, callback;
	  	if(arguments.length == 2 && _.isFunction(arguments[1])){
	  		isNeedScript = false;
	  		callback = arguments[1];
	  	}else if(arguments.length == 3 && _.isFunction(arguments[2])){
	  		isNeedScript = arguments[1];
	  		callback = arguments[2];
	  	}else{
	  		throw "C:html() wrong arguments[2]";
	  	};
	  	var _df = $.Deferred();
	  	if(isNeedScript){
	  		console.log("html isNeedScript");
				$.ajax({ url: url, async:true, success: function(data, textStatus){
						// 一般情况callback里不要直接操作DOM刷html
						callback(data, _df);
				}, error : function(){ callback(undefined, _df);} });	  		
	  	}else{
				M.connect("xhr", function(cntor){
					cntor.xhr(url, function(data){
						// 如果请求失败data是undefined
						callback(data, _df);
					});
				});
	  	}
	  	return _df;
	  },
	  df : function(){
	  	var self = this;
			var tempAry = [];
			var loop = undefined;
			var loopF = function(args, lp){
				var func = args[0];
				Array.prototype.shift.call(args);
				return function(){
					$.when(func.apply(func, args) ).done(lp);
				}
			}
			var loopFm = function(arr, lp){
				return function(){
					var _arr = [];
					_.each(arr, function(val){
						_arr.push(val());
					});
					$.when.apply($.when, _arr).done(lp);
				}
			}
			this.next = function(){
				tempAry.push(arguments);
				return self;
			}
			this.go = function(){
				for (var i = tempAry.length - 1; i >= 0; i--) {
					var arr = Array.prototype.slice.call(tempAry[i]);
					var _isLoopFm = true;
					for(var j=0; j<arr.length; j++){
						if(!_.isFunction(arr[j])){
							_isLoopFm = false;
							break;
						}
					}
					if(_isLoopFm){
						loop = loopFm(arr, loop);
					}else{
						loop = loopF(tempAry[i], loop);
					}
				};
				if(_.isFunction(loop)) loop();
			}
			return this;
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
	 //  storage : function(){
		// 	this.set = function(items, callback){
		// 		chrome.storage.sync.set(items, callback);
		// 	};
		// 	this.get = function(keys, callback){
		// 		chrome.storage.sync.get(keys, callback);
		// 	};
		// 	this.onChange = function(listenerObj){
		// 		var _obj = cab.OBJnw(listenerObj);
		// 		_.each(_obj, function(func, key){
		// 			chrome.storage.onChanged.addListener(func);		
		// 		});
		// 	};
		// 	this.rmChange = function(listenerObj){
		// 		var _obj = cab.OBJnw(listenerObj);
		// 		_.each(_obj, function(func, key){
		// 			chrome.storage.onChanged.removeListener(func);		
		// 		});
		// 	};
		// 	this.ngBind = function(scope, storageKey, callback, optionOnChange){
		// 		this.get(storageKey, function(items){
		// 			if(items[storageKey]){
		// 				scope.$apply(function(){
		// 					scope[storageKey] = items[storageKey];
		// 				});
		// 				if(callback) callback(items[storageKey]);					
		// 			}else{
		// 				if(callback) callback();
		// 			}
		// 		});
		// 		this.onChange(function(changes){
		// 			if(changes[storageKey]){
		// 				scope.$apply(function(){
		// 					scope[storageKey] = changes[storageKey].newValue;
		// 				});
		// 			}
		// 		});
		// 		if(optionOnChange) this.onChange(optionOnChange);
		// 	};
		// 	this.remove = function(keys, callback){
		// 		// chrome.storage.sync.clear();
		// 		chrome.storage.sync.remove(keys, callback);
		// 	}
		// 	this.clear = function(callback){
		// 		chrome.storage.sync.clear(callback);
		// 	}
		// 	return this;
		// }(),
		storage : function(){
			this.set = function(items, callback){
				chrome.storage.local.set(items, callback);
			};
			this.get = function(keys, callback){
				chrome.storage.local.get(keys, callback);
			};
			this.onChange = function(listenerObj){
				var _obj = cab.OBJnw(listenerObj);
				_.each(_obj, function(func, key){
					chrome.storage.onChanged.addListener(func);		
				});
			};
			this.rmChange = function(listenerObj){
				var _obj = cab.OBJnw(listenerObj);
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
						scope.$apply(function(){
							scope[storageKey] = changes[storageKey].newValue;
						});
					}
				});
				if(optionOnChange) this.onChange(optionOnChange);
			};
			this.remove = function(keys, callback){
				chrome.storage.local.remove(keys, callback);
			}
			this.clear = function(callback){
				chrome.storage.local.clear(callback);
			}
			return this;
		}()
		
	}

	return cab;

}()
