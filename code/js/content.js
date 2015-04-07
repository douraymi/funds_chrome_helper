;(function() {
	var $ = require('jquery');
	window.$ = $;
	var chrome = window.chrome;
	console.log("chrome:", chrome);
	console.log("test");
	//can't use chrome.tabs here	
	// chrome.tabs.insertCSS({file: 'chrome-extension://__MSG_@@extension_id__/css/amazeui/amazeui.css'});
	// chrome.tabs.insertCSS({file: 'chrome-extension://__MSG_@@extension_id__/css/content.css'});

	$.ajax({ url: chrome.extension.getURL('../html/content.html'), async:true, success: function(data, textStatus){
			// console.log("data:",data,"textStatus:",textStatus);
			$("html").append(data);
			$("html").append('<div id="newBody"></div>');
			// var gtst = getstyle(".am-close-alt");
			// console.log("@font-face: ", gtst);

	} });
	// });

	$("#main").bind("DOMNodeInserted", function(elm){
	// 	console.log("main INsert");
	});

})();