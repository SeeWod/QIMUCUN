window.onload = function(){
  ViewInitial();
  frameInitial();
  setInterival(getMail,2000);
  //失败原因 无法获取SESSION 堵塞
};
$(document).ready(function(){
  $("#envelop").hover(function(){
    $("#acceptB").css({"opacity":"0"});
  },function(){
  	$("#acceptB").css({"opacity":"1"});
  });
});
//$(document).ready(function(){
//  getMail();
//});

function sendMail_Deal(){
	if(document.getElementById("acceptB").innerHTML == "send"){
				var xmlHttpRequest = createXmlHttpRequest();	
				var url = "/cgi-bin/mailBox/siteMailToS.php";
				var SM_receiver = "2038204108";
				var SM_content = document.getElementById("eContent").value;		

				xmlHttpRequest.onreadystatechange=function(){
				  if (xmlHttpRequest.readyState==4 && xmlHttpRequest.status==200){
				  console.log(xmlHttpRequest.responseText);
				        //显示更换
				  }
				}
				//输入格式判断
				if(SM_content.length > 500){
					window.alert(SM_content.length + "/500 邮件内容保持在500字以内哦！");
					return;
				}else{
					xmlHttpRequest.open("post",url,false);
					xmlHttpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
					xmlHttpRequest.send("SM_receiver=" + SM_receiver + "&SM_content="+ SM_content);
				}
	}else{
				var xmlHttpRequest = createXmlHttpRequest();	
				var url = "/cgi-bin/mailBox/siteMailDeal.php";
				var SM_id = document.getElementById("mail_id").innerHTML;	

				xmlHttpRequest.onreadystatechange=function(){
				  if (xmlHttpRequest.readyState==4 && xmlHttpRequest.status==200){
				  	console.log(xmlHttpRequest.responseText);
				  	document.getElementById("mail_id").innerHTML = "0";
	  				document.getElementById("hello").innerHTML = "FOR 站长,";
	  				document.getElementById("hello2").innerHTML = "THE MESSAGE:";
	  				document.getElementById("eContent").value = "";
            document.getElementById("acceptB").innerHTML = "send";
            document.getElementById("mailBox_tip").innerHTML = "SEND A MESSAGE &nbsp ！";
	  				getMail();
				        //显示更换
				  }
				}
				//输入格式判断
				xmlHttpRequest.open("post",url,false);
				xmlHttpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
				xmlHttpRequest.send("SM_id=" + SM_id);
	}
}

function getMail(){
	var xmlHttpRequest = createXmlHttpRequest();	
	var last_SM_id = document.getElementById("mail_id").innerHTML;	
//  var SM_receiver	= document.getElementById("mail_id").innerHTML;
	xmlHttpRequest.onreadystatechange=function(){
	  if (xmlHttpRequest.readyState==4 && xmlHttpRequest.status==200){
	  	var xmlDoc = xmlHttpRequest.responseXML;
	  	console.log(xmlDoc.getElementsByTagName("SM_control")[0].childNodes[0].nodeValue);
	  	document.getElementById("mail_id").innerHTML = xmlDoc.getElementsByTagName("SM_id")[0].childNodes[0].nodeValue;
	  	document.getElementById("hello").innerHTML = "HELLO "+ document.getElementById("U_name").innerHTML+",";
	  	document.getElementById("hello2").innerHTML = "YOUR MESSAGE:";
      if(xmlDoc.getElementsByTagName("SM_content")[0].hasChildNodes()){
	  	  document.getElementById("eContent").value = xmlDoc.getElementsByTagName("SM_content")[0].childNodes[0].nodeValue;
      }
      document.getElementById("acceptB").innerHTML = "accept";
      document.getElementById("mailBox_tip").innerHTML = "YOU HAVE A MESSAGE &nbsp ！";
	  }
	}
	//输入格式判断

	xmlHttpRequest.open("GET","/cgi-bin/mailBox/siteMailToB.php?last_SM_id=" + last_SM_id,true);
	xmlHttpRequest.send();
}