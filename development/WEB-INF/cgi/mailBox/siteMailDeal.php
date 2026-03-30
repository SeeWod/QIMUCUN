<?php
require_once('../dbconnect.php');
//session_start();
$SM_id = $_POST["SM_id"];
$SM_dealTime = date("Y-m-d H:i:s");
//echo "goods" . $GM_goods;
//echo "content" . $GM_content;

$sql = "UPDATE siteMails set SM_isDeal = 1, SM_dealTime = '{$SM_dealTime}' WHERE SM_id = {$SM_id}";
echo $sql;
$result=insert($sql);

if($result){
	echo "邮寄处理成功";
}else{
	echo "邮件处理失败";
}
mysqli_free_result($result);
?>

