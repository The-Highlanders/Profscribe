module.exports  =  {

	use : function(ws){
		ws.on('connection', function connection(ws) {
			ws.on('message', function incoming(message) {
			    console.log('received: %s', message);
			});
		})
	}
}