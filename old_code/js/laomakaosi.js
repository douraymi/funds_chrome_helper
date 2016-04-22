// 把以下代码修正一下，保证异步可以按顺序执行，并在两个for循环中间插入一个ajax过程
// jquery underscore等插件可用

var dfFunc = function (i){
	var df = $.Deferred();
	var func = function(){
		console.log("in setTimeout:", _r, "i:", i);
		df.resolve();
	}
	var _r = _.random(1000, 5000);
	setTimeout(func, _r);
	return df;
}

for(var i=1; i<5; i++){
	dfFunc(i);
}

$.ajax({
	url: '/path/to/file',
})
.done(function() {
	console.log("success");
});

for(var i=10; i<15; i++){
	dfFunc(i);
}

