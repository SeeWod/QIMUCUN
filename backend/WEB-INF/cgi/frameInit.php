<?php
session_start();
header('Content-type: text/xml');
echo "<?xml version='1.0' encoding='UTF-8'?>";
echo "<U_info>";
echo   "<U_id>{$_SESSION['U_id']}</U_id>";
echo   "<U_name>{$_SESSION['U_name']}</U_name>";
echo   "<U_headImgPath>{$_SESSION['U_headImg']}</U_headImgPath>";
echo "</U_info>";
?>
