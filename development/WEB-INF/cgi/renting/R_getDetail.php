<?php
require_once('../dbconnect.php');
session_start();
$R_id = $_GET["R_id"];

$sql="SELECT R_id,R_overview,R_address,R_name,R_size,R_roomType,R_houseType,R_furniture,R_serve,R_hire,R_payWay,R_waterCharge,R_electricCharge,R_networkCharge,R_rentType,R_rentTime,R_contact,R_collegeWalk from renting where R_id= {$R_id}";
$result = query($sql);
 
header('Content-type: text/xml');
echo "<?xml version='1.0' encoding='UTF-8'?>";
echo "<root>";
if(mysqli_num_rows($result) > 0){
	$row=mysqli_fetch_assoc($result);
	$R_id = $row["R_id"];
	$R_overview = $row["R_overview"];
	$R_address = $row["R_address"];
	$R_name = $row["R_name"];
	$R_size = $row["R_size"];
	$R_roomType = $row["R_roomType"];
 	$R_houseType = $row["R_houseType"];
 	$R_furniture = $row["R_furniture"];
 	$R_serve = $row["R_serve"];
 	$R_hire = $row["R_hire"];
 	$R_payWay = $row["R_payWay"];
 	$R_electricCharge = $row["R_electricCharge"];
 	$R_waterCharge = $row["R_waterCharge"];
	$R_networkCharge = $row["R_networkCharge"];
	$R_rentType = $row["R_rentType"];
 	$R_rentTime = $row["R_rentTime"];
  $R_contact = $row["R_contact"];
	$R_collegeWalk = $row["R_collegeWalk"];
 	$R_isCollect;//1 true;0 false;

	$sql_isCollect = "SELECT U_id from userRRecords where R_id = {$R_id} AND U_id = {$_SESSION['U_id']}"; 
	$result_isCollect = query($sql_isCollect);
	if(mysqli_num_rows($result_isCollect) > 0){
	  $R_isCollect = 1;
	}else{
	  $R_isCollect = 0;
	}
     
 	echo "<R_control>查询成功</R_control>";
	echo "<R>";
	echo "<R_id>{$R_id}</R_id>";
	echo "<R_overview>{$R_overview}</R_overview>";
	echo "<R_address>{$R_address}</R_address>";
	echo "<R_name>{$R_name}</R_name>"; 
	echo "<R_size>{$R_size}</R_size>"; 
	echo "<R_roomType>{$R_roomType}</R_roomType>"; 
	echo "<R_houseType>{$R_houseType}</R_houseType>";
	echo "<R_furniture>{$R_furniture}</R_furniture>"; 
	echo "<R_serve>{$R_serve}</R_serve>";
	echo "<R_hire>{$R_hire}</R_hire>"; 
	echo "<R_payWay>{$R_payWay}</R_payWay>";
	echo "<R_electricCharge>{$R_electricCharge}</R_electricCharge>";
	echo "<R_waterCharge>{$R_waterCharge}</R_waterCharge>"; 
	echo "<R_networkCharge>{$R_networkCharge}</R_networkCharge>";
	echo "<R_rentType>{$R_rentType}</R_rentType>";
	echo "<R_rentTime>{$R_rentTime}</R_rentTime>"; 
	echo "<R_contact>{$R_contact}</R_contact>"; 
	echo "<R_collegeWalk>{$R_collegeWalk}</R_collegeWalk>"; 
  echo "<R_isCollect>{$R_isCollect}</R_isCollect>";
	echo "</R>";
}else{
	echo "<R_control>查询失败</R_control>";
}
echo "</root>";

mysqli_free_result($result);
?>