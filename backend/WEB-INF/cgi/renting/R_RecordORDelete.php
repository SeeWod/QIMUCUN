<?php
require_once('../dbconnect.php');
session_start();
date_default_timezone_set("PRC");

$PT_id = $_GET["PT_id"];
$tag = $_GET["tag"];
$U_id = $_SESSION["U_id"];
$UPTR_time = date("Y-m-d H:i:s");

//查询是否有相同的数据已存在
if($tag =="我的发布"){
  //发布删除
  $sql = "DELETE FROM partTimeBoard WHERE PT_id={$PT_id}";
  $result = insert($sql);
  //删除相关收录
  $sql_R = "DELETE FROM userPTRecords WHERE PT_id={$PT_id}";
  $result_R = insert($sql_R); 

  if($result && $result_R){
    echo "个人发布删除成功";
  }else{
    echo "个人发布删除失败";
  } 

  mysqli_free_result($result);
  mysqli_free_result($result_R);
}else{
  //record相关
  $sql_isExit = "select * from userPTRecords where U_id = {$U_id} and PT_id = {$PT_id}";
  $result_isExit = query($sql_isExit);
  if(mysqli_num_rows($result_isExit) <= 0){
  //数据不存在
    $sql_insertRecord = "INSERT INTO userPTRecords(U_id,PT_id,UPTR_time)values({$U_id},{$PT_id},'{$UPTR_time}')";
    $result_insertRecord = insert($sql_insertRecord);
    if($result_insertRecord){
      echo "个人收录成功";
    }else{
      echo "个人收录失败";
    }
  }else{
  //数据存在 删除
    $sql_deleteRecord = "DELETE FROM userPTRecords where U_id = {$U_id} AND PT_id = {$PT_id}";
    $result_deleteRecord = insert($sql_deleteRecord);
    if($result_deleteRecord){
      echo "个人收录删除成功";
    }else{
      echo "个人收录删除失败" . $sql_deleteRecord;
    }
  }

  mysqli_free_result($result_isExit);
  mysqli_free_result($result_insertRecord);

}
?>