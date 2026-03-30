<?php
	require_once('../dbconnect.php');
	$GM_goods = $_GET["GM_goods"];
	$last_GM_id = $_GET["last_GM_id"];

//	header('Content-Type:text/event-stream');
//	header('Cache-Control: no-cache');
//  header('Connection: keep-alive');
//  header('X-Accel-Buffering: no');
  
//set_time_limit(0); //防止超时
//ob_end_clean(); //清空（擦除）缓冲区并关闭输出缓冲
//ob_implicit_flush(1); //这个函数强制每当有输出的时候，即刻把输出发送到浏览器。这样就不需要每次输出（echo）后，都用flush()来发送到浏览器了
//ob_end_flush();
while(true){
  //$ss = str_repeat(" ",1024);
  $sql="SELECT GM_id,GM_sender,GM_goods,GM_content,GM_time FROM goodsMessages WHERE GM_goods = {$GM_goods} AND GM_id > {$last_GM_id} order By GM_time DESC";
	$result = query($sql);
  if(mysqli_num_rows($result) > 0){
    header('Content-type: text/xml');
    echo "<?xml version='1.0' encoding='UTF-8'?>";
 //   ob_start();
    echo "<root>";
    echo "<GM_control>{$last_GM_id}--{$GM_goods}</GM_control>";
	  while($row = mysqli_fetch_assoc($result)){
		  $sql_u =  "SELECT U_name,U_headImg from users where U_id = {$row["GM_sender"]}";
 	    $result_u = query($sql_u);
      $row_u = mysqli_fetch_assoc($result_u);
		  echo "<GM>";
		  echo "<GM_id>{$row["GM_id"]}</GM_id>";
		  echo "<GM_sender>{$row["GM_sender"]}</GM_sender>";
		  echo "<GM_U_name>{$row_u["U_name"]}</GM_U_name>";
		  echo "<GM_U_headImg>{$row_u["U_headImg"]}</GM_U_headImg>";
		  echo "<GM_content>{$row["GM_content"]}</GM_content>";
		  echo "<GM_time>{$row["GM_time"]}</GM_time>";
      //echo "<GM_c>{$ss}</GM_c>";
		  echo "</GM>";
      //$last_GM_id = ($last_GM_id >= $row["GM_id"])?($last_GM_id):($row["GM_id"]);
	  }
    echo "</root>";
    //echo "retry:50" . PHP_EOL . PHP_EOL;
    break;
  }
  //else{
  //  echo "data:<root><GM_control>{$last_GM_id}--{$GM_goods}</GM_control></root>\n\n";
  //}
  //echo "retry" . PHP_EOL . PHP_EOL;
  //ob_flush();
  //flush();
  sleep(0.5);
}
?>