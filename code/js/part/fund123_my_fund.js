// http://my.fund123.cn/RealFundDefault.aspx
// for this url page

module.exports = function(){
	// console.log("my_fund");
	C.css('css/part/fund123_my_fund.css');
	C.ng('html/part/fund123_my_fund.html', appController);

	function appController($scope){

		// 根据金额随机选择 卖出基金
		$scope.randomRedeem = function(amount){
			var mTb = "#m_Table_open tbody tr.bb:not(.today_is_redeemed)";
			$(mTb).removeClass("hight_light");
			var tmpAry = [];
			var count = 0;
			while(count<amount){
				var size = $(mTb).size();
				var mvTr = $(mTb).eq( _.random(0, size-1) ).remove();	// 随机选一行
				count += mvTr.find("td:eq(4)").text().trim().replace(/[^0-9\.]+/g,"") * 1;
				tmpAry.push(mvTr);
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
		function redeemTunnel(parentid, fundCode, perVal, fenE){
			// 赎回出错修正
			M.connect("my_fund", fundCode+"redeem", function(tnRedeem){
				var redeemMsgObj = {
					redeemRedeem : {
						fix : function(msg){
							if(msg.body.fixFenE){
								var _newBalance = Number(fenE) - Number(msg.body.fixFenE);
								if(_newBalance>0){
									$("#TR_"+parentid).removeClass('hight_light').addClass('today_is_redeemed');
									C.storage.get('todayRedeem', function(items){
										var _ra = items["todayRedeem"]["redeemAmount"]+ _newBalance*1*perVal;
										_ra = C.fxNum(_ra, 2);
										items["todayRedeem"]["redeemTr"].push(parentid);
										C.storage.set({
											todayRedeem:{
												date 					: items["todayRedeem"]["date"],
												redeemTr 			: items["todayRedeem"]["redeemTr"],
												redeemAmount 	: _ra
											}
										}, function(){
											tnRedeem.send({type:"redeemRedeem", code:"fix", body:{isDone:true}});
										});
									});
									
								}else{
									console.log("_newBalance:", _newBalance);
									tnRedeem.send({type:"redeemRedeem", code:"fix", body:{isDone:true}});
								}

							}
						}
					}
				}

				tnRedeem.onMsg(redeemMsgObj);
				tnRedeem.onClose.addListener(function(){
					tnRedeem.close();
				});
			});

			// 赎回操作
			var redeemQ = 0;
			M.connect("my_fund", fundCode+"confirm", function(tnConfirm){
				var confirmMsgObj = {
					redeemConfirm : {
						onLoad : function(msg){
							redeemQ = msg.body.redeemQ;
						}
					}
				};
				var confirmOnCloseFunc = function(){
					M.connect("my_fund", fundCode+"done", function(tnDone){
						var doneMsgObj = {
							redeemDone : {
								onLoad : function(msg){
									if(msg.body.isRedeemOk){
										$("#TR_"+parentid).removeClass('hight_light').addClass('today_is_redeemed');
										C.storage.get('todayRedeem', function(items){
											var _ra = items["todayRedeem"]["redeemAmount"]+redeemQ*1*perVal;
											_ra = C.fxNum(_ra, 2);
											items["todayRedeem"]["redeemTr"].push(parentid);
											C.storage.set({
												todayRedeem:{
													date 					: items["todayRedeem"]["date"],
													redeemTr 			: items["todayRedeem"]["redeemTr"],
													redeemAmount 	: _ra
												}
											});
										});
									}
								}
							}
						};

						tnDone.onMsg(doneMsgObj);
						tnDone.onClose.addListener(function(){
							tnDone.close();
						});
					});
					tnConfirm.close();
				}

				tnConfirm.onMsg(confirmMsgObj);
				tnConfirm.onClose.addListener(confirmOnCloseFunc);
			});
		};
		$("#a_trade_redeem").click(function(){
			var _url = new URI($(this).attr("href"));
			_url.hasQuery("parentid", function(parentid){
				var _code = $("span[parentid="+parentid+"]").attr("code");
				var _perVal = $("#TR_"+parentid).find("td:eq(1) a:eq(0)").text().trim().replace(/[^0-9\.]+/g,"");
				var _fenE = $("#TR_"+parentid).find("td:eq(3)").text().trim().replace(/[^0-9\.]+/g,"");
				redeemTunnel(parentid, _code, _perVal, _fenE);
			});
		});

		// localStorage方式统计当天赎回总额
		C.storage.ngBind($scope, "todayRedeem", function(item){
			// console.log("item:", item);
			var today = new Date();
			if(item && item.date===today.toDateString() && item.redeemTr){
				// redeemTr渲染
				_.each(item.redeemTr, function(parentid){
					$("#TR_"+parentid).removeClass('hight_light').addClass('today_is_redeemed');
				});
			}else{
				var newItem = {
					todayRedeem:{
						date 					: today.toDateString(),
						redeemTr			: [],
						redeemAmount 	: 0
					}
				};
				C.storage.remove('todayRedeem');
				C.storage.set(newItem);
			}
		}, function(changes){
			// console.log("changes:", changes);
		});




	}




}();