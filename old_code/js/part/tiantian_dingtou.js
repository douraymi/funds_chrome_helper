// https://trade.1234567.com.cn/Investment/default?spm=S

module.exports = function(){
	console.log("tiantian_dingtou");
	C.css('css/part/tiantian_dingtou.css');
	// C.ng('html/part/tiantian_dingtou.html', appController);
	
	// C.storage.get('ttpw', function(items){
	// 	if(items['ttpw']){

	// 	}
	// });
	


	C.ngGbl(appController, function(dfd){
		// $('.Investmenttitle:eq(2)').append(' 总定投/月：'+$scope.allSums);
		$('.Investmenttitle:eq(2)').append(' <span style="color: red;">总定投/月：{{allSums}}</span>/<span style="color: blue;">{{allSumsAll}}</span> 			<span class="oprate"> 			<a style="background-color: LightSteelBlue;" id=open10>o10</a> 			<a style="background-color: LightSteelBlue;" id=open30>o30</a> 			<a style="background-color: LightSteelBlue;" id=open50>o50</a> 			<a style="background-color: LightSteelBlue;" id=open100>o100</a> 			</span> 			<span class="oprate"> 			<a style="background-color: Khaki;" id=close1>c1</a> 			<a style="background-color: Khaki;" id=close10>c10</a> 			<a style="background-color: Khaki;" id=close30>c30</a> 			<a style="background-color: Khaki;" id=close50>c50</a> 			<a style="background-color: Khaki;" id=close100>c100</a> 			</span>');

		// var jhstr = $('.mctb.mt10 tbody:eq(2) tr:eq(2) td:eq(8) a:last').attr('id').replace('_', '$');
		// var jhstr = $('.mctb.mt10 tbody:eq(2) tr:eq(2) td:eq(8) a:last').attr('id').replace(/_/g, '$');
		// console.log('jhstr:', jhstr);
		// $.ajax();

		// 重新排序 先排序再做后续处理
		$('.mctb.mt10 tbody:eq(2) tr:eq(0)').find("td:eq(0)").attr('_order', 1);
		C.tableSortOnce('table.mctb.mt10:eq(2)', 1, 'int', true);
		// 修改链接 增加内容
		var df = C.df();
		$('.mctb.mt10 tbody:eq(2) tr:gt(0)').each(function(i, tr){
			var fundcode = $('td:nth-child(1)', tr).text().trim();
			$('td:nth-child(1)', tr).html('<a href="http://fund.eastmoney.com/'+fundcode+'.html" target="_blank">'+fundcode+'</a>');
			// var txt = $('td:nth-child(2)', tr).text();
			// $('td:nth-child(2)', tr).html('<a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse'+i+'" aria-expanded="false" aria-controls="#collapse'+i+'">'+txt+'</a>');
			// , data-toggle:"collapse", aria-expanded:"false", data-parent:"#accordion", aria-controls:"#collapse"+i
			$('td:nth-child(2)', tr).addClass('collapsed GLpointer').attr({href:"#collapse"+i, "data-toggle":"collapse"});
			$(tr).after('<tr id="collapse'+i+'" class="panel-collapse scrollPan collapse" role="tabpanel" aria-labelledby="heading'+i+'"><td colspan="9"><p style="width:90%"><span style="padding:12px;" ng-repeat="(k, v) in zhuti.'+fundcode+'"><a href="{{v.href}}" target="_blank" class="label label-primary">{{v.name}}</a></span><br/><p style="" id="bz'+i+'"></p></p></td></tr>');
			// 增加备注
			var postData = {
				url:'https://trade.1234567.com.cn/Investment/default?spm=S',
				type: 'POST',
				data: {
					_Last_ViewState : $("#_Last_ViewState").val(),
					__VIEWSTATE : $("#__VIEWSTATE").val(),
					__VIEWSTATEGENERATOR : $("#__VIEWSTATEGENERATOR").val(),
					__EVENTARGUMENT : $("#__EVENTARGUMENT").val()
				},
				// success : function(data){
				// 	console.log('success data:', data);
				// },
				error : function(){
					console.log('ajax error');
				}
			}
			var id2 = $('td:eq(8) a:eq(2)', tr).attr("id");
			// console.log("id2:", id2);
			var jhstr = $('td:eq(8) a:last', tr).attr('id').replace(/_/g, '$');
			postData.data.__EVENTTARGET = jhstr;
			postData.success = function(data){
				var bzstr = $(data).find("#ctl00_body_remark").text().trim();
				// console.log('bzstr:', bzstr, 'i:', i);
				$("#bz"+i).append($("#"+id2).clone(true));
				$("#bz"+i).append(" 备注："+bzstr);
			}
			df.next(function(){
				return $.ajax(postData);
			});


		});
		df.go();
		dfd.res();
	});
	function appController($scope){
		// function autoDoing(){
		// 	C.storage.get('autoDT', function(items){
		// 		if(items.autoDT){
		// 			if(items.autoDT.cal>0){
		// 				if(items.autoDT.is=='open'){
		// 					// $('.mctb.mt10 tbody:eq(2) tr[isoc=="close"]')

		// 					// console.log(items.autoDT);
		// 					C.storage.set({autoDT:{is:'open', cal:items.autoDT.cal--}});
		// 				}else if(items.autoDT.is=='close'){
		// 					$(".mctb.mt10 tbody:eq(2) tr[isoc='open']").eq( _.random(0, $scope.openSums) ).find("a:contains('暂停')");
		// 					// console.log(items.autoDT);
		// 					C.storage.set({autoDT:{is:'close', cal:items.autoDT.cal--}});
		// 				}

		// 			}else{
		// 				C.storage.set({autoDT:false});
		// 			}

		// 		}
		// 	});
		// }
		// // 运行一次
		// autoDoing();

		C.storage.ngBind($scope, 'ttpw', function(item){

		});

		// 控件处理
		$("#open10").click(function(){openFundDT(10);});
		$("#open30").click(function(){openFundDT(30);});
		$("#open50").click(function(){openFundDT(50);});
		$("#open100").click(function(){openFundDT(100);});
		$("#close1").click(function(){closeFundDT(3);});
		$("#close10").click(function(){closeFundDT(10);});
		$("#close30").click(function(){closeFundDT(30);});
		$("#close50").click(function(){closeFundDT(50);});
		$("#close100").click(function(){closeFundDT(100);});
		function autoDT(percent, swc){
			if(swc=='open'){
				var doNum = parseInt( ($scope.closeSums*percent)/100 );
				var qstr = ".mctb.mt10 tbody:eq(2) tr[isoc='close']:not(.deen)";
				var calsum = $scope.closeSums;

			}else if(swc=='close'){
				var doNum = parseInt( ($scope.openSums*percent)/100 );
				var qstr = ".mctb.mt10 tbody:eq(2) tr[isoc='open']:not(.deen)";
				var calsum = $scope.openSums;

			}else{
				alert("xxxx error");
				return false;
			}

			console.log('doNum:', doNum);
			console.log('$scope.openSums:', $scope.openSums);
			console.log('$scope.closeSums:', $scope.closeSums);
			if(!$scope.ttpw){
				alert("no pw");
				return false;
			}
			var trs = [];
			for (var i = 1; i <= doNum; i++) {
				var atr = $(qstr).eq( _.random(0, calsum-i) ).addClass('deen');
				if(atr.length>0){
					trs.push(atr);
					
				}else{
					break;
				}

			};

			var df = C.df();
			$(trs).each(function(i, tr){

				var postData = {
					url:'https://trade.1234567.com.cn/Investment/default?spm=S',
					type: 'POST',
					data: {
						_Last_ViewState : $("#_Last_ViewState").val(),
						__VIEWSTATE : $("#__VIEWSTATE").val(),
						__VIEWSTATEGENERATOR : $("#__VIEWSTATEGENERATOR").val(),
						__EVENTARGUMENT : $("#__EVENTARGUMENT").val()
					},
					error : function(){
						console.log('ajax error');
					}
				}
				var jhstr = $('td:eq(8) a:first', tr).attr('id').replace(/_/g, '$');
				postData.data.__EVENTTARGET = jhstr;
				
				df.next(function(){
					var df2 = df.dfd();
					postData.success = function(data){
						var formq = $(data).find('#aspnetForm').attr('action');

						var postData2 = {
							url:'https://trade.1234567.com.cn/Investment/'+formq,
							type: 'POST',
							data: {
								_Last_ViewState : $("#_Last_ViewState").val(),
								__VIEWSTATE : $("#__VIEWSTATE", data).val(),
								__VIEWSTATEGENERATOR : $("#__VIEWSTATEGENERATOR", data).val(),
								__EVENTARGUMENT : $("#__EVENTARGUMENT", data).val()
							},
							error : function(){
								console.log('ajax error');
								df2.res();
							}
						}
						postData2.data.__EVENTTARGET = 'ctl00$body$btnSp2';
						postData2.data.ctl00$body$txtPaypwd = $scope.ttpw;
						// console.log(postData2.data.ctl00$body$txtPaypwd);
						postData2.success = function(data){
							df2.res();
							console.log("do once");
						}
						$.ajax(postData2);
					}
					$.ajax(postData);
					return df2;
					// return $.ajax(postData);
				});

				// tr.css("background-color","red");

			});
			// };
			df.next(function(){
				setTimeout(function(){
				 location.reload();
				},5000);
			});
			df.go();

		}
		function openFundDT(percent){
			autoDT(percent, 'open');
			// var doNum = parseInt( ($scope.closeSums*percent)/100 );

			// console.log('doNum:', doNum);
			// console.log('$scope.openSums:', $scope.closeSums);
			// if(!$scope.ttpw){
			// 	alert("no pw");
			// 	return false;
			// }
			// var trs = [];
			// for (var i = 1; i <= doNum; i++) {
			// 	var atr = $(".mctb.mt10 tbody:eq(2) tr[isoc='close']:not(.deen)").eq( _.random(0, $scope.closeSums-i) ).addClass('deen');
			// 	if(atr.length>0){
			// 		trs.push(atr);
					
			// 	}else{
			// 		break;
			// 	}

			// };

			// var df = C.df();
			// $(trs).each(function(i, tr){

			// 	var postData = {
			// 		url:'https://trade.1234567.com.cn/Investment/default?spm=S',
			// 		type: 'POST',
			// 		data: {
			// 			_Last_ViewState : $("#_Last_ViewState").val(),
			// 			__VIEWSTATE : $("#__VIEWSTATE").val(),
			// 			__VIEWSTATEGENERATOR : $("#__VIEWSTATEGENERATOR").val(),
			// 			__EVENTARGUMENT : $("#__EVENTARGUMENT").val()
			// 		},
			// 		error : function(){
			// 			console.log('ajax error');
			// 		}
			// 	}
			// 	var jhstr = $('td:eq(8) a:first', tr).attr('id').replace(/_/g, '$');
			// 	postData.data.__EVENTTARGET = jhstr;
				
			// 	df.next(function(){
			// 		var df2 = df.dfd();
			// 		postData.success = function(data){
			// 			var formq = $(data).find('#aspnetForm').attr('action');

			// 				var postData2 = {
			// 					url:'https://trade.1234567.com.cn/Investment/'+formq,
			// 					type: 'POST',
			// 					data: {
			// 						_Last_ViewState : $("#_Last_ViewState").val(),
			// 						__VIEWSTATE : $("#__VIEWSTATE", data).val(),
			// 						__VIEWSTATEGENERATOR : $("#__VIEWSTATEGENERATOR", data).val(),
			// 						__EVENTARGUMENT : $("#__EVENTARGUMENT", data).val()
			// 					},
			// 					error : function(){
			// 						console.log('ajax error');
			// 						df2.res();
			// 					}
			// 				}
			// 				postData2.data.__EVENTTARGET = 'ctl00$body$btnSp2';
			// 				postData2.data.ctl00$body$txtPaypwd = $scope.ttpw;
			// 				// console.log(postData2.data.ctl00$body$txtPaypwd);
			// 				postData2.success = function(data){
			// 					df2.res();
			// 					console.log("do once");
			// 				}
			// 				$.ajax(postData2);
			// 		}
			// 		$.ajax(postData);
			// 		return df2;
			// 		// return $.ajax(postData);
			// 	});

			// 	// tr.css("background-color","red");

			// });
			// // };
			// df.next(function(){
			// 	setTimeout(function(){
			// 	 location.reload();
			// 	},5000);
			// });
			// df.go();




		}
		function closeFundDT(percent){
			autoDT(percent, 'close');
			// var doNum = parseInt( ($scope.openSums*percent)/100 );
			// console.log('doNum:', doNum);
			// console.log('$scope.openSums:', $scope.openSums);
			// // C.storage.set({autoDT:{is:'close', cal:doNum}}, function(){
			// // 	autoDoing();
				
			// // });
			// if(!$scope.ttpw){
			// 	alert("no pw");
			// 	return false;
			// }
			// var trs = [];
			// for (var i = 1; i <= doNum; i++) {
			// 	var atr = $(".mctb.mt10 tbody:eq(2) tr[isoc='open']:not(.deen)").eq( _.random(0, $scope.openSums-i) ).addClass('deen');
			// 	if(atr.length>0){
			// 		trs.push(atr);
					
			// 	}else{
			// 		break;
			// 	}

			// };
			// // console.log('trs:', trs);
			// var df = C.df();
			// // for (var i = 1; i <= doNum; i++) {
			// // $(".mctb.mt10 tbody:eq(2) tr[isoc='open']").each(function(i, tr){
			// $(trs).each(function(i, tr){


			// 	// var tr = $(".mctb.mt10 tbody:eq(2) tr[isoc='open']:not(.deen)").eq( _.random(0, $scope.openSums-i) );

			// 	var postData = {
			// 		url:'https://trade.1234567.com.cn/Investment/default?spm=S',
			// 		type: 'POST',
			// 		data: {
			// 			_Last_ViewState : $("#_Last_ViewState").val(),
			// 			__VIEWSTATE : $("#__VIEWSTATE").val(),
			// 			__VIEWSTATEGENERATOR : $("#__VIEWSTATEGENERATOR").val(),
			// 			__EVENTARGUMENT : $("#__EVENTARGUMENT").val()
			// 		},
			// 		error : function(){
			// 			console.log('ajax error');
			// 		}
			// 	}
			// 	var jhstr = $('td:eq(8) a:first', tr).attr('id').replace(/_/g, '$');
			// 	// console.log(jhstr);
			// 	// var jhstr = $('td:eq(8) a:first', tr).attr('id');
			// 	// if(jhstr){
			// 	// 	jhstr = jhstr.replace(/_/g, '$');
			// 	// }else{
			// 	// 	return false;
			// 	// }
			// 	postData.data.__EVENTTARGET = jhstr;
				
			// 	// postData.success = function(data){
			// 	// 	var formq = $(data).find('#aspnetForm').attr('action');
			// 	// 	// console.log(formq);
			// 	// 	console.log('formq:', formq, 'i:', i);
			// 	// 	// df2.res();
			// 	// }
			// 	df.next(function(){
			// 		var df2 = df.dfd();
			// 		postData.success = function(data){
			// 			var formq = $(data).find('#aspnetForm').attr('action');
			// 			// console.log('formq:', formq, 'i:', i);

			// 				var postData2 = {
			// 					url:'https://trade.1234567.com.cn/Investment/'+formq,
			// 					type: 'POST',
			// 					data: {
			// 						_Last_ViewState : $("#_Last_ViewState").val(),
			// 						__VIEWSTATE : $("#__VIEWSTATE", data).val(),
			// 						__VIEWSTATEGENERATOR : $("#__VIEWSTATEGENERATOR", data).val(),
			// 						__EVENTARGUMENT : $("#__EVENTARGUMENT", data).val()
			// 					},
			// 					error : function(){
			// 						console.log('ajax error');
			// 						df2.res();
			// 					}
			// 				}
			// 				postData2.data.__EVENTTARGET = 'ctl00$body$btnSp2';
			// 				postData2.data.ctl00$body$txtPaypwd = $scope.ttpw;
			// 				// console.log(postData2.data.ctl00$body$txtPaypwd);
			// 				postData2.success = function(data){
			// 					df2.res();
			// 					console.log("do once");
			// 				}
			// 				$.ajax(postData2);
			// 		}
			// 		$.ajax(postData);
			// 		return df2;
			// 		// return $.ajax(postData);
			// 	});

			// 	// tr.css("background-color","red");

			// });
			// // };
			// df.next(function(){
			// 	setTimeout(function(){
			// 	 location.reload();
			// 	},5000);
			// });
			// df.go();
			
		}

		$scope.setting = {
		}
		// 周期金额计算
		function calr(period, money){
			var _money = 0;
			switch (period){
				case "每月":
					_money = money.cheng(1);
					break;
				case "每两周":
					_money = money.cheng(2);
					break;
				case "每周":
					_money = money.cheng(4);
					break;
				default:
			}
			return _money;
		}
		$scope.allSums = 0;
		$scope.allSumsAll = 0;

		$scope.openSums = 0;
		$scope.closeSums = 0;

		// 主题处理
		C.storage.ngXBind($scope, 'zhuti', function(item){
			// console.log("item:", item);
			var temscope = {};
			$('.mctb.mt10 tbody:eq(2) tr:gt(0)').each(function(i, tr){
				//统计总投资
				var piro = $('td:nth-child(5)', tr).text().trim();
				var sum = $('td:nth-child(4)', tr).text().trim();
				var ispouse = $('td:nth-child(8)', tr).text().trim();
				sum = sum.jia(0);
				if(sum>0 && ispouse=="正常" ){
					$scope.allSums += calr(piro, sum);
					$scope.openSums++;
					$scope.allSumsAll += calr(piro, sum);
					$(tr).attr('isoc', 'open');
				}else if(ispouse=="暂停"){
					$scope.closeSums++;
					$scope.allSumsAll += calr(piro, sum);
					$(tr).attr('isoc', 'close');
				}

				var fundcode = $(this).find('td:eq(0)').text().trim();
				temscope[fundcode] = [];
				_.each(item.f, function(val, index){
					if(val.fcodes.indexOf(fundcode) != -1){
						var obj = {
							name : val.name,
							href : 'http://fund.eastmoney.com/daogou/' +'?fundcode='+fundcode+ '#dt0;ftgp;rs;sd;ed;pr;cp;rt;rk;se;nx;sc1y;stdesc;pi1;pn1000;zfdiy;shlist;tp'+val.id
						}
						temscope[fundcode].push(obj);
					}
				});
				
			});
			return temscope;
		});






	}




}();