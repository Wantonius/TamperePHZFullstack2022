import {Routes,Route,Navigate} from 'react-router-dom';
import {useState,useEffect} from 'react';
import './App.css';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import {useSelector} from 'react-redux';

function App() {

	const appState = useSelector(state => {
		return {
			isLogged:state.isLogged,
			token:state.token
		}
	})

	const [urlRequest,setUrlRequest] = useState({
		url:"",
		request:{},
		action:""
	});

	const [state,setState] = useState({
		list:[]
	});
	
	useEffect(() => {
		if(sessionStorage.getItem("state")) {
			let state = JSON.parse(sessionStorage.getItem("state"));
			setState(state);
		}
	}, [])
	
	useEffect(() => {
		sessionStorage.setItem("state",JSON.stringify(state));
	},[state.list])
	
	useEffect(() => {
		if(urlRequest.url === "") {
			return;
		}
		
		const fetchData = async () => {
			const response = await fetch(urlRequest.url,urlRequest.request);
			if(response.ok) {
				if(urlRequest.action === "getlist") {
					const data = await response.json();
					setState({
						list:data
					})
					return;
				}
				if(urlRequest.action === "additem") {
					getList();
					return;
				}
				if(urlRequest.action === "removeitem") {
					getList();
					return;
				}
				if(urlRequest.action === "edititem") {
					getList();
					return;
				}
				if(urlRequest.action === "logout") {
					clearState();
					return;
				}
			} else {
				if(urlRequest.action === "getlist") {
					if(response.status === 403) {
						clearState();
						return;
					}
				}
				if(urlRequest.action === "additem") {
					if(response.status === 403) {
						clearState();
						return;
					}
				}
				if(urlRequest.action === "removeitem") {
					if(response.status === 403) {
						clearState();
						return;
					}
				}
				if(urlRequest.action === "edititem") {
					if(response.status === 403) {
						clearState();
						return;
					}
				}
				}
				if(urlRequest.action === "logout") {
					clearState();
				}
			}
		}
		
		fetchData();
	},[urlRequest]);
	// HELPERS
	
	const clearState = () => {
		setState({
			list:[]
		})
	}
	
	
	//REST API
	const getList = (token,search,price) => {
		let temp = appState.token;
		if(token) {
			temp = token;
		}
		let url = "/api/shopping"
		if(search) {
			url = url + "?type="+search
			if(price) {
				url = url + "&price="+price
			}
		} else {
			if(price) {
				url = url + "?price="+price
			}
		}
		setUrlRequest({
			url:url,
			request:{
				method:"GET",
				mode:"cors",
				headers:{"Content-type":"application/json",
						"token":temp}
			},
			action:"getlist"		
		})
	}
	
	const addToList = (item) => {
		setUrlRequest({
			url:"/api/shopping",
			request:{
				method:"POST",
				mode:"cors",
				headers:{"Content-type":"application/json",
					"token":appState.token},
				body:JSON.stringify(item)
			},
			action:"additem"
		})
	}
	
	const removeFromList = (id) => {
		setUrlRequest({
			url:"/api/shopping/"+id,
			request:{
				method:"DELETE",
				mode:"cors",
				headers:{"Content-type":"application/json",
					"token":appState.token}
			},
			action:"removeitem"
		})
	}
	
	const editItem = (item) => {
		setUrlRequest({
			url:"/api/shopping/"+item.id,
			request:{
				method:"PUT",
				mode:"cors",
				headers:{"Content-type":"application/json",
					"token":appState.token},
				body:JSON.stringify(item)
			},
			action:"edititem"
		})
	}
	


	const logout = (user) => {
		setUrlRequest({
			url:"/logout",
			request:{
				method:"POST",
				mode:"cors",
				headers:{"Content-type":"application/json",
						"token":appState.token}
			},
			action:"logout"
		})
	}
	
	let tempRender = <Routes>
					<Route exact path="/" element={<LoginPage/>}/>
					<Route path="*" element={<Navigate to="/"/>}/>
					</Routes>
	if(appState.isLogged) {
		tempRender = <Routes>
				<Route exact path="/" element={<ShoppingList list={state.list} removeFromList={removeFromList} editItem={editItem} getList={getList}/>}/>
				<Route path="/form" element={<ShoppingForm addToList={addToList}/>}/>
				<Route path="*" element={<Navigate to="/"/>}/>
			</Routes>
	}
	return (
		<div className="App">
			<Navbar error={state.error} loading={state.loading} isLogged={state.isLogged} logout={logout}/>
			<hr/>
			{tempRender}
		</div>
  );
}

export default App;
