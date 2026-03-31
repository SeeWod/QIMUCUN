<?php
require_once('../dbconnect.php');
session_start();
date_default_timezone_set("PRC");
$station = urldecode($_COOKIE["U_college"]);

header('Content-type: text/xml');
echo "<?xml version='1.0' encoding='UTF-8'?>";
echo "<root>";

$sql="SELECT AT_id,AT_type,AT_applicant,AT_isLook from applyTable where AT_college = '{$station}'";
$result = query($sql);
if(mysqli_num_rows($result) > 0){
  echo "<AT_control>1</AT_control>";
  while($row = mysqli_fetch_assoc($result)){
    echo "<AT>";
    echo "<AT_id>{$row['AT_id']}</AT_id>";
    echo "<AT_type>{$row['AT_type']}</AT_type>";
    echo "<AT_applicant>{$row['AT_applicant']}</AT_applicant>";
    if($row['AT_isLook'] == 0){
      echo "<AT_sign>sign_nolook</AT_sign>";
    }else{
      echo "<AT_sign>sign_over</AT_sign>";
    }

    $sql_u="SELECT U_name,U_headImg from users where U_id = {$row['AT_applicant']}";
    $result_u = query($sql_u);
    if(mysqli_num_rows($result_u) > 0){
      echo "<AT_Ucontrol>1</AT_Ucontrol>";
      $row_u = mysqli_fetch_assoc($result_u);
      echo "<AT_headImg>{$row_u['U_headImg']}</AT_headImg>";
      echo "<AT_alias>{$row_u['U_name']}</AT_alias>";
    }else{
      echo "<AT_Ucontrol>2{$sql_workers}</AT_Ucontrol>";
    }
    
    
    
    echo "</AT>";
  }
}else{
  echo "<AT_control>2{$sql}</AT_control>";
}
echo "</root>"; 

mysqli_free_result($result);
?>