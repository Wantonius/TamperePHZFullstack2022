import {useReducer} from 'react';
import AppStateContext from './AppStateContext';
import ActionContext from './ActionContext';
import * as actionConstants from '../types/actionConstants';


const getInitialState = () => {
	if(sessionStorage.getItem("state")) {
		let state = JSON.parse(sessionStorage.getItem("state"));
		return state;
	} else {
		return {
			list:[],
			token:"",
			error:"",
			loading:false,
			isLogged:false
		}
	}
}

const saveToStorage = (state) => {
	sessionStorage.setItem("state",JSON.stringify(state));
}

const initialState = getInitialState();

const listReducer = (state,action) => {
	let tempState = {};
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
				error:"Register success!"
			}
			saveToStorage(tempState);
			return tempState;
		case actionConstants.REGISTER_FAILED:
			tempState = {
				...state,
				error:action.error
			}
			saveToStorage(tempState);
			return tempState;
		case actionConstants.LOGIN_SUCCESS:
			tempState = {
				...state,
				token:action.token,
				isLogged:true,
				error:""
			}
			saveToStorage(tempState);
			return tempState;
		case actionConstants.LOGIN_FAILED:
			tempState = {
				...state,
				error:action.error
			}
			saveToStorage(tempState);
			return tempState;
		case actionConstants.LOGOUT_SUCCESS:
			tempState = {
				list:[],
				token:"",
				error:"",
				isLogged:false,
				loading:false
			}
			saveToStorage(tempState);
			return tempState;
		case actionConstants.LOGOUT_FAILED:
			tempState = {
				list:[],
				token:"",
				error:action.error,
				isLogged:false,
				loading:false
			}
			saveToStorage(tempState);
			return tempState;
		case actionConstants.FETCH_LIST_SUCCESS:
			tempState = {
				...state,
				list:action.list,
				error:""
			}
			saveToStorage(tempState);
			return tempState;
		case actionConstants.FETCH_LIST_FAILED:
			tempState = {
				...state,
				error:action.error
			}
			saveToStorage(tempState);
			return tempState;
		case actionConstants.ADD_ITEM_SUCCESS:
			tempState = {
				...state,
				error:""
			}
			saveToStorage(tempState);
			return tempState;
		case actionConstants.ADD_ITEM_FAILED:
			tempState = {
				...state,
				error:action.error
			}
			saveToStorage(tempState);
			return tempState;
		case actionConstants.REMOVE_ITEM_SUCCESS:
			tempState = {
				...state,
				error:""
			}
			saveToStorage(tempState);
			return tempState;
		case actionConstants.REMOVE_ITEM_FAILED:
			tempState = {
				...state,
				error:action.error
			}
			saveToStorage(tempState);
			return tempState;
		case actionConstants.EDIT_ITEM_SUCCESS:
			tempState = {
				...state,
				error:""
			}
			saveToStorage(tempState);
			return tempState;
		case actionConstants.EDIT_ITEM_FAILED:
			tempState = {
				...state,
				error:action.error
			}
			saveToStorage(tempState);
			return tempState;
		default:
			return state;
	}
}

const StateProvider = (props) => {
	
	const [state,dispatch] = useReducer(listReducer,initialState);
	
	return(
		<AppStateContext.Provider value={state}>
			<ActionContext.Provider value={{dispatch:dispatch}}>
				{props.children}
			</ActionContext.Provider>
		</AppStateContext.Provider>
	)
}

export default StateProvider;