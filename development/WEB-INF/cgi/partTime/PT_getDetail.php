<?php
require_once('../dbconnect.php');
session_start();
$PT_id = $_GET["PT_id"];

$sql="SELECT PT_id,PT_tag,PT_period,PT_place,PT_address,PT_time,PT_unit,PT_contact,PT_short,PT_salary,PT_salaryUnit,PT_payWay,PT_recruitNum,PT_long from partTimeBoard where PT_id= {$PT_id}";
$result = query($sql);
 
header('Content-type: text/xml');
echo "<?xml version='1.0' encoding='UTF-8'?>";
echo "<root>";
if(mysqli_num_rows($result) > 0){
	$row=mysqli_fetch_assoc($result);
	$PT_tag = $row["PT_tag"];
	$PT_period = $row["PT_period"];
	$PT_place = $row["PT_place"];
	$PT_address = $row["PT_address"];
	$PT_time = $row["PT_time"];
	$PT_unit = $row["PT_unit"];
 	$PT_contact = $row["PT_contact"];
 	$PT_short = $row["PT_short"];
 	$PT_salary = $row["PT_salary"];
 	$PT_salaryUnit = $row["PT_salaryUnit"];
 	$PT_payWay = $row["PT_payWay"];
	$PT_recruitNum = $row["PT_recruitNum"];
	$PT_long = $row["PT_long"];

	$sql_isCollect = "SELECT U_id from userPTRecords where PT_id = {$PT_id} AND U_id = {$_SESSION['U_id']}"; 
	$result_isCollect = query($sql_isCollect);
	if(mysqli_num_rows($result_isCollect) > 0){
	  $PT_isCollect = 1;
	}else{
	  $PT_isCollect = 0;
	}
	$PT_isCollect;//1 true;0 false;
     
 	echo "<PT_control>查询成功</PT_control>";
	echo "<PT>";
	echo "<PT_id>{$PT_id}</PT_id>";
	echo "<PT_tag>{$PT_tag}</PT_tag>";
	echo "<PT_period>{$PT_period}</PT_period>";
	echo "<PT_place>{$PT_place}</PT_place>"; 
	echo "<PT_address>{$PT_address}</PT_address>"; 
	echo "<PT_time>{$PT_time}</PT_time>"; 
	echo "<PT_unit>{$PT_unit}</PT_unit>";
	echo "<PT_contact>{$PT_contact}</PT_contact>"; 
	echo "<PT_short>{$PT_short}</PT_short>";
	echo "<PT_salary>{$PT_salary}</PT_salary>";
	echo "<PT_salaryUnit>{$PT_salaryUnit}</PT_salaryUnit>"; 
	echo "<PT_payWay>{$PT_payWay}</PT_payWay>";
	echo "<PT_recruitNum>{$PT_recruitNum}</PT_recruitNum>";
	echo "<PT_long>{$PT_long}</PT_long>"; 
	echo "<PT_isCollect>{$PT_isCollect}</PT_isCollect>"; 
	echo "</PT>";
  }else{
	echo "<PT_control>查询失败</PT_control>";
}
echo "</root>"; 

mysqli_free_result($result);
?>