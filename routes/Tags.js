var tags=['Home','About me','Blog','Travel','LifeStyle','Fashion','Health'];
var selectedIndex=-1;


function addTag() {
	var name = document.getElementById('nameTag').value;
	if(selectedIndex==-1){
		tags.push(name);
		add1Tag(name,tags.length-1);
	}else{
		tags[tags.length-1]=name;
		document.getElementById('Tag'+selectedIndex).textContent=name;
	}
	document.getElementById('nameTag').value="";
	$('#addModal').modal('hide');
}

function addTag_Click() {
	selectedIndex=-1;
	$('#addModal').modal();
}

function add1Tag(name,value) {
	var li = document.createElement('li');
		li.style.display='flex';
		li.style.justifyContent='space-between';
		li.id='li'+value;
		var a = document.createElement('a');
		a.id='Tag'+value;
		a.textContent=name;
		a.href='#'
		li.appendChild(a);
		var div = document.createElement('div');
		div.class='d-flex justify-content-between';

		var btn1 = document.createElement('button');
		btn1.className ='btn btn-outline-danger';
		btn1.type='button';
		btn1.value=value;
		btn1.textContent='Xóa';
		btn1.onclick =function () {
			document.getElementById('li'+this.value).remove();
			tags.splice(this.value,1);

		}
		div.appendChild(btn1);

		var btn2 = document.createElement('button');
		btn2.className ='btn btn-outline-success';
		btn2.type='button';
		btn2.value=value;
		btn2.textContent='Cập nhật';
		btn2.onclick=function () {
			selectedIndex=this.value;
			$('#addModal').modal();

		}
		div.appendChild(btn2);
		li.appendChild(div);
		document.getElementById('TAG').appendChild(li);
}
function loadTag() {

	for(var i=0;i<tags.length;i++){
		add1Tag(tags[i],i);


	}
}