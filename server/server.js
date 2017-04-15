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


/*instantiate our application*/
let app 	= express()
let http	= require('http').Server(app);
let io 		= require('socket.io')(http);

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
	res.sendFile( path.resolve(__dirname + "/../", 'client/index.html') )
})


app.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});



/*we direct all our api calls to our /api routes */
app.use('/api', api)

/*we direct all oure socket.io calls to this function*/
sio.use(io)





http.listen( PORT , function(){
  console.log('listening on 3000');
});