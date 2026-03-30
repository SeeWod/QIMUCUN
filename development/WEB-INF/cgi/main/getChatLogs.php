<?php
require_once('../dbconnect.php');
session_start();
//date_default_timezone_set("PRC");
//$NB_nowTime = date("Y-m-d");
$U_station = urldecode($_COOKIE["U_college"]);
 
header('Content-type: text/xml');
echo "<?xml version='1.0' encoding='UTF-8'?>";
echo "<root>";
//´óÑ§×ÜÂÛÌ³
echo "<CL>";
echo "<CL_id>100000000000</CL_id>";
echo "<CL_name>大学论坛</CL_name>";
echo "</CL>";
//±¾Ð£ÂÛÌ³
$sql_station = "SELECT C_id,C_name from communitys where C_name = '{$U_station}'";
//echo $sql_station;
$result_station = query($sql_station);
if(mysqli_num_rows($result_station) > 0){
  $row1 = mysqli_fetch_assoc($result_station);
  echo "<CL>";
  echo "<CL_id>{$row1['C_id']}</CL_id>";
  echo "<CL_name>{$U_station}</CL_name>";
  echo "</CL>";
}

echo "</root>";
mysqli_free_result($result_station);
?>