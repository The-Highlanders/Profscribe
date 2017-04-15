let router = require('express').Router()

router.get('/', function(req, res){
	return res.json({
		hello : "and welcome to our API"
	})
})

router.post('/professor/cc', isLoggedIn, function(req, res){
	// if the professor is logged in, then we gucci
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