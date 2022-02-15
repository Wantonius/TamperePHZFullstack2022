import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import {Routes,Route,Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

interface State {
	login:{
		isLogged:boolean,
		token:string
	}
}

function App() {
	
	const tempState = (state:State) => state
	
	const state = useSelector(tempState);
	
	if(state.login.isLogged) {
		return(
			<div className="App">
				<Navbar/>
				<hr/>
				<Routes>
				</Routes>
			</div>
		)
	} else {
		return (
			<div className="App">
				<Navbar/>
				<hr/>
				<Routes>
					<Route path="/" element={<LoginPage/>}/>
					<Route path="*" element={<Navigate to="/"/>}/>
				</Routes>
			</div>
		);
	}
}

export default App;
