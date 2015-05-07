// http://my.fund123.cn/RealFundDefault.aspx
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
		$scope.buyAmountNow = 0;	// 统计现月投资
		// 预处理
		var connector = M.connect("dingtou");
		$("#return-list").bind("DOMNodeInserted", function(elm){
			if(elm.target.className == "NewTable30"){
				// 统计金额
				$(".NewTable30 tbody tr[status=status0]").each(function(i){
					var _period = $(this).find("td:eq(4)").text().trim();
					var _money = $(this).find("td:eq(3)").text().trim().replace(/[^0-9\.]+/g,"");
					$scope.buyAmountNow += calr(_period, _money);
				});

				// 暂停A链接处理
				$(".NewTable30 tbody tr[status=status0] a:contains('暂停')").click(function(){
					var _url = new URI($(this).attr('href'));
					_url.hasQuery('xyh', function(_xyh){
						connector.tunnel(_xyh, function(tunnel){
							var omObj = {
								confirm : {
									zanting : function(msg){
										if(msg.body.isOk){
											console.log("do once");
											// reloadList(function(){
											// 	randomSelect("status0");
												
											// });
										}
									}
								}
							};
							tunnel.onMsg(omObj);
						});
					});
				});


				$scope.$apply();
			}
		})

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
			$(".NewTable30 tbody tr[status="+status+"]").eq(_random).addClass("hight_light").remove().insertBefore($(".NewTable30 tbody tr").eq(0));
		}
		
		// 暂停定投控件
		$scope.dingTouPause = function(){
			// $(".rectitle li:contains('正常')").trigger("click");
			$(".rectitle li[status=0]").trigger("click");
			randomSelect("status0");
		}

		// 客服控件
		$scope.kefu = function(){
			$("body>.shumi-kefu").css('display')=='none'? $("body>.shumi-kefu").css('display', 'block') : $("body>.shumi-kefu").css('display', 'none');
		}

		// 原网站的刷新脚本
		function reloadList(callback){
			$('#return-list').html('<div class="alert alert-info" role="alert"><strong>加载中!</strong><span> 请稍等 ... </span></div>');
			C.html('https://trade.fund123.cn/home/agreementquery/', function(data){
				var _b = data.indexOf( '/Controls/ListRations?r=');
				var _e = data.indexOf( '\',{}, function () {');
				var _r = data.slice(_b+24, _e);
		    $('#return-list').load('/Controls/ListRations?r='+_r, {}, function () {
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
			});
		}

		// localStorage方式统计当天定投情况
		C.storage.ngBind($scope, "todayDT", function(item){
			// C.storage.clear();
			var today = new Date();
			if(item && item.date===today.toDateString()){
				// // redeemTr渲染
				// _.each(item, function(parentid){
				// 	$("#TR_"+parentid).removeClass('hight_light').addClass('today_is_redeemed');
				// });
			}else{
				var newItem = {
					todayDT:{
						date 						: today.toDateString(),
						zantingAmount 	: 0
					}
				};
				C.storage.remove('todayDT');
				C.storage.set(newItem);
			}
		}, function(changes){
			// console.log("changes:", changes);
		});


	}


}();