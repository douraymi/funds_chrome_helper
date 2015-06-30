module.exports = function(){
	console.log("tiantian_login");
	
	C.storage.get('ttpw', function(items){
		if(items['ttpw']){
			setTimeout(function(){
				$("#tbpwd").val(items['ttpw']);
				$(".tbform input[type='hidden']:eq(1)").val(items['ttpw']);
			}, 500);
		}
	});

}()