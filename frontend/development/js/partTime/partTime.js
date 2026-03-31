var tag = "全部类型";
var S_text = "";
var S_place = "不限";
var S_period = "不限";
var S_payWay = "不限";
var S_order = "random";

// pageSize用于以此ajax传输goods个数
var pageSize = 25;
var sum_goods = 0;
var next_goods = 0;
var obtainedlist="0";

var isOpen_helpView = false;
//body完成后渲染
window.onload = function(){partTimeInitial();};

function partTimeInitial(){
	screenInitial();
 //个人信息初始化
	frameInitial();

	//加载goods
	var ul=document.getElementById("betweenTags");
	var lis = ul.children;
	filterWidthTag(lis[0]);
 
  getRemarkSUM();
  getRemarks();
  if(remark_sum!=0){
    setInterval(function(){getRemarks();},10000);
  }else{
    document.getElementById("addValueBoard").style.display = "none";
    document.getElementById("normalBoard").style.height = "100%";
  }
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
//排序
function setPlace(){
	S_place = document.getElementById("S_place").value;

	next_goods = 0;
  obtainedlist="0";
	document.getElementById("normalBoard").innerHTML = "";
  document.getElementById("self_Board").innerHTML = "";
	getGoodsNumber();
	getGoods();
}
//排序
function setPeriod(){
	S_period = document.getElementById("S_period").value;

	next_goods = 0;
  obtainedlist="0";
	document.getElementById("normalBoard").innerHTML = "";
  document.getElementById("self_Board").innerHTML = "";
	getGoodsNumber();
	getGoods();
}
//排序
function setPayWay(){
	S_payWay = document.getElementById("S_payWay").value;

	next_goods = 0;
  obtainedlist="0";
	document.getElementById("normalBoard").innerHTML = "";
  document.getElementById("self_Board").innerHTML = "";
	getGoodsNumber();
	getGoods();
}

//标签点击--查询物品 完成
function filterWidthTag(e){
	var ul;
	if(isOpen_selfPage){
		ul=document.getElementById("self_Tags");
	}else{
		ul=document.getElementById("betweenTags");
	}
	var lis = ul.children;

	var index;
	for(var i=0;i<lis.length;i++){
		lis[i].style.opacity = "0.3";
		lis[i].style.filter = "saturate(0%)";
		if(lis[i] == e){
			index = i;
		}
	}

	e.style.opacity = "1";
	e.style.filter = "saturate(100%)";	
	//功能
	tag = e.children[1].innerHTML;
	
	next_goods = 0;
  obtainedlist="0";
	document.getElementById("normalBoard").innerHTML = "";
  document.getElementById("self_Board").innerHTML = "";
	getGoodsNumber();
	getGoods();
}
//查询物品
function searchWithText(){
	S_text = document.getElementById("S_text").value;

	next_goods = 0;
  obtainedlist="0";
	document.getElementById("normalBoard").innerHTML = "";
  document.getElementById("self_Board").innerHTML = "";
	getGoodsNumber();
	getGoods();
}

//搜索回车设置
function keydown(event){
  if(event.key =="Enter"){
  //  alert("回车");
    searchWithText();
  }
}

//向后台获取物品信息(设置next_goods 装满一页)
function getGoods(){
	var xmlHttpRequest = createXmlHttpRequest();
	var url = "/cgi-bin/partTime/PT_getBoards.php?S_tag="+ tag+"&S_text=" + S_text + "&S_place=" + S_place + "&S_period=" + S_period +"&S_payWay=" + S_payWay + 
						"&S_order=" + S_order + "&next_goods=" + next_goods+"&pageSize=" + pageSize+"&sum_goods=" + sum_goods+"&obtainedlist="+obtainedlist;
	xmlHttpRequest.onreadystatechange=function(){
     if(xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200){
     		var normalBoard;
     		if(isOpen_selfPage){
     			normalBoard = document.getElementById("self_Board");
     		}else{
     			normalBoard = document.getElementById("normalBoard");
     		}
		    var xmlDoc = xmlHttpRequest.responseXML;
		    console.log(xmlDoc.getElementsByTagName("PT_control")[0].childNodes[0].nodeValue);
        obtainedlist = xmlDoc.getElementsByTagName("PT_obtainedlist")[0].childNodes[0].nodeValue;
//		    if(xmlDoc.getElementsByTagName("PT_RandomError")[0].hasChildNodes){
//		    	var length = xmlDoc.getElementsByTagName("PT_RandomError")[0].childNodes.length;
//		    	for(var i = 0;i<length;i++){
//		    		console.log(xmlDoc.getElementsByTagName("PT_RandomError")[0].childNodes[0].nodeValue);
//		    	}
//		    }
		    var Gs = xmlDoc.getElementsByTagName("PT");
		    //one by one load
		    for(var i=0;i<Gs.length;i++){
		    	// document.createElement();
		    	var PT_id = xmlDoc.getElementsByTagName("PT_id")[i].childNodes[0].nodeValue;;
		    	var PT_tag = xmlDoc.getElementsByTagName("PT_tag")[i].childNodes[0].nodeValue;
		    	var PT_short = xmlDoc.getElementsByTagName("PT_short")[i].childNodes[0].nodeValue;

		    	var PT_period = xmlDoc.getElementsByTagName("PT_period")[i].childNodes[0].nodeValue;;
		    	var PT_unit = xmlDoc.getElementsByTagName("PT_unit")[i].childNodes[0].nodeValue;
		    	var PT_recruitNum = xmlDoc.getElementsByTagName("PT_recruitNum")[i].childNodes[0].nodeValue;

		    	var PT_salary = xmlDoc.getElementsByTagName("PT_salary")[i].childNodes[0].nodeValue;;
		    	var PT_salaryUnit = xmlDoc.getElementsByTagName("PT_salaryUnit")[i].childNodes[0].nodeValue;
		    	var PT_payWay = xmlDoc.getElementsByTagName("PT_payWay")[i].childNodes[0].nodeValue;

		    	var code = "<li id='"+ PT_id +"' onclick='getMore(this)'>"+
												"<p class='PT_tag'>"+ PT_tag +"</p>"+
												"<p class='PT_short'>"+ PT_short +"</p>"+
												"<p class='PT_texts'><span class='PT_period'>"+ PT_period +"</span><span class='PT_unit'>"+PT_unit+"</span>"+
												"<span class='PT_recruitNumber'>招聘"+PT_recruitNum+"人</span></p>"+
												"<p class='PT_money'><span><span class='PT_salary'>"+ PT_salary +"</span><span class='PT_salaryUnit'>"+PT_salaryUnit+"</span></span> <span class='PT_payWay'>"+PT_payWay+"</span></p>"+
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
	var url = "/cgi-bin/partTime/PT_goodsNumber.php?S_text=" + S_text + "&S_place=" + S_place + "&S_period=" + S_period + "&S_payWay=" + S_payWay + "&S_tag=" + tag;
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
//remark
var remark_index = 0;
var remark_sum;
var remark_pageSize = 5;
function getRemarkSUM(){
	var xhr = createXmlHttpRequest();
	var url = "/cgi-bin/partTime/PT_getRemarkSUM.php";
	xhr.onreadystatechange=function(){
     if(xhr.readyState == 4 && xhr.status == 200){
      remark_sum = xhr.responseText;
    }
	}
	xhr.open("GET",url,false);
	xhr.send();

}
function getRemarks(){
	var xmlHttpRequest = createXmlHttpRequest();
	var url = "/cgi-bin/partTime/PT_getRemarks.php?remark_index="+ remark_index +"&remark_sum=" + remark_sum + "&remark_pageSize=" + remark_pageSize;
	xmlHttpRequest.onreadystatechange=function(){
     if(xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200){
     		var normalBoard = document.getElementById("addValueBoard");
        normalBoard.innerHTML = "";
		    var xmlDoc = xmlHttpRequest.responseXML;
//		    console.log(xmlDoc.getElementsByTagName("PT_control")[0].childNodes[0].nodeValue);
		    var Gs = xmlDoc.getElementsByTagName("PT");
		    //one by one load
		    for(var i=0;i<Gs.length;i++){
		    	// document.createElement();
		    	var PT_id = xmlDoc.getElementsByTagName("PT_id")[i].childNodes[0].nodeValue;;
		    	var PT_tag = xmlDoc.getElementsByTagName("PT_tag")[i].childNodes[0].nodeValue;
		    	var PT_short = xmlDoc.getElementsByTagName("PT_short")[i].childNodes[0].nodeValue;

		    	var PT_period = xmlDoc.getElementsByTagName("PT_period")[i].childNodes[0].nodeValue;;
		    	var PT_unit = xmlDoc.getElementsByTagName("PT_unit")[i].childNodes[0].nodeValue;
		    	var PT_recruitNum = xmlDoc.getElementsByTagName("PT_recruitNum")[i].childNodes[0].nodeValue;

		    	var PT_salary = xmlDoc.getElementsByTagName("PT_salary")[i].childNodes[0].nodeValue;;
		    	var PT_salaryUnit = xmlDoc.getElementsByTagName("PT_salaryUnit")[i].childNodes[0].nodeValue;
		    	var PT_payWay = xmlDoc.getElementsByTagName("PT_payWay")[i].childNodes[0].nodeValue;

		    	var code = "<li id='"+ PT_id +"' onclick='getMore(this)'>"+
												"<p class='PT_tag'>"+ PT_tag +"</p>"+
												"<p class='PT_short'>"+ PT_short +"</p>"+
												"<p class='PT_texts'><span class='PT_period'>"+ PT_period +"</span><span class='PT_unit'>"+PT_unit+"</span>"+
												"<span class='PT_recruitNumber'>招聘"+PT_recruitNum+"人</span></p>"+
												"<p class='PT_money'><span><span class='PT_salary'>"+ PT_salary +"</span><span class='PT_salaryUnit'>"+PT_salaryUnit+"</span></span> <span class='PT_payWay'>"+PT_payWay+"</span></p>"+
											"</li>";
					normalBoard.innerHTML = normalBoard.innerHTML + code;
					remark_index++;
		    }
      }
	}
	xmlHttpRequest.open("GET",url,true);
	xmlHttpRequest.send();
}
//换页按钮
function nextPage(){
  var pageNumber = document.getElementById("pageNumber");
	//判断next_goods 是否等于 sum_goods 等于不执行
	if(next_goods == sum_goods){
     console.log("当前商品数量："+next_goods+" 总商品数量："+sum_goods);
     console.log("no MORE goods");
     return;
	}else{
		//清空元组
    array_sum_page[parseInt(pageNumber.innerHTML)+1] = next_goods;
		document.getElementById("goodsList").innerHTML = "";
		getGoods();
    document.getElementById("pageNumber").innerHTML = parseInt(pageNumber.innerHTML)+1;
	}
}
function refeshPage(){
  console.log(sum_goods);
  var pageNumber = document.getElementById("pageNumber");
  next_goods = array_sum_page[document.getElementById("pageNumber").innerHTML];
  getGoodsNumber();
	//判断next_goods 是否等于 sum_goods 等于不执行
	if(next_goods == sum_goods){
     console.log("刷新页面 返回上一页");
     fontPage();
     return;
	}else{
		//清空元组
		document.getElementById("goodsList").innerHTML = "";
		getGoods();
   	document.getElementById("pageNumber").innerHTML = parseInt(pageNumber.innerHTML);
	}
}
function fontPage(){
  var pageNumber = document.getElementById("pageNumber");
  console.log("前一页 指针："+array_sum_page[pageNumber.innerHTML - 1]);
	if(array_sum_page[document.getElementById("pageNumber").innerHTML] == 0){
   console.log(next_goods);
   console.log("is THE first PAGE");
		return;
	}else{
		//重写指针数
		document.getElementById("goodsList").innerHTML = "";
		next_goods = array_sum_page[document.getElementById("pageNumber").innerHTML-1];
		getGoods();
   	document.getElementById("pageNumber").innerHTML = parseInt(pageNumber.innerHTML)-1;
	}

}
var isOpen_selfPage = false;
function selfPage(e){
	if(!isOpen_selfPage){
		if(document.getElementById("U_id").innerHTML == '1000000000'){
    //账户控制console.log(document.getElementById("U_id").innerHTML);
      var r = window.confirm("没有建立您的个人账户无法进入个人空间,是否登录？");
    	if(r){
     		clearCookie("PHPSESSID");
        window.location.pathname = "html/main.html";
      }
      return;
  	}else{
			e.style.backgroundImage = "url('../img/partTime/home.png')";
			isOpen_selfPage = true;
	
			document.getElementById("selfPage").style.display = "flex";
      
      document.getElementById("S_order").options[1].selected = "true";
      S_order = "PT_pTime";
      document.getElementById("S_order").options[0].style.display = "none";
			var ul=document.getElementById("self_Tags");
			var lis = ul.children;
			filterWidthTag(lis[0]);
		}
	}else{
		e.style.backgroundImage = "url('../img/partTime/self.png')";
		isOpen_selfPage = false;
	
		document.getElementById("selfPage").style.display = "none";
    document.getElementById("S_order").options[0].selected = "true";
    S_order = "random";
    document.getElementById("S_order").options[0].style.display = "block";
    
		var ul=document.getElementById("betweenTags");
		var lis = ul.children;
		filterWidthTag(lis[0]);
	}

}

// --------样式-----------
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

			document.getElementById("left_selfPageB").style.display = "block";

			isOpen_addView = false;
		}else{
			addView.style.display = "flex";
			e.style.transform = "rotate(135deg)";
			e.style.borderRadius = "5rem";	
			e.style.filter = "saturate(0%)";

			document.getElementById("left_selfPageB").style.display = "none";
			document.getElementById("left_closeDetail").style.display = "none";
			document.getElementById("left_recordORDeleteB").style.display = "none";

			isOpen_addView = true;
		}
	}
}
function updatePreviewBoard(){
	document.getElementById("preview_tag").innerHTML = document.getElementById("publish_tag").value;
	document.getElementById("preview_short").innerHTML = document.getElementById("publish_short").value;
	document.getElementById("preview_period").innerHTML = document.getElementById("publish_period").value;
	document.getElementById("preview_unit").innerHTML = document.getElementById("publish_unit").value;
	document.getElementById("preview_salary").innerHTML = document.getElementById("publish_salary").value;
	if(document.getElementById("publish_recruitNumber").value != ""){
		document.getElementById("preview_recruitNumber").innerHTML = "招聘"+document.getElementById("publish_recruitNumber").value+"人";
	}
	document.getElementById("preview_salaryUnit").innerHTML = document.getElementById("publish_salaryUnit").value;
	document.getElementById("preview_payWay").innerHTML = document.getElementById("publish_payWay").value;
}
function PRD_close(){
	document.getElementById("publish_rule_detail").style.display = "none";
}
function PRD_open(){
	document.getElementById("publish_rule_detail").style.display = "flex";
}
// -----------表单填写发送----------------
function PT_Publish(){
	//检查表单是否填写完成
  if(!(/^.{1,50}$/.test(document.getElementById('publish_address').value))){
     alert("请输入1-50位字符作为 '工作地址' ");
     return;
  }else if(!(/^.{1,20}$/.test(document.getElementById('publish_time').value))){
     alert("请输入1-20位字符作为 '工作时间' ");
     return;
  }else if(!(/^.{1,50}$/.test(document.getElementById('publish_unit').value))){
     alert("请输入1-50位字符作为 '发布单位' ");
     return;
  }else if(!(/^.{1,50}$/.test(document.getElementById('publish_short').value))){
     alert("请输入1-50位字符作为 '联系方式' ");
     return;
  }else if(!(/^.{1,20}$/.test(document.getElementById('publish_short').value))){
     alert("请输入1-20位字符作为 '简述' ");
     return;
  }else if(!(/^\d{1,7}$/.test(document.getElementById('publish_salary').value)) || Number(document.getElementById('publish_salary').value)>8000000){
     alert("请输入8,000,000以下数字作为 '薪资' ");
     return;
  }else if(!(/^\d{1,5}$/.test(document.getElementById('publish_recruitNumber').value)) || Number(document.getElementById('publish_recruitNumber').value)>8000000){
     alert("请输入30,000以下数字作为 '招聘人数' ");
     return;
  }else if(!(/^.{1,}$/s.test(document.getElementById('publish_long').value))){
     alert("'职位详情'可以描述内容、要求。不能为空 ");
     return;
  }

	//制造表单数据
	var formdata = new FormData();
	// var G_publisher 通过后台 会话 获取
	// var G_pTime 后台获取;
	var PT_tag = document.getElementById('publish_tag').value;
	var PT_period = document.getElementById('publish_period').value;
	var PT_place = document.getElementById('publish_place').value;

	var PT_address = document.getElementById('publish_address').value;
	var PT_time = document.getElementById('publish_time').value;
	var PT_unit = document.getElementById('publish_unit').value;


	var PT_salary = document.getElementById('publish_salary').value;
	var PT_salaryUnit = document.getElementById('publish_salaryUnit').value;
	var PT_payWay = document.getElementById('publish_payWay').value;

	var PT_contact = document.getElementById('publish_contact').value;
	var PT_recruitNum = document.getElementById('publish_recruitNumber').value;

	var PT_short = document.getElementById('publish_short').value;
	var PT_long = document.getElementById('publish_long').value;

	formdata.append("PT_tag",PT_tag);
	formdata.append("PT_period",PT_period);
	formdata.append("PT_place",PT_place);

	formdata.append("PT_address",PT_address);
	formdata.append("PT_time",PT_time);
	formdata.append("PT_unit",PT_unit);

	formdata.append("PT_salary",PT_salary);
	formdata.append("PT_salaryUnit",PT_salaryUnit);
	formdata.append("PT_payWay",PT_payWay);
	formdata.append("PT_contact",PT_contact);
	formdata.append("PT_recruitNum",PT_recruitNum);
	formdata.append("PT_short",PT_short);
	formdata.append("PT_long",PT_long);


	var url = "/cgi-bin/partTime/PT_publish.php";
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
	document.getElementById("AddPage_form").reset();
}
function copperImg(e,fileIndex){
	var file = e.files[0];
	var reader = new FileReader();
	pictureIndex = fileIndex;
  //console.log(pictureIndex);
	reader.addEventListener('load',function(){cropperStart(reader.result)});
	reader.readAsDataURL(file);
}

//help帮助按钮
function forHelp(e){
	var helpView = document.getElementById("helpView");
	var foot = document.getElementById("foot");
	if(isOpen_helpView){
		helpView.style.visibility = "hidden";
		helpView.style.opacity = "0";
		helpView.style.zIndex = "0";
		e.style.zIndex = "1";
		e.style.transform = "rotate(0deg)";
		e.style.backgroundImage = "url('../img/transaction/help.png')";
		foot.style.visibility = "visible";
		foot.style.opacity = "1";

		isOpen_helpView = false;
	}else{
		// if(isOpen_TagView){
		// 	helpView.style.backgroundImage = "url('../img/transaction/tagHelp.jpg')";
		// }else 
		if(isOpen_addView){
			helpView.style.backgroundImage = "url('../img/transaction/addHelp.jpg')";
		}else{
			helpView.style.backgroundImage = "url('../img/transaction/help.jpg')";
		}
		helpView.style.visibility = "visible";
		helpView.style.opacity = "0.8";
		helpView.style.zIndex = "4";
		e.style.zIndex = "5";
		e.style.transform = "rotate(225deg)";
		e.style.backgroundImage = "url('../img/transaction/add.png')";
		foot.style.visibility = "hidden";
		foot.style.opacity = "0";

		isOpen_helpView = true;
	}
}
//goodView 方法集合
//获取更多商品信息
function getMore(e){
	//打开detailView窗口
	document.getElementById("left_closeDetail").style.display = "block";
	document.getElementById("left_recordORDeleteB").style.display = "block";

	document.getElementById("left_addViewB").style.display = "none";
	document.getElementById("left_selfPageB").style.display = "none";

	$("#detailPage").css("display","flex");

  if(tag == "我的发布"){
  	document.getElementById("left_recordORDeleteB").style.backgroundImage = "url('../img/partTime/delete.png')";
  }else{
    document.getElementById("left_recordORDeleteB").style.backgroundImage = "url('../img/partTime/save.png')";
  }

	getdetail(e.id);  
}
function closeDetailPage(e){
	e.display = "none";
	document.getElementById("left_recordORDeleteB").style.display = "none";

	document.getElementById("left_addViewB").style.display = "block";
	document.getElementById("left_selfPageB").style.display = "block";
  document.getElementById("left_closeDetail").style.display = "none";

	document.getElementById("detailPage").style.display = "none";

	//document.getElementById("detail_id").innerHTML = "";
	document.getElementById("detail_tag").innerHTML = "";
	document.getElementById("detail_period").innerHTML = "";
	document.getElementById("detail_place").innerHTML = "";
	document.getElementById("detail_address").innerHTML = "";
	document.getElementById("detail_time").innerHTML = "";
	document.getElementById("detail_unit").innerHTML = "";
	document.getElementById("detail_contact").innerHTML = "";
	document.getElementById("detail_short").innerHTML = "";
	document.getElementById("detail_salary").innerHTML = "";
	document.getElementById("detail_salaryUnit").innerHTML = "";
	document.getElementById("detail_payWay").innerHTML = "";
	document.getElementById("detail_recruitNumber").innerHTML = "";
	document.getElementById("detail_long").innerHTML = "";
}

//方法拿出
function getdetail(PT_id){
	var xmlHttpRequest = createXmlHttpRequest();
	var url = "/cgi-bin/partTime/PT_getDetail.php?PT_id="+PT_id;
	xmlHttpRequest.onreadystatechange=function(){
    if(xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200){
		    var xmlDoc = xmlHttpRequest.responseXML;
		    //console.log(xmlDoc.getElementsByTagName("PT_control")[0].childNodes[0].nodeValue);

		    //装载信息
		    document.getElementById("detail_id").innerHTML = xmlDoc.getElementsByTagName("PT_id")[0].childNodes[0].nodeValue;
				document.getElementById("detail_tag").innerHTML = xmlDoc.getElementsByTagName("PT_tag")[0].childNodes[0].nodeValue;
				document.getElementById("detail_period").innerHTML = xmlDoc.getElementsByTagName("PT_period")[0].childNodes[0].nodeValue;
				document.getElementById("detail_place").innerHTML = xmlDoc.getElementsByTagName("PT_place")[0].childNodes[0].nodeValue;
				document.getElementById("detail_address").innerHTML = xmlDoc.getElementsByTagName("PT_address")[0].childNodes[0].nodeValue;
				document.getElementById("detail_time").innerHTML = xmlDoc.getElementsByTagName("PT_time")[0].childNodes[0].nodeValue;
				document.getElementById("detail_unit").innerHTML = xmlDoc.getElementsByTagName("PT_unit")[0].childNodes[0].nodeValue;
				document.getElementById("detail_contact").innerHTML = xmlDoc.getElementsByTagName("PT_contact")[0].childNodes[0].nodeValue;
				document.getElementById("detail_short").innerHTML = xmlDoc.getElementsByTagName("PT_short")[0].childNodes[0].nodeValue;
				document.getElementById("detail_salary").innerHTML = xmlDoc.getElementsByTagName("PT_salary")[0].childNodes[0].nodeValue;
				document.getElementById("detail_salaryUnit").innerHTML = xmlDoc.getElementsByTagName("PT_salaryUnit")[0].childNodes[0].nodeValue;
				document.getElementById("detail_payWay").innerHTML = xmlDoc.getElementsByTagName("PT_payWay")[0].childNodes[0].nodeValue;
				document.getElementById("detail_recruitNumber").innerHTML = xmlDoc.getElementsByTagName("PT_recruitNum")[0].childNodes[0].nodeValue;
        document.getElementById("detail_long").innerHTML = xmlDoc.getElementsByTagName("PT_long")[0].childNodes[0].nodeValue;
				if(tag != "我的发布"){
          document.getElementById("left_recordORDeleteB").style.filter = (xmlDoc.getElementsByTagName("PT_isCollect")[0].childNodes[0].nodeValue == 1)?"saturate(100%)":"saturate(0%)";
        } 
    }
	}
	xmlHttpRequest.open("GET",url,true);
	xmlHttpRequest.send();
}
function PT_recordORDelete(e){
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
			var PT_id = document.getElementById("detail_id").innerHTML;							

			var xmlHttpRequest = createXmlHttpRequest();
			var url = "/cgi-bin/partTime/PT_RecordORDelete.php?PT_id="+PT_id+"&tag="+tag;
			xmlHttpRequest.onreadystatechange=function(){
		    if(xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200){
		    	if(xmlHttpRequest.responseText=="个人收录成功"){
		    	  document.getElementById("left_recordORDeleteB").style.filter = "saturate(100%)";
		    	}else if(xmlHttpRequest.responseText=="个人收录删除成功" || xmlHttpRequest.responseText=="个人发布删除成功"){
	    	  	if(tag == "我的发布" || tag == "我的收藏"){
	    	  		//当tag为我的发布 关闭详细标签页 重载
	    	  		var THE_id = document.getElementById("detail_id").innerHTML;
	        		var goodsList = document.getElementById("self_Board");
	        		var goodss = goodsList.children;
	        		for(var i=0;i<goodss.length;i++){
		          	if(goodss[i].id == THE_id){
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