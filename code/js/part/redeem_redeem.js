// https://trade.fund123.cn/Trading/Do/Redeem
// 暂时只用来修正网页不稳定时的错误

module.exports = function(){
	console.log("Redeem");
	var _keyong = Number($("#RedeemForm tr:eq(5) td:eq(1) b:eq(0)").text().trim().replace(/[^0-9\.-]+/g,""));
	var _mini = Number($("#MinAmountValue").attr("minvalue"));
	var _text = $("#MinAmountValue").text();
	var _last = _text.slice(_text.indexOf("若申请后不足")).replace(/[^0-9\.-]+/g,"");
	console.log(_last);
	var _url = new URI();
	_url.hasQuery("fundCode", function(val){
		M.connect("redeemRedeem", val+"day90redeem", function(tn){
			// tn.send({type:"day90redeem", code:"tnOk"});
			tn.onMsg({
				day90redeem : {
					day90redeem : function(msg){
						// console.log(msg);
						// var _day90redeem = C.fxNum(msg.body.day90redeem, 2);
						var _day90redeem = msg.body.day90redeem.rnd(2);
						if(_day90redeem == -1){
							$('#ShowAmount').val(_keyong);
							$('#Amount').val(_keyong);
						}else if(_day90redeem > 0){
							// _day90redeem = _day90redeem>_mini?_day90redeem: (_keyong>_mini?_mini:_keyong);
							var _toRedm;
							_toRedm = _day90redeem>_keyong?_keyong:_day90redeem;
							_toRedm = _toRedm>_mini?_toRedm:(_keyong>_mini?_mini:_keyong);
							_toRedm = _keyong.jian(_toRedm)>_last?_toRedm:_keyong;
							$('#ShowAmount').val(_toRedm);
							$('#Amount').val(_toRedm);
						}
					}
				}
			});
		});

		$('<a href="#" id="redeemFix" class="btn btn-xs btn-warning">fix</a>').click(function(){
			// _url.hasQuery("fundCode", function(val){
				M.connect("redeemRedeem", val+"redeem", function(tn){
					tn.send({type:"redeemRedeem", code:"fix", body:{fixFenE:_keyong }});
					tn.onMsg({
						redeemRedeem : {
							fix : function(msg){
								if(msg.body.isDone) C.closeWindow();
							}
						}
					});
				});
			// });
		}).appendTo($("#RedeemForm tr:eq(5) td:eq(1)"));

	});


}()