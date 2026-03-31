<?php
require_once('../dbconnect.php');
$ORB_id = $_GET["ORB_id"];

$sql = "DELETE FROM officerRecruitBoards WHERE ORB_id={$ORB_id}";
$result = insert($sql);
if($result){
  echo "删除成功";
}else{
  echo "删除失败{$sql}";
}
 
mysqli_free_result($result);
?>