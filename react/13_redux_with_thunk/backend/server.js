const express = require("express");

let app = express();

app.use(express.json());


//DATABASE

let database = [];
let id = 100;
let port = process.env.PORT || 3001;

//REST API

app.get("/api/contact",function(req,res) {
	return res.status(200).json(database);
});

app.post("/api/contact",function(req,res) {
	if(!req.body) {
		return res.status(400).json({message:"Bad request"});
	}
	if(!req.body.type) {
		return res.status(400).json({message:"Bad request"});
	}
	let item = {
		...req.body,
		id:id
	}
	id++;
	database.push(item);
	return res.status(201).json({message:"created"});
});

app.delete("/api/contact/:id",function(req,res) {
	let tempId = parseInt(req.params.id,10);
	for(let i=0;i<database.length;i++) {
		if(database[i].id === tempId) {
			database.splice(i,1);
			return res.status(200).json({message:"success"})
		}
	}
	return res.status(404).json({message:"not found"})
});



app.listen(port);

console.log("Running in port",port);