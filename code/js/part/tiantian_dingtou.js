// https://trade.1234567.com.cn/Investment/default?spm=S

module.exports = function(){
	console.log("tiantian_dingtou");
	C.css('css/part/tiantian_dingtou.css');
	// C.ng('html/part/tiantian_dingtou.html', appController);

	C.ngGbl(appController, function(dfd){
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
					// __EVENTTARGET : jhstr,
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
		$scope.setting = {
		}
		// 主题处理
		C.storage.ngXBind($scope, 'zhuti', function(item){
			// console.log("item:", item);
			var temscope = {};
			$('.mctb.mt10 tbody:eq(2) tr:gt(0)').each(function(i, tr){
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