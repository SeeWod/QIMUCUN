<?php
require_once('../dbconnect.php');
session_start();
$R_id = $_SESSION["U_id"];
$R_name = $_GET["U_name"];

$sql = "update users set U_name = '{$R_name}' where U_id = {$R_id}"; 
if(insert($sql)){
	echo "修改成功";
}else{
echo $sql;
	echo "错误!请汇报 [站长]";
}

?>