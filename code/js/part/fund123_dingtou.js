// http://my.fund123.cn/RealFundDefault.aspx
// for this url page

var $ = window.$ ? window.$ : require('jquery');
var C = require('../modules/chrome_cab');
var M = require("../modules/chrome_msg");

module.exports = function(){
	console.log("dingtou");
	C.css('../css/part/fund123_dingtou.css');
	C.html('../html/part/fund123_dingtou.html', function(data){
		// console.log("data:",data);
		$("html").append(data);
		// $("html").append('<div id="newBody"></div>');
	});


	// var test = C.chromeUrl("http://girafeee.com");
	// console.log("test:", test);

	// chrome.storage.sync.get(null, function(items){
	// 	// console.log(items);
	// });
	// console.log(chrome.storage);
 //  chrome.storage.onChanged.addListener(function(changes, nameSpace){
 //    console.log(nameSpace);
 //  });

	// var dingtou = M.connect("dingtou", function(connector){
	// 	connector.tunnel("abcdef", function(tunnel){
	// 		tunnel.send({type:"normal", code:"dingtou", body:"who are you"});
	// 		tunnel.onMsg({
	// 			normal:{
	// 				abc: function(msg){console.log("abc:", msg);},
	// 				my_fund: function(msg){console.log("my_fund:", msg);}
	// 			}
	// 		});
	// 	});

	// 	connector.send({type:"test1", code:"abab", body:{gggg:"ggggggg"}});
	// 	connector.onMsg({
	// 		test1rep : {
	// 			rep : function(msg){
	// 				console.log(msg);
	// 			}
	// 		}
	// 	});
	
	// });

	// chrome.runtime.onConnect.addListener(function(port){
	// 	console.log("dingtou: onC: port: ", port);
	// 	port.onMessage.addListener(function(msg, portt){
	// 		console.log("dingtou: msg:", msg, "portt:", portt);
	// 	});
	// });

}();