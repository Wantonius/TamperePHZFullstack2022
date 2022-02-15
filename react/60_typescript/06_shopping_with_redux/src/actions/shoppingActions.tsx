import ShoppingItem from '../models/ShoppingItem';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import * as actionConstants from '../types/actionConstants';

export const getList = (token:string) => {
	return (dispatch:ThunkDispatch<any,any,AnyAction>) => {
		const request = new Request("/api/shopping",{
			method:"GET",
			mode:"cors",
			headers:{
				"Content-type":"application/json",
				"token":token
			}
		}
		handleFetch(request,"getlist",dispatch,"");
	}
}

export const addItem = (token:string,item:ShoppingItem) => {
	return (dispatch:ThunkDispatch<any,any,AnyAction>) => {
		const request = new Request("/api/shopping",{
			method:"POST",
			mode:"cors",
			headers:{
				"Content-type":"application/json",
				"token":token
			},
			body:JSON.stringify(item)
		}
		handleFetch(request,"additem",dispatch,token);
	}
}

export const removeItem = (token:string,id:number|string) => {
	return (dispatch:ThunkDispatch<any,any,AnyAction>) => {
		const request = new Request("/api/shopping/"+id,{
			method:"DELETE",
			mode:"cors",
			headers:{
				"Content-type":"application/json",
				"token":token
			}
		}
		handleFetch(request,"removeitem",dispatch,token);
	}
}

export const edit = (token:string,item:ShoppingItem) => {
	return (dispatch:ThunkDispatch<any,any,AnyAction>) => {
		const request = new Request("/api/shopping/"+item.id,{
			method:"PUT",
			mode:"cors",
			headers:{
				"Content-type":"application/json",
				"token":token
			},
			body:JSON.stringify(item)
		}
		handleFetch(request,"edititem",dispatch,token);
	}
}

const handleFetch = async (req:Request,act:string,dispatch:ThunkDispatch<any,any,AnyAction>,token:string) => {
	let loadingAction:AnyAction = {
		type:actionConstants.LOADING
	}
	dispatch(loadingAction);
	const response = await fetch(request);
	loadingAction.type = actionConstants.STOP_LOADING;
	dispatch(loadingAction);
	if(!response) {
		console.log("Failed to connect to server");
		return;
	}
	if(response.ok) {
		if(act === "getlist") {
			let data = await response.json();
			if(!data) {
				console.log("Failed to parse shopping JSON");
				return;
			}
			let list = data as ShoppingItem[];
			let action:AnyAction = {
				type:actionConstants.FETCH_LIST_SUCCESS,
				list:list
			}
			dispatch(action);
		}
		if(act === "additem") {
			let action:AnyAction = {
				type:actionConstants.ADD_ITEM_SUCCESS
			}
			dispatch(action);
			dispatch(getList(token));
		}
		if(act === "removeitem") {
			let action:AnyAction = {
				type:actionConstants.REMOVE_ITEM_SUCCESS
			}
			dispatch(action);
			dispatch(getList(token));
		}
		if(act === "edititem") {
			let action:AnyAction = {
				type:actionConstants.EDIT_ITEM_SUCCESS
			}
			dispatch(action);
			dispatch(getList(token));
		}
	} else {
		if(response.status === 403) {
			let action = {
				type:actionConstants.LOGOUT_FAILED,
				error:"Session expired. Logging you out"
			}
			let action2 = {
				type:actionConstants.CLEAR_SHOPPING_STATE
			}
			dispatch(action);
			dispatch(action2);
		} else {
			if(act === "getlist") {
				let action:AnyAction = {
					type:actionConstants.FETCH_LIST_FAILED,
					error:"Server responded with a status:"+response.statusText
				}
				dispatch(action);
			}
		if(act === "additem") {
				let action:AnyAction = {
					type:actionConstants.ADD_ITEM_FAILED,
					error:"Server responded with a status:"+response.statusText
				}
				dispatch(action);
		}
		if(act === "removeitem") {
				let action:AnyAction = {
					type:actionConstants.REMOVE_ITEM_FAILED,
					error:"Server responded with a status:"+response.statusText
				}
				dispatch(action);
		}
		if(act === "edititem") {
				let action:AnyAction = {
					type:actionConstants.EDIT_ITEM_FAILED,
					error:"Server responded with a status:"+response.statusText
				}
				dispatch(action);
		}			
		}
	}
}