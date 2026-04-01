<?php
//返回十个页面信息
require_once('../dbconnect.php'); 
session_start(); 
$tag = $_GET["tag"];                                                                                                                 
$sortType = $_GET["sortType"];
$dealType = $_GET["dealType"];
$searchText = trim($_GET["searchText"]);

$pageSize = $_GET["pageSize"];

$U_id = $_SESSION["U_id"];
if($_GET["next_goods"] == 0){
  $index_goods = "0";
}else{
  $index_goods = $_GET["next_goods"];
}
//echo " dd" .$index_goods."  ";

// ？ 不足10行怎么办
if($tag == "全部物品"){
  if(empty($searchText)){
	  $sql = "SELECT G_id,G_name,G_price,G_long from goods where G_dealType = '" . $dealType . "' ORDER BY " . $sortType . " DESC LIMIT " .$index_goods.",".$pageSize;
  }else{
	  $sql = "SELECT G_id,G_name,G_price,G_long from goods where G_dealType = '" . $dealType . "' AND G_name like '%" . $searchText . "%' ORDER BY " . $sortType . " DESC LIMIT " .$index_goods.",".$pageSize;
  }
}else if($tag == "我的收藏"){
//增加goodsSelf扩展 我的收录
//连接查询
  if($sortType == "G_pTime"){
    $sortType = "UGR_time";
  }

  if(empty($searchText)){
	  $sql = "SELECT goods.G_id,G_name,G_price,G_long from goods,userGRecords where goods.G_id = userGRecords.G_id AND userGRecords.U_id = {$U_id} AND G_dealType = '" . $dealType . "' ORDER BY " . $sortType . " DESC LIMIT " .$index_goods.",".$pageSize;
  }else{
	  $sql = "SELECT goods.G_id,G_name,G_price,G_long from goods,userGRecords where goods.G_id = userGRecords.G_id AND userGRecords.U_id = {$U_id} AND G_dealType = '" . $dealType . "' AND G_name like '%" . $searchText . "%' ORDER BY " . $sortType . " DESC LIMIT " .$index_goods.",".$pageSize;
  }
  
}else if($tag == "我的发布"){
//增加goodsSelf扩展 我的发布
  if(empty($searchText)){
	  $sql = "SELECT G_id,G_name,G_price,G_long from goods where G_dealType = '" . $dealType . "' AND G_publisher = {$U_id} ORDER BY " . $sortType . " DESC LIMIT " .$index_goods.",".$pageSize;
  }else{
	  $sql = "SELECT G_id,G_name,G_price,G_long from goods where G_dealType = '" . $dealType . "' AND G_publisher = {$U_id} AND G_name like '%" . $searchText . "%' ORDER BY " . $sortType . " DESC LIMIT " .$index_goods.",".$pageSize;
  }
}else{
  if(empty($searchText)){
	  $sql = "SELECT G_id,G_name,G_price,G_long from goods where G_dealType = '" . $dealType . "' AND G_tags LIKE '%" .$tag."%' ORDER BY " . $sortType . "   DESC LIMIT " .$index_goods.",".$pageSize;
  }else{
	  $sql = "SELECT G_id,G_name,G_price,G_long from goods where G_dealType = '" . $dealType . "' AND G_name like '%" . $searchText . "%' AND G_tags LIKE '%" .$tag."%' ORDER BY " . $sortType . " DESC LIMIT " .$index_goods.",".$pageSize;
  }
}


if($sortType == "G_price"){
  $sql = str_replace("DESC","",$sql);
}



$result = query($sql);
  
header('Content-type: text/xml');
echo "<?xml version='1.0' encoding='UTF-8'?>";
echo "<root>";
if(mysqli_num_rows($result) > 0){
	echo "<G_control>查询成功</G_control>";
	while($row = mysqli_fetch_assoc($result)){
		echo "<G>";
		echo "<G_id>{$row["G_id"]}</G_id>";
		echo "<G_name>{$row["G_name"]}</G_name>";
		echo "<G_price>{$row["G_price"]}</G_price>";
   
    if(strlen($row["G_long"]<=100)){
		  echo "<G_short>{$row["G_long"]}</G_short>";
    }else{
      echo "<G_short>".substr($row["G_long"],0,100)."...</G_short>";
    }
    
		echo "</G>";
	}
}else{
	echo "<G_control>查询失败 {$sql}</G_control>";
}
echo "</root>";

mysqli_free_result($result);
?>