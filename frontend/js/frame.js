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
	var xmlHttpRequest = createXmlHttpRequest();
	var url = "/cgi-bin/frameInit.php";

	//changeInfo();

	xmlHttpRequest.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	    	var xmlDoc=xmlHttpRequest.responseXML;
        //alert(xmlDoc);
	    	var userName = xmlDoc.getElementsByTagName("U_name")[0].childNodes[0].nodeValue;
	    	var userHeadImgPath = xmlDoc.getElementsByTagName("U_headImgPath")[0].childNodes[0].nodeValue;
        //alert(userHeadImgPath);
	    	var userId = xmlDoc.getElementsByTagName("U_id")[0].childNodes[0].nodeValue;
	    	//userGold = xmlDoc.getElementsByTagName("U_gold").childNodes[0].nodeValue;
	    	// userJob = xmlDoc.getElementsByTagName("U_job").childNodes[0].nodeValue;

	    	//元素属性设置
        document.getElementById("U_id").innerHTML = userId;
	    	document.getElementById("U_name").innerHTML = userName;
        //console.log("url(../" + userHeadImgPath+")");
	    	document.getElementById("U_headImg").style.backgroundImage = "url(../data/user/userHeadImg/" + userHeadImgPath+".jpg)";
	    	// document.getElementById("U_info").childNodes[0].childNodes[1].innerHTML = userGold;
	    	// document.getElementById("U_info").childNodes[0].childNodes[1].innerHTML = userJob;
	    }
    }
    xmlHttpRequest.open("GET",url,true);
    xmlHttpRequest.send();
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
  alert("暂无");
}
function question(){
  alert("出现问题 联系开发者 QQ2417802903");
}
function otherPage_login(){
  alert("请切换到主页进行重新登录");
}