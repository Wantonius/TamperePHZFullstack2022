import {useState} from 'react';
import {Form,Button} from 'semantic-ui-react';
import {useDispatch} from 'react-redux';
import {register,login} from '../actions/loginActions';

const LoginPage = (props) => {
	
	const dispatch = useDispatch();

	const [state,setState] = useState({
		username:"",
		password:""
	})
	
	const onChange = (event) => {
		setState({
			...state,
			[event.target.name]:event.target.value
		})
	}
	
	const onSubmit = (event) => {
		if(state.username.length < 4 || state.password.length < 8) {
			props.setError("Username must be atleast 4 characters and password 8 characters long");
			return;
		}
		let user = {
			...state
		}
		if(event.target.name === "register") {
			dispatch(register(user));
		} else {
			dispatch(login(user));
		}
	}
	
	return(
		<div style={{
			width:500,
			margin:"auto",
			backgroundColor:"lightgreen"
		}}>
			<Form>
				<Form.Field>
					<label htmlFor="username">Username</label>
					<input type="text"
							name="username"
							onChange={onChange}
							value={state.username}/>
				</Form.Field>
				<Form.Field>
					<label htmlFor="password">Password</label>
					<input type="password"
							name="password"
							onChange={onChange}
							value={state.password}/>
				</Form.Field>
				<Button onClick={onSubmit} name="register">Register</Button>
				<Button onClick={onSubmit} name="login">Login</Button>
			</Form>
		</div>
	)
}

export default LoginPage;