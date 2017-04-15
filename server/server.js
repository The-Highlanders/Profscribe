/*npm includes*/
let express = require('express')
let morgan 	= require('morgan')
let path 	= require('path');
let passport = require('passport');
let flash    = require('connect-flash');

let cookieParser = require('cookie-parser');
let bodyParser   = require('body-parser');
let session      = require('express-session');


/*instantiate our application*/
let app 	= express()
let http	= require('http').Server(app);
let io 		= require('socket.io')(http);

/*local includes*/
let api 	= require(__dirname + "/api.js")
let sio 	= require( __dirname + "/io.js")

/*global variables*/
PORT = process.env.PORT || 3000

// make this our static directory
app.use(express.static( path.resolve(__dirname + "/../" , 'client/public')  ))
app.use(morgan('dev'))

app.get('/', function(req, res){
	res.sendFile( path.resolve(__dirname + "/../", 'client/index.html') )
})





/*we direct all our api calls to our /api routes */
app.use('/api', api)

/*we direct all oure socket.io calls to this function*/
sio.use(io)





http.listen( PORT , function(){
  console.log('listening on 3000');
});