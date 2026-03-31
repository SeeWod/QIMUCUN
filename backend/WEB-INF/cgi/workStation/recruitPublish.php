<?php
require_once('../dbconnect.php');
session_start();
date_default_timezone_set("PRC");

$ORB_name = $_POST["ORB_name"];
$ORB_content = $_POST["ORB_content"];
$ORB_require = $_POST["ORB_require"];

$ORB_reward = $_POST["ORB_reward"];
$ORB_station = $_SESSION["U_school"];

$ORB_publisher = $_SESSION["U_id"];
$ORB_pTime = date("Y-m-d H:i:s"); //获取当前时间

$sql = "INSERT INTO officerRecruitBoards(ORB_name,ORB_content,ORB_require,ORB_reward,ORB_station,ORB_publisher,ORB_pTime)values('{$ORB_name}','{$ORB_content}','{$ORB_require}','{$ORB_reward}','{$ORB_station}',{$ORB_publisher},'{$ORB_pTime}')";
//echo $sql;
$result = insert($sql);
if($result){
  echo "1插入成功";
}else{
  echo "2插入失败";
};


mysqli_free_result($result);
?>