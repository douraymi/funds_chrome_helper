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
					M.connect('dt_confirm_2', _fundcode+"_today_dt", function(tn2){
						// ranking列表记录
						// 通过检测通道关闭事件触发动作
						tn2.onMsg({
							xxx : {
								xxx : function(msg){
									// console.log("xxx", msg);
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
				console.log('_xyh:', _xyh);
				M.connect('dt_confirm', _xyh+"_dtzt", function(tn){
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
					// 通过检测通道关闭事件触发动作
				});
			});
		}
	});

				// $('<a href="#" id="check" class="btn btn-xs btn-warning">check</a>').click(function(){
				// 	console.log($('input[name="TradePassword"]').val());
				// }).appendTo($("div.dingamount"));

        // function vf() {
        // 	console.log("in vf", $('input[name="TradePassword"]', form).val());
        // 	// alert($('input[name="TradePassword"]', form).val());
        //     var form = $('#RegularForm');
        //     $('input[type="submit"]', form).attr('disabled', 'disabled');
        //     if ($('input[name="TradePassword"]', form).val() == '') {
        //         alert('请输入交易密码 :');
        //         $('input[name="TradePassword"]', form).focus();
        //         $('input[type="submit"]').removeAttr('disabled');
        //         return false;
        //     }
        //     if ($('input[name="ValidateCode"]', form).val() == '') {
        //         alert('请输入验证码 1');
        //         $('input[name="ValidateCode"]', form).focus();
        //         $('input[type="submit"]').removeAttr('disabled');
        //         return false;
        //     }
        //     return true;
        // }
        // var message = '';
        // if (message.length > 0) {
        //     alert(message);
        // }
    


}()