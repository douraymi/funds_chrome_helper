// https://trade.1234567.com.cn/Investment/change?BusinSerialNo=e338a06930d249df9159af485954866e

module.exports = function(){
	console.log("tiantian_xiugai");
	require('./waringing');
	
	C.storage.get('ttpw', function(items){
		if(items['ttpw']){
			$("#ctl00_body_txtPaypwd").val(items['ttpw']);
		}
	});

	$("#ctl00_body_btnSp2").click(function(){
		C.storage.set({ttpw: $("#ctl00_body_txtPaypwd").val()});
	});

}()