<?php
require_once('../dbconnect.php');
$O_id = $_GET["O_id"];

header('Content-type: text/xml');
echo "<?xml version='1.0' encoding='UTF-8'?>";
echo "<root>";
echo "<O>";

$sql_Ws = "SELECT W_id,W_name,W_academy,W_major,W_contact,W_evaluation from workers where W_id = {$O_id}";
$result_Ws = query($sql_Ws);
if(mysqli_num_rows($result_Ws) > 0){
  $row_W=mysqli_fetch_assoc($result_Ws);     
  echo "<O_Wcontrol>1查询成功</O_Wcontrol>";
  echo "<O_id>{$row_W['W_id']}</O_id>";
  echo "<O_name>{$row_W['W_name']}</O_name>";
  echo "<O_academy>{$row_W['W_academy']}</O_academy>"; 
  echo "<O_major>{$row_W['W_major']}</O_major>";
  echo "<O_contact>{$row_W['W_contact']}</O_contact>";
  echo "<O_evaluation>{$row_W['W_evaluation']}</O_evaluation>";
}else{
  echo "<O_Wcontrol>2查询失败{$sql_Ws}</O_Wcontrol>";
}
$sql_Us = "SELECT U_name,U_headImg,U_permission from users where U_id = {$O_id}";
$result_Us = query($sql_Us);
if(mysqli_num_rows($result_Us) > 0){
  $row_U=mysqli_fetch_assoc($result_Us);     
  echo "<O_Ucontrol>1查询成功</O_Ucontrol>";
  echo "<O_alias>{$row_U['U_name']}</O_alias>";
  echo "<O_headImg>{$row_U['U_headImg']}</O_headImg>";
  echo "<O_permission>" . decbin($row_U['U_permission']) . "</O_permission>";
}else{
  echo "<O_Ucontrol>2查询失败{$sql_Us}</O_Ucontrol>";
}

echo "</O>";
echo "</root>"; 
mysqli_free_result($result_Ws);
mysqli_free_result($result_Us);
?>
