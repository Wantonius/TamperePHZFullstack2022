import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import StateManager from './statemanager/StateManager';
import {Route,Routes,Navigate} from 'react-router-dom';

class App extends React.Component {
	render() {
		if(this.props.isLogged) {
			return (
				<div className="App">
					<Navbar/>
					<hr/>
					<Routes>
						<Route exact path="/" element={<ContactList/>}/>
						<Route path="/form" element={<ContactForm/>}/>
						<Route path="*" element={<Navigate to="/"/>}/>
					</Routes>
				</div>
			);
		} else {
			return (
				<div className="App">
					<Navbar/>
					<hr/>
					<Routes>
						<Route exact path="/" element={<LoginPage/>}/>
						<Route path="*" element={<Navigate to="/"/>}/>
					</Routes>
				</div>			
			)
		}
}
}
export default StateManager(App);
