import React from 'react';
import StateContext from './StateContext';

export default class StateProvider extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			list:[],
			id:100,
			isLogged:false
		}
	}
	
	login = () => {
		this.setState({
			isLogged:true
		})
	}
	
	logout = () => {
		this.setState({
			isLogged:false
		})
	}
	
	addToList = (contact) => {
		contact.id = this.state.id;
		this.setState((state) => {
			return {
				list:state.list.concat(contact),
				id:state.id+1
			}
		})
	}
	
	removeFromList = (id) => {
		this.setState((state) => {
			let tempList = state.list.filter(contact => contact.id !== id)
			return {
				list:tempList
			}
		})
	}
	render() {
		return(
			<StateContext.Provider value={{
				list:this.state.list,
				isLogged:this.state.isLogged,
				login:this.login,
				logout:this.logout,
				addToList:this.addToList,
				removeFromList:this.removeFromList
			}}>
			{this.props.children}
			</StateContext.Provider>
		)
	}
}
