// http://my.fund123.cn/RealFundDefault.aspx
// for this url page

var $ = require('jquery');
var C = require('../modules/chrome_cab');
var M = require("../modules/chrome_msg");

module.exports = function(){
	var time = new Date().getTime();
	var msgHome = M.connect("my-fund-one");
	msgHome.onMsg(function(msg, port){
		console.log("msg:", msg, "port:", port);
		if(new Date().getTime() < time + 20000) port.send("msgHome");
	});
	msgHome.send("hello world!msgHome");

	var msgHome2 = M.connect("my-fund-two");
	msgHome2.onMsg(function(msg, port){
		console.log("msg2:", msg, "port:", port);
		if(new Date().getTime() < time + 30000) port.send("msgHome2");
	});
	msgHome2.send("hello world!msgHome2");

	// console.log("is go");
}();