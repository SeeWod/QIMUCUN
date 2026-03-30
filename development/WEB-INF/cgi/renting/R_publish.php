<?php
require_once('../functionLibrary/imgCompress.php');
session_start();
date_default_timezone_set("PRC");

$R_oveView = $_POST["R_overView"];
$R_address = $_POST["R_address"];
$R_name = $_POST["R_name"];

$R_size = $_POST["R_size"];
$R_roomType = $_POST["R_roomType"];
$R_houseType = $_POST["R_houseType"];

$R_furniture = $_POST["R_furniture"];
$R_serve = $_POST["R_serve"];
$R_hire = $_POST["R_hire"];
$R_payWay = $_POST["R_payWay"];
$R_waterCharge = $_POST["R_waterCharge"];
$R_electricCharge = $_POST["R_electricCharge"];
$R_networkCharge = $_POST["R_networkCharge"];

$R_rentType = $_POST["R_rentType"];
$R_rentTime = $_POST["R_rentTime"];

$R_contact = $_POST["R_contact"];

$R_collegeWalk = $_POST["R_collegeWalk"];

$R_publisher = $_SESSION["U_id"];
$R_pTime = date("Y-m-d H:i:s"); //获取当前时间

//因为要返回插入的id值 所以必须建立一个独立的连接器，
$host ="localhost";
$username ="qimucun";
$password ="qimucun6L8=!";
$db ="qimucun"; 
$con = mysqli_connect($host,$username,$password,$db); 
if(!$con){
  die("连接失败:" . mysqli_connect_error());
}
$sql = "INSERT INTO renting(R_overView,R_address,R_name,R_size,R_roomType,R_houseType,R_furniture,R_serve,R_hire,R_payWay,R_waterCharge,R_electricCharge,R_networkCharge,R_rentType,R_rentTime,R_contact,R_collegeWalk,R_publisher,R_pTime)values('{$R_overView}','{$R_address}','{$R_name}',{$R_size},'{$R_roomType}','{$R_houseType}','{$R_furniture}','{$R_serve}',{$R_hire},'{$R_payWay}',{$R_waterCharge},{$R_electricCharge},'{$R_networkCharge}','{$R_rentType}','{$R_rentTime}','{$R_contact}','{$R_collegeWalk}',{$R_publisher},'{$R_pTime}')";
echo $sql;
$result_insert = mysqli_query($con,$sql);
$R_id = mysqli_insert_id($con);
if($result_insert){
  echo "插入成功";
  //插入图片
  foreach($_FILES as $key => $value){
    if($value['error'] > 0){
      echo $key . "上传遇到错误";
    }else{
      //echo "文件名: {$G_id}_{$value["name"]}";
      //echo "缓存地址: {$value["tmp_name"]}";
      //echo "保存地址: ../../../data/goods/{$G_id}_{$value["name"]}";
     move_uploaded_file("{$value["tmp_name"]}","../../../data/renting/srcImg/{$R_id}_{$value["name"]}");
     //压缩文件存储
     imgCompress("../../../data/renting/srcImg/{$R_id}_{$value["name"]}","../../../data/renting/croImg/",0.25);
    }
  }
}else{
  echo "插入失败";
}


mysqli_free_result($result);
?>