$("#return-list").bind("DOMNodeInserted", function(elm){
	if(elm.target.className == "NewTable30"){
		var fundDetailFunc = (function(){
			$(".NewTable30").addClass('j-custom'); //定义table标识符（样式用到）
		    $.each($(".NewTable30 tbody tr"), function(i,v) {
		    	var orgstr = $(this).find("td:eq(5)").text().trim();
				var str = orgstr.replace(/[^0-9]/ig,"");
				if(str == ""){
					str = 100;
				}
				$(this).find("td:eq(-5)").attr('_order',str);
			});
			$(".NewTable30 > thead > tr >th:eq(1)").attr("datatype","text");
			$(".NewTable30 > thead > tr >th:eq(5)").attr("datatype","int");

			//指定排序数据列
		    var sortRows = [1,5];
			sortRowsFunc($(".NewTable30 thead th"), sortRows);
			tableSort($('.NewTable30'));

			//页面其他预处理
			var sumdingtou = 0;
			$(".NewTable30 tbody tr[status='status0']").each(function(i){
				sumdingtou += parseFloat($(this).find("td:eq(3)").text());
			});
			$("body").append("<div class='randomtoolleft'><div><table><tbody id='market'></tbody></table></div><div class='ttmarket'><table><tbody id='ttmarket1'></tbody></table></div><div class='delbutton'>月投资："+sumdingtou+" <button id='del5'>随机停止项</button></div><div class='ttmarket'><table><tbody id='ttmarket2'></tbody></table></div></div>");

			$(".rectitle li:contains('正常')").trigger("click");

			//增加小工具
			//随机选择准备暂停基金
			var GetRandomNum = function (Min,Max){   
			      var Range = Max - Min;   
			      var Rand = Math.random();   
			      return(Min + Math.round(Rand * Range));   
			    }
			var getRandomDingTou = function (count){
				$(".NewTable30 tbody tr").removeClass("bg randomDel randomSam");
				var rowNums = $(".NewTable30 tbody tr[status='status0']").size();
				for(i=0;i<count;){
					var randomDel = GetRandomNum(i, rowNums-1);
					i++;
					var $delObj = $(".NewTable30 tbody tr[status='status0']").eq(randomDel).addClass("randomDel").remove().insertBefore($(".NewTable30 tbody tr").eq(0));
					$delObj.find("a:contains('暂停')").click(function(){
						$(this).closest(".randomDel").removeClass("randomDel");
					});
				}
			}
			$("#del5").click( function(){ getRandomDingTou(5); });

			//检查已暂停同名基金并排序
			var getStopedSameName = function(stockCode){
				$(".rectitle li:contains('暂停')").trigger("click");
				$(".NewTable30 tbody tr").removeClass("bg randomDel randomSam");
				$(".NewTable30 tbody tr[status='status1']:contains('"+stockCode+"')").each(function(i){
					$(this).addClass("randomSam").remove().insertBefore($(".NewTable30 tbody tr").eq(0));
				});
			}

			//获取数米基金排名页面内容
			// var htmlobj = $.ajax({ url: "http://market.fund123.cn/result/index/gs-ft1-sya-syb-syc-syd-sye-syf-syg-syh-nv-ljnv-sh-fc-fm-pjh-pjz-i-ic-o15-p", type:"GET", async:false, success: function(){}});
			// var fixhtml = $(htmlobj.responseText).find("#myTable1 tbody tr:lt(10)");
			// $.each(fixhtml, function(i, v){
			// 	$(this).children().each( function(ii, vv){
			// 		if($.inArray(ii, [3, 6, 12]) < 0){
			// 			// fixhtml.eq(i).children().eq(ii).remove();
			// 			$(this).remove();
			// 		}
			// 	});
			// });
			// fixhtml.find("a:contains('定投')").click(function(){
			// 	$(this).closest("tr").css("background","rgb(169, 234, 88)");
			// });
			// $("#market").append(fixhtml);

			//获取天天基金排名数据
			//日排名
			var ttmarket1 = $.ajax({ url: "http://fund.eastmoney.com/api/FundGuide.aspx?dt=0&ft=gp&sd=&ed=&sc=r&st=desc&pi=1&pn=20&zf=diy&sh=list&rnd=0.511186889372766", async:false, success: function(){} });
			ttmarket1 = ttmarket1.responseText;
			ttmarket1 = JSON.parse(ttmarket1.substr(14));
			ttmarket1 = ttmarket1.datas;
			for(i=0; i<8; i++){
				var ary = ttmarket1[i].split(",");
				$("#ttmarket1").append("<tr stockc='"+ary[0]+"'><td><a target='_blank' href='http://fund.fund123.cn/html/"+ary[0]+"/Index.html'>"+ary[1]+"</a></td><td>日"+parseFloat(ary[17]).toFixed(2)+"%</td><td><a target='_blank' href='https://trade.fund123.cn/GoTrade/新增定投?fundcode="+ary[0]+"'>定投 </a></td><td><a href='javascript:'> 定位</a></td></tr>");
			}
			$("#ttmarket1").find("a:contains('定投')").click(function(){
				$(this).closest("tr").css("background","rgb(169, 234, 88)");
			});
			$("#ttmarket1").find("a:contains('定位')").click(function(){
				getStopedSameName($(this).parent(":eq(0)").parent(":eq(0)").attr("stockc"));
				
			});
			//周排名
			var ttmarket2 = $.ajax({ url: "http://fund.eastmoney.com/api/FundGuide.aspx?dt=0&ft=gp&sd=&ed=&sc=z&st=desc&pi=1&pn=20&zf=diy&sh=list&rnd=0.07104309764690697", async:false, success: function(){} });
			ttmarket2 = ttmarket2.responseText;
			ttmarket2 = JSON.parse(ttmarket2.substr(14));
			ttmarket2 = ttmarket2.datas;
			for(i=0; i<8; i++){
				var ary = ttmarket2[i].split(",");
				$("#ttmarket2").append("<tr stockc='"+ary[0]+"'><td><a target='_blank' href='http://fund.fund123.cn/html/"+ary[0]+"/Index.html'>"+ary[1]+"</a></td><td>周"+parseFloat(ary[5]).toFixed(2)+"%</td><td><a target='_blank' href='https://trade.fund123.cn/GoTrade/新增定投?fundcode="+ary[0]+"'>定投 </a></td><td><a href='javascript:'> 定位</a></td></tr>");
			}
			$("#ttmarket2").find("a:contains('定投')").click(function(){
				$(this).closest("tr").css("background","rgb(169, 234, 88)");
			});
			$("#ttmarket2").find("a:contains('定位')").click(function(){
				getStopedSameName($(this).parent(":eq(0)").parent(":eq(0)").attr("stockc"));
				
			});

			//next

		})();
	}
})

