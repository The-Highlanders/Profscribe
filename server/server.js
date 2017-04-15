/*npm includes*/
let express 		= require('express')
let morgan 			= require('morgan')
let path 			= require('path');
let passport 		= require('passport');
let flash    		= require('connect-flash');

let cookieParser 	= require('cookie-parser');
let bodyParser   	= require('body-parser');
let session      	= require('express-session');
let mongoose		= require('mongoose')
let WebSocket 		= require('ws')


/*instantiate our application*/
let app 		= express()
let server 		= require('http').createServer(app);
let wss 		= new WebSocket.Server({ server , port : 8080});


/*local includes*/
let api 	= require(__dirname + "/api.js")
let sio 	= require( __dirname + "/io.js")
let config 	= require( __dirname + "/config.js")

mongoose.connect(config.url, function(err){
	if (err){
		console.log(err)
	}
	console.log('connected to database')
})


/*global variables*/
PORT = process.env.PORT || 3000

// make this our static directory
app.use(express.static( path.resolve(__dirname + "/../" , 'client/public')  ))

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms

// required for passport
app.use(session({
	secret : 'thisisareallysecretsecret',
	resave : false,
	saveUninitialized : false
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// configure passport here
require(__dirname + "/passport.js")(passport)


// routes for our actual views
app.get('/', function(req, res){
	if (req.isAuthenticated()){
		return res.json({
			you : "in nigga"
		})
	}
	else {
		return res.sendFile( path.resolve(__dirname + "/../", 'client/index.html') )
	}
})

app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/failure', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
}));

 app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/failure', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
}));


app.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});



var token = config.token
var wsURI = 'wss://stream.watsonplatform.net/speech-to-text/api/v1/recognize?watson-token=' +
  token + '&model=es-ES_BroadbandModel';


const ws = new WebSocket(wsURI, {
  perMessageDeflate: false
});

ws.on('open', function open() {
 	let message = {
		'action': 'start',
    	'content-type': 'audio/l16;rate=22050'
  	}

 	ws.send(JSON.stringify(message))
});

 ws.on('message', function incoming(message) {
    console.log('received: %s', message);
 });







/*we direct all our api calls to our /api routes */
app.use('/api', api)

/*we direct all oure socket.io calls to this function*/
sio.use(wss)





app.listen( PORT , function(){
  console.log('listening on 3000');
});