// https://trade.1234567.com.cn/Investment/default?spm=S

module.exports = function(){
	console.log("tiantian_dingtou");
	C.css('css/part/tiantian_dingtou.css');
	// C.ng('html/part/tiantian_dingtou.html', appController);
	
	// C.storage.get('ttpw', function(items){
	// 	if(items['ttpw']){

	// 	}
	// });
	// console.log('window.thisHost:', window.thisHost);
	var thshost = window.thisHost;

	C.ngGbl(appController, function(dfd){
		$('.Investmenttitle:eq(2)').append(' <span style="color: red;">总定投/月：{{allSums}}</span>/<span style="color: blue;">{{allSumsAll}}</span> 			<span class="oprate"> 			<a style="background-color: LightSteelBlue;" id=open10>o10</a> 			<a style="background-color: LightSteelBlue;" id=open30>o30</a> 			<a style="background-color: LightSteelBlue;" id=open50>o50</a> 			<a style="background-color: LightSteelBlue;" id=open100>o100</a> 			</span> 			<span class="oprate"> 			<a style="background-color: Khaki;" id=close1>c1</a> 			<a style="background-color: Khaki;" id=close10>c10</a> 			<a style="background-color: Khaki;" id=close30>c30</a> 			<a style="background-color: Khaki;" id=close50>c50</a> 			<a style="background-color: Khaki;" id=close100>c100</a> 			</span>');

		// 重新排序 先排序再做后续处理
		$('.mctb.mt10 tbody:eq(2) tr:eq(0)').find("td:eq(0)").attr('_order', 1);
		C.tableSortOnce('table.mctb.mt10:eq(2)', 1, 'int', true);
		// 修改链接 增加内容
		var df = C.df();
		var lenCount = $('.mctb.mt10 tbody:eq(2) tr:gt(0)').length;
		console.log(lenCount);
		$('.mctb.mt10 tbody:eq(2) tr:gt(0)').each(function(i, tr){
			var fundcode = $('td:nth-child(1)', tr).text().trim();
			// 16.04.23
			$(tr).attr("id", "sex"+fundcode);

			$('td:nth-child(1)', tr).html('<a href="http://fund.eastmoney.com/'+fundcode+'.html" target="_blank">'+fundcode+'</a>');
			$('td:nth-child(2)', tr).addClass('collapsed GLpointer').attr({href:"#collapse"+i, "data-toggle":"collapse"});
			$(tr).after('<tr id="collapse'+i+'" class="panel-collapse scrollPan collapse" role="tabpanel" aria-labelledby="heading'+i+'"><td colspan="9"><div style="float: left;"><div style="float: left;padding:12px;" ng-repeat="(k, v) in zhuti.'+fundcode+'"><a href="{{v.href}}" target="_blank" class="label label-primary">{{v.name}}</a></div></div><br/><div style="width: 100%;" id="bz'+i+'"></div></td></tr>');

			// 16.04.23
			$("#bz"+i).append(' 操作：<a style="color: #06b;" ng-click="openAll(\''+fundcode+'\')">打开所有</a> 	<a style="color: #06b;" ng-click="closeAll(\''+fundcode+'\')">关闭所有</a>  <a style="color: #06b;" ng-click="shutDownAll(\''+fundcode+'\')">清除所有</a>');

			// 增加备注
			// 先关掉 太多访问了
			// var postData = {
			// 	url: thshost+'/Investment/default?spm=S',
			// 	type: 'POST',
			// 	data: {
			// 		_Last_ViewState : $("#_Last_ViewState").val(),
			// 		__VIEWSTATE : $("#__VIEWSTATE").val(),
			// 		__VIEWSTATEGENERATOR : $("#__VIEWSTATEGENERATOR").val(),
			// 		__EVENTARGUMENT : $("#__EVENTARGUMENT").val()
			// 	},
			// 	error : function(){
			// 		console.log('ajax error');
			// 	}
			// }
			// var id2 = $('td:eq(8) a:eq(2)', tr).attr("id");
			// // console.log("id2:", id2);
			// var jhstr = $('td:eq(8) a:last', tr).attr('id').replace(/_/g, '$');
			// postData.data.__EVENTTARGET = jhstr;
			// postData.success = function(data){
			// 	var bzstr = $(data).find("#ctl00_body_remark").text().trim();
			// 	// console.log('bzstr:', bzstr, 'i:', i);
			// 	$("#bz"+i).append($("#"+id2).clone(true));
			// 	$("#bz"+i).append(" 备注："+bzstr);

			// 	// 16.04.23
			// 	// if(--lenCount <=0){
			// 	// 	// 如果想快点看其他 就不等这步控制
			// 	// 	console.log("ngXBind done");
			// 	// 	dfd.res();
			// 	// }
			// }
			// df.next(function(){
			// 	return $.ajax(postData);
			// });


		});
		df.go();
		// 上面如果开了这里就要禁止 dfd.res();
		dfd.res();

	});
	function appController($scope){
		//16.04.23
		$scope.shutDownAll = function(fundcode){
			// var iso = swc=='open'?'open':'close';
			var qstr = ".mctb.mt10 tbody:eq(2) tr[id='sex"+fundcode+"']:not(.deen)";
			// console.log();
			var df = C.df();
			$(qstr).each(function(index, tr) {
				var postData = {
					url: thshost+'/Investment/default?spm=S',
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
				// 第四个a
				var jhstr = $('td:eq(8) a:eq(3)', tr).attr('id').replace(/_/g, '$');
				postData.data.__EVENTTARGET = jhstr;
				
				df.next(function(){
					var df2 = df.dfd();
					postData.success = function(data){
						var formq = $(data).find('#aspnetForm').attr('action');

						var postData2 = {
							url: thshost+'/Investment/'+formq,
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
				},1000);
			});
			df.go();

		}
		$scope.openAll = function(fundcode){
			doByCode(fundcode, 'close');
		}
		$scope.closeAll = function(fundcode){
			doByCode(fundcode, 'open');
		}
		function doByCode(fundcode, swc){
			var iso = swc=='open'?'open':'close';
			var qstr = ".mctb.mt10 tbody:eq(2) tr[isoc='"+iso+"'][id='sex"+fundcode+"']:not(.deen)";
			// console.log();
			var df = C.df();
			$(qstr).each(function(index, tr) {
				var postData = {
					url: thshost+'/Investment/default?spm=S',
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
				// 开启和暂停都是一样的
				var jhstr = $('td:eq(8) a:first', tr).attr('id').replace(/_/g, '$');
				postData.data.__EVENTTARGET = jhstr;
				
				df.next(function(){
					var df2 = df.dfd();
					postData.success = function(data){
						var formq = $(data).find('#aspnetForm').attr('action');

						var postData2 = {
							url: thshost+'/Investment/'+formq,
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
				},1000);
			});
			df.go();

		}


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
					url: thshost+'/Investment/default?spm=S',
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
							url: thshost+'/Investment/'+formq,
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

		}
		function closeFundDT(percent){
			autoDT(percent, 'close');
			
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
		

		// 主题处理
		C.storage.ngXBind($scope, 'zhuti', function(item){
			// console.log("item:", item);
			$scope.allSums = 0;
			$scope.allSumsAll = 0;

			$scope.openSums = 0;
			$scope.closeSums = 0;
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