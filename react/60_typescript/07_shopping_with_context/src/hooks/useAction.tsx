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
	
	useEffect(() => {},[state])
}

export default useAction;