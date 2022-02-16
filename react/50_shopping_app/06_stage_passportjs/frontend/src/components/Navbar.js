import {Link} from 'react-router-dom';
import {List,Header} from 'semantic-ui-react';
import useAction from '../hooks/useaction';
import useAppState from '../hooks/useappstate';

const Navbar = (props) => {

	const {loading,isLogged,error} = useAppState();
	const {logout} = useAction();

	let header = <Header>Shopping App</Header>
	if(loading) {
		header = <Header>Loading ...</Header>
	}
	if(error) {
		header = <Header>{error}</Header>
	}
	let navStyle = {
		height:120,
		backgroundColor:"lightblue"
	}
	if(isLogged) {
		return(
			<div style={navStyle}>
				{header}
				<List>
					<List.Item><Link to="/">Shopping List</Link></List.Item>
					<List.Item><Link to="/form">Add new item</Link></List.Item>
					<List.Item><Link to="/" onClick={logout}>Logout</Link></List.Item>
				</List>
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