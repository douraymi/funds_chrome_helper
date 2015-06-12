// https://trade.fund123.cn/Trade/RegularInvestmentPost/ai
// 定投操作(成功)页面
// 判断是否成功,如果成功通过message回传

module.exports = function(){
	console.log("dingtou_done");
	$(function(){
		function preFun(){
			document.onkeydown = function (e) { 
				var theEvent = window.event || e; 
				var code = theEvent.keyCode || theEvent.which; 
				if (code == 13) {
					window.close();
					// $(".next.dtbg:not(.close)").click();
				}
			}
		}
		setTimeout(function(){preFun();}, 500);
	});

	M.connect("dingtouDone", "BOT", function(tn){
		setTimeout(function(){C.closeTab();}, 2000);
		$('<a href="#" id="stop" class="btn btn-xs btn-warning">BOTstop</a>').click(function(){
			tn.send({type:"BOT", code:"stop"});
			C.closeTab();
		}).appendTo($("div.dingbtn").eq(0));
	});

}()