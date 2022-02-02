import logo from './logo.svg';
import './App.css';
import React from 'react';
import {connect} from 'react-redux';
class App extends React.Component {
	
	increment = () => {
		console.log("App - increment");
		this.props.dispatch({
			type:"INCREMENT"
		})
	}
	
	decrement = () => {
		console.log("App - decrement");
		this.props.dispatch({
			type:"DECREMENT"
		})
	}
	
	render() {
		return (
			<div className="App">
				<h2>Counter:{this.props.counter}</h2>
				<button onClick={this.increment}>Increment</button>
				<button onClick={this.decrement}>Decrement</button>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	console.log("App - mapStateToProps",state);
	return {
		counter:state.counter
	}
}

export default connect(mapStateToProps)(App);
