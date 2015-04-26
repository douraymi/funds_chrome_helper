// http://my.fund123.cn/RealFundDefault.aspx
// for this url page

var $ = window.$ ? window.$ : require('jquery');
var C = require('../modules/chrome_cab');
var M = require("../modules/chrome_msg");



module.exports = function(){
	console.log("my_fund");
	C.css('css/part/fund123_my_fund.css');
	C.html('html/part/fund123_my_fund.html', function(data){
		// console.log("data", data);
		// $("html").append(data);
		$(data)
		.find("#testButton").click(function(){
			// console.log($("#myfund"));
			// $.ajax({ url: "https://trade.fund123.cn/home/agreementquery/", async:true, success: function(data2, textStatus){

					$("#myfund").html("hahahahahahahahahahaha");

			// } });

		}).end()
		.find("#testButton2").click(function(){
			$.ajax({ url: "https://trade.fund123.cn/home/agreementquery/", async:true, success: function(data, textStatus){

					$("#myfund").html(data);

			} });
		}).end().appendTo("html");

		$("html").append('<div id="newBody"></div>');
	});


	// console.log(chrome);
	// chrome.storage.sync.set({'test':new Date().getTime()});
 //  chrome.storage.onChanged.addListener(function(changes, nameSpace){
 //    console.log(nameSpace);
 //  });
	// var my_fund = M.connect("my_fund", function(connector){
	// 	// console.log("connector:", connector);
	// 	connector.tunnel("abcdef", function(tunnel){
	// 		tunnel.send({type:"normal", code:"my_fund", body:"who are you"});
	// 		tunnel.onMsg({
	// 			normal:{
	// 				abc: function(msg){console.log("abc:", msg);},
	// 				dingtou: function(msg){console.log("dingtou:", msg);}
	// 			}
	// 		});
	// 		tunnel.onClose.addListener(function(){
	// 			console.log("GGGGGGG");
	// 		});
	// 	});
	// });

	// var my_fund = M.connect("my_fund", "abcdef");
	// var my_fund = M.connect("my_fund", function(){});

	// var my_tn = my_fund.tunnel("abcdef", function(tn){});
	// my_tn.onMsg({
	// 	normal:{
	// 		abc: function(msg){console.log("abc:", msg);},
	// 		dingtou: function(msg){console.log("dingtou:", msg);}
	// 	}
	// });

	// $.ajax({ url: chrome.extension.getURL('../css/part/fund123_my_fund.css'), async:true, success: function(data, textStatus){
	// 	$("<style>")
	// 	.append(data)
	// 	.appendTo("head");
	// } });
	// $.ajax({ url: chrome.extension.getURL('../html/part/fund123_my_fund.html'), async:true, success: function(data, textStatus){
	// 		$("html").append(data);
	// 		$("html").append('<div id="newBody"></div>');

	// } });


	// var connector = chrome.runtime.connect({name:"my_fund"});
	// 	// console.log(connector);
	// connector.postMessage("msg from my_fund");

	// connector.onMessage.addListener(function(msg, port){
	// 	if(msg === "test"){

	// 	}else{
	// 		console.log("msg:", msg, "port:", port);
	// 	}
	// });

	// var counter2 = 0;
	// var msgHome2 = M.connect("my-fund-two");
	// msgHome2.onMsg(function(msg, port){
	// 	console.log("msg2:", msg, "port:", port);

	// 	if(msg.type === "isOnConnect"){
	// 		var counter5 = 0;
	// 		var msgHome5 = M.connect("my-fund-five");
	// 		msgHome5.onMsg(function(msg, port){
	// 			console.log("msg5:", msg, "port:", port);

	// 			if(msg.type === "isOnConnect"){
	// 				var counter3 = 0;
	// 				var msgHome3 = M.connect("my-fund-three");
	// 				msgHome3.onMsg(function(msg, port){
	// 					console.log("msg3:", msg, "port:", port);

	// 					if(msg.type === "isOnConnect"){
	// 						var counter1 = 0;
	// 						var msgHome1 = M.connect("my-fund-one");
	// 						msgHome1.onMsg(function(msg, port){
	// 							console.log("msg1:", msg, "port:", port);

	// 							if(msg.type === "isOnConnect"){
	// 								var counter4 = 0;
	// 								var msgHome4 = M.connect("my-fund-four");
	// 								msgHome4.onMsg(function(msg, port){
	// 									console.log("msg4:", msg, "port:", port);

	// 								});
	// 								// msgHome4.send("hello world!msgHome");
	// 							}

	// 						});
	// 						// msgHome1.send("hello world!msgHome");
	// 					}
	// 				});
	// 				// msgHome3.send("hello world!msgHome");
	// 			}
	// 		});
	// 		// msgHome5.send("hello world!msgHome");
	// 	}

	// });
	// // msgHome2.send("hello world!msgHome");





	// var counter2 = 0;
	// var msgHome2 = M.connect("my-fund-two");
	// msgHome2.onMsg(function(msg, port){
	// 	console.log("msg2:", msg, "port:", port);
	// });
	// // msgHome2.send("hello world!msgHome");

	// var counter4 = 0;
	// var msgHome4 = M.connect("my-fund-four");
	// msgHome4.onMsg(function(msg, port){
	// 	console.log("msg4:", msg, "port:", port);
	// });
	// // msgHome4.send("hello world!msgHome");

	// var counter5 = 0;
	// var msgHome5 = M.connect("my-fund-five");
	// msgHome5.onMsg(function(msg, port){
	// 	console.log("msg5:", msg, "port:", port);
	// });
	// // msgHome5.send("hello world!msgHome");

	// var counter3 = 0;
	// var msgHome3 = M.connect("my-fund-three");
	// msgHome3.onMsg(function(msg, port){
	// 	console.log("msg3:", msg, "port:", port);
	// });
	// // msgHome3.send("hello world!msgHome");

	// var counter1 = 0;
	// var msgHome1 = M.connect("my-fund-one");
	// msgHome1.onMsg(function(msg, port){
	// 	console.log("msg1:", msg, "port:", port);
	// });
	// // msgHome1.send("hello world!msgHome");


}();