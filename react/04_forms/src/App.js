import logo from './logo.svg';
import './App.css';
import React from 'react';
import NameForm from './NameForm';


class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			greeting:""
		}
	}
	
	setGreeting = (name) => {
		this.setState({
			greeting:"Hello "+name
		})
	}
	render() {
		return (
			<div className="App">
				<NameForm setGreeting={this.setGreeting}/>
				<h2>{this.state.greeting}</h2>
			</div>
		);
	}
}

export default App;
