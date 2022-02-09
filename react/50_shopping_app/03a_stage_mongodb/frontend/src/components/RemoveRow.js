import {Table,Button} from 'semantic-ui-react';

const RemoveRow = (props) => {

	return(
		<Table.Row>
			<Table.Cell>{props.item.type}</Table.Cell>
			<Table.Cell>{props.item.count}</Table.Cell>
			<Table.Cell>{props.item.price}</Table.Cell>
			<Table.Cell>
				<Button color="red" onClick={() => props.cancel()}>
					Cancel
				</Button>
			</Table.Cell>
			<Table.Cell>
				<Button color="green"
				onClick={() => props.removeFromList(props.item.id)}>
					Confirm
				</Button>
			</Table.Cell>		
		</Table.Row>
	)
}

export default RemoveRow;