<?php
//返回十个页面信息
require_once('../dbconnect.php');
session_start();   
$sql_sum = "SELECT count(*) AS sum FROM partTimeBoard where NOT PT_remark = ''";
$result = query($sql_sum);
$row = mysqli_fetch_assoc($result);

echo $row["sum"];

//还有可以返回总数 这样箭头定位才有效
mysqli_free_result($result);
?>
