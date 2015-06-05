// https://trade.fund123.cn/Trade/RegularInvestmentPost/ai
// 定投操作(成功)页面
// 判断是否成功,如果成功通过message回传

module.exports = function(){
	console.log("dingtou_done no Use");
	// var _isOk = false;
	// var _result = $("#RegularForm h3:eq(0)").text().trim();
	// // console.log("_result:", _result);
	// if(_result=="操作完成"){
	// 	_isOk = true;
	// }
	// var _url = new URI();
	// _url.hasQuery("fundCode", function(val){
		M.connect("dingtouDone", "BOT", function(tn){
			setTimeout(function(){C.closeWindow();}, 2000);
			$('<a href="#" id="stop" class="btn btn-xs btn-warning">BOTstop</a>').click(function(){
				tn.send({type:"BOT", code:"stop"});
				C.closeWindow();
			}).appendTo($("div.dingbtn").eq(0));
		});
	// });

}()