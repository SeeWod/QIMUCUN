<?php
	require_once('../dbconnect.php');
  session_start();
	$G_id = $_GET["G_id"];
	//信息
	$G_name;
	$G_publisher;
	$G_publisherName;
  $G_publisherheadImg;
	$G_time;
	$G_price;
	$G_contact;
	$G_long;
  $G_isCollect;//1 true;0 false;

	$sql="SELECT G_name,G_publisher,G_price,G_pTime,G_long,G_contact from goods where G_id= {$G_id}";
	$result = query($sql);
 
header('Content-type: text/xml');
echo "<?xml version='1.0' encoding='UTF-8'?>";
echo "<root>";
if(mysqli_num_rows($result) > 0){
	$row=mysqli_fetch_assoc($result);
	$G_name = $row["G_name"];
	$G_publisher = $row["G_publisher"];
	$G_time = $row["G_pTime"];
	$G_price = $row["G_price"];
	$G_contact = $row["G_contact"];
	$G_long = $row["G_long"];
 
  $sql_user = "SELECT U_name,U_headImg from users where U_id = " . $G_publisher;
 	$result_user = query($sql_user);
  if(mysqli_num_rows($result_user) > 0){
		$row_user=mysqli_fetch_assoc($result_user);
		$G_publisherName = $row_user["U_name"];
    $G_publisherheadImg = $row_user["U_headImg"];
  }
     
  echo "<G_control>查询成功</G_control>";
	echo "<G>";
	echo "<G_id>{$G_id}</G_id>";
	echo "<G_name>{$G_name}</G_name>";
	echo "<G_price>{$G_price}</G_price>"; 
  echo "<G_long>{$G_long}</G_long>"; 
  echo "<G_publisher>{$G_publisherName}</G_publisher>"; 
  echo "<G_publisherheadImg>{$G_publisherheadImg}</G_publisherheadImg>";
  echo "<G_contact>{$G_contact}</G_contact>"; 
  echo "<G_time>{$G_time}</G_time>";
  
  $sql_isCollect = "SELECT U_id from userGRecords where G_id = {$G_id} AND U_id = {$_SESSION['U_id']}"; 
  $result_isCollect = query($sql_isCollect);
  if(mysqli_num_rows($result_isCollect) > 0){
    $G_isCollect = 1;
  }else{
    $G_isCollect = 0;
  }
  echo "<G_isCollect>{$G_isCollect}</G_isCollect>";  
	echo "</G>";
  }else{
	echo "<G_control>查询失败</G_control>";
}
echo "</root>"; 

mysqli_free_result($result);
mysqli_free_result($result_user);
?>