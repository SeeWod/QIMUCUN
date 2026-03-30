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
  
 	next_goods = 0;
  obtainedlist="0";
	document.getElementById("normalBoard").innerHTML = "";

	getGoodsNumber();
	getGoods();

}
//排序
function setSort(){
	S_order = document.getElementById("S_order").value;

	next_goods = 0;
  obtainedlist="0";
	document.getElementById("normalBoard").innerHTML = "";
  document.getElementById("self_Board").innerHTML = "";
	getGoodsNumber();
	getGoods();
}
function setTag(str){
	tag = str;

	next_goods = 0;
  obtainedlist="0";
	document.getElementById("normalBoard").innerHTML = "";
	getGoodsNumber();
	getGoods();
}
//向后台获取物品信息(设置next_goods 装满一页)
function getGoods(){
	var xmlHttpRequest = createXmlHttpRequest();
	var url = "/cgi-bin/renting/R_getRentings.php?S_tag="+tag + "&S_order=" + S_order + "&next_goods=" + next_goods+"&pageSize=" + pageSize+"&sum_goods=" + sum_goods+"&obtainedlist="+obtainedlist;
	xmlHttpRequest.onreadystatechange=function(){
     if(xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200){
     		var normalBoard = document.getElementById("normalBoard");
		    var xmlDoc = xmlHttpRequest.responseXML;
		    console.log(xmlDoc.getElementsByTagName("R_control")[0].childNodes[0].nodeValue);
        obtainedlist = xmlDoc.getElementsByTagName("R_obtainedlist")[0].childNodes[0].nodeValue;
//		    if(xmlDoc.getElementsByTagName("PT_RandomError")[0].hasChildNodes){
//		    	var length = xmlDoc.getElementsByTagName("PT_RandomError")[0].childNodes.length;
//		    	for(var i = 0;i<length;i++){
//		    		console.log(xmlDoc.getElementsByTagName("PT_RandomError")[0].childNodes[0].nodeValue);
//		    	}
//		    }
		    var Gs = xmlDoc.getElementsByTagName("R");
		    //one by one load
		    for(var i=0;i<Gs.length;i++){
		    	var R_id = xmlDoc.getElementsByTagName("R_id")[i].childNodes[0].nodeValue;
              
		    	var R_name = xmlDoc.getElementsByTagName("R_name")[i].childNodes[0].nodeValue;
		    	var R_hire = xmlDoc.getElementsByTagName("R_hire")[i].childNodes[0].nodeValue;
		    	var R_payWay = xmlDoc.getElementsByTagName("R_payWay")[i].childNodes[0].nodeValue;
		    	var R_college = xmlDoc.getElementsByTagName("R_collegeWalk")[i].childNodes[0].nodeValue.split(",")[0];
          var R_walk = xmlDoc.getElementsByTagName("R_collegeWalk")[i].childNodes[0].nodeValue.split(",")[1];

		    	var code = "<li id='"+ R_id +"' onclick='getMore(this)'>"+
												"<img src='../../data/renting/croImg/"+ R_id +"_main.jpg'>"+
												"<h3 class='R_name'>"+ R_name +"</h3>"+
												"<p class='R_hire'><span>￥"+ R_hire +"</span>"+R_payWay+"</p>"+
												"<p class= 'R_collegeWalk'>"+R_college+" 步行："+R_walk+"分钟</p>"+
											"</li>";
					normalBoard.innerHTML = normalBoard.innerHTML + code;
					next_goods++;
		    }
      }
	}
	xmlHttpRequest.open("GET",url,true);
	xmlHttpRequest.send();
}
//获取已选择类型元素总数sum_goods
function getGoodsNumber(){
	var xhr = createXmlHttpRequest();
	var url = "/cgi-bin/renting/R_goodsNumber.php?S_tag=" + tag;
	xhr.onreadystatechange=function(){
     if(xhr.readyState == 4 && xhr.status == 200){
      sum_goods = xhr.responseText;
      console.log("查询到商品总数:"+sum_goods);
      document.getElementById("PT_total").innerHTML = sum_goods;
    }
	}
	xhr.open("GET",url,false);
	xhr.send();
}



var isOpen_addView = false;
function openAddView(e){
  if(document.getElementById("U_id").innerHTML == '1000000000'){
    //账户控制console.log(document.getElementById("U_id").innerHTML);
      var r = window.confirm("没有建立您的个人账户无法进入个人空间,是否登录？");
     if(r){
     		clearCookie("PHPSESSID");
        window.location.pathname = "html/main.html";
      }
      return;
  }else{
	  //主要
		var addView = document.getElementById("betweenAddPage");
		if(isOpen_addView){
			addView.style.display = "none";
			e.style.transform = "rotate(0deg)";
			e.style.borderRadius = "0rem";

			e.style.filter = "saturate(100%)";
			//不设置表单置空	

    	document.getElementById("left_getRecordB").style.display = "block";
	    document.getElementById("left_myPublishB").style.display = "block";

			isOpen_addView = false;
		}else{
			addView.style.display = "flex";
			e.style.transform = "rotate(135deg)";
			e.style.borderRadius = "5rem";	
			e.style.filter = "saturate(0%)";

    	document.getElementById("left_getRecordB").style.display = "none";
	    document.getElementById("left_myPublishB").style.display = "none";
			document.getElementById("left_closeDetail").style.display = "none";
			document.getElementById("left_recordORDeleteB").style.display = "none";

			isOpen_addView = true;
		}
	}
}
function PRD_close(){
	document.getElementById("publish_rule_detail").style.display = "none";
}
function PRD_open(){
	document.getElementById("publish_rule_detail").style.display = "flex";
}
// -----------表单填写发送----------------
//发布物品
var mainPicture;
var firstPicture;
var secondPicture;
var thirdPicture;
var fourthPicture;

function R_Publish(){
	var R_overView = document.getElementById('publish_overview').value;
	var R_address = document.getElementById('publish_address').value;
	var R_name = document.getElementById('publish_name').value;
	var R_size = document.getElementById('publish_size').value;
	var R_roomType = document.getElementById('publish_roomType').value;
	var R_houseType = document.getElementById('publish_houseType').value;
	var R_furniture = document.getElementById('publish_furniture').value;
	var R_serve = document.getElementById('publish_serve').value;
	var R_hire = document.getElementById('publish_hire').value;
	var R_payWay = document.getElementById('publish_payWay').value;
	var R_waterCharge = document.getElementById('publish_waterCharge').value;
	var R_electricCharge = document.getElementById('publish_electricCharge').value;
	var R_networkCharge = document.getElementById('publish_networkCharge').value;

	// R_rentType用逗号分割的字符串组成
	var R_rentType = "";
	var E_rentType = document.getElementsByName("publish_rentType");
	for(var i =0;i<E_rentType.length;i++){
		if(E_rentType[i].checked){
			if(R_rentType != ""){
				R_rentType = R_rentType + "," + E_rentType[i].value;
			}else{
				R_rentType = R_rentType +""+E_rentType[i].value;
			}
		}
	}

	var R_rentTime = "";
	var E_rentTime = document.getElementsByName("publish_rentTime");
	for(var i =0;i<E_rentTime.length;i++){
		if(E_rentTime[i].checked){
			if(R_rentTime != ""){
				R_rentTime = R_rentTime + "," + E_rentTime[i].value;
			}else{
				R_rentTime = R_rentTime +""+E_rentTime[i].value;
			}
		}
	}

	var R_contact = document.getElementById('publish_contact').value;
	var R_college = document.getElementById('publish_college').value;
	var R_walk = document.getElementById('publish_walk').value;

	//检查表单是否填写完成 
	//概览可以为空
	if(!(/^.{1,50}$/.test(R_address))){
     alert("请输入1-50位字符作为 '房子地址' ");
     return;
  }else if(!(/^.{1,10}$/.test(R_name))){
     alert("请输入1-10位字符作为 '房子名称',它将在简略信息中显示 ");
     return;
  }else if(!(/^\d{1,5}$/.test(R_size)) || Number(R_size)>30000){
     alert("请输入真实 '房子面积'");
     return;
  }else if(!(/^.{1,20}$/.test(R_roomType))){
     alert("请输入1-20位字符作为 '室型' ");
     return;
  }else if(!(/^.{1,10}$/.test(R_houseType))){
     alert("请输入1-10位字符作为 '房型' ");
     return;
  }else if(!(/^.{1,50}$/.test(R_furniture))){
     alert("请输入1-50位字符作为 '家具' ");
     return;
  }else if(!(/^\d{1,5}$/.test(R_hire)) || Number(R_hire)>30000){
     alert("请输入1-20位字符作为 '租金' ");
     return;
  }else if(!(/^.{1,10}$/.test(R_payWay))){
     alert("请输入1-10位字符作为 '支付方式' ");
     return;
  }else if(!(/^\d{1,3}$/.test(R_electricCharge)) || Number(R_electricCharge)>120){
     alert("电费格式错误，请输入数字");
     return;
  }else if(!(/^\d{1,3}$/.test(R_waterCharge)) || Number(R_waterCharge)>120){
     alert("水费格式错误，请输入数字");
     return;
  }else if(!(/^.{1,20}$/.test(R_networkCharge))){
     alert("请输入1-20位字符作为 '网络如何供应' ");
     return;
  }else if(R_rentType == ""){
  	alert("可允许的出租方式类型 必须勾选");
  	return;
  }else if(R_rentTime == ""){
  	alert("可允许的出租时长类型 必须勾选");
  	return;
  }else if(!(/^.{1,20}$/.test(R_contact))){
    alert("请输入1-20位字符作为 '联系方式' ");
    return;
  }else if(!(/^.{1,50}$/.test(R_college)) || !(/^\d{1,4}$/.test(R_walk))){
    alert("附近大学及其步行距离未填写/填写错误");
    return;
  }
  var R_collegeWalk = R_college + "," + R_walk;
	var formdata = new FormData();

	formdata.append("R_overView",R_overView);
	formdata.append("R_address",R_address);
	formdata.append("R_name",R_name);
	formdata.append("R_size",R_size);
	formdata.append("R_roomType",R_roomType);
	formdata.append("R_houseType",R_houseType);
	formdata.append("R_furniture",R_furniture);
	formdata.append("R_serve",R_serve);
	formdata.append("R_hire",R_hire);
	formdata.append("R_payWay",R_payWay);
	formdata.append("R_electricCharge",R_electricCharge);
	formdata.append("R_waterCharge",R_waterCharge);
	formdata.append("R_networkCharge",R_networkCharge);
	formdata.append("R_rentType",R_rentType);
	formdata.append("R_rentTime",R_rentTime);
	formdata.append("R_contact",R_contact);
	formdata.append("R_collegeWalk",R_collegeWalk);

	formdata.append("main",mainPicture);
	formdata.append("first",firstPicture);
	formdata.append("second",secondPicture);
	formdata.append("third",thirdPicture);
	formdata.append("fourth",fourthPicture);

	var url = "/cgi-bin/renting/R_publish.php";
	var xmlHttpRequest = createXmlHttpRequest();
	xmlHttpRequest.onreadystatechange = function(){
		if (xmlHttpRequest.readyState==4 && xmlHttpRequest.status==200){
        console.log(xmlHttpRequest.responseText);
    	}
	}
  console.log(formdata);
	xmlHttpRequest.open("post",url,true);
	xmlHttpRequest.setRequestHeader("Content", "multipart/form-data");
	xmlHttpRequest.send(formdata);

	//表单重置
	document.getElementById("AddPage_publishPart").reset();
}
//获取更多商品信息
function getMore(e){
	//打开detailView窗口
	document.getElementById("left_closeDetail").style.display = "block";
	document.getElementById("left_recordORDeleteB").style.display = "block";

	document.getElementById("left_addViewB").style.display = "none";
	document.getElementById("left_getRecordB").style.display = "none";
	document.getElementById("left_myPublishB").style.display = "none";
	$("#detailPage").css("display","flex");

  if(tag == "我的发布"){
  	document.getElementById("left_recordORDeleteB").src = "../img/common/delete.png";
  }else{
    document.getElementById("left_recordORDeleteB").src = "../img/common/save.png";
  }

	getdetail(e.id);  
}
function closeDetailPage(e){
	document.getElementById("left_recordORDeleteB").style.display = "none";
  document.getElementById("left_closeDetail").style.display = "none";
	document.getElementById("left_addViewB").style.display = "block";
	document.getElementById("left_getRecordB").style.display = "block";
	document.getElementById("left_myPublishB").style.display = "block";

	document.getElementById("detailPage").style.display = "none";

	document.getElementById("detail_id").innerHTML = "";
	document.getElementById("detail_address").innerHTML = "";
	document.getElementById("detail_name").innerHTML = "";
	document.getElementById("detail_size").innerHTML = "";
	document.getElementById("detail_roomType").innerHTML = "";
	document.getElementById("detail_houseType").innerHTML = "";
	document.getElementById("detail_furniture").innerHTML = "";
	document.getElementById("detail_serve").innerHTML = "";
	document.getElementById("detail_hire").innerHTML = "";
	document.getElementById("detail_electricCharge").innerHTML = "";
	document.getElementById("detail_waterCharge").innerHTML = "";
	document.getElementById("detail_networkCharge").innerHTML = "";
	document.getElementById("detail_contact").innerHTML = "";
	document.getElementById("detail_college").innerHTML = "";
 	document.getElementById("detail_walk").innerHTML = "";
}

//方法拿出
function getdetail(R_id){
	var xmlHttpRequest = createXmlHttpRequest();
	var url = "/cgi-bin/renting/R_getDetail.php?R_id="+R_id;
	xmlHttpRequest.onreadystatechange=function(){
    if(xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200){
		    var xmlDoc = xmlHttpRequest.responseXML;
		    //console.log(xmlDoc.getElementsByTagName("PT_control")[0].childNodes[0].nodeValue);
		    //装载信息
        var detail_id = xmlDoc.getElementsByTagName("R_id")[0].childNodes[0].nodeValue;
        var detail_overview;
        if(xmlDoc.getElementsByTagName("R_overview")[0].hasChildNodes()){
          detail_overview = xmlDoc.getElementsByTagName("R_overview")[0].childNodes[0].nodeValue;
        }else{
          detail_overview = "";
        }
        var detail_address = xmlDoc.getElementsByTagName("R_address")[0].childNodes[0].nodeValue;
        var detail_name = xmlDoc.getElementsByTagName("R_name")[0].childNodes[0].nodeValue;
        var detail_size = xmlDoc.getElementsByTagName("R_size")[0].childNodes[0].nodeValue;
        var detail_roomType = xmlDoc.getElementsByTagName("R_roomType")[0].childNodes[0].nodeValue;
        var detail_houseType = xmlDoc.getElementsByTagName("R_houseType")[0].childNodes[0].nodeValue;
        var detail_serve;
        if(xmlDoc.getElementsByTagName("R_serve")[0].hasChildNodes()){
          detail_serve = xmlDoc.getElementsByTagName("R_serve")[0].childNodes[0].nodeValue;
        }else{
          detail_serve = "";
        }
        var detail_furniture = xmlDoc.getElementsByTagName("R_furniture")[0].childNodes[0].nodeValue;
        var detail_hire = xmlDoc.getElementsByTagName("R_hire")[0].childNodes[0].nodeValue;
        var detail_payWay = xmlDoc.getElementsByTagName("R_payWay")[0].childNodes[0].nodeValue;
        var detail_electricCharge = xmlDoc.getElementsByTagName("R_electricCharge")[0].childNodes[0].nodeValue;
        var detail_waterCharge = xmlDoc.getElementsByTagName("R_waterCharge")[0].childNodes[0].nodeValue;
        var detail_networkCharge = xmlDoc.getElementsByTagName("R_networkCharge")[0].childNodes[0].nodeValue;
        var detail_rentType = xmlDoc.getElementsByTagName("R_rentType")[0].childNodes[0].nodeValue;
        var detail_rentTime = xmlDoc.getElementsByTagName("R_rentTime")[0].childNodes[0].nodeValue;
        var detail_contact = xmlDoc.getElementsByTagName("R_contact")[0].childNodes[0].nodeValue;
        var detail_collegeWalk = xmlDoc.getElementsByTagName("R_collegeWalk")[0].childNodes[0].nodeValue;
        var detail_isCollect = xmlDoc.getElementsByTagName("R_isCollect")[0].childNodes[0].nodeValue;
        
        
		    document.getElementById("detail_id").innerHTML = detail_id;
				document.getElementById("detail_overview").innerHTML = "<span>概况：</span>"+detail_overview;
				document.getElementById("detail_address").innerHTML = "地址："+detail_address;
				document.getElementById("detail_name").innerHTML = detail_name;
				document.getElementById("detail_college").innerHTML = detail_collegeWalk.split(",")[0];
 				document.getElementById("detail_walk").innerHTML = "步行:"+detail_collegeWalk.split(",")[1]+"分钟";
				document.getElementById("detail_size").innerHTML = detail_size+"m²,&nbsp";
				document.getElementById("detail_roomType").innerHTML = detail_roomType+",&nbsp";
				document.getElementById("detail_houseType").innerHTML = detail_houseType;
				document.getElementById("detail_furniture").innerHTML = detail_furniture;
				document.getElementById("detail_serve").innerHTML = detail_serve;
				document.getElementById("detail_hire").innerHTML = detail_hire;
				document.getElementById("detail_payWay").innerHTML = detail_payWay;
				document.getElementById("detail_waterCharge").innerHTML = " 水:"+detail_waterCharge+"/吨,";
				document.getElementById("detail_electricCharge").innerHTML = "电:"+detail_electricCharge+"/度,";
        document.getElementById("detail_networkCharge").innerHTML = detail_networkCharge;
        
        if(/.*整租.*/.test(detail_rentType)){
          document.getElementsByName("detail_rentType")[0].checked = "true";
        }
        if(/.*合租.*/.test(detail_rentType)){
          document.getElementsByName("detail_rentType")[1].checked = "true";
        }
        
        if(/.*短租.*/.test(detail_rentTime)){
          document.getElementsByName("detail_rentTime")[0].checked = "true";
        }
        if(/.*长租.*/.test(detail_rentTime)){
          document.getElementsByName("detail_rentTime")[1].checked = "true";
        }
        
        document.getElementById("detail_contact").innerHTML = detail_contact;
        
        document.getElementById("detailPage_imgs").children[0].src="../../data/renting/croImg/"+detail_id+"_main.jpg";
        document.getElementById("detailPage_imgs").children[1].src="../../data/renting/croImg/"+detail_id+"_first.jpg";
        document.getElementById("detailPage_imgs").children[2].src="../../data/renting/croImg/"+detail_id+"_second.jpg";
        document.getElementById("detailPage_imgs").children[3].src="../../data/renting/croImg/"+detail_id+"_third.jpg";
        document.getElementById("detailPage_imgs").children[4].src="../../data/renting/croImg/"+detail_id+"_fourth.jpg";
        
        getBigImg_detail(document.getElementById("detailPage_imgs").children[0]);
        
				if(tag != "我的发布"){
          document.getElementById("left_recordORDeleteB").style.filter = (detail_isCollect == 1)?"saturate(100%)":"saturate(0%)";
        }
        
    }
	}
	xmlHttpRequest.open("GET",url,true);
	xmlHttpRequest.send();
}
function R_recordORDelete(e){
  if(document.getElementById("U_id").innerHTML == '1000000000'){
    //账户控制console.log(document.getElementById("U_id").innerHTML);
      var r = window.confirm("没有建立您的个人账户无法进入个人空间,是否登录？");
     if(r){
     		clearCookie("PHPSESSID");
        window.location.pathname = "html/main.html";
      }
      return;
  }else{
  //content
  	if(tag == "我的收藏" || tag=="我的发布"){
		  var r=confirm("确定从["+tag+"]中该兼职信息删除吗？");
		  if(!r){
		  	return;
		  }
    }
			var R_id = document.getElementById("detail_id").innerHTML;							

			var xmlHttpRequest = createXmlHttpRequest();
			var url = "/cgi-bin/partTime/R_RecordORDelete.php?R_id="+R_id+"&tag="+tag;
			xmlHttpRequest.onreadystatechange=function(){
		    if(xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200){
		    	if(xmlHttpRequest.responseText=="个人收录成功"){
		    	  document.getElementById("left_recordORDeleteB").style.filter = "saturate(100%)";
		    	}else if(xmlHttpRequest.responseText=="个人收录删除成功" || xmlHttpRequest.responseText=="个人发布删除成功"){
	    	  	if(tag == "我的发布" || tag == "我的收藏"){
	    	  		//当tag为我的发布 关闭详细标签页 重载
	        		var goodsList = document.getElementById("normalBoard");
	        		var goodss = goodsList.children;
	        		for(var i=0;i<goodss.length;i++){
		          	if(goodss[i].id == R_id){
		            	goodsList.removeChild(goodsList.childNodes[i]);
		            	break;
		          	}
		          }
	          	closeDetailPage(document.getElementById("left_closeDetail"));
	    	  	}else{
	    	  		//tag不为 我的发布 和我的收藏时 img不为删除图标，修改透明度
	    	  		document.getElementById("left_recordORDeleteB").style.filter = "saturate(0%)";
	    	  	}
		    	}else{
		    	  	console.log(xmlHttpRequest.responseText);
		    	}
		    }
			}
			xmlHttpRequest.open("GET",url,true);
      xmlHttpRequest.send();
  }
}
//————————————————————————————————————————————图片裁剪————————————————————————————————————————
function selectFile(e){
	var file = e.children[0];
	file.click();
}
function copperImg(e,fileIndex){
	var file = e.files[0];
	var reader = new FileReader();
	pictureIndex = fileIndex;
  //console.log(pictureIndex);
	reader.addEventListener('load',function(){cropperStart(reader.result)});
	reader.readAsDataURL(file);
}
function getBigImg_publish(e){
	let str = e.style.backgroundImage;
	document.getElementById("bigImg_publish").style.backgroundImage=str;
}
function getBigImg_detail(e){
  document.getElementById("bigImg_detail").src = e.src.replace("croImg","srcImg");
}