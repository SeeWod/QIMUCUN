<?php 
require_once('dbconnect.php');
session_start();
$U_id = $_POST['U_id'];
$U_password = $_POST['U_password'];
$freeLogin = $_POST['freeLogin'];

//post 加号 & 传输修正
//id登录 学号登陆 手机号登录
$sql = "SELECT U_id,U_name,U_password,U_headImg,U_permission,U_school,U_phone,U_sid,U_rTime FROM users where U_id = {$U_id}";
$result = query($sql);
if(mysqli_num_rows($result) > 0){
	$row = mysqli_fetch_assoc($result);
	if(password_verify($U_password, $row['U_password'])){
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
	    setcookie("U_id", $U_id, ["expires"=>$expire, "path"=>"/"]);
	    setcookie("U_token", $U_password, ["expires"=>$expire, "path"=>"/"]);
	  }else{
	    setcookie("U_id", $U_id, ["expires"=>0, "path"=>"/"]);
	  }
	  //前端非主页面登录
	 	setcookie("U_name",$_SESSION['U_name'],["expires"=>0,"path"=>"/"]);
	 	setcookie("U_headImg",$_SESSION['U_headImg'],["expires"=>0,"path"=>"/"]);
	 	setcookie("U_college",$_SESSION['U_school'],["expires"=>0,"path"=>"/"]);
	//用college还是station
	  echo "-登陆成功";
	}else{
		echo "-账户或密码错误";		//密码错误
	}

}else{
	echo "-账户或密码错误";	 //id错误
}

mysqli_free_result($result);
?>
