<?php
require_once('../dbconnect.php');
session_start();
$R_id = $_SESSION["U_id"];
$R_oldPassword = $_GET["U_oldPassword"];
$R_newPassword = $_GET["U_newPassword"];

$sql_V = "select U_password from users where U_id={$R_id}";
$result_V = query($sql_V);
if(mysqli_num_row($result_V)>0){
	$row = mysqli_fetch_assoc($result);
	if(password_verify($R_oldPassword, $row['U_password'])){
		$hash = password_hash($R_newPassword, PASSWORD_BCRYPT)
		$sql = "update users set U_password = '{$hash}' where U_id = {$R_id}"; 
		if(insert($sql)){
			echo "修改成功";
		}else{
			echo "错误！请反馈给客服";
		}
	}else{
		echo "原密码错误";
	}
}
?>