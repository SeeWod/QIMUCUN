<?php
function db(){
  static $conn = null;
  if($conn === null){
    $host = getenv('MYSQL_HOST') ?: 'localhost';
    $username = getenv('MYSQL_USERNAME') ?: 'root';
    $password = getenv('MYSQL_PASSWORD') ?: '';
    $db = getenv('MYSQL_DATABASE') ?: '';
    $conn = mysqli_connect($host,$username,$password,$db);
    if(!$conn){
      die("连接失败:" . mysqli_connect_error());
    }
  }
  return $conn;
}
function insert($sql){
  $conn = db();
  return mysqli_query($conn,$sql);
}
function query($sql){
  $conn = db();
  return mysqli_query($conn,$sql);
}
?>
