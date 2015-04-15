;(function() {
	window.GIRAFEEEWINDOW = "content_script";
	var $ = require('jquery');
	var MSG_CON = require("./modules/chrome_msg");
	var URI = require('URIjs');

	// 如果要在content.html中使用jquery 必须把jquery导入window全局对象中
	// 开发阶段开启
	window.$ = $;
	// =======================

	var thisUri = new URI().query("").fragment("").toString();
	switch(thisUri){
		case "http://my.fund123.cn/RealFundDefault.aspx":
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