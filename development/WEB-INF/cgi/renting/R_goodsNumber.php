<?php
//返回十个页面信息
require_once('../dbconnect.php');
session_start();   
//语句化
$tag = $_GET["S_tag"];
$U_id = $_SESSION["U_id"];


if($tag == "全部信息"){
  $sql_sum = "SELECT count(*) AS sum from renting";
}else if($tag == "我的收藏"){
  $sql_sum = "SELECT count(*) AS sum from userRRecords where U_id = {$U_id}";
}else if($tag == "我的发布"){
  $sql_sum = "SELECT count(*) AS sum from renting where R_publisher = {$U_id}";
}

//echo $sql;
$result = query($sql_sum);
$row = mysqli_fetch_assoc($result);

echo $row["sum"];

//还有返回总数 这样随机才有效
mysqli_free_result($result);
?>
