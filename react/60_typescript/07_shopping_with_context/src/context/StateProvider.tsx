import React,{useReducer} from 'react';
import ActionContext,{Action} from './ActionContext';
import AppStateContext,{AppState} from './AppStateContext';
import ShoppingItem from '../models/ShoppingItem';
import * as actionConstants from '../types/actionConstants';

const getInitialState = ():AppState => {
	let state = sessionStorage.getItem("state"));
	if(state) {
		return JSON.parse(state);
	} else {
		return {
			list:[],
			isLogged:false,
			loading:false,
			token:"",
			error:""
		}
	}
}

const saveToStorage = (state:AppState) => {
	sessionStorage.setItem("state",JSON.stringify(state));
}

const initialState = getInitialState();

const listReducer = (state:AppState,action:Action) => {
	let tempState:AppState = {
		list:[],
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
				loading:false
			}
		case actionConstants.REGISTER_SUCCESS:
			tempState = {
				...state,
				error:"Register Success!"
			}
			saveToStorage(tempState);
			return tempState;
		case actionConstants.REGISTER_FAILED:
			tempState = {
				...state,
				error:action.payload as string
			}
			saveToStorage(tempState);
			return tempState;
		case actionConstants.LOGIN_SUCCESS:
			tempState = {
				...state,
				error:"",
				isLogged:true,
				token:action.payload as string
			}
			saveToStorage(tempState);
			return tempState;
		case actionConstants.LOGIN_FAILED:
			tempState = {
				...state,
				error:action.payload as string
			}
			saveToStorage(tempState);
			return tempState;
		case actionConstants.LOGOUT_SUCCESS:
			tempState = {
				list:[],
				isLogged:false,
				loading:false,
				token:"",
				error:""
			}
			saveToStorage(tempState);
			return tempState;
		case actionConstants.LOGOUT_FAILED:
			tempState = {
				list:[],
				isLogged:false,
				loading:false,
				token:"",
				error:action.payload as string
			}
			saveToStorage(tempState);
			return tempState;		
		case actionConstants.FETCH_LIST_SUCCESS:
			tempState = {
				...state,
				list:action.payload as ShoppingItem[],
				error:""
			}
			saveToStorage(tempState);
			return tempState;
		case actionConstants.FETCH_LIST_FAILED:
			tempState = {
				...state,
				error:action.payload as string
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
				error:action.payload as string
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
				error:action.payload as string
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
				error:action.payload as string
			}
			saveToStorage(tempState);
			return tempState;
		default:
			return state;
	}
}

const StateProvider:React.FC<{}> = (props) => {
	
	const [state,dispatch] = useReducer(listReducer,initialState);
	return (
		<AppStateContext.Provider value={state}>
			<ActionContext.Provider value={{
				dispatch:dispatch
			}}>
				{props.children}
			</ActionContext.Provider>
		</AppStateContext.Provider>
	)
}

export default StateProvider;