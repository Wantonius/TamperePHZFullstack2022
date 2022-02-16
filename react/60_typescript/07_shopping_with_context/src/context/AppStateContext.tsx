import React from 'react';
import ShoppingItem from '../models/ShoppingItem';

export interface AppState {
	list:ShoppingItem[];
	isLogged:boolean;
	loading:boolean;
	token:string;
	error:string;
}
const AppStateContext = React.createContext<AppState>({
	list:[],
	isLogged:false,
	loading:false,
	token:"",
	error:""
})

AppStateContext.displayName = "AppStateContext";

export default AppStateContext;