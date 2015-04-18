// http://my.fund123.cn/RealFundDefault.aspx
// for this url page

var $ = require('jquery');
var C = require('../modules/chrome_cab');
// var M = require("../modules/chrome_msg");

module.exports = function(){
	console.log("dingtou");
	C.css('../css/part/fund123_dingtou.css');
	C.html('../html/part/fund123_dingtou.html', function(data){
		$("html").append(data);
		$("html").append('<div id="newBody"></div>');
	});

	chrome.runtime.onConnect.addListener(function(port){
		console.log("dingtou: onC: port: ", port);
		port.onMessage.addListener(function(msg, portt){
			console.log("dingtou: msg:", msg, "portt:", portt);
		});
	});

}();