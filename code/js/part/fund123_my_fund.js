// http://my.fund123.cn/RealFundDefault.aspx
// for this url page

module.exports = function(){
	// console.log("my_fund");
	C.css('css/part/fund123_my_fund.css');
	C.ng('html/part/fund123_my_fund.html', appController);

	function appController($scope){








		// 根据金额随机选择 卖出基金
		$scope.randomSale = function(amount){
			var mTb = "#m_Table_open tbody tr.bb";
			$(mTb).removeClass("hight_light");
			var tmpAry = [];
			var count = 0;
			while(count<amount){
				var size = $(mTb).size();
				var mvTr = $(mTb).eq( _.random(0, size) ).remove();	// 随机选一行
				count += mvTr.text().trim() * 1;
				tmpAry.push(mvTr);
			}
			_.each(tmpAry, function(trObj){
				trObj.addClass("hight_light");
				// 处理另外一行
				$(mTb+" #"+trObj.attr("id")).remove().insertBefore($(mTb).eq(0));
				trObj.insertBefore($(mTb).eq(0));
			});
		}







	}

}();