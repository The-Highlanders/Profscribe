import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {

	render () {
		return (
				<div>
					<h1>Hello from react</h1>
				</div>
			)
 	}

 	componentDidMount(){
 		var socket = io();
 	}

}

ReactDOM.render(<App/>, document.getElementById('app'));