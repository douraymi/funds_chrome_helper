// https://trade.fund123.cn/Trade/RegularInvestment/ai
// 定投处理页面
// 判断是否成功,如果成功通过message回传

module.exports = function(){
	console.log("dingtou_new");
	// $(function(){
		C.df().next(function(){
			return $('#ShowCycleDay').focus();
		}).next(function(){
			return $('#keyboardjyrq td').eq(_.random(1,28)).click();
		}).next(function(){
			return $('#ShowCycleDay').blur();
		}).next(function(){
			var _m = $("#MinAmountValue").text().replace(/[^0-9\.-]+/g,"");
			_m = _m.jia(11);
			$('#ShowAmount').val(_m);
			return $('#Amount').val(_m);
		})
		.go();

	// });

}()