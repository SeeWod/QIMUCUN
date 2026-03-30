<?php
require_once('../dbconnect.php');
date_default_timezone_set("PRC");
session_start();

$M_sender = $_SESSION["U_id"]; 
$M_receiver = $_GET["M_receiver"];
$M_content = trim($_GET["M_content"]);
$M_time = date("Y-m-d H:i:s");
//echo "goods" . $GM_goods;
//echo "content" . $GM_content;

$sql = "INSERT INTO messages1 (M_sender,M_receiver,M_content,M_time) values ({$M_sender},{$M_receiver},'{$M_content}','{$M_time}')";
echo $sql;
$result=insert($sql);

if($result){
	echo "新记录插入成功";
}else{
	echo "新记录插入失败";
}
mysqli_free_result($result);
?>

