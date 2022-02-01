const express = require("express");
const apiroute = require("./routes/apiroute");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const sqlite = require("sqlite3").verbose();

let app = express();

app.use(express.json());

let port = process.env.PORT || 3001;

//LOGIN DATABASES

let db = new sqlite.Database("./db/database.db",(err) => {
	if(err) {
		console.log(err.message);
		return;
	}
	console.log("Connected to sqlite database");
})

const CREATE_USERS = "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT)";

const CREATE_SESSIONS = "CREATE TABLE IF NOT EXISTS sessions (id INTEGER PRIMARY KEY AUTOINCREMENT, user TEXT, token TEXT, ttl BIGINT)"

db.all(CREATE_USERS, (err) => {
	if(err) {
		console.log("Failed to create table users. Reason",err)
		return;
	}
	console.log("Created table users if did not exist");
})

db.all(CREATE_SESSIONS, (err) => {
	if(err) {
		console.log("Failed to create table sessions. Reason",err)
		return;
	}
	console.log("Created table sessions if did not exist");
})

let time_to_live_diff = 3600000;

//MIDDLEWARE

createToken = () => {
	let token = crypto.randomBytes(128);
	return token.toString("hex");
}

isUserLogged = (req,res,next) => {
	if(!req.headers.token) {
		return res.status(403).json({message:"Forbidden 1"});
	}
	let SQL = "SELECT * from sessions WHERE token=?";
	db.get(SQL,[req.headers.token],function(err,session) {
		if(err) {
			return res.status(500).json({message:"Internal Server Error"})
		}
		if(!session) {
			return res.status(403).json({message:"Forbidden 2"});
		}
		let now = Date.now();
		if(now > session.ttl) {
			SQL = "DELETE FROM sessions WHERE token = ?"
			db.run(SQL,[req.headers.token],function(err) {
				if(err) {
					console.log("Failed to remove session. Reason",err)
				}
				return res.status(403).json({message:"Forbidden 3"})
			})
		} else {
			let ttl = now + time_to_live_diff;
			req.session = {};
			req.session.user = session.user;
			SQL = "UPDATE sessions SET ttl=? WHERE token=?";
			db.run(SQL,[ttl,req.headers.token],function(err) {
				if(err) {
					console.log("Failed to edit session. Reason",err)
				}
				return next();
			})
		}
	})
}

//LOGIN API

app.post("/register",function(req,res) {
	if(!req.body) {
		return res.status(400).json({message:"Bad request"});
	}
	if(!req.body.username || !req.body.password) {
		return res.status(400).json({message:"Bad request"});
	}
	if(req.body.username.length < 4 || req.body.password.length < 8) {
		return res.status(400).json({message:"Bad request"});
	}
	bcrypt.hash(req.body.password,14,function(err,hash) {
		if(err) {
			return res.status(500).json({message:"Internal Server Error"})
		}
		let SQL = "INSERT INTO users(username,password) VALUES (?,?)";
		db.run(SQL,[req.body.username,hash],function(err) {
			if(err) {				
				console.log("Failed to insert user. Reason",err)
				if(err.errno === 19) {
					return res.status(409).json({message:"Username already in use"})
				} else {
					return res.status(500).json({message:"Internal Server Error"})
				}
			}
			return res.status(201).json({message:"User created"})
		})
	})
})

app.post("/login",function(req,res) {
	if(!req.body) {
		return res.status(400).json({message:"Bad request"});
	}
	if(!req.body.username || !req.body.password) {
		return res.status(400).json({message:"Bad request"});
	}
	if(req.body.username.length < 4 || req.body.password.length < 8) {
		return res.status(400).json({message:"Bad request"});
	}
	let SQL = "SELECT * FROM users WHERE username=?"
	db.get(SQL,[req.body.username],function(err,user) {
		if(err) {
			console.log("Failed to select user. Reason",err)
			return res.status(500).json({message:"Internal Server Error"})
		}
		if(!user) {
			return res.status(401).json({message:"Unauthorized"});
		}
		bcrypt.compare(req.body.password,user.password,function(err,success) {
			if(err) {
				console.log("Failed to compare password hashes. Reason",err);
				return res.status(500).json({message:"Internal Server Error"})
			}
			if(!success) {
				return res.status(401).json({message:"Unauthorized"});
			}
			let token = createToken();
			let now = Date.now();
			SQL = "INSERT INTO sessions(user,token,ttl) values (?,?,?)";
			let ttl = now+time_to_live_diff;
			db.run(SQL,[req.body.username,token,ttl],function(err) {
				if(err) {
					console.log("Failed to save session. Reason",err);
					return res.status(500).json({message:"Internal Server Error"})
				}
				return res.status(200).json({token:token});
			})
		})
	})
})

app.post("/logout",function(req,res) {
	if(!req.headers.token) {
		return res.status(404).json({message:"Not found"})
	}
	let SQL = "DELETE FROM sessions WHERE token=?";
	db.run(SQL,[req.headers.token],function(err) {
		if(err) {
			console.log("Failed to remove session in logout. Reason",err)
		}
		return res.status(200).json({message:"Logged out!"})
	})
})

app.use("/api",isUserLogged,apiroute);

app.listen(port);

console.log("Running in port",port);