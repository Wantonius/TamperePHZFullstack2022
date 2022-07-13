import {useContext,useState,useEffect} from 'react';
import ActionContext from '../context/ActionContext';
import useAppState from './useAppState';
import * as ActionConstants from '../types/actionConstants';

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
			if(state.action === "changemode") {
				action.dispatch({
					type:ActionConstants.CHANGE_MODE,
					mode:state.request.mode,
					editable:state.request.editable
				})
				return;
			}
			if(!state.url) {
				return;
			}
			action.dispatch({
				type:ActionConstants.LOADING
			})
			let url = "http://to-native-shopping.herokuapp.com"+state.url
			const response = await fetch(url,state.request);
			action.dispatch({
				type:ActionConstants.STOP_LOADING
			})
			if(response.ok) {
				switch(state.action) {
					case "register":
						action.dispatch({
							type:ActionConstants.REGISTER_SUCCESS
						})
						return;
					case "login":
						const data = await response.json();
						if(!data) {
							action.dispatch({
								type:ActionConstants.LOGIN_FAILED,
								error:"Failed to parse login information"
							})
							return;
						}
						action.dispatch({
							type:ActionConstants.LOGIN_SUCCESS,
							token:data.token
						})
						return;
					case "getlist":
						const list = await response.json();
						if(!list) {
							action.dispatch({
								type:ActionConstants.FETCH_LIST_FAILED,
								error:"Failed to parse shopping information"
							})
							return;
						}
						action.dispatch({
							type:ActionConstants.FETCH_LIST_SUCCESS,
							list:list
						})
						return;
					case "additem":
						action.dispatch({
							type:ActionConstants.ADD_ITEM_SUCCESS
						})
						getList(token);
						return;
					case "removeitem":
						action.dispatch({
							type:ActionConstants.REMOVE_ITEM_SUCCESS
						})
						getList(token);
						return;
					case "edititem":
						action.dispatch({
							type:ActionConstants.EDIT_ITEM_SUCCESS
						})
						getList(token);
						return;
					default:
						return;
				}
			} else {
				let message = "";
				switch(state.action) {
					case "register":
						message = "Server responded with a status:"+response.status
						if(response.status === 409) {
							message = "Username already in use"
						}
						action.dispatch({
							type:ActionConstants.REGISTER_FAILED,
							error:message
						})
						return;
					case "login":
							action.dispatch({
							type:ActionConstants.LOGIN_FAILED,
							error:"Server responded with a status:"+response.status
						})
						return;
					case "getlist":
						message = "Server responded with a status:"+response.status;
						if(response.status === 403) {
							action.dispatch({
								type:ActionConstants.LOGOUT
							})
							message = "Session has expired. Logging you out!"
						}
						action.dispatch({
							type:ActionConstants.FETCH_LIST_FAILED,
							error:message
						})
						return;
					case "additem":
						message = "Server responded with a status:"+response.status;
						if(response.status === 403) {
							action.dispatch({
								type:ActionConstants.LOGOUT
							})
							message = "Session has expired. Logging you out!"
						}
						action.dispatch({
							type:ActionConstants.ADD_ITEM_FAILED,
							error:message
						})
						return;
					case "removeitem":
						message = "Server responded with a status:"+response.status;
						if(response.status === 403) {
							action.dispatch({
								type:ActionConstants.LOGOUT
							})
							message = "Session has expired. Logging you out!"
						}
						action.dispatch({
							type:ActionConstants.REMOVE_ITEM_FAILED,
							error:message
						})
						return;
					case "edititem":
						message = "Server responded with a status:"+response.status;
						if(response.status === 403) {
							action.dispatch({
								type:ActionConstants.LOGOUT
							})
							message = "Session has expired. Logging you out!"
						}
						action.dispatch({
							type:ActionConstants.EDIT_ITEM_FAILED,
							error:message
						})
						return;
					default:
						return;
				}
			}
		}
		
		fetchData();
	},[state])
	
	//Service functions

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
	
	const getList = (token) => {
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

	const addItem = (token,item) => {
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
	
	const remove = (token,id) => {
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

	const edit = (token,item) => {
		setState({
			url:"/api/shopping/"+item.id,
			request:{
				method:"PUT",
				mode:"cors",
				headers:{"Content-type":"application/json",
				token:token},
				body:JSON.stringify(item)
			},
			action:"edititem"
		})
	}

	const changeMode = (mode,editable) => {
		setState({
			url:"",
			request:{
				mode:mode,
				editable:editable
			},
			action:"changemode"
		})
	}
	
	return {
		register,
		login,
		getList,
		addItem,
		remove,
		edit,
		changeMode
	};
}

export default useAction;