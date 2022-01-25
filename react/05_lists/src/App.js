import './App.css';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import {useState} from 'react';
function App() {
	
	const [state,setState] = useState({
		list:[],
		id:100
	})
	
	const addToList = (contact) => {
		setState((state) => {
			contact.id = state.id
			return {
				list:state.list.concat(contact),
				id:state.id+1
			}
		})
	}
	
	const removeFromList = (id) => {
		setState((state) => {
			let tempList = state.list.filter(contact => contact.id !== id)
			return {
				...state,
				list:tempList
			}
		})
	}
	
	return (
		<div className="App">
			<ContactForm addToList={addToList}/>
			<hr/>
			<ContactList list={state.list} removeFromList={removeFromList}/>
		</div>
	);
}

export default App;
