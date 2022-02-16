import React from 'react';


export interface Action {
	type:string,
	payload:any
}

export interface DispatchInterface {
	dispatch:React.Dispatch<Action>
}

const ActionContext = React.createContext<DispatchInterface>({
	dispatch:() => {}
})

ActionContext.displayName = "ActionContext";

export default ActionContext;