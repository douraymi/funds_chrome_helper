// case "https://trade.fund123.cn/Trading/Do/RedeemConfirm":

module.exports = function(){
	console.log("RedeemConfirm");
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
	
	var _amount = $(".red").text().trim().replace(/[^0-9\.-]+/g,"");
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