window.onload = function(){
  screenInitial();
  frameInitial()
  info_load();
  loadColleges();
};
function info_load(){
	var xmlHttpRequest = createXmlHttpRequest();
	var url = "/cgi-bin/self/self_InfoLoad.php";

	xmlHttpRequest.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	    	var xmlDoc=xmlHttpRequest.responseXML;

	    	document.getElementById("info_id").innerHTML = getCookie("id");
	    	document.getElementById("info_name").innerHTML = decodeURI(getCookie("U_name"));
	    	document.getElementById("info_headImg").src = "../data/user/userHeadImg/"+getCookie("U_headImg")+".jpg";

        document.getElementById("info_phone").innerHTML = xmlDoc.getElementsByTagName("U_phone")[0].childNodes[0].nodeValue;
	    	document.getElementById("info_college").innerHTML = xmlDoc.getElementsByTagName("U_college")[0].childNodes[0].nodeValue;
	    	if(xmlDoc.getElementsByTagName("U_sid")[0].hasChildNodes()){
	    		document.getElementById("info_sid").innerHTML = xmlDoc.getElementsByTagName("U_sid")[0].childNodes[0].nodeValue;
	    	}else{
	    		document.getElementById("info_sid").innerHTML = "未绑定";
	    	}
	    	document.getElementById("data_officer").innerHTML = xmlDoc.getElementsByTagName("U_officer")[0].childNodes[0].nodeValue;
	    }
    }
    xmlHttpRequest.open("GET",url,true);
    xmlHttpRequest.send();
}

function close_alterPage(){
	document.getElementById("alter_wrap").style.display = "none";
	document.getElementById("alter_campus").style.display = "none";
	document.getElementById("alter_password").style.display = "none";
	document.getElementById("alter_name").style.display = "none";
	document.getElementById("alter_phone").style.display = "none";
	document.getElementById("cropper_module").style.display = "none";

	closeColleges();
}
function nav_alterPage(str){
	document.getElementById("alter_wrap").style.display = "flex";
	switch(str){
	case 'campus':
		document.getElementById("alter_campus").style.display = "block";
		break;
	case 'password':
		document.getElementById("alter_password").style.display = "block";
		break;
	case 'name':
		document.getElementById("alter_name").style.display = "block";
		break;
	case 'phone':
		document.getElementById("alter_phone").style.display = "block";
		break;
	case 'headImg':
		document.getElementById("cropper_module").style.display = "block";
		break;
	}
}


//----------学校更换相关-------------------------------------------------------------------------
//放到frame frame主管左侧栏
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
	    	document.getElementById("colleges").innerHTML = html;
	    }
    }
    xmlHttpRequest.open("GET",url,true);
    xmlHttpRequest.send();
}
function openColleges(){
	document.getElementById("colleges").style.display = "block";
	document.getElementById("closeCollegesB").style.display = "block";
}
function closeColleges(){
		document.getElementById("colleges").style.display = "none";
		var lis = document.getElementById("colleges").children;
		for(var i=0;i<lis.length;i++){
			lis[i].style.display = "none";
		}
		document.getElementById("closeCollegesB").style.display = "none";
}
function filterCollege(e){
	var regExp = new RegExp(".*"+e.value+".*");
	var lis = document.getElementById("colleges").children;

	for(var i=0;i<lis.length;i++){
		if(regExp.test(lis[i].innerHTML)){
			lis[i].style.display = "block";
		}else{
			lis[i].style.display = "none";
		}
	}
}
function setCollegeValue(e){
	document.getElementById("a_college").value = e.innerHTML;
	closeColleges();
}
//----------修改相关-------------------------------------------------------------------------

function updateCampus(){
	var xmlHttpRequest = createXmlHttpRequest();
	var U_college = document.getElementById("a_college").value;
	var U_sid = document.getElementById("a_sid").value;

	var url = "/cgi-bin/self/updateCampus.php?U_college="+U_college+"&U_sid="+U_sid;
	xmlHttpRequest.onreadystatechange=function(){
    if(xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200){
    	alert(xmlHttpRequest.responseText);
    	if(xmlHttpRequest.responseText == "修改成功"){
    		close_alterPage();
    	}
    }
	}
	xmlHttpRequest.open("GET",url,true);
	xmlHttpRequest.send();

}

function updateName(){
	var xmlHttpRequest = createXmlHttpRequest();
	var U_name = document.getElementById("a_name").value;

	var url = "/cgi-bin/self/updateName.php?U_name="+U_name;
	xmlHttpRequest.onreadystatechange=function(){
    if(xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200){
    	alert(xmlHttpRequest.responseText);
    	if(xmlHttpRequest.responseText == "修改成功"){
    		close_alterPage();
    	}
    }
	}
	xmlHttpRequest.open("GET",url,true);
	xmlHttpRequest.send();

}
function updatePhone(){
	var xmlHttpRequest = createXmlHttpRequest();
	var U_phone = document.getElementById("a_phone").value;

	var url = "/cgi-bin/self/updatePhone.php?U_phone="+U_phone;
	xmlHttpRequest.onreadystatechange=function(){
    if(xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200){
    	alert(xmlHttpRequest.responseText);
    	if(xmlHttpRequest.responseText == "修改成功"){
    		close_alterPage();
    	}
    }
	}
	xmlHttpRequest.open("GET",url,true);
	xmlHttpRequest.send();

}

function updatePassword(){
	var xmlHttpRequest = createXmlHttpRequest();
	var U_oldPassword = document.getElementById("a_oldPassword").value;
	var U_newPassword = document.getElementById("a_newPassword").value;

	var url = "/cgi-bin/self/updatePassword.php?U_oldPassword="+U_oldPassword+"&U_newPassword="+U_newPassword;
	xmlHttpRequest.onreadystatechange=function(){
    if(xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200){
    	alert(xmlHttpRequest.responseText);
    	if(xmlHttpRequest.responseText == "修改成功"){
    		close_alterPage();
    	}
    }
	}
	xmlHttpRequest.open("GET",url,true);
	xmlHttpRequest.send();

}
//----------裁剪图片相关-------------------------------------------------------------------------
function selectFile(e){
	var file = document.getElementById("headImgFile");
	file.click();
}
function copperImg(e){
	var file = e.files[0];
	var reader = new FileReader();
  //console.log(pictureIndex);
	reader.addEventListener('load',function(){cropperStart(reader.result)});
	reader.readAsDataURL(file);
}




























