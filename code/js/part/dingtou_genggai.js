// https://trade.fund123.cn/Trade/RegularInvestment
// 定投处理页面
// 判断是否成功,如果成功通过message回传

module.exports = function(){
	console.log("dingtou_genggai");
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

	var _url = new URI();
	_url.hasQuery("from", function(fromVal){
		if(fromVal=='new'){
			var isOver = false;
			C.df()
			// .next(function(){
			// 	return $('#ShowCycleDay').focus();
			// }).next(function(){
			// 	return $('#keyboardjyrq td').eq(_.random(1,28)).click();
			// }).next(function(){
			// 	return $('#ShowCycleDay').blur();
			// })
			.next(function(){
				var _m = $("#MinAmountValue").text().replace(/[^0-9\.-]+/g,"");
				_m = _m.jia(11);
				var _am = $('#Amount').val().replace(/[^0-9\.-]+/g,"");
				_am = _am.jia(11)>_m?_am.jia(11):_m;
				if(_am>1000){
					isOver=true;
				}
				$('#ShowAmount').val(_am);
				return $('#Amount').val(_am);
			})
			.next(function(){
				M.connect("dingtouNew", "newfundBOT", function(tn){
					tn.onMsg({
						BOT : {
							BOT : function(msg){
								if(isOver==true){
									alert("定投金额大于1000了");
									M.connect("dingtouDone", "BOT", function(tn){
										console.log("Amount is over 1000!");
										tn.send({type:'BOT', code:'over'});
										tn.onMsg({
											BOT : {
												overOK : function(msg){
													setTimeout(function(){C.closeTab();}, 500);

												}
											}
										});
									});
								}else{
									botTimeout();
								}
							}
						}
					});
				});

				function botTimeout(){
					setTimeout(function(){
						var _input = $("input[name='TradeAccount'][isfreeze=false][isvaild=true]");
						var _warning = $(".warnbtn");
						console.log(_input.length);
						if(_input.length>0){
							$(".next").click();
						}else if(_warning.length>0){
							M.connect("dingtouWarning", "BOT", function(tn){
								setTimeout(function(){C.closeTab();}, 500);
							});
						}else{
							botTimeout();
						}
					}, 500);
				}
			})
			.go();
		}else{
			var newQuery = _url.query();
			newQuery += "&from=new";
			var newUrl = _url.query(newQuery);
			window.location.assign(newUrl.toString());
		}
	});

}()