;(function() {
	window.GIRAFEEEWINDOW = "background";

  window.$ = window.$ ? window.$ : require('jquery');
  window._ = window._ ? window._ : require('underscore');  
  window.URI = window.URI ? window.URI : require('URIjs');
  // window.angular = window.angular ? window.angular : false;
  window.M = window.M ? window.M : require("./modules/chrome_msg");
  window.C = window.C ? window.C : require('./modules/chrome_cab');

  console.log("bg begin");
  // 预处理部分
  //  -- 天天基金主题排名
  window.zhutiReset = require('./etc/zhuti');
  // zt(); // 如果今天已有数据可以手动重置
  // setTimeout(function(){
  //     C.storage.get('zhuti', function(item){
  //       console.log('item:', item);
  //     });
  //   }, 3000);
  
  M.onConnect(function(cntor){
    // console.log("cntor:", cntor);
  });
  
})();