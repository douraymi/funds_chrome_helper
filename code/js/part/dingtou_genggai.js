// https://trade.fund123.cn/Trade/RegularInvestmentConfirm
// 定投处理页面
// 判断是否成功,如果成功通过message回传

module.exports = function(){
	console.log("dingtou_genggai no Use");

	var _url = new URI();
	_url.hasQuery("from", function(fromVal){
		if(fromVal=='new'){

		}else{
			var newQuery = _url.query();
			newQuery += "&from=new";
			var newUrl = _url.query(newQuery);
			window.location.assign(newUrl.toString());
		}
	});

}()