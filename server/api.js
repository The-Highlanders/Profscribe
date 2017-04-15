let router = require('express').Router()

router.get('/', function(req, res){
	return res.json({
		hello : "and welcome to our API"
	})
})

module.exports = router