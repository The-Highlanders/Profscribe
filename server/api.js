let router = require('express').Router()

router.get('/', function(req, res){
	return res.json({
		hello : "and welcome to our API"
	})
})


// create class
router.post('/professor/cc', isLoggedIn, function(req, res){
	// if the professor is logged in, then we gucci
	if (req.user._professor){
		
	}
	else {
		res.json({
			error : "not a professor, you cannot do this fam"
		})
	}

})


// subscribe to a class
router.post('/student/subscribe/:id', isLoggedIn, function(req, res){
	if (req.user._student){
		
	}
	else {
		res.json({
			error : "not a student, you cannot do this fam"
		})
	}
})

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}



module.exports = router