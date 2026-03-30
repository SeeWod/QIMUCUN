<?php
require_once('../dbconnect.php');
session_start();
date_default_timezone_set("PRC");

$AT_name = $_POST["AT_name"];
$AT_college = $_SESSION["U_school"];
$AT_academy = $_POST["AT_academy"];
$AT_major = $_POST["AT_major"];
$AT_contact = $_POST["AT_contact"];
$AT_type = $_POST["AT_type"];
$AT_evaluation = $_POST["AT_evaluation"];
$AT_pTime = date("Y-m-d H:i:s");
$AT_applicant = $_SESSION["U_id"];

//因为要返回插入的id值 所以必须建立一个独立的连接器， id 用于图片链接 兼职没有图片 
$sql = "INSERT INTO applyTable(AT_name,AT_college,AT_academy,AT_major,AT_contact,AT_type,AT_evaluation,AT_pTime,AT_applicant)values('{$AT_name}','{$AT_college}','{$AT_academy}','{$AT_major}','{$AT_contact}','{$AT_type}','{$AT_evaluation}','{$AT_pTime}',{$AT_applicant})";

echo $sql;
$result = insert($sql);
if($result){
  echo "插入成功";
}else{
  echo "插入失败";
};


mysqli_free_result($result);
?>