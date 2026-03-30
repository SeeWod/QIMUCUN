<?php

function imgCompress($src,$desPath,$percent){
	$imgName = basename($src);
	$srcImg; //图像输入内存
	$CompressedImg;

	list($width,$height,$type,$attr) = getimagesize($src);
 
  switch($type){
     case "2":
       $srcImg = imagecreatefromjpeg($src);
       break;//图像输入内存
     case "3":
       $srcImg = imagecreatefrompng($src);
       break;
     default: 
       echo "不是jpg、png类型";
       break;
   }
	//创建彩色图片
	$CompressedImg = imagecreatetruecolor($width*$percent,$height*$percent);
	//原图像采样复制到创建图片上
	imagecopyresampled($CompressedImg,$srcImg,0,0,0,0,$width*$percent,$height*$percent,$width,$height);
	imagejpeg($CompressedImg,$desPath.$imgName);

	imagedestroy($srcImg);
	imagedestroy($CompressedImg);
	//清除内存
}

?>