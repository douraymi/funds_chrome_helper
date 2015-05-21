// case "https://trade.fund123.cn/Trading/Do/RedeemConfirm":

module.exports = function(){
	console.log("RedeemConfirm");
	var _amount = $(".red").text().trim().replace(/[^0-9\.]+/g,"");
	var _url = new URI();
	_url.hasQuery("FundCode", function(val){
		M.connect("redeemConfirm", val+"confirm", function(tn){
			tn.send({type:"redeemConfirm", code:"onLoad", body:{redeemQ:_amount}});
			// console.log("tn:", tn);


			// for fake test
			// tn.onMsg({
			// 	test : {
			// 		test : function(msg){
			// 			console.log("in fake tn");
			// 			M.connect("redeemConfirm", val+"done", function(tn){
			// 				tn.send({type:"redeemDone", code:"onLoad", body:{isRedeemOk:true}});

			// 			});
			// 		}
			// 	}
			// });
			// for fake test end

		});
	});

}()