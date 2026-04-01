<?php
$conn;
dbConnect();
function dbConnect(){
  global $conn;
	$host ="localhost";
	$username ="qimucun";
	$password ="qimucun6L8=!";
	$db ="qimucun";	
	$conn = mysqli_connect($host,$username,$password,$db);	
	if(!$conn){
		die("连接失败:" . mysqli_connect_error());
	}
	return $conn;
}

function insert($sql){
  global $conn;
	if(!$conn){
		$conn = dbConnect();
	}
	$result = mysqli_query($conn,$sql);
	return $result;
}
function query($sql){
  global $conn;
	if(!$conn){
		$conn = dbConnect();
	}
	$result = mysqli_query($conn,$sql);
	return $result;
}
?>