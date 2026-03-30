//使用ajax方法：创建xmlhttprequest对象
function createXmlHttpRequest(){
	var xmlHttpRequest;

	if(typeof XMLHttpRequest != "undefined"){
        xmlHttpRequest = new XMLHttpRequest();
    }
    else if (window.ActiveXObject){
       xmlHttpRequest = new ActiveXObject("Microsoft.XMLHttp");
    }
    if(xmlHttpRequest == null){
       alert("Browser does not support XML Http Request");
       return;
    }
	return xmlHttpRequest;
}

//js暂停
function sleep(d){
  for(var t = Date.now();Date.now() - t <= d;);
}
//sleep(5000); 暂停5秒

//将base64转换为file
function dataURLtoFile(dataurl, filename) { 
   var arr = dataurl.split(',');
   var mime = arr[0].match(/:(.*?);/)[1];
   //base-64解码 -> ASCII码（0-31）[2^6]                          
   var bstr = atob(arr[1]);
   var n = bstr.length;
   var u8arr = new Uint8Array(n);
   //ASCII码 -> unit8Array8位无符号数组
   while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
   }
   return new File([u8arr], filename, { type: mime });
}
//解释：charCodeAt(n)将字符转为万国码的数字 因为ascll旨在0-31，所以返回的数字0-63;不会出现超过8位的大数字 
//注意：String.prototype.charCodeAt() 获取字符串的unicode编码
// ? ：问什么不把base-64直接转换为 二进制 或者 数字 ?用字典？




//将base64转换为blob
function dataURLtoBlob(dataurl) { 
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}
//将blob转换为file   暂不使用有问题
function blobToFile(theBlob, fileName){
   theBlob.lastModifiedDate = new Date();
   theBlob.name = fileName;
   return theBlob;
}
//Blob加了两个键值对 就变成了file对象？
// ？ blob 和 file 关系细节




//检查浏览器是否支持File对象
function isSupportFileApi() {
    if(window.File && window.FileList && window.FileReader && window.Blob) {
        return true;
    }
    return false;
}
//cookie
function setCookie(cname, cvalue, exdays){
    var d= new Date();
    //console.log(d.getTime());
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    //console.log(d.getTime());
    var expires = "expires="+d.toUTCString();
    document.cookie=cname+"="+cvalue+"; "+expires+"; path=/";
    //由于在页面设置cookie会存在path 所以path设置为/ 表示这个站点的cookie
}
function getCookie(cname){
  var name = cname + "=";
  //console.log("document.cookie"+document.cookie);
  var keyValues = document.cookie.split(';');
  for(var i=0; i<keyValues.length; i++){
    var c = keyValues[i].trim();
    if (c.indexOf(name)==0){
      return c.substring(name.length,c.length);
    }
  }
  return "";
}
function clearCookie(name){
    //将cookie的时间设为之前就删除了;
    setCookie(name,"",-1);
}
//
function selectionSort(arr) {
    var len = arr.length;
    var minIndex, temp;
    for (var i = 0; i < len - 1; i++) {
        minIndex = i;
        for (var j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {     //寻找最小的数
                minIndex = j;                 //将最小数的索引保存
            }
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    return arr;
}

//瀑布流布局
function waterFall_layout(containerEleId,column_counts,interval){
    //interval 为每个子元素margin或者padding
    var columns = new Array();

    for(var i = 0;i<column_counts;i++){
        columns[i] = 0;
    }

    var containerEle = document.getElementById(containerEleId);
    var children = containerEle.children;
    var width = 100/column_counts;

    for(var i = 0;i<children.length;i++){
        //使用数组自带的排序
        var arr = Array.from(columns);
        arr.sort(function(a,b){return a-b});
        var index = columns.indexOf(arr[0]);//返回第一次位置
        if(index == -1){
            alert("出错了");
        }
        children[i].style.width = "calc("+width+"% - "+(1.5*interval)+"rem";
        // children[i].style.padding = interval+"rem";    
        // children[i].style.position = "absolute";
        children[i].style.top = arr[0]+"px";
        if(index == 0){
            children[i].style.paddingLeft = interval+"rem";
        }else if(index == (column_counts - 1)){
            children[i].style.paddingRight = interval+"rem";
        }

        if(arr[0] == 0){
            children[i].style.paddingTop = (interval*0.5)+"rem";
            columns[index] += (children[i].clientHeight + 4);
            //8式interval rem的一半个
        }else{
            columns[index] += children[i].clientHeight;
        }
        children[i].style.left = (index*width)+"%";
        console.log(children[i].clientHeight);
    }
}




var AutoScroll_isOpen = 0; //计时器
var AutoScroll_timer;//执行器
function autoScroll(){
  var goodList = document.getElementById("goodsList");
  AutoScroll_timer = setInterval(function(){
    //console.log("子滚动"+ AutoScroll_isOpen);
    if(AutoScroll_isOpen > 2000){
      goodList.scrollTop ++;
    }
    AutoScroll_isOpen += 1; 
  },2);
}



//类 js中类就是以前的function创建对象 不过更加规范化
//使用方法：
//
class waterFall_layout{  
//这里不能命名 属性  
  constructor(container_EId,column_counts,interval,bottom){
    this.container = document.getElementById(container_EId);
    this.column_counts = column_counts;
    this.interval = interval;
    this.bottom = bottom;
    
    this.width = "calc(calc(100% - "+interval+"rem)/"+column_counts+" - "+this.interval+"rem)";
    
    this.columnsArray = new Array();
    for(var i = 0;i<column_counts;i++){
      this.columnsArray[i] = interval*0.5;
    }
  }
  
  //加入一个元素
  //这个元素里图片的高度已经确定
  push(e){
    var arr = Array.from(this.columnsArray);
    arr.sort(function(a,b){return a-b});//降序
    var index = this.columnsArray.indexOf(arr[0]);//返回第一次位置
    if(index == -1){
      alert("出错了");
    }//排序出现问题
    
    e.style.width = this.width;
    e.style.top = arr[0]+"px";
    e.style.left = "calc("+ (index+1)*this.interval + "rem + calc(" + index+" * "+this.width +"))";
    this.columnsArray[index] += (e.clientHeight + this.bottom);
    //console.log(children[i].clientHeight);
  }
  //刷新布局（删除元素的时候需要）
  refresh(){
    var children = $("#goodsList").children;
    console.log("长度"+children.length);
    for(var i = 0;i<this.column_counts;i++){
      this.columnsArray[i] = this.interval*0.5;
    }
    for(var i = 0;i<children.length;i++){
        //使用js数组自带的排序
        var arr = Array.from(this.columnsArray);
        arr.sort(function(a,b){return a-b});//降序
        var index = this.columnsArray.indexOf(arr[0]);//返回第一次位置
        if(index == -1){
            alert("出错了");
        }
        children[i].style.width = this.width;
        children[i].style.top = arr[0]+"px";
        children[i].style.left = "calc("+ (index+1)*this.interval + "rem + calc(" + index+" * "+this.width +"))";
        this.columnsArray[index] += (children[i].clientHeight + this.bottom);

        //console.log(children[i].clientHeight);
    }
  }


}