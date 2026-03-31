<?php
require_once('../dbconnect.php');
session_start();
date_default_timezone_set("PRC");
$station = urldecode($_COOKIE["U_college"]);

header('Content-type: text/xml');
echo "<?xml version='1.0' encoding='UTF-8'?>";
echo "<root>";

$sql="SELECT U_id,U_name,U_permission,U_headImg from users where U_school = '{$station}' AND U_permission > 1 order by U_permission DESC";
$result = query($sql);
if(mysqli_num_rows($result) > 0){
  echo "<O_control>1</O_control>";
  while($row = mysqli_fetch_assoc($result)){
    echo "<O>";
    echo "<O_id>{$row['U_id']}</O_id>";
    echo "<O_alias>{$row['U_name']}</O_alias>";
    echo "<O_headImg>{$row['U_headImg']}</O_headImg>";
    $permissionString = "";
    $ps = decbin($row['U_permission']);
    if(substr($ps,-6,1) == "1"){$permissionString = $permissionString . "站长、";}
    if(substr($ps,-5,1) == "1"){$permissionString = $permissionString . " 广、";}
    if(substr($ps,-4,1) == "1"){$permissionString = $permissionString . " 招聘、";}
    if(substr($ps,-3,1) == "1"){$permissionString = $permissionString . " 租、";}
    if(substr($ps,-2,1) == "1"){$permissionString = $permissionString . " 兼、";}
    echo "<O_permission>{$permissionString}</O_permission>";

    $sql_workers="SELECT W_name from workers where W_id = {$row['U_id']}";
    $result_workers = query($sql_workers);
    if(mysqli_num_rows($result_workers) > 0){
      echo "<O_Wcontrol>1</O_Wcontrol>";
      $row_workers = mysqli_fetch_assoc($result_workers);
      echo "<O_name>{$row_workers['W_name']}</O_name>";
    }else{
      echo "<O_Wcontrol>2{$sql_workers}</O_Wcontrol>";
    }
    
    
    
    echo "</O>";
  }
}else{
  echo "<O_control>2{$sql}</O_control>";
}
echo "</root>"; 

mysqli_free_result($result);
?>