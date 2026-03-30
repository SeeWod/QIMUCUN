function login_Visiter(){
//	var xmlHttpRequest = createXmlHttpRequest();	
//	var url = "/cgi-bin/login.php";

//	var U_id = 0;
//	var U_password = 0;

//	xmlHttpRequest.onreadystatechange=function(){
//	    if (xmlHttpRequest.readyState==4 && xmlHttpRequest.status==200){
	    	// document.getElementById("LPL_return").innerHTML = xmlHttpRequest.responseText;
	    	//页面初始化
	var xmlHttpRequest = createXmlHttpRequest();	
	var url = "/cgi-bin/login.php";
  
  var U_id = "1000000000";
  var U_password = "000000";
  var freeLogin = false;

	xmlHttpRequest.onreadystatechange=function(){
	    if (xmlHttpRequest.readyState==4 && xmlHttpRequest.status==200){
	    	console.log(xmlHttpRequest.responseText);
	    	if(xmlHttpRequest.responseText =="-登陆成功"){
   	        if(window.innerWidth < 500){
    		      LP_page_phone("main");
              transactionCommonInitial();
      	    }else{
      		    //电脑端
              document.getElementById("loginPart").style.display = "none";
              mainInitial();
      	    }
	    	}
	    }
	}
	xmlHttpRequest.open("post",url,false);
	xmlHttpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlHttpRequest.send("U_id=" + U_id + "&U_password=" + U_password + "&freeLogin=" + freeLogin);
}
function login(auto){
	var xmlHttpRequest = createXmlHttpRequest();	
	var url = "/cgi-bin/login.php";
  
  if(auto){
    //cookie登录
    var U_id = getCookie("id");
	  var U_password = getCookie("token").replace("/+/g","%2B");
    U_password = U_password.replace("/&/g","%26");
    var freeLogin = true;
  }else{
	  var U_id = document.getElementById("login_U_id").value;
	  var U_password = document.getElementById("login_U_password").value.replaceAll("+","%2B");
    U_password = U_password.replaceAll("&","%26");
//     console.log(U_password);
    var freeLogin = confirm("设置该账号为默认登录账户？");
  }

	xmlHttpRequest.onreadystatechange=function(){
	    if (xmlHttpRequest.readyState==4 && xmlHttpRequest.status==200){
	    	document.getElementById("LPL_return").innerHTML = xmlHttpRequest.responseText;
	    	if(xmlHttpRequest.responseText =="-登陆成功"){
            if(window.innerWidth < 500){
    		      document.getElementById("LP_login").style.display = "none";
              transactionCommonInitial();
      	    }else{
      		    //电脑端
              document.getElementById("loginPart").style.display = "none";
              mainInitial();
      	    }
	    	}
	    }
	}
	xmlHttpRequest.open("post",url,false);
	xmlHttpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlHttpRequest.send("U_id=" + U_id + "&U_password=" + U_password + "&freeLogin=" + freeLogin);
}
function cLogin(){
	var xmlHttpRequest = createXmlHttpRequest();	
	var url = "/cgi-bin/login.php";
  
  var U_id = document.getElementById("cLogin_U_id").value;
  var U_password = document.getElementById("cLogin_U_password").value.replaceAll("+","%2B");
  U_password = U_password.replaceAll("&","%26");
	//   console.log(U_password);
  var freeLogin = confirm("设置该账号为默认登录账户？");

	xmlHttpRequest.onreadystatechange=function(){
	    if (xmlHttpRequest.readyState==4 && xmlHttpRequest.status==200){
	    	document.getElementById("LPL_return").innerHTML = xmlHttpRequest.responseText;
	    	if(xmlHttpRequest.responseText =="-登陆成功"){
            if(window.innerWidth < 500){
    		      document.getElementById("LP_cLogin").style.display = "none";
              transactionCommonInitial();
      	    }else{
      		    //电脑端
              document.getElementById("loginPart").style.display = "none";
              transactionCommonInitial();
      	    }
	    	}
	    }
	}
	xmlHttpRequest.open("post",url,false);
	xmlHttpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlHttpRequest.send("U_id=" + U_id + "&U_password=" + U_password + "&freeLogin=" + freeLogin);
}
function register(){
	var xmlHttpRequest = createXmlHttpRequest();	
	var url = "/cgi-bin/register.php";

	var R_id = document.getElementById("register_R_id").value;
	var R_name = document.getElementById("register_R_name").value;
	var R_password = document.getElementById("register_R_password").value;
	var R_confirm = document.getElementById("register_R_confirm").value;

	var R_phone = document.getElementById("register_R_phone").value;
	var R_school = document.getElementById("register_R_school").value;
 
	xmlHttpRequest.onreadystatechange=function(){
    if (xmlHttpRequest.readyState==4 && xmlHttpRequest.status==200){
       window.alert(xmlHttpRequest.responseText);
		        //显示更换
       if(xmlHttpRequest.responseText=="注册成功"){
       //清空内容
       	document.getElementById("register_R_id").value = "";
        document.getElementById("register_R_name").value = "";
        document.getElementById("register_R_password").value = "";
        document.getElementById("register_R_confirm").value = "";
        document.getElementById("register_R_phone").value = "";
        document.getElementById("register_R_school").value = "";
       }
      }
		}

	//输入格式判断
  if(!(/^[1-9][0-9]{9,10}$/.test(R_id))){
    alert("请输入10-11位数字作为您的ID");
    return;
  }else if(!(/^.{2,8}$/.test(R_name))){
    //2-8位字符
    alert("请输入2-8位字符作为您的昵称");
    return;
  }else if(!(/^.{6,12}$/.test(R_password))){
    alert("请输入6-12位字符作为您的密码");
    return;
  }else if(R_password != R_confirm){
    alert("重新确认密码输入是否正确");
    return;
  }else if(!(/^1[3456789]\d{9}$/.test(R_phone))){
    alert("手机号书写错误");
    return;
  }else{
		xmlHttpRequest.open("post",url,false);
		xmlHttpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlHttpRequest.send("R_id=" + R_id + "&R_name=" + R_name  + "&R_password=" + R_password + "&R_phone="+ R_phone +"&R_school="+ R_school);
	}
}
function changePassword(){
	var xmlHttpRequest = createXmlHttpRequest();	
	var url = "/cgi-bin/cPassword.php";

	var R_id = document.getElementById("changePassword_U_id").value;
	var R_password = document.getElementById("changePassword_U_password").value.replaceAll("+","%2B");;
  U_password = U_password.replaceAll("&","%26");
	var R_confirm = document.getElementById("changePassword_U_confirm").value;

	var R_phone = document.getElementById("changePassword_U_phone").value;

	//输入格式判断
	if(R_password != R_confirm){
		window.alert("两次输入密码不相同");
		return;
	}else{
		xmlHttpRequest.onreadystatechange=function()
		{
		    if (xmlHttpRequest.readyState==4 && xmlHttpRequest.status==200){
		        window.alert(xmlHttpRequest.responseText);
		        //显示更换
		    }
		}
		xmlHttpRequest.open("post",url,false);
		xmlHttpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlHttpRequest.send("R_id=" + R_id + "&R_password=" + R_password + "&R_phone="+ R_phone);
	}
}

//login模块页面切换
function LP_page(str){
	document.getElementById("LP_main").style.display = "none";
	document.getElementById("LP_login").style.display = "none";
//	document.getElementById("LP_cLogin").style.display = "none";
	document.getElementById("LP_register").style.display = "none";
	document.getElementById("LP_introduce").style.display = "none";
	document.getElementById("LP_changePassword").style.display = "none";
	switch(str){
		case "LP_main":
			document.getElementById("LP_main").style.display = "block";
			break;
		case "LP_register":
			document.getElementById("LP_register").style.display = "block";
			break;
		case "LP_login":
			document.getElementById("LP_login").style.display = "block";
			break;
//		case "LP_cLogin":
//			document.getElementById("LP_cLogin").style.display = "block";
//			break;	
		case "LP_changePassword":
			document.getElementById("LP_changePassword").style.display = "block";
			break;
		case "LP_introduce":
			document.getElementById("LP_introduce").style.display = "block";
			break;
	}
}
//
function headImgLogin(){
  clearCookie("PHPSESSID");
  window.location.pathname = "html/main.html";
}