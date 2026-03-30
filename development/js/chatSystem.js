// 由于chatsystem不会只在main页面产生 所以单独设立一个js模块
function ongetMessage{
	var chatList = document.getElementById("chatList");
	chatList.scrollTop = chatList.scrollHeight;
}
function sendMessage(Emessage){
	var xmlHttpRequest =createXmlHttpRequest();
	var url;

	var M_sender;
	var M_receiver = "00001"
	var M_content;
	var M_time;


	//创建xmlhttp对象


    if(document.getElementById("Emessage").value == null){
    	return;
    }else{
    	M_sender = document.getElementById("userId").value;
    	M_content = document.getElementById("Emessage").value;
    }


    url = "messageReceive.php"+"?name=" + strname + "&msg=" + strmsg;
    // oxmlHttpSend.onreadystatechange=function{

    // }
    oxmlHttpSend.open("GET",url,true);
    oxmlHttpSend.send(null);
}
//一个xmlHttprequest对象只能用一次，一般都是在方法里直接创建的，调用几次的方法 形成几个xmlhttprequest

// 加载历史消息 包含依次加载多少个
function getMessages(){
	var xmlHttpRequest =createXmlHttpRequest();
	var url;

	var chattype ="double";
	// double or multi
	var M_sender = document.getElementById("").value;
	var M_receiver = document.getElementById("").value;

	url = url + ?.....

	xmlHttpRequest.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	    	// xml接收数据并前端显示



	    	ongetMessage();
	    }
    }

	oxmlHttpSend.open("post",url,true);
    oxmlHttpSend.send(null);
}







