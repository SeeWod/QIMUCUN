<?php
	require_once('../dbconnect.php');
 session_start();
 	$roomid = $_GET["roomid"];
	$last_M_id = $_GET["last_M_id"];
 $U_id = $_SESSION["U_id"];

	header('Content-Type:text/event-stream');
  header('X-Accel-Buffering: no');
  header('Cache-Control: private');
  
set_time_limit(0); //防止超时
ob_implicit_flush(1);

$id = 1;
while(true){
  //$ss = str_repeat(" ",4096);
  $sql="SELECT M_id,M_sender,M_content,M_time FROM messages1 WHERE (M_sender = {$roomid} OR M_receiver = {$roomid}) AND M_id > {$last_M_id} order By M_time DESC";
	$result = query($sql);
  if(mysqli_num_rows($result) > 0){
    echo str_pad("",4096)."\n\n";
    while($row = mysqli_fetch_assoc($result)){
      if($row['M_sender'] = $U_id){
        echo "id:{$id}\ndata:{$row['M_id']},{$row['M_sender']},{$row['M_content']},{$row['M_time']},{$_SESSION['U_name']},{$_SESSION['U_headImg']}\n\n";
      }else{
        $sql_u="SELECT U_name,U_headImg FROM users WHERE U_id = {$row['M_sender']}";
        $result_u = query($sql_u);
        if(mysqli_num_rows($result_u) > 0){
          $row_u = mysqli_fetch_assoc($result_u);
          echo "id:{$id}\ndata:{$row['M_id']},{$row['M_sender']},{$row['M_content']},{$row['M_time']},{$row_u['U_name']},{$row_u['U_headImg']}\n\n"; 
        }
        mysqli_free_result($result_u);
      }
      $last_M_id = $row['M_id'];
    }
  }else{
    echo str_pad("",4096)."\n\n";
    echo "id:{$id}\n\n";
  }
  mysqli_free_result($result);
  sleep(0.5);
  $id += 1;
}
?>