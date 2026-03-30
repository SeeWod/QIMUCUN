<?php
require_once('../dbconnect.php');
$AT_id = $_GET["AT_id"];

header('Content-type: text/xml');
echo "<?xml version='1.0' encoding='UTF-8'?>";
echo "<root>";
echo "<AT>";

$sql = "SELECT AT_id,AT_name,AT_academy,AT_major,AT_type,AT_contact,AT_evaluation,AT_applicant,AT_isLook from applyTable where AT_id = {$AT_id}";
$result = query($sql);
if(mysqli_num_rows($result) > 0){
  $row=mysqli_fetch_assoc($result);     
  echo "<AT_control>1查询成功</AT_control>";
  echo "<AT_name>{$row['AT_name']}</AT_name>";
  echo "<AT_applicant>{$row['AT_applicant']}</AT_applicant>";
  echo "<AT_academy>{$row['AT_academy']}</AT_academy>"; 
  echo "<AT_major>{$row['AT_major']}</AT_major>";
  echo "<AT_type>{$row['AT_type']}</AT_type>";
  echo "<AT_contact>{$row['AT_contact']}</AT_contact>";
  echo "<AT_evaluation>{$row['AT_evaluation']}</AT_evaluation>";
  
  if($row['AT_isLook'] == 1){
    echo "<AT_sign>sign_over</AT_sign>";
  }else{
    echo "<AT_sign>sign_nolook</AT_sign>";
  }
  $sql_u = "SELECT U_name from users where U_id = {$row['AT_applicant']}";
  $result_u = query($sql_u);
  $row_u=mysqli_fetch_assoc($result_u);
  echo "<AT_alias>{$row_u['U_name']}</AT_alias>";
 // echo "<AT_evaluation>{$row['AT_evaluation']}</AT_evaluation>";
  
}else{
  echo "<AT_control>2查询失败</AT_control>";
}
echo "</AT>";
echo "</root>"; 
mysqli_free_result($result);
mysqli_free_result($result_u);
?>