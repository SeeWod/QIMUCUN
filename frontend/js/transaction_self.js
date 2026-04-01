//body完成后渲染
var NOMessage=8; //number of message
var newMessage_xhr = createXmlHttpRequest();
var source;
//var source = new EventSource("/cgi-bin/goodsSelf/gFMessageToB.php?GM_goods=10&last_GM_id=50");
//        source.onmessage = function(event){
//          console.log("555");
//          getFreshMessage(event.data);
//        }
newMessage_xhr.onreadystatechange=function(){
  if (newMessage_xhr.readyState == 4 && newMessage_xhr.status == 200) {
    messageRound(newMessage_xhr.responseXML);
  }
}


window.onload = function(){
	transactionCommonInitial();
  boardInit();
};
function boardInit(){
  var goodslis=document.getElementsByClassName("goodsli");
  if(goodslis[0] != undefined){
    goodslis[0].click();
    
    //详情点击
    boardDetail();
    
  }else{
    console.log(goodslis[0] + "board初始化等待执行...");
    setTimeout(boardInit,50);
  }
}

function goodsRdelete(){
  var goodsName = document.getElementById("detail_name2").innerHTML;
  var r=confirm("确定将商品["+goodsName+"]从["+tag+"]中删除吗？");
  
  if(r){
    var G_id = document.getElementById("detail_id").innerHTML;
    var xmlHttpRequest = createXmlHttpRequest();
    //我的收录 与 我的发布不同 需要tag
    var url = "/cgi-bin/goodsSelf/goodsRDelete.php?G_id="+G_id+"&tag="+tag;
	  xmlHttpRequest.onreadystatechange=function(){
      if(xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200){
		    var text = xmlHttpRequest.responseText;
        console.log("Rdelete:" + text);
        refeshPage();     
    }
	}
	xmlHttpRequest.open("GET",url,true);
	xmlHttpRequest.send();
  }
}

function boardDetail(){
  var board_detail = document.getElementById("board_detail");
  var board_contact = document.getElementById("board_contact");
  var contactView = document.getElementById("contactView");

  board_detail.style.background = "#f6f6f6";
  board_contact.style.background = "#ffff";

  board_detail.style.color = "#0966d8";
  board_contact.style.color = "#cdcdcd";

  board_detail.style.textShadow = "1px 1px 0px rgb(9, 102, 1.6,0.5)";
  board_contact.style.textShadow = "1px 1px 0px rgb(205, 205, 205,0.5)";

  contactView.style.display = "none";
}
function boardContact(){
  var board_detail = document.getElementById("board_detail");
  var board_contact = document.getElementById("board_contact");
  var contactView = document.getElementById("contactView");

  board_detail.style.background = "#ffff";
  board_contact.style.background = "#f6f6f6";

  board_detail.style.color = "#cdcdcd";
  board_contact.style.color = "#c46254";

  board_detail.style.textShadow = "1px 1px 0px rgb(205, 205, 205,0.5)";
  board_contact.style.textShadow = "1px 1px 0px rgb(196, 98, 84,0.5)";

  contactView.style.display = "block";
}










//聊天方法模块 后续集成到方法库里
function gMessageToS(){
  var GM_content = document.getElementById("chatMessage").value;
  if(GM_content ==""){
    document.getElementById("chatMessage").placeholder = "消息为空";
    return;
  }else{
    document.getElementById("chatMessage").placeholder = "输入寄出消息";
  }
  document.getElementById("chatMessage").value = "";
  var GM_goods = document.getElementById("detail_id").innerHTML;
  //console.log(GM_content);
  //console.log(GM_goods);



  var xmlHttpRequest = createXmlHttpRequest();
  var url = "/cgi-bin/goodsSelf/gMessageToS.php?GM_content=" + GM_content +"&GM_goods=" + GM_goods;
  // ·µ»Øxml
  xmlHttpRequest.onreadystatechange=function(){
     if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
        var text = xmlHttpRequest.responseText;
        console.log(text);
      }
  }
  xmlHttpRequest.open("GET",url,true);
  xmlHttpRequest.send();
}
function gMessageToB(){
  var GM_goods = document.getElementById("detail_id").innerHTML;
  console.log("GM_goods"+ GM_goods);

  var xmlHttpRequest = createXmlHttpRequest();
  var url = "/cgi-bin/goodsSelf/gMessageToB.php?GM_goods=" + GM_goods + "&number=" + NOMessage;
  // ·µ»Øxml
  xmlHttpRequest.onreadystatechange=function(){
     if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
       newMessage_xhr.abort();
        //var text = xmlHttpRequest.responseText;
        var height = document.getElementById("chatList").scrollHeight;
        var U_id = document.getElementById("U_id").innerHTML;
        var xml = xmlHttpRequest.responseXML;
        console.log("xml" + xml);
        var htmlcode ="";
        var GM_control = xml.getElementsByTagName("GM_control")[0].childNodes[0].nodeValue;
        var GMs = xml.getElementsByTagName("GM");
        var messageNum = 0;
        var last_GM_id= 0;
        for(var i=GMs.length-1;i>=0;i--){
          var xiaoxi_content;
          if(xml.getElementsByTagName("GM_content")[i].hasChildNodes()){
            xiaoxi_content = xml.getElementsByTagName("GM_content")[i].childNodes[0].nodeValue;
          }else{
            xiaoxi_content = "";
          }
          
          if(xml.getElementsByTagName("GM_sender")[i].childNodes[0].nodeValue == U_id){
          var code = "<li class='rightBar'>"+
				               "<div class='M_text'>"+
						             "<div class='textHead'>"+
													  "<p class='M_time'>"+ xml.getElementsByTagName("GM_time")[i].childNodes[0].nodeValue + "</p>"+
													  "<p class='M_name'>"+ xml.getElementsByTagName("GM_U_name")[i].childNodes[0].nodeValue + "</p>"+
										     "</div>"+
										     "<p class='M_content'>"+ xiaoxi_content +"</p>"+
										   "</div>"+
										   "<img class='M_head' src = '../data/user/userHeadImg/"+ xml.getElementsByTagName("GM_U_headImg")[i].childNodes[0].nodeValue +".jpg'>"+
									   "</li>"
          }else{
          var code = "<li class='leftBar'>"+
                        "<img class='M_head' src = '../data/user/userHeadImg/"+ xml.getElementsByTagName("GM_U_headImg")[i].childNodes[0].nodeValue +".jpg'>"+
                        "<div class='M_text'>"+
                          "<div class='textHead'>"+
                            "<p class='M_name'>"+ xml.getElementsByTagName("GM_U_name")[i].childNodes[0].nodeValue + "</p>"+
                            "<p class='M_time'>"+ xml.getElementsByTagName("GM_time")[i].childNodes[0].nodeValue + "</p>"+
                          "</div>"+
                          "<p class='M_content'>"+ xiaoxi_content +"</p>"+
                        "</div>"+
                        "</li>";
          }
          var GM_id = parseInt(xml.getElementsByTagName("GM_id")[i].childNodes[0].nodeValue);
          last_GM_id = ((parseInt(last_GM_id) >= GM_id) ? last_GM_id : GM_id);
          htmlcode = htmlcode + code;
          messageNum++;
        }
        console.log("GM_control:"+GM_control);
        document.getElementById("chatList").innerHTML = htmlcode;
        NOMessage = messageNum;
          if(document.getElementById("chatList").scrollTop == 0){
            document.getElementById("chatList").scrollTop = document.getElementById("chatList").scrollHeight - height;
          }else{
            document.getElementById("chatList").scrollTop = document.getElementById("chatList").scrollHeight;
          }
        
        //source = new EventSource("/cgi-bin/goodsSelf/gFMessageToB.php?GM_goods=" + GM_goods + "&last_GM_id=" + last_GM_id);
        //source.onmessage = function(event){
        //  console.log("555");
        //  getFreshMessage(event.data);
        //}
        newMessage_xhr.open("GET","/cgi-bin/goodsSelf/gFMessageToB.php?GM_goods=" + GM_goods + "&last_GM_id=" + last_GM_id,true);
        newMessage_xhr.send();
        
      }
  }
  xmlHttpRequest.open("GET",url,true);
  xmlHttpRequest.send();
}
function getHistoryMessage(e){
  //滑条滚动到顶端获取历史消息 并添加
  if(e.scrollTop == 0){
    console.log("获取历史数据");
    NOMessage += 10;
    gMessageToB();
  }
}





function messageRound(xml){
  getFreshMessage(xml);
}




function getFreshMessage(xmlDoc){
//  console.log("sseText"+sseText);
//  if(window.DOMParser){
//    parser=new DOMParser();
//    xmlDoc=parser.parseFromString(sseText,"text/xml");
//  }else{
  // Internet Explorer
//    xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
//    xmlDoc.async=false;
//    xmlDoc.loadXML(sseText);
//  }
  //console.log(xmlDoc);
  var GM_goods = document.getElementById("detail_id").innerHTML;
  var U_id = document.getElementById("U_id").innerHTML;  
  var htmlcode ="";
  console.log(xmlDoc.getElementsByTagName("GM_control")[0].childNodes[0].nodeValue)
  var GMs = xmlDoc.getElementsByTagName("GM");
  var last_GM_id= 0;
        var messageNum = 0;
        for(var i=GMs.length-1;i>=0;i--){
          if(xmlDoc.getElementsByTagName("GM_sender")[i].childNodes[0].nodeValue == U_id){
          var code = "<li class='rightBar'>"+
				               "<div class='M_text'>"+
						             "<div class='textHead'>"+
													  "<p class='M_time'>"+ xmlDoc.getElementsByTagName("GM_time")[i].childNodes[0].nodeValue + "</p>"+
													  "<p class='M_name'>"+ xmlDoc.getElementsByTagName("GM_U_name")[i].childNodes[0].nodeValue + "</p>"+
										     "</div>"+
										     "<p class='M_content'>"+ xmlDoc.getElementsByTagName("GM_content")[i].childNodes[0].nodeValue +"</p>"+
										   "</div>"+
										   "<img class='M_head' src = '../data/user/userHeadImg/"+ xmlDoc.getElementsByTagName("GM_U_headImg")[i].childNodes[0].nodeValue +".jpg'>"+
									   "</li>"
          }else{
          var code = "<li class='leftBar'>"+
                        "<img class='M_head' src = '../data/user/userHeadImg/"+ xmlDoc.getElementsByTagName("GM_U_headImg")[i].childNodes[0].nodeValue +".jpg'>"+
                        "<div class='M_text'>"+
                          "<div class='textHead'>"+
                            "<p class='M_name'>"+ xmlDoc.getElementsByTagName("GM_U_name")[i].childNodes[0].nodeValue + "</p>"+
                            "<p class='M_time'>"+ xmlDoc.getElementsByTagName("GM_time")[i].childNodes[0].nodeValue + "</p>"+
                          "</div>"+
                          "<p class='M_content'>"+ xmlDoc.getElementsByTagName("GM_content")[i].childNodes[0].nodeValue +"</p>"+
                        "</div>"+
                        "</li>";
          }
          var GM_id = parseInt(xmlDoc.getElementsByTagName("GM_id")[i].childNodes[0].nodeValue);
          last_GM_id = ((parseInt(last_GM_id) >= GM_id) ? last_GM_id : GM_id);
          htmlcode = htmlcode + code;
          messageNum++;
        }   
        document.getElementById("chatList").innerHTML += htmlcode;
        NOMessage += messageNum;
        document.getElementById("chatList").scrollTop = document.getElementById("chatList").scrollHeight;
  newMessage_xhr.open("GET","/cgi-bin/goodsSelf/gFMessageToB.php?GM_goods=" + GM_goods + "&last_GM_id=" + last_GM_id,true);
  newMessage_xhr.send();
}