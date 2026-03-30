<?php
require_once('dbconnect.php');
date_default_timezone_set("PRC");
$R_id = $_POST["R_id"];
$R_name = $_POST["R_name"];
$R_password = $_POST["R_password"];
$R_phone = $_POST["R_phone"];
$R_school = $_POST["R_school"];
$R_headImg = rand(1,6);
$R_time = date("Y-m-d H:i:s");
$sql_search = "SELECT U_id from users where U_id ='{$R_id}'";
$result = query($sql_search);
if(mysqli_num_rows($result)>0){
  echo "ID重复请重新输入";
}else{
  //格式判断
  $sql = "INSERT INTO users (U_id,U_name,U_password,U_phone,U_school,U_headImg,U_rTime) values ({$R_id},'{$R_name}','{$R_password}','{$R_phone}','{$R_school}','00{$R_headImg}','{$R_time}')"; 
  if(insert($sql)){
	  echo "注册成功";
  }else{
    //echo $sql;
	  echo "注册失败";
  }
}
?>