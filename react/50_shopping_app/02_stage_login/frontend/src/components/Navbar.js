import {Link} from 'react-router-dom';
import {List,Header} from 'semantic-ui-react';

const Navbar = (props) => {

	let header = <Header>Shopping App</Header>
	if(props.loading) {
		header = <Header>Loading ...</Header>
	}
	if(props.error) {
		header = <Header>{props.error}</Header>
	}
	let navStyle = {
		height:120,
		backgroundColor:"lightblue"
	}
	if(props.isLogged) {
		return(
			<div style={navStyle}>
				{header}
				<List>
					<List.Item><Link to="/">Shopping List</Link></List.Item>
					<List.Item><Link to="/form">Add new item</Link></List.Item>
					<List.Item><Link to="/" onClick={props.logout}>Logout</Link></List.Item>
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