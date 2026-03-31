<?php
require_once('dbconnect.php');

$m_sender = $_GET["m_sender"];
$m_receiver = $_GET["m_receiver"];
$m_content = $_GET["m_content"];
$m_time = $_GET["m_time"];

$sql = "insert into messages(M_sender,M_receiver,M_content,M_time) values(" . $m_sender. "," . $m_receiver . ",'" . $m_content . "'," . $m_time ")";

$result = insert($sql);
if($result){
	echo "<script>console.log('消息记录成功')</script>";
}else{
	echo "<script>console.log('消息记录失败')</script>";

?>