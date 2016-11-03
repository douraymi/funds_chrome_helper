// https://trade.1234567.com.cn/Investment/change?BusinSerialNo=e338a06930d249df9159af485954866e

module.exports = function(){
	console.log("tiantian_xiugai");
	$(function(){
		setTimeout(function(){
			if($("#ctl00_body_amount").length>0){
				if($("#zdxe").length>0){
					// 新增定投的地方
					$("#ctl00_body_rbPeriodTime_1").click();
					// $("#ctl00_body_rpPeriodTime_ctl01_ddList").click();
					var rnd = _.random(1, 5);
					$("#ctl00_body_rpPeriodTime_ctl01_ddList").val(rnd);
					var rndtext = $("#ctl00_body_rpPeriodTime_ctl01_ddList").find("option[value='"+rnd+"']").text();
					$("#ctl00_body_hfWorkWeek").val(rndtext);
					//这个才是真正起到数据作用的
					$("#ctl00_body_hfPeriodday").val(rnd);
					// $("#ctl00_body_rpPeriodTime_ctl01_ddList").find("option[value='"+rnd+"']").attr("selected",true);
					// console.log('av: ', $("#ctl00_body_rpPeriodTime_ctl01_ddList").val());
					var rndAm = _.random(111, 666);
					// $("#ctl00_body_amount").val($("#zdxe").text().trim().jia(11));
					$("#ctl00_body_amount").val($("#zdxe").text().trim().jia(rndAm));
				}else{
					// 更改

				}
			};

			if($("#ctl00_body_txtPaypwd").length>0){
				C.storage.get('ttpw', function(items){
					// if(items['ttpw']){
						$("#ctl00_body_txtPaypwd").val(items['ttpw']);
					// }else{
					// 	$("#ctl00_body_btnSp2, #ctl00_body_btnSp3").click(function(){
					// 		C.storage.set({ttpw: $("#ctl00_body_txtPaypwd").val()});
					// 	});
					// }
				});
			};

			if($("#ctl00_body_btnSp1").length>0){
				$("html,body").animate({scrollTop:$("#ctl00_body_btnSp1").offset().top-450});
			}else if($("#ctl00_body_btnSp2").length>0){
				$("html,body").animate({scrollTop:$("#ctl00_body_btnSp2").offset().top-450});
			}else if($(".tarr").length>0){
				$("html,body").animate({scrollTop:$(".tarr").offset().top-450});
			}

		}, 500);
		
	});

}()