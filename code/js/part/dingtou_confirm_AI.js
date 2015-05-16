// https://trade.fund123.cn/Trade/RegularInvestmentConfirm/ai
// 定投处理页面
// 判断是否成功,如果成功通过message回传

module.exports = function(){
	console.log("dingtou_confirm_AI");
	var _url = new URI();
	var has_xyh = _url.hasQuery('xyh', function(_xyh){
		M.connect('dt_confirm_AI', _xyh+"_dtgo", function(tn){
			// 通过检测通道关闭事件触发动作
		});
	});
	if(has_xyh === false){
		console.log("tunnel fundcode");
		var _fundcode = $("div.dingfundname b:eq(0)").text().trim();
		M.connect('dt_confirm_AI', _fundcode+"_dtgo", function(tn){
			// 通过检测通道关闭事件触发动作
		});
	}
	// _url.hasQuery("a", function(val){
	// 	if(val=='A'){
	// 		// 从暂停到打开
	// 	}else if(val=='P'){
	// 		// 从打开到暂停
	// 		_url.hasQuery('xyh', function(_xyh){
	// 			M.connect('dt_confirm', _xyh+"_dt", function(tn){
	// 				// 通过检测通道关闭事件触发动作
	// 				// tn.send({type:"confirm", code:"zanting", body:{isOk:true}});
	// 			});
	// 		});
	// 	}
	// });


}()