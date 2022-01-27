import {Routes,Route} from 'react-router-dom';
import {useState} from 'react';
import './App.css';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';


function App() {

	const [state,setState] = useState({
		list:[{
			type:"banaani",
			count:12,
			price:12
		}]
	});
	
	return (
		<div className="App">
			<Navbar/>
			<hr/>
			<Routes>
				<Route exact path="/" element={<ShoppingList list={state.list}/>}/>
				<Route path="/form" element={<ShoppingForm/>}/>
			</Routes>
		</div>
  );
}

export default App;
