import {useState} from 'react';
import {Form,Button} from 'semantic-ui-react';
import useAction from '../hooks/useaction';

const ShoppingForm = (props) => {
	
	const {addItem} = useAction();
	
	const [state,setState] = useState({
		type:"",
		count:0,
		price:0
	});
	
	const onChange = (event) => {
		setState({
			...state,
			[event.target.name]:event.target.value
		})
	};
	
	const onSubmit = (event) => {
		event.preventDefault();
		if(!state.type) {
			return;
		}
		let item = {
			...state
		}
		addItem(item);
		setState({
			type:"",
			count:0,
			price:0
		})
	}
	
	return (
		<div style={{
			width:500,
			margin:"auto",
			backgroundColor:"lightgreen"
		}}>
			<Form onSubmit={onSubmit}>
				<Form.Field>
					<label htmlFor="type">Type</label>
					<input type="text"
							name="type"
							onChange={onChange}
							value={state.type}/>
				</Form.Field>
				<Form.Field>
					<label htmlFor="count">Count</label>
					<input type="number"
							name="count"
							onChange={onChange}
							value={state.count}/>
				<Form.Field>
					<label htmlFor="price">Price</label>
					<input type="number"
							name="price"
							onChange={onChange}
							step="0.01"
							value={state.price}/>
				</Form.Field>
				<Button type="submit">Add</Button>
				</Form.Field>
			</Form>
		</div>
	)
}

export default ShoppingForm;