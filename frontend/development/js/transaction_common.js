var dealType = "sell";
var sortType = "G_pTime";
var tag = "全部物品";
var searchText = "";

// pageSize用于以此ajax传输goods个数
var pageSize = 25;
var sum_goods = 0;
//页面 上一页 本页 下一页 next_goods为查询时跳过的元组数量
var next_goods = 0;
//array_sum_page 用于前后翻页商品
var array_sum_page = new Array();
array_sum_page[1] = 0;
//不知道用于哪里
//var mainFile="";

// var isOpen_TagView = false;
var isOpen_addView = false;
var isOpen_helpView = false;
//body完成后渲染
function transactionCommonInitial(){
	screenInitial();
 //个人信息初始化
	frameInitial();
	
	//加载goods
	var ul=document.getElementById("tags");
	var lis = ul.children;
	filterWidthTag(lis[0]);
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

//排序样式onmouseover
function showSort(){
	var sortList =document.getElementById("sortList");
	var lis = sortList.children;
	sortList.style.visibility = "visible";
	sortList.style.height = "6.6rem";

	for(var i=0;i<lis.length;i++){
		lis[i].style.visibility = "visible";
		lis[i].style.opacity = "1";
	}
}
//排序样式onmouseout--优化完成
function closeSort(){
	var sortList =document.getElementById("sortList");
	var lis = sortList.children;
	sortList.style.visibility = "hidden";
	sortList.style.height = "0px";

	for(var i=0;i<lis.length;i++){
		lis[i].style.visibility = "hidden";
		lis[i].style.opacity = "0";
	}

}
//设置排序--查询物品 完成
function setSort(str){
	var sortText = document.getElementById("sortText");
	switch(str){
		case "time":
			sortText.value = "时间";
      sortType = 'G_pTime';
			break;
		case "price":
			sortText.value = "价格";
      sortType = 'G_price';
			break;
		default:
			break;
	}
	closeSort();
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

		decorate.style.top = "calc(" + (index * 20) + "px" + " + " +  (index * 1) + "rem)";
		//功能
     tag = e.children[2].innerHTML;
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
function getGoods(){
	var isFull=false;
	var xmlHttpRequest = createXmlHttpRequest();
	var url = "/cgi-bin/transaction/get_goods.php?searchText=" + searchText + "&sortType=" + sortType + "&dealType=" + dealType +"&tag=" + tag + "&pageSize=" + pageSize + "&next_goods=" + next_goods;
	xmlHttpRequest.onreadystatechange=function(){
     if(xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200){
     		var goodsList = document.getElementById("goodsList");
		    var xmlDoc = xmlHttpRequest.responseXML;
		    console.log(xmlDoc.getElementsByTagName("G_control")[0].childNodes[0].nodeValue);
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
		    	var code = "<li id='"+ G_id +"' class='goodsli' onclick='getMore(this)'>"+
												"<div>"+
													"<img src='../../data/goods/croImg/"+G_id+"_main.jpg' width='132px' onerror='this.style.display=\"none\"'>"+
													"<p class='good_name'>"+ G_name +"&nbsp &nbsp<span class='good_price'>"+ G_price +"￥</span></p>"+
													"<p class='good_short'>"+ G_short +"</p>"+
												"</div>"+
											"</li>";
					goodsList.innerHTML = goodsList.innerHTML + code;
					next_goods++;
          console.log("goodsList.clientWidth"+goodsList.clientWidth);
          console.log("goodsList.scrollWidth"+goodsList.scrollWidth);
          console.log("next_goods"+next_goods);

					//判断是否超出 超出删除最后子元素 跳出循环 设置isFull = true
					if(goodsList.clientWidth < goodsList.scrollWidth){
						goodsList.removeChild(goodsList.lastChild);
						isFull = true;
						next_goods--;
						break;
					}
		    }
		    //判断是否填满 没有再次获取 当获取的商品个数小于 pageSize表明商品获取完成 应该停止
		    if(!isFull && Gs.length == pageSize){
		    	console.log("再一次装载 "+next_goods);
		    	getGoods();
		    }else{
          console.log("goodsList.clientWidth"+document.getElementById("goodsList").clientWidth);
          console.log("goodsList.scrollWidth"+document.getElementById("goodsList").scrollWidth);
		    	console.log("转载完成 "+next_goods);
		    	//是否瀑布流式布局手机
			    if(window.innerWidth < 500){
	      		//手机端 一般标准像素 都在500以下
	      		waterFall_layout("goodsList",2,1.5);
	      	}else{
	      		//电脑端
	      	}
                            
          //修正
          setTimeout(function(){innerHTMl_yanchi_xiuzheng();},20);
		    }
      }
	}
	xmlHttpRequest.open("GET",url,true);
	xmlHttpRequest.send();
}
//innerHTMl_yanchi_xiuzheng 300ms修正
function innerHTMl_yanchi_xiuzheng(){
  console.log("修正goodsList.clientWidth"+document.getElementById("goodsList").clientWidth);
  console.log("修正goodsList.scrollWidth"+document.getElementById("goodsList").scrollWidth);
  if(document.getElementById("goodsList").clientWidth < document.getElementById("goodsList").scrollWidth){
		goodsList.removeChild(document.getElementById("goodsList").lastChild);
		next_goods--;
    setTimeout(function(){innerHTMl_yanchi_xiuzheng();},300);
  }
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


//发布物品
var mainPicture;
var firstPicture;
var secondPicture;
var thirdPicture;
var fourthPicture;

// --------样式-----------
function openAddView(e){
  if(document.getElementById("U_id").innerHTML == '1000000000'){
    //账户控制
      console.log(document.getElementById("U_id").innerHTML);
      var r = window.confirm("没有建立您的个人账户无法进入个人空间");
      if(r){
        document.getElementById("loginPart").style.display = "flex";
        LP_page('LP_register');
      }
      return;

  }else{
    //主要
	var addView = document.getElementById("addView");
	var foot = document.getElementById("foot");
	if(isOpen_addView){
		addView.style.visibility = "hidden";
		addView.style.opacity = "0";
		addView.style.zIndex = "-1";
		e.style.transform = "rotate(0deg)";
		foot.style.opacity = "1";
    foot.style.visibility = "visible";
		//不设置表单置空

		isOpen_addView = false;
	}else{
		addView.style.visibility = "visible";
		addView.style.opacity = "1";
		addView.style.zIndex = "2";
		e.style.transform = "rotate(135deg)";
		foot.style.opacity = "0";
    foot.style.visibility = "hidden";

		isOpen_addView = true;
	}
 }
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
	var G_dealType = "";

	for(var i =0;i<dealTypeR.length;i++){
		if(dealTypeR[i].checked){
			G_dealType = dealTypeR[i].value;
      console.log(G_dealType[i].id);
		}
	}

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
        console.log(answer);
    	}
	}
  console.log(formdata);
	xmlHttpRequest.open("post",url,true);
	xmlHttpRequest.setRequestHeader("Content", "multipart/form-data");
	xmlHttpRequest.send(formdata);

	//表单置空
	addView.reset();
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
 
 	document.getElementById("mainImgB").style.backgroundImage = "url('../img/transaction/imgDefault2.png')";
	document.getElementById("firstImgB").style.backgroundImage = "url('../img/transaction/imgDefault2.png')";
	document.getElementById("secondImgB").style.backgroundImage = "url('../img/transaction/imgDefault2.png')";
	document.getElementById("thirdImgB").style.backgroundImage = "url('../img/transaction/imgDefault2.png')";
	document.getElementById("fourthImgB").style.backgroundImage = "url('../img/transaction/imgDefault2.png')";
   //单选按钮重置
   document.getElementById("addSell").click();
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
function setDealType(str){
  var wrap = document.getElementById("wrap");
	var addSell = document.getElementById("addSell");
	var addBuy = document.getElementById("addBuy");
	var addSellR = document.getElementById("addSellR");
	var addBuyR = document.getElementById("addBuyR");
	addSell.style.backgroundColor = "#c8c8c8";
	addBuy.style.backgroundColor = "#c8c8c8";

	switch(str){
		case "sell":
			addSell.style.backgroundColor = "#3898b4";
      wrap.style.backgroundColor = "#f2f4f1";
			addSellR.click();
      break;

		case "buy":
			addBuy.style.backgroundColor = "#875466";
      wrap.style.backgroundColor = "#f0ede9";
			addBuyR.click();
      break;
	}
}
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
	$(".goodsli > div").css("background","#f2f4f1");
	 e.firstElementChild.style.background = "#c4c5c4";

	//打开detailView窗口
	$("#detailView").fadeIn(0);
	$("#detailView").css("display","flex");
	//获取i 
	var lis = document.getElementById("goodsList").children;
	for(var x=0;x<lis.length;x++){
		if(lis[x].id == e.id){
			i=x;
		}
	}
  console.log(i);
	console.log(e.id);
	getdetail(i);  
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
				document.getElementById("detail_contact").innerHTML = xmlDoc.getElementsByTagName("G_contact")[0].childNodes[0].nodeValue;
        if(xmlDoc.getElementsByTagName("G_long")[0].hasChildNodes()){
          document.getElementById("detail_long").style.display = "block"; 
          document.getElementById("detail_long").innerHTML = xmlDoc.getElementsByTagName("G_long")[0].childNodes[0].nodeValue;
        }else{
          document.getElementById("detail_long").style.display = "none"; 
        }
        
        //图片设置
        document.getElementById("detail_imgs").innerHTML =""+
        "<img src='../../data/goods/croImg/"+G_id+"_main.jpg' height='80px' onclick=\"getBigImg(\'"+ G_id +"_main\')\" onerror='this.style.display=\"none\"'>"+
        "<img src='../../data/goods/croImg/"+G_id+"_first.jpg' height='80px' onclick=\"getBigImg(\'"+ G_id +"_first\')\" onerror='this.style.display=\"none\"'>"+
        "<img src='../../data/goods/croImg/"+G_id+"_second.jpg' height='80px' onclick=\"getBigImg(\'"+ G_id +"_second\')\" onerror='this.style.display=\"none\"'>"+
        "<img src='../../data/goods/croImg/"+G_id+"_third.jpg' height='80px' onclick=\"getBigImg(\'"+ G_id +"_third\')\" onerror='this.style.display=\"none\"'>"+
        "<img src='../../data/goods/croImg/"+G_id+"_fourth.jpg' height='80px' onclick=\"getBigImg(\'"+ G_id +"_fourth\')\" onerror='this.style.display=\"none\"'>";
        
        getBigImg(G_id +"_main");
        
        //必须放在这里 要等到detail加载完成才能获取到detail_id
        if(tag == "我的收录" || tag == "我的发布"){
          NOMessage = 8;
          gMessageToB();
        }
    }
	}
	xmlHttpRequest.open("GET",url,true);
	xmlHttpRequest.send();
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
// function showTagView(){
// 	var onTags = document.getElementsByClassName("onTag");
// 	var tagView = document.getElementById("tagView");
// 	var tagViewB = document.getElementById("tagViewB");
// 	var foot = document.getElementById("foot");
// 	if(isOpen_TagView){
		//tagview界面
		// tagView.style.width = "0rem";
		// tagView.style.visibility = "hidden";
		// isOpen_TagView = false;
		// foot.style.visiblity = "visible";
		// foot.style.opacity = "1";

		// tagViewB.innerHTML = "&nbsp添加标签&nbsp";

		//tag界面
	// 	for(var i=0;i<onTags.length;i++){
	// 		onTags[i].style.visibility = "hidden";
	// 	}

	// 	pageInitial();
	// }else{
		//tagview界面
		// tagView.style.width = "calc(100% - 4rem)";
		// tagView.style.visibility = "visible";
		// isOpen_TagView = true;
		// foot.style.visiblity = "hidden";
		// foot.style.opacity = "0";


		// tagViewB.innerHTML = "&nbsp修改完成&nbsp";

		//tag界面
// 		for(var i=0;i<onTags.length;i++){
// 			onTags[i].style.visibility = "visible";
// 		}

// 		pageInitial();
// 	}
// }