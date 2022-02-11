import {useContext,useEffect,useState} from 'react';
import ActionContext from '../context/ActionContext';
import * as actionConstants from '../types/actionConstants';
import useAppState from './useAppState';

const useAction = () => {
	
	const action = useContext(ActionContext);
	const [state,setState] = useState({
		url:"",
		request:{},
		action:""
	})
	
	const {token} = useAppState();
	
	useEffect(() => {
		
		const fetchData = async () => {
			if(!state.url) {
				return;
			}
			action.dispatch({
				type:actionConstants.LOADING
			})
			const response = await fetch(state.url,state.request);
			action.dispatch({
				type:actionConstants.STOP_LOADING
			})
			if(!response) {
				action.dispatch({
					type:actionConstants.LOGOUT_FAILED,
					error:"There was an error in connection. Logging you out!"
				})
				return;
			}
			if(response.ok) {
				switch(state.action) {
					case "register":
						action.dispatch({
							type:actionConstants.REGISTER_SUCCESS
						})
						return;
					case "login":
						const data = await response.json();
						if(!data) {
							action.dispatch({
								type:actionConstants.LOGIN_FAILED,
								error:"Error parsing login information"
							})
							return;
						}
						action.dispatch({
							type:actionConstants.LOGIN_SUCCESS,
							token:data.token
						})
						return;
					case "logout":
						action.dispatch({
							type:actionConstants.LOGOUT_SUCCESS
						})
						return;
					case "getlist":
						const list = await response.json();
						if(!list) {
							action.dispatch({
								type:actionConstants.FETCH_LIST_FAILED,
								error:"Error parsing shopping info"
							})
							return;
						}
						action.dispatch({
							type:actionConstants.FETCH_LIST_SUCCESS,
							list:list
						})
						return;
					case "additem":
						action.dispatch({
							type:actionConstants.ADD_ITEM_SUCCESS
						})
						return;
					case "removeitem":
						action.dispatch({
							type:actionConstants.REMOVE_ITEM_SUCCESS
						})
						return;
					case "edititem":
						action.dispatch({
							type:actionConstants.EDIT_ITEM_SUCCESS
						})
						return;
					default:
						return;
				}
			} else {
				
			}
		}
		
	},[state]);
	
	const register = (user) => {
		setState({
			url:"/register",
			request:{
				method:"POST",
				mode:"cors",
				headers:{"Content-type":"application/json"},
				body:JSON.stringify(user)
			},
			action:"register"
		})
	}
	
	const login = (user) => {
		setState({
			url:"/login",
			request:{
				method:"POST",
				mode:"cors",
				headers:{"Content-type":"application/json"},
				body:JSON.stringify(user)
			},
			action:"login"
		})
	}
	
	const logout = () => {
		setState({
			url:"/logout",
			request:{
				method:"POST",
				mode:"cors",
				headers:{"Content-type":"application/json",
				token:token}
			},
			action:"logout"
		})
	}
	
	const getList = () => {
		setState({
			url:"/api/shopping",
			request:{
				method:"GET",
				mode:"cors",
				headers:{"Content-type":"application/json",
				token:token}
			},
			action:"getlist"
		})
	}
	
	const addItem = (item) => {
		setState({
			url:"/api/shopping",
			request:{
				method:"POST",
				mode:"cors",
				headers:{"Content-type":"application/json",
				token:token},
				body:JSON.stringify(item)
			},
			action:"additem"
		})
	}
	
	const removeItem = (id) => {
		setState({
			url:"/api/shopping/"+id,
			request:{
				method:"DELETE",
				mode:"cors",
				headers:{"Content-type":"application/json",
				token:token}
			},
			action:"removeitem"
		})
	}
	
	const editItem = (item) => {
		setState({
			url:"/api/shopping/"+item.id,
			request:{
				method:"PUT",
				mode:"cors",
				headers:{"Content-type":"application/json",
				token:token}
			},
			action:"edititem"
		})
	}
	
	return {
		register,
		login,
		logout,
		getList,
		addItem,
		removeItem,
		editItem
	}
}

export default useAction;