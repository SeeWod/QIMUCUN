<?php
require_once('../dbconnect.php');
session_start();
date_default_timezone_set("PRC");   
//语句化
$ON_station = $_SESSION['U_school'];
$ON_content = $_GET['content'];
$ON_pTime = date("Y-m-d H:i:s");


$sql_s = "SELECT * from officerNotice where ON_station = '{$ON_station}'";
$result_s = query($sql_s);
if(mysqli_num_rows($result) > 0){
  $sql = "update officerNotice set ON_content = {$ON_content},ON_pTime = {$ON_pTime} where ON_station = {$ON_station}";
}else{
  $sql = "insert into officerNotice(ON_content,ON_station,ON_pTime)VALUES('{$ON_content}','{$ON_station}','{$ON_pTime}')";
}
$result = insert($sql);
if($result){
  echo "1修改成功";
}else{
  echo "2修改失败{$sql}";
}


//还有返回总数 这样随机才有效
mysqli_free_result($result);
?>
