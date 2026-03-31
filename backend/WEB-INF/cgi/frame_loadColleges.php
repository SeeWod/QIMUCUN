<?php
require_once('dbconnect.php');

$sql = "SELECT COL_name FROM college";
$result = query($sql);
header('Content-type: text/xml');
echo "<?xml version='1.0' encoding='UTF-8'?>";
echo "<root>";
if(mysqli_num_rows($result) > 0){
  echo "<COL_control>查询成功</COL_control>";
	while($row = mysqli_fetch_assoc($result)){
    //echo "<COL>";
    echo "<COL_name>{$row['COL_name']}</COL_name>";
 }
 
}else{
	echo "<COL_control>查询失败</COL_control>";
}
echo "</root>";
?>