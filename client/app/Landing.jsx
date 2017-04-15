import React from 'react';

export default class Landing extends React.Component {

	render () {
		return (
				<div className="container landing">
				    <div className="row">
				    	<div className="six columns " style={{marginTop : "25%"}}>
				        	<h1>Profscribe</h1>
				        	<p>Profscribe is a real time speech to text program that aims to provide a streaming service for educators and students.</p>
				    	
				        	<div className="row">
						 		<a className="six columns button button-primary" href="/signup">Sign Up</a>
						   		<a className="six columns button button-primary" href="/login">Login</a>
						 	</div>
				    	</div>
				 	</div>
				 	
				 
				</div>
			)
 	}

}

