import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import {Routes,Route,Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

interface State {
	isLogged:boolean
}

function App() {
	
	const tempState = (state:State) => state.isLogged
	
	const isLogged = useSelector(tempState);
	
	if(isLogged) {
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
