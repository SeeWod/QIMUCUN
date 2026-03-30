<?php
require_once('dbconnect.php');
$user = $_get["user"];
$chatRoom = $_get["chatRoom"];

//如果是个人的话 两个人可以互发消息 ， 如果是聊天群 寄出者只可会向聊天室发消息
if(chatRoom > 99999999999){
	//community
	//查找房间成员
	$sql_m = "select C_member from CMembers where C_id=" . $chatRoom;

	$result_m = query($sql_m);
	//查找成员发给房间的消息
	$sql_c = "select TOP 10 M_sender,M_receiver,M_content,M_time from messages1 where M_sender IN (" . sql_m .") ORDER BY M_time DESC";
	$result = query($sql);
}
// else{
	//user
	// $sql_u = "select M_sender,M_receiver,M_content,M_time from messages1 where (M_sender = " . $user . " and M_receiver = " . $user . ") or (M_receiver = " . $user . " and M_sender = " . $user . ")";
	// $result = query($sql);
// }


echo "<?xml version="1.0" encoding="UTF-8"?>"
if(mysqli_num_row($result)>0){
	while($row = mysqli_fetch_assoc($result)){
		echo "<message>";
		echo "<sender>" . $row['M_sender'] . "</sender>";
		echo "<receiver>" . $row['M_receiver'] . "</receiver>";
		echo "<content>" . $row['M_content'] . "</content>";
		echo "<time>" . $row['M_time'] . "</time>";
		echo "</message>";
	}
}else{
	echo "<script>console.log('查询聊天记录结果为0 或 查询失败')</script>";
}

mysqli_free_result($result);
?>

<!-- 前端添加验证传回结果是 xml  还是 <script>脚本</script> -->



<!--  xml形式输出
 <message>
 	<sender></sender>
	<receiver></receiver>
	<content></content>
 	<time></time>
 </message> -->
