window.onload = function(){
  //transaction_home初始化 包括 屏幕适应初始换 frame个人信息等HTML文档初始化、page界面初始化
  //frame个人信息初始化要先 登录才能获取到后台数据
  //屏幕初始化
  screenInitial();
  //frame个人信息初始化
  login_AUTO_manual();
};
function login_AUTO_manual(){ 
  var id = getCookie("id");
  var token = getCookie("token");
  var PHPSESSID = getCookie("PHPSESSID");
  //console.log("id "+id);
  //console.log("token "+token);
  if(PHPSESSID != ""){
  	//后台已登陆_用于切回页面
    document.getElementById("loginPart").style.display = "none";
    	screenInitial();
 	  //个人信息初始化
	  frameInitial();
    getNoticeBoards();
	  loadColleges();
     
      getTrus();
  trumpetContent_change();
  getChatLogs();
  }else{
    if(id != "" && token != ""){
      //auto登录
      login(true);
      return;
    }else{
      //manual登录
      document.getElementById("loginPart").style.display = "flex";    
      //显示登陆面板
      //游客登陆nobody账户
      //后台请求资源 限制 没有登录无法请求 ------暂不设置（不需要防止黑客）
    }
  
  }
}
var trumpetList = new Array(); 
trumpetList.push("点击 '小喇叭' 喊一喊！"); 
function mainInitial(){
	screenInitial();
 	//个人信息初始化
	frameInitial();
 	loadColleges();
  getNoticeBoards();
  var notices = document.getElementById("noticeUL").children;
  console.log(notices.length);
  console.log(Math.ceil(Math.random()*notices.length)-1);
  if(notices.length != 0){
    clickChange(notices[Math.ceil(Math.random()*notices.length)-1]); 
  }
	// ongetMessage();
	// getMassages(); 
   getTrus();
  trumpetContent_change();
  getChatLogs();
}


function getTrus(){
  if(typeof(EventSource)!=="undefined"){
    var source = new EventSource("/cgi-bin/main/getTrumpet.php");
    
    source.onmessage = function(event){
      trumpetList.push(event.data);
    }
  }else{
      alert("浏览器不支持 Server-Sent-Event");
  }
}
//notice(广告牌模块)
var index = 0;
setInterval(change,15000);
function change(){
	var noticeUL =  document.getElementById("noticeUL");
  //如果noticeUL元素为空下面程序会出错，暂不管
  if(noticeUL.children.length = 0){
    return;
  }
  var firE = noticeUL.childNodes[0]; 
  noticeUL.removeChild(noticeUL.childNodes[0]);
  noticeUL.appendChild(firE);
}
function clickChange(e){
	document.getElementById("popPage").style.display = "flex";
	document.getElementById("notice_detailPage").style.display = "flex";
 
	document.getElementById("ND_img").src= "../../data/notice/srcImg/"+e.id+".jpg";
  getNoticeDetail(e.id);
  //详情
}
//function closeNotice(){
//	var noticePage = document.getElementById("noticePage");
//	noticePage.style.display = "none";
//}
function ND_close(){
  	document.getElementById("popPage").style.display = "none";
	document.getElementById("notice_detailPage").style.display = "none";
}
function  getNoticeBoards(){
  var xmlHttpRequest = createXmlHttpRequest();
	var url = "/cgi-bin/workStation/getNoticeBoards.php";

	xmlHttpRequest.onreadystatechange = function() {
	    if(this.readyState == 4 && this.status == 200){
	    	var xmlDoc=xmlHttpRequest.responseXML;
        console.log(xmlDoc.getElementsByTagName("NB_control")[0].childNodes[0].nodeValue);
        
        var NBs = xmlDoc.getElementsByTagName("NB_id");
        var html ="";
        for(var i=0;i<NBs.length;i++){
          html += "<li class='notice_bar' id='"+NBs[i].childNodes[0].nodeValue+"' onclick='clickChange(this)'><img src='../../data/notice/croImg/"+NBs[i].childNodes[0].nodeValue+".jpg'></li>";
        }
	    	document.getElementById("noticeUL").innerHTML = html;
	    }
    }
    xmlHttpRequest.open("GET",url,false);
    xmlHttpRequest.send();
}
function  getNoticeDetail(id){
  var xmlHttpRequest = createXmlHttpRequest();
	var url = "/cgi-bin/workStation/getNoticeDetail.php?NB_id="+id;

	xmlHttpRequest.onreadystatechange = function() {
	    if(this.readyState == 4 && this.status == 200){
	    	var xmlDoc=xmlHttpRequest.responseXML;
        console.log(xmlDoc.getElementsByTagName("NB_control")[0].childNodes[0].nodeValue);
        if(xmlDoc.getElementsByTagName("NB_long")[0].hasChildNodes()){
          document.getElementById("ND_text").style.width = "40rem";
          document.getElementById("ND_text").style.margin = "3rem 2.5rem 2.5rem 0px";
          document.getElementById("ND_text").value = xmlDoc.getElementsByTagName("NB_long")[0].childNodes[0].nodeValue;
        }else{
          document.getElementById("ND_text").style.width = "0rem";
          document.getElementById("ND_text").style.margin = "0rem";
        }
	    }
    }
    xmlHttpRequest.open("GET",url,false);
    xmlHttpRequest.send();
}
//
//校园资讯模块 已归类到校园俱乐部资讯功能 暂未开放

//trumpet 小喇叭模块
function TP_close(){
  document.getElementById("popPage").style.display = "none";
	document.getElementById("trumpet_publishPage").style.display = "none";
}
function TP_open(){
  document.getElementById("popPage").style.display = "flex";
	document.getElementById("trumpet_publishPage").style.display = "block";
}
function trumpetContent_change(){
console.log("1"+document.getElementById("tru_move").style.animation);
  if(trumpetList.length == 0){
    var content = "点击 '小喇叭' 喊一喊！";
    document.getElementById("trumpet_content").innerHTML = content;
  }else{
    var content = trumpetList.shift();

	  if(document.getElementById("tru_move").style.animation == "10s linear 0s 1 normal none running trumpetFrame_move1"){
   //console.log("1"+document.getElementById("tru_move").style.animation);
       document.getElementById("trumpet_content").innerHTML = content;
       document.getElementById("tru_move").style.animation = "trumpetFrame_move2 10s linear 1";
    }else{
     //console.log("2"+document.getElementById("tru_move").style.animation);
       document.getElementById("trumpet_content").innerHTML = content;
       document.getElementById("tru_move").style.animation = "trumpetFrame_move1 10s linear 1";
    }
  }
	setTimeout("trumpetContent_change()",10000);
}
function trumpet_publish(){
  //检查表单是否填写完成
  if(!(/^.{1,25}$/.test(document.getElementById('TP_input').value))){
    //1,35位名称
    alert("请输入1-25位字符作为小喇叭内容");
    return;
  }

  //制造表单数据
  var formdata = new FormData();
  var TP_input = document.getElementById('TP_input').value;
  var TP_hasName;
  var radios = document.getElementsByName('TP_hasName');
  for(var i=0;i<radios.length;i++){
    if(radios[i].checked){
      TP_hasName = radios[i].value;
    }
  }

  formdata.append("TP_input",TP_input);
  formdata.append("TP_hasName",TP_hasName);

  var url = "/cgi-bin/main/trumpetPublish.php";
  var xmlHttpRequest = createXmlHttpRequest();
  xmlHttpRequest.onreadystatechange = function(){
    if (xmlHttpRequest.readyState==4 && xmlHttpRequest.status==200){
        var answer = xmlHttpRequest.responseText;
        console.log(answer);

        document.getElementById("TP_input").value = "";
        for(var i=0;i<radios.length;i++){
          if(radios[i].checked){
            radios[i].checked = false;
          }
        }
      }
  }
//  console.log(formdata);
  xmlHttpRequest.open("post",url,true);
  xmlHttpRequest.send(formdata);
}
//论坛相关
function getChatLogs(){
  var xmlHttpRequest = createXmlHttpRequest();
	var url = "/cgi-bin/main/getChatLogs.php";

	xmlHttpRequest.onreadystatechange = function() {
	    if(this.readyState == 4 && this.status == 200){
	    	var xmlDoc=xmlHttpRequest.responseXML;
        //console.log(xmlDoc.getElementsByTagName("CL_control")[0].childNodes[0].nodeValue);
        
        var CLs = xmlDoc.getElementsByTagName("CL");
        var html ="";
        for(var i=0;i<CLs.length;i++){
          var C_id = xmlDoc.getElementsByTagName("CL_id")[i].childNodes[0].nodeValue;
          var C_name = xmlDoc.getElementsByTagName("CL_name")[i].childNodes[0].nodeValue;
          html += "<li id='"+C_id+"' onclick='openChatLog_detail(this)'>"+
							      "<img src='../../data/user/userHeadImg/"+C_id+".jpg'>"+
							      "<div id='chatlogTextInfo'>"+
								      "<div><span id='chatlog_name'>"+C_name+"</span><span id='chatlog_time'></span></div>"+
								      "<div id='chatlog_lastShort'></div>"+
							      "</div>"+
							      //"<p id='unMessage'>+6</p>"+
						      "</li>";
        }
	    	document.getElementById("chatlogs").innerHTML = html;
        setTimeout(function(){
          openChatLog_detail(document.getElementById("chatlogs").children[0]);
        },300)
	    }
    }
    xmlHttpRequest.open("GET",url,true);
    xmlHttpRequest.send();
}
//回车发送消息
function keydown_message(event){
  if(event.key =="Enter"){
    //alert("回车");
    gMessageToS();
    
  }
}

function gMessageToS(){    
  var M_content = document.getElementById("chatMessage").value;
  if(M_content ==""){
    document.getElementById("chatMessage").placeholder = "消息为空";
    return;
  }else{
    document.getElementById("chatMessage").placeholder = "输入寄出消息";
  }
  document.getElementById("chatMessage").value = "";
  var roomid = document.getElementById("RoomId").innerHTML;
  //console.log(GM_content);
  //console.log(GM_goods);

  var xmlHttpRequest = createXmlHttpRequest();
  var url = "/cgi-bin/main/gMessageToS.php?M_content=" + M_content +"&M_receiver=" + roomid;
  xmlHttpRequest.onreadystatechange=function(){
     if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
        var text = xmlHttpRequest.responseText;
        console.log(text);
      }
  }
  xmlHttpRequest.open("GET",url,true);
  xmlHttpRequest.send();
}
var NOMessage=10;
var source_message;

function openChatLog_detail(e){
  var logs = document.getElementById("chatlogs").children;
  for(var i = 0;i < logs.length;i++){
    logs[i].style.backgroundColor="transparent";
  }
  e.style.backgroundColor="#e9e9e9";
  document.getElementById("club_info_headImg").src = e.children[0].src;
  document.getElementById("club_info_name").innerHTML = e.children[1].children[0].children[0].innerHTML;
  document.getElementById("RoomId").innerHTML = e.id;
  document.getElementById("chatList").innerHTML = "";
  
  NOMessage = 10;
  gMessageToB();
}

function gMessageToB(){
  var roomid = document.getElementById("RoomId").innerHTML;
  if(source_message != null){
    source_message.close()
  }
  source_message = new EventSource("/cgi-bin/main/gMessageToB.php?room_id=" + roomid + "&number=" + NOMessage);
  source_message.onmessage = function(event){
    getFreshMessage(event.data);
  } 
}
function getFreshMessage(sseData){
  //console.log(xmlDoc);
  var sseText_array = sseData.split(",");
  var M_sender = sseText_array[1];
  var M_content = sseText_array[2];  
  var M_time = sseText_array[3];
  
  var M_U_name = sseText_array[4];
  var M_U_headImg = sseText_array[5];
  var U_id =  getCookie("id");  
          if(M_sender == U_id){
          var code = "<li class='rightBar'>"+
				               "<div class='M_text'>"+
						             "<div class='textHead'>"+
													  "<p class='M_time'>"+ M_time + "</p>"+
													  "<p class='M_name'>"+ M_U_name + "</p>"+
										     "</div>"+
										     "<p class='M_content'>"+ M_content +"</p>"+
										   "</div>"+
										   "<img class='M_head' src = '../../data/user/userHeadImg/"+ M_U_headImg +".jpg'>"+
									   "</li>"
          }else{
          var code = "<li class='leftBar'>"+
                        "<img class='M_head' src = '../../data/user/userHeadImg/"+ M_U_headImg +".jpg'>"+
                        "<div class='M_text'>"+
                          "<div class='textHead'>"+
                            "<p class='M_name'>"+ M_U_name + "</p>"+
                            "<p class='M_time'>"+ M_time + "</p>"+
                          "</div>"+
                          "<p class='M_content'>"+ M_content +"</p>"+
                        "</div>"+
                        "</li>";
          }
          NOMessage += 1;
        document.getElementById("chatList").innerHTML += code;
        document.getElementById("chatList").scrollTop = document.getElementById("chatList").scrollHeight;
}
function getHistoryMessage(e){
  //滑条滚动到顶端获取历史消息 并添加
  if(e.scrollTop == 0){
    console.log("获取历史数据");
    NOMessage += 10;
    gMessageToB();
  }
}

