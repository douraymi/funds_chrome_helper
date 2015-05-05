// http://my.fund123.cn/RealFundDefault.aspx
// for this url page

module.exports = function(){
	// console.log("my_fund");
	C.css('css/part/fund123_my_fund.css');
	C.ng('html/part/fund123_my_fund.html', appController);

	function appController($scope){

		// 根据金额随机选择 卖出基金
		$scope.randomRedeem = function(amount){
			var mTb = "#m_Table_open tbody tr.bb";
			$(mTb).removeClass("hight_light");
			var tmpAry = [];
			var count = 0;
			while(count<amount){
				var size = $(mTb).size();
				var mvTr = $(mTb).eq( _.random(0, size-1) ).remove();	// 随机选一行
				count += mvTr.find("td:eq(4)").text().trim().replace(/[^0-9\.]+/g,"") * 1;
				tmpAry.push(mvTr);
				// console.log(count);
			}
			_.each(tmpAry, function(trObj){
				trObj.addClass("hight_light");
				trObj.insertBefore($(mTb).eq(0));
				// 处理另外一行
				var anotherTr = "#TR2"+trObj.attr("id").slice(2);
				$(anotherTr).remove().insertAfter($(mTb).eq(0));
			});
		}



		// 赎回信息传递
		function redeemTunnel(fundCode, perVal){
			var redeemQ = 0;
			M.connect("my_fund", fundCode+"confirm", function(tnConfirm){
				// console.log("tn:", tnConfirm);
				tnConfirm.onMsg({
					redeemConfirm : {
						onLoad : function(msg, _p){
							redeemQ = msg.body.redeemQ;
							// console.log("msg:", msg);



							// for fake test
							// tnConfirm.send({type:"test", code:"test", body:{}});

							// M.connect("my_fund", fundCode+"done", function(tnDone){
							// 	tnDone.onMsg({
							// 		redeemDone : {
							// 			onLoad : function(msg, _p){
							// 				console.log("onDoneMsg:", msg);
							// 				if(msg.body.isRedeemOk){
							// 					C.storage.get('todayRedeem', function(items){
							// 						console.log('items:', items);
							// 						var _ra = items["todayRedeem"]["redeemAmount"]+C.fxNum(redeemQ*1*perVal, 2);
							// 						console.log("_ra:", _ra);
							// 						C.storage.set({
							// 							todayRedeem:{
							// 								date 					: items["todayRedeem"]["date"],
							// 								redeemAmount 	: _ra
							// 							}
							// 						});
							// 					});
							// 				}
							// 			}
							// 		}
							// 	});
							// 	tnDone.onClose.addListener(function(){
							// 		tnDone.close();
							// 	});

							// });
							// for fake test end




						}
					}
				});
				tnConfirm.onClose.addListener(function(){
					M.connect("my_fund", fundCode+"done", function(tnDone){
						tnDone.onMsg({
							redeemDone : {
								onLoad : function(msg, _p){
									// console.log("onDoneMsg:", msg);
									if(msg.body.isRedeemOk){
										C.storage.get('todayRedeem', function(items){
											console.log('items:', items);
											var _ra = items["todayRedeem"]["redeemAmount"]+C.fxNum(redeemQ*1*perVal, 2);
											// console.log("_ra:", _ra);
											C.storage.set({
												todayRedeem:{
													date 					: items["todayRedeem"]["date"],
													redeemAmount 	: _ra
												}
											});
										});
									}
								}
							}
						});
						tnDone.onClose.addListener(function(){
							tnDone.close();
						});

					});

					tnConfirm.close();
				});

			});

		}
		$("#a_trade_redeem").click(function(){
			var _url = new URI($(this).attr("href"));
			_url.hasQuery("parentid", function(value){
				var _code = $("span[parentid="+value+"]").attr("code");
				var _perVal = $("#TR_"+value).find("td:eq(1) a:eq(0)").text().trim().replace(/[^0-9\.]+/g,"");
				// console.log(_perVal);
				redeemTunnel(_code, _perVal);

			});
		});

		// localStorage方式统计当天赎回总额
		C.storage.ngBind($scope, "todayRedeem", function(item){
			var today = new Date();
			if(item && item.date===today.toDateString()){
			}else{
				C.storage.set({
					todayRedeem:{
						date 					: today.toDateString(),
						redeemAmount 	: 0
					}
				});
			}
		}, function(changes){
			// console.log("changes:", changes);
		});


	}

}();