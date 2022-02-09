import {useState} from 'react';
import {Table,Button} from 'semantic-ui-react';
import Row from './Row';
import RemoveRow from './RemoveRow';
import EditRow from './EditRow';
import {useDispatch,useSelector} from 'react-redux';
import {removeItem,edit,getList} from '../actions/shoppingActions';

const ShoppingList = (props) => {
	
	const appState = useSelector(state => {
		return {
			token:state.login.token,
			list:state.shopping.list
		}
	})
	
	const dispatch = useDispatch();
	
	const [state,setState] = useState({
		removeIndex:-1,
		editIndex:-1
	})
	
	const [search,setSearch] = useState({
		type:"",
		price:0
	})
	
	const searchByType = () => {
		dispatch(getList(appState.token,search.type,search.price));
		setSearch({
			type:"",
			price:0
		})
	}
	
	const onChange = (event) => {
		setSearch(state => {
			return {
				...state,
				[event.target.name]:event.target.value
			}
		})
	}
	
	const changeToRemoveMode = (index) => {
		setState({
			removeIndex:index,
			editIndex:-1
		})
	}
	
	const changeToEditMode = (index) => {
		setState({
			removeIndex:-1,
			editIndex:index
		})
	}
	
	const cancel = () => {
		setState({
			removeIndex:-1,
			editIndex:-1
		})
	}
	
	const removeFromList = (id) => {
		dispatch(removeItem(appState.token,id));
		cancel();
	}
	
	const editItem = (item) => {
		dispatch(edit(appState.token,item));
		cancel();
	}
	
	let items = appState.list.map((item,index) => {
		if(index === state.editIndex) {
			return (
				<EditRow key={item.id} item={item} cancel={cancel} editItem={editItem}/>
			)
		}
		if(index === state.removeIndex) {
			return(
				<RemoveRow key={item.id} item={item} cancel={cancel}
				removeFromList={removeFromList}/>
			)
		}
		return(
			<Row key={item.id} item={item} index={index}
			changeToEditMode={changeToEditMode} changeToRemoveMode={changeToRemoveMode}/>
		)
	})
	return(
	<div>
		<label htmlFor="type">Search by type:</label>
		<input type="text"	
				name="type"
				id="type"
				onChange={onChange}
				value={search.type}/>
		<label htmlFor="price">Costing maximum of:</label>
		<input type="number"
				name="price"
				id="price"
				onChange={onChange}
				value={search.price}/>
		<Button onClick={searchByType} style={{marginLeft:10}}>Search</Button>
		<Table striped>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell>Item type</Table.HeaderCell>
					<Table.HeaderCell>Count</Table.HeaderCell>
					<Table.HeaderCell>Price</Table.HeaderCell>
					<Table.HeaderCell>Remove</Table.HeaderCell>
					<Table.HeaderCell>Edit</Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
			{items}
			</Table.Body>
		</Table>
	</div>
	)
}
export default ShoppingList;