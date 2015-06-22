// https://trade.1234567.com.cn/Investment/default?spm=S

module.exports = function(){
	console.log("tiantian_dingtou");
	C.css('css/part/tiantian_dingtou.css');
	C.ng('html/part/tiantian_dingtou.html', appController);

	function appController($scope){
		$scope.setting = {
		}
		$scope.zhuti = {};
		var ttzhuti = require('../etc/zhuti');
		// setTimeout(function(){
		// 	console.log('$scope.zhuti:', $scope.zhuti);
		// }, 1000);
		$('.mctb.mt10 tbody:eq(2) tr:gt(0)').each(function(i, tr){
			var _fundcode = $(this).find('td:eq(0)').text().trim();
			$scope.zhuti[_fundcode] = {};
			// proc
			
		});
		ttzhuti.bind($scope.zhuti);


	}




}();