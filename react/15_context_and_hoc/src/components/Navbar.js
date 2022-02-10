import React from 'react';
import StateManager from '../statemanager/StateManager';
import {Link} from 'react-router-dom';
import {Header,List} from 'semantic-ui-react';

class Navbar extends React.Component {
	render() {
		let navStyle={
			height:150,
			backgroundColor:"lightgreen"
		}
		if(this.props.isLogged) {
			return(
				<div style={navStyle}>
					<Header>Your Contacts</Header>
					<List>
						<List.Item><Link to="/">Contacts</Link></List.Item>
						<List.Item><Link to="/form">Add new contact</Link></List.Item>
						<List.Item><Link to="/" onClick={() => this.props.logout()}>Logout</Link></List.Item>
					</List>
				</div>
			)
		} else {
			return (
				<div style={navStyle}>
					<Header>Your Contacts</Header>				
				</div>
			)
		}
		
	}
}

export default StateManager(Navbar);