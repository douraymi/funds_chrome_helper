// https://trade.fund123.cn/v3/trading/redeem/index
// -> https://trade.fund123.cn/Trading/Do/Redeem?fundCode=160607&tradeAccount=472061&sharetype=A&from=new

module.exports = function(){
	console.log("Redeem_v3");
	require('./waringing');
	
	var inputData = "{"+$("input[name='dakuan']").val()+"}";
	var j = eval('('+inputData+')');
	// console.log(jsonData);
	if(!j.FundCode && !j.ShareType && !j.TradeAccount){
		console.log("err: !j.FundCode && !j.ShareType && !j.TradeAccount");
		return;
	}
	window.location.assign("https://trade.fund123.cn/Trading/Do/Redeem?fundCode="+j.FundCode+"&tradeAccount="+j.TradeAccount+"&sharetype="+j.ShareType+"&from=new");
	


}()