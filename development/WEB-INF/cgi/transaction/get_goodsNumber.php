<?php
//返回十个页面信息
require_once('../dbconnect.php');
session_start();   
$tag = $_GET["tag"];                                                                                                                 
$dealType = $_GET["dealType"];
$searchText = $_GET["searchText"];

$U_id = $_SESSION["U_id"];


if($tag == "全部物品"){
  if(empty($searchText)){
	  $sql_sum = "SELECT count(*) AS sum FROM goods where G_dealType = '" . $dealType."'";
  }else{
	  $sql_sum = "SELECT count(*) AS sum FROM goods where G_dealType = '" . $dealType."' AND G_name like '%" . $searchText."%'";
  }
}
else if($tag == "我的收录"){
//增加goodsSelf扩展 我的收录
//连接查询
  if($sortType == "G_pTime"){
    $sortType = "UGR_time";
  }

  if(empty($searchText)){
	  $sql_sum = "SELECT count(*) AS sum from goods,userGRecords where goods.G_id = userGRecords.G_id AND userGRecords.U_id = {$U_id} AND G_dealType = '" . $dealType . "'";
  }else{
	  $sql_sum = "SELECT count(*) AS sum from goods,userGRecords where goods.G_id = userGRecords.G_id AND userGRecords.U_id = {$U_id} AND G_dealType = '" . $dealType . "' AND G_name like '%" . $searchText . "%'";
  }
  
}else if($tag == "我的发布"){
//增加goodsSelf扩展 我的发布
  if(empty($searchText)){
	  $sql_sum = "SELECT count(*) AS sum from goods where G_dealType = '" . $dealType . "' AND G_publisher = {$U_id}";
  }else{
	  $sql_sum = "SELECT count(*) AS sum from goods where G_dealType = '" . $dealType . "' AND G_publisher = {$U_id} AND G_name like '%" . $searchText . "%'";
  }
}else{
  if(empty($searchText)){
	  $sql_sum = "SELECT count(*) AS sum FROM goods where G_dealType = '" . $dealType . "' AND G_tags LIKE '%" .$tag."%'";
  }else{
	  $sql_sum = "SELECT count(*) AS sum FROM goods where G_dealType = " . $dealType . "' AND G_name like '%" . $searchText . "%' AND G_tags LIKE '%" .$tag."%'";
  }
}

//echo $sql;
$result = query($sql_sum);
$row = mysqli_fetch_assoc($result);

echo $row["sum"];

//还有可以返回总数 这样箭头定位才有效
mysqli_free_result($result);
?>
