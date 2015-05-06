// http://my.fund123.cn/RealFundDefault.aspx
// for this url page

module.exports = function(){
	console.log("dingtou");
	C.css('../css/part/fund123_dingtou.css');
	C.ng('html/part/fund123_dingtou.html', appController);

	function appController($scope){
		// 客服控件
		$scope.kefu = function(){
			$("body>.shumi-kefu").css('display')=='none'? $("body>.shumi-kefu").css('display', 'block') : $("body>.shumi-kefu").css('display', 'none');
		}

		$scope.test = function(){
			C.html('https://trade.fund123.cn/home/agreementquery/', true, function(data){
				// console.log(data);
				$('#return-list').html(data);

				// $.ajax({ url: 'https://trade.fund123.cn/home/agreementquery/', async:true, success: function(data2, textStatus){
				// 		$('#return-list').html(data2);
				// } });

			});
			// $.ajax({ url: 'https://trade.fund123.cn/home/agreementquery/', async:true, success: function(data, textStatus){
			// 		// $("html").append(data);
			// 		// $("html").append('<div id="newBody"></div>');
			// 		$('#return-list').html(data);
			// } });
		}

	}

	// 原网站的刷新脚本
	function reloadList(){
		$('#return-list').html('<div class="alert alert-info" role="alert"><strong>加载中!</strong><span> 请稍等 ... </span></div>');

		$.ajax({ url: 'https://trade.fund123.cn/home/agreementquery/', async:true, success: function(data, textStatus){
				$('#return-list').html(data);
		} });

    // $('#return-list').load('/Controls/ListRations?r=1957807638',{}, function () {
    //   var total = 0, normal = 0, pause = 0, hang = 0;
    //   $('#return-list table>tbody>tr').each(function (i, tr) {
    //     var statustxt = $.trim($('td:nth-child(11)', tr).text());
    //     if (statustxt == '终止') {
    //       hang += 1;
    //     } else if (statustxt == '暂停') {
    //       pause += 1;
    //     } else if (statustxt == '正常') {
    //       normal += 1;
    //     }
    //   });
    //   total = normal + pause + hang;
    //   $('b:nth-child(2)', '#recordareatongji').text(total);
    //   $('b:nth-child(4)', '#recordareatongji').text(normal);
    //   $('b:nth-child(6)', '#recordareatongji').text(pause);
    //   $('b:nth-child(8)', '#recordareatongji').text(hang);
    // });
    // //订单状态过滤
    // $('.ration_status').click(function () {
    //   var status = $(this).attr('status');
    //   var tbody = $('#return-list').find('tbody');
    //   if (status == "") {
    //     $('tr',tbody).show();
    //   }
    //   else {
    //     $('tr', tbody).hide();
    //     var showList = $('tr[status="status' + status + '"]', tbody);
    //     showList.show();
    //   }
    //   $('tr.nodata', tbody).hide();
    //   if ($('tr:visible', tbody).length == 0) {
    //     $('tr.nodata', tbody).show();
    //   }
    // });
	}	

}();