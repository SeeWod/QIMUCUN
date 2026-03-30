<?php
	require_once('../dbconnect.php');
  session_start();
	$NB_id = $_GET["NB_id"];
	//信息
//$NB_unit;
//$NB_contact;
//$NB_sTime;
//$NB_oTime;
//$NB_price;
//$NB_period;
//$NB_publisher;
//$NB_pTime;
//$NB_station;
//$NB_long;

$sql="SELECT NB_unit,NB_contact,NB_sTime,NB_oTime,NB_price,NB_period,NB_publisher,NB_pTime,NB_station,NB_long from noticeBoards where NB_id= {$NB_id}";
$result = query($sql);
 
header('Content-type: text/xml');
echo "<?xml version='1.0' encoding='UTF-8'?>";
echo "<root>";
if(mysqli_num_rows($result) > 0){
	$row=mysqli_fetch_assoc($result);     
  echo "<NB_control>1查询成功</NB_control>";
	echo "<NB>";
	echo "<NB_id>{$NB_id}</NB_id>";
	echo "<NB_unit>{$row['NB_unit']}</NB_unit>";
	echo "<NB_contact>{$row['NB_contact']}</NB_contact>"; 
  echo "<NB_period>{$row['NB_period']}</NB_period>";
  echo "<NB_sTime>{$row['NB_sTime']}</NB_sTime>";
  echo "<NB_oTime>{$row['NB_oTime']}</NB_oTime>"; 
  echo "<NB_price>{$row['NB_price']}</NB_price>";
  echo "<NB_long>{$row['NB_long']}</NB_long>";
  echo "<NB_publisher>{$row['NB_publisher']}</NB_publisher>";
  echo "<NB_pTime>{$row['NB_pTime']}</NB_pTime>";
  echo "<NB_station>{$row['NB_station']}</NB_station>";  
  echo "</NB>";
  }else{
	echo "<NB_control>2查询失败</NB_control>";
}
echo "</root>"; 

mysqli_free_result($result);
?>