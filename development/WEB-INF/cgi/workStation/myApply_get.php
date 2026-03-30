<?php
require_once('../dbconnect.php');
session_start();
$U_id = $_SESSION["U_id"];

header('Content-type: text/xml');
echo "<?xml version='1.0' encoding='UTF-8'?>";
echo "<root>";
echo "<AT>";

$sql = "SELECT AT_id,AT_name,AT_academy,AT_major,AT_type,AT_contact,AT_evaluation from applyTable where AT_applicant = {$U_id}";
$result = query($sql);
if(mysqli_num_rows($result) > 0){
  $row=mysqli_fetch_assoc($result);     
  echo "<AT_control>1查询成功</AT_control>";
  echo "<AT_name>{$row['AT_name']}</AT_name>";
  echo "<AT_academy>{$row['AT_academy']}</AT_academy>"; 
  echo "<AT_major>{$row['AT_major']}</AT_major>";
  echo "<AT_type>{$row['AT_type']}</AT_type>";
  echo "<AT_contact>{$row['AT_contact']}</AT_contact>";
  echo "<AT_evaluation>{$row['AT_evaluation']}</AT_evaluation>";

  $sql_b = "SELECT ORB_content,ORB_require,ORB_reward from officerRecruitBoards where ORB_name = '{$row['AT_type']}'";
  $result_b = query($sql_b);
  $row_b=mysqli_fetch_assoc($result_b); 
  echo "<AT_content>{$row_b['ORB_content']}</AT_content>";
  echo "<AT_require>{$row_b['ORB_require']}</AT_require>";
  echo "<AT_reward>{$row_b['ORB_reward']}</AT_reward>";
}else{
  echo "<AT_control>2查询失败{$sql}</AT_control>";
}
echo "</AT>";
echo "</root>"; 
mysqli_free_result($result);
mysqli_free_result($result_b);
?>
