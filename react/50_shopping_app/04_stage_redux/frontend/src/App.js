import {Routes,Route,Navigate} from 'react-router-dom';
import './App.css';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import {useSelector} from 'react-redux';

function App() {

	const appState = useSelector(state => {
		return {
			isLogged:state.login.isLogged
		}
	})
	
	let tempRender = <Routes>
					<Route exact path="/" element={<LoginPage/>}/>
					<Route path="*" element={<Navigate to="/"/>}/>
					</Routes>
	if(appState.isLogged) {
		tempRender = <Routes>
				<Route exact path="/" element={<ShoppingList />}/>
				<Route path="/form" element={<ShoppingForm/>}/>
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
