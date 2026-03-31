<?php
session_start();
header('Content-type: text/xml');
echo "<?xml version='1.0' encoding='UTF-8'?>";
echo "<U>";
// echo   "<U_id>{$_SESSION['U_id']}</U_id>";
// echo   "<U_name>{$_SESSION['U_name']}</U_name>";
// echo   "<U_headImgPath>{$_SESSION['U_headImg']}</U_headImgPath>";
echo   "<U_phone>{$_SESSION['U_phone']}</U_phone>";
echo   "<U_college>{$_SESSION['U_school']}</U_college>";
echo   "<U_sid>{$_SESSION['U_sid']}</U_sid>";

$permissionString = "";
$ps = decbin($_SESSION['U_permission']);
if(substr($ps,-6,1) == "1"){$permissionString = $permissionString . "站长";}
if(substr($ps,-5,1) == "1"){$permissionString = $permissionString . " 广";}
if(substr($ps,-4,1) == "1"){$permissionString = $permissionString . " 招聘";}
if(substr($ps,-3,1) == "1"){$permissionString = $permissionString . " 租";}
if(substr($ps,-2,1) == "1"){$permissionString = $permissionString . "兼";}
echo "<U_officer>{$permissionString}</U_officer>";
    
echo "</U>";
?>
