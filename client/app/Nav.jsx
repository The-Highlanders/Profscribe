import React from 'react';

export default class Nav extends React.Component {

	render () {
		return (	
			  <nav>
			  	<div className="container">
			  		<div className="nav-wrapper">
			      		<a href="#" className="brand-logo">
			      			Profscribe
			      		</a>
			      		<ul id="nav-mobile" className="right hide-on-med-and-down">
			        		<li><a href="Login">Login</a></li>
			        		<li><a href="Signup">Signup</a></li>
			      		</ul>
			    	</div>
			  	</div>
			  </nav>
			)
 	}
}

