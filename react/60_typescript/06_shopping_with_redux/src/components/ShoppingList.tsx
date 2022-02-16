import React,{useState} from 'react';
import ShoppingItem from '../models/ShoppingItem';
import Row from './Row';
import RemoveRow from './RemoveRow';
import EditRow from './EditRow';
import {ThunkDispatch} from 'redux-thunk';
import {useDispatch,useSelector} from 'react-redux';
import {AnyAction} from 'redux';
import {removeItem,edit} from '../actions/shoppingActions';

interface ListState {
	login:{
		token:string
	},
	shopping:{
		list:ShoppingItem[]
	}
}

interface State {
	removeIndex:number;
	editIndex:number;
}

const ShoppingList:React.FC<{}> = () => {
	
	const [state,setState] = useState<State>({
		removeIndex:-1,
		editIndex:-1
	})
	
	const dispatch:ThunkDispatch<any,any,AnyAction> = useDispatch();
	const listState = (state:ListState) => state;
	
	const appState = useSelector(listState);
	
	const handleRemoveButton = (id:number|string) => {
		for(let i=0;i<appState.shopping.list.length;i++) {
			if(id === appState.shopping.list[i].id) {
				setState({
					removeIndex:i,
					editIndex:-1
				})
			}
		}
	}

	const handleEditButton = (id:number|string) => {
		for(let i=0;i<appState.shopping.list.length;i++) {
			if(id === appState.shopping.list[i].id) {
				setState({
					removeIndex:-1,
					editIndex:i
				})
			}
		}
	}

	const cancel = () => {
		setState({
			removeIndex:-1,
			editIndex:-1
		})
	}
	
	const removeFromList = (id:number|string) => {
		dispatch(removeItem(appState.login.token,id));
		cancel();
	}
	
	const editItem = (item:ShoppingItem) => {
		dispatch(edit(appState.login.token,item));
		cancel();
	}
	
	let items = appState.shopping.list.map((item,index) => {
		if(state.removeIndex === index) {
			return(
				<RemoveRow key={item.id} removeFromList={removeFromList} cancel={cancel} item={item}/>
			)
		}
		if(state.editIndex === index) {
			return (
				<EditRow key={item.id} editItem={editItem} cancel={cancel} item={item}/>
			)
		}
		return(
			<Row key={item.id} handleEditButton={handleEditButton} handleRemoveButton={handleRemoveButton} item={item}/>
		)
	})
	return(
		<table>
			<thead>
				<tr>
					<th>Type</th>
					<th>Count</th>
					<th>Price</th>
					<th>Remove</th>
					<th>Edit</th>
				</tr>
			</thead>
			<tbody>
			{items}
			</tbody>
		</table>
	)
	
}

export default ShoppingList;