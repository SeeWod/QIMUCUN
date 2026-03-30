<?php
require_once('../dbconnect.php');
  
$OB_station = urldecode($_COOKIE["U_college"]);

$sql="SELECT ORB_id,ORB_name,ORB_content from officerRecruitBoards where ORB_station = '{$OB_station}'";
$result = query($sql);

header('Content-type: text/xml');
echo "<?xml version='1.0' encoding='UTF-8'?>";
echo "<root>";
if(mysqli_num_rows($result) > 0){
  echo "<ORB_control>1</ORB_control>";
  while($row = mysqli_fetch_assoc($result)){
    echo "<ORB>";
    echo "<ORB_id>{$row['ORB_id']}</ORB_id>";
    echo "<ORB_name>{$row['ORB_name']}</ORB_name>";
    echo "<ORB_content>{$row['ORB_content']}</ORB_content>";
    echo "</ORB>";
  }
}else{
  echo "<ORB_control>2{$sql}</ORB_control>";
}
echo "</root>"; 

mysqli_free_result($result);
?>