const express = require("express");

let router = express.Router();

//DATABASE

let database = [];
let id = 100;

//REST API

router.get("/shopping",function(req,res) {
	let tempDatabase = database.filter(item => item.user === req.session.user)
	return res.status(200).json(tempDatabase);
});

router.post("/shopping",function(req,res) {
	if(!req.body) {
		return res.status(400).json({message:"Bad request"});
	}
	if(!req.body.type) {
		return res.status(400).json({message:"Bad request"});
	}
	let item = {
		...req.body,
		user:req.session.user,
		id:id
	}
	id++;
	database.push(item);
	return res.status(201).json({message:"created"});
});

router.delete("/shopping/:id",function(req,res) {
	let tempId = parseInt(req.params.id,10);
	for(let i=0;i<database.length;i++) {
		if(database[i].id === tempId) {
			if(database[i].user !== req.session.user) {
				return res.status(401).json({message:"You are not authorized to remove this item"})
			}
			database.splice(i,1);
			return res.status(200).json({message:"success"})
		}
	}
	return res.status(404).json({message:"not found"})
});

router.put("/shopping/:id",function(req,res) {
	if(!req.body) {
		return res.status(400).json({message:"Bad request"});
	}
	if(!req.body.type) {
		return res.status(400).json({message:"Bad request"});
	}
	let tempId = parseInt(req.params.id,10);
	let item = {
		...req.body,
		user:req.session.user,
		id:tempId
	}
	for(let i=0;i<database.length;i++) {
		if(database[i].id === tempId) {
			if(database[i].user !== req.session.user) {
				return res.status(401).json({message:"You are not authorized to edit this item"})
			}
			database.splice(i,1,item);
			return res.status(200).json({message:"success"})
		}
	}
	return res.status(404).json({message:"not found"})
})

module.exports = router;