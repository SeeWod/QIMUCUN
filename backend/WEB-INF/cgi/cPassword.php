<?php
require_once('dbconnect.php');
$R_id = $_POST["R_id"];
$R_password = $_POST["R_password"];
$R_phone = $_POST["R_phone"];

$sql = "update users set U_password = '{$R_password}' where U_id = {$R_id} and U_phone = '{$R_phone}'"; 
if(insert($sql)){
	echo "修改成功";
}else{
echo $sql;
	echo "用户名或手机号错误";
}

?>