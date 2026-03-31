<?php
require_once('../dbconnect.php');
$room_id = $_GET["room_id"];
$number = $_GET["number"];

$last_M_id;
$U_id = urldecode($_COOKIE["U_id"]);
$U_name = urldecode($_COOKIE["U_name"]);
$U_headImg = urldecode($_COOKIE["U_headImg"]);

header('Content-Type: text/event-stream');
header('X-Accel-Buffering: no');
header('Cache-Control: private');
  
set_time_limit(0); //防止超时
ob_implicit_flush(1);

//初始化nuumber个消息返回
$sql = "SELECT M_id,M_sender,M_content,M_time from messages1 where M_sender = {$room_id} OR M_receiver = {$room_id} order By M_time DESC limit {$number}";
$result = query($sql);
echo str_pad("",4096)."\n";
if(mysqli_num_rows($result)>0){
	while($row = mysqli_fetch_assoc($result)){ 
      if($row['M_sender'] == $U_id){
        echo "data:{$row['M_id']},{$row['M_sender']},{$row['M_content']},{$row['M_time']},{$U_name},{$U_headImg}\n\n";
      }else{
        $sql_u="SELECT U_name,U_headImg FROM users WHERE U_id = {$row['M_sender']}";
        $result_u = query($sql_u);
        if(mysqli_num_rows($result_u) > 0){
          $row_u = mysqli_fetch_assoc($result_u);
          echo "data:{$row['M_id']},{$row['M_sender']},{$row['M_content']},{$row['M_time']},{$row_u['U_name']},{$row_u['U_headImg']}\n\n"; 
        }
        mysqli_free_result($result_u);
      }
      $last_M_id = $row['M_id'];
	 }
}else{
    //echo "data:111\n\n";
}
mysqli_free_result($result);

//新消息返回
$id = 1;
while(true){
  //$ss = str_repeat(" ",4096);
  $sql_f="SELECT M_id,M_sender,M_content,M_time FROM messages1 WHERE (M_sender = {$room_id} OR M_receiver = {$room_id}) AND M_id > {$last_M_id} order By M_time DESC";
	$result_f = query($sql_f);
  if(mysqli_num_rows($result_f) > 0){
    echo str_pad("",4096)."\n\n";
    while($row_f = mysqli_fetch_assoc($result_f)){
      if($row_f['M_sender'] == $U_id){
        echo "id:{$id}\ndata:{$row_f['M_id']},{$row_f['M_sender']},{$row_f['M_content']},{$row_f['M_time']},{$U_name},{$U_headImg}\n\n";
      }else{
        $sql_fu="SELECT U_name,U_headImg FROM users WHERE U_id = {$row_f['M_sender']}";
        $result_fu = query($sql_fu);
        if(mysqli_num_rows($result_fu) > 0){
          $row_fu = mysqli_fetch_assoc($result_fu);
          echo "id:{$id}\ndata:{$row_f['M_id']},{$row_f['M_sender']},{$row_f['M_content']},{$row_f['M_time']},{$row_fu['U_name']},{$row_fu['U_headImg']}\n\n"; 
        }
        mysqli_free_result($result_fu);
      }
      $last_M_id = $row_f['M_id'];
    }
  }else{
    echo str_pad("",4096)."\n\n";
    echo "no\n\n";
  }
  mysqli_free_result($result_f);
  sleep(0.5);
  $id += 1;
}
?>