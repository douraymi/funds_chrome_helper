// https://trade.fund123.cn/home/agreementquery/
// for this url page

module.exports = function(){
	console.log("dingtou");
	C.css('../css/part/fund123_dingtou.css');
	C.ng('html/part/fund123_dingtou.html', appController);

	function appController($scope){
		$scope.setting = {
			buyMonthlyAmount 	: 20000,
			exchangeDaily 		: 1000
		}
		// 处理排名数据
		require('../etc/fundRank')($scope);		
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

		// 恢复A链接事件
		function addDt(){
			console.log("in addDt");
			var _url = new URI($(this).attr('href'));
			_url.hasQuery('xyh', function(_xyh){
				console.log("_xyh:", _xyh);
				M.connect("dingtou", _xyh+"_dtgo", function(tunnel){
					tunnel.onClose.addListener(function(){
						reloadList(function(){
							$(".rectitle li[status='']").trigger("click");
							if($scope.randomContine=="status1"){
								$(".rectitle li[status=1]").trigger("click");
								randomSelect("status1");
							}
						});
						tunnel.close();
					});
				});
			});
		}
		// 暂停A链接事件
		function zanting(){
			console.log("in zanting");
			var _url = new URI($(this).attr('href'));
			_url.hasQuery('xyh', function(_xyh){
				M.connect("dingtou", _xyh+"_dtzt", function(tunnel){
					tunnel.onClose.addListener(function(){
						var buyAmountNow_tmp = $scope.buyAmountNow;
						reloadList(function(){
							// 记录当天新增暂停量
							C.storage.get('today_zanting', function(items){
								items.today_zanting.zantingAmount += (buyAmountNow_tmp-$scope.buyAmountNow);
								var newItem = {	today_zanting:{	date : items.today_zanting.date, zantingAmount : items.today_zanting.zantingAmount}	};
								C.storage.set(newItem);
							});
							$(".rectitle li[status='']").trigger("click");
							if($scope.randomContine=="status0"){
								$(".rectitle li[status=0]").trigger("click");
								randomSelect("status0");
							}
						});
						tunnel.close();
					});
				});
			});
		}
		// 周期金额计算
		function calr(period, money){
			var _money = 0;
			switch (period){
				case "每月":
					_money = money*1;
					break;
				case "每两周":
					_money = money*2;
					break;
				case "每周":
					_money = money*4;
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
		}
		function fixA(trObj){
			trObj.find("a:contains('暂停')").click(zanting);
			trObj.find("a:contains('恢复')").click(addDt);
			trObj.find("a:contains('更改')").click(addDt);
		}
		// 原网站的刷新脚本
		function reloadList(callback){
			$('#return-list').html('<div class="alert alert-info" role="alert"><strong>加载中!</strong><span> 请稍等 ... </span></div>');
			// 加Math.random()是为了防止缓存
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
	      callback();
	    });
	    //订单状态过滤
	    $('.ration_status').click(function () {
	      var status = $(this).attr('status');
	      var tbody = $('#return-list').find('tbody');
	      if (status == "") {
	        $('tr',tbody).show();
	      }
	      else {
	        $('tr', tbody).hide();
	        var showList = $('tr[status="status' + status + '"]', tbody);
	        showList.show();
	      }
	      $('tr.nodata', tbody).hide();
	      if ($('tr:visible', tbody).length == 0) {
	        $('tr.nodata', tbody).show();
	      }
	    });
		}

		// 处理scope	
		// 客服控件
		$scope.kefu = function(){
			$("body>.shumi-kefu").css('display')=='none'? $("body>.shumi-kefu").css('display', 'block') : $("body>.shumi-kefu").css('display', 'none');
		}
		// 随机开启定投控件
		$scope.dingTouGo = function(){
			$scope.randomContine = "status1";
			// $(".rectitle li:contains('正常')").trigger("click");
			$(".rectitle li[status=1]").trigger("click");
			randomSelect("status1");			
		}
		// 随机暂停定投控件
		$scope.dingTouPause = function(){
			$scope.randomContine = "status0";
			// $(".rectitle li:contains('正常')").trigger("click");
			$(".rectitle li[status=0]").trigger("click");
			randomSelect("status0");
		}
		// 定投button
		$scope.toDt = function(fundcode){
			var thsCodeTr = ".NewTable30 tbody tr[status='status1']:contains('"+fundcode+"')";
			var _len = $(thsCodeTr).length;
			if(_len>0){
				$(".rectitle li:contains('暂停')").trigger("click");
				$(".NewTable30 tbody tr").removeClass("hight_light");
				$(thsCodeTr).each(function(i){
					var _trObj = $(this).addClass("hight_light").remove().insertBefore($(".NewTable30 tbody tr").eq(0));
					fixA(_trObj);
				});
			}else{
				M.connect("dingtou", fundcode+"_dtgo", function(tunnel){
					tunnel.onClose.addListener(function(){
						console.log("from toDt");
						reloadList(function(){
							$(".rectitle li[status='']").trigger("click");
						});
						tunnel.close();
					});
				});
				var _url = 'https://trade.fund123.cn/Trade/RegularInvestment/ai?fundCode='+fundcode;
				window.open(_url, '_blank');
			}

		}

		// 处理DOM
		// reload列表预处理
		$("#return-list").bind("DOMNodeInserted", function(elm){
			if(elm.target.className == "NewTable30"){
				// 统计金额
				$scope.buyAmountNow = 0;	// 统计现月投资
				$(".NewTable30 tbody tr[status=status0]").each(function(i){
					var _period = $(this).find("td:eq(4)").text().trim();
					var _money = $(this).find("td:eq(3)").text().trim().replace(/[^0-9\.]+/g,"");
					$scope.buyAmountNow += calr(_period, _money);
				});

				// 暂停A链接处理
				$(".NewTable30 tbody tr[status=status0] a:contains('暂停')").click(zanting);
				$(".NewTable30 tbody tr[status=status1] a:contains('恢复')").click(addDt);
				$(".NewTable30 tbody tr a:contains('更改')").click(addDt);

				$scope.$apply();
			}
		})
		// 改变collapse高度以scroll
		$('.scrollPan').on('shown.bs.collapse', function () {
		  $(this).height($(window).height()/2.2);
		})

	}



}();