// https://trade.fund123.cn/Trade/RegularInvestment/ai
// 定投处理页面
// 判断是否成功,如果成功通过message回传

module.exports = function(){
	console.log("dingtou_new");

	var _url = new URI();
	_url.hasQuery("from", function(fromVal){
		if(fromVal=='new'){
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
			}).next(function(){
				M.connect("dingtouNew", "newfundBOT", function(tn){
					tn.onMsg({
						BOT : {
							BOT : function(msg){
								// $("#bankList").bind("DOMNodeInserted", function(elm){
								// 	$("input[isvaild='true']").eq(0).click();
								// 	console.log("in change");
								// 	$(".next").click();
								// });
								// $("input[name='TradeAccount']").change(function(){
								// 	console.log("in change");
								// 	$(".next").click();
								// });
								setTimeout(function(){$(".next").click();}, 2000);
							}
						}
					});
				});
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