module.exports = function(){
	var $ = require('jquery');
	var MSG_CON = require("../modules/chrome-msg");

	var msgHome = MSG_CON.init("my-fund-one");
	msgHome.onMsg(function(msg, port){
		console.log("msg:", msg, "port:", port);
		// msgHome.send("hello second!");
	});
	msgHome.send("hello world!");

	console.log("is go");
}();