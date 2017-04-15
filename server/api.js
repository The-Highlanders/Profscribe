let router = require('express').Router()

router.get('/', function(req, res){
	return res.json({
		hello : "and welcome to our API"
	})
})

router.post('/professor/cc', function(req, res){

})





module.exports = router