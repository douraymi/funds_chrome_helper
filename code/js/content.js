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
	$('html').append('<div id="girafeeeApp"><div ng-view></div></div>');
	// jquery等导入window全局对象中方便别的文件使用
	// menifest文件中导入jquery、angularjs和bootstrap
	// =======================

	// 清空storage
	// C.storage.clear();

	// console.log("in content");
	// $('html').attr("ng-app", "");
	// $('html').attr("ng-csp", "");
	var uri = new URI();
	window.thisHost = uri.protocol() + '://' + uri.host();
	window.thisUri = uri.query("").fragment("").toString();
	console.log('thisUri:',thisUri);
	switch(thisUri){
		// test
		case "https://www.baidu.com/":
			require('./test');
			break;
		// 我的基金
		case "http://my.fund123.cn/RealFundDefault.aspx":
			require('./part/fund123_my_fund');
			break;
		// 基金赎回
		case "https://trade.fund123.cn/v3/trading/redeem/index":
			require('./part/redeem_redeem_v3');
			break;
		case "https://trade.fund123.cn/Trading/Do/Redeem":
			require('./part/redeem_redeem');
			break;
		case "https://trade.fund123.cn/Trading/Do/RedeemConfirm":
			require('./part/redeem_confirm');
			break;
		case "https://trade.fund123.cn/Trading/Do/RedeemDone":
			require('./part/redeem_done');
			break;
		//定投页面
		case "https://trade.fund123.cn/home/agreementquery/":
			require('./part/fund123_dingtou');
			break;
		// 暂停或开启 确定
		case "https://trade.fund123.cn/Trade/RegularInvestmentConfirm":
			require('./part/dingtou_confirm');
			break;
		// 变更、新增 确定
		case "https://trade.fund123.cn/Trade/RegularInvestmentConfirm/normal":
		case "https://trade.fund123.cn/Trade/RegularInvestmentConfirm/ai":
			require('./part/dingtou_confirm_AI');
			break;
		// 定投-AI变更
		case "https://trade.fund123.cn/Trade/RegularInvestment":
			// --> https://trade.fund123.cn/Trade/RegularInvestmentConfirm/ai
			require('./part/dingtou_genggai');
			break;
			// V3定投-AI变更
		case "https://trade.fund123.cn/v3/trading/Regular/Edit":
			require('./part/dingtou_genggai_v3');
			break;
		// 定投-AI新增
		case "https://trade.fund123.cn/Trade/RegularInvestment/ai":
			// --> https://trade.fund123.cn/Trade/RegularInvestmentConfirm/ai
			require('./part/dingtou_new');
			break;
			// V3定投-AI新增
		case "https://trade.fund123.cn/v3/trading/Regular/Smart":
			require('./part/dingtou_new_v3');
			break;
		// 定投 done
		case "https://trade.fund123.cn/Trade/RegularInvestmentPost/ai":
		case "https://trade.fund123.cn/Trade/RegularInvestmentPost/normal":
			require('./part/dingtou_done');
			break;


		default:

	}



	// var msgHome = MSG_CON.init(thisUri);
	// msgHome.onMsg(function(msg, sender){
	// 	console.log("msg:", msg, "sender:", sender);
	// 	// msgHome.send("hello second!");
	// });
	// msgHome.send("hello world!");


	// $.ajax({ url: chrome.extension.getURL('../html/content.html'), async:true, success: function(data, textStatus){
	// 		$("html").append(data);
	// 		$("html").append('<div id="newBody"></div>');

	// } });








	// console.log(window.chromeMsgBG);
	// girafeee function box
	// var content_script_init = function(){
	// 	var content_port =  chrome.runtime.connect({name:"content_script_init"});
	// 	return content_port;
	// }

	// var cp = content_script_init();

	// var msgCtner = require("./modules/message_container");
	// msgCtner
	// .regMsg("msgtest", function(msg){
	// 	console.log("msgtest:msg:", msg);
	// })
	// .regMsg("msgtest2", function(msg){
	// 	console.log("msgtest2:msg:", msg);
	// })
	// .regTask("tasktest", ["msgtest", "msgtest2"])
	// .runtimeInit(cp, "tasktest");

	// var p1 = require("./modules/chrome-msg");
	// var pp1 = p1('content_script');
	// var p2 = require("./modules/chrome-msg")('content_script');


	// var p4 = require("./modules/chrome-msg").init('ct').send("hello world!");
	// var abc = msgCtner.send("hello world!");
	// console.log(pp3);
	// console.log(p3);
	// console.log(pp3);


	// var port = chrome.runtime.connect({name:"content_script_init"});
	// port.postMessage("meg1");	
	// port.onMessage.addListener(function(msg, sender){
	// 	console.log("msg:", msg, "sender:", sender);
	// 	// port.postMessage("sendback");
	// });	
	// var port2 = chrome.runtime.connect({name:"content_script_init2"});
	// port2.postMessage("meg2");
	// port2.onMessage.addListener(function(msg, sender){
	// 	console.log("msg2:", msg, "sender:", sender);
	// 	// port2.postMessage("sendback");
	// });














	//can't use chrome.tabs here	 ??

	// chrome.tabs.getCurrent(function callback(tab){
	// 	console.log("in it!:", tab);
	// })

	// console.log("chrome.tabs:", chrome.tabs);



	// $("#main").bind("DOMNodeInserted", function(elm){
	// 	// 	console.log("main INsert");
	// });

	// html是之前就有的, on一定要绑在原来就有的东西上面,
	// 刷进去的内容要绑定on要在该内容的html里写
	// $("html").on('click', '#testButton2', function(){
	// 	var content_port = chrome.runtime.connect();
	// 	content_port.postMessage("post from content_script");

	// 	content_port.onMessage.addListener(function(info){
	// 		console.log("info get in content_script:", info);
	// 	});

	// });

	//test for bg port
	// var port = chrome.runtime.connect();
	// chrome.runtime.onConnect.addListener(function(port){
	// 	port.onMessage.addListener(function(info){
	// 		console.log("(bg)info get in content_script:", info);
	// 		port.postMessage("(bg) reply in content_script");
	// 	});
	// });

	// console.log(chrome.extension.getURL("manager.html"));

	// var port = chrome.runtime.connect({name: "knockknock"});
	// port.postMessage({joke: "Knock knock"});
	// port.onMessage.addListener(function(msg) {
	// 	console.log(msg);
	//     if (msg.question == "Who's there?")
	//         port.postMessage({answer: "Madame"});
	//     else if (msg.question == "Madame who?")
	//         port.postMessage({answer: "Madame... Bovary"});
	// });

	// chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
	// });

	// chrome.runtime.onConnect.addListener(function(port) {
	// 	console.log(port);
	//     // console.assert(port.name == "knockknock", "nokock!");
	//     port.onMessage.addListener(function(msg) {
	//           console.log(msg);
	//         if (msg.joke == "Knock knock")
	//             port.postMessage({question: "Who's there?"});
	//         else if (msg.answer == "Madame")
	//             port.postMessage({question: "Madame who?"});
	//         else if (msg.answer == "Madame... Bovary")
	//             port.postMessage({question: "I don't get it."});
	//     });
	// });




})();