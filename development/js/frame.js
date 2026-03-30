//frame.js 文件内容：
//网页适应屏幕问题 综合了之前ScreenInitial.js文档
//left_part 加载部分 frameInitial()方法
//界面建设相关方法


//？ 下面这些注释 产生缘由忘记了 稍后处理
// 应该是加载js时候还没有加载body元素
// alert(document.getElementsByTagName("body")[0].style.background);
// document.body.addEventListener("onload",frameInitial);
//因为文件加载先加载html文件 再加载js文件 而加载js时候 dom已经加载完了，所以不会触发
function screenInitial(){
  //手机宽高查看 <手机端还未相应设置 稍后修改>
  //console.loh("phone屏幕 宽*高");
 	//console.log("phone屏幕: "+screen.width+"*"+screen.height); 
  //console.log("phone屏幕[去除windows任务栏]: "+screen.availWidth+"*"+screen.availHeight);
  //console.log("phone端浏览器文档显示区： "+window.innerWidth+"*"+window.innerHeight);

  //pc宽高查看
 	//window.alert(document.getElementsByTagName("content")[0].style.width.value);
 	// content.style.height = content.style.width*0.5+"px";
 	//console.loh("pc屏幕 宽*高");
 	//console.log("pc屏幕: "+screen.width+"*"+screen.height); 
  //console.log("pc屏幕[去除windows任务栏]: "+screen.availWidth+"*"+screen.availHeight);
  //console.log("pc端浏览器文档显示区： "+window.innerWidth+"*"+window.innerHeight);

  if(window.innerWidth < 500){
    document.getElementsByTagName("content")[0].style.height = window.innerHeight + "px";
//    document.getElementsByTagName("body")[0].style.height = window.innerHeight + "px";
  }else{
    document.getElementsByTagName("content")[0].style.height = "calc("+(window.innerHeight) + "px - 4rem)";
  }
}

// frameInitial()--获取用户数据
function frameInitial(){
	document.getElementById("U_headImg").style.backgroundImage = "url(../../data/user/userHeadImg/"+getCookie("U_headImg")+".jpg)";
	document.getElementById("station").innerHTML = decodeURI(getCookie("U_college"))+"站";
}

// 改变left_part显示 鼠标移动进去 和 出去变换的显示
var timer;
function changeInfo(){
	var self_info = document.getElementById("self_info");
	var logo_info = document.getElementById("logo_info");
	$("#self_info").fadeIn(1000);
//	self_info.style.display = "flex";
	// logo_info.style.display = "none";
	if(timer){
		window.clearInterval(timer);
	}
	timer = window.setInterval(showLogo,5000);
}
function showLogo(){
	var self_info = document.getElementById("self_info");
	var logo_info = document.getElementById("logo_info");
		$("#self_info").fadeOut(10000);
	// logo_info.style.display = "block";
	//self_info.style.display = "none";
}

//界面建设相关方法
function no(){
  alert("建设中··· ···");
}
function question(){
  alert("出现问题 联系开发者 QQ2417802903");
}
function otherPage_login(){
  alert("请切换到主页进行重新登录");
}
//学校也要设置cookie
function cs_user_noMain(){
  var r = confirm("更换校区-所有站点信息将同步修改,请前往主页点击");
  if(r){
  	location.pathname="/html/main.html";
  }else{
  	return;
  }
}
// change station
function cs_user(){
	document.getElementById("popPage").style.display = "flex";
	document.getElementById("cs_userPage").style.display = "block";
}
function cs(){
	var cvalue = encodeURI(document.getElementById("cs_user_input").value);
	document.cookie="U_college="+cvalue+"; max-age= -1; path=/";
	location.reload();
}
function close_cs_userPage(){
	document.getElementById("popPage").style.display = "none";
	document.getElementById("cs_userPage").style.display = "none";
}
function loadColleges(){
	var xmlHttpRequest = createXmlHttpRequest();
	var url = "/cgi-bin/frame_loadColleges.php";

	xmlHttpRequest.onreadystatechange = function() {
	    if(this.readyState == 4 && this.status == 200){
	    	var xmlDoc=xmlHttpRequest.responseXML;
        console.log(xmlDoc.getElementsByTagName("COL_control")[0].childNodes[0].nodeValue);
        
        var names = xmlDoc.getElementsByTagName("COL_name");
        var html ="";
        for(var i=0;i<names.length;i++){
          html += "<li onclick='setCollegeValue(this)'>"+names[i].childNodes[0].nodeValue+"</li>"
        }
	    	document.getElementById("cs_colleges").innerHTML = html;
	    	//主页 与 workStation设置相同的id不会出问题
	    }
    }
    xmlHttpRequest.open("GET",url,true);
    xmlHttpRequest.send();
}
function openColleges(){
	document.getElementById("cs_colleges").style.display = "block";
	document.getElementById("closeCollegesB").style.display = "block";
}
function closeColleges(){
		document.getElementById("cs_colleges").style.display = "none";
		var lis = document.getElementById("cs_colleges").children;
		for(var i=0;i<lis.length;i++){
			lis[i].style.display = "none";
		}
		document.getElementById("closeCollegesB").style.display = "none";
}
function filterCollege(e){
	var regExp = new RegExp(".*"+e.value+".*");
	var lis = document.getElementById("cs_colleges").children;

	for(var i=0;i<lis.length;i++){
		if(regExp.test(lis[i].innerHTML)){
			lis[i].style.display = "block";
		}else{
			lis[i].style.display = "none";
		}
	}
}
//----------修改相关-------------------------------------------------------------------------















function invitation_pageOpen(){
	document.getElementById("popPage").style.display = "flex";
	document.getElementById("invitationPage").style.display = "flex";
}


//一些常用的方法 不单独设立often.js

function popPage_close(popPage_name){
	document.getElementById("popPage").style.display = "none";
	document.getElementById(popPage_name).style.display = "none";
}






















