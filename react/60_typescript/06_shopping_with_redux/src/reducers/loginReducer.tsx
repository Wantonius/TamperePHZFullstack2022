import * as actionConstants from '../types/actionConstants';
import {LoginState} from '../types/states';
import {AnyAction} from 'redux';

const getInitialState = ():LoginState => {
	let state = sessionStorage.getItem("loginstate");
	if(state) {
		return JSON.parse(state);
	} else {
		return {
			loading:false,
			isLogged:false,
			token:"",
			error:""
		}
	}
}

const saveToStorage = (state:LoginState):void => {
	sessionStorage.setItem("loginstate",JSON.stringify(state));
}

const initialState:LoginState = getInitialState();

const loginReducer = (state:LoginState = initialState, action:AnyAction) => {
	console.log("loginReducer:",action);
	let tempState:LoginState = {
		isLogged:false,
		loading:false,
		token:"",
		error:""
	}
	switch(action.type) {
		case actionConstants.LOADING:
			return {
				...state,
				loading:true,
				error:""
			}
		case actionConstants.STOP_LOADING:
			return {
				...state,
				loading:false,
				error:""
			}
		case actionConstants.REGISTER_SUCCESS:
			tempState = {
				...state,
				loading:false,
				error:"Register success!"
			}
			saveToStorage(tempState);
			return tempState;
		case actionConstants.REGISTER_FAILED:
			tempState = {
				...state,
				loading:false,
				error:action.error
			}
			saveToStorage(tempState);
			return tempState;
		case actionConstants.LOGIN_SUCCESS:
			tempState = {
				isLogged:true,
				token:action.token,
				loading:false,
				error:""
			}
			saveToStorage(tempState);
			return tempState;
		case actionConstants.LOGIN_FAILED:
			tempState = {
				...state,
				loading:false,
				error:action.error
			}
			saveToStorage(tempState);
			return tempState;
		case actionConstants.LOGOUT_SUCCESS:
			tempState = {
				loading:false,
				isLogged:false,
				token:"",
				error:""
			}
			saveToStorage(tempState);
			return tempState;
		case actionConstants.LOGOUT_FAILED:
			tempState = {
				loading:false,
				isLogged:false,
				token:"",
				error:action.error
			}
			saveToStorage(tempState);
			return tempState;
		case actionConstants.CLEAR_LOGIN_STATE:
			tempState = {
				loading:false,
				isLogged:false,
				token:"",
				error:""
			}
			saveToStorage(tempState);
			return tempState;
		default:
			return state;
	}
}

export default loginReducer;