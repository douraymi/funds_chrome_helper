// https://trade.fund123.cn/home/agreementquery/
// for this url page

module.exports = function(){
	console.log("dingtou");
	C.css('../css/part/fund123_dingtou.css');
	C.ng('html/part/fund123_dingtou.html', appController);

	function appController($scope){
		$scope.setting = {
			buyMonthlyAmount 	: 83000,
			exchangeDaily 		: 30000,
			shumiShowX 				: false,
			ttShowX 					: false
		}
		// $scope.BOTpw = false;
		// scope密码
		C.storage.ngBind($scope, 'BOTpw', function(item){

		});
		$scope.BOT = false;
		$scope.BOTranObj = false;
		$scope.BOTkai = {};
		$scope.BOTguan = {};
		// 处理排名数据
		var doRank = require('../etc/fundRank')($scope);

		// localStorage方式统计当天定投情况
		C.storage.ngBind($scope, "today_zanting", function(item){
			var today = new Date();
			if(item && item.date===today.toDateString()){
			}else{
				var newItem = {	today_zanting:{	date : today.toDateString(), zantingAmount : 0}	};
				C.storage.remove('today_zanting');
				C.storage.set(newItem);
			}
		}, function(changes){
		});

		// 终止A链接事件
		function endDt(){
			var _url = new URI($(this).attr('href'));
			_url.hasQuery('xyh', function(_xyh){
				M.connect('dingtou', _xyh+"_dtend", function(tunnel){
					var _isReload = true;
					tunnel.onMsg({
						BOT : {
							noReload : function(msg){
								_isReload = msg.body;
							}
						}
					});
					tunnel.onClose.addListener(function(){
						if(_isReload){
							M.connect("dingtou", "BOT", function(tnBOT){
								// tnBOT.onMsg({
								// 	BOT : {
								// 		stop : function(msg){
								// 			$scope.BOT = false;
								// 		}
								// 	}
								// });
								tnBOT.onClose.addListener(function(){
									var buyAmountNow_tmp = $scope.buyAmountNow;
									reloadList(function(){
										// 记录当天新增暂停量
										C.storage.get('today_zanting', function(items){
											var _ztAmount = items.today_zanting.zantingAmount.jia(buyAmountNow_tmp.jian($scope.buyAmountNow));
											var newItem = {	today_zanting:{	date : items.today_zanting.date, zantingAmount : _ztAmount}	};
											C.storage.set(newItem, function(){
												if($scope.isCloseWindow){
													window.close();
												}
											});
										});
									});

									tnBOT.close();
								});
							});

						}else{
							M.connect("dingtou", "BOT", function(tnBOT){
								tnBOT.onClose.addListener(function(){
									tnBOT.close();
								});
							});
						}
						tunnel.close();
					});
				});

			});
		}
		// 更改A链接事件
		function changeDt(){
			var _fundcode = $(this).parent(":eq(0)").parent(":eq(0)").find("td:eq(0)").text().trim();
			M.connect("dingtou", _fundcode+"_dtgo", function(tunnel){
				var doRankData;
				tunnel.onMsg({
					xxx : {
						xxx : function(msg){
							doRankData = msg.body;
						}
					}
				});
				tunnel.onClose.addListener(function(){
					var buyAmountNow_tmp = $scope.buyAmountNow;
					reloadList(function(){
						if(doRankData != undefined && $scope.buyAmountNow>buyAmountNow_tmp ){
							doRank(doRankData.jj, doRankData.pp, doRankData.key);
						}
						// console.log("in 111111111");
						// $(".rectitle li[status='']").trigger("myclick.girafeee");
						if($scope.randomContine=="status1"){
							$(".rectitle li[status=1]").trigger("click");
							randomSelect("status1");
						}else if($scope.randomContine=="status0"){
							$(".rectitle li[status=0]").trigger("click");
							randomSelect("status0");
						}
					});
					tunnel.close();
				});
			});
		}
		// 恢复A链接事件
		function addDt(){
			console.log("in addDt");
			var _url = new URI($(this).attr('href'));
			_url.hasQuery('xyh', function(_xyh){
				console.log("_xyh@@:", _xyh);
				var doRankData;
				if($scope.BOT == "恢复"){
					console.log("in 恢复 1");
					M.connect("dingtou", _xyh+"_dtgo", function(tunnel){
						console.log("in 恢复 2");
						tunnel.send({type:"BOT", code:"BOT", body:$scope.BOTpw});
						tunnel.onMsg({
							xxx : {
								xxx : function(msg){
									console.log("msg3:", msg);
									doRankData = msg.body;
								}
							},
							BOT : {
								pw : function(msg){
									console.log("msg4:", msg);
									C.storage.set({BOTpw: msg.body});
									// $scope.BOTpw = msg.body;
								}
							}
						});
					});
					M.connect("dingtou", "BOT", function(tnBOT){
						console.log("xx1:");
						tnBOT.onMsg({
							BOT : {
								stop : function(msg){
									$scope.BOT = false;
									$scope.BOTranObj = false;
								}
							}
						});
						tnBOT.onClose.addListener(function(){
							var buyAmountNow_tmp = $scope.buyAmountNow;
							reloadList(function(){
								if($scope.buyAmountNow>$scope.setting.buyMonthlyAmount){
									$scope.BOT = false;
									$scope.BOTranObj = false;
									console.log("end buyMonthlyAmount!");
								}
								if(doRankData != undefined && $scope.buyAmountNow>buyAmountNow_tmp ){
									doRank(doRankData.jj, doRankData.pp, doRankData.key, function(){
										if($scope.BOTranObj != false){
											$scope.BOTranObj.click();
										}
									});
								}else{
									if($scope.BOTranObj != false){
										$scope.BOTranObj.click();
									}
								}
								if($scope.randomContine=="status1"){
									$(".rectitle li[status=1]").trigger("click");
									randomSelect("status1");
								}
							});
							tnBOT.close();
						});
					});

				}else{
					M.connect("dingtou", _xyh+"_dtgo", function(tunnel){
						console.log("xx2:");
						// var doRankData;
						tunnel.onMsg({
							xxx : {
								xxx : function(msg){
									doRankData = msg.body;
								}
							}
						});
						tunnel.onClose.addListener(function(){
							var buyAmountNow_tmp = $scope.buyAmountNow;
							reloadList(function(){
								if(doRankData != undefined && $scope.buyAmountNow>buyAmountNow_tmp ){
									doRank(doRankData.jj, doRankData.pp, doRankData.key);
								}
								if($scope.randomContine=="status1"){
									$(".rectitle li[status=1]").trigger("click");
									randomSelect("status1");
								}
							});
							tunnel.close();
						});
					});

				}
			});
		}
		// 暂停A链接事件
		function zanting(){
			console.log("in zanting");
			var _url = new URI($(this).attr('href'));
			_url.hasQuery('xyh', function(_xyh){
				console.log('_xyh:', _xyh);
				if($scope.BOT == "暂停"){
					M.connect("dingtou", _xyh+"_dtzt", function(tunnel){
						tunnel.send({type:"BOT", code:"BOT", body:$scope.BOTpw});
						tunnel.onMsg({
							BOT : {
								pw : function(msg){
									C.storage.set({BOTpw: msg.body});
									// $scope.BOTpw = msg.body;
								}
							}
						});
					});

					M.connect("dingtou", "BOT", function(tnBOT){
						tnBOT.onMsg({
							BOT : {
								stop : function(msg){
									$scope.BOT = false;
								}
							}
						});
						tnBOT.onClose.addListener(function(){
							var buyAmountNow_tmp = $scope.buyAmountNow;
							reloadList(function(){
								// 记录当天新增暂停量
								C.storage.get('today_zanting', function(items){
									console.log("za:", items.today_zanting.zantingAmount, " ed:", $scope.setting.exchangeDaily);
									if(items.today_zanting.zantingAmount>$scope.setting.exchangeDaily){
										$scope.BOT = false;
										console.log("end exchangeDaily!");
									}
									var _ztAmount = items.today_zanting.zantingAmount.jia(buyAmountNow_tmp.jian($scope.buyAmountNow));
									var newItem = {	today_zanting:{	date : items.today_zanting.date, zantingAmount : _ztAmount}	};
									C.storage.set(newItem);
									if($scope.randomContine=="status0"){
										$(".rectitle li[status=0]").trigger("click");
										randomSelect("status0");
									}
								});
							});
							tnBOT.close();
						});
					});
					
				}else{
					M.connect("dingtou", _xyh+"_dtzt", function(tunnel){
						tunnel.onClose.addListener(function(){
							var buyAmountNow_tmp = $scope.buyAmountNow;
							reloadList(function(){
								// 记录当天新增暂停量
								C.storage.get('today_zanting', function(items){
									var _ztAmount = items.today_zanting.zantingAmount.jia(buyAmountNow_tmp.jian($scope.buyAmountNow));
									var newItem = {	today_zanting:{	date : items.today_zanting.date, zantingAmount : _ztAmount}	};
									C.storage.set(newItem);
									if($scope.randomContine=="status0"){
										$(".rectitle li[status=0]").trigger("click");
										randomSelect("status0");
									}
								});
							});
							tunnel.close();
						});
					});

				}
			});
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
		// 随机选择一行定投操作对象 status0:正常 status1:暂停 status2:终止
		function randomSelect(status){
			$(".NewTable30 tbody tr").removeClass("hight_light");
			var _length = $(".NewTable30 tbody tr[status="+status+"]").length;
			var _random = _.random(0, _length-1);
			var _trObj = $(".NewTable30 tbody tr[status="+status+"]:eq("+_random+")").addClass("hight_light").insertBefore($(".NewTable30 tbody tr").eq(0));
			// var _trObj = $(".NewTable30 tbody tr[status="+status+"]:eq("+_random+")").addClass("hight_light").remove().insertBefore($(".NewTable30 tbody tr").eq(0));
			fixA(_trObj);
			if($scope.BOT != false){
				if($scope.BOT == '暂停' && $scope.BOTguan.proc != undefined){
					if($scope.BOTguan.ori - $scope.BOTguan.proc > $scope.buyAmountNow){
						$scope.BOT = false;
						$scope.BOTguan = {};
						return;
					}
				}else if($scope.BOT == '恢复' && $scope.BOTkai.proc != undefined){
					if($scope.BOTkai.ori + $scope.BOTkai.proc < $scope.buyAmountNow){
						$scope.BOT = false;
						$scope.BOTkai = {};
						return;
					}
				}
				_trObj.find("a:contains('"+$scope.BOT+"')").eq(0).click();
				var _url = thisHost+_trObj.find("a:contains('"+$scope.BOT+"')").eq(0).attr("href");
				C.newTab({url:_url, active:false});
				// window.open(_trObj.find("a:contains('"+$scope.BOT+"')").eq(0).attr("href"), 'new', 'alwaysLowered=yes, z-look=no');
			}else{
				$scope.BOTguan = {};
				$scope.BOTkai = {};
			}

		}
		// 没有remove的东西直接insertBefore就不用fix ???
		function fixA(trObj){
			trObj.find("a:contains('暂停')").unbind().click(zanting);
			trObj.find("a:contains('恢复')").unbind().click(addDt);
			trObj.find("a:contains('更改')").unbind().click(changeDt);
			trObj.find("a:contains('终止')").unbind().click(endDt);
			trObj.find("td:eq(0)").unbind().click(function(){
				window.open('http://fund.eastmoney.com/'+$(this).text().trim()+'.html');
			});
		}
		// 原网站的刷新脚本
		function reloadList(callback){
			C.df().next(function(){
				$('#return-list').html('<div class="alert alert-info" role="alert"><strong>加载中!</strong><span> 请稍等 ... </span></div>');
				// 加Math.random()是为了防止缓存
				var _df = $.Deferred();
		    $('#return-list').load('/Controls/ListRations?r='+ Math.random(), {}, function () {
		      var total = 0, normal = 0, pause = 0, hang = 0;
		      $('#return-list table>tbody>tr').each(function (i, tr) {
		        var statustxt = $.trim($('td:nth-child(11)', tr).text());
		        if (statustxt == '终止') {
		          hang += 1;
		        } else if (statustxt == '暂停') {
		          pause += 1;
		        } else if (statustxt == '正常') {
		          normal += 1;
		        }
		      });
		      total = normal + pause + hang;
		      $('b:nth-child(2)', '#recordareatongji').text(total);
		      $('b:nth-child(4)', '#recordareatongji').text(normal);
		      $('b:nth-child(6)', '#recordareatongji').text(pause);
		      $('b:nth-child(8)', '#recordareatongji').text(hang);
		      _df.resolve();
		    });
		    return _df;
			}).next(function(){
				callback();
			}).go();
		}

		// clean function
		function clean(trObjAry){
			// $scope.BOT == "终止";
			var _df = C.df();
			var _length = trObjAry.length;
			trObjAry.each(function(i, tr){
				// console.log("_length:", _length);
				var _isEnd = i==_length-1?true:false;
				_df.next(function(){
					// console.log("_isEnd:", _isEnd);
					// console.log("tr:", tr);
					var trigger = $.Deferred();
					var _url = thisHost + $(tr).eq(0).find("a:contains('终止')").eq(0).click().attr("href");
					// console.log("_url:", _url);
					var uri = new URI(_url);
					uri.hasQuery("xyh", function(xyh){
						M.connect('dingtou', xyh+"cleanEnd", function(tn){
							tn.send({type:'BOT', code:'isEnd', body:_isEnd});
							tn.send({type:"BOT", code:"BOT", body:$scope.BOTpw});
							tn.onMsg({
								BOT : {
									pw : function(msg){
										C.storage.set({BOTpw: msg.body});
										// $scope.BOTpw = msg.body;
									}
									// ,pwDone : function(msg){
									// 	tn.send({type:'BOT', code:'isEnd', body:_isEnd});
									// }
								} 
							});
							tn.onClose.addListener(function(){
								trigger.resolve();
								tn.close();
							});
						});

					});
					C.newTab({url:_url, active:false});
					return trigger;
				});
				
			});
			// 懒得修改了 直接windowclose 不用上面终止函数去处理了(但是今天暂停数就没算了，以后看必要再搞)
			_df.next(function(){$scope.isCloseWindow=true;}).go();
		}

		// 处理scope	
		// 客服控件
		$scope.kefu = function(){
			$("body>.shumi-kefu").css('display')=='none'? $("body>.shumi-kefu").css('display', 'block') : $("body>.shumi-kefu").css('display', 'none');
		}
		$scope.resetRanking = function(){
			doRank();
		}
		// BOT随机暂停定投控件
		// $scope.BOTcount = 0;
		$scope.BOTdingTouPause = function(_amount){
			$scope.BOT = '暂停';
			if(_amount != undefined){
				$scope.BOTguan.ori = $scope.buyAmountNow;
				$scope.BOTguan.proc = _amount;
			}
			$scope.dingTouPause();
		}
		// 随机暂停定投控件
		$scope.dingTouPause = function(){
			$scope.randomContine = "status0";
			$(".rectitle li[status=0]").trigger("click");
			randomSelect("status0");

		}
		// 随机开启定投控件
		$scope.BOTdingTouGo = function(_amount){
			$scope.BOT = '恢复';
			if(_amount != undefined){
				$scope.BOTkai.ori = $scope.buyAmountNow;
				$scope.BOTkai.proc = _amount;
			}
			$scope.dingTouGo();
		}
		// 随机开启定投控件
		$scope.dingTouGo = function(){
			$scope.randomContine = "status1";
			$(".rectitle li[status=1]").trigger("click");
			randomSelect("status1");			
		}
		// 定投button
		$scope.toDt = function(fundcode, jj, pp, key){
			$scope.randomContine = '';
			// console.log(jj, pp, key);
			var thsCodeTr = ".NewTable30 tbody tr[status='status1']:contains('"+fundcode+"')";
			var _len = $(thsCodeTr).length;
			if(_len>0){
				$(".rectitle li:contains('暂停')").trigger("click");
				$(".NewTable30 tbody tr").removeClass("hight_light");
				$(thsCodeTr).each(function(i){
					var _trObj = $(this).addClass("hight_light").insertBefore($(".NewTable30 tbody tr").eq(0));
					fixA(_trObj);
				});
				if($scope.BOT == "恢复"){
					console.log("fff1:");
					$(thsCodeTr).eq(0).find("a:contains('恢复')").eq(0).click();
					var _url = thisHost+$(thsCodeTr).eq(0).find("a:contains('恢复')").eq(0).attr("href");
					C.newTab({url:_url, active:false});
					// window.open($(thsCodeTr).eq(0).find("a:contains('恢复')").eq(0).attr("href"));
				}
			}else{
				var doRankData;
				var _url = 'https://trade.fund123.cn/Trade/RegularInvestment/ai?fundCode='+fundcode;
				if($scope.BOT == "恢复"){
					M.connect("dingtou", "newfundBOT", function(tunnel){
						tunnel.send({type:"BOT", code:"BOT"});
						// tunnel.send({type:"BOT", code:"BOT", body:$scope.BOTpw});
						// tunnel.onMsg({
						// 	BOT : {
						// 		pw : function(msg){
						// 			C.storage.set({BOTpw: msg.body});
						//			// $scope.BOTpw = msg.body;
						// 		}
						// 	}
						// });
					});
					M.connect("dingtou", fundcode+"_dtgo", function(tunnel){
						tunnel.send({type:"BOT", code:"BOT", body:$scope.BOTpw});
						tunnel.onMsg({
							xxx : {
								xxx : function(msg){
									doRankData = msg.body;
								}
							},
							BOT : {
								pw : function(msg){
									C.storage.set({BOTpw: msg.body});
									// $scope.BOTpw = msg.body;
								}
							}
						});
					});
					M.connect("dingtou", "BOT", function(tnBOT){
						tnBOT.onMsg({
							BOT : {
								stop : function(msg){
									$scope.BOT = false;
									$scope.BOTranObj = false;
								}
							}
						});
						tnBOT.onClose.addListener(function(){
							var buyAmountNow_tmp = $scope.buyAmountNow;
							reloadList(function(){
								if($scope.buyAmountNow>$scope.setting.buyMonthlyAmount){
									$scope.BOT = false;
									$scope.BOTranObj = false;
									console.log("end buyMonthlyAmount!");
								}
								if(doRankData != undefined && $scope.buyAmountNow>buyAmountNow_tmp ){
									doRank(doRankData.jj, doRankData.pp, doRankData.key, function(){
										if($scope.BOTranObj != false){
											$scope.BOTranObj.click();
										}
									});
								}else{
									if($scope.BOTranObj != false){
										$scope.BOTranObj.click();
									}
								}
							});
							tnBOT.close();
						});
					});
					C.newTab({url:_url, active:false});
				}else{
					M.connect("dingtou", fundcode+"_dtgo", function(tunnel){
						tunnel.onMsg({
							xxx : {
								xxx : function(msg){
									doRankData = msg.body;
								}
							}
						});
						tunnel.onClose.addListener(function(){
							var buyAmountNow_tmp = $scope.buyAmountNow;
							reloadList(function(){
								if(doRankData != undefined && $scope.buyAmountNow>buyAmountNow_tmp ){
									doRank(doRankData.jj, doRankData.pp, doRankData.key);
								}
							});
							tunnel.close();
						});
					});
					window.open(_url, '_blank');
				}
			}

			M.connect("dingtou_2", fundcode+"_today_dt", function(tunnel){
				console.log("in dingtou_2_today_dt");
				tunnel.send({type:'xxx', code:'xxx', body:{jj:jj, pp:pp, key:key}});
				tunnel.onClose.addListener(function(){
					tunnel.close();
				});
			});

		}

		// 处理DOM
		// 用插件的reload替换原网页的
		// $("#return-list").bind("DOMNodeInserted", function(elm){
		// 	$(".rectitle li[status='']").trigger("myclick.girafeee");
		// 	// reloadList(function(){
		// 	// 	$(".rectitle li[status='']").trigger("click");
		// 	// });
		// });
		$("#return-list").bind("DOMNodeInserted", function(elm){
			if(elm.target.className == "NewTable30"){
				// return;
				function newSort(){
					var isTotal = parseInt($('b:nth-child(2)', '#recordareatongji').text().replace(/[^0-9\.-]+/g,""));
					console.log('isTotal:', isTotal);
					if(isTotal>0){
						// table排序处理
						$(".NewTable30 thead th:eq(3)").css("width", "60");
						$(".NewTable30 thead th:eq(8)").css("width", "60");
						$(".NewTable30 thead th:eq(9)").css("width", "60");
						$(".NewTable30 thead th:eq(10)").css("width", "50");
						$(".NewTable30 thead th:eq(12)").css("width", "50");
						// $(".NewTable30 thead th:eq(9)").text("单投金额").after("<th width='80'>基金总投</th>");
						$(".NewTable30 thead th:eq(9)").text("单投金额");
						$(".NewTable30 thead th:eq(12)").after("<th width='80'>基金总投</th>");
						// $(".NewTable30 tbody tr td:nth-child(10)").after("<td></td>");
						$(".NewTable30 tbody tr td:nth-child(13)").after("<td></td>");
						var ozAry = {};	// 总投入金额临时对象
						$.each($(".NewTable30 tbody tr:visible"), function(i,v) {
							// 总投入金额一期处理
							var _fcode = $(this).find("td:eq(0)").text().trim();
							var order_zong = $(this).find("td:eq(9)").text().trim().replace(/[^0-9\.-]+/g,"");
							ozAry[_fcode] = ozAry[_fcode] ? ozAry[_fcode].jia(order_zong) : order_zong;
						});
						$.each($(".NewTable30 tbody tr:visible"), function(i,v) {
							var _fcode = $(this).find("td:eq(0)").text().trim();
							// 总投入金额二期处理
							$(this).find("td:eq(9)").attr('_order', ozAry[_fcode]);
							$(this).find("td:eq(13)").html("<span style='color:darkgoldenrod'>"+ozAry[_fcode]+"</span>");
							// .append("<span style='color:darkgoldenrod'> /"+ozAry[_fcode]+"</span>");
							// 定投金额
							var order_dtje = $(this).find("td:eq(3)").text().trim().replace(/[^0-9\.-]+/g,"");
							$(this).find("td:eq(3)").attr('_order', order_dtje);
							// 定投日期
							var order_dtrq = $(this).find("td:eq(5)").text().trim().replace(/[^0-9\.-]+/g,"");
							if(order_dtrq>0){
								$(this).find("td:eq(5)").attr('_order', parseInt(order_dtrq));
							}else{
								var _orderVal = 1000;
								var _pre = $(this).find("td:eq(4)").text().trim();
								if(_pre == "每周"){
									_orderVal = 2000;
								}
								switch($(this).find("td:eq(5)").text().trim()){
									case '星期一':
										_orderVal += 100;
										break;
									case '星期二':
										_orderVal += 200;
										break;
									case '星期三':
										_orderVal += 300;
										break;
									case '星期四':
										_orderVal += 400;
										break;
									case '星期五':
										_orderVal += 500;
										break;
								}
								$(this).find("td:eq(5)").attr('_order', _orderVal);
							}
						});
						$(".NewTable30 > thead > tr >th:eq(1)").attr("datatype","text");	// 名称
						$(".NewTable30 > thead > tr >th:eq(3)").attr("datatype","int");	// 定投金额
						$(".NewTable30 > thead > tr >th:eq(5)").attr("datatype","int");	// 定投金额
						$(".NewTable30 > thead > tr >th:eq(9)").attr("datatype","int");	// 定投金额
						var sortRows = [1, 3, 5, 9];
						C.tableSort(".NewTable30 thead th", sortRows);

						// 统计金额
						$scope.buyAmountNow = 0;	// 统计现月投资
						$(".NewTable30 tbody tr[status=status0]").each(function(i){
							var _period = $(this).find("td:eq(4)").text().trim();
							var _money = $(this).find("td:eq(3)").text().trim().replace(/[^0-9\.-]+/g,"");
							// $scope.buyAmountNow += calr(_period, _money);
							$scope.buyAmountNow = $scope.buyAmountNow.jia(calr(_period, _money));
						});
						// 增加天天链接
						$(".NewTable30 tbody tr:visible td:nth-child(1)").addClass('ttLink').click(function(){
							window.open('http://fund.eastmoney.com/'+$(this).text().trim()+'.html');
						});

						// 暂停,恢复,更改 A链接处理
						$(".NewTable30 tbody tr[status=status0] a:contains('暂停')").click(zanting);
						$(".NewTable30 tbody tr[status=status1] a:contains('恢复')").click(addDt);
						$(".NewTable30 tbody tr a:contains('更改')").click(changeDt);
						$(".NewTable30 tbody tr a:contains('终止')").click(endDt);
						$(".rectitle li[status='']").trigger("myclick.girafeee");

						//clean
				    var _url = new URI();
				    if(_url.hasQuery("clean", true) ){
				    	_url.hasQuery("fundcode", function(fundcode){
				    		if(fundcode != undefined){
				    			var _trObj = $(".NewTable30 tbody tr[status!=status2]:contains('"+fundcode+"')").addClass("hight_light").insertBefore($(".NewTable30 tbody tr").eq(0));
				    			if(_trObj.length>0){
				    				clean(_trObj);
				    			}
				    			// console.log(_trObj);
				    		}
				    	})
				    }
						$scope.$apply();

					}else{
						setTimeout(function(){
							newSort();
						}, 500);
					}
				}
				newSort();
			}
		})
		// 改变collapse高度以scroll
		$('.scrollPan').on('shown.bs.collapse', function () {
		  $(this).height($(window).height().chu(2.2));
		})
		$(".ranBt").click(function(){
			var _str = "#"+$(this).attr("tag")+" tr:not(.nodt):not(.doneToday)";
			$(_str).eq(_.random(0, $(_str).length-1)).find("button:eq(0)").click();
		});
		$(".ranBOT").click(function(){
			$scope.BOTranObj = $(this);
			$scope.BOT = "恢复";
			var _str = "#"+$(this).attr("tag")+" tr:not(.nodt):not(.doneToday)";
			var len = $(_str).length;
			if(len>0){
				$(_str).eq(_.random(0, len-1)).find("button:eq(0)").click();
			}else{
				$scope.BOT = false;
				$scope.BOTranObj = false;
			}
		});
		//订单状态过滤
		// 原生页面的事件删除不掉 这里只处理部分
    $('.ration_status[status=""]').bind("myclick.girafeee", function () {
      var tbody = $('#return-list').find('tbody');
      $('tr',tbody).show();
        // // douraymi 在全部标签中隐去终止的
      $('tr[status="status2"]', tbody).hide();
      $('tr.nodata', tbody).hide();
      if ($('tr:visible', tbody).length == 0) {
        $('tr.nodata', tbody).show();
      }
    });

	}



}();