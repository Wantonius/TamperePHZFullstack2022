const mongoose = require("mongoose");

let Schema = mongoose.Schema({
	firstname:String,
	lastname:{type:String,index:true},
	email:String,
	address:String,
	phone:String
})

module.exports = mongoose.model("Contact",Schema);