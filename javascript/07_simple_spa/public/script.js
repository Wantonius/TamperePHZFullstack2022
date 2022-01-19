window.onload = function() {
	createForm();
	getContactList();
}

createForm = () => {
	let anchor = document.getElementById("anchor");
	let form = document.createElement("form");
	form.setAttribute("id","form");
	
	//First name input
	
	let firstNameInput = document.createElement("input");
	firstNameInput.setAttribute("type","text");
	firstNameInput.setAttribute("value","");
	firstNameInput.setAttribute("name","firstnameinput");
	firstNameInput.setAttribute("id","firstnameinput");
	let firstNameLabel = document.createElement("label");
	firstNameLabel.setAttribute("for","firstnameinput");
	let firstNameText = document.createTextNode("First name:");
	firstNameLabel.appendChild(firstNameText);
	
	//Last name input
	
	let lastNameInput = document.createElement("input");
	lastNameInput.setAttribute("type","text");
	lastNameInput.setAttribute("value","");
	lastNameInput.setAttribute("name","lastnameinput");
	lastNameInput.setAttribute("id","lastnameinput");
	let lastNameLabel = document.createElement("label");
	lastNameLabel.setAttribute("for","lastnameinput");
	let lastNameText = document.createTextNode("Last name:");
	lastNameLabel.appendChild(lastNameText);
	
	//Email input
	
	let emailInput = document.createElement("input");
	emailInput.setAttribute("type","email");
	emailInput.setAttribute("value","");
	emailInput.setAttribute("name","emailinput");
	emailInput.setAttribute("id","emailinput");
	let emailLabel = document.createElement("label");
	emailLabel.setAttribute("for","emailinput");
	let emailText = document.createTextNode("Email:");
	emailLabel.appendChild(emailText);
	
	//Address input
	
	let addressInput = document.createElement("input");
	addressInput.setAttribute("type","text");
	addressInput.setAttribute("value","");
	addressInput.setAttribute("name","addressinput");
	addressInput.setAttribute("id","addressinput");
	let addressLabel = document.createElement("label");
	addressLabel.setAttribute("for","addressinput");
	let addressText = document.createTextNode("Address:");
	addressLabel.appendChild(addressText);
	
	//Phone input
	
	let phoneInput = document.createElement("input");
	phoneInput.setAttribute("type","tel");
	phoneInput.setAttribute("value","");
	phoneInput.setAttribute("name","phoneinput");
	phoneInput.setAttribute("id","phoneinput");
	let phoneLabel = document.createElement("label");
	phoneLabel.setAttribute("for","phoneinput");
	let phoneText = document.createTextNode("Phone:");
	phoneLabel.appendChild(phoneText);
	
	//Submit Button
	
	let submitButton = document.createElement("input");
	submitButton.setAttribute("type","submit");
	submitButton.setAttribute("value","Add");
	submitButton.setAttribute("id","addbutton");
	
	//Append to form
	
	let br = document.createElement("br");
	form.appendChild(firstNameLabel);
	form.appendChild(firstNameInput);
	form.appendChild(br);
	form.appendChild(lastNameLabel);
	form.appendChild(lastNameInput);
	form.appendChild(br.cloneNode());
	form.appendChild(emailLabel);
	form.appendChild(emailInput);
	form.appendChild(br.cloneNode());
	form.appendChild(addressLabel);
	form.appendChild(addressInput);
	form.appendChild(br.cloneNode());
	form.appendChild(phoneLabel);
	form.appendChild(phoneInput);
	form.appendChild(br.cloneNode());
	form.appendChild(submitButton);
	form.addEventListener("submit",function(event) {
		event.preventDefault();
		addToList()
	})
	anchor.appendChild(form);
	let tableAnchor = document.createElement("div");
	tableAnchor.setAttribute("id","tableanchor");
	anchor.appendChild(tableAnchor);
}

addToList = () => {
	let firstname = document.getElementById("firstnameinput").value;
	let lastname = document.getElementById("lastnameinput").value;
	let email = document.getElementById("emailinput").value;
	let address = document.getElementById("addressinput").value;
	let phone = document.getElementById("phoneinput").value;
	let contact = {
		"firstname":firstname,
		"lastname":lastname,
		"email":email,
		"address":address,
		"phone":phone
	}
	let request = {
		method:"POST",
		mode:"cors",
		headers:{"Content-type":"application/json"},
		body:JSON.stringify(contact)
	}
	fetch("/api/contact/",request).then(response => {
			if(response.ok) {
				console.log("Add to list success");
				getContactList();
			} else {
				console.log("Add to list failed. Reason",response.status)
			}
	}).catch(error => {
		console.log(error);
	})
}


getContactList = async () => {
	let request = {
		method:"GET",
		mode:"cors",
		headers:{"Content-type":"application/json"}
	}
	let response = await fetch("/api/contact",request);
	if(response.ok) {
		let data = await response.json();
		populateTable(data)
	} else {
		console.log("Failed to get contacts. Reason",response.status);
	}
}

removeFromList = async (id) => {
	let request = {
		method:"DELETE",
		mode:"cors",
		headers:{"Content-type":"application/json"}
	}
	let response = await fetch("/api/contact/"+id,request);
	if(response.ok) {
		getContactList();
	} else {
		console.log("Remove failed, reason",response.status);
	}
}



populateTable = (data) => {
	let tableAnchor = document.getElementById("tableanchor");
	let table = document.getElementById("table");
	if(table) {
		tableAnchor.removeChild(table);
	}
	let newTable = document.createElement("table");
	newTable.setAttribute("id","table");
	
	//Table header
	
	let header = document.createElement("thead");
	let headerRow = document.createElement("tr");
	let firstNameHeader = document.createElement("th");
	let firstNameText = document.createTextNode("First name");
	firstNameHeader.appendChild(firstNameText);
	let lastNameHeader = document.createElement("th");
	let lastNameText = document.createTextNode("Last name");
	lastNameHeader.appendChild(lastNameText);
	let emailHeader = document.createElement("th");
	let emailText = document.createTextNode("Email");
	emailHeader.appendChild(emailText);
	let addressHeader = document.createElement("th");
	let addressText = document.createTextNode("Address");
	addressHeader.appendChild(addressText);
	let phoneHeader = document.createElement("th");
	let phoneText = document.createTextNode("Phone");
	phoneHeader.appendChild(phoneText);
	let removeHeader = document.createElement("th");
	let removeText = document.createTextNode("Remove");
	removeHeader.appendChild(removeText);
	let editHeader = document.createElement("th");
	let editText = document.createTextNode("Edit");
	editHeader.appendChild(editText);
	headerRow.appendChild(firstNameHeader);
	headerRow.appendChild(lastNameHeader);	
	headerRow.appendChild(emailHeader);
	headerRow.appendChild(addressHeader);
	headerRow.appendChild(phoneHeader);
	headerRow.appendChild(removeHeader);
	headerRow.appendChild(editHeader);
	header.appendChild(headerRow);
	newTable.appendChild(header);
	
	//Table body
	let body = document.createElement("tbody");
	for(let i=0;i<data.length;i++) {
		let tableRow = document.createElement("tr");
		for (x in data[i]) {
			if(x === "id") {
				continue;
			}
			let column = document.createElement("td");
			let info = document.createTextNode(data[i][x]);
			column.appendChild(info);
			tableRow.appendChild(column);
		}
		let removeColumn = document.createElement("td");
		let removeButton = document.createElement("button");
		let removeText = document.createTextNode("Remove");
		removeButton.appendChild(removeText);
		removeButton.setAttribute("name",data[i].id)
		removeButton.addEventListener("click",function(event) {
			removeFromList(event.target.name)
		})
		let editColumn = document.createElement("td");
		let editButton = document.createElement("button");
		let editText = document.createTextNode("Edit");
		editButton.appendChild(editText);
		editButton.setAttribute("name",data[i].id)
		editButton.addEventListener("click",function(event) {
		})
		removeColumn.appendChild(removeButton);
		editColumn.appendChild(editButton);
		tableRow.appendChild(removeColumn);
		tableRow.appendChild(editColumn);
		body.appendChild(tableRow);
	}
	newTable.appendChild(body);
	tableAnchor.appendChild(newTable);

}