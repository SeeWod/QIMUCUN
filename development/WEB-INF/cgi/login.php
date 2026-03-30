<?php 
require_once('dbconnect.php');
//开启Session
session_start();

//处理用户登录信息
$U_id = $_POST['U_id'];
$U_password = $_POST['U_password'];
$freeLogin = $_POST['freeLogin'];
//通过post freeLogin 变成字符串了
//echo $_POST['U_password'];
//echo "U_id     ========". $U_id;
//echo "U_password". $U_password;
//post 加号 & 传输修正

//数据库查询 不读取密码 直接验证的方法
//id登录 学号登陆 手机号登录
$sql = "SELECT U_id,U_name,U_headImg,U_permission,U_school,U_phone,U_sid,U_rTime FROM users where U_id = {$U_id} and U_password = '{$U_password}'";
$result = query($sql);
if(mysqli_num_rows($result) > 0){
	$row = mysqli_fetch_assoc($result);
	$_SESSION['U_id'] = $U_id;
	$_SESSION['U_name'] = $row['U_name'];
	$_SESSION['U_headImg'] = "{$row['U_headImg']}";
	$_SESSION['U_permission'] = $row['U_permission'];	//权限变成键值对
	$_SESSION['U_school'] = $row['U_school'];
	$_SESSION['U_phone'] = $row['U_phone'];
	$_SESSION['U_sid'] = $row['U_sid'];
	$_SESSION['U_rTime'] = $row['U_rTime'];
  if($freeLogin == 'true'){
    $expire=time()+60*60*24*30;
    setcookie("id", $U_id, $expire, "/");
    setcookie("token", $U_password, $expire, "/");
  }else{
    setcookie("id", $U_id, "会话", "/");
  }
  	//前端非主页面登录
 	setcookie("U_name",$_SESSION['U_name'],"会话","/");
 	setcookie("U_headImg",$_SESSION['U_headImg'],"会话","/");
 	setcookie("U_college",$_SESSION['U_school'],"会话","/");
//用college还是station
  echo "-登陆成功";
}else{  
  //echo $sql;
	echo "-账户或密码错误"; 
}
?>