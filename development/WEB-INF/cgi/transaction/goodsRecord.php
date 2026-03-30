<?php
require_once('../dbconnect.php');
session_start();
date_default_timezone_set("PRC");

$G_id = $_GET["G_id"];
$U_id = $_SESSION["U_id"];
$UGR_time = date("Y-m-d H:i:s");

//查询是否有相同的数据已存在
$sql_isExit = "select * from userGRecords where U_id = {$U_id} and G_id = {$G_id}";
$result_isExit = query($sql_isExit);
if(mysqli_num_rows($result_isExit) <= 0){
//数据不存在
  $sql_insertRecord = "INSERT INTO userGRecords(U_id,G_id,UGR_time)values({$U_id},{$G_id},'{$UGR_time}')";
  $result_insertRecord = insert($sql_insertRecord);
  if($result_insertRecord){
    echo "个人收录成功";
  }else{
    echo "个人收录失败";
  }
}else{
//数据存在 删除
  $sql_deleteRecord = "DELETE FROM userGRecords where U_id = {$U_id} AND G_id = {$G_id}";
  $result_deleteRecord = insert($sql_deleteRecord);
  if($result_deleteRecord){
    echo "个人收录删除成功";
  }else{
    echo "个人收录删除失败" . $sql_deleteRecord;
  }
}

mysqli_free_result($result_isExit);
mysqli_free_result($result_insertRecord);
?>