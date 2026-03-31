window.onload = function(){
  //transaction_home初始化 包括 屏幕适应初始换 frame个人信息等HTML文档初始化、page界面初始化
  //frame个人信息初始化要先 登录才能获取到后台数据
  //屏幕初始化
  screenInitial();
  document.getElementById("loginPart").style.height = window.innerHeight + "px";
  //frame个人信息初始化
  login_AUTO_manual();
};
//登录就是通过login_AUTO_manual(); 配合login.js和后台登陆文件三部分进行  由于transaction_home是初次进入页面 所以暂时放在这个页面里
function login_AUTO_manual(){ 
  var id = getCookie("id");
  var token = getCookie("token");
  var PHPSESSID = getCookie("PHPSESSID");
  //console.log("id "+id);
  //console.log("token "+token);
  if(PHPSESSID != ""){
    document.getElementById("loginPart").style.display = "none";
    transactionCommonInitial();
    
  }else{
  
    if(id != "" && token != ""){
      //auto登录
      login(true);
      return;
    }else{
      //manual
      document.getElementById("loginPart").style.display = "flex";    //显示登陆面板
      //游客登陆 就是关闭面板什么也不做 这样 前台没有存储 全局变量,后台没有 session值
      //后台请求资源 限制 没有登录无法请求 ------暂不设置（不需要防止黑客）
    }
  
  }
}


//detailView 方法集合
//1————获取更多商品信息
function detailViewClose(){
	$("#detailView").fadeOut(0);
}
//i共同方法看
function detail_next(){
  if(i < document.getElementById("goodsList").children.length - 1){
	  i++;
	  getdetail(i);
  }else{
    alert("已到达页面最后");
  }
}
function detail_pre(){
  if(i > 0){
	  i--;
	  getdetail(i);
  }else{
     alert("已到达页面最初");
  }
}
function goSelf(){
  if(document.getElementById("U_id").innerHTML == '1000000000'){
    console.log();
    //账户控制
      var r = window.confirm("没有建立您的个人账户无法进入个人空间");
      if(r){
        document.getElementById("loginPart").style.display = "flex";
        LP_page('LP_register');
        return;
      }else{
        return;
      }
  }else{
    //主要
    window.location.assign("../html/transaction_self.html");
  }
}
//方法多次重用拿出
//加入记录
function goods_Record(){
    if(document.getElementById("U_id").innerHTML == '0'){
    //账户控制
      console.log(document.getElementById("U_id").innerHTML);
      var r = window.confirm("没有建立您的个人账户无法进入个人空间");
      if(r){
        document.getElementById("loginPart").style.display = "flex";
        LP_page('LP_register');
      }
      return;

  }else{
	  var G_id = document.getElementById("detail_id").innerHTML;

	  var xmlHttpRequest = createXmlHttpRequest();
	  var url = "/cgi-bin/transaction/goodsRecord.php?G_id="+G_id;
	  xmlHttpRequest.onreadystatechange=function(){
      if(xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200){
    	  var text = xmlHttpRequest.responseText;
    	  console.log("进入记录:"+text);
       
       setTimeout(function(){
                 window.location.assign("../html/transaction_self.html")
       }, 1000); //单位是毫秒
      }
    }
	}
	xmlHttpRequest.open("GET",url,true);
	xmlHttpRequest.send();
}