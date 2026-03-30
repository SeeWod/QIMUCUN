var tag = "全部信息";
//var S_text = "";
//var S_roomType = "不限";
//var S_rentTime = "不限";
var S_order = "random";

// pageSize用于以此ajax传输goods个数
var pageSize = 9;
var sum_goods = 0;
var next_goods = 0;
var obtainedlist="0";

//var isOpen_helpView = false;
//body完成后渲染
window.onload = function(){rentingInitial();};

function rentingInitial(){
	screenInitial();
 //个人信息初始化
	frameInitial();
  getRecruitBoards();
  getOfficerNotice();
  
}
//排序

function goWorkStation(){
//  if(document.getElementById("U_id").innerHTML == '1000000000'){
   //账户控制
//    console.log(document.getElementById("U_id").innerHTML);
//    var r = window.confirm("没有建立您的个人账户无法进入个人空间");
//    if(r){
//      document.getElementById("loginPart").style.display = "flex";
//      LP_page('LP_register');
//    }
//    return;
//  }else{
  	window.location.pathname="/html/workStation.html";

//	}
}
function getRecruitBoards(){
	var xmlHttpRequest = createXmlHttpRequest();
	var url = "/cgi-bin/workStation/getRecruitBoards.php";
	xmlHttpRequest.onreadystatechange=function(){
     if(xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200){
		    var xmlDoc = xmlHttpRequest.responseXML;
		    console.log(xmlDoc.getElementsByTagName("ORB_control")[0].childNodes[0].nodeValue);
		    var ORBs = xmlDoc.getElementsByTagName("ORB");
		    //one by one load
        var code="";
		    for(var i=0;i<ORBs.length;i++){
		    	// document.createElement();
		    	var ORB_id = xmlDoc.getElementsByTagName("ORB_id")[i].childNodes[0].nodeValue;;
		    	var ORB_name = xmlDoc.getElementsByTagName("ORB_name")[i].childNodes[0].nodeValue;
		    	var ORB_content = xmlDoc.getElementsByTagName("ORB_content")[i].childNodes[0].nodeValue;
		    	code += "<li onclick='applyTable_open(this)' id='"+ORB_id+"'>"+
						            "<h5>"+ORB_name+"</h5>"+
						            "<p>内容：</p>"+
						            "<textarea>"+ORB_content+"</textarea>"+
						            "<button class='pop_submit'> MORE</button>"+
					            "</li>";
		    }
        document.getElementById("recruitUL").innerHTML = code;
      }
	}
	xmlHttpRequest.open("GET",url,true);
	xmlHttpRequest.send();
}
function getOfficerNotice(){
	var xmlHttpRequest = createXmlHttpRequest();
	var url = "/cgi-bin/workStation/getOfficerNotice.php";
	xmlHttpRequest.onreadystatechange=function(){
     if(xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200){
		    var xmlDoc = xmlHttpRequest.responseXML;
		    console.log(xmlDoc.getElementsByTagName("ON_control")[0].childNodes[0].nodeValue);
        document.getElementById("branch_text").innerHTML = xmlDoc.getElementsByTagName("ON_content")[0].childNodes[0].nodeValue;
      }
	}
	xmlHttpRequest.open("GET",url,true);
	xmlHttpRequest.send();
}

function applyTable_open(e){
	document.getElementById("applySelf_type").value = e.children[0].innerHTML;
 
  var xmlHttpRequest = createXmlHttpRequest();
	var url = "/cgi-bin/workStation/recruitDetail_get.php?ORB_id="+e.id;

	xmlHttpRequest.onreadystatechange = function(){
	    if(this.readyState == 4 && this.status == 200){
	    	var xmlDoc=xmlHttpRequest.responseXML;
		    console.log(xmlDoc.getElementsByTagName("ORB_control")[0].childNodes[0].nodeValue);
                                                                    
        document.getElementById("r_content").value = xmlDoc.getElementsByTagName("ORB_content")[0].childNodes[0].nodeValue;
        document.getElementById("r_require").value = xmlDoc.getElementsByTagName("ORB_require")[0].childNodes[0].nodeValue;
        document.getElementById("r_reward").value = xmlDoc.getElementsByTagName("ORB_reward")[0].childNodes[0].nodeValue;
     	  document.getElementById("applyPage").style.display = "block";
    
    }
  }
  xmlHttpRequest.open("GET",url,false);
  xmlHttpRequest.send();
}
function applyTable_close(){
	document.getElementById("applyPage").style.display = "none";

	document.getElementById("applySelf_name").value = "";
	document.getElementById("applySelf_academy").value = "";
	document.getElementById("applySelf_major").value = "";
	document.getElementById("applySelf_contact").value = "";
	document.getElementById("applySelf_type").value = "";
	document.getElementById("applySelf_evaluation").value = "";
 
	document.getElementById("r_content").value = "";
	document.getElementById("r_require").value = "";
	document.getElementById("r_content").value = "";

}


function AT_publich(){
	//检查表单是否填写完成
	if(!(/^.{1,10}$/.test(AT_name))){
	   alert("请输入1-10位字符作为您的 '名称' ");
	   return;
	}else if(!(/^.{1,20}$/.test(AT_academy))){
	   alert("请输入1-20位字符作为您的 '学院名称' ");
	   return;
	}else if(!(/^.{1,20}$/.test(AT_major))){
	   alert("请输入1-20位字符作为您的 '专业名称' ");
	   return;
	}else if(!(/^.{1,20}$/.test(AT_contact))){
	   alert("请输入1-20位字符作为您的 '联系方式' ");
	   return;
	}else if(!(/^.{1,10}$/.test(AT_type))){
	   alert("请输入1-10位字符作为您申请的事务员 '名称' ");
	   return;
	}else if(!(/^.{1,}$/s.test(AT_evaluation))){
	   alert("'个人评价'可以从技能、性格等出发。不能为空 ");
	   return;
	}

	//制造表单数据
	var formdata = new FormData();
	// var G_publisher 通过后台 会话 获取
	// var G_pTime 后台获取;
	var AT_name = document.getElementById('applySelf_name').value;
	var AT_academy = document.getElementById('applySelf_academy').value;
	var AT_major = document.getElementById('applySelf_major').value;
	var AT_contact = document.getElementById('applySelf_contact').value;
	var AT_type = document.getElementById('applySelf_type').value;
	var AT_evaluation = document.getElementById('applySelf_evaluation').value;

	formdata.append("AT_name",AT_name);
	formdata.append("AT_academy",AT_academy);
	formdata.append("AT_major",AT_major);
	formdata.append("AT_contact",AT_contact);
	formdata.append("AT_type",AT_type);
	formdata.append("AT_evaluation",AT_evaluation);

	var url = "/cgi-bin/joinTeam/AT_publish.php";
	var xmlHttpRequest = createXmlHttpRequest();
	xmlHttpRequest.onreadystatechange = function(){
		if (xmlHttpRequest.readyState==4 && xmlHttpRequest.status==200){
        alert(xmlHttpRequest.responseText);
        document.getElementById("AddPage_form").reset();
    	}
	}
  	//console.log(formdata);
	xmlHttpRequest.open("post",url,true);
	xmlHttpRequest.setRequestHeader("Content", "multipart/form-data");
	xmlHttpRequest.send(formdata);
}
function myApply_get(){  
  var xmlHttpRequest = createXmlHttpRequest();
	var url = "/cgi-bin/workStation/myApply_get.php";

	xmlHttpRequest.onreadystatechange = function(){
	    if(this.readyState == 4 && this.status == 200){
	    	var xmlDoc=xmlHttpRequest.responseXML;
		    console.log(xmlDoc.getElementsByTagName("AT_control")[0].childNodes[0].nodeValue);
        document.getElementById("applySelf_name").value = xmlDoc.getElementsByTagName("AT_name")[0].childNodes[0].nodeValue;
  	  	document.getElementById("applySelf_major").value = xmlDoc.getElementsByTagName("AT_major")[0].childNodes[0].nodeValue;
	  	  document.getElementById("applySelf_academy").value = xmlDoc.getElementsByTagName("AT_academy")[0].childNodes[0].nodeValue;
        document.getElementById("applySelf_contact").value = xmlDoc.getElementsByTagName("AT_contact")[0].childNodes[0].nodeValue;
  	  	document.getElementById("applySelf_type").value = xmlDoc.getElementsByTagName("AT_type")[0].childNodes[0].nodeValue;
	  	  document.getElementById("applySelf_evaluation").value = xmlDoc.getElementsByTagName("AT_evaluation")[0].childNodes[0].nodeValue;
                                                                    
        document.getElementById("r_content").value = xmlDoc.getElementsByTagName("AT_content")[0].childNodes[0].nodeValue;
        document.getElementById("r_require").value = xmlDoc.getElementsByTagName("AT_require")[0].childNodes[0].nodeValue;
        document.getElementById("r_reward").value = xmlDoc.getElementsByTagName("AT_reward")[0].childNodes[0].nodeValue;
     	  document.getElementById("applyPage").style.display = "block";
    
    }
  }
  xmlHttpRequest.open("GET",url,false);
  xmlHttpRequest.send();
}
