<?php
require_once('../dbconnect.php');
session_start();
date_default_timezone_set("PRC");
  
$ON_station = urldecode($_COOKIE["U_college"]);

$sql="SELECT ON_id,ON_content from officerNotice where ON_station = '{$ON_station}'";
$result = query($sql);
 
header('Content-type: text/xml');
echo "<?xml version='1.0' encoding='UTF-8'?>";
echo "<root>";
if(mysqli_num_rows($result) > 0){
  echo "<ON_control>1</ON_control>";
  while($row = mysqli_fetch_assoc($result)){
    echo "<ON>";
    echo "<ON_id>{$row['ON_id']}</ON_id>";
    echo "<ON_content>{$row['ON_content']}</ON_content>";
    echo "</ON>";
  }
}else{
  echo "<ON_control>2{$sql}</ON_control>";
}
echo "</root>";

mysqli_free_result($result);
?>