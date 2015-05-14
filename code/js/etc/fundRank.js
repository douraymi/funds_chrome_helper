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
		var shumiDf = C.df();
		_.each(shumiUrl, function(val, key){
			shumiObj[key] = [];
			shumiDf.next(C.html, val, function(data, _df){
				data = data.replace('http://gg.fund123.cn/UploadFiles/20150302/ymq.gif', '');
				$(data).find('#resutlTbody tr').each(function(idx, elm){
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
				_df.resolve();
			});
		});
		var defer = $.Deferred();
		shumiDf.next(function(){defer.resolve();}).go();
		return defer;
	}
	
	// tt处理程序
	function ttGet(ttObj){
		var ttDf = C.df();
		_.each(ttUrl, function(val, key){
			ttObj[key] = [];
			ttDf.next(C.html, val, function(data, _df){
				var jData = JSON.parse(data.substr(14));
				jData = jData.datas;
				_.each(jData, function(v, k){
					var vAry = v.split(",");
					var _fund = {
						sort 			: k,
						fundcode 	: vAry[0],
						fundname 	: vAry[1]
					};
					switch (key){
						case 'day':
							_fund['rate'] = C.fxNum(vAry[17], 2);
							break;
						case 'week':
							_fund['rate'] = C.fxNum(vAry[5], 2);
							break;
						case 'month':
							_fund['rate'] = C.fxNum(vAry[6], 2);
							break;
					}
					ttObj[key].push(_fund);
				});
				_df.resolve();
			});
		});
		var defer = $.Deferred();
		ttDf.next(function(){defer.resolve();}).go();
		return defer;
	}

	C.df()
	.next(
		function(){
			return shumiGet(obj.shumi);
		}, 
		function(){
			return ttGet(obj.tt);
		}
	)
	.next(
		function(){
			function checkdtOk(fundObj, loopDf){
				return C.html('http://fund.fund123.cn/html/'+fundObj.fundcode+'/index.html', function(data, _df){
					var checkDf = loopDf? loopDf: _df;
					data = data.replace('http://hqqd.fund123.cn/ev/big_pt/000988.png', '');
					data = data.replace('http://hqqd.fund123.cn/fm/single/000988%e4%b8%81%e6%9d%b0%e4%ba%ba.png', '');
					data = data.replace('http://inc.fund123.cn/companys/manager/%e4%b8%81%e6%9d%b0%e4%ba%ba.jpg', '');
					var eq = $(data).find("div.zhetwo span:eq(2)").text().trim();
					if(eq=="开放"){
						fundObj.dtOk = true;
						checkDf.resolve();
					}else if(eq=="暂停"){
						fundObj.dtOk = false;
						checkDf.resolve();
					}else{
						checkdtOk(fundObj, checkDf);
					}
				});
			}
			var ehDf = C.df();
			_.each(obj, function(vi){
				_.each(vi, function(vj){
					_.each(vj, function(vk){
						ehDf.next(checkdtOk, vk);
					});
				});
			});
			var defer = $.Deferred();
			ehDf.next(function(){defer.resolve();}).go();
			return defer;
		}
	)
	.next(
		function(){
			console.log(obj);
		}
	)
	.go();

}()