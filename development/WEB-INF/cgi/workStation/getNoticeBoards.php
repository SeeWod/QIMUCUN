<?php
require_once('../dbconnect.php');
session_start();
date_default_timezone_set("PRC");
  
$NB_station = urldecode($_COOKIE["U_college"]);
$NB_nowTime = date("Y-m-d");

$sql="SELECT NB_id from noticeBoards where NB_station = '{$NB_station}' AND NB_oTime > '{$NB_nowTime}'";
$result = query($sql);
 
header('Content-type: text/xml');
echo "<?xml version='1.0' encoding='UTF-8'?>";
echo "<root>";
if(mysqli_num_rows($result) > 0){
  echo "<NB_control>1</NB_control>";
  while($row = mysqli_fetch_assoc($result)){
    echo "<NB_id>{$row['NB_id']}</NB_id>";
  }
}else{
  echo "<NB_control>2{$sql}</NB_control>";
}
echo "</root>"; 

mysqli_free_result($result);
?>