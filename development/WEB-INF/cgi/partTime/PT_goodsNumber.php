<?php
//返回十个页面信息
require_once('../dbconnect.php');
session_start();   
//语句化
$tag;
$S_place;
$S_period;
$S_payWay;
$S_text;

//$U_id = $_SESSION["U_id"];

if($_GET["S_tag"] == "全部类型"){
  $tag = "%%";
}else{
  $tag = $_GET["S_tag"];
}

if($_GET["S_place"] == "不限"){
  $S_place = "%%";
}else{
  $S_place = $_GET["S_place"];
}

if($_GET["S_period"] == "不限"){
  $S_period = "%%";
}else{
  $S_period = $_GET["S_period"];
}

if($_GET["S_payWay"] == "不限"){
  $S_payWay = "%%";
}else{
  $S_payWay = $_GET["S_payWay"];
}
                                                                                           
if(empty($_GET["S_text"])){
  $S_text = "%%";
}else{
  $S_text = "%".$_GET["S_text"]."%";
}


$sql_sum = "SELECT count(*) AS sum from partTimeBoard where PT_tag LIKE '{$tag}' AND PT_place LIKE '{$S_place}' AND PT_period LIKE '{$S_period}' AND (PT_payWay LIKE '{$S_payWay}' OR PT_payWay LIKE '可议') AND PT_long LIKE '{$S_text}'";

//echo $sql;
$result = query($sql_sum);
$row = mysqli_fetch_assoc($result);

echo $row["sum"];

//还有返回总数 这样随机才有效
mysqli_free_result($result);
?>
