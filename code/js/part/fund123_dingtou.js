// https://trade.fund123.cn/home/agreementquery/
// for this url page

module.exports = function(){
	console.log("dingtou");
	C.css('../css/part/fund123_dingtou.css');
	C.ng('html/part/fund123_dingtou.html', appController);

	function appController($scope){
		$scope.setting = {
			buyMonthlyAmount 	: 43000,
			exchangeDaily 		: 8000,
			shumiShowX 				: false,
			ttShowX 					: false
		}
		$scope.BOT = false;
		$scope.BOTranObj = false;
		$scope.BOTpw = false;
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
			var _url = new URI($(this).attr('href'));
			_url.hasQuery('xyh', function(_xyh){
				// console.log("_xyh:", _xyh);
				var doRankData;
				if($scope.BOT == "恢复"){
					M.connect("dingtou", _xyh+"_dtgo", function(tunnel){
						tunnel.send({type:"BOT", code:"BOT", body:$scope.BOTpw});
						tunnel.onMsg({
							xxx : {
								xxx : function(msg){
									// console.log("xxx", msg);
									doRankData = msg.body;
								}
							},
							BOT : {
								pw : function(msg){
									$scope.BOTpw = msg.body;
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
								if($scope.buyAmountNow>$scope.buyMonthlyAmount){
									$scope.BOT = false;
								}
								if(doRankData != undefined && $scope.buyAmountNow>buyAmountNow_tmp ){
									doRank(doRankData.jj, doRankData.pp, doRankData.key);
								}
								if($scope.BOTranObj != false){
									$scope.BOTranObj.click();
								}else if($scope.randomContine=="status1"){
									$(".rectitle li[status=1]").trigger("click");
									randomSelect("status1");
								}
							});
							tnBOT.close();
						});
					});

				}else{
					M.connect("dingtou", _xyh+"_dtgo", function(tunnel){
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
								// console.log("in 222222222");
								// $(".rectitle li[status='']").trigger("myclick.girafeee");
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
									$scope.BOTpw = msg.body;
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
									if(items.today_zanting.zantingAmount>$scope.exchangeDaily){
										$scope.BOT = false;
									}
									var _ztAmount = items.today_zanting.zantingAmount.jia(buyAmountNow_tmp.jian($scope.buyAmountNow));
									var newItem = {	today_zanting:{	date : items.today_zanting.date, zantingAmount : _ztAmount}	};
									C.storage.set(newItem);
								});
								if($scope.randomContine=="status0"){
									$(".rectitle li[status=0]").trigger("click");
									randomSelect("status0");
								}
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
								});
								if($scope.randomContine=="status0"){
									$(".rectitle li[status=0]").trigger("click");
									randomSelect("status0");
								}
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
			var _trObj = $(".NewTable30 tbody tr[status="+status+"]:eq("+_random+")").addClass("hight_light").remove().insertBefore($(".NewTable30 tbody tr").eq(0));
			fixA(_trObj);

			if($scope.BOT != false){
				_trObj.find("a:contains('"+$scope.BOT+"')").eq(0).click();
				window.open(_trObj.find("a:contains('"+$scope.BOT+"')").eq(0).attr("href"));
			}

		}
		function fixA(trObj){
			trObj.find("a:contains('暂停')").click(zanting);
			trObj.find("a:contains('恢复')").click(addDt);
			trObj.find("a:contains('更改')").click(changeDt);
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
		$scope.BOTdingTouPause = function(){
			$scope.BOT = '暂停';
			$scope.dingTouPause();
		}
		// 随机暂停定投控件
		$scope.dingTouPause = function(){
			$scope.randomContine = "status0";
			$(".rectitle li[status=0]").trigger("click");
			randomSelect("status0");

		}
		// 随机开启定投控件
		$scope.BOTdingTouGo = function(){
			$scope.BOT = '恢复';
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
					var _trObj = $(this).addClass("hight_light").remove().insertBefore($(".NewTable30 tbody tr").eq(0));
					fixA(_trObj);
				});
				if($scope.BOT == "恢复"){
					// console.log($(thsCodeTr).eq(0).find("a:contains('恢复')").eq(0));
					$(thsCodeTr).eq(0).find("a:contains('恢复')").eq(0).click();
					window.open($(thsCodeTr).eq(0).find("a:contains('恢复')").eq(0).attr("href"));
				}
			}else{
				var doRankData;
				if($scope.BOT == "恢复"){
					M.connect("dingtou", "newfundBOT", function(tunnel){
						tunnel.send({type:"BOT", code:"BOT"});
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
									$scope.BOTpw = msg.body;
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
								if($scope.buyAmountNow>$scope.buyMonthlyAmount){
									$scope.BOT = false;
								}
								if(doRankData != undefined && $scope.buyAmountNow>buyAmountNow_tmp ){
									doRank(doRankData.jj, doRankData.pp, doRankData.key);
								}
								if($scope.BOTranObj != false){
									$scope.BOTranObj.click();
								}
							});
							tnBOT.close();
						});
					});

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
					
				}
				var _url = 'https://trade.fund123.cn/Trade/RegularInvestment/ai?fundCode='+fundcode;
				window.open(_url, '_blank');
			}

			M.connect("dingtou_2", fundcode+"_today_dt", function(tunnel){
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
		// reload列表预处理
		function doWhenReloadList(){

		}
		$("#return-list").bind("DOMNodeInserted", function(elm){
			if(elm.target.className == "NewTable30"){
				// 统计金额
				$scope.buyAmountNow = 0;	// 统计现月投资
				$(".NewTable30 tbody tr[status=status0]").each(function(i){
					var _period = $(this).find("td:eq(4)").text().trim();
					var _money = $(this).find("td:eq(3)").text().trim().replace(/[^0-9\.-]+/g,"");
					// $scope.buyAmountNow += calr(_period, _money);
					$scope.buyAmountNow = $scope.buyAmountNow.jia(calr(_period, _money));
				});

				// 暂停A链接处理
				$(".NewTable30 tbody tr[status=status0] a:contains('暂停')").click(zanting);
				$(".NewTable30 tbody tr[status=status1] a:contains('恢复')").click(addDt);
				$(".NewTable30 tbody tr a:contains('更改')").click(changeDt);
				// console.log("in DOMNodeInserted");
				$(".rectitle li[status='']").trigger("myclick.girafeee");
				$scope.$apply();
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
			$(_str).eq(_.random(0, $(_str).length-1)).find("button:eq(0)").click();
		});
		//订单状态过滤
		// 原生页面的事件删除不掉 这里只处理部分
    // $('.ration_status[status=""]').unbind("myclick.girafeee");
    $('.ration_status[status=""]').bind("myclick.girafeee", function () {
    	// console.log("in myclick.girafeee");
      // var status = $(this).attr('status');
      var tbody = $('#return-list').find('tbody');
      // if (status == "") {
        $('tr',tbody).show();
        // // douraymi 在全部标签中隐去终止的
        $('tr[status="status2"]', tbody).hide();
      // }
      // else {
      //   $('tr', tbody).hide();
      //   var showList = $('tr[status="status' + status + '"]', tbody);
      //   showList.show();
      // }
      $('tr.nodata', tbody).hide();
      if ($('tr:visible', tbody).length == 0) {
        $('tr.nodata', tbody).show();
      }
    });


	}



}();