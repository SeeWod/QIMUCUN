<?php
require_once('../functionLibrary/imgCompress.php');
session_start();
date_default_timezone_set("PRC");

$G_name = $_POST["G_name"];
$G_dealType = $_POST["G_dealType"];
$G_price = $_POST["G_price"];
$G_publisher = $_SESSION["U_id"];
$G_contact = $_POST["G_contact"];
$G_long = $_POST["G_long"];

$G_tags = $_POST["G_tags"];

$G_pTime = date("Y-m-d H:i:s"); //获取当前时间

//查询是否有相同的数据已存在
//echo "G_name:".$G_name." G_price:".$G_price." G_dealtype:".$G_dealType." G_short:".$G_short." G_long:".$G_long." G_publisher:".$G_publisher." G_contact:".$G_contact." G_tags:".$G_tags." G_pTime:".$G_pTime;

//因为要返回插入的id值 所以必须建立一个独立的连接器，
$host ="localhost";
$username ="qimucun";
$password ="qimucun6L8=!";
$db ="qimucun";	
$con = mysqli_connect($host,$username,$password,$db);	
if(!$con){
  die("连接失败:" . mysqli_connect_error());
}
 
$sql = "INSERT INTO goods(G_name,G_dealType,G_price,G_long,G_publisher,G_pTime,G_tags,G_contact)values('{$G_name}','{$G_dealType}','{$G_price}','{$G_long}',{$G_publisher},'{$G_pTime}','{$G_tags}','{$G_contact}')";

//echo $sql;
$result_insert = mysqli_query($con,$sql);

$G_id = mysqli_insert_id($con);
if($result_insert){
  //echo "插入成功";
  //插入图片
  foreach($_FILES as $key => $value){
    if($value['error'] > 0){
      echo $key . "上传遇到错误";
	  }else{
      //echo "文件名: {$G_id}_{$value["name"]}";
      //echo "缓存地址: {$value["tmp_name"]}";
      //echo "保存地址: ../../../data/goods/{$G_id}_{$value["name"]}";
     move_uploaded_file("{$value["tmp_name"]}","../../../data/goods/srcImg/{$G_id}_{$value["name"]}");
     //压缩文件存储
     imgCompress("../../../data/goods/srcImg/{$G_id}_{$value["name"]}","../../../data/goods/croImg/",0.4);
	  }
  }
  echo "发布成功";
}else{
  echo "发布失败1";
}

mysqli_free_result($result_insert);
?>