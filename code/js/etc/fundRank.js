// 获取数据

module.exports = function($scope){
	console.log("fundRank");
	if(!$scope) throw "need $scope!";
	
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

	var fakeImg = C.chromeUrl('/images/favicon.png');
	// shumi处理程序
	function shumiGet(shumiObj){
		var shumiDf = C.df();
		_.each(shumiUrl, function(val, key){
			shumiObj[key] = [];
			shumiDf.next(C.html, val, function(data, _df){
				data = data.replace(/http:\/\/\S+(\.(png|jpg|jpeg|gif))/g, fakeImg);
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
						sort 			: k+1,
						fundcode 	: vAry[0],
						fundname 	: vAry[1]
					};
					switch (key){
						case 'day':
							// _fund['rate'] = C.fxNum(vAry[17], 2);
							_fund['rate'] = vAry[17].rnd(2);
							break;
						case 'week':
							// _fund['rate'] = C.fxNum(vAry[5], 2);
							_fund['rate'] = vAry[5].rnd(2);
							break;
						case 'month':
							// _fund['rate'] = C.fxNum(vAry[6], 2);
							_fund['rate'] = vAry[6].rnd(2);
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

	// ngbind处理程序
	function todayDtNgBind(rankingData, callback){
		C.df()
		.next(
			function(){
				return shumiGet(rankingData.shumi);
			}, 
			function(){
				return ttGet(rankingData.tt);
			}
		)
		.next(
			function(){
				// var fundState;
				// function checkdtOk(fundObj, loopDf, loopCount){
					// return C.html('http://fund.fund123.cn/html/'+fundObj.fundcode+'/index.html', function(data, _df){
					// return C.html('http://fund.fund123.cn/open/Index.aspx?code='+fundObj.fundcode, function(data, _df){
					// 	var checkDf = loopDf? loopDf: _df;
					// 	var checkCount = loopCount? loopCount+1 : 1;
					// 	// if(data!=undefined && data.indexOf("<b>定投：</b><span>暂停</span>")>-1){
					// 	if(data!=undefined && data.indexOf('<b>定投：</b><span class="CanDingTou">暂停</span>')>-1){
					// 		fundObj.dtOk = false;
					// 		checkDf.resolve();
					// 	// }else if(data!=undefined && data.indexOf("<b>定投：</b><span>开放</span>")>-1){
					// 	}else if(data!=undefined && data.indexOf('<b>定投：</b><span class="CanDingTou">开放</span>')>-1){
					// 		fundObj.dtOk = true;
					// 		checkDf.resolve();
					// 	}else if(checkCount<5){
					// 		setTimeout(function(){
					// 			console.log("checkdtOk redo : ", fundObj.fundcode, " ", checkCount);
					// 			checkdtOk(fundObj, checkDf, checkCount);
					// 		}, 1200);
					// 	}else{
					// 		fundObj.dtOk = false;
					// 		checkDf.resolve();
					// 		console.log("checkdtOk error checkCount: ", fundObj.fundcode, " data:", data);
					// 	}
					// });
				// };
				var ehDf = C.df();
				function checkdtOk(fundObj){
					var _df = C.df().dfd();
          // console.log('in (1) fundObj.fundcode: ', fundObj.fundcode);
					for (var i = 0; i < fundState.length; i++) {
            var item = fundState[i];
            if (item["fundCode"] == fundObj.fundcode) {
            	// console.log('in (1) item["fundCode"]: ', item["fundCode"]);
            	if(item["valuagrState"]==true){
            		fundObj.dtOk = true;
            	}else{
            		fundObj.dtOk = false;
            	}
            	_df.res();
            }else{
            	_df.res();
            }
          }
          return _df;
				};
				function dailyOk(fundObj, loopDf, loopCount){
					return C.html('http://hqqd.fund123.cn/jsdata/nv_daily/latest/' + fundObj.fundcode + '.js', {dataType: 'text'}, function(data, _df){
						var checkDf = loopDf? loopDf: _df;
						var checkCount = loopCount? loopCount+1 : 1;
						if(data!=undefined){
							var str = data.slice(data.indexOf("=")+2, -1);
							var ary = str.split(";");
							str = ary[ary.length-2];
							ary = str.split(" ");
							var rate = fundObj.rate.replace(/[^0-9\.-]+/g,"").jian(ary[ary.length-1].cheng(100));
							// console.log("fundObj.rate: ", fundObj.rate, " ary[ary.length-1]: ", ary[ary.length-1]);
							// console.log(rate, " fundObj.fundcode:", fundObj.fundcode, " ary:", ary);
							if(rate<-0.1 || rate>0.1){
								fundObj.dtOk = false;
								checkDf.resolve();
							}else{
								checkDf.resolve();
							}		
						}else if(checkCount<5){
							setTimeout(function(){
								console.log("dailyOk redo : ", fundObj.fundcode, " ", checkCount);
								dailyOk(fundObj, checkDf, checkCount);
							}, 200);
						}else{
							fundObj.dtOk = false;
							checkDf.resolve();
							console.log("dailyOk error checkCount: ", fundObj.fundcode, " data:", data);							
						}
					});
				};
				ehDf.next(function(){
					var date = new Date();
					var year = date.getFullYear();
					var month = date.getMonth()+1;
					if(month<10){
						month = '0'+month;
					}
					var day = date.getDate();
					var hour = date.getHours()+1;
					if(hour>12){
						hour=hour-12;
						if(hour<10){
							hour = '0'+hour;
						}
					}else{
						if(hour<10){
							hour = '0'+hour;
						}
					}
					url = 'https://trade.fund123.cn/Contents/Scripts/FundsStateScript.js?ver='+year+''+month+''+day+''+hour+'';
					console.log('state url: ', url);
					return C.html(url, {dataType: 'text'}, function(data, _df){
						if(data==undefined){
							throw "FundsStateScript failed.";
						}else{
							// console.log('data: ', data);
							var str = data.slice(data.indexOf("=")+2, -1);
							// console.log('str: ', str);
							window.fundState = eval('(' + str + ')');
							// console.log('fundState: ', fundState);
							_df.resolve();
						}
					});
				});
				_.each(rankingData, function(vi, ki){
					_.each(vi, function(vj, kj){
						_.each(vj, function(vk, kk){
							if(ki == "shumi" && kj == "day"){
								ehDf.next(checkdtOk, vk).next(dailyOk, vk);
								// console.log("ki:", ki, " kj:", kj);
								// ehDf.next(function(){
								// 	return checkdtOk(vk);
								// }, function(){
								// 	return dailyOk(vk);
								// });
							}else{
								ehDf.next(checkdtOk, vk);
							}
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
				callback();
			}
		)
		.go();
	}

	C.storage.ngBind($scope, "today_dt", function(item){
		var today = new Date();
		if(item && item.date===today.toDateString()){
		}else{
			setToday();
		}
	}, function(changes){
	});

	// running funcktin
	function setToday(){
		C.storage.remove('today_dt', function(){
			var today = new Date(); 
			var newItem = {	today_dt:{	date : today.toDateString(), ranking : {
				shumi : {},
				tt : {}
			} }	};
			todayDtNgBind(newItem.today_dt.ranking, function(){
				console.log(newItem.today_dt);
				C.storage.remove('today_dt');	//	这里忘了有没有必要
				C.storage.set(newItem);
			});
		});
	}

	return function(jj, pp, key, cb){
		if(arguments.length==0){
			setToday();
		}else{
			C.storage.get('today_dt', function(items){
				var _item = items.today_dt;
				if(_item != undefined){
					_item.ranking[jj][pp][key].doneToday = true;
					C.storage.set({today_dt:_item}, cb);
				}
			});		
		}
	}

}