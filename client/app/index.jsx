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

 
 	}

}

ReactDOM.render(<App/>, document.getElementById('app'));