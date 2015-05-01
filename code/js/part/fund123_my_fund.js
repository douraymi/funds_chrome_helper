// http://my.fund123.cn/RealFundDefault.aspx
// for this url page

module.exports = function(){
	// console.log("my_fund");
	C.css('css/part/fund123_my_fund.css');
	C.ng('html/part/fund123_my_fund.html', appController);

	function appController($scope){

		// localStorage方式统计当天赎回总额
		C.storage.ngBind($scope, "todayRedeem", function(item){
			var today = new Date();
			if(item && item.date===today.toDateString()){
			}else{
				C.storage.set({
					todayRedeem:{
						date 					: today.toDateString(),
						redeemAmount 	: 0
					}
				});
			}
		});

			// var today = new Date();
			// C.storage.set({
			// 	todayRedeem:{
			// 		date 					: today.toDateString(),
			// 		redeemAmount 	: 666
			// 	}
			// });
			// console.log($scope.todayRedeem);

		// 根据金额随机选择 卖出基金
		$scope.randomRedeem = function(amount){
			var mTb = "#m_Table_open tbody tr.bb";
			$(mTb).removeClass("hight_light");
			var tmpAry = [];
			var count = 0;
			while(count<amount){
				var size = $(mTb).size();
				var mvTr = $(mTb).eq( _.random(0, size-1) ).remove();	// 随机选一行
				count += mvTr.find("td:eq(4)").text().trim() * 1;
				tmpAry.push(mvTr);
			}
			_.each(tmpAry, function(trObj){
				trObj.addClass("hight_light");
				trObj.insertBefore($(mTb).eq(0));
				// 处理另外一行
				var anotherTr = "#TR2"+trObj.attr("id").slice(2);
				$(anotherTr).remove().insertAfter($(mTb).eq(0));
			});
		}







	}

}();