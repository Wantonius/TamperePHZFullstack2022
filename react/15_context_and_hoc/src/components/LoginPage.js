import React from 'react';
import StateManager from '../statemanager/StateManager';
import {Form,Button} from 'semantic-ui-react';

class LoginPage extends React.Component {

	constructor(props) {
		super(props);
		this.state= {
			username:"",
			password:""
		}
	}
	
	onChange = (event) => {
		this.setState({
			[event.target.name]:event.target.value
		})
	}
	
	onSubmit = (event) => {
		event.preventDefault();
		if(event.target.name === "login") {
			this.props.login();
		}
	}
	
	render() {
		return(
			<Form>
				<Form.Field>
					<label htmlFor="username">Username</label>
					<input type="text"
							name="username"
							id="username"
							onChange={this.onChange}
							value={this.state.username}/>
				</Form.Field>	
				<Form.Field>
					<label htmlFor="password">Password</label>
					<input type="password"
							name="password"
							id="password"
							onChange={this.onChange}
							value={this.state.password}/>
				</Form.Field>
				<Button onClick={this.onSubmit} name="register">Register</Button>
				<Button onClick={this.onSubmit} name="login">Login</Button>
			</Form>
		)
	}
}

export default StateManager(LoginPage);