let LocalStrategy   = require('passport-local').Strategy;

// import the Student and Professor models
let Student         = require( __dirname + "/models/student.js").Model
let Professor 		= require( __dirname + "/models/professor.js").Model
let Account 		= require( __dirname + "/models/account.js").Model


module.exports = function(passport){

	// used to serialize the user
	passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
    	Account.findById(id, function(err, user){
    		 done(err, user);
    	})
    });



    passport.use('local-signup', new LocalStrategy({
    	usernameField 		: 'email',
        passwordField 		: 'password',
        passReqToCallback 	: true // allows us to pass back the entire request to the callback
    }, function(req, email, password, done){


    	console.log('we in nigga')
    	process.nextTick(function(){

    		Account.findOne({
    			email : req.body.email
    		}, function(err, user){
    			if (err){
    				return done(err)
    			}
    			if (user){
    				return done(null, false, req.flash('signupMessage', 'That email is already taken.'))
    			}
    			else {
    				// create a new account
    				if (req.body.professor){

    					let newAccount 			= new Account()
    					let newProfessor 		= new Professor()
    					newAccount.email 		= req.body.email
    					newAccount.password 	= newAccount.generateHash(password);
    					newAccount._professor 	= newProfessor.id

    					newAccount.save(function(err){
    						if (err){
    							console.log(err)
    							done(err)
    						}
    						else {
    							return done(null, newAccount)
    						}
    					})
    				}
    				else if (req.body.student){
    					let newAccount 		= new Account()
    					let newProfessor 	= new Student
    					newAccount.email 	= req.body.email
    					newAccount.password = newAccount.generateHash(password);
    					newAccount._student = newProfessor.id

    					newAccount.save(function(err){
    						if (err){
    							console.log(err)
    							done(err)
    						}
    						else {
    							return done(null, newAccount)
    						}
    					})
    				}

    				else {
    					console.log('tried to sign up as neither student nor professor')
    					return done(null, false)
    				}
    			}
    		})


    	})

    }))

    passport.use('local-login', new LocalStrategy({
    	usernameField 		: 'email',
        passwordField 		: 'password',
        passReqToCallback 	: true // allows us to pass back the entire request to the callback
  
    },function(req, email, password, done) {
    	Account.findOne({
    		email : req.body.email
    	}, function(err, user){
    		if (err){
    			console.log(err)
    			return done(err)
    		}
    		if (!user){
    			return done(null, false, req.flash('loginMessage', 'No user found.'))
    		}
    		if (!user.validPassword(password)){
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
    		}

    		// all is well, return successful user
            return done(null, user);
    	})
    }))

}