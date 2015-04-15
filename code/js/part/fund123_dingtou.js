// http://my.fund123.cn/RealFundDefault.aspx
// for this url page

var $ = require('jquery');
var C = require('../modules/chrome_cab');
var M = require("../modules/chrome_msg");

module.exports = function(){
	console.log("is go");
	C.css('../css/part/fund123_dingtou.css');
	C.html('../html/part/fund123_dingtou.html', function(data){
		$("html").append(data);
		$("html").append('<div id="newBody"></div>');
	});

}();