var workStationName = "厦门理工学院";

window.onload = function(){workStationInitial();};

function workStationInitial(){
	screenInitial();
	frameInitial();
	workStationName = decodeURI(getCookie("U_college"));
 
  get_shortNotices();
  getOfficerNotice();
  getRecruitBoards();
  getOfficers();
  getSiteMails();
  getApplys();
	//workstation信息初始化
}
function pageNav(str){
	//此方法未来集合
	document.getElementById('between_organization').style.display = 'none';
	document.getElementById('between_mailBox').style.display = 'none';
	document.getElementById('between_notice').style.display = 'none';
	document.getElementById('between_customer').style.display = 'none';
	document.getElementById('between_account').style.display = 'none';
	switch(str){
	case 'organization':
		document.getElementById('between_organization').style.display = 'flex';
		break;
	case 'mailBox':
		document.getElementById('between_mailBox').style.display = 'flex';
		break;
	case 'notice':
		document.getElementById('between_notice').style.display = 'block';
		break;
	case 'customer':
		document.getElementById('between_customer').style.display = 'flex';
		break;
	case 'account':
		document.getElementById('between_account').style.display = 'none';
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
	    	document.getElementById("SC_colleges").innerHTML = html;
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
	closeColleges();d
}
// ------------------------------------广告栏-------------------------------------------------
function notice_addPage_open(){
	document.getElementById("notice_addPage").style.display = "block";

	document.getElementById("left_organization").style.display = "none";
	document.getElementById("left_mailBox").style.display = "none";
	document.getElementById("left_notice").style.display = "none";
	document.getElementById("left_customer").style.display = "none";
	document.getElementById("left_account").style.display = "none";

	document.getElementById("noticeAdd_closeB").style.display = "block";
}
function notice_addPage_close(){
	document.getElementById("notice_addPage").style.display = "none";

	document.getElementById("left_organization").style.display = "block";
	document.getElementById("left_mailBox").style.display = "block";
	document.getElementById("left_notice").style.display = "block";
	document.getElementById("left_customer").style.display = "block";
	document.getElementById("left_account").style.display = "block";

	document.getElementById("noticeAdd_closeB").style.display = "none";

}
function notice_detailPage_open(){
	document.getElementById("notice_detailPage").style.display = "block";

	document.getElementById("left_organization").style.display = "none";
	document.getElementById("left_mailBox").style.display = "none";
	document.getElementById("left_notice").style.display = "none";
	document.getElementById("left_customer").style.display = "none";
	document.getElementById("left_account").style.display = "none";

	document.getElementById("noticeDetail_closeB").style.display = "block";

}
function notice_detailPage_close(){
	document.getElementById("notice_detailPage").style.display = "none";

	document.getElementById("left_organization").style.display = "block";
	document.getElementById("left_mailBox").style.display = "block";
	document.getElementById("left_notice").style.display = "block";
	document.getElementById("left_customer").style.display = "block";
	document.getElementById("left_account").style.display = "block";

	document.getElementById("noticeDetail_closeB").style.display = "none";
}
function orgApply_open(){
	document.getElementById("orgPage_apply").style.display = "block";

	document.getElementById("left_organization").style.display = "none";
	document.getElementById("left_mailBox").style.display = "none";
	document.getElementById("left_notice").style.display = "none";
	document.getElementById("left_customer").style.display = "none";
	document.getElementById("left_account").style.display = "none";

	document.getElementById("orgApply_closeB").style.display = "block";
}
function orgApply_close(){
	document.getElementById("orgPage_apply").style.display = "none";

	document.getElementById("left_organization").style.display = "block";
	document.getElementById("left_mailBox").style.display = "block";
	document.getElementById("left_notice").style.display = "block";
	document.getElementById("left_customer").style.display = "block";
	document.getElementById("left_account").style.display = "block";

	document.getElementById("orgApply_closeB").style.display = "none";
}
function orgJoin_open(){
	document.getElementById("orgPage_join_detail").style.display = "block";

	document.getElementById("left_organization").style.display = "none";
	document.getElementById("left_mailBox").style.display = "none";
	document.getElementById("left_notice").style.display = "none";
	document.getElementById("left_customer").style.display = "none";
	document.getElementById("left_account").style.display = "none";

	document.getElementById("orgJoin_closeB").style.display = "block";
}
function orgJoin_close(){
	document.getElementById("orgPage_join_detail").style.display = "none";

	document.getElementById("left_organization").style.display = "block";
	document.getElementById("left_mailBox").style.display = "block";
	document.getElementById("left_notice").style.display = "block";
	document.getElementById("left_customer").style.display = "block";
	document.getElementById("left_account").style.display = "block";

	document.getElementById("orgJoin_closeB").style.display = "none";
 
  var ps = 	document.getElementsByName('permissionChecks');
	document.getElementById('officerJoin_id').value = "";
	document.getElementById('officerJoin_name').value = "";
  document.getElementById('officerJoin_academy').value = "";
  document.getElementById('officerJoin_major').value = "";
  document.getElementById('officerJoin_contact').value = "";
  document.getElementById('officerJoin_evaluation').value = "";
  for(var i=ps.length-1;i>=0;i--){
    ps[i].checked = false;
  }
}
function orgWork_open(){
	document.getElementById("orgPage_work").style.display = "block";

	document.getElementById("left_organization").style.display = "none";
	document.getElementById("left_mailBox").style.display = "none";
	document.getElementById("left_notice").style.display = "none";
	document.getElementById("left_customer").style.display = "none";
	document.getElementById("left_account").style.display = "none";

	document.getElementById("orgWork_closeB").style.display = "block";
}
function orgWork_close(){
	document.getElementById("orgPage_work").style.display = "none";

	document.getElementById("left_organization").style.display = "block";
	document.getElementById("left_mailBox").style.display = "block";
	document.getElementById("left_notice").style.display = "block";
	document.getElementById("left_customer").style.display = "block";
	document.getElementById("left_account").style.display = "block";
 
  document.getElementById("recruitPublish_name").value = "";                            
  document.getElementById("recruitPublish_content").value = "";
  document.getElementById("recruitPublish_require").value = "";
  document.getElementById("recruitPublish_reward").value = "";
  document.getElementById('P_or_D').innerHTML = "发布";

	document.getElementById("orgWork_closeB").style.display = "none";
}
function satistics_open(){
	document.getElementById("statistics").style.display = "block";
}
function satistics_close(){
	document.getElementById("statistics").style.display = "none";
}
var posterFile;
function noticePublish(){
	var NB_unit = document.getElementById('noticePublish_unit').value;
	var NB_contact = document.getElementById('noticePublish_contact').value;
	var NB_period = document.getElementById('noticePublish_period').value;
	var NB_sTime = 	document.getElementById('noticePublish_sTime').value;
	var NB_price = 	document.getElementById('noticePublish_fee').value;
	var NB_long = document.getElementById('noticePublish_long').value;
	var formdata = new FormData();

	formdata.append("NB_unit",NB_unit);
	formdata.append("NB_contact",NB_contact);
	formdata.append("NB_period",NB_period);
	formdata.append("NB_sTime",NB_sTime);
	formdata.append("NB_price",NB_price);
	formdata.append("NB_long",NB_long);
	formdata.append("poster",posterFile);
 
 	var xmlHttpRequest = createXmlHttpRequest();
	xmlHttpRequest.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
       alert(xmlHttpRequest.responseText);
       //清空;
       	document.getElementById('noticePublish_unit').value = "";
	      document.getElementById('noticePublish_contact').value = "";
	      document.getElementById('noticePublish_period').value = "";
	      document.getElementById('noticePublish_sTime').value = "";
	      document.getElementById('noticePublish_fee').value = "";
	      document.getElementById('noticePublish_long').value = "";
             
       	document.getElementById('posterFile').value = "";
	      document.getElementById('addPage_img').style.backgroundImage = "url(../img/workStation/noticeAdd.png)";
    }
  }
  
	var url = "/cgi-bin/workStation/noticePublish.php";
	xmlHttpRequest.open("POST",url,true);
	xmlHttpRequest.setRequestHeader("Content", "multipart/form-data");	
	xmlHttpRequest.send(formdata);
}
function get_shortNotices(){
  var xmlHttpRequest = createXmlHttpRequest();
	var url = "/cgi-bin/workStation/get_shortNotices.php";

	xmlHttpRequest.onreadystatechange = function() {
	    if(this.readyState == 4 && this.status == 200){
	    	var xmlDoc=xmlHttpRequest.responseXML;
        //console.log(xmlDoc.getElementsByTagName("NBn_control")[0].childNodes[0].nodeValue);
        //console.log(xmlDoc.getElementsByTagName("NBe_control")[0].childNodes[0].nodeValue);
        var NBns = xmlDoc.getElementsByTagName("NBn");
        var htmln ="";
        for(var i=0;i<NBns.length;i++){
          var otime = new Date(xmlDoc.getElementsByTagName("NBn_oTime")[i].childNodes[0].nodeValue);
          var ntime = new Date();
          var rDay = Math.ceil((otime - ntime)/(1000*60*60*24));
          //console.log(otime - ntime);
          htmln += "<li onclick='get_noticeDetail(this)' id='"+xmlDoc.getElementsByTagName("NBn_id")[i].childNodes[0].nodeValue +"'>"+
								      "<img src='../../data/notice/croImg/"+xmlDoc.getElementsByTagName("NBn_id")[i].childNodes[0].nodeValue+".jpg'>"+
								      "<div>"+
									      "<span class='notice_work_unit'>"+xmlDoc.getElementsByTagName("NBn_unit")[i].childNodes[0].nodeValue+"</span>"+
									      "<span class='notice_work_time'>"+rDay+"天</span>"+
								      "</div>"+
							    "</li>";
        }
	    	document.getElementById("notice_n").innerHTML = htmln;
        //e                                         
        var NBes = xmlDoc.getElementsByTagName("NBe");
        var htmle ="";
        for(var i=0;i<NBes.length;i++){
          htmle += "<li onclick='get_noticeDetail(this)' id='"+xmlDoc.getElementsByTagName("NBe_id")[i].childNodes[0].nodeValue+"'>"+
								      "<span class='notice_expired_unit'>"+xmlDoc.getElementsByTagName("NBe_unit")[i].childNodes[0].nodeValue+"</span>|"+
								      "<span class='notice_expired_period'>"+xmlDoc.getElementsByTagName("NBe_period")[i].childNodes[0].nodeValue+"</span>|"+
								      "<span class='notice_expired_price'>"+xmlDoc.getElementsByTagName("NBe_price")[i].childNodes[0].nodeValue+"</span>|"+
								      "<span class='notice_expired_overTime'>"+xmlDoc.getElementsByTagName("NBe_oTime")[i].childNodes[0].nodeValue+"</span>"+
							      	"<span class='notice_expired_more'>...</span>"+
							      "</li>"
        }
	    	document.getElementById("notice_e").innerHTML = htmle;                                           
	    }
    }
    xmlHttpRequest.open("GET",url,false);
    xmlHttpRequest.send();
}
function get_noticeDetail(e){
  var xmlHttpRequest = createXmlHttpRequest();
	var url = "/cgi-bin/workStation/getNoticeDetail.php?NB_id="+e.id;

	xmlHttpRequest.onreadystatechange = function(){
	    if(this.readyState == 4 && this.status == 200){
	    	var xmlDoc=xmlHttpRequest.responseXML;
		    console.log(xmlDoc.getElementsByTagName("NB_control")[0].childNodes[0].nodeValue);

		    //装载信息
		    document.getElementById("noticeDetail_id").innerHTML = xmlDoc.getElementsByTagName("NB_id")[0].childNodes[0].nodeValue;
				document.getElementById("noticeDetail_unit").innerHTML = xmlDoc.getElementsByTagName("NB_unit")[0].childNodes[0].nodeValue;
				document.getElementById("noticeDetail_contact").innerHTML = xmlDoc.getElementsByTagName("NB_contact")[0].childNodes[0].nodeValue;
				document.getElementById("noticeDetail_sTime").innerHTML = xmlDoc.getElementsByTagName("NB_sTime")[0].childNodes[0].nodeValue;
				document.getElementById("noticeDetail_oTime").innerHTML = xmlDoc.getElementsByTagName("NB_oTime")[0].childNodes[0].nodeValue;
				document.getElementById("noticeDetail_period").innerHTML = xmlDoc.getElementsByTagName("NB_period")[0].childNodes[0].nodeValue+"天";
				document.getElementById("noticeDetail_publisher").innerHTML = xmlDoc.getElementsByTagName("NB_publisher")[0].childNodes[0].nodeValue;
				document.getElementById("noticeDetail_pTime").innerHTML = xmlDoc.getElementsByTagName("NB_pTime")[0].childNodes[0].nodeValue;
				document.getElementById("noticeDetail_station").innerHTML = xmlDoc.getElementsByTagName("NB_station")[0].childNodes[0].nodeValue+"站";
				document.getElementById("noticeDetail_fee").innerHTML = xmlDoc.getElementsByTagName("NB_period")[0].childNodes[0].nodeValue+"元";  
        if(xmlDoc.getElementsByTagName("NB_long")[0].hasChildNodes()){
          document.getElementById("noticeDetail_long").innerHTML = xmlDoc.getElementsByTagName("NB_long")[0].childNodes[0].nodeValue;
        }else{
          document.getElementById("noticeDetail_long").innerHTML = "";
        } 
        //图片设置
        document.getElementById("noticeDetail_poster").src ="../../data/notice/srcImg/"+xmlDoc.getElementsByTagName("NB_id")[0].childNodes[0].nodeValue+".jpg";
        notice_detailPage_open();
    }
  }
  xmlHttpRequest.open("GET",url,false);
  xmlHttpRequest.send();
}
// poster---------------------------------------
function poster_selectFile(){
	var file = document.getElementById("posterFile");
	file.click();
}
function copperImg(e){
	var file = e.files[0];
	var reader = new FileReader();
  //console.log(pictureIndex);
	reader.addEventListener('load',function(){cropperStart(reader.result)});
	reader.readAsDataURL(file);
}

// 事务员就职公告---------------------------------------
function alter_work(){
	document.getElementById("popPage").style.display = "flex";
	document.getElementById("cs_workPage").style.display = "block";
}
function getOfficerNotice(){
	var xmlHttpRequest = createXmlHttpRequest();
	var url = "/cgi-bin/workStation/getOfficerNotice.php";
	xmlHttpRequest.onreadystatechange=function(){
     if(xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200){
		    var xmlDoc = xmlHttpRequest.responseXML;
		    console.log(xmlDoc.getElementsByTagName("ON_control")[0].childNodes[0].nodeValue);
        document.getElementById("worlNoticeContent").innerHTML = xmlDoc.getElementsByTagName("ON_content")[0].childNodes[0].nodeValue;
      }
	}
	xmlHttpRequest.open("GET",url,true);
	xmlHttpRequest.send();
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
		    	var ORB_id = xmlDoc.getElementsByTagName("ORB_id")[i].childNodes[0].nodeValue;
		    	var ORB_name = xmlDoc.getElementsByTagName("ORB_name")[i].childNodes[0].nodeValue;
		    	var ORB_content = xmlDoc.getElementsByTagName("ORB_content")[i].childNodes[0].nodeValue;
		    	code += "<li onclick='recruitDetail_get(this)' id='"+ORB_id+"'>"+
						            "<h5>"+ORB_name+"</h5>"+
						            "<p>内容：</p>"+
						            "<textarea>"+ORB_content+"</textarea>"+
					            "</li>";
		    }
        document.getElementById("recruitUL").innerHTML = code;
      }
	}
	xmlHttpRequest.open("GET",url,true);
	xmlHttpRequest.send();
}
function modifyWorkNotice(){
  var xmlHttpRequest = createXmlHttpRequest();
  var content = document.getElementById("worlNoticeContent").value;
	var url = "/cgi-bin/workStation/modify_workNotice.php?content="+content;

	xmlHttpRequest.onreadystatechange = function(){
	    if(this.readyState == 4 && this.status == 200){
	    	alert(xmlHttpRequest.responseText);                                          
	    }
    }
    xmlHttpRequest.open("GET",url,false);
    xmlHttpRequest.send();
}

function recruitPublish(){
	var ORB_name = document.getElementById('recruitPublish_name').value;
	var ORB_content = document.getElementById('recruitPublish_content').value;
	var ORB_require = document.getElementById('recruitPublish_require').value;
	var ORB_reward = 	document.getElementById('recruitPublish_reward').value;
	var formdata = new FormData();

	formdata.append("ORB_name",ORB_name);
	formdata.append("ORB_content",ORB_content);
	formdata.append("ORB_require",ORB_require);
	formdata.append("ORB_reward",ORB_reward);
 
 	var xmlHttpRequest = createXmlHttpRequest();
	xmlHttpRequest.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
       alert(xmlHttpRequest.responseText);
       //清空;
       	document.getElementById('recruitPublish_name').value = "";
	      document.getElementById('recruitPublish_content').value = "";
	      document.getElementById('recruitPublish_require').value = "";
	      document.getElementById('recruitPublish_reward').value = "";
        getRecruitBoards();
    }
  }
  
	var url = "/cgi-bin/workStation/recruitPublish.php";
	xmlHttpRequest.open("POST",url,true);
	xmlHttpRequest.setRequestHeader("Content", "multipart/form-data");	
	xmlHttpRequest.send(formdata);
}
function recruit_PD(){
  var s = document.getElementById('P_or_D').innerHTML;
  if(s == "发布"){
    recruitPublish();
  }else if(s == "删除"){
    recruitDelete();
  }
}
function recruitDelete(){
 	var xmlHttpRequest = createXmlHttpRequest();
	xmlHttpRequest.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
		    console.log(xmlHttpRequest.responseText);
        orgWork_close();
        getRecruitBoards();
    }
  }
  
	var url = "/cgi-bin/workStation/recruitBoard_delete.php?ORB_id="+document.getElementById("recruitPublish_id").innerHTML;
	xmlHttpRequest.open("GET",url,true);
	xmlHttpRequest.send();
}
function recruitDetail_get(e){
 	var xmlHttpRequest = createXmlHttpRequest();
	xmlHttpRequest.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
	    	var xmlDoc=xmlHttpRequest.responseXML;
		    console.log(xmlDoc.getElementsByTagName("ORB_control")[0].childNodes[0].nodeValue);
        document.getElementById("recruitPublish_id").innerHTML = e.id;   
        document.getElementById("recruitPublish_name").value = xmlDoc.getElementsByTagName("ORB_name")[0].childNodes[0].nodeValue;                            
        document.getElementById("recruitPublish_content").value = xmlDoc.getElementsByTagName("ORB_content")[0].childNodes[0].nodeValue;
        document.getElementById("recruitPublish_require").value = xmlDoc.getElementsByTagName("ORB_require")[0].childNodes[0].nodeValue;
        document.getElementById("recruitPublish_reward").value = xmlDoc.getElementsByTagName("ORB_reward")[0].childNodes[0].nodeValue;
        document.getElementById('P_or_D').innerHTML = "删除";
        orgWork_open();
    }
  }
  
	var url = "/cgi-bin/workStation/recruitDetail_get.php?ORB_id="+e.id;
	xmlHttpRequest.open("GET",url,true);
	xmlHttpRequest.send();

}
function officerJoinPublish(){
	var id = document.getElementById('officerJoin_id').value;
	var name = document.getElementById('officerJoin_name').value;
	var academy = document.getElementById('officerJoin_academy').value;
	var major = document.getElementById('officerJoin_major').value; 
	var contact = document.getElementById('officerJoin_contact').value;
	var evaluation = 	document.getElementById('officerJoin_evaluation').value;
  var ps = 	document.getElementsByName('permissionChecks');
 	var permission = 	"1";
  for(var i=ps.length-1;i>=0;i--){
    if(ps[i].checked){
      permission = "1"+permission;
    }else{
      permission = "0"+permission;
    }
  }
  console.log("permission:"+permission);
  
  var formdata = new FormData();
	formdata.append("id",id);
	formdata.append("name",name);
	formdata.append("academy",academy);
	formdata.append("major",major);
	formdata.append("contact",contact);	
	formdata.append("evaluation",evaluation);
	formdata.append("permission",permission);
 
 	var xmlHttpRequest = createXmlHttpRequest();
	xmlHttpRequest.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
       alert(xmlHttpRequest.responseText);
       //清空;
       	document.getElementById('officerJoin_id').value = "";
       	document.getElementById('officerJoin_name').value = "";
	      document.getElementById('officerJoin_academy').value = "";
	      document.getElementById('officerJoin_major').value = "";
	      document.getElementById('officerJoin_contact').value = "";
	      document.getElementById('officerJoin_evaluation').value = "";
        for(var i=ps.length-1;i>=0;i--){
          ps[i].checked = false;
        }
      }
    }
  
	var url = "/cgi-bin/workStation/officerJoin.php";
	xmlHttpRequest.open("POST",url,true);
	xmlHttpRequest.setRequestHeader("Content", "multipart/form-data");	
	xmlHttpRequest.send(formdata);
}
function getOfficers(){
	var xmlHttpRequest = createXmlHttpRequest();
	var url = "/cgi-bin/workStation/getOfficer.php";
	xmlHttpRequest.onreadystatechange=function(){
     if(xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200){
		    var xmlDoc = xmlHttpRequest.responseXML;
		    console.log(xmlDoc.getElementsByTagName("O_control")[0].childNodes[0].nodeValue);
        console.log(xmlDoc.getElementsByTagName("O_Wcontrol")[0].childNodes[0].nodeValue);
		    var Os = xmlDoc.getElementsByTagName("O");
		    //one by one load
        var code="<tr><th></th><th>姓名</th><th>职务</th><th></th></tr>";
		    for(var i=0;i<Os.length;i++){
		    	// document.createElement();
		    	var O_id = xmlDoc.getElementsByTagName("O_id")[i].childNodes[0].nodeValue;;
		    	var O_name = xmlDoc.getElementsByTagName("O_name")[i].childNodes[0].nodeValue;
		    	var O_permission = xmlDoc.getElementsByTagName("O_permission")[i].childNodes[0].nodeValue;
          var O_headImg = xmlDoc.getElementsByTagName("O_headImg")[i].childNodes[0].nodeValue;
		    	code += "<tr id = '"+O_id+"' class='member_col' onclick='getOfficerDetail(this)'>"+
                    "<td><img src='../../data/user/userHeadImg/"+O_headImg+".jpg'></td>"+
                    "<td>"+O_name+"</td>"+
                    "<td>"+O_permission+"</td>"+
                    "<td><img src='../img/more1.png'></td>"+
                   "</tr>";
		    }
        document.getElementById("siteMember").innerHTML = code;
      }
	}
	xmlHttpRequest.open("GET",url,true);
	xmlHttpRequest.send();
}
function getOfficerDetail(e){
  var xmlHttpRequest = createXmlHttpRequest();
	var url = "/cgi-bin/workStation/officerDetail_get.php?O_id="+e.id;

	xmlHttpRequest.onreadystatechange = function(){
	    if(this.readyState == 4 && this.status == 200){
	    	var xmlDoc=xmlHttpRequest.responseXML;
		    console.log(xmlDoc.getElementsByTagName("O_Wcontrol")[0].childNodes[0].nodeValue);
        console.log(xmlDoc.getElementsByTagName("O_Ucontrol")[0].childNodes[0].nodeValue);

		    document.getElementById("officerJoin_id").value = xmlDoc.getElementsByTagName("O_id")[0].childNodes[0].nodeValue;
				document.getElementById("officerJoin_name").value = xmlDoc.getElementsByTagName("O_name")[0].childNodes[0].nodeValue;
				document.getElementById("officerJoin_academy").value = xmlDoc.getElementsByTagName("O_academy")[0].childNodes[0].nodeValue;
				document.getElementById("officerJoin_major").value = xmlDoc.getElementsByTagName("O_major")[0].childNodes[0].nodeValue;
				document.getElementById("officerJoin_contact").value = xmlDoc.getElementsByTagName("O_contact")[0].childNodes[0].nodeValue;
				document.getElementById("officerJoin_evaluation").value = xmlDoc.getElementsByTagName("O_evaluation")[0].childNodes[0].nodeValue;
//				document.getElementById("noticeDetail_publisher").innerHTML = xmlDoc.getElementsByTagName("NB_publisher")[0].childNodes[0].nodeValue;
//				document.getElementById("noticeDetail_pTime").innerHTML = xmlDoc.getElementsByTagName("NB_pTime")[0].childNodes[0].nodeValue;
//				document.getElementById("noticeDetail_station").innerHTML = xmlDoc.getElementsByTagName("NB_station")[0].childNodes[0].nodeValue+"站";
//				document.getElementById("noticeDetail_fee").innerHTML = xmlDoc.getElementsByTagName("NB_period")[0].childNodes[0].nodeValue+"元";           
//        document.getElementById("noticeDetail_long").innerHTML = xmlDoc.getElementsByTagName("NB_long")[0].childNodes[0].nodeValue;
        var ps = 	document.getElementsByName('permissionChecks'); 
        var Ops = xmlDoc.getElementsByTagName("O_permission")[0].childNodes[0].nodeValue;
        if(Ops.substr(-6,1) == "1"){ps[0].checked = "true";}
        if(Ops.substr(-5,1) == "1"){ps[1].checked = "true";}
        if(Ops.substr(-4,1) == "1"){ps[2].checked = "true";}
        if(Ops.substr(-3,1) == "1"){ps[3].checked = "true";}
        if(Ops.substr(-2,1) == "1"){ps[4].checked = "true";}
        orgJoin_open();
    }
  }
  xmlHttpRequest.open("GET",url,false);
  xmlHttpRequest.send();
}

function getSiteMails(){
	var xmlHttpRequest = createXmlHttpRequest();
  var W_station = document.getElementById("workPosition").innerHTML; 
	var url = "/cgi-bin/workStation/siteMails_get.php?W_station=" + W_station;
	xmlHttpRequest.onreadystatechange=function(){
     if(xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200){
		    var xmlDoc = xmlHttpRequest.responseXML;
		    console.log(xmlDoc.getElementsByTagName("SM_control")[0].childNodes[0].nodeValue);
        //console.log(xmlDoc.getElementsByTagName("SM_Ucontrol")[0].childNodes[0].nodeValue);
        document.getElementById("siteMail_sum").innerHTML = xmlDoc.getElementsByTagName("SM_sum")[0].childNodes[0].nodeValue;
		    var SMs = xmlDoc.getElementsByTagName("SM");
		    //one by one load
        var code="";
		    for(var i=0;i<SMs.length;i++){
		    	// document.createElement();
		    	var SM_id = xmlDoc.getElementsByTagName("SM_id")[i].childNodes[0].nodeValue;;
		    	var SM_name = xmlDoc.getElementsByTagName("SM_name")[i].childNodes[0].nodeValue;
		    	var SM_sign = xmlDoc.getElementsByTagName("SM_sign")[i].childNodes[0].nodeValue;
          var SM_headImg = xmlDoc.getElementsByTagName("SM_headImg")[i].childNodes[0].nodeValue;
		    	code += "<li id='"+SM_id+"' onclick='siteMailDetail_get(this)' class='li_bar'>"+
							      "<img class='messageHeadImg' src='../../data/user/userHeadImg/"+SM_headImg+".jpg'>"+
						       	"<p class='messageName'>"+SM_name+"</p>"+
							      "<div class='"+SM_sign+"'></div>"+
						      "</li>";
		    }
        document.getElementById("siteMails").innerHTML = code;
      }
	}
	xmlHttpRequest.open("GET",url,true);
	xmlHttpRequest.send();
}
function siteMailDetail_get(e){
  var lis = document.getElementById("siteMails").children;
  for(var i =0;i<lis.length;i++){
    lis[i].style.top = "0px";
    lis[i].style.left = "0px";
    lis[i].style.boxShadow = "none";
    lis[i].style.background = "#e5eef3";
  }
  e.style.top = "-0.25rem";
  e.style.left = "-1rem";
  e.style.boxShadow = "0.5rem 0px 1rem rgb(0,0,0,0.25)";
  e.style.background = "#87b2c9";
  
  var xmlHttpRequest = createXmlHttpRequest();
	var url = "/cgi-bin/workStation/siteMailDetail_get.php?SM_id="+e.id;

	xmlHttpRequest.onreadystatechange = function(){
	    if(this.readyState == 4 && this.status == 200){
	    	var xmlDoc=xmlHttpRequest.responseXML;
		    console.log(xmlDoc.getElementsByTagName("SM_control")[0].childNodes[0].nodeValue);
        console.log(xmlDoc.getElementsByTagName("SM_Lcontrol")[0].childNodes[0].nodeValue);
  	  	document.getElementById("mail_id").innerHTML = e.id;
        document.getElementById("mail_senderName").innerHTML = e.children[1].innerHTML;
  	  	document.getElementById("hello").innerHTML = "HELLO "+ decodeURI(getCookie("U_name"))+",";
	  	  document.getElementById("hello2").innerHTML = "YOUR MESSAGE:";
				document.getElementById("eContent").value = xmlDoc.getElementsByTagName("SM_content")[0].childNodes[0].nodeValue;
        e.children[2].className = "sign_nodeal";
        document.getElementById("acceptB").innerHTML = "回复";
    }
  }
  xmlHttpRequest.open("GET",url,false);
  xmlHttpRequest.send();
}

function sendMail_Deal(){
	if(document.getElementById("acceptB").innerHTML == "寄出"){
				var xmlHttpRequest = createXmlHttpRequest();	
				var url = "/cgi-bin/mailBox/siteMailToS.php";
				var SM_content = document.getElementById("eContent").value;		
        var mail_id = document.getElementById("mail_id").innerHTML;
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
				}else if(SM_content.length < 1){
      		window.alert(SM_content.length + "/500 内容过短！");
    		}else{
					xmlHttpRequest.open("post",url,false);
					xmlHttpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
					xmlHttpRequest.send("SM_content="+ SM_content+"&mail_id="+mail_id);
				}
	}else if(document.getElementById("acceptB").innerHTML == "回复"){
    document.getElementById("mail_id").innerHTML = "0";
    document.getElementById("hello").innerHTML = "FOR "+document.getElementById("mail_senderName").innerHTML+",";
    document.getElementById("hello2").innerHTML = "THE MESSAGE:";
    document.getElementById("eContent").value = "";
    document.getElementById("acceptB").innerHTML = "寄出";
	}
}
function getApplys(){
	var xmlHttpRequest = createXmlHttpRequest();
	var url = "/cgi-bin/workStation/getApplys.php";
	xmlHttpRequest.onreadystatechange=function(){
     if(xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200){
		    var xmlDoc = xmlHttpRequest.responseXML;
		    console.log(xmlDoc.getElementsByTagName("AT_control")[0].childNodes[0].nodeValue);
		    var ATs = xmlDoc.getElementsByTagName("AT");
		    //one by one load
        var code="";
		    for(var i=0;i<ATs.length;i++){
		    	// document.createElement();
		    	var AT_id = xmlDoc.getElementsByTagName("AT_id")[i].childNodes[0].nodeValue;
		    	var AT_type = xmlDoc.getElementsByTagName("AT_type")[i].childNodes[0].nodeValue;
		    	var AT_sign = xmlDoc.getElementsByTagName("AT_sign")[i].childNodes[0].nodeValue;
          var AT_headImg = xmlDoc.getElementsByTagName("AT_headImg")[i].childNodes[0].nodeValue;
		    	code += "<li id='"+AT_id+"' onclick='applyDetail_get(this)' class='li_bar'>"+
							      "<img class='messageHeadImg' src='../../data/user/userHeadImg/"+AT_headImg+".jpg'>"+
						       	"<p class='messageName'>for:"+AT_type+"</p>"+
							      "<div class='"+AT_sign+"'></div>"+
						      "</li>";
		    }
        document.getElementById("orgPage_applyList").innerHTML = code;
      }
	}
	xmlHttpRequest.open("GET",url,true);
	xmlHttpRequest.send();
}
function applyDetail_get(e){
  var lis = document.getElementById("orgPage_applyList").children;
  for(var i =0;i<lis.length;i++){
    lis[i].style.top = "0px";
    lis[i].style.left = "0px";
    lis[i].style.boxShadow = "none";
    lis[i].style.background = "#e5eef3";
  }
  e.style.top = "-0.25rem";
  e.style.left = "-1rem";
  e.style.boxShadow = "0.5rem 0px 1rem rgb(0,0,0,0.25)";
  e.style.background = "#87b2c9";
  
  var xmlHttpRequest = createXmlHttpRequest();
	var url = "/cgi-bin/workStation/applyDetail_get.php?AT_id="+e.id;

	xmlHttpRequest.onreadystatechange = function(){
	    if(this.readyState == 4 && this.status == 200){
	    	var xmlDoc=xmlHttpRequest.responseXML;
		    console.log(xmlDoc.getElementsByTagName("AT_control")[0].childNodes[0].nodeValue);
  	  	document.getElementById("applyDetail_id").innerHTML = e.id;
        document.getElementById("applyDetail_name").innerHTML = xmlDoc.getElementsByTagName("AT_name")[0].childNodes[0].nodeValue;
        document.getElementById("applyDetail_applicant").innerHTML = xmlDoc.getElementsByTagName("AT_applicant")[0].childNodes[0].nodeValue;
        document.getElementById("applyDetail_alias").innerHTML = xmlDoc.getElementsByTagName("AT_alias")[0].childNodes[0].nodeValue;
  	  	document.getElementById("applyDetail_major").innerHTML = xmlDoc.getElementsByTagName("AT_major")[0].childNodes[0].nodeValue;
	  	  document.getElementById("applyDetail_academy").innerHTML = xmlDoc.getElementsByTagName("AT_academy")[0].childNodes[0].nodeValue;
        document.getElementById("applyDetail_contact").innerHTML = xmlDoc.getElementsByTagName("AT_contact")[0].childNodes[0].nodeValue;
  	  	document.getElementById("applyDetail_type").innerHTML = xmlDoc.getElementsByTagName("AT_type")[0].childNodes[0].nodeValue;
	  	  document.getElementById("applyDetail_evaluation").innerHTML = xmlDoc.getElementsByTagName("AT_evaluation")[0].childNodes[0].nodeValue;
        e.children[2].className = "sign_over";
    }
  }
  xmlHttpRequest.open("GET",url,false);
  xmlHttpRequest.send();
}
//----------------popPage------------
function cs_work(){
	document.getElementById("popPage").style.display = "flex";
	document.getElementById("cs_workPage").style.display = "block";
}
function setCollegeValue_work(e){
	document.getElementById("cs_work_input").value = e.innerHTML;
	closeColleges();
}
function close_cs_workPage(){
	document.getElementById("popPage").style.display = "none";
	document.getElementById('cd_workPage').style.display = "none";
	closeColleges();
	document.getElementById('cs_user_input').value = "";
}