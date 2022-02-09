import {Table,Button} from 'semantic-ui-react';
import {useState} from 'react';
const EditRow = (props) => {

	const [state,setState] = useState({
		type:props.item.type,
		count:props.item.count,
		price:props.item.price
	})

	const onChange = (event) => {
		setState({
			...state,
			[event.target.name]:event.target.value
		})
	};
	
	const save = () => {
		let item = {
			...state,
			id:props.item.id
		}
		props.editItem(item)
	}
	
	return(
		<Table.Row>
			<Table.Cell>
				<input type="text"
						name="type"
						onChange={onChange}
						value={state.type}/>
			</Table.Cell>
			<Table.Cell>
				<input type="number"
						name="count"
						onChange={onChange}
						value={state.count}/>
			</Table.Cell>
			<Table.Cell>
				<input type="number"
						name="price"
						step="0.01"
						onChange={onChange}
						value={state.price}/>
			</Table.Cell>
			<Table.Cell>
				<Button color="green" onClick={save}>
					Save
				</Button>
			</Table.Cell>
			<Table.Cell>
				<Button color="red"
				onClick={props.cancel}>
					Cancel
				</Button>
			</Table.Cell>		
		</Table.Row>
	)
}

export default EditRow;