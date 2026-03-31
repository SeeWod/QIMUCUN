<?php
require_once('../functionLibrary/imgCompress.php');
session_start();
date_default_timezone_set("PRC");

$NB_unit = $_POST["NB_unit"];
$NB_contact = $_POST["NB_contact"];
$NB_period = $_POST["NB_period"];
$NB_sTime = $_POST["NB_sTime"];
$NB_price = $_POST["NB_price"];
$NB_long = $_POST["NB_long"];
$NB_station = $_SESSION["U_school"];


$NB_pTime = date("Y-m-d H:i:s"); //获取当前时间
$NB_publisher = $_SESSION["U_id"];

$i = new DateInterval("P{$NB_period}D");
$NB_oTime = date_add(DateTime::createFromFormat('Y-m-d',$NB_sTime),$i)->format('Y-m-d');

//因为要返回插入的id值 所以必须建立一个独立的连接器，
$host ="localhost";
$username ="qimucun";
$password ="qimucun6L8=!";
$db ="qimucun";	
$con = mysqli_connect($host,$username,$password,$db);	
if(!$con){
  die("错误1,连接失败:" . mysqli_connect_error() . "请反馈给客服");
}
 
$sql = "INSERT INTO noticeBoards(NB_unit,NB_contact,NB_period,NB_sTime,NB_oTime,NB_price,NB_long,NB_station,NB_pTime,NB_publisher)values('{$NB_unit}','{$NB_contact}',{$NB_period},'{$NB_sTime}','{$NB_oTime}',{$NB_price},'{$NB_long}','{$NB_station}','{$NB_pTime}',{$NB_publisher})";

$result_insert = mysqli_query($con,$sql);

$NB_id = mysqli_insert_id($con);
if($result_insert){
//  echo " . "插入成功";
  //插入图片
    if($_FILES["poster"]['error'] > 0){
      echo $key . "上传遇到错误" . "请反馈给客服";
	  }else{
       if(move_uploaded_file("{$_FILES["poster"]["tmp_name"]}","../../../data/notice/srcImg/{$NB_id}.jpg")){
         imgCompress("../../../data/notice/srcImg/{$NB_id}.jpg","../../../data/notice/croImg/",0.3);
       }else{
     //压缩文件存储
         echo "上传图片失败";
       }
     echo "发布成功";
	  }
}else{
  echo "错误2，插入失败,请联系客服";
// echo $sql;
}

mysqli_free_result($result_insert);
?>