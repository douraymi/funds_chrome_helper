// 'use strict';
var _ = require('underscore');

module.exports = {
	UNQ : function(fn){
		// 牛逼的单例 马勒戈壁
		var uniqueInstance;
		return function(){
			return uniqueInstance || (uniqueInstance = fn.apply(this, arguments) );
		}
	},
	OBJnw : function(obj){
		var objContainer = {};
		if(_.isFunction(obj)){
			// var rand = randConflict(self.msgList);
			var _uniqueId = _.uniqueId('random_id_');
			objContainer[_uniqueId] = obj;
		}else if(_.isObject(obj) ){
			objContainer = obj;
		}else{
			throw new Error('need a function or a object'); 
		}
		return objContainer;
	}
}