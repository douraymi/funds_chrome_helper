// https://trade.fund123.cn/v3/trading/Regular/Smart?rd=635695481296452695&fundcode=580003
// -> https://trade.fund123.cn/Trade/RegularInvestment/ai?fundCode=160125&from=new
// 定投处理页面
// 判断是否成功,如果成功通过message回传

module.exports = function(){
	console.log("dingtou_new_v3");
	require('./waringing');
	
	var _url = new URI();
	_url.hasQuery("fundcode", function(fundcode){
		if(fundcode != undefined){
			window.location.assign("https://trade.fund123.cn/Trade/RegularInvestment/ai?fundCode="+fundcode+"&from=new");
		}else{
			console.log("hasQuery fundcode is undefined");
		}
	});
	// C.df().next(function(){
	// 	return $('#monthInput').focus();
	// }).next(function(){
	// 	$(".monthsbox").css("display", "block");
	// 	return $('.monthsbox a').eq(_.random(1,28)).click();
	// }).next(function(){
	// 	return $('#monthInput').blur();
	// }).next(function(){
	// 	var _m = $("#span_min_amount").text().replace(/[^0-9\.-]+/g,"");
	// 	_m = _m.jia(11);
	// 	$('#showAmount').val(_m);
	// 	return $('#amount').val(_m);
	// }).next(function(){
	// 	M.connect("dingtouNew", "newfundBOT", function(tn){
	// 		tn.onMsg({
	// 			BOT : {
	// 				BOT : function(msg){
	// 					if(msg.body != undefined){
	// 						$(".pwd").val(msg.body);
	// 						setTimeout(function(){$("#a_submit").click();}, 2000);
	// 					}else{
	// 						$("#a_submit").click(function(){
	// 							tn.send({type:"BOT", code:"pw", body:$(".pwd").val()});
	// 						});
	// 					}
	// 				}
	// 			}
	// 		});
	// 	});
	// })
	// .go();




}()