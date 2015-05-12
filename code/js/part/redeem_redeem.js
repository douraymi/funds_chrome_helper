// https://trade.fund123.cn/Trading/Do/Redeem
// 暂时只用来修正网页不稳定时的错误

module.exports = function(){
	var _fixFenE = $("#RedeemForm tr:eq(5) td:eq(1) b:eq(0)").text().trim().replace(/[^0-9\.]+/g,"");
	var _url = new URI();
	$('<a href="#" id="redeemFix" class="btn btn-xs btn-warning">fix</a>').click(function(){
			console.log("is click");
			_url.hasQuery("fundCode", function(val){
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
			});
	}).appendTo($("#RedeemForm tr:eq(5) td:eq(1)"));

}()