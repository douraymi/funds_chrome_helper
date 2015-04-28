;(function() {
	window.GIRAFEEEWINDOW = "content_script";
	window.$ = window.$ ? window.$ : false;
	// window.jQuery = window.jQuery ? window.jQuery : false;
	window.angular = window.angular ? window.angular : false;
	window.URI = window.URI ? window.URI : require('URIjs');
	window.M = window.M ? window.M : require("./modules/chrome_msg");
	window.C = window.C ? window.C : require('./modules/chrome_cab');

	// girafeeeApp必须插入DOM，C.ng中直接注入angularjs模块
	if(angular === false) throw "no angular !!!!!";
	$('html').append('<div id="girafeeeApp"><div ng-view></div></div>');
	// jquery等导入window全局对象中方便别的文件使用
	// menifest文件中导入jquery、angularjs和bootstrap
	// =======================



	// console.log("in content");
	// $('html').attr("ng-app", "");
	// $('html').attr("ng-csp", "");

	var thisUri = new URI().query("").fragment("").toString();
	switch(thisUri){
		case "http://my.fund123.cn/RealFundDefault.aspx":
		case "https://www.baidu.com/":
			//我的基金
			require('./part/fund123_my_fund');
			break;
		case "https://trade.fund123.cn/home/agreementquery/":
			//定投页面
			require('./part/fund123_dingtou');
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