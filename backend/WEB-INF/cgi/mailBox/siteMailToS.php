<?php
require_once('../dbconnect.php');
session_start();
date_default_timezone_set("PRC");
$SM_sender = $_SESSION["U_id"];
//$SM_receiver = urldecode($_COOKIE["U_college"]);
$SM_receiver = trim($_POST["SM_receiver"]);
$SM_content = trim($_POST["SM_content"]);
$SM_pTime = date("Y-m-d H:i:s");


$sql = "INSERT INTO siteMails(SM_sender,SM_receiver,SM_content,SM_pTime)values({$SM_sender},'{$SM_receiver}','{$SM_content}','{$SM_pTime}')";
//echo $sql;
$result=insert($sql);

if($result){
	echo "邮件发送成功";
}else{
	echo "邮件发送失败";
}
mysqli_free_result($result);
?>

