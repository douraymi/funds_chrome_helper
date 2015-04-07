;(function() {
  var $ = require('jquery');
  
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if(message==="messa"){
      // console.log("get messsaa");
      $.ajax({ url: "http://fund.eastmoney.com/api/FundGuide.aspx?dt=0&ft=gp&sd=&ed=&sc=z&st=desc&pi=1&pn=20&zf=diy&sh=list&rnd=0.07104309764690697", async:true, success: function(data, textStatus){
        // console.log("sendResponse:", sendResponse);
        sendResponse(data);
      } });
      // sendResponse(resp);
      return true;
    }
  });
  
})();