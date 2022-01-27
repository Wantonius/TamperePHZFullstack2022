import {Table} from 'semantic-ui-react';
import Row from './Row';

const ShoppingList = (props) => {
	
	let items = props.list.map((item,index) => {
		return(
			<Row key={item.id} item={item} index={index}/>
		)
	})
	return(
		<Table striped>
			<Table.Header>
				<Table.HeaderCell>Item type</Table.HeaderCell>
				<Table.HeaderCell>Count</Table.HeaderCell>
				<Table.HeaderCell>Price</Table.HeaderCell>
				<Table.HeaderCell>Remove</Table.HeaderCell>
				<Table.HeaderCell>Edit</Table.HeaderCell>
			</Table.Header>
			<Table.Body>
			{items}
			</Table.Body>
		</Table>
	)
}
export default ShoppingList;