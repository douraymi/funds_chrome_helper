module.exports = function(){
	console.log("tiantian_login");

	setTimeout(function(){
		// console.log("ttpw:::", $("#tbpwd").val());
		// C.storage.set({ttpw: $("#tbpwd").val() });
		$(".submit").click(function(){  C.storage.set({ttpw: $("#tbpwd").val() }) ;});
	}, 500);
	
	// C.storage.get('ttpw', function(items){
	// 	if(items['ttpw']){
	// 		setTimeout(function(){
	// 			$("#tbpwd").val(items['ttpw']);
	// 			$(".tbform input[type='hidden']:eq(1)").val(items['ttpw']);
	// 			C.storage.set({ttpw: items['ttpw']});
	// 		}, 500);
	// 	}
	// });

}()