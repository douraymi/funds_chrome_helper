// https://trade.fund123.cn/Trade/RegularInvestment
// 定投处理页面
// 判断是否成功,如果成功通过message回传

module.exports = function(){
	console.log("dingtou_genggai");
	$(function(){
		function preFun(){
			document.onkeydown = function (e) { 
				var theEvent = window.event || e; 
				var code = theEvent.keyCode || theEvent.which; 
				if (code == 13) { 
					$(".next.dtbg:not(.close)").click();
				}
			}
		}
		setTimeout(function(){preFun();}, 500);
	});

	var _url = new URI();
	_url.hasQuery("from", function(fromVal){
		if(fromVal=='new'){
			C.df()
			// .next(function(){
			// 	return $('#ShowCycleDay').focus();
			// }).next(function(){
			// 	return $('#keyboardjyrq td').eq(_.random(1,28)).click();
			// }).next(function(){
			// 	return $('#ShowCycleDay').blur();
			// })
			.next(function(){
				var _m = $("#MinAmountValue").text().replace(/[^0-9\.-]+/g,"");
				_m = _m.jia(11);
				var _am = $('#Amount').val().replace(/[^0-9\.-]+/g,"");
				_am = _am.jia(11)>_m?_am.jia(11):_m;
				$('#ShowAmount').val(_am);
				return $('#Amount').val(_am);
			})
			.go();
		}else{
			var newQuery = _url.query();
			newQuery += "&from=new";
			var newUrl = _url.query(newQuery);
			window.location.assign(newUrl.toString());
		}
	});

}()