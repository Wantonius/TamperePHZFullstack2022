import React,{useState} from 'react';
import useAction from '../hooks/useaction';

interface State {
	username:string,
	password:string
}

const LoginPage:React.FC<{}> = () => {
	
	const [state,setState] = useState<State>({
		username:"",
		password:""
	})
	
	const {register,login} = useAction();
	
	const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
		setState((state) => {
			return {
				...state,
				[e.target.name]:e.target.value
			}
		})
	}
	
	const onRegister = (e:React.SyntheticEvent) => {
		console.log("moi!");
		e.preventDefault();
		register(state.username,state.password);
	}

	const onLogin = (e:React.SyntheticEvent) => {
		e.preventDefault();
		login(state.username,state.password);
	}	
	return (
		<form>
			<label htmlFor="username">Username</label>
			<input type="text"
					name="username"
					id="username"
					onChange={onChange}
					value={state.username}/>
			<br/>
			<label htmlFor="password">Password</label>
			<input type="password"
					name="password"
					id="password"
					onChange={onChange}
					value={state.password}/>
			<br/>
			<button onClick={onRegister}>Register</button>
			<button onClick={onLogin}>Login</button>
		</form>
	)
}

export default LoginPage;