const express = require("express");

const app = express();

let port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());

//DATABASE

let database = [];
let id = 100;

app.get("/api/contact",function(req,res) {
	return res.status(200).json(database);
})

app.post("/api/contact", function(req,res) {
	console.log(req.body);
	let contact = {
		"firstname":req.body.firstname,
		"lastname":req.body.lastname,
		"email":req.body.email,
		"address":req.body.address,
		"phone":req.body.phone,
		"id":id
	}
	id++;
	database.push(contact);
	res.status(201).json({"message":"created"});
})

app.delete("/api/contact/:id",function(req,res) {
	let tempId = parseInt(req.params.id,10);
	database = database.filter(item => item.id !== tempId);
	res.status(200).json({"message":"success"});
})

app.put("/api/contact/:id", function(req,res) {
	let tempId = parseInt(req.params.id,10);
	let contact = {
		"firstname":req.body.firstname,
		"lastname":req.body.lastname,
		"email":req.body.email,
		"address":req.body.address,
		"phone":req.body.phone,
		"id":tempId
	}
	for(let i=0;i<database.length;i++) {
		if(tempId === database[i].id) {
			database.splice(i,1,contact);
			return res.status(200).json({"message":"success"})
		}
	}
	return res.status(404).json({"message":"not found"});
});

app.listen(port);

console.log("Running in port",port);