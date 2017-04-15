let LocalStrategy   = require('passport-local').Strategy;

// import the Student and Professor models
let Student         = require( __dirname + "/models/student.js").Model
let Professor 		= require( __dirname + "/models/professor.js").Model


module.exports = function(passport){

	passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        Student.findById(id, function(err, user) {
      		if (err){
      			return console.log(err) // if error with database
      		}
        	else if (user){
        		done(err, user); // if we found a user, we gucci
        	}
        	else {
        		Professor.findById(id, function(err, user){
        			
        		})
        	}
        });
    });



}