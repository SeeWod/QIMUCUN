<?php
require_once('../dbconnect.php');
session_start();
date_default_timezone_set("PRC");

$PT_tag = $_POST["PT_tag"];
$PT_period = $_POST["PT_period"];
$PT_place = $_POST["PT_place"];

$PT_address = $_POST["PT_address"];
$PT_time = $_POST["PT_time"];
$PT_unit = $_POST["PT_unit"];

$PT_salary = $_POST["PT_salary"];
$PT_salaryUnit = $_POST["PT_salaryUnit"];
$PT_payWay = $_POST["PT_payWay"];
$PT_contact = $_POST["PT_contact"];
$PT_recruitNum = $_POST["PT_recruitNum"];
$PT_short = $_POST["PT_short"];
$PT_long = $_POST["PT_long"];

$PT_publisher = $_SESSION["U_id"];
$PT_pTime = date("Y-m-d H:i:s"); //获取当前时间

//查询是否有相同的数据已存在
//echo "G_name:".$G_name." G_price:".$G_price." G_dealtype:".$G_dealType." G_short:".$G_short." G_long:".$G_long." G_publisher:".$G_publisher." G_contact:".$G_contact." G_tags:".$G_tags." G_pTime:".$G_pTime;

//因为要返回插入的id值 所以必须建立一个独立的连接器， id 用于图片链接 兼职没有图片 
$sql = "INSERT INTO partTimeBoard(PT_tag,PT_period,PT_place,PT_address,PT_time,PT_unit,PT_salary,PT_salaryUnit,PT_payWay,PT_contact,PT_recruitNum,PT_short,PT_long,PT_publisher,PT_pTime)values('{$PT_tag}','{$PT_period}','{$PT_place}','{$PT_address}','{$PT_time}','{$PT_unit}',{$PT_salary},'{$PT_salaryUnit}','{$PT_payWay}','{$PT_contact}',{$PT_recruitNum},'{$PT_short}','{$PT_long}',{$PT_publisher},'{$PT_pTime}')";

echo $sql;
$result = insert($sql);
if($result){
  echo "插入成功";
}else{
  echo "插入失败";
};


mysqli_free_result($result);
?>