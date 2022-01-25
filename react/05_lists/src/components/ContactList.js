import {Table,Button} from 'semantic-ui-react';

const ContactList = (props) => {
	
	let contacts = props.list.map((contact) => {
		return (
			<Table.Row key={contact.id}>
				<Table.Cell>{contact.firstname}</Table.Cell>
				<Table.Cell>{contact.lastname}</Table.Cell>
				<Table.Cell>{contact.email}</Table.Cell>
				<Table.Cell>{contact.phone}</Table.Cell>
				<Table.Cell>
					<Button color="red" onClick={() => props.removeFromList(contact.id)}>Remove</Button>
				</Table.Cell>
			</Table.Row>
		)
	})
	return(
		<Table striped>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell>First Name</Table.HeaderCell>
					<Table.HeaderCell>Last Name</Table.HeaderCell>
					<Table.HeaderCell>Email</Table.HeaderCell>
					<Table.HeaderCell>Phone</Table.HeaderCell>
					<Table.HeaderCell>Remove</Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
			{contacts}
			</Table.Body>
		</Table>
	)
	
}

export default ContactList;