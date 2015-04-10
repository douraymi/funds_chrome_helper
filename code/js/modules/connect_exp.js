//connection adapt

var bgInit = function(callback){
	// console.log("in bgInit: callback:", callback);
	chrome.runtime.onConnect.addListener(function(port){
		console.log("in bgInit: port:", port);
		return callback(port);
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
		// console.log("in asyn: callback:", callback);
		bgInit(callback);

		// return function(){
		// 	console.log("in asyn2");
		// 	return result || ( result = fn.apply( this, [callback] ) );
		// }
	}

};

var connect = {

};

connect.init = function(mode, callback){
	switch(mode){
		case 'bg':
			return singleton.asyn(bgInit, callback);

		case 'content':
			break;

		case 'ba':
			break;

		default:

	}
};



module.exports = connect;