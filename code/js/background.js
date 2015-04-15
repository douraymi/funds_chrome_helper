;(function() {
	window.GIRAFEEEWINDOW = "background";
  var $ = require('jquery');
  var _ = require('underscore');
  var C = require('./modules/chrome_cab');
  var M = require('./modules/chrome_msg');
  var URI = require('URIjs');

  console.log("bg begin");


  // var connector = {
  // 	filter: {
  // 	name 	: "my-fund-one",
  // 	url 	: "http://my.fund123.cn/RealFundDefault.aspx"
  // 	}
  // }
  // var connector2 = {
  // 	filter: {
  // 	url 	: "http://my.fund123.cn/RealFundDefault.aspx"
  // 	}
  // }
  // var connector3 = {
  // 	filter: {
  // 	name 	: "my-fund-two"
  // 	}
  // }
  // M.onConnect([connector, connector2, connector3], function(c1, c2, c3){
  // 	// console.log("in muti");
  // 	// console.log("c1:", c1);
  // 	c1.onMsg("hello world!msgHome", function(){
  // 		c3.send("hhhhhh")
  // 		console.log("hhhhhh");
  // 	});
  // 	// c2.onMsg("hello world!msgHome", function(){
  // 	// 	console.log("ggggggg");
  // 	// });
  // 	// c3.onMsg("hello world!msgHome", function(){
  // 	// 	console.log("XXXXXXX");
  // 	// });
  // });


  var connector = {
  	filter: {
  	name 	: "my-fund-one",
  	url 	: "http://my.fund123.cn/RealFundDefault.aspx"
  	},
  	funcs: {
	   	a1: function(msg, pt){
	  		console.log("11:", msg);
	  		pt.send("a1");
	  	},
	  	a2: function(msg, pt){
	  		console.log("12:", msg);
	  		pt.send("a2");
	  	}
  	}
  }
  var connector2 = {
  	filter: {
  	name 	: "my-fund-two"
  	},
  	funcs: {
	   	b1: function(msg, pt){
	  		console.log("22:", msg);
	  		pt.send("b1");
	  	}
  	}
  }
  var listner = function(port){
  	port.onMsg(connector);
  	port.onMsg(connector2);
  }
  // var m = M.onConnect(listner);

  var m = M.onConnect([connector, connector2], function(){

  });

  // var conListner = function(port){
  // 	console.log("fun1");
  // 	port.onMsg(funcs, filter);
  // 	port.onMsg(funcs2, filter2);
  // }
  // var m = M.onConnect(conListner);
  // var filter = {
  // 	name 	: "my-fund-one",
  // 	url 	: "http://my.fund123.cn/RealFundDefault.aspx"
  // }
  // var filter2 = {
  // 	name 	: "my-fund-two"
  // }
  // var funcs = {
  // 	a1: function(msg, pt){
  // 		console.log("msg:", msg);
  // 		pt.send("a1");
  // 	},
  // 	a2: function(msg, pt){
  // 		console.log("msg:", msg);
  // 		pt.send("a2");
  // 	}
  // }
  // var funcs2 = {
  // 	b1: function(msg, pt){
  // 		console.log("msg:", msg);
  // 		pt.send("b1");
  // 	},
  // 	b2: function(msg, pt){
  // 		console.log("msg:", msg);
  // 		pt.send("b2");
  // 	}
  // }

  // C.alm(function(){
  // 	console.log("m:", m);
  // 	_.each(m.ports, function(value, key, list){
  // 		value.postMessage("gggooooddd");
  // 	});
  // });

  // C.alm(function(){
  // 	m.rmMsg(filter2, funcs2);
  // }, 0.5);

  // var m2 = require('./modules/chrome_msg').onConnect(fun1);
  // console.log("m2:", m2);
  // var m3 = require('./modules/chrome_msg').onConnect(fun1);
  // console.log("m3:", m3);
  // var o1 = m();
  // console.log(o1);
  // var o2 = m();
  // console.log(o2);
  // var o3 = m();
  // m.add();
  // console.log(m);
  // m.add();
  // var m2 = M.initBG()();
  // console.log(m2);



  // M = M.initBG();
  // M.onMsg(function(msg, port){
  // 	var thisUrl = new URI(port.sender.url).query("").fragment("").toString();
  // 	// console.log("msg", msg, "port", port);
  // 	// console.log("msg", msg, "port", port, "url:", thisUrl);
  // 	console.log(port);
  // 	// port.postMessage("bg");
  // 	// M.send("bg");
	 //  C.alm(function(){
	 //  	// M.send("bg");
	 //  	port.postMessage("bg");
	 //  });
  // });



  // chrome.runtime.onConnect.addListener(function callback(port){
  // //  	// var thisUrl = new URI(port.sender.tab.url).query("").fragment("").href();
  // //  	// console.log("port:", port);
  // //  	// port.postMessage("t1");
  // //  	// port.postMessage("t2");
  // 	port.postMessage("bbgg");
  // 	port.onMessage.addListener(function(msg, sender){
	 //  	// C.alm(function(){
		//   // 	// M.send("bg");
		//   // 	port.postMessage("bg");
		//   // });
  // 		console.log("msg:", msg, "sender:", sender);
  // 	});
  // });

	// M.init().send("same in bg").onMsg(function(msg){
	// 	console.log("got it!");
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