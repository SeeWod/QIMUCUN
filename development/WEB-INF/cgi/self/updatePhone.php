<?php
require_once('../dbconnect.php');
session_start();
$R_id = $_SESSION["U_id"];
$R_phone = $_GET["U_phone"];

$sql = "update users set U_phone = '{$R_phone}' where U_id = {$R_id}"; 
if(insert($sql)){
	echo "修改成功";
}else{
echo $sql;
	echo "用户名或手机号错误";
}

?>