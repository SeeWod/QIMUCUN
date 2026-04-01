window.onload = function(){
  //初始化 包括 屏幕大小初始换、frame-left_part个人信息初始化、加载第一批商品
  screenInitial();
  document.getElementById("navigation").style.top = "calc("+window.innerHeight+"px - 4rem)";
  //frame个人信息初始化
  login_AUTO_manual();
};

function login_AUTO_manual(){ 
  var id = getCookie("id");
  var token = getCookie("token");
  var PHPSESSID = getCookie("PHPSESSID");
  if(PHPSESSID != ""){
		document.getElementById("LP_main").style.display = "none";
    transactionCommonInitial();
  }else if(id != "" && token != ""){
    //auto登录
    login(true);
    return;
  }else{
      //manual
      document.getElementById("LP_main").style.display = "flex";    //显示登陆面板
      //游客登陆 就是关闭面板什么也不做 这样 前台没有存储 全局变量,后台没有 session值
      //后台请求资源 限制 没有登录无法请求 ------暂不设置（不需要防止黑客）
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

//方法多次重用拿出
//加入记录