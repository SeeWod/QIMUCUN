<?php
require_once('../dbconnect.php');
session_start();
date_default_timezone_set("PRC");

$J_id = $_POST["id"];
$J_name = $_POST["name"];
$J_academy = $_POST["academy"];
$J_major = $_POST["major"];
$J_contact = $_POST["contact"];
$J_evaluation = $_POST["evaluation"];
$J_permission = bindec("0" . $_POST["permission"]);
echo $J_permission;
//$J_publisher = $_SESSION["U_id"];
$J_joinTime = date("Y-m-d H:i:s"); //获取当前时间

$sql_i = "INSERT INTO workers(W_id,W_name,W_academy,W_major,W_contact,W_evaluation,W_joinTime)values({$J_id},'{$J_name}','{$J_academy}','{$J_major}','{$J_contact}','{$J_evaluation}','{$J_joinTime}')";
$result_i = insert($sql_i);
if($result_i){
  echo "1插入成功";
}else{
  echo "2插入失败" . $sql_i;
}
$sql_p = "UPDATE users set U_permission = {$J_permission} where U_id ={$J_id}";
$result_p = insert($sql_p);
if($result_p){
  echo "1修正成功";
}else{
  echo "2修正失败".$sql_p;
};
mysqli_free_result($result_i);
mysqli_free_result($result_p);
?>