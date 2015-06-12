// https://trade.fund123.cn/Trading/Do/Redeem
// 暂时只用来修正网页不稳定时的错误

module.exports = function(){
	console.log("Redeem");
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

	var _url = new URI();
	_url.hasQuery("from", function(fromVal){
		if(fromVal=='new'){
			var _keyong = Number($("#RedeemForm tr:eq(5) td:eq(1) b:eq(0)").text().trim().replace(/[^0-9\.-]+/g,""));
			console.log("_keyong:", _keyong);
			var _mini = Number($("#MinAmountValue").attr("minvalue").replace(/[^0-9\.-]+/g,""));
			console.log("_mini:", _mini);
			var _text = $("#MinAmountValue").text();
			var _last = Number(_text.slice(_text.indexOf("若申请后不足")).replace(/[^0-9\.-]+/g,""));
			console.log("_last:", _last);
			_url.hasQuery("fundCode", function(val){
				M.connect("redeemRedeem", val+"day90redeem", function(tn){
					// tn.send({type:"day90redeem", code:"tnOk"});
					tn.onMsg({
						day90redeem : {
							day90redeem : function(msg){
								console.log(msg);
								// var _day90redeem = C.fxNum(msg.body.day90redeem, 2);
								var _day90redeem = msg.body.day90redeem.rnd(2);
									console.log("_day90redeem:", _day90redeem);
								if(_day90redeem == -1){
									$('#ShowAmount').val(_keyong);
									$('#Amount').val(_keyong);
								}else if(_day90redeem > 0){
									// _day90redeem = _day90redeem>_mini?_day90redeem: (_keyong>_mini?_mini:_keyong);
									var _toRedm;
									_toRedm = _day90redeem>_keyong?_keyong:_day90redeem;
									console.log("_toRedm1:", _toRedm);
									_toRedm = _toRedm>_mini?_toRedm:(_keyong>_mini?_mini:_keyong);
									console.log("_toRedm2:", _toRedm);
									_toRedm = _keyong.jian(_toRedm)>_last?_toRedm:_keyong;
									console.log("_toRedm3:", _toRedm);
									$('#ShowAmount').val(_toRedm);
									$('#Amount').val(_toRedm);
								}
							}
						}
					});
				});

				$('<a href="#" id="redeemFix" class="btn btn-xs btn-warning">fix</a>').click(function(){
					// _url.hasQuery("fundCode", function(val){
						console.log("@", val, "@");
						M.connect("redeemRedeem", val+"redeem", function(tn){
							console.log("in redeem connect");
							tn.send({type:"redeemRedeem", code:"fix", body:{fixFenE:_keyong }});
							tn.onMsg({
								redeemRedeem : {
									fix : function(msg){
										if(msg.body.isDone) C.closeTab();
									}
								}
							});
						});
					// });
				}).appendTo($("#RedeemForm tr:eq(5) td:eq(1)"));

			});

		}else{
			var newQuery = _url.query();
			newQuery += "&from=new";
			var newUrl = _url.query(newQuery);
			window.location.assign(newUrl.toString());
		}
	});
	


}()