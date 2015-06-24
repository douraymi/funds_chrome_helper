// https://trade.fund123.cn/Trade/RegularInvestment/ai
// 定投处理页面
// 判断是否成功,如果成功通过message回传

module.exports = function(){
	console.log("dingtou_new");
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
			C.df().next(function(){
				return $('#ShowCycleDay').focus();
			}).next(function(){
				return $('#keyboardjyrq td').eq(_.random(1,28)).click();
			}).next(function(){
				return $('#ShowCycleDay').blur();
			}).next(function(){
				var _m = $("#MinAmountValue").text().replace(/[^0-9\.-]+/g,"");
				_m = _m.jia(11);
				$('#ShowAmount').val(_m);
				return $('#Amount').val(_m);
			}).next(function(){
				M.connect("dingtouNew", "newfundBOT", function(tn){
					tn.onMsg({
						BOT : {
							BOT : function(msg){
								botTimeout();
							}
						}
					});
				});
			})
			.go();

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

		}else{
			var newQuery = _url.query();
			newQuery += "&from=new";
			var newUrl = _url.query(newQuery);
			window.location.assign(newUrl.toString());
		}
		
	});



}()