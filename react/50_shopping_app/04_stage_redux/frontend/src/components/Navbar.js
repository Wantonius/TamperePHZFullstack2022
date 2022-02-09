import {Link} from 'react-router-dom';
import {List,Header} from 'semantic-ui-react';
import {useSelector,useDispatch} from 'react-redux';
import {logout} from '../actions/loginActions';

const Navbar = (props) => {

	const state = useSelector(state => state)
	const dispatch = useDispatch();
	
	let header = <Header>Shopping App</Header>
	if(state.loading) {
		header = <Header>Loading ...</Header>
	}
	if(state.error) {
		header = <Header>{state.error}</Header>
	}
	let navStyle = {
		height:120,
		backgroundColor:"lightblue"
	}
	if(state.isLogged) {
		return(
			<div style={navStyle}>
				{header}
				<List>
					<List.Item><Link to="/">Shopping List</Link></List.Item>
					<List.Item><Link to="/form">Add new item</Link></List.Item>
					<List.Item><Link to="/" onClick={() => dispatch(logout(state.token))}>Logout</Link></List.Item>
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