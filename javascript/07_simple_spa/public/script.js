window.onload = function() {
	createForm();
}

createForm = () => {
	let anchor = document.getElementById("anchor");
	let form = document.createElement("form");
	
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
			} else {
				console.log("Add to list failed. Reason",response.status)
			}
	}).catch(error => {
		console.log(error);
	})
}