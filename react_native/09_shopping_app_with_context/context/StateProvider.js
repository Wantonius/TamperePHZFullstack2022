import {useReducer} from 'react';
import ActionContext from './ActionContext';
import AppStateContext from './AppStateContext';
import * as ActionConstants from '../types/actionConstants';

const initialState = {
	list:[],
	isLogged:false,
	token:"",
	loading:false,
	error:"",
	mode:"Add",
	editable:{}
}

const listReducer = (state,action) => {
	switch(action.type) {
		case ActionConstants.LOADING:
			return {
				...state,
				error:"",
				loading:true
			}
		case ActionConstants.STOP_LOADING:
			return {
				...state,
				loading:false
			}
		case ActionConstants.REGISTER_SUCCESS:
			return {
				...state,
				error:"Register success"
			}
		case ActionConstants.REGISTER_FAILED:
			return {
				...state,
				error:action.error
			}
		case ActionConstants.LOGIN_SUCCESS:
			return {
				...state,
				isLogged:true,
				token:action.token
			}
		case ActionConstants.LOGIN_FAILED:
			return {
				...state,
				error:action.error
			}
		case ActionConstants.FETCH_LIST_SUCCESS:
			return {
				...state,
				list:action.list
			}
		case ActionConstants.FETCH_LIST_FAILED:
			return {
				...state,
				error:action.error
			}
		case ActionConstants.ADD_ITEM_SUCCESS:
			return state;
		case ActionConstants.ADD_ITEM_FAILED:
			return {
				...state,
				error:action.error
			}
		case ActionConstants.REMOVE_ITEM_SUCCESS:
			return state;
		case ActionConstants.REMOVE_ITEM_FAILED:
			return {
				...state,
				error:action.error
			}
		case ActionConstants.EDIT_ITEM_SUCCESS:
			return {
				...state
			}
		case ActionConstants.EDIT_ITEM_FAILED:
			return {
				...state,
				error:action.error
			}
		case ActionConstants.CHANGE_MODE:
			return {
				...state,
				mode:action.mode,
				editable:action.editable
			}
		case ActionConstants.LOGOUT: 
			return {
				list:[],
				isLogged:false,
				token:"",
				loading:false,
				error:"",
				mode:"Add",
				editable:{}
			}			
		default:
			return state;
	}
}

const StateProvider = (props) => {
	
	const [state,dispatch] = useReducer(listReducer,initialState);
	
	return (
		<AppStateContext.Provider value={state}>
			<ActionContext.Provider value={{dispatch:dispatch}}>
				{props.children}
			</ActionContext.Provider>
		</AppStateContext.Provider>
	)
}

export default StateProvider;