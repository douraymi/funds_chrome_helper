;(function() {
  var $ = require('jquery');
  var M = require('./modules/chrome-msg').initBG();
  var URI = require('URIjs');

  M.onMsg(function(msg, port){
  	var thisUrl = new URI(port.sender.url).query("").fragment("").toString();
  	// console.log("msg", msg, "port", port);
  	console.log("msg", msg, "port", port, "url:", thisUrl);
  	M.send("bg");
  });

  // chrome.runtime.onConnect.addListener(function callback(port){
  //  	// var thisUrl = new URI(port.sender.tab.url).query("").fragment("").href();
  //  	// console.log("port:", port);
  //  	// port.postMessage("t1");
  //  	// port.postMessage("t2");
  // 	port.postMessage("bbgg");
  // 	port.onMessage.addListener(function(msg, sender){
  // 		console.log("msg:", msg, "sender:", sender);
  // 	});
  // });
	// console.log(new Date());
	// var pp = require("./modules/chrome-msg");
	// var ppp = pp.init('bg');
	// ppp.onMsg(function(msg, sender){
	// 	ppp.send("from bg");
	// 	console.log("bgMsg:", msg, "sender:", sender);
	// });

	// console.log(ppp);

	// pp('bg').addmsg(function(msg){
	// 	console.log(msg);
	// });

	// chrome.alarms.create("tam", {
	// 	when:Date.now(),
	// 	periodInMinutes:0.1
	// });
	// chrome.alarms.onAlarm.addListener(function(alm){
	// 	console.log(ppp);
	// });
	// console.log(pp);

  // function log() { console.log.apply(console, arguments); }
  
 //  var connect = require('./modules/connect');
 //  var bgPort;
 //  // console.log(connect);

 //  // bgPort = connect.init('bg');
 //  connect.init('bg', function(port){
 //  	bgPort = port;
 //  	// log("in bg");
 //  });

	// chrome.alarms.create("tam", {
	// 	when:Date.now(),
	// 	periodInMinutes:0.1
	// });
	// chrome.alarms.onAlarm.addListener(function(alm){
	// 	console.log(bgPort);
	// });



	// chrome.runtime.onConnect.addListener(function(port){
	// 	port.onMessage.addListener(function(info){
	// 		console.log("info get in bg:", info);
			
	// 		$.ajax({ url: "http://fund.eastmoney.com/api/FundGuide.aspx?dt=0&ft=gp&sd=&ed=&sc=z&st=desc&pi=1&pn=20&zf=diy&sh=list&rnd=0.07104309764690697", async:true, success: function(data, textStatus){

	// 			port.postMessage(data);
 //      } });
	// 	});
	// });

	//test for bg port
	// var bg_port = chrome.runtime.connect();

	// chrome.alarms.create("tam", {
	// 	when:Date.now(),
	// 	periodInMinutes:0.1
	// });
	// chrome.alarms.onAlarm.addListener(function(alm){
	// 	console.log(alm);
	// 	bg_port.postMessage("(bg)post from bg");
	// });

	// bg_port.onMessage.addListener(function(info){
	// 	console.log("(bg)info get in bg:", info);
	// });

	// chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
	// 	var port = chrome.tabs.connect(tabs[0].id);
	// 	port.postMessage("(bg) post in bg");
	// 	console.log("(bg) sended!");
	// 	port.onMessage.addListener(function(response){
	// 		console.log("(bg) response in bg:", response);
	// 	});
	// });

	// chrome.runtime.onConnect.addListener(function(port) {
	//     console.assert(port.name == "knockknock", "nokock!");
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
	
	// var ttbb = [];

	// chrome.runtime.onMessage.addListener(
	// function(request, sender, sendResponse) {
	// 	 if (request.greeting == "hello"){

	// 		var port = chrome.tabs.connect(sender.tab.id);
	// 		ttbb.push(port);
	// 		// port.postMessage({joke: "Knock knock"});

	// 		port.onDisconnect.addListener(function(abc){
	// 			console.log("onDisconnect.abc:", abc);
	// 		});

	// 		port.onMessage.addListener(function(msg) {
	// 			// console.log(msg);
	// 		    if (msg.question == "Who's there?")
	// 		        port.postMessage({answer: "Madame"});
	// 		    else if (msg.question == "Madame who?")
	// 		        port.postMessage({answer: "Madame... Bovary"});
	// 		});
	// 	 }


	// });

	// chrome.alarms.create("tam", {
	// 	when:Date.now(),
	// 	periodInMinutes:0.1
	// });
	// chrome.alarms.onAlarm.addListener(function(alm){
	// 	console.log(ttbb);
	// 	for (var i = ttbb.length - 1; i >= 0; i--) {
	// 		ttbb[i].postMessage({joke: "Knock knock"});
	// 	};
	// });

	// chrome.tabs.query({active: true}, function(tabs){
	// 	console.log(tabs);
	// 	var port = chrome.tabs.connect(tabs[0].id, {name: "knockknock"});
	// 	port.postMessage({joke: "Knock knock"});

	// 	port.onMessage.addListener(function(msg) {
	// 		console.log(msg);
	// 	    if (msg.question == "Who's there?")
	// 	        port.postMessage({answer: "Madame"});
	// 	    else if (msg.question == "Madame who?")
	// 	        port.postMessage({answer: "Madame... Bovary"});
	// 	});
	// });



  // UDP like way
  // chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  //   if(message==="messa"){
  //     $.ajax({ url: "http://fund.eastmoney.com/api/FundGuide.aspx?dt=0&ft=gp&sd=&ed=&sc=z&st=desc&pi=1&pn=20&zf=diy&sh=list&rnd=0.07104309764690697", async:true, success: function(data, textStatus){
  //       sendResponse(data);
  //     } });
  //     return true;
  //   }
  // });
  
})();