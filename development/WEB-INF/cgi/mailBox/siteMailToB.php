<?php
require_once('../dbconnect.php');
session_start();
//如何判断session启动
$SM_receiver;
getSession();
$last_SM_id = $_GET["last_SM_id"];

while(true){
	if($last_SM_id == "0"){
	  $sql="SELECT SM_id,SM_content FROM siteMails WHERE SM_isDeal = 0 AND SM_receiver = {$SM_receiver} order By SM_id";
		$result = query($sql);
	  if(mysqli_num_rows($result) > 0){
	  		//指读取第一行
	  		$row = mysqli_fetch_assoc($result);
		    header('Content-type: text/xml');
		    echo "<?xml version='1.0' encoding='UTF-8'?>";
		    echo "<root>";
		    echo "<SM_control>返回成功{$last_SM_id}</SM_control>";
				echo "<SM>";
				echo "<SM_id>{$row["SM_id"]}</SM_id>";
				echo "<SM_content>{$row["SM_content"]}</SM_content>";
				echo "</SM>";
        echo "</root>";
        break;
		}
   mysqli_free_result($result);
	}
 sleep(10);
}



function getSession(){
  if(session_id() == '' || !isset($_SESSION)) {
    getSession();
  }else{
    $SM_receiver = $_SESSION["U_id"];
  }
}
?>