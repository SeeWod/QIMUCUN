var cropper;
var iscropperView = true;
var rotate = 0;
var listener = false;
function cropperStart(str2){
	var img = document.getElementById("cropperImg");
	var preview = document.getElementById("preview");
	var cropperView = document.getElementById("cropper_module");
	img.src= str2;
	// alert(img.src);
	if(!listener){
		img.addEventListener('ready', function(){
			listener = true;
			// alert(iscropperView);
			iscropperView = true;
		});
	}
	cropper = new Cropper(img,{
		dragMode: "none",
		viewMode:0,
		aspectRatio:1 / 1,
		preview: preview,
	});

	//cropperView.style.display = "block";
  nav_alterPage('headImg');
}
function cropperEnd(){
	var canvas_ = cropper.getCroppedCanvas({width:100,height:100,fillColor: '#ffff',imageSmoothingEnabled:false,imageSmoothingQuality:'high',});
  console.log("canvas_width "+canvas_.width);
  console.log("canvas_height "+canvas_.height);
	var dataUL_ =  canvas_.toDataURL("image/jpg");
	var file = dataURLtoFile(dataUL_,"newHeadImg.jpg");

	var xmlHttpRequest = createXmlHttpRequest();
	var formdata = new FormData();
	formdata.append("newHeadImg",file);

	var url = "/cgi-bin/self/updateHeadImg.php";
	xmlHttpRequest.onreadystatechange=function(){
    if(xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200){
    	alert(xmlHttpRequest.responseTEXT);
    	if(xmlHttpRequest.responseTEXT == "修改成功"){
    		close_alterPage();
    		cropperMclose();
    		document.getElementById("info_headImg").src = "'"+getCookie("U_headImg")+"'";
    		document.getElementById("U_headImg").style.backgroundImage = "url("+getCookie("U_headImg")+")";
    	}
    }
	}
	xmlHttpRequest.open("POST",url,true);
	xmlHttpRequest.send(formdata);
}

function cropperOperate(op){
	switch(op){
		case 'reset':
			cropper.reset();
			break;
		case 'clockwise':
			rotate += 5;
			cropper.rotateTo(rotate);
			break;
		case 'anticlockwise':
			rotate -= 5;
			cropper.rotateTo(rotate);
			break;
		default:
			break;
	}
}

function cropperMclose(){
	var view = document.getElementById('cropper_module');
	// alert(iscropperView);
	if(iscropperView){
		view.style.display = 'none';
		cropper.destroy();
		iscropperView = false;
	}
}