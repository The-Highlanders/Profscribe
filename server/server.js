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
var BinaryServer 	= require('binaryjs').BinaryServer;
var wav           	= require('wav');
let exec 			= require('child_process').exec;
let fs 				= require('fs')

var SpeechToTextV1 	= require('watson-developer-cloud/speech-to-text/v1');
var speech_to_text	= new SpeechToTextV1 ({
  username: 'd9f91b1a-0609-4120-8fbd-1d127551e85e',
  password: 'oCsV2y4D604V'
});

require('events').EventEmitter.prototype._maxListeners = 100;


/*instantiate our application*/
let app 		= express()
let server 		= require('http').createServer(app);
let wss 		= new WebSocket.Server({ server , port : 8050});


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
PORT = process.env.PORT || 8051

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

app.set('view engine', 'ejs')
app.set('views', __dirname + "/../client/views")

// configure passport here
require(__dirname + "/passport.js")(passport)


// routes for our actual views
app.get('/', function(req, res){
	if (req.isAuthenticated()){

		if (req.user._student){
			// render the student view




			res.render('student')
		}
		if (req.user._professor){
			// render the professor view
			res.render('professor')		
		}
	}
	else {
		return res.sendFile( path.resolve(__dirname + "/../", 'client/index.html') )
	}
})


app.get('/login', function(req, res){
	if (req.isAuthenticated()){
		return res.redirect('/')
	}
	return res.sendFile( path.resolve(__dirname + "/../", 'client/views/login.html') )
})

app.get('/signup', function(req, res){
	if (req.isAuthenticated()){
		return res.redirect('/')
	}
	return res.sendFile( path.resolve(__dirname + "/../", 'client/views/signup.html') )
})

app.post('/signup', test, passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/failure', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
}));

 app.post('/login', test, passport.authenticate('local-login', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/failure', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
}));


app.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});


function test(req, res, next){
	console.log(req.body)
	next()
}



/*the web socket for the client*/
wss.on('connection', function connection(ws) {
  console.log('a client is connected')
});
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};


binaryServer = BinaryServer( {
   port: 9001
});

binaryServer.on('connection', function(client) {


  var fileWriter = new wav.FileWriter('output.wav', {
    channels: 1,
    sampleRate: 48000,
    bitDepth: 16
  });

  //var data = [];
  client.on('stream', function(stream, meta) {
   	



    stream.on('data', function(chunk){
    	
    	//console.log(chunk)
    	

    })


	var params = {
	  model: 'en-US_BroadbandModel',
	  'content-type': 'audio/l16;rate=48000',
	  continuous: true,
	  'interim_results': true,
	  'word_confidence': true,

	};

	var recognizeStream = speech_to_text.createRecognizeStream(params);
	stream.pipe(recognizeStream)

	// Pipe in the audio.
	//fs.createReadStream( __dirname + '/../output.flac').pipe(recognizeStream);

	// Pipe out the transcription to a file.
	recognizeStream.pipe(fs.createWriteStream('transcription.txt'));

	// Get strings instead of buffers from 'data' events.
	recognizeStream.setEncoding('utf8');

	// Listen for events.
	recognizeStream.on('results', function(event) { onEvent('Results:', event); });
	recognizeStream.on('data', function(event) { onEvent('Data:', event); });
	recognizeStream.on('error', function(event) { onEvent('Error:', event); });
	recognizeStream.on('close', function(event) { onEvent('Close:', event); });
	recognizeStream.on('speaker_labels', function(event) { onEvent('Speaker_Labels:', event); });

	// Displays events on the console.
	function onEvent(name, event) {
		if (name == "Error:"){
			console.log(event)
		}
		if (name == "Results:"){

			//console.log(event)

			for (result in event.results){
				//console.log(event.results[result])
				for (alt in event.results[result].alternatives){
					console.log(event.results[result].alternatives[alt].transcript)
					wss.broadcast(event.results[result].alternatives[alt].transcript)
				}
			}


		}
	};

    //stream.pipe(fileWriter);

    stream.on('end', function(stream, meta) {
	      	
	    fileWriter.end();
	    console.log('stream has ended')

	    exec('pwd', (error, stdout, stderr) => {
		  if (error) {
		    console.error(`exec error: ${error}`);
		    return;
		  }
		  //console.log(`stdout: ${stdout}`);
		  //console.log(`stderr: ${stderr}`);
		});

      	exec('ffmpeg -i output.wav output.flac', (error, stdout, stderr) => {
		  if (error) {
		    console.error(`exec error: ${error}`);
		    return;
		  }
		  //console.log(`stdout: ${stdout}`);
		  //console.log(`stderr: ${stderr}`);
		});


    });
  });
});









/*we direct all our api calls to our /api routes */
app.use('/api', api)







app.listen( PORT , function(){
  console.log('listening on 3000');
});