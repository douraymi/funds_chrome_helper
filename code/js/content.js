;(function() {
	var $ = require('jquery');
	// 如果要在content.html中使用jquery 必须把jquery导入window全局对象中
	window.$ = $;

	// var chrome = window.chrome; //need for mocha test

















	//can't use chrome.tabs here	

	// $.ajax({ url: chrome.extension.getURL('../html/content.html'), async:true, success: function(data, textStatus){
	// 		$("html").append(data);
	// 		$("html").append('<div id="newBody"></div>');

	// } });

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