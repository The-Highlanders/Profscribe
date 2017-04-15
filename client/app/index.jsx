import React from 'react';
import ReactDOM from 'react-dom';

import Landing from "./Landing.jsx"

class App extends React.Component {

	render () {
		return (
				<div>
					<Landing />
				</div>
			)
 	}

 	componentDidMount(){

 
 	}

}

ReactDOM.render(<App/>, document.getElementById('app'));