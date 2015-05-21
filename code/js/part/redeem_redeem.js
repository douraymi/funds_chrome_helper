// https://trade.fund123.cn/Trading/Do/Redeem
// 暂时只用来修正网页不稳定时的错误

module.exports = function(){
	console.log("Redeem");
	var _fixFenE = $("#RedeemForm tr:eq(5) td:eq(1) b:eq(0)").text().trim().replace(/[^0-9\.]+/g,"");
	var _url = new URI();
	_url.hasQuery("fundCode", function(val){
		M.connect("redeemRedeem", val+"day90redeem", function(tn){
			tn.send({type:"day90redeem", code:"tnOk"});
			tn.onMsg({
				day90redeem : {
					day90redeem : function(msg){
						console.log(msg);
						var _day90redeem = msg.body.day90redeem;
						if(_day90redeem != undefined){
							$('#ShowAmount').val(_day90redeem);
							$('#Amount').val(_day90redeem);
						}
					}
				}
			});
		});

		$('<a href="#" id="redeemFix" class="btn btn-xs btn-warning">fix</a>').click(function(){
			// _url.hasQuery("fundCode", function(val){
				M.connect("redeemRedeem", val+"redeem", function(tn){
					tn.send({type:"redeemRedeem", code:"fix", body:{fixFenE:_fixFenE }});
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