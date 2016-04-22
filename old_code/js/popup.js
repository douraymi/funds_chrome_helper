;(function() {
	// var $ = require('jquery');
	var $ = window.$ ? window.$ : require('jquery');

	function closePopup() {
	    window.close();
	}

	function newTab(link) {
	  closePopup();
	  chrome.tabs.create({
	      url:link
	  });
	}

	document.addEventListener('DOMContentLoaded', function () {
		// if(!window.$) return console.log("debug: need jquery!");

		$("a").click(function(){
			newTab($(this).attr("href"));
		});
	});

})();