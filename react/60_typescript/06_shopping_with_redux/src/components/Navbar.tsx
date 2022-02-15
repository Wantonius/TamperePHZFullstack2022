import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {logout} from '../actions/loginActions';

interface State {
	isLogged:boolean;
	error:string;
	loading:boolean;
	token:string;
}

const Navbar:React.FC<{}> = () => {
	
	const tempState = (state:State) => state

	const state = useSelector(tempState);
	
	const dispatch:ThunkDispatch<any,any,AnyAction> = useDispatch();
	
	let navStyle:React.CSSProperties = {
		backgroundColor:"lightgreen",
		height:120
	}
	let header = <h3>Shopping App</h3>
	if(state.loading) {
		header = <h3>Shopping App ...loading</h3>
	}
	if(state.error) {
		header = <h3>{state.error}</h3>
	}
	if(state.isLogged) {
		return (
			<div style={navStyle}>
				{header}
				<ul style={{listStyleType:"none"}}>
					<li><Link to="/">Shopping List</Link></li>
					<li><Link to="/form">Add to List</Link></li>
					<li><Link to="/" onClick={() => {
						dispatch(logout(state.token))
					}}>Logout</Link></li>
				</ul>
			</div>
		)
	} else {
		return(
			<div style={navStyle}>
				{header}
			</div>
		)
	}
	
}
export default Navbar;