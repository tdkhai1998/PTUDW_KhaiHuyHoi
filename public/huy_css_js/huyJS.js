

$('.db').click(function(){
	var temp = document.getElementById('tagValue');
	var newTag = temp[temp.selectedIndex].innerText;
	var tagvalue = temp[temp.selectedIndex].value;
	var Tag = document.getElementById('tag')
	if (newTag=="")
		return;
	var div = document.createElement("div"); 
	div.className = "alert alert-success alert-dismissible tag";
	var tagTxt = document.createTextNode(newTag); 
	div.appendChild(tagTxt);

	var button =  document.createElement("button");  
	button.type = "button";
	button.className = "close";
	var close = "tagclose(" + tagValue.value + ")";
	button.setAttribute("onclick", close); 	  
	button.setAttribute("data-dismiss", "alert"); 	  
	var buttonTxt = document.createTextNode("×");        
    button.appendChild(buttonTxt);   
    div.appendChild(button);                           
	Tag.appendChild(div);
	document.getElementById('tagValue').value = "";
	var tags = document.getElementById('inputtag').value
	tags = tags + "," + tagvalue;
	document.getElementById('inputtag').setAttribute("value",tags);
	
});

$('.con, .cha').click(function(){
	var txt = this.innerText
	var value = this.value
	console.log(value);
	$('#cm').fadeOut("fast",function(){
	document.getElementById('cm').innerText = txt;});
	document.getElementById('inputcm').setAttribute("value",value);
	$('#cm').fadeIn();
	});


function tagclose(id){

	console.log(id)
	var tags = document.getElementById('inputtag').value
	tags = tags.replace(','+id,'');
	document.getElementById('inputtag').setAttribute("value",tags);
}

$('#ngayGioPicker').click(function(){
	
	$('#ngayGio').fadeOut("fast",function(){
	document.getElementById('ngayGio').innerText = document.getElementById('ngayGioTxt').value;
	document.getElementById('inputtime').setAttribute("value",document.getElementById('ngayGioTxt').value);
	document.getElementById('inputtime').innerText =document.getElementById('ngayGioTxt').value;
	});
	$('#ngayGio').fadeIn();

});

function onFileSelected(event) {
  var selectedFile = event.target.files[0];
  var reader = new FileReader();

  var imgtag = document.getElementById("myimage");
  imgtag.title = selectedFile.name;

  reader.onload = function(event) {
    imgtag.src = event.target.result;
  };

  reader.readAsDataURL(selectedFile);
}