<?php
require_once('../dbconnect.php');
$ORB_id = $_GET["ORB_id"];

header('Content-type: text/xml');
echo "<?xml version='1.0' encoding='UTF-8'?>";
echo "<root>";
echo "<ORB>";

$sql = "SELECT ORB_name,ORB_content,ORB_require,ORB_reward from officerRecruitBoards where ORB_id = {$ORB_id}";
$result = query($sql);
if(mysqli_num_rows($result) > 0){
  $row=mysqli_fetch_assoc($result);     
  echo "<ORB_control>1查询成功</ORB_control>";

  echo "<ORB_name>{$row['ORB_name']}</ORB_name>";
  echo "<ORB_content>{$row['ORB_content']}</ORB_content>";
  echo "<ORB_require>{$row['ORB_require']}</ORB_require>";
  echo "<ORB_reward>{$row['ORB_reward']}</ORB_reward>"; 
  
}else{
  echo "<ORB_control>2查询失败{$sql}</ORB_control>";
}
echo "</ORB>";
echo "</root>"; 
mysqli_free_result($result);
?>