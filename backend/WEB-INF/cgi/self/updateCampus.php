<?php
require_once('../dbconnect.php');
session_start();
$R_id = $_SESSION["U_id"];
$R_college = $_GET["U_college"];
$R_sid = $_GET["U_sid"];

$sql = "update users set U_school = '{$R_college}',U_sid = '{$R_sid}' where U_id = {$R_id}"; 
if(insert($sql)){
	echo "修改成功";
}else{
echo $sql;
	echo "用户名或手机号错误";
}

?>