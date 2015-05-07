// https://trade.fund123.cn/Trade/RegularInvestmentPost/ai
// 定投操作(成功)页面
// 判断是否成功,如果成功通过message回传

module.exports = function(){
	var _isRedeemOk = false;
	var _result = $("#success_message").text().trim();
	// console.log("_result:", _result);
	if($("#success_message").length>0 && _result==="基金赎回完成"){
		_isRedeemOk = true;
	}
	var _url = new URI();
	_url.hasQuery("fundCode", function(val){
		M.connect("redeemConfirm", val+"done", function(tn){
			tn.send({type:"redeemDone", code:"onLoad", body:{isRedeemOk:_isRedeemOk}});
			// console.log("_isRedeemOk:", _isRedeemOk);

		});
	});

}()