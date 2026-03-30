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
		//aspectRatio:1 / 1,
		preview: preview,
	});

	cropperView.style.display = "block";
}
function cropperEnd(){
  //console.log("cropperÊý¾Ý"+cropper.getData(true).width);
  var hei = 1000 * cropper.getData(true).height / cropper.getData(true).width;
	var canvas_ = cropper.getCroppedCanvas({width:1000,height:hei,fillColor: '#ffff',imageSmoothingEnabled:false,imageSmoothingQuality:'high',});
  console.log("canvas_width "+canvas_.width);
  console.log("canvas_height "+canvas_.height);
	var dataUL_ =  canvas_.toDataURL("image/jpg");

	var E = document.getElementById("addPage_img");
	var file = dataURLtoFile(dataUL_,"poster.jpg");
    //console.log(file.name);
    //console.log(file.size);
    //console.log(file.lastModifiedDate);
	E.style.backgroundImage = 'url(' + dataUL_ + ')';
	posterFile = file;

	cropperMclose();
	return file;
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