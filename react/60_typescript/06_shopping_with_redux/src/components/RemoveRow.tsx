import React from 'react';
import ShoppingItem from '../models/ShoppingItem';

interface Props {
	item:ShoppingItem;
	removeFromList(id:number|string):void;
	cancel():void;
}

const RemoveRow:React.FC<Props> = (props:Props) => {
	return(
		<tr>
			<td>{props.item.type}</td>
			<td>{props.item.count}</td>
			<td>{props.item.price}</td>
			<td><button onClick={() => props.cancel()}>Cancel</button></td>
			<td><button onClick={() => props.removeFromList(props.item.id)}>Confirm</button></td>
		</tr>
	)
}

export default RemoveRow;