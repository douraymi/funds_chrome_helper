// http://fund.eastmoney.com/daogou/

module.exports = function(){
	console.log("tiantian_daogou");
	C.css('css/part/tiantian_daogou.css');

	C.ngGbl(appController, function(dfd){
		var uri = new URI();
		uri.hasQuery('fundcode', function(fundcode){
			if(fundcode != undefined){
				var trid = "tr_"+fundcode;
				$("#fund_list").bind("DOMNodeInserted", function(elm){
					$("#"+trid).addClass('hight_light');
					$("html,body").animate({scrollTop:$("#"+trid).offset().top-250});
					console.log($("#"+trid));

				})
			}
		});
		dfd.res();
	});
	function appController($scope){
		$scope.setting = {
		}









	}




}();