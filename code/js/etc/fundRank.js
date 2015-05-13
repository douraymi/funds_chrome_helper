// 获取数据

module.exports = function(){
	console.log("fundRank");
	// C.storage.ngBind($scope, "today_dt", function(item){
	// 	var today = new Date();
	// 	if(item && item.date===today.toDateString()){
	// 	}else{
	// 		var newItem = {	today_dt:{	date : today.toDateString(), ranking : {
	// 			shumi : {},
	// 			tt : {}
	// 		} }	};
	// 		C.storage.remove('today_dt');
	// 		C.storage.set(newItem);
	// 	}
	// }, function(changes){
	// });
	
	// 外端每日数据处理
	var shumiUrl = {
		day : 'http://market.fund123.cn/result/index/gs-ft1-sya-syb-syc-syd-sye-syf-syg-syh-nv-ljnv-sh-fc-fm-pjh-pjz-i-ic-o15-p',
		month: 'http://market.fund123.cn/result/index/gs-ft1-sya-syb-syc-syd-sye-syf-syg-syh-nv-ljnv-sh-fc-fm-pjh-pjz-i-ic-o16-p'
	};
	var ttUrl = {
		day : 'http://fund.eastmoney.com/api/FundGuide.aspx?dt=0&ft=gp&sd=&ed=&sc=r&st=desc&pi=1&pn=20&zf=diy&sh=list&rnd='+_.random(0, 1),
		week: 'http://fund.eastmoney.com/api/FundGuide.aspx?dt=0&ft=gp&sd=&ed=&sc=z&st=desc&pi=1&pn=20&zf=diy&sh=list&rnd='+_.random(0, 1),
		month: 'http://fund.eastmoney.com/api/FundGuide.aspx?dt=0&ft=gp&sd=&ed=&sc=1y&st=desc&pi=1&pn=20&zf=diy&sh=list&rnd='+_.random(0, 1)
	};

	var obj = {shumi:{}, tt:{}};
	// shumi处理程序
	function shumiGet(shumiObj){
		var _df = C.df();
		_.each(shumiUrl, function(val, key){
			shumiObj[key] = [];
			_df.next(C.html, val, function(data, df){
				var _data = data.replace('http://gg.fund123.cn/UploadFiles/20150302/ymq.gif', '');
				$(_data).find('#resutlTbody tr').each(function(idx, elm){
					var _elm = $(elm).find("td");
					var _fund = {
						sort 			: _elm.eq(1).text().trim(),
						fundcode 	: _elm.eq(2).find("a:eq(0)").text().trim(),
						fundname 	: _elm.eq(3).find("a:eq(0)").text().trim()
					};
					switch (key){
						case 'day':
							_fund['rate'] = _elm.eq(6).text().trim();
							break;
						case 'month':
							_fund['rate'] = _elm.eq(7).text().trim();
							break;
					}
					shumiObj[key].push(_fund);
				});
				df.resolve();
			});
		});
		_df.next(function(){console.log(obj);});
		_df.go();
	}
	shumiGet(obj);



}()