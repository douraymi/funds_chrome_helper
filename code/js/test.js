module.exports = function(){
	console.log("in test");
	C.ng('html/test.html', appController);

	function appController($scope){

		var num1 = "3.9";
		var num2 = "1.3";
		var a = num1.jia(num2);
		var b = num1.jian(num2);
		var c = num1.cheng(num2);
		var d = num1.chu(num2);
		console.log("a:", a, "b:", b, "c:", c, "d:", d );
		var num3 = "89.784568";
		var e = num3.rnd(3);
		console.log("e:", e);
		// var num1 = 10;
		// var num2 = 2;

		// console.log(num1.add(num2));

		// var a = "ttt";
		// var b = a;
		// var c = String(a);
		// a = "ffff";
		// console.log("a:", a, "b:", b, "c:", c);
		// var a2 = "ttt";
		// var b2 = a2;
		// var c2 = new String(a2);
		// b2 = "ffff";
		// console.log("a2:", a2, "b2:", b2, "c2:", c2);

		// console.log(mh.eval);
		// var a = "-3.9"*1;
		// var a = -3.9;
		// var b = 2.1;
		// // var c = mh.eval('a+b');
		// var c = mh.chain(a).add(b).done();
		// console.log("c:", c);
		// var d = mh.eval(a+b);
		// console.log("d:", d);



		// var df = $.Deferred();
		// var dfFunc = function (i){
		// 	var adf = $.Deferred();
		// 	console.log("i:", i);

		// 	var tfunc = function(){
		// 		// alert(i);
		// 		console.log("in setTimeout:", _r, "i:", i);
		// 		adf.resolve();
		// 	}

		// 	var _r = _.random(1000, 5000);
		// 	setTimeout(tfunc, _r);
		// 	return adf;
		// 	// return df.promise();
		// }

		// var newdef = C.df();

		// // for(var i = 1; i < 3; i++){
		// // 	newdef.next(dfFunc, i);
		// // }

		// newdef.next(C.html, "http://market.fund123.cn/", function(data, df){
		// 	if(data.indexOf("<b>定投：</b><span>暂停</span>")>-1){
		// 		console.log("pause");
		// 	}else if(data.indexOf("<b>定投：</b><span>开放</span>")>-1){
		// 		console.log("goon");
		// 	}else{
		// 		console.log("null");
		// 	}
		// 	// if(data.match('<b>定投：</b><span>暂停</span>')){
		// 	// 	console.log(data.match('<b>定投：</b><span>暂停</span>'));
		// 	// }else if(data.match('<b>定投：</b><span>开放</span>')){
		// 	// 	console.log(data.match('<b>定投：</b><span>开放</span>'));
		// 	// }
		// 	// console.log(data);
		// 	df.resolve();
		// });

		// newdef.next(function(){
		// 	return C.html("http://www.baidu.com", function(data, df){
		// 		console.log("OK html");
		// 		df.resolve();
		// 	});
		// }, function(){
		// 	return C.html("http://fund.eastmoney.com/", function(data, df){
		// 		console.log("OK html");
		// 		df.resolve();
		// 	});
		// }, function(){
		// 	return C.html("http://www.163.com", function(data, df){
		// 		console.log("OK html");
		// 		df.resolve();
		// 	});
		// }, function(){
		// 	return C.html("http://www.kuqin.com/", function(data, df){
		// 		console.log("OK html");
		// 		df.resolve();
		// 	});
		// }, function(){
		// 	return C.html("http://www.cnblogs.com/", function(data, df){
		// 		console.log("OK html");
		// 		df.resolve();
		// 	});
		// }, function(){
		// 	return C.html("http://aijezdm915.iteye.com/", function(data, df){
		// 		console.log("OK html");
		// 		df.resolve();
		// 	});
		// })


		// for(var i = 1; i < 5; i++){
		// 	newdef.next(dfFunc, i);
		// }

		// newdef.go();


		// var df = $.Deferred();
		// console.log(df);
		// console.log("====================================");
		// console.log("(1)", dfFunc(12).state === df.state);
		// console.log("(2)", dfFunc(12).state == df.state);






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