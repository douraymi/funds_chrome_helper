// https://trade.1234567.com.cn/Investment/change?BusinSerialNo=e338a06930d249df9159af485954866e

module.exports = function(){
	console.log("tiantian_close");
	$(function(){
		setTimeout(function(){
			if($("#ctl00_body_txtPaypwd").length>0){
				C.storage.get('ttpw', function(items){
					if(items['ttpw']){
						$("#ctl00_body_txtPaypwd").val(items['ttpw']);
					}else{
						$("#ctl00_body_btnSp2, #ctl00_body_btnSp3").click(function(){
							C.storage.set({ttpw: $("#ctl00_body_txtPaypwd").val()});
						});
					}
				});
			};

			if($(".tarr").length>0){
				$("html,body").animate({scrollTop:$(".tarr").offset().top-450});
			}

		}, 500);
		
	});

}()