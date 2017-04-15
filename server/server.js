let express = require('express')
let app 	= express()
let morgan 	= require('morgan')
let http	= require('http').Server(app);

// make this our static directory
app.use(express.static( __dirname + "/../client"))

app.use(morgan('dev'))

app.get('/', function(req, res){
	res.sendFile( __dirname + "/../client/index.html")
})


http.listen(3000, function(){
  console.log('listening on *:3000');
});