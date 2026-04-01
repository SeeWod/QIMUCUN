<?php
require_once('../dbconnect.php');
require_once('../functionLibrary/imgCompress.php');
session_start();
$R_id = $_SESSION["U_id"];

$sql = "update users set U_headImg = '{$R_id}' where U_id = {$R_id}"; 
if(insert($sql)){
	if($_FILES["newHeadImg"]["error"] > 0){
		echo "图片上传错误".$_FILES["newHeadImg"]["error"]."<br>";
	}else{
       move_uploaded_file($_FILES["newHeadImg"]["tmp_name"],"../../../data/user/userHeadImg/{$R_id}.jpg");
       imgCompress("../../../data/user/userHeadImg/{$R_id}.jpg","../../../data/user/userHeadImg/",0.25);
			//move_upload_file已存在将会覆盖
			echo "修改成功";
	}
}else{
	echo "更换头像错误1!请反馈给客服";
}

?>