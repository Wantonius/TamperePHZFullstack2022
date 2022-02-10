import React from 'react';
import {Form,Button} from 'semantic-ui-react';
import StateManager from '../statemanager/StateManager';

class ContactForm extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			firstname:"",
			lastname:"",
			email:"",
			phone:""
		}
	};
	
	onChange = (event) => {
		this.setState({
			...state,
			[event.target.name]:event.target.value
		})
	}
	
	onSubmit = (event) => {
		event.preventDefault();
		let contact = {
			...this.state
		}
		this.props.addToList(contact);
		this.setState({
			firstname:"",
			lastname:"",
			email:"",
			phone:""
		})
	}
	render() {
	return(
		<Form onSubmit={onSubmit}>
			<Form.Field>
				<label htmlFor="firstname">First name:</label>
				<input type="text"
						name="firstname"
						onChange={onChange}
						value={state.firstname}/>
			</Form.Field>
			<Form.Field>
				<label htmlFor="lastname">Last name:</label>
				<input type="text"
						name="lastname"
						onChange={onChange}
						value={state.lastname}/>
			</Form.Field>
			<Form.Field>
				<label htmlFor="email">Email:</label>
				<input type="email"
						name="email"
						onChange={onChange}
						value={state.email}/>
			</Form.Field>
			<Form.Field>
				<label htmlFor="phone">Phone:</label>
				<input type="tel"
						name="phone"
						onChange={onChange}
						value={state.phone}/>
			</Form.Field>
			<Button type="submit">Add</Button>
		</Form>
	)
}
}
export default StateManager(ContactForm);