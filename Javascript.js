function aggiungiPersone(){
	var data = {};
	data.name = document.getElementById("nome").value;
	data.surname = document.getElementById("cognome").value;
	data.sidi_code = document.getElementById("sidi_code").value;
	data.tax_code = document.getElementById("cod_fis").value;
	var json = JSON.stringify(data);
	let xhr = new XMLHttpRequest();
	xhr.open('POST', "http://localhost/Rest/student.php", true);
	xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
	xhr.onload = function () {
		var users = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr.status == "201") {
			console.table(users);
		} else {
			console.error(users);
		}
	}
	xhr.send(json);
}

function caricaPersone(){
	var persone = { table: "impiegati", limit: 100 };
	var dbParam = JSON.stringify(persone);
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200){
			persone = JSON.parse(this.responseText);
			var main = "";
			for(i in persone){
				main += "<tr><td>"+persone[i].name+"</td><td>"+persone[i].surname+"</td><td>"+persone[i].sidi_code+"</td><td>"+persone[i].tax_code+"</td><td><a href='#editEmployeeModal' class='edit' id='"+persone[i].id+"' onclick='getId(this.id)' data-toggle='modal'><i class='material-icons' data-toggle='tooltip' title='Edit'>&#xE254;</i></a><a href='' class='delete' id='"+persone[i].id+"' data-toggle='modal' onclick='eliminaPersona(this.id)'><i class='material-icons' data-toggle='tooltip' title='Delete'>&#xE872;</i></a></td></tr>";
			}
			document.getElementById("personinfo").innerHTML = main;
		}
	};
	xhr.open("GET", "http://localhost/Rest/student.php", true);
	xhr.setRequestHeader("Accept", "application/json");
	xhr.send("i=" + dbParam);
}

function eliminaPersona(id){
	var xhr = new XMLHttpRequest();
	xhr.open("DELETE", "http://localhost/Rest/student.php/?id="+id, true);
	xhr.onload = function () {
		var users = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr.status == "200") {
			console.table(users);
			caricaPersone();
		} else {
			console.error(users);
		}
	}
	xhr.send(id);
}

function getId(id){
	var elemento = document.getElementById('modifica');
	elemento.id = id;
}

function modificaPersona(id){
	var data = {};
	data.id = id;
	data.name = document.getElementById("nome1").value;
	data.surname = document.getElementById("cognome1").value;
	data.sidi_code = document.getElementById("sidi_code1").value;
	data.tax_code = document.getElementById("cod_fis1").value;
	var json = JSON.stringify(data);
	var xhr = new XMLHttpRequest();
	xhr.open("PUT", "http://localhost/Rest/student.php/?id="+id, true);
	xhr.setRequestHeader("Accept", "application/json; charset=utf-8");
	xhr.onload = function () {
		var users = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr.status == "200") {
			console.table(users);
			caricaPersone();
		} else {
			console.error(users);
		}
	}
	xhr.send(json);
}
