const express = require("express");
const sqlite = require("sqlite3").verbose();
let router = express.Router();

//DATABASE

let db = new sqlite.Database("./db/database.db",(err) => {
	if(err) {
		console.log(err.message);
		return;
	}
	console.log("Connected to sqlite database");
})

const CREATE_ITEMS = "CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, item_type TEXT, count INTEGER, price FLOAT, user TEXT)"

db.all(CREATE_ITEMS, (err) => {
	if(err) {
		console.log("Failed to create table items. Reason",err)
		return;
	}
	console.log("Created table items if did not exist");
})

let database = [];
let id = 100;

//REST API

router.get("/shopping",function(req,res) {
	let temp_values = "user=?";
	let values = [req.session.user];
	if(req.query.type) {
		temp_values = temp_values + " AND item_type=?";
		values[1] = req.query.type;
		if(req.query.price) {
			temp_values = temp_values + "AND price<=?"
			values[2] = req.query.price;
		}
	} else {
		if(req.query.price) {
			temp_values = temp_values + "AND price<=?"
			values[1] = req.query.price;			
		}
	}
	let SQL = "SELECT id,item_type as type,count,price FROM items WHERE "+temp_values
	db.all(SQL,values,function(err,items) {
		if(err) {
			console.log("Failed to find items. Reason",err)
			return res.status(500).json({message:"Internal Server Error"})
		}
		return res.status(200).json(items)
	})
});

router.post("/shopping",function(req,res) {
	if(!req.body) {
		return res.status(400).json({message:"Bad request"});
	}
	if(!req.body.type) {
		return res.status(400).json({message:"Bad request"});
	}
	let SQL = "INSERT INTO items(item_type,count,price,user) VALUES (?,?,?,?)";
	db.run(SQL,[req.body.type,req.body.count,req.body.price,req.session.user],function(err) {
		if(err) {
			console.log("Failed to add item. Reason",err);
			return res.status(500).json({message:"Internal Server Error"})
		}
		return res.status(201).json({message:"Created"});
	})
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