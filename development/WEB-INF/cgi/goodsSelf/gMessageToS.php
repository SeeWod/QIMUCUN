<?php
require_once('../dbconnect.php');
date_default_timezone_set("PRC");
session_start();

$GM_goods = $_GET["GM_goods"]; 
$GM_sender = $_SESSION["U_id"];
$GM_content = trim($_GET["GM_content"]);
$GM_time = date("Y-m-d H:i:s");
//echo "goods" . $GM_goods;
//echo "content" . $GM_content;

$sql = "INSERT INTO goodsMessages(GM_sender,GM_goods,GM_content,GM_time)values({$GM_sender},{$GM_goods},'{$GM_content}','{$GM_time}')";
echo $sql;
$result=insert($sql);

if($result){
	echo "新记录插入成功";
}else{
	echo "新记录插入失败";
}
mysqli_free_result($result);
?>

