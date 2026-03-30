<?php
require_once('../dbconnect.php');
session_start();
$index = $_GET["remark_index"];
$sum = $_GET["remark_sum"];
$pageSize = $_GET["remark_pageSize"];

header('Content-type: text/xml');
echo "<?xml version='1.0' encoding='UTF-8'?>";
echo "<root>";
if(($index+$pageSize) > $sum){
  echo yici($index,$sum - $index);
  echo yici(0,$pageSize-($sum - $index));
}else{
  echo yici($index,$pageSize);
}
echo "</root>";
mysqli_free_result($result);


function yici($i,$p){
  $sql = "SELECT PT_id,PT_tag,PT_short,PT_period,PT_unit,PT_recruitNum,PT_salary,PT_salaryUnit,PT_payWay from partTimeBoard where NOT PT_remark = '' LIMIT {$i},{$p}";
  $ret;
  $result = insert($sql);
  if(mysqli_num_rows($result) > 0){
    while($row = mysqli_fetch_assoc($result)){
      $ret ="<PT>"
      . "<PT_id>{$row["PT_id"]}</PT_id>"
      . "<PT_tag>{$row["PT_tag"]}</PT_tag>"
      . "<PT_short>{$row["PT_short"]}</PT_short>"
      . "<PT_period>{$row["PT_period"]}</PT_period>"
      . "<PT_unit>{$row["PT_unit"]}</PT_unit>"
      . "<PT_recruitNum>{$row["PT_recruitNum"]}</PT_recruitNum>"
      . "<PT_salary>{$row["PT_salary"]}</PT_salary>"
      . "<PT_salaryUnit>{$row["PT_salaryUnit"]}</PT_salaryUnit>"
      . "<PT_payWay>{$row["PT_payWay"]}</PT_payWay>"
      . "</PT>";
    }
  }
  return $ret;
}
?>