//connection adapt

var bgInit = function(){
	chrome.runtime.onConnect.addListener(function(port){
		// return callback(port);
		return port;
	});
};

var singleton = {
	sync : function( fn ){
		var result;
		return function(){
			return result || ( result = fn.apply( this, arguments ) );
		}
	},
	asyn : function( fn , callback ){
		var result;
		console.log("in asyn");


		// return function(){
		// 	console.log("in asyn2");
		// 	return result || ( result = fn.apply( this, [callback] ) );
		// }
	}

};

var connect = {

};

connect.init = function(mode){
	switch(mode){
		case 'bg':
			return singleton.sync(bgInit);

		case 'content':
			break;

		case 'ba':
			break;

		default:

	}
};



module.exports = connect;