<?php
require_once('../dbconnect.php');
session_start();
date_default_timezone_set("PRC");

$Tru_content = $_POST["TP_input"];
$Tru_publisher = $_SESSION["U_id"];
$Tru_publisherName = $_SESSION["U_name"];
$Tru_station = urldecode($_COOKIE["U_college"]);
$Tru_pTime = date("Y-m-d H:i:s"); //获取当前时间

$Tru_addName;
if($_POST["TP_hasName"] == "true"){
  $Tru_addName = "1";
}else{
  $Tru_addName = "0"; 
}

$sql = "INSERT INTO trumpets(Tru_content,Tru_addName,Tru_publisher,Tru_publisherName,Tru_pTime,Tru_station)values('{$Tru_content}',{$Tru_addName},{$Tru_publisher},'{$Tru_publisherName}','{$Tru_pTime}','{$Tru_station}')";

echo $sql;
$result = insert($sql);
if($result){
  echo "插入成功";
}else{
  echo "插入失败";
};

mysqli_free_result($result);
?>