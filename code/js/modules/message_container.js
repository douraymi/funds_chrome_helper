/*
message_container

*/
var _ = require("underscore");

module.exports = function () {
	var msgCtner = {};
	msgCtner.msgList = {};
	msgCtner.task = {};

	function msgAryIsInList(messageNameArray){
		var isOk = true;
		_.each(messageNameArray, function(element, index, list){
			if(!_.has(msgCtner.msgList, element)) isOk = false;			
		});
		return isOk;
	}

	msgCtner.regMsg = function(messageName, func){
		if(!_.isFunction(func)) throw "argm.func is not a function";

		msgCtner.msgList[messageName] = func;
		return this;
	}
	msgCtner.regTask = function(taskName, messageNameArray){
		if(!_.isArray(messageNameArray)) throw "messageNameArray is not array";
		if(!msgAryIsInList(messageNameArray))	throw "messageNameArray is not in msgList";

		msgCtner.task[taskName] = messageNameArray;
		return this;
	}
	msgCtner.runtimeInit = function(port, taskName){
		if(!_.has(msgCtner.task, taskName)) throw "has not this task";

		_.each(msgCtner.task[taskName], function(value, key, list){
			port.onMessage.addListener(msgCtner.msgList[value]);
		});
		return this;
	}

	return msgCtner;
}();