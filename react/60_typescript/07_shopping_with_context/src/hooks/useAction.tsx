import {useContext,useEffect,useState} from 'react';
import ActionContext,{Action} from '../context/ActionContext';
import * as actionConstants from '../types/actionConstants';
import ShoppingItem from '../models/ShoppingItem';
import useAppState from './useappstate';


interface State {
	url:string,
	request:{},
	action:string
}

const useAction = () => {
	
	const dispatch = useContext(ActionContext);
	const [state,setState] = useState<State>({
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
			let action:Action = {
				type:actionConstants.LOADING,
				payload:""
			}
			dispatch.dispatch(action);
			const response = await fetch(state.url,state.request);
			action.type = actionConstants.STOP_LOADING
			dispatch.dispatch(action);
			if(!response) {
				action.type = actionConstants.LOGOUT_FAILED;
				action.payload = "Can't connect to server!";
				dispatch.dispatch(action);
				return;
			}
			if(response.ok) {
				switch(state.action) {
					case "register":
						action.type = actionConstants.REGISTER_SUCCESS;
						dispatch.dispatch(action);
						return;
					case "login":
						const data = await response.json();
						if(!data) {
							action.type = actionConstants.LOGOUT_FAILED;
							action.payload = "Can't connect to server!";
							dispatch.dispatch(action);
							return;
						}
						action.type = actionConstants.LOGIN_SUCCESS;
						action.payload = data.token;
						dispatch.dispatch(action);
						return;
					case "logout":
						action.type = actionConstants.LOGOUT_SUCCESS;
						dispatch.dispatch(action);
						return;
					case "getlist":
						const list = await response.json();
						if(!list) {
							action.type = actionConstants.FETCH_LIST_FAILED;
							action.payload = "Can't parse shopping information";
							dispatch.dispatch(action);
							return;
						}
						action.type = actionConstants.FETCH_LIST_SUCCESS;
						action.payload = list;
						dispatch.dispatch(action);						
						return;
					case "additem":
						action.type = actionConstants.ADD_ITEM_SUCCESS;
						dispatch.dispatch(action);
						getList(token);
						return;
					case "removeitem":
						action.type = actionConstants.REMOVE_ITEM_SUCCESS;
						dispatch.dispatch(action);
						getList(token);
						return;						
					case "edititem":
						action.type = actionConstants.EDIT_ITEM_SUCCESS;
						dispatch.dispatch(action);
						getList(token);
						return;
					default:
						return;
				}
			} else {
				switch(state.action) {
					case "register":
						if(response.status === 409) {
							action.type = actionConstants.REGISTER_FAILED;
							action.payload = "Username already in use!"
							dispatch.dispatch(action);	
							return;
						}
						action.type = actionConstants.REGISTER_FAILED;
						action.payload = "Server responded with a status:"+response.statusText
						dispatch.dispatch(action);	
						return;
					case "login":
						action.type = actionConstants.LOGIN_FAILED;
						action.payload = "Server responded with a status:"+response.statusText
						dispatch.dispatch(action);	
						return;
					case "logout":
						action.type = actionConstants.LOGOUT_FAILED;
						action.payload = "Server responded with a status:"+response.statusText+". Logging you out!"
						dispatch.dispatch(action);	
						return;
					case "getlist":
						if(response.status === 403) {
							action.type = actionConstants.LOGOUT_SUCCESS;
							dispatch.dispatch(action);
							action.type = actionConstants.FETCH_LIST_FAILED;
							action.payload = "Session has expired. Login again!";
							dispatch.dispatch(action);
							return;
						}
						action.type = actionConstants.FETCH_LIST_FAILED;
						action.payload = "Server responded with a status:"+response.statusText
						dispatch.dispatch(action);
						return;
					case "additem":
						if(response.status === 403) {
							action.type = actionConstants.LOGOUT_SUCCESS;
							dispatch.dispatch(action);
							action.type = actionConstants.ADD_ITEM_FAILED;
							action.payload = "Session has expired. Login again!";
							dispatch.dispatch(action);
							return;
						}
						action.type = actionConstants.ADD_ITEM_FAILED;
						action.payload = "Server responded with a status:"+response.statusText
						dispatch.dispatch(action);
						return;
					case "removeitem":
						if(response.status === 403) {
							action.type = actionConstants.LOGOUT_SUCCESS;
							dispatch.dispatch(action);
							action.type = actionConstants.REMOVE_ITEM_FAILED;
							action.payload = "Session has expired. Login again!";
							dispatch.dispatch(action);
							return;
						}
						action.type = actionConstants.REMOVE_ITEM_FAILED;
						action.payload = "Server responded with a status:"+response.statusText
						dispatch.dispatch(action);						
						return;
					case "edititem":
						if(response.status === 403) {
							action.type = actionConstants.LOGOUT_SUCCESS;
							dispatch.dispatch(action);
							action.type = actionConstants.EDIT_ITEM_FAILED;
							action.payload = "Session has expired. Login again!";
							dispatch.dispatch(action);
							return;
						}
						action.type = actionConstants.EDIT_ITEM_FAILED;
						action.payload = "Server responded with a status:"+response.statusText
						dispatch.dispatch(action);	
						return;
					default:
						return;
				}				
			}
		}
		
		fetchData();
	},[state])
	
	const register = (username:string,password:string) => {
		setState({
			url:"/register",
			request:{
				method:"POST",
				mode:"cors",
				headers:{"Content-type":"application/json"},
				body:JSON.stringify({
					username:username,
					password:password
				})
			},
			action:"register"
		}) 	
	}

	const login = (username:string,password:string) => {
		setState({
			url:"/login",
			request:{
				method:"POST",
				mode:"cors",
				headers:{"Content-type":"application/json"},
				body:JSON.stringify({
					username:username,
					password:password
				})
			},
			action:"login"
		}) 
	}

	const logout = (token:string) => {
		setState({
			url:"/logout",
			request:{
				method:"POST",
				mode:"cors",
				headers:{"Content-type":"application/json",
				token:token},
			},
			action:"logout"
		}) 
	}

	const getList = (token:string) => {
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
	
	const addItem = (token:string,item:ShoppingItem) => {
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

	const removeItem = (token:string,id:number|string) => {
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

	const edit = (token:string,item:ShoppingItem) => {
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

	return {
		register,
		login,
		logout,
		getList,
		addItem,
		removeItem,
		edit
	}
}

export default useAction;