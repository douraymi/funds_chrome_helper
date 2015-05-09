module.exports = function(){
	C.ng('html/test.html', appController);

	function appController($scope){

		var df = $.Deferred();
		var dfFunc = function (adf, i){
			// var df = $.Deferred();
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

		$.when(dfFunc(df, 11)).done(function(){ console.log("end"); });

		// $.when(dfFunc(df, 11)).done($.when(dfFunc(df, 22)).done($.when(dfFunc(df, 33)).done(dfFunc(df, 44))));
		

		// var _df = dfFunc(df, 11);
		// $.when(_df).done(dfFunc(df, 22)).done(dfFunc(df, 33));
		
		

		// var _df = $.Deferred();
		// var _df = $.when(dfFunc(df, 100));
		// for (var i = 5; i >= 0; i--) {
		// 	_df.done(dfFunc(df, i));
			
		// }


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