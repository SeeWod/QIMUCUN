<?php
require_once('../dbconnect.php');
session_start();
date_default_timezone_set("PRC");
$SM_id = $_GET["SM_id"];

header('Content-type: text/xml');
echo "<?xml version='1.0' encoding='UTF-8'?>";
echo "<root>";

$sql_l="update siteMails set SM_isLook = 1 where SM_id = {$SM_id}";
$result_l = insert($sql_l);
if($result_l){
  echo "<SM_Lcontrol>1</SM_Lcontrol>";
}else{
  echo "<SM_Lcontrol>2{$sql_l}</SM_Lcontrol>";
}



$sql="SELECT SM_sender,SM_content from siteMails where SM_id = {$SM_id}";
$result = query($sql);
if(mysqli_num_rows($result) > 0){
  echo "<SM_control>1</SM_control>";
  $row = mysqli_fetch_assoc($result);
  echo "<SM>";
  echo "<SM_content>{$row['SM_content']}</SM_content>";  
  echo "</SM>";
}else{
  echo "<SM_control>2{$sql}</SM_control>";
}
echo "</root>"; 


mysqli_free_result($result);
?>