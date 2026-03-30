<?php
//返回十个页面信息
require_once('../dbconnect.php'); 
session_start(); 
//语句化
$S_tag =$_GET["S_tag"];
$S_order;
$index_goods;
$pageSize = $_GET["pageSize"];
$sum_goods = $_GET["sum_goods"];
$obtainedlist =$_GET["obtainedlist"];

$U_id = $_SESSION["U_id"];

$S_order = $_GET["S_order"];
if($tag == "我的收藏" && $S_order == "R_pTime"){
  $S_order = "URR_time";
}

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
	echo "<R_control>随机查询 S_tag:{$tag} S_place:{$S_place} S_period:{$S_period} S_payWay:{$S_payWay} S_text:{$S_text} S_order:{$S_order} sum_goods:{$sum_goods} obtainedlist:$obtainedlist</R_control>";
	//select * from xxx orderBy Rand() limit 1
	for($i=0;$i<$pageSize;$i++){
    $r = suiji();
		echo $r;
	}
}else{
	if($tag == "我的收藏"){
		$sql = "SELECT renting.R_id,R_name,R_hire,R_payWay,R_collegeWalk from renting,userRRecords where renting.R_id = userRRecords.R_id AND userRRecords.U_id = {$U_id} ORDER BY {$S_order} DESC LIMIT {$index_goods},{$pageSize}";
	}else if($tag == "我的发布"){
		$sql = "SELECT R_id,R_name,R_hire,R_payWay,R_collegeWalk from renting where R_publisher = {$U_id} ORDER BY {$S_order} DESC LIMIT {$index_goods},{$pageSize}";
	}else{
		$sql = "SELECT R_id,R_name,R_hire,R_payWay,R_collegeWalk from renting where R_roomType LIKE '{$S_roomType}' AND R_rentTime LIKE '{$S_rentTime}' ORDER BY {$S_order} DESC LIMIT {$index_goods},{$pageSize}";
	}
	$result = query($sql);
	if(mysqli_num_rows($result) > 0){
		echo "<R_control>查询成功</R_control>";
		while($row = mysqli_fetch_assoc($result)){
			echo "<R>";
			echo "<R_id>{$row["R_id"]}</R_id>";
			echo "<R_name>{$row["R_name"]}</R_name>";
			echo "<R_hire>{$row["R_hire"]}</R_hire>";
			echo "<R_payWay>{$row["R_payWay"]}</PT_payWay>";
			echo "<R_collegeWalk>{$row["R_collegeWalk"]}</R_collegeWalk>"; 
			echo "</R>";
		}
	}else{
		echo "<R_control>查询失败{$sql}</R_control>";
	}
}
echo "<R_obtainedlist>{$obtainedlist}</R_obtainedlist>";
echo "</root>";

mysqli_free_result($result);






//函数
function suiji(){
  global $obtainedlist,$sum_goods;
  //判断是否以获取全部;
  if(count(explode(",",$obtainedlist))-1 >= $sum_goods){
    return;
  }
  //随机获取1个
	$random = rand(0,(int)$sum_goods-1);
	$sql_ = "SELECT R_id,R_name,R_hire,R_payWay,R_collegeWalk from renting where R_id NOT IN ($obtainedlist) LIMIT {$random},1";
	$result = query($sql_);
 
  if($result){
    if(mysqli_num_rows($result)>0){
  		$row = mysqli_fetch_assoc($result);
      //obtainedlist添加PT_id
      $obtainedlist = "{$obtainedlist},${row["R_id"]}";
	  	$ret = "<R>"
	  	. "<R_id>{$row["R_id"]}</R_id>"
	  	. "<R_name>{$row["R_name"]}</R_name>"
	  	. "<R_hire>{$row["R_hire"]}</R_hire>"
	  	. "<R_payWay>{$row["R_payWay"]}</R_payWay>"
	  	. "<R_collegeWalk>{$row["R_collegeWalk"]}</R_collegeWalk>"
	  	. "</R>";
		  //return $ret . "<PT_RandomError>随机 {$sql_}</PT_RandomError>";
      return $ret;
    }else{
		  return suiji();
    }  
  }
}

?>