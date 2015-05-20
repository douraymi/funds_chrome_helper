// https://trade.fund123.cn/Trade/RegularInvestmentConfirm
// 定投处理页面
// 判断是否成功,如果成功通过message回传

module.exports = function(){
	console.log("dingtou_confirm");
	var _url = new URI();
	_url.hasQuery("a", function(val){
		if(val=='A'){
			// 从暂停到打开
			var _fundcode = $("div.dingfundname b:eq(0)").text().trim();
			_url.hasQuery('xyh', function(_xyh){
				console.log("_xyh:", _xyh);
				M.connect('dt_confirm', _xyh+"_dtgo", function(tn){
					// 通过检测通道关闭事件触发动作
					M.connect('dt_confirm_2', _fundcode+"_today_dt", function(tn2){
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
			});
		}else if(val=='P'){
			// 从打开到暂停
			_url.hasQuery('xyh', function(_xyh){
				M.connect('dt_confirm', _xyh+"_dtzt", function(tn){
					// 通过检测通道关闭事件触发动作
				});
			});
		}
	});

}()