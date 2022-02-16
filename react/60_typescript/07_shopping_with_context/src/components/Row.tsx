import React from 'react';
import ShoppingItem from '../models/ShoppingItem';

interface Props {
	item:ShoppingItem;
	handleRemoveButton(id:number|string):void;
	handleEditButton(id:number|string):void;
}

const Row:React.FC<Props> = (props:Props) => {
	return(
		<tr>
			<td>{props.item.type}</td>
			<td>{props.item.count}</td>
			<td>{props.item.price}</td>
			<td><button onClick={() => props.handleRemoveButton(props.item.id)}>Remove</button></td>
			<td><button onClick={() => props.handleEditButton(props.item.id)}>Edit</button></td>
		</tr>
	)
}

export default Row;