const express = require("express");
const apiroute = require("./routes/apiroute");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const mongoose = require("mongoose");
const userModel = require("./models/user");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const session = require("express-session");
const mongoStore = require("connect-mongo")(session);

let app = express();

app.use(express.json());

let port = process.env.PORT || 3001;

//LOGIN DATABASES

const mongo_user = process.env.MONGOCLOUD_USER;
const mongo_password = process.env.MONGOCLOUD_PASSWORD;
const mongo_url = process.env.MONGOCLOUD_URL;

mongoose.connect("mongodb+srv://"+mongo_user+":"+mongo_password+"@"+mongo_url+"/webshopping?retryWrites=true&w=majority").then(
	() => console.log("Connected to MongoDB"),
	(error) => console.log("Failed to connect to MongoDB. Reason",error)
);

mongoose.set("toJSON",{virtuals:true});

let time_to_live_diff = 3600000;


app.use(session({
	name:"tpshopping-session",
	resave:false,
	secret:"MyBestSecret",
	saveUninitialized:false,
	cookie:{maxAge:1000*60*60},
	store: new mongoStore({
		collection:"session",
		mongooseConnection:mongoose.connection,
		ttl:60*60
	})
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use("local-login",new localStrategy({
	usernameField:"username",
	passwordField:"password",
	passReqToCallback:true
}, function(req,username,password,done) {
	if(!req.body) {
		return done(null,false,{message:"Bad request"})
	}
	if(!req.body.username || !req.body.password) {
		return done(null,false,{message:"Bad request"})
	}
	if(req.body.username.length < 4 || req.body.password.length < 8) {
		return done(null,false,{message:"Bad request"})
	}
	userModel.findOne({"username":req.body.username},function(err,user){
		if(err) {
			console.log("Failed to find user. Reason",err);
			return done(err);
		}
		if(!user) {
			return done(null,false,{message:"Unauthorized"})
		}
		bcrypt.compare(req.body.password,user.password,function(err,success){
			if(err) {
				console.log("Comparing passwords failed. Reason",err);
				return done(err);
			}
			if(!success) {
				return done(null,false,{message:"Unauthorized"})
			}
			let token = createToken();
			req.session.token = token;
			req.session.username = username;
			return done(null,user);
		})
	})		
}))

passport.serializeUser(function(user,done) {
	console.log("Serialize user");
	done(null,user._id);
})

passport.deserializeUser(function(_id,done) {
	console.log("deserialize user");
	userModel.findById(_id,function(err,user) {
		if(err) {
			return done(err)
		}
		return done(null,user);
	})
})

//MIDDLEWARE

createToken = () => {
	let token = crypto.randomBytes(128);
	return token.toString("hex");
}

isUserLogged = (req,res,next) => {
	if(!req.headers.token) {
		return res.status(403).json({message:"Forbidden 1"});
	}
	if(req.isAuthenticated()) {
		if(req.headers.token === req.session.token) {
			return next();
		}
	}
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
			return res.status(400).json({message:"Bad request"})
		}
		let user = new userModel({
			username:req.body.username,
			password:hash
		})
		user.save(function(err,user) {
			if(err) {
				console.log("Failed to create new user. Reason",err);
				if(err.code === 11000) {
					return res.status(409).json({message:"Username already in use"})
				}
				return res.status(500).json({message:"Internal server error"})
			}
			if(!user) {
				return res.status(500).json({message:"Internal server error"})
			}
			return res.status(201).json({message:"User registered"});
		})
	})
})

app.post("/login",passport.authenticate("local-login",{failureRedirect:'/'}),function(req,res) {
	return res.status(200).json({token:req.session.token})

})

app.post("/logout",function(req,res) {
	if(!req.headers.token) {
		return res.status(404).json({message:"Not found"})
	}
	if(req.session) {
		req.logout();
		req.session.destroy();
		return res.status(200).json({message:"success"})
	}
	return res.status(404).json({message:"Not found"})
})

app.use("/api",isUserLogged,apiroute);

app.listen(port);

console.log("Running in port",port);