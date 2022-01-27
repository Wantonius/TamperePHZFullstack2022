import {useState} from 'react';
import {Table} from 'semantic-ui-react';
import Row from './Row';

const ShoppingList = (props) => {
	
	const [state,setState] = useState({
		removeIndex:-1,
		editIndex:-1
	})
	
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
	
	let items = props.list.map((item,index) => {
		return(
			<Row key={item.id} item={item} index={index}
			changeToEditMode={changeToEditMode} changeToRemoveMode={changeToRemoveMode}/>
		)
	})
	return(
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
	)
}
export default ShoppingList;