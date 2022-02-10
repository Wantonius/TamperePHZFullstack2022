import {useState} from 'react';
import {Form,Button} from 'semantic-ui-react';

const ContactForm = (props) => {
	
	const [state,setState] = useState({
		firstname:"",
		lastname:"",
		email:"",
		phone:""
	})
	
	const onChange = (event) => {
		setState({
			...state,
			[event.target.name]:event.target.value
		})
	}
	
	const onSubmit = (event) => {
		event.preventDefault();
		let contact = {
			...state
		}
		props.addToList(contact);
		setState({
			firstname:"",
			lastname:"",
			email:"",
			phone:""
		})
	}

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

export default ContactForm;