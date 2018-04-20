var express = require('express');
var router = express.Router();
var path=require('path');
var User=require('../models/users');

function isauthenticated(req,res,next){
	if ('username' in req.session)
		next();
	else
		res.send("you are not logged in.login to view")
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendfile(path.join(__dirname,'../public/login.html'))
});
router.post('/login',function(req,res){
	var u=req.body.username;
	var p=req.body.password;
	User.findOne({username:u},function(err,dbuser){
    	if (err) {
    		console.log(err);
    		res.send("database error");
    	}else{
    		if (dbuser && p==dbuser.password) {
    			req.session.username=u;
    			res.send('/recognise');
    		}else{
    			res.send("/");
    		}
    	}
	});
});
router.get('/signup',function(req,res,next){
	res.sendfile(path.join(__dirname,"../public/signup.html"))
});
router.post('/signup',function(req,res){
	User.findOne({username:req.body.username},function(err,user){
		if(err){
			console.log(err);
			res.send("database error");
		}else{
			if (user) {
							res.send('username already exists');
						}else{
							var newuser=new User();
							newuser.username=req.body.username;
							newuser.password=req.body.password;
							newuser.firstname=req.body.firstname;
							newuser.lastname=req.body.lastname;
							newuser.save(function(err,user){
								if(err){
									console.log(err);
									res.send("cannot save")
								}
								console.log(user);
								res.redirect("/");
				});
			}
		}
	});
});
router.get('/recognise',function(req,res,next){
	res.sendfile(path.join(__dirname,"../public/interface.html"))
});
router.get('/logout',function(req,res,next){
	delete req.session.username;
	res.redirect("/");
})

module.exports = router;