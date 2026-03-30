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

$S_order;
$index_goods;
$pageSize;
$sum_goods = $_GET["sum_goods"];
$obtainedlist =$_GET["obtainedlist"];

$U_id = $_SESSION["U_id"];

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

$S_order = $_GET["S_order"];
if($tag == "我的收藏" && $S_order == "PT_pTime"){
  $S_order = "UPTR_time";
}
$pageSize = $_GET["pageSize"];

if($_GET["next_goods"] == 0){
  $index_goods = "0";
}else{
  $index_goods = $_GET["next_goods"];
}
//防止空;

header('Content-type: text/xml');
echo "<?xml version='1.0' encoding='UTF-8'?>";
echo "<root>";
if($S_order == "random" && ($tag!="我的收藏" || $tag!="我的发布")){
	echo "<PT_control>随机查询 S_tag:{$tag} S_place:{$S_place} S_period:{$S_period} S_payWay:{$S_payWay} S_text:{$S_text} S_order:{$S_order} sum_goods:{$sum_goods} obtainedlist:$obtainedlist</PT_control>";
	//select * from xxx orderBy Rand() limit 1
	for($i=0;$i<$pageSize;$i++){
    $r = suiji();
		echo $r;
	}
}else{
	if($tag == "我的收藏"){
		$sql = "SELECT partTimeBoard.PT_id,PT_tag,PT_short,PT_period,PT_unit,PT_recruitNum,PT_salary,PT_salaryUnit,PT_payWay from partTimeBoard,userPTRecords where partTimeBoard.PT_id = userPTRecords.PT_id AND userPTRecords.U_id = {$U_id} AND PT_place LIKE '{$S_place}' AND PT_period LIKE '{$S_period}' AND (PT_payWay LIKE '{$S_payWay}' OR PT_payWay LIKE '可议') AND PT_long LIKE '{$S_text}' ORDER BY {$S_order} DESC LIMIT {$index_goods},{$pageSize}";
	}else if($tag == "我的发布"){
		$sql = "SELECT PT_id,PT_tag,PT_short,PT_period,PT_unit,PT_recruitNum,PT_salary,PT_salaryUnit,PT_payWay from partTimeBoard where PT_publisher = {$U_id} AND PT_place LIKE '{$S_place}' AND PT_period LIKE '{$S_period}' AND (PT_payWay LIKE '{$S_payWay}' OR PT_payWay LIKE '可议') AND PT_long LIKE '{$S_text}' ORDER BY {$S_order} DESC LIMIT {$index_goods},{$pageSize}";
	}else{
		$sql = "SELECT PT_id,PT_tag,PT_short,PT_period,PT_unit,PT_recruitNum,PT_salary,PT_salaryUnit,PT_payWay from partTimeBoard where PT_place LIKE '{$S_place}' AND PT_period LIKE '{$S_period}' AND (PT_payWay LIKE '{$S_payWay}' OR PT_payWay LIKE '可议') AND PT_long LIKE '{$S_text}' ORDER BY {$S_order} DESC LIMIT {$index_goods},{$pageSize}";
	}
	$result = query($sql);
	if(mysqli_num_rows($result) > 0){
		echo "<PT_control>查询成功</PT_control>";
		while($row = mysqli_fetch_assoc($result)){
			echo "<PT>";
			echo "<PT_id>{$row["PT_id"]}</PT_id>";
			echo "<PT_tag>{$row["PT_tag"]}</PT_tag>";
			echo "<PT_short>{$row["PT_short"]}</PT_short>";
			echo "<PT_period>{$row["PT_period"]}</PT_period>";
			echo "<PT_unit>{$row["PT_unit"]}</PT_unit>";
			echo "<PT_recruitNum>{$row["PT_recruitNum"]}</PT_recruitNum>";
			echo "<PT_salary>{$row["PT_salary"]}</PT_salary>";
			echo "<PT_salaryUnit>{$row["PT_salaryUnit"]}</PT_salaryUnit>";
			echo "<PT_payWay>{$row["PT_payWay"]}</PT_payWay>";   
			echo "</PT>";
		}
	}else{
		echo "<PT_control>查询失败{$sql}</PT_control>";
	}
}
echo "<PT_obtainedlist>{$obtainedlist}</PT_obtainedlist>";
echo "</root>";

mysqli_free_result($result);






//函数
function suiji(){
  global $tag,$S_place,$S_period,$S_payWay,$S_text,$obtainedlist,$sum_goods;
  //判断是否以获取全部;
  if(count(explode(",",$obtainedlist))-1 >= $sum_goods){
    return;
  }
  //随机获取1个
	$random = rand(0,(int)$sum_goods-1);
	$sql_ = "SELECT PT_id,PT_tag,PT_short,PT_period,PT_unit,PT_recruitNum,PT_salary,PT_salaryUnit,PT_payWay from partTimeBoard where PT_tag LIKE '{$tag}' AND PT_place LIKE '{$S_place}' AND PT_period LIKE '{$S_period}' AND (PT_payWay LIKE '{$S_payWay}' OR PT_payWay LIKE '可议') AND PT_long LIKE '{$S_text}' AND PT_id NOT IN ($obtainedlist) LIMIT {$random},1";
	$result = query($sql_);
 
  if($result){
    if(mysqli_num_rows($result)>0){
  		$row = mysqli_fetch_assoc($result);
      //obtainedlist添加PT_id
      $obtainedlist = "{$obtainedlist},${row["PT_id"]}";
	  	$ret = "<PT>"
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
		  //return $ret . "<PT_RandomError>随机 {$sql_}</PT_RandomError>";
      return $ret;
    }else{
		  return suiji();
    }
//  }else{
//    return "<PT_RandomError>随机 {$sql_}</PT_RandomError>";
  
  }
}

?>