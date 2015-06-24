// https://trade.fund123.cn/Trade/RegularInvestmentConfirm/normal
// https://trade.fund123.cn/Trade/RegularInvestmentConfirm/ai
// 定投处理页面
// 判断是否成功,如果成功通过message回传

module.exports = function(){
	console.log("dingtou_confirm_AI");
	require('./waringing');
	
	if($(".dingbtn").length > 0){
		$("html,body").animate({scrollTop:$(".dingbtn").offset().top-450});
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
	}

	var _fundcode = $("div.dingfundname b:eq(0)").text().trim();
	M.connect('dt_confirm_AI', _fundcode+"_dtgo", function(tn){
		// 变更,新增行为
		// 通过检测通道关闭事件触发动作
		tn.onMsg({
			BOT : {
				BOT : function(msg){
					if(!msg.body){
						$(".next").click(function(){
							tn.send({type:"BOT", code:"pw", body:$("input[name='TradePassword']").val()});
						});
					}else{
						$("input[name='TradePassword']").val(msg.body);
						$(".next").click();
					}
				}
			}
		});
		M.connect('dt_confirm_AI_2', _fundcode+"_today_dt", function(tn2){
			// ranking列表记录
			// 通过检测通道关闭事件触发动作
			tn2.onMsg({
				xxx : {
					xxx : function(msg){
						tn.send({type:'xxx', code:'xxx', body:msg.body});

					}
				}
			});
		});
	});

	


}()