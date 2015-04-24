;(function() {
	var $ = require('jquery');
	var C = require('../modules/chrome_cab');
	var marked = require('marked');
	marked.setOptions({
	  renderer: new marked.Renderer(),
	  gfm: true,
	  tables: true,
	  breaks: false,
	  pedantic: false,
	  sanitize: true,
	  smartLists: true,
	  smartypants: false
	});
	C.html("/html/client/help.mdx", function(data){
		$("#md").append(marked(data));
	});
})();