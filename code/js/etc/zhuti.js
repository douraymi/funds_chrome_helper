// 获取数据

module.exports = function(){
	console.log("zhuti");
	
	if(GIRAFEEEWINDOW == 'background'){
		// 获取今天主题列表
		function getzhutiList(cb){
			var _url = 'http://fund.eastmoney.com/daogou/';
			C.html(_url, function(data){
				var zhutiList = [];
				$(data).find("#dd_tp a:not(.def)").each(function(){
					var _obj = {
						id : $(this).attr('id').slice(3),
						name : $(this).text().trim()
					}
					zhutiList.push(_obj);
				});
				$(data).find("#zzjjafloat a:not(.def)").each(function(){
					var _obj = {
						id : $(this).attr('id').slice(3),
						name : $(this).text().trim()
					}
					zhutiList.push(_obj);
				});
				console.log('zhutiList:', zhutiList);
				cb(zhutiList);
			});
		}

		// 根据列表获取主题排名情况
		function getzhutiRank(_zlist, cb){
			// var _ztobj = _zlist;
			var _ztobj = [];
			var baseUrl = 'http://fund.eastmoney.com/api/FundGuide.aspx?dt=0&ft=gp&sd=&ed=&sc=3y&st=desc&pi=1&pn=1000&zf=diy&sh=list';
			var _df = C.df();
			_.each(_zlist, function(v, i){
				_ztobj[i] = v;
				// &rnd=0.849578816909343&tp=2494b469c0c28ed1
				var _url = baseUrl+'&rnd='+_.random(0, 1)+'&tp='+v.id;
				// console.log('_url: ', _url);
				_df.next(C.html, _url, function(data, xhrDf){
					// console.log('i:', i, 'v:', v);
					var jData = JSON.parse(data.substr(14));
					// console.log('jData:', jData);
					_ztobj[i].fcodes = jData.fcodes;
					xhrDf.resolve();
				});
			});
			_df.next(function(){
				// console.log('_ztobj:', _ztobj);
				cb(_ztobj);
			});
			_df.go();
		}

		function setToday(cb){
			console.log("start set zhuti ...");
			getzhutiList(function(zhutiList){
				// console.log(zhutiList);
				getzhutiRank(zhutiList, function(ztobj){
					// console.log('ztobj:', ztobj);
					var today = new Date();
					var _zhuti = {
						date : today.toDateString(),
						f : ztobj
					}
					C.storage.remove('zhuti', function(){
						C.storage.set({'zhuti': _zhuti}, function(){
							console.log("done zhuti !");
							if(cb) cb();
						});
					});
				});
			});
		}

		C.storage.get('zhuti', function(items){
			var item = items.zhuti;
			console.log(item);
			var today = new Date();
			if(item && item.date===today.toDateString()){
			}else{
				setToday(function(){
					console.log("zhuti ok!");
				});
			}

		});

		return setToday;

	}else{
		return {
			reset : function(){
				// 懒的写了 以后再写
				return this;
			}
		}

	}



}()