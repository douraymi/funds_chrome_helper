;(function() {
	window.GIRAFEEEWINDOW = "content_script";

	window.$ = window.$ ? window.$ : false;
	window._ = window._ ?	window._ : require('underscore');
	window.URI = window.URI ? window.URI : require('URIjs');
	window.angular = window.angular ? window.angular : false;
	window.M = window.M ? window.M : require("./modules/chrome_msg");
	window.C = window.C ? window.C : require('./modules/chrome_cab');

	// girafeeeApp必须插入DOM，C.ng中直接注入angularjs模块
	if(angular === false) throw "no angular !!!!!";
	// jquery等导入window全局对象中方便别的文件使用
	// menifest文件中导入jquery、angularjs和bootstrap
	// =======================

	// 清空storage
	// C.storage.clear();

	// console.log("in content");
	// $('html').attr("ng-app", "");
	// $('html').attr("ng-csp", "");
	var uri = new URI();
	window.thisDomain = uri.domain();
	window.thisHost = uri.protocol() + '://' + uri.host();
	window.thisUri = uri.query("").fragment("").toString();
	console.log('thisDomain:',thisDomain, 'thisHost:',thisHost, 'thisUri:',thisUri);
	
	// $('html').append('<div id="girafeeeApp"><div ng-view></div></div>');
	// 放到 cab中的ng里了

	if(thisDomain == "1234567.com.cn" || thisDomain == "eastmoney.com"){
		// 天天基金页面处理
		switch(thisUri){
			case "https://trade.1234567.com.cn/Investment/default":
			case "https://trade6.1234567.com.cn/Investment/default":
				require('./part/tiantian_dingtou');
				break;
			case "http://fund.eastmoney.com/daogou/":
				require('./part/tiantian_daogou');
				break;
			case "https://trade.1234567.com.cn/Investment/change":
			case "https://trade.1234567.com.cn/FundtradePage/redemption":
			case "https://trade.1234567.com.cn/FundTradePage/redemption":
			case "https://trade.1234567.com.cn/Investment/close":
			case "https://trade.1234567.com.cn/zsb/withdrawcash":
			case "https://trade.1234567.com.cn/Investment/add.aspx":
			case "https://trade.1234567.com.cn/Investment/close":
			case "https://trade.1234567.com.cn/Investment/again":
			case "https://trade.1234567.com.cn/Investment/suspend":
			case "https://trade6.1234567.com.cn/Investment/change":
			case "https://trade6.1234567.com.cn/FundtradePage/redemption":
			case "https://trade6.1234567.com.cn/FundTradePage/redemption":
			case "https://trade6.1234567.com.cn/Investment/close":
			case "https://trade6.1234567.com.cn/zsb/withdrawcash":
			case "https://trade6.1234567.com.cn/Investment/add.aspx":
			case "https://trade6.1234567.com.cn/Investment/close":
			case "https://trade6.1234567.com.cn/Investment/again":
			case "https://trade6.1234567.com.cn/Investment/suspend":
				require('./part/tiantian_xiugai');
				break;
			// case "https://trade.1234567.com.cn/Investment/close":
			// 	require('./part/tiantian_close');
			// 	break;
			case "https://trade.1234567.com.cn/login":
			case "https://trade6.1234567.com.cn/login":
				require('./part/tiantian_login');
				break;

			default:
		}
	}


})();