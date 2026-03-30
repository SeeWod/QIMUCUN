var dealType = "sell";
var sortType = "G_pTime";
var tag = "全部物品";
var searchText = "";

// pageSize用于以此ajax传输goods个数
var pageSize = 10;
var sum_goods = 0;
//页面 上一页 本页 下一页 next_goods为查询时跳过的元组数量
var next_goods = 0;
//array_sum_page 用于前后翻页商品
// var array_sum_page = new Array();
// array_sum_page[1] = 0;
//不知道用于哪里
//var mainFile="";

// var isOpen_TagView = false;
// var isOpen_addView = false;
// var isOpen_helpView = false;

function transactionCommonInitial(){
  screenInitial();
 //个人信息初始化
	frameInitial();
	//加载goods
	var ul=document.getElementById("tags");
	var lis = ul.children;
	filterWidthTag(lis[0]);
 
  //autoScroll();
}

//改变 买卖按钮 样式|请求
function dealChange(str){
	var b_s = document.getElementsByClassName("switch_");
	if(str=="sell"){
		b_s[0].style.transform = "rotateY(0deg)";
		b_s[1].style.transform = "rotateY(-30deg)";
		b_s[0].style.background = "#0966d8";
		b_s[1].style.background = "#888888";

		dealType = "sell";
	}else{
		b_s[0].style.transform = "rotateY(30deg)";
		b_s[1].style.transform = "rotateY(0deg)";
		b_s[0].style.background = "#888888";
		b_s[1].style.background = "#c46254";

		dealType = "buy";
	}
	next_goods = 0;
	document.getElementById("goodsList").innerHTML = "";
	getGoodsNumber();  //设置sum_goods
	getGoods();
}
function dealChange2(str){
	var b_s = document.getElementsByClassName("switch_");
	if(str=="sell"){
		b_s[0].style.background = "#eeeeee";
		b_s[1].style.background = "transparent";
   
 		b_s[0].style.opacity = "1";
		b_s[1].style.opacity = "0.25";

		dealType = "sell";
	}else{
		b_s[0].style.background = "transparent";
		b_s[1].style.background = "#eeeeee";
   
		b_s[0].style.opacity = "0.25";
		b_s[1].style.opacity = "1";

		dealType = "buy";
	}
	next_goods = 0;
	document.getElementById("goodsList").innerHTML = "";
	getGoodsNumber();  //设置sum_goods
	getGoods();
}


//设置排序--查询物品 完成
function setSort(){
	var sortB = document.getElementById("sortB");
	switch(sortB.innerHTML){
		case "按时间":
      sortB.innerHTML = "按价格";
      sortB.style.backgroundImage = "url(../img/image_phone/sort_price.png)";
      sortType = 'G_price';
			break;
		case "按价格":
			sortB.innerHTML = "按时间";
      sortB.style.backgroundImage = "url(../img/image_phone/sort_time.png)";
      sortType = 'G_pTime';
			break;
		default:
			break;
	}
	next_goods = 0;
	document.getElementById("goodsList").innerHTML = "";
	getGoodsNumber();
	getGoods();
}

//标签点击--查询物品 完成
function filterWidthTag(e){
	var ul=document.getElementById("tags");
	var decorate=document.getElementById("decorate");
	var lis = ul.children;

	// if(isOpen_TagView){
		// 点击添加标签
		//样式
		// for(var i=0;i<lis.length;i++){
		// 	lis[i].style.opacity = "0.3";
		// 	lis[i].style.filter = "saturate(0%)";
		// }
		//功能
	// }else{
		// 点击查询数据库
		//样式
		var index;
		for(var i=0;i<lis.length;i++){
			lis[i].style.opacity = "0.3";
			lis[i].style.filter = "saturate(0%)";
			if(lis[i] == e){
				index = i;
			}
     }
		// }
		e.style.opacity = "1";
		e.style.filter = "saturate(100%)";	

		decorate.style.left = (index*5+0.5)+"rem";
		//功能
     tag = e.children[0].innerHTML;
		next_goods = 0;
		document.getElementById("goodsList").innerHTML = "";
		getGoodsNumber();
		getGoods();
}
//查询物品 空格分隔分别查询
//查询方法有待优化
function searchWithText(){
	searchText = document.getElementById("searchText").value;
	next_goods = 0;
	document.getElementById("goodsList").innerHTML = "";
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
//预加载图片
var goodsList_layout = new waterFall_layout("goodsList",2,1,20);

function getGoods(){
	var xmlHttpRequest = createXmlHttpRequest();
	var url = "/cgi-bin/transaction/get_goods.php?searchText=" + searchText + "&sortType=" + sortType + "&dealType=" + dealType +"&tag=" + tag + "&pageSize=" + pageSize + "&next_goods=" + next_goods;
	xmlHttpRequest.onreadystatechange=function(){
     if(xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200){
     		//var goodsList = document.getElementById("goodsList");
		    var xmlDoc = xmlHttpRequest.responseXML;
		    //console.log(xmlDoc.getElementsByTagName("G_control")[0].childNodes[0].nodeValue);
		    var Gs = xmlDoc.getElementsByTagName("G");
		    //one by one load
		    for(var i=0;i<Gs.length;i++){
		    	// document.createElement();
		    	var G_id = xmlDoc.getElementsByTagName("G_id")[i].childNodes[0].nodeValue;;
		    	var G_name = xmlDoc.getElementsByTagName("G_name")[i].childNodes[0].nodeValue;
		    	var G_price = xmlDoc.getElementsByTagName("G_price")[i].childNodes[0].nodeValue;
          if(xmlDoc.getElementsByTagName("G_short")[i].hasChildNodes()){
            var G_short = xmlDoc.getElementsByTagName("G_short")[i].childNodes[0].nodeValue;
          }else{
            var G_short = ""; 
          }
          //图片预加载 必须用常量 不然会被清除
          const image = new Image().src = "../../data/goods/croImg/"+G_id+"_main.jpg";
          image.onload = goodsEload(G_id,G_name,G_price,G_short);
		    }
      }
	}
	xmlHttpRequest.open("GET",url,true);
	xmlHttpRequest.send();
}
function goodsEload(G_id,G_name,G_price,G_short){
  console.log("sdafs"+G_id);
	var code = "<li id='"+ G_id +"' class='goodsli' onclick='getMore(this)' style='display:none'>"+
								"<div>"+
									"<img src='../../data/goods/croImg/"+G_id+"_main.jpg' onerror='goodsImageLoad_error(this)' onload='goodsImageLoad(this)'>"+
									"<p class='good_name'>"+ G_name +"&nbsp &nbsp<span class='good_price'>"+ G_price +"￥</span></p>"+
									"<p class='good_short'>"+ G_short +"</p>"+
								"</div>"+
							"</li>";
	$("#goodsList").append(code);
	//document.getElementById("goodsList").innerHTML += code;
  next_goods++;
}
function goodsImageLoad(e){
  e.parentNode.parentNode.style.display = "block";
  //e.parentNode.parentNode.parentNode.removeChild(e.parentNode.parentNode);
  //e.parentNode.parentNode.style.display = "block";
  goodsList_layout.push(e.parentNode.parentNode);
  //goodsList_layout.refresh();
}
function goodsImageLoad_error(e){
  e.parentNode.parentNode.style.display = "block";
  goodsList_layout.push(e.parentNode.parentNode)
  e.style.display="none";
}

//获取已选择类型元素总数sum_goods
function getGoodsNumber(){
	var xhr = createXmlHttpRequest();
	var url = "/cgi-bin/transaction/get_goodsNumber.php?searchText=" + searchText + "&dealType=" + dealType +"&tag=" + tag;
	xhr.onreadystatechange=function(){
     //console.log("yy");
     if(xhr.readyState == 4 && xhr.status == 200){
      sum_goods = xhr.responseText;
      console.log("查询到商品总数:"+sum_goods);
    }
	}
	xhr.open("GET",url,true);
	xhr.send();
}
//滚动加载下一页商品
var canRun = true;
function Get_nextPageGoods(e){
   //alert("手机端可以使用")
   if(canRun){
	   if(e.scrollTop > (e.scrollHeight - e.clientHeight - 500)){
      //在手机端=不行 >= 部分可以 所以修正 减少了10 为了提前加载 所以增加了490
      //猜测原因式 小数问题
      console.log("获取历史数据");
      if(next_goods == sum_goods){
    	  console.log("当前商品数量："+next_goods+" 总商品数量："+sum_goods);
    	  // no more page 元素显示
    	  // console.log("no MORE goods");
    	  return;
		  }else{
        canRun = false;
			  getGoods();
        setTimeout(function(){canRun = true;},500);
		  }
    }
  }
}
function stopScroll(){
  //关闭autoscroll
  console.log("关闭自滚动");
  AutoScroll_isOpen = 0;
}
//刷新页面直接waterfall
//发布物品
var mainPicture;
var firstPicture;
var secondPicture;
var thirdPicture;
var fourthPicture;

// --------样式-----------
var G_dealType = "";
function openAddView_setDealType(str){
  if(document.getElementById("U_id").innerHTML == '1000000000'){
    //账户控制
      console.log(document.getElementById("U_id").innerHTML);
      var r = window.confirm("没有建立您的个人账户无法进入个人空间");
      if(r){
        LP_page_phone('LP_register');
      }
      return;

  }else{
    //主要
//	var addView = document.getElementById("addView");
//	var foot = document.getElementById("foot");
//	if(isOpen_addView){
//		addView.style.visibility = "hidden";
//		addView.style.opacity = "0";
//		addView.style.zIndex = "-1";
		//不设置表单置空

//		isOpen_addView = false;
//	}else{
//		addView.style.visibility = "visible";
//		addView.style.opacity = "1";
//		addView.style.zIndex = "2";

//		isOpen_addView = true;
//	}
    G_dealType = str;
    console.log(str);
    var publish_FillPage = document.getElementById("publish_FillPage");
    publish_FillPage.style.display = "block";
 }
}
function closeAddView(){
  var publish_FillPage = document.getElementById("publish_FillPage");
  publish_FillPage.style.display = "none";
  addViewPage_close_phone();
  
 	var ul=document.getElementById("tags");
	var lis = ul.children;
	filterWidthTag(lis[0]);
}
// -----------表单填写发送----------------
function goodPublish(){
	//检查表单是否填写完成
  if(!(/^.{1,35}$/.test(document.getElementById('G_name').value))){
    //1,35位名称
    alert("请输入1-35位字符作为您的商品名称");
    return;
  }else if(!(/^\d{1,5}$/.test(document.getElementById('G_price').value)) || Number(document.getElementById('G_price').value)>30000){
    alert("请输入30,000以下数字作为您的商品价格");
    return;
  }else if(!(/^.{1,20}$/.test(document.getElementById('G_contact').value))){
    alert("请输入1-20位字符作为您的联系方式");
    return;
  }

	//制造表单数据
	var formdata = new FormData();
	var G_name = document.getElementById('G_name').value;
	var G_price = document.getElementById('G_price').value;
	// G_publisher 通过后台 会话 获取
	// G_pTime 后台获取;
	var G_long = document.getElementById('G_long').value;
	var G_contact = document.getElementById('G_contact').value;

	var dealTypeR = document.getElementsByName("dealType");
//	var G_dealType = "";

//	for(var i =0;i<dealTypeR.length;i++){
//		if(dealTypeR[i].checked){
//			G_dealType = dealTypeR[i].value;
//      console.log(G_dealType[i].id);
//		}
//	}

	var gTags = document.getElementsByName("gTag");
	var G_Tags = "";
	// G_Tags用逗号分割的字符串组成
	for(var i =0;i<gTags.length;i++){
		if(gTags[i].checked){
       //console.log(gTags[i].id);
			if(G_Tags != ""){
				G_Tags = G_Tags + "," + gTags[i].value;
			}else{
				G_Tags = G_Tags +""+gTags[i].value;
			}
		}
	}
 //商品类型未选择提示
 if(G_Tags == ""){
   var r = confirm("商品类型不选择为其他");
   if(!r){
   return;
   }
 }

	formdata.append("G_name",G_name);
	formdata.append("G_price",G_price);
	formdata.append("G_contact",G_contact);
	formdata.append("G_long",G_long);
	formdata.append("G_dealType",G_dealType);
	formdata.append("G_tags",G_Tags);

	formdata.append("main",mainPicture);
	formdata.append("first",firstPicture);
	formdata.append("second",secondPicture);
	formdata.append("third",thirdPicture);
	formdata.append("fourth",fourthPicture);


	var url = "/cgi-bin/transaction/goodPublish.php";
	var xmlHttpRequest = createXmlHttpRequest();
	xmlHttpRequest.onreadystatechange = function(){
		if (xmlHttpRequest.readyState==4 && xmlHttpRequest.status==200){
        var answer = xmlHttpRequest.responseText;
        alert(answer);
    	}
	}
  	console.log(formdata);
	xmlHttpRequest.open("post",url,true);
	xmlHttpRequest.setRequestHeader("Content", "multipart/form-data");
	xmlHttpRequest.send(formdata);

	//表单置空
	document.getElementById("publish_FillPage").reset();
	//file置空
  mainPicture = null;
  firstPicture = null;
  secondPicture = null;
  thirdPicture = null;
  fourthPicture = null;
	document.getElementById("mainPicture").value = "";
	document.getElementById("firstPicture").value = "";
	document.getElementById("secondPicture").value = "";
	document.getElementById("thirdPicture").value = "";
	document.getElementById("fourthPicture").value = "";
 
 	document.getElementById("mainImgB").style.backgroundImage = "url('../img/image_phone/jia1.jpg')";
	document.getElementById("firstImgB").style.backgroundImage = "url('../img/image_phone/jia2.jpg')";
	document.getElementById("secondImgB").style.backgroundImage = "url('../img/image_phone/jia2.jpg')";
	document.getElementById("thirdImgB").style.backgroundImage = "url('../img/image_phone/jia2.jpg')";
	document.getElementById("fourthImgB").style.backgroundImage = "url('../img/image_phone/jia2.jpg')";
   //多选按钮重置
   var checkBoxs = document.getElementsByName("gTag");
   for(var i=0;i<checkBoxs.length;i++){
     checkBoxs[i].parentNode.style.filter = "saturate(0%)";
     checkBoxs[i].checked=false;
   }
}

//表单元素 样式与文件联动
// function radioCheck(){
// }
function labelCheck(e){
  if(e.children[0].checked){
    e.style.filter = "saturate(0%)";
    e.children[0].checked=false;
  }else{
    e.style.filter = "saturate(100%)";
    e.children[0].checked=true;
  }
}
//function setDealType(str){
//  var wrap = document.getElementById("wrap");
//	var addSell = document.getElementById("addSell");
//	var addBuy = document.getElementById("addBuy");
//	var addSellR = document.getElementById("addSellR");
//	var addBuyR = document.getElementById("addBuyR");
//	addSell.style.backgroundColor = "#c8c8c8";
//	addBuy.style.backgroundColor = "#c8c8c8";

//	switch(str){
//		case "sell":
//			addSell.style.backgroundColor = "#3898b4";
//     wrap.style.backgroundColor = "#f2f4f1";
//			addSellR.click();
 //     break;

//		case "buy":
//			addBuy.style.backgroundColor = "#875466";
//      wrap.style.backgroundColor = "#f0ede9";
//			addBuyR.click();
//      break;
//	}
//}
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
var i;
//i用于transaction_main的goodsView切换详细内容
function getMore(e){
//	$(".goodsli > div").css("background","#f2f4f1");
//	 e.firstElementChild.style.background = "#c4c5c4";
 // document.getElementById("loadingPage").style.display = "flex";
	//打开detailView窗口
	$("#detailPage").fadeIn(0);
	$("#detailPage").css("display","block");
	//获取i 
	var lis = document.getElementById("goodsList").children;
	for(var x=0;x<lis.length;x++){
		if(lis[x].id == e.id){
			i=x;
		}
	}
//  console.log(i);
//	console.log(e.id);
	getdetail(i);  
 
//  setTimeout(function(){
//    document.getElementById("loadingPage").style.display = "none";
//  },1000);

}

//方法拿出
function getdetail(i){
	var G_id = document.getElementById("goodsList").children[i].id;
	var xmlHttpRequest = createXmlHttpRequest();
	var url = "/cgi-bin/transaction/goodDetail.php?G_id="+G_id;
	xmlHttpRequest.onreadystatechange=function(){
    if(xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200){
		    var xmlDoc = xmlHttpRequest.responseXML;
		    console.log(xmlDoc.getElementsByTagName("G_control")[0].childNodes[0].nodeValue);

		    //装载信息
		    document.getElementById("detail_id").innerHTML = xmlDoc.getElementsByTagName("G_id")[0].childNodes[0].nodeValue;
				document.getElementById("detail_name2").innerHTML = xmlDoc.getElementsByTagName("G_name")[0].childNodes[0].nodeValue;
				document.getElementById("detail_price").innerHTML = xmlDoc.getElementsByTagName("G_price")[0].childNodes[0].nodeValue+"￥";
				document.getElementById("detail_time").innerHTML = xmlDoc.getElementsByTagName("G_time")[0].childNodes[0].nodeValue;
				document.getElementById("detail_publisher").innerHTML = xmlDoc.getElementsByTagName("G_publisher")[0].childNodes[0].nodeValue;
        document.getElementById("detail_publisherHeadImg").src = "../../data/user/userHeadImg/"+xmlDoc.getElementsByTagName("G_publisherheadImg")[0].childNodes[0].nodeValue+".jpg";
        if(xmlDoc.getElementsByTagName("G_contact")[0].hasChildNodes()){
          document.getElementById("detail_contact").innerHTML = xmlDoc.getElementsByTagName("G_contact")[0].childNodes[0].nodeValue;
        }else{
          document.getElementById("detail_contact").innerHTML = "";
        }
        if(xmlDoc.getElementsByTagName("G_long")[0].hasChildNodes()){
          document.getElementById("detail_long").style.display = "block"; 
          document.getElementById("detail_long").innerHTML = xmlDoc.getElementsByTagName("G_long")[0].childNodes[0].nodeValue;
        }else{
          document.getElementById("detail_long").style.display = "none"; 
        }
        //手机版特有
        var G_isCollect = xmlDoc.getElementsByTagName("G_isCollect")[0].childNodes[0].nodeValue;
        //console.log("G_isCollect:"+G_isCollect);
        if(tag == "我的发布"){
        	document.getElementById("detailPage_collect").style.backgroundImage = "url('../img/image_phone/delete.png')";
        }else if(tag != "我的发布" && G_isCollect == 1){
          document.getElementById("detailPage_collect").style.backgroundImage = "url('../img/image_phone/collect2.png')";
        }else if(tag != "我的发布" && G_isCollect == 0){
          document.getElementById("detailPage_collect").style.backgroundImage = "url('../img/image_phone/collect1.png')";
        }        
        //图片设置
        document.getElementById("detail_imgs").innerHTML =""+
        "<img src='../../data/goods/srcImg/"+G_id+"_main.jpg' onclick=\"getBigImg(\'"+ G_id +"_main\')\" onerror='this.style.display=\"none\"'>"+
        "<img src='../../data/goods/srcImg/"+G_id+"_first.jpg' onclick=\"getBigImg(\'"+ G_id +"_first\')\" onerror='this.style.display=\"none\"'>"+
        "<img src='../../data/goods/srcImg/"+G_id+"_second.jpg' onclick=\"getBigImg(\'"+ G_id +"_second\')\" onerror='this.style.display=\"none\"'>"+
        "<img src='../../data/goods/srcImg/"+G_id+"_third.jpg' onclick=\"getBigImg(\'"+ G_id +"_third\')\" onerror='this.style.display=\"none\"'>"+
        "<img src='../../data/goods/srcImg/"+G_id+"_fourth.jpg' onclick=\"getBigImg(\'"+ G_id +"_fourth\')\" onerror='this.style.display=\"none\"'>";
        
        //getBigImg(G_id +"_main");
        //必须放在这里 要等到detail加载完成才能获取到detail_id
        //if(tag == "我的收录" || tag == "我的发布"){
        //  NOMessage = 8;
        //  gMessageToB();
        //}
    }
	}
	xmlHttpRequest.open("GET",url,true);
	xmlHttpRequest.send();
}
function closeDetailPage(){
  document.getElementById("detailPage").style.display = "none";
}
function getBigImg(ids){
  document.getElementById("detail_left").firstChild.src = "../../data/goods/srcImg/"+ids+".jpg";
}
function wheel_size(e,Ele){
  if(e.wheelDelta >= 0){
    Ele.children[0].style.height = (Ele.children[0].offsetHeight + 100)+"px"; 
  }else{
    Ele.children[0].style.height = (Ele.children[0].offsetHeight - 100)+"px"; 
  }
 //console.log(Ele.children[0].offsetHeight);
//  alert(e.children[0].height);  
}
//不能用拖动 一旦拖动整个元素就跟着鼠标走了
//本质上是不拖动跟着鼠标移动到指定位置
var mouse_X;
var mouse_Y;
function mouse_down(e){
  mouse_X = e.clientX;
  mouse_Y = e.clientY;
}
function mouse_up(e,Ele){
  var top = Number(Ele.children[0].style.top.replace("px",""));
  var left = Number(Ele.children[0].style.left.replace("px",""));
  Ele.children[0].style.top = (top + e.clientY - mouse_Y)+"px";
  Ele.children[0].style.left = (left + e.clientX - mouse_X)+"px";
}
function addViewPage_close_phone(){
	var addViewPage = document.getElementById("addViewPage");
	addViewPage.style.display = "none";
}
function addViewPage_open_phone(){
	var addViewPage = document.getElementById("addViewPage");
	addViewPage.style.display = "block";
}
function LP_page_phone(str){
  document.getElementById("LP_main").style.display = "none";
  document.getElementById("LP_login").style.display = "none";
  document.getElementById("LP_cLogin").style.display = "none";
  document.getElementById("LP_register").style.display = "none";
  // document.getElementById("LP_introduce").style.display = "none";
  document.getElementById("LP_changePassword").style.display = "none";
  document.getElementById("detailPage").style.display = "none";
  switch(str){
    case "LP_main":
      document.getElementById("LP_main").style.display = "flex";
      break;
    case "LP_register":
      document.getElementById("LP_register").style.display = "block";
      break;
    case "LP_login": 
      document.getElementById("LP_login").style.display = "block";
      break;
    case "LP_cLogin": 
      document.getElementById("LP_cLogin").style.display = "block";
      break;
    case "LP_changePassword":
      document.getElementById("LP_changePassword").style.display = "block";
      break;
    default:
    	break;
    // case "LP_introduce":
    //   document.getElementById("LP_introduce").style.display = "block";
    //   break;
  }
}
function headImgLogin_phone(){
	if(document.getElementById("U_id").innerHTML == "1000000000"){
		LP_page_phone('LP_login');
	}else{
		LP_page_phone('LP_cLogin');
    document.getElementById("nowLogin_headImg").style.backgroundImage = document.getElementById("U_headImg").style.backgroundImage;
    document.getElementById("nowLogin_name").innerHTML = document.getElementById("U_name").innerHTML; 
    document.getElementById("nowLogin_id").innerHTML = document.getElementById("U_id").innerHTML;  
	}
}


function goHome_Self(str){
  if(location.pathname.split("/").pop() =="transaction_home.html" && str =='self'){
    if(document.getElementById("U_id").innerHTML == '1000000000'){
    //账户控制
      console.log(document.getElementById("U_id").innerHTML);
      var r = window.confirm("没有建立您的个人账户无法进入个人空间");
      if(r){
        LP_page_phone('LP_register');
      }
      return;
    }else{
    //主要
    window.location.pathname = "/html_phone/transaction_self.html";
    }
  }else if(location.pathname.split("/").pop() =="transaction_self.html" && str =='home'){
    window.location.pathname = "/html_phone/transaction_home.html";
  }
}

function textarea_ChangeHeight(e){
  if(e.scrollHeight > e.clientHeight){
    e.style.height = (e.scrollHeight + 25) + "px";
  }
}

//方法多次重用拿出
//加入记录
function goods_Record(){
    if(document.getElementById("U_id").innerHTML == '1000000000'){
    //账户控制
      console.log(document.getElementById("U_id").innerHTML);
      var r = window.confirm("没有建立您的个人账户无法进入个人空间");
      if(r){
        LP_page_phone('LP_register');
      }
      return;
      
  }else{
    var G_id = document.getElementById("detail_id").innerHTML;

    var xmlHttpRequest = createXmlHttpRequest();
    var url = "/cgi-bin/transaction/goodsRecord.php?G_id="+G_id;
    xmlHttpRequest.onreadystatechange=function(){
      if(xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200){
        var text = xmlHttpRequest.responseText;
        if(text == "个人收藏成功"){
          document.getElementById("detailPage_collect").style.backgroundImage = "url('../img/image_phone/collect2.png')";
        }else if(text == "个人收藏删除成功"){
          document.getElementById("detailPage_collect").style.backgroundImage = "url('../img/image_phone/collect1.png')";
        }else{
          console.log("添加/删除记录: "+text);
        }
      }
    }
  }
  xmlHttpRequest.open("GET",url,true);
  xmlHttpRequest.send();
}







//聊天部分程序
var NOMessage=12; //number of message
var newMessage_xhr = createXmlHttpRequest();
var source;
var source = new EventSource("/cgi-bin/goodsSelf/gFMessageToB.php?GM_goods=10&last_GM_id=50");
        source.onmessage = function(event){
          console.log("555");
          getFreshMessage(event.data);
        }
newMessage_xhr.onreadystatechange=function(){
  if (newMessage_xhr.readyState == 4 && newMessage_xhr.status == 200) {
    messageRound(newMessage_xhr.responseXML);
  }
}
//window.onload = function(){
//	transactionCommonInitial();
//  boardInit();
//};
function boardInit(){
  var goodslis=document.getElementsByClassName("goodsli");
  if(goodslis[0] != undefined){
    goodslis[0].click();
    
    //详情点击
    boardDetail();
    
  }else{
    console.log(goodslis[0] + "board初始化等待执行...");
    setTimeout(boardInit,50);
  }
}

function goodsRdelete(){
  var goodsName = document.getElementById("detail_name2").innerHTML;
  var r=confirm("确定将商品["+goodsName+"]从["+tag+"]中删除吗？");
  
  if(r){
    var G_id = document.getElementById("detail_id").innerHTML;
    var xmlHttpRequest = createXmlHttpRequest();
    //我的收录 与 我的发布不同 需要tag
    var url = "/cgi-bin/goodsSelf/goodsRDelete.php?G_id="+G_id+"&tag="+tag;
	  xmlHttpRequest.onreadystatechange=function(){
      if(xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200){
		    var text = xmlHttpRequest.responseText;
        alert(text);
        
        var THE_id = document.getElementById("detail_id").innerHTML;
        var goodsList = document.getElementById("goodsList");
        var goodss = goodsList.children;
        for(var i=0;i<goodss.length;i++){
          if(goodss[i].id == THE_id){
            goodsList.removeChild(goodsList.childNodes[i]);
          }
        }
        waterFall_layout("goodsList",2,1.5);
        closeDetailPage();
    }
	}
	xmlHttpRequest.open("GET",url,true);
	xmlHttpRequest.send();
  }
}

function boardDetail(){
  var board_detail = document.getElementById("board_detail");
  var board_contact = document.getElementById("board_contact");
  var contactView = document.getElementById("contactView");

  board_detail.style.background = "#f6f6f6";
  board_contact.style.background = "#ffff";

  board_detail.style.color = "#0966d8";
  board_contact.style.color = "#cdcdcd";

  board_detail.style.textShadow = "1px 1px 0px rgb(9, 102, 1.6,0.5)";
  board_contact.style.textShadow = "1px 1px 0px rgb(205, 205, 205,0.5)";

  contactView.style.display = "none";
}
function boardContact(){
  var board_detail = document.getElementById("board_detail");
  var board_contact = document.getElementById("board_contact");
  var contactView = document.getElementById("contactView");

  board_detail.style.background = "#ffff";
  board_contact.style.background = "#f6f6f6";

  board_detail.style.color = "#cdcdcd";
  board_contact.style.color = "#c46254";

  board_detail.style.textShadow = "1px 1px 0px rgb(205, 205, 205,0.5)";
  board_contact.style.textShadow = "1px 1px 0px rgb(196, 98, 84,0.5)";

  contactView.style.display = "block";
}



//聊天方法模块 后续集成到方法库里
function gMessageToS(){
  var GM_content = document.getElementById("chatMessage").value;
  if(GM_content ==""){
    document.getElementById("chatMessage").placeholder = "消息为空";
    return;
  }else{
    document.getElementById("chatMessage").placeholder = "输入寄出消息";
  }
  document.getElementById("chatMessage").value = "";
  var GM_goods = document.getElementById("detail_id").innerHTML;
  //console.log(GM_content);
  //console.log(GM_goods);



  var xmlHttpRequest = createXmlHttpRequest();
  var url = "/cgi-bin/goodsSelf/gMessageToS.php?GM_content=" + GM_content +"&GM_goods=" + GM_goods;
  // ·µ»Øxml
  xmlHttpRequest.onreadystatechange=function(){
     if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
        var text = xmlHttpRequest.responseText;
        console.log(text);
      }
  }
  xmlHttpRequest.open("GET",url,true);
  xmlHttpRequest.send();
}
function gMessageToB(){
  var GM_goods = document.getElementById("detail_id").innerHTML;
  //console.log("GM_goods"+ GM_goods);

  var xmlHttpRequest = createXmlHttpRequest();
  var url = "/cgi-bin/goodsSelf/gMessageToB.php?GM_goods=" + GM_goods + "&number=" + NOMessage;
  // ·µ»Øxml
  xmlHttpRequest.onreadystatechange=function(){
     if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
       newMessage_xhr.abort();
        //var text = xmlHttpRequest.responseText;
        var height = document.getElementById("chatList").scrollHeight;
        var U_id = document.getElementById("U_id").innerHTML;
        var xml = xmlHttpRequest.responseXML;
        //console.log("xml" + xml);
        var htmlcode ="";
        var GM_control = xml.getElementsByTagName("GM_control")[0].childNodes[0].nodeValue;
        var GMs = xml.getElementsByTagName("GM");
        var messageNum = 0;
        var last_GM_id= 0;
        for(var i=GMs.length-1;i>=0;i--){
          var xiaoxi_content;
          if(xml.getElementsByTagName("GM_content")[i].hasChildNodes()){
            xiaoxi_content = xml.getElementsByTagName("GM_content")[i].childNodes[0].nodeValue;
          }else{
            xiaoxi_content = "";
          }
          
          
          if(xml.getElementsByTagName("GM_sender")[i].childNodes[0].nodeValue == U_id){
          var code = "<li class='rightBar'>"+
				               "<div class='M_text'>"+
						             "<div class='textHead'>"+
													  "<p class='M_time'>"+ xml.getElementsByTagName("GM_time")[i].childNodes[0].nodeValue + "</p>"+
													  "<p class='M_name'>"+ xml.getElementsByTagName("GM_U_name")[i].childNodes[0].nodeValue + "</p>"+
										     "</div>"+
										     "<p class='M_content'>"+ xiaoxi_content +"</p>"+
										   "</div>"+
										   "<img class='M_head' src = '../../data/user/userHeadImg/"+ xml.getElementsByTagName("GM_U_headImg")[i].childNodes[0].nodeValue +".jpg'>"+
									   "</li>"
          }else{
          var code = "<li class='leftBar'>"+
                        "<img class='M_head' src = '../../data/user/userHeadImg/"+ xml.getElementsByTagName("GM_U_headImg")[i].childNodes[0].nodeValue +".jpg'>"+
                        "<div class='M_text'>"+
                          "<div class='textHead'>"+
                            "<p class='M_name'>"+ xml.getElementsByTagName("GM_U_name")[i].childNodes[0].nodeValue + "</p>"+
                            "<p class='M_time'>"+ xml.getElementsByTagName("GM_time")[i].childNodes[0].nodeValue + "</p>"+
                          "</div>"+
                          "<p class='M_content'>"+ xiaoxi_content +"</p>"+
                        "</div>"+
                        "</li>";
          }
          var GM_id = parseInt(xml.getElementsByTagName("GM_id")[i].childNodes[0].nodeValue);
          last_GM_id = ((parseInt(last_GM_id) >= GM_id) ? last_GM_id : GM_id);
          htmlcode = htmlcode + code;
          messageNum++;
        }
        if(htmlcode ==""){
          htmlcode = "---- no Message ----";
        }
        console.log("GM_control:"+GM_control);
        document.getElementById("chatList").innerHTML = htmlcode;
        NOMessage = messageNum;
          if(document.getElementById("chatList").scrollTop == 0){
            document.getElementById("chatList").scrollTop = document.getElementById("chatList").scrollHeight - height;
          }else{
            document.getElementById("chatList").scrollTop = document.getElementById("chatList").scrollHeight;
          }
        
        //source = new EventSource("/cgi-bin/goodsSelf/gFMessageToB.php?GM_goods=" + GM_goods + "&last_GM_id=" + last_GM_id);
        //source.onmessage = function(event){
        //  console.log("555");
        //  getFreshMessage(event.data);
        //}
        newMessage_xhr.open("GET","/cgi-bin/goodsSelf/gFMessageToB.php?GM_goods=" + GM_goods + "&last_GM_id=" + last_GM_id,true);
        newMessage_xhr.send();
        
      }
  }
  xmlHttpRequest.open("GET",url,true);
  xmlHttpRequest.send();
}
function openContactView(){
    if(document.getElementById("U_id").innerHTML == '1000000000'){
    //账户控制
      console.log(document.getElementById("U_id").innerHTML);
      var r = window.confirm("没有建立您的个人账户无法进入个人空间");
      if(r){
        LP_page_phone('LP_register');
      }
      return;  
  }else{
    document.getElementById("contactView").style.display = "block";
    gMessageToB();
  }
}
function closeContactView(){
  document.getElementById("detailPage").style.display = "none";
  document.getElementById("contactView").style.display = "none";
}
function getHistoryMessage(e){
  //滑条滚动到顶端获取历史消息 并添加
  if(e.scrollTop == 0){
    console.log("获取历史数据");
    NOMessage += 10;
    gMessageToB();
  }
}





function messageRound(xml){
  getFreshMessage(xml);
}




function getFreshMessage(xmlDoc){
//  console.log("sseText"+sseText);
//  if(window.DOMParser){
//    parser=new DOMParser();
//    xmlDoc=parser.parseFromString(sseText,"text/xml");
//  }else{
  // Internet Explorer
//    xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
//    xmlDoc.async=false;
//    xmlDoc.loadXML(sseText);
//  }
  //console.log(xmlDoc);
  var GM_goods = document.getElementById("detail_id").innerHTML;
  var U_id = document.getElementById("U_id").innerHTML;  
  var htmlcode ="";
  console.log(xmlDoc.getElementsByTagName("GM_control")[0].childNodes[0].nodeValue)
  var GMs = xmlDoc.getElementsByTagName("GM");
  var last_GM_id= 0;
        var messageNum = 0;
        for(var i=GMs.length-1;i>=0;i--){
          if(xmlDoc.getElementsByTagName("GM_sender")[i].childNodes[0].nodeValue == U_id){
          var code = "<li class='rightBar'>"+
				               "<div class='M_text'>"+
						             "<div class='textHead'>"+
													  "<p class='M_time'>"+ xmlDoc.getElementsByTagName("GM_time")[i].childNodes[0].nodeValue + "</p>"+
													  "<p class='M_name'>"+ xmlDoc.getElementsByTagName("GM_U_name")[i].childNodes[0].nodeValue + "</p>"+
										     "</div>"+
										     "<p class='M_content'>"+ xmlDoc.getElementsByTagName("GM_content")[i].childNodes[0].nodeValue +"</p>"+
										   "</div>"+
										   "<img class='M_head' src = '../../data/user/userHeadImg/"+ xmlDoc.getElementsByTagName("GM_U_headImg")[i].childNodes[0].nodeValue +".jpg'>"+
									   "</li>"
          }else{
          var code = "<li class='leftBar'>"+
                        "<img class='M_head' src = '../../data/user/userHeadImg/"+ xmlDoc.getElementsByTagName("GM_U_headImg")[i].childNodes[0].nodeValue +".jpg'>"+
                        "<div class='M_text'>"+
                          "<div class='textHead'>"+
                            "<p class='M_name'>"+ xmlDoc.getElementsByTagName("GM_U_name")[i].childNodes[0].nodeValue + "</p>"+
                            "<p class='M_time'>"+ xmlDoc.getElementsByTagName("GM_time")[i].childNodes[0].nodeValue + "</p>"+
                          "</div>"+
                          "<p class='M_content'>"+ xmlDoc.getElementsByTagName("GM_content")[i].childNodes[0].nodeValue +"</p>"+
                        "</div>"+
                        "</li>";
          }
          var GM_id = parseInt(xmlDoc.getElementsByTagName("GM_id")[i].childNodes[0].nodeValue);
          last_GM_id = ((parseInt(last_GM_id) >= GM_id) ? last_GM_id : GM_id);
          htmlcode = htmlcode + code;
          messageNum++;
        }
        if(document.getElementById("chatList").innerHTML == "---- no Message ----"){
          document.getElementById("chatList").innerHTML = htmlcode;
        }else{
          document.getElementById("chatList").innerHTML += htmlcode;
        }
        NOMessage += messageNum;
        document.getElementById("chatList").scrollTop = document.getElementById("chatList").scrollHeight;
  newMessage_xhr.open("GET","/cgi-bin/goodsSelf/gFMessageToB.php?GM_goods=" + GM_goods + "&last_GM_id=" + last_GM_id,true);
  newMessage_xhr.send();
}
//feedbackPage相关
function feedbackPage_open(){
  document.getElementById("feedbackPage").style.display = "block";		
}
function feedbackPage_close(){
  document.getElementById("feedbackPage").style.display = "none";		
}
function introducePage_open(){
  document.getElementById("introducePage").style.display = "block";		
}
function introducePage_close(){
  document.getElementById("introducePage").style.display = "none";		
}
function sendSitedMail(){
  var xmlHttpRequest = createXmlHttpRequest();	
  var url = "/cgi-bin/mailBox/siteMailToS.php";
  var SM_receiver = "厦门理工学院";
  var SM_content = document.getElementById("eContent").value;		

  xmlHttpRequest.onreadystatechange=function(){
    if (xmlHttpRequest.readyState==4 && xmlHttpRequest.status==200){
		  var r = confirm(xmlHttpRequest.responseText);
      if(r){
         feedbackPage_close();
      }
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
			xmlHttpRequest.send("SM_receiver=" + SM_receiver + "&SM_content="+ SM_content);
		}
}
//修改头像
function headImgChange(newHeadImg,dataUL_){
	var xmlHttpRequest = createXmlHttpRequest();
	var formdata = new FormData();
	formdata.append("newHeadImg",newHeadImg);

	var url = "/cgi-bin/self/updateHeadImg.php";
	xmlHttpRequest.onreadystatechange=function(){
    if(xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200){
    	alert(xmlHttpRequest.responseText+"!如下次登录发现头像未更改请不要担心,手机缓存下次更新时，头像会自动加载成功！");
       if(xmlHttpRequest.responseText == "修改成功"){
    			document.getElementById("U_headImg").style.backgroundImage = 'url(' + dataUL_ + ')';
          document.getElementById("nowLogin_headImg").style.backgroundImage = 'url(' + dataUL_ + ')';
       }
    }
	}
	xmlHttpRequest.open("POST",url,true);
	xmlHttpRequest.send(formdata);
}





