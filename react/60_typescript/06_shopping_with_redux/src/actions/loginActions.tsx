import * as actionConstants from '../types/actionConstants';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';

interface Token {
	token:string
}

export const register = (username:string,password:string) => {
	return (dispatch:ThunkDispatch<any,any,AnyAction>) => {
		const request:Request = new Request("/register",{
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json"},
			body:JSON.stringify({
				username:username,
				password:password
			})
		})
		handleLogin(request,"register",dispatch);
	}
}

export const login = (username:string,password:string) => {
	return (dispatch:ThunkDispatch<any,any,AnyAction>) => {
		const request:Request = new Request("/login",{
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json"},
			body:JSON.stringify({
				username:username,
				password:password
			})
		})
		handleLogin(request,"login",dispatch);
	}
}

export const logout = (token:string) => {
	return (dispatch:ThunkDispatch<any,any,AnyAction>) => {
		const request:Request = new Request("/logout",{
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json",
			token:token}
		})	
		handleLogin(request,"logout",dispatch);
	}
}

const handleLogin = async (request:Request,act:string,dispatch:ThunkDispatch<any,any,AnyAction>) => {
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
		if(act === "register") {
			let action:AnyAction = {
				type:actionConstants.REGISTER_SUCCESS
			}
			dispatch(action);
		}
		if(act === "login") {
			const temp = await response.json();
			if(!temp) {
				console.log("Failed to parse login JSON");
				return;
			}
			let data = temp as Token;
			let action:AnyAction = {
				type:actionConstants.LOGIN_SUCCESS,
				token:data.token
			}
			dispatch(action);
		}
		if(act === "logout") {
			let action:AnyAction = {
				type:actionConstants.LOGOUT_SUCCESS
			}
			dispatch(action);
		}
	} else {
		if(act === "register") {
			let action:AnyAction = {
				type:actionConstants.REGISTER_FAILED,
				error:""
			}
			if(response.status === 409) {
				action.error = "Username is already in use!";
				dispatch(action);
				return;
			}
			action.error = "Server responded with a status:"+response.statusText;
			dispatch(action);
		}
		if(act === "login") {
			let action:AnyAction = {
				type:actionConstants.LOGIN_FAILED,
				error:"Server responded with a status:"+response.statusText
			}
			dispatch(action);
		}
		if(act === "logout") {
			let action:AnyAction = {
				type:actionConstants.LOGOUT_FAILED,
				error:"Server responded with a status:"+response.statusText+". Logging you out!"
			}
			dispatch(action);
		}		
	}
}