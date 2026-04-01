<?php
require_once('../dbconnect.php');
session_start();
$U_id = $_SESSION["U_id"];
$G_id = $_GET["G_id"];
$tag = $_GET["tag"];

if($tag == "我的收藏"){
  $sql = "DELETE FROM userGRecords WHERE G_id={$G_id} AND U_id={$U_id}";
  $result = insert($sql);
  
  if($result){
    echo "记录删除成功";
  }else{
    echo "记录删除失败";
  }
  
}else{
  //我的发布
  $sql = "DELETE FROM goods WHERE G_id={$G_id}";
  $result = insert($sql);
  //删除相关收录
  $sql_R = "DELETE FROM userGRecords WHERE G_id={$G_id}";
  $result_R = insert($sql_R);
  //删除聊天记录
  $sql_M = "DELETE FROM goodsMessages WHERE GM_goods = {$G_id}";
  $result_M = insert($sql_M);
  
  //删除图片
  if(file_exists("../../../data/goods/croImg/{$G_id}_main.jpg")){
    unlink("../../../data/goods/croImg/{$G_id}_main.jpg");
  }
  if(file_exists("../../../data/goods/croImg/{$G_id}_first.jpg")){
    unlink("../../../data/goods/croImg/{$G_id}_first.jpg");
  }
  if(file_exists("../../../data/goods/croImg/{$G_id}_second.jpg")){
    unlink("../../../data/goods/croImg/{$G_id}_second.jpg");
  }
  if(file_exists("../../../data/goods/croImg/{$G_id}_third.jpg")){
    unlink("../../../data/goods/croImg/{$G_id}_third.jpg");
  }
  if(file_exists("../../../data/goods/croImg/{$G_id}_fourth.jpg")){
    unlink("../../../data/goods/croImg/{$G_id}_fourth.jpg");
  }
  if(file_exists("../../../data/goods/srcImg/{$G_id}_main.jpg")){
    unlink("../../../data/goods/srcImg/{$G_id}_main.jpg");
  }
  if(file_exists("../../../data/goods/srcImg/{$G_id}_first.jpg")){
    unlink("../../../data/goods/srcImg/{$G_id}_first.jpg");
  }
  if(file_exists("../../../data/goods/srcImg/{$G_id}_second.jpg")){
    unlink("../../../data/goods/srcImg/{$G_id}_second.jpg");
  }
  if(file_exists("../../../data/goods/srcImg/{$G_id}_third.jpg")){
    unlink("../../../data/goods/srcImg/{$G_id}_third.jpg");
  }
  if(file_exists("../../../data/goods/srcImg/{$G_id}_fourth.jpg")){
    unlink("../../../data/goods/srcImg/{$G_id}_fourth.jpg");
  }

  if($result && $result_R && $result_M){
    echo "发布删除成功";
  }else{
    echo "发布删除失败";
  }
}

mysqli_free_result($result);
mysqli_free_result($result_R);
mysqli_free_result($result_M);
?>