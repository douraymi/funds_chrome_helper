module.exports = function(){
	console.log("in test");
	C.ng('html/test.html', appController);

	function appController($scope){

		// var df = $.Deferred();
		var dfFunc = function (i){
			var adf = $.Deferred();
			console.log("i:", i);

			var tfunc = function(){
				// alert(i);
				console.log("in setTimeout:", _r, "i:", i);
				adf.resolve();
			}

			var _r = _.random(1000, 5000);
			setTimeout(tfunc, _r);
			return adf;
			// return df.promise();
		}

		// var defler = function(){
		// 	var tempAry = [];
		// 	this.loop = undefined;
		// 	this.loopF = function(args, lp){
		// 		var func = args[0];
		// 		Array.prototype.shift.call(args);
		// 		return function(){
		// 			$.when(func.apply(func, args) ).done(lp);
		// 		}
		// 	}
		// 	this.next = function(){
		// 		tempAry.push(arguments);
		// 	}
		// 	this.go = function(){
		// 		for (var i = tempAry.length - 1; i >= 0; i--) {
		// 			this.loop = this.loopF(tempAry[i], this.loop);
		// 		};
		// 		if(_.isFunction(this.loop)) this.loop();
		// 	}
		// 	return this;
		// }

		var newdef = C.df();

		for(var i = 1; i < 3; i++){
			newdef.next(dfFunc, i);
		}

		// newdef.next(C.html, "http://www.baidu.com", function(data, df){
		// 	console.log(data);
		// 	df.resolve();
		// });

		newdef.next(function(){
			return C.html("http://www.baidu.com", function(data, df){
				console.log("OK html");
				df.resolve();
			});
		}, function(){
			return C.html("http://fund.eastmoney.com/", function(data, df){
				console.log("OK html");
				df.resolve();
			});
		}, function(){
			return C.html("http://www.163.com", function(data, df){
				console.log("OK html");
				df.resolve();
			});
		}, function(){
			return C.html("http://www.kuqin.com/", function(data, df){
				console.log("OK html");
				df.resolve();
			});
		}, function(){
			return C.html("http://www.cnblogs.com/", function(data, df){
				console.log("OK html");
				df.resolve();
			});
		}, function(){
			return C.html("http://aijezdm915.iteye.com/", function(data, df){
				console.log("OK html");
				df.resolve();
			});
		})


		for(var i = 1; i < 5; i++){
			newdef.next(dfFunc, i);
		}

		newdef.go();

		// C.html("http://www.baidu.com", function(data){
		// 	console.log(data);
		// });

		// var defler = function(){
		// 	this.loop = undefined;
		// 	this.loopF = function(i, func){
		// 		return function(){
		// 			$.when( dfFunc(i)).done(func);
		// 		}
		// 	}
		// 	this.next = function(i){
		// 		this.loop = this.loopF(i, this.loop);
		// 	}
		// 	this.go = function(){
		// 		if(_.isFunction(this.loop)) this.loop();
		// 	}
		// 	return this;
		// }

		// var newdef = defler();
		// for(var i = 1; i < 7; i++){
		// 	newdef.next(i);
		// }
		// newdef.go();


		// var loopF = function(i, func){
		// 	return function(){
		// 		$.when( dfFunc(i)).done(func);
		// 	}
		// }
		// var newLoop = function(){console.log("empty");};
		// for(var i = 1; i < 7; i++){
		// 	newLoop = loopF(i, newLoop);
		// }
		// newLoop();

		// var ddff = $.Deferred();
		// $.when(ddff).done(function(){
		// 	$.when(dfFunc(22)).done(function(){
		// 		$.when(dfFunc(33)).done(function(){
		// 			$.when(dfFunc(44)).done(function(){
		// 				dfFunc(55);
		// 			});
		// 		});
		// 	});
		// });
		// ddff.resolve();


		// $.when(dfFunc(11)).done(function(){
		// 	return dfFunc(22);
		// }).done(function(){
		// 	return dfFunc(33);
		// }).done(function(){
		// 	return dfFunc(44);
		// }).done(function(){
		// 	return dfFunc(55);
		// }).done(function(){
		// 	return dfFunc(66);
		// });

		// $.when(dfFunc(df, 11)).done($.when(dfFunc(df, 22)).done($.when(dfFunc(df, 33)).done($.when(dfFunc(df, 44)).done($.when(dfFunc(df, 55)).done(function(){console.log("end");})))));


		// $.when($.when($.when(dfFunc(df, 11)).done(function(){ dfFunc(df, 22); })).done(function(){ dfFunc(df, 33); })).done(function(){ dfFunc(df, 44); });

		// $.when(dfFunc(df, 11)).done($.when(dfFunc(df, 22)).done($.when(dfFunc(df, 33)).done(dfFunc(df, 44))));
		

		// var _df = dfFunc(df, 11);
		// $.when(_df).done(dfFunc(df, 22)).done(dfFunc(df, 33));
		
		// var ff; // = $.Deferred();
		// // var _df = $.when(dfFunc(df, 100));
		// for (var i = 5; i >= 0; i--) {
		// 	// _df.done(function(){
		// 	// 	dfFunc(df, i);
		// 	// });
		// 	console.log("count:", i);
		// 	ff = function(ii){
		// 		return function(){
		// 			console.log(arguments);
		// 			$.when(dfFunc(ii)).done(ff);
		// 		};
		// 	}(i);
		// }

		// ff();

		// var dtd = $.Deferred(); // 新建一个deferred对象
		// var wait = function(dtd){
		// 	var tasks = function(){
		// 		console.log("执行完毕！");
		// 		// alert("执行完毕！");
		// 		dtd.resolve(); // 改变deferred对象的执行状态
		// 	};
		// 	setTimeout(tasks,5000);
		// 	return dtd;
		// };

		// $.when(wait(dtd))
		// .done(function(){ console.log("哈哈，成功了！");  })
		// .fail(function(){ alert("出错啦！"); });

	}

}()