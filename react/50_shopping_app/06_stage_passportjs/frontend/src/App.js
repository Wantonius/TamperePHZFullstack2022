import {Routes,Route,Navigate} from 'react-router-dom';
import './App.css';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import useAction from './hooks/useaction';
import useAppState from './hooks/useappstate';
import {useEffect} from 'react';

function App() {

	const {isLogged} = useAppState();
	const {getList} = useAction();
	
	useEffect(() => {
		if(isLogged) {
			getList();
		}
	},[isLogged])
	
	let tempRender = <Routes>
					<Route exact path="/" element={<LoginPage />}/>
					<Route path="*" element={<Navigate to="/"/>}/>
					</Routes>
	if(isLogged) {
		tempRender = <Routes>
				<Route exact path="/" element={<ShoppingList />}/>
				<Route path="/form" element={<ShoppingForm />}/>
				<Route path="*" element={<Navigate to="/"/>}/>
			</Routes>
	}
	return (
		<div className="App">
			<Navbar/>
			<hr/>
			{tempRender}
		</div>
  );
}

export default App;
