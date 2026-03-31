<?php
require_once('../dbconnect.php');
date_default_timezone_set("PRC");
  
$Tru_station = urldecode($_COOKIE["U_college"]);
$Tru_nowTime = date("Y-m-d H:i:s");

$Tru_last_id = "";

header('Content-Type: text/event-stream');
header('X-Accel-Buffering: no');
header('Cache-Control: private');
set_time_limit(0); //防止超时
ob_implicit_flush(1);
$id = 1;
while(1){
  if($Tru_last_id == ""){
    $sql="SELECT Tru_id,Tru_content,Tru_addName,Tru_publisherName from trumpets where (Tru_station = '{$Tru_station}' OR Tru_station = 'DDYHQ1101') AND (Tru_pTime > '{$Tru_nowTime}')";
  }else{
    $sql="SELECT Tru_id,Tru_content,Tru_addName,Tru_publisherName from trumpets where (Tru_station = '{$Tru_station}' OR Tru_station = 'DDYHQ1101') AND (Tru_id > {$Tru_last_id})";
  }
  $result = query($sql);
  if(mysqli_num_rows($result) > 0){
    echo str_pad("",4096)."\n\n";
    while($row = mysqli_fetch_assoc($result)){
      if($row["Tru_addName"] == "1"){
        echo "id:{$id}\ndata:[{$row['Tru_publisherName']}]{$row['Tru_content']}\n\n";
      }else{
        echo "id:{$id}\ndata:{$row['Tru_content']}\n\n";
      }
      $Tru_last_id = $row['Tru_id'];
   }
   //echo "data:{$sql}\n\n";
  }else{
    echo str_pad("",4096)."\n\n";
    echo "id:{$id}\n\n";
    //echo "id:{$id}\ndata:{$sql}\n\n";
  }
  mysqli_free_result($result);
  sleep(1);
  $id += 1;
}
?>