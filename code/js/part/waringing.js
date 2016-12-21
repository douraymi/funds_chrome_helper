// https://trade.fund123.cn/GoTrade/定投恢复?xyh=201506010308&tradeAccount=472061
// 出错页面

module.exports = function(){
	var _warning = $(".warnbtn");
	if(_warning.length>0){
		console.log("warning!");
		M.connect("dingtouWarning", "BOT", function(tn){
			setTimeout(function(){C.closeTab();}, 500);
		});
	}
}()