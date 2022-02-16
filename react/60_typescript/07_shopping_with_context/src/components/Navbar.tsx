import React from 'react';
import {Link} from 'react-router-dom';
import useAction from '../hooks/useaction';
import useAppState from '../hooks/useappstate';

const Navbar:React.FC<{}> = () => {

	const {logout} = useAction();
	const {isLogged,token,error,loading} = useAppState();
	
	let navStyle:React.CSSProperties = {
		backgroundColor:"lightgreen",
		height:120
	}
	let header = <h3>Shopping App</h3>
	if(loading) {
		header = <h3>Shopping App ...loading</h3>
	}
	if(error) {
		header = <h3>{error}</h3>
	}
	if(isLogged) {
		return (
			<div style={navStyle}>
				{header}
				<ul style={{listStyleType:"none"}}>
					<li><Link to="/">Shopping List</Link></li>
					<li><Link to="/form">Add to List</Link></li>
					<li><Link to="/" onClick={() => {
						logout(token)
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