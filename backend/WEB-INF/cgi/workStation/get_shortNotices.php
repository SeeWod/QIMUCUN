<?php
require_once('../dbconnect.php');
session_start();
date_default_timezone_set("PRC");
$NB_station = urldecode($_COOKIE["U_college"]);
$NB_nowTime = date("Y-m-d");

header('Content-type: text/xml');
echo "<?xml version='1.0' encoding='UTF-8'?>";
echo "<root>";
//now
$sql="SELECT NB_id,NB_unit,NB_oTime from noticeBoards where NB_station = '{$NB_station}' AND NB_oTime > '{$NB_nowTime}'";
$result = query($sql);
if(mysqli_num_rows($result) > 0){
  echo "<NBn_control>1</NBn_control>";
  while($row = mysqli_fetch_assoc($result)){
    echo "<NBn>";
    echo "<NBn_id>{$row['NB_id']}</NBn_id>";
    echo "<NBn_unit>{$row['NB_unit']}</NBn_unit>";
    echo "<NBn_oTime>{$row['NB_oTime']}</NBn_oTime>";
    echo "</NBn>";
  }
}else{
  echo "<NBn_control>2{$sql}</NBn_control>";
}
//expired
$sqle="SELECT NB_id,NB_unit,NB_period,NB_price,NB_oTime from noticeBoards where NB_station = '{$NB_station}' AND NB_oTime <= '{$NB_nowTime}'";
$resulte = query($sqle);
if(mysqli_num_rows($resulte) > 0){
  echo "<NBe_control>1</NBe_control>";
  while($row = mysqli_fetch_assoc($resulte)){
    echo "<NBe>";
    echo "<NBe_id>{$row['NB_id']}</NBe_id>";
    echo "<NBe_unit>{$row['NB_unit']}</NBe_unit>";
    echo "<NBe_period>{$row['NB_period']}</NBe_period>";
    echo "<NBe_price>{$row['NB_price']}</NBe_price>";
    echo "<NBe_oTime>{$row['NB_oTime']}</NBe_oTime>";
    echo "</NBe>";
  }
}else{
  echo "<NBe_control>2</NBe_control>";
}


echo "</root>"; 
mysqli_free_result($result);
mysqli_free_result($resulte);
?>