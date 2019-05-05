

$('.db').click(function(){
	var newTag = document.getElementById('tagValue').value
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
	button.setAttribute("data-dismiss", "alert"); 	  
	var buttonTxt = document.createTextNode("×");        
    button.appendChild(buttonTxt);   
    div.appendChild(button);                           
	Tag.appendChild(div);
	document.getElementById('tagValue').value = "";
	
});

$('.dropdown-toggle, .dropdown-item').click(function(){
	
	var value = this.innerText
	$('#cm').fadeOut("fast",function(){
		document.getElementById('cm').innerText =  value;});
	$('#cm').fadeIn();
	
});

$('#ngayGioPicker').click(function(){
	
	$('#ngayGio').fadeOut("fast",function(){
	document.getElementById('ngayGio').innerText = document.getElementById('ngayGioTxt').value;
	});
	$('#ngayGio').fadeIn();

});