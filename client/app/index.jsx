import React from 'react';
import ReactDOM from 'react-dom';


import Nav from  "./Nav.jsx"

class App extends React.Component {

	render () {
		return (
				<div>
					<Nav/>
				</div>
			)
 	}

 	componentDidMount(){
 		// this would go in our user o
 		var socket = io();
 	}

}

ReactDOM.render(<App/>, document.getElementById('app'));