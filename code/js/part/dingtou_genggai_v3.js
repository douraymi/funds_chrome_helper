// https://trade.fund123.cn/v3/trading/Regular/Edit?id=201407150021&rd=635695526125003432
// -> https://trade.fund123.cn/Trade/RegularInvestment?xyh=201407150021&from=new
// 定投处理页面
// 判断是否成功,如果成功通过message回传

module.exports = function(){
	console.log("dingtou_genggai_v3");
	require('./waringing');

	var _url = new URI();
	_url.hasQuery("id", function(id){
		if(id != undefined){
			window.location.assign("https://trade.fund123.cn/Trade/RegularInvestment?xyh="+id+"&from=new");
		}else{
			console.log("hasQuery id is undefined");
		}
	});

}()