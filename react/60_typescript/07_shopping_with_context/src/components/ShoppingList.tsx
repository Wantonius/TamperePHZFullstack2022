import React,{useState} from 'react';
import ShoppingItem from '../models/ShoppingItem';
import Row from './Row';
import RemoveRow from './RemoveRow';
import EditRow from './EditRow';
import useAction from '../hooks/useaction';
import useAppState from '../hooks/useappstate';

interface State {
	removeIndex:number;
	editIndex:number;
}

const ShoppingList:React.FC<{}> = () => {
	
	const [state,setState] = useState<State>({
		removeIndex:-1,
		editIndex:-1
	})
	
	const {list,token} = useAppState();
	const {removeItem,edit} = useAction();
	

	
	const handleRemoveButton = (id:number|string) => {
		for(let i=0;i<list.length;i++) {
			if(id === list[i].id) {
				setState({
					removeIndex:i,
					editIndex:-1
				})
			}
		}
	}

	const handleEditButton = (id:number|string) => {
		for(let i=0;i<list.length;i++) {
			if(id === list[i].id) {
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
		removeItem(token,id);
		cancel();
	}
	
	const editItem = (item:ShoppingItem) => {
		edit(token,item);
		cancel();
	}
	
	let items = list.map((item,index) => {
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