const express = require("express");

const app = express();

let port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());

//DATABASE

const database = [];
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

app.listen(port);

console.log("Running in port",port);