const express = require("express");
const mongoose = require("mongoose");
const contactModel = require("./contact");

const app = express();

let port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());

//DATABASE

const mongo_user = process.env.MONGOCLOUD_USER;
const mongo_password = process.env.MONGOCLOUD_PASSWORD;
const mongo_url = process.env.MONGOCLOUD_URL;

mongoose.connect("mongodb+srv://"+mongo_user+":"+mongo_password+"@"+mongo_url+"/contactstest?retryWrites=true&w=majority").then(
	() => console.log("Connected to mongoDB"),
	(error) => console.log("Failed to connect to mongoDB. Reason",error)
)


app.get("/api/contact",function(req,res) {
	contactModel.find({},function(err,contacts) {
		if(err) {
			console.log(err);
			return res.status(500).json({"message":"internal server error"})
		}
		return res.status(200).json(contacts);
	})
})

app.post("/api/contact", function(req,res) {
	let contact = new contactModel({
		"firstname":req.body.firstname,
		"lastname":req.body.lastname,
		"email":req.body.email,
		"address":req.body.address,
		"phone":req.body.phone,
	})
	contact.save(function(err) {
		if(err) {
			console.log(err);
			return res.status(500).json({"message":"Internal server error"})
		}
		return res.status(201).json({"message":"created"})
	})
})

app.delete("/api/contact/:id",function(req,res) {
	contactModel.deleteOne({"_id":req.params.id},function(err) {
		if(err) {
			console.log(err);
			return res.status(500).json({"message":"Internal Server Error"})
		}
		return res.status(200).json({"message":"success"})
	});
})

app.put("/api/contact/:id", function(req,res) {
	let contact = {
		"firstname":req.body.firstname,
		"lastname":req.body.lastname,
		"email":req.body.email,
		"address":req.body.address,
		"phone":req.body.phone,
	}
	contactModel.replaceOne({"_id":req.params.id},contact,function(err) {
		if(err) {
			console.log(err);
			return res.status(500).json({"message":"Internal server error"})
		}
		return res.status(200).json({"message":"success"})
	})
});

app.listen(port);

console.log("Running in port",port);