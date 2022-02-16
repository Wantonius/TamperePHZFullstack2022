import React,{useState} from 'react';
import ShoppingItem from '../models/ShoppingItem';
import useAction from '../hooks/useaction';
import useAppState from '../hooks/useappstate';


interface State {
	type:string;
	count:number;
	price:number;
}

const ShoppingForm:React.FC<{}> = () => {
	
	const [state,setState] = useState<State>({
		type:"",
		count:0,
		price:0
	})
	
	const {addItem} = useAction();
	const {token} = useAppState();
	
	const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
		setState((state) => {
			return {
				...state,
				[e.target.name]:e.target.value
			}
		})
	}
	
	const onSubmit = (e:React.SyntheticEvent) => {
		e.preventDefault();
		let item = new ShoppingItem(0,state.type,state.count,state.price);
		addItem(token,item);
		setState({
			type:"",
			count:0,
			price:0
		})
	}
	
	return(
		<form onSubmit={onSubmit}>
			<label htmlFor="type">Type</label>
			<input type="text"
					name="type"
					id="type"
					onChange={onChange}
					value={state.type}/>
			<br/>
			<label htmlFor="count">Count</label>
			<input type="number"
					name="count"
					id="count"
					onChange={onChange}
					value={state.count}/>
			<br/>
			<label htmlFor="price">Price</label>
			<input type="number"
					name="price"
					id="price"
					step="0.01"
					onChange={onChange}
					value={state.price}/>
			<br/>
			<input type="submit" value="Add"/>
		</form>
	) 
}

export default ShoppingForm;