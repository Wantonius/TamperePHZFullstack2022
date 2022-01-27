import {Table,Button} from 'semantic-ui-react';

const Row = (props) => {
	return(
		<Table.Row>
			<Table.Cell>{props.item.type}</Table.Cell>
			<Table.Cell>{props.item.count}</Table.Cell>
			<Table.Cell>{props.item.price}</Table.Cell>
			<Table.Cell><Button color="red">Remove</Button></Table.Cell>
			<Table.Cell><Button color="blue">Edit</Button></Table.Cell>
		</Table.Row>
	)
}

export default Row;