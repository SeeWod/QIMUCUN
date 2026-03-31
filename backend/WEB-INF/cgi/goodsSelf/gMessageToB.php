<?php
require_once('../dbconnect.php');
$GM_goods = $_GET["GM_goods"];
$number = $_GET["number"];

//$sql语句没有完善
$sql = "SELECT GM_id,GM_sender,GM_content,GM_time from goodsMessages where GM_goods = {$GM_goods} order By GM_time DESC limit {$number}";
$result = query($sql);

header('Content-type: text/xml');
echo "<?xml version='1.0' encoding='UTF-8'?>";
echo "<root>";
if(mysqli_num_rows($result)>0){
  echo "<GM_control>查询成功</GM_control>";
	while($row = mysqli_fetch_assoc($result)){
	 	//用xml传输 降低传输文字 充分利用客户端处理功能
    $sql_u =  "SELECT U_name,U_headImg from users where U_id = {$row["GM_sender"]}";
    $result_u = query($sql_u);
    if(mysqli_num_rows($result_u)>0){ 
      $row_u = mysqli_fetch_assoc($result_u);
      echo "<GM>";
      echo "<GM_id>{$row["GM_id"]}</GM_id>";
	 	  echo "<GM_sender>{$row["GM_sender"]}</GM_sender>";
      echo "<GM_U_name>{$row_u["U_name"]}</GM_U_name>";
      echo "<GM_U_headImg>{$row_u["U_headImg"]}</GM_U_headImg>";
	 	  echo "<GM_content>{$row["GM_content"]}</GM_content>";
	 	  echo "<GM_time>{$row["GM_time"]}</GM_time>";
	 	  echo "</GM>";
     }
	 }
}else{
	echo "<GM_control>no Message</GM_control>";
}
echo "</root>";
mysqli_free_result($result);
mysqli_free_result($result_u);
?>