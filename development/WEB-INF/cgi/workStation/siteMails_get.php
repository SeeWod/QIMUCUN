<?php
require_once('../dbconnect.php');
session_start();
date_default_timezone_set("PRC");
$station = $_GET["W_station"];

header('Content-type: text/xml');
echo "<?xml version='1.0' encoding='UTF-8'?>";
echo "<root>";

$sql_sum="SELECT count(*) as SM_sum from siteMails where SM_receiver = '{$station}'";
$result_sum = query($sql_sum);
if(mysqli_num_rows($result_sum) > 0){
  $row_sum = mysqli_fetch_assoc($result_sum);
  echo "<SM_sum>{$row_sum['SM_sum']}</SM_sum>";
}else{
  echo "<SM_sum>0</SM_sum>";
}

$sql="SELECT SM_id,SM_sender,SM_isDeal,SM_isLook from siteMails where SM_receiver = '{$station}' order by SM_pTime DESC";
$result = query($sql);
if(mysqli_num_rows($result) > 0){
  echo "<SM_control>1</SM_control>";
  while($row = mysqli_fetch_assoc($result)){
    echo "<SM_sum>{$row['SM_sum']}</SM_sum>";
    echo "<SM>";
    echo "<SM_id>{$row['SM_id']}</SM_id>";
    if($row['SM_isDeal'] == "1" && $row['SM_isLook'] == "1"){
      echo "<SM_sign>sign_over</SM_sign>";
    }else if($row['SM_isDeal'] == "1" || $row['SM_isLook'] == "1"){
      echo "<SM_sign>sign_nodeal</SM_sign>";
    }else{
      echo "<SM_sign>sign_nolook</SM_sign>";
    }

    $sql_u="SELECT U_name,U_headImg from users where U_id = {$row['SM_sender']}";
    $result_u = query($sql_u);
    if(mysqli_num_rows($result_u) > 0){
      echo "<SM_Ucontrol>1</SM_Ucontrol>";
      $row_u = mysqli_fetch_assoc($result_u);
      echo "<SM_name>{$row_u['U_name']}</SM_name>";
      echo "<SM_headImg>{$row_u['U_headImg']}</SM_headImg>";
    }else{
      echo "<SM_Ucontrol>2{$sql_workers}</SM_Ucontrol>";
    }
    
    
    
    echo "</SM>";
  }
}else{
  echo "<SM_control>2{$sql}</SM_control>";
}
echo "</root>"; 

mysqli_free_result($result);
?>