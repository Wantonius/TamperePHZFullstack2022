import {Routes,Route} from 'react-router-dom';
import {useState,useEffect} from 'react';
import './App.css';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';


function App() {

	const [urlRequest,setUrlRequest] = useState({
		url:"",
		request:{},
		action:""
	});

	const [state,setState] = useState({
		list:[],
		isLogged:false,
		token:"",
		loading:false,
		error:""
	});
	
	useEffect(() => {
		getList();
	},[])
	
	useEffect(() => {
		if(urlRequest.url === "") {
			return;
		}
		
		const fetchData = async () => {
			setError("");
			setLoading(true);
			const response = await fetch(urlRequest.url,urlRequest.request);
			setLoading(false);
			if(response.ok) {
				if(urlRequest.action === "getlist") {
					const data = await response.json();
					setState({
						...state,
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
				if(urlRequest.action === "register") {
					setError("Register success!");
					return;
				}
				if(urlRequest.action === "login") {
					let data = await response.json();
					setState({
						...state,
						isLogged:true,
						token:data.token
					})
					getList(data.token);
				}
				if(urlRequest.action === "logout") {
					clearState();
					return;
				}
			} else {
				if(urlRequest.action === "getlist") {
					if(response.status === 403) {
						clearState();
						setError("Session has expired. Logging you out!");
						return;
					}
					setError("Server responded with a status "+response.statusText)
				}
				if(urlRequest.action === "additem") {
					if(response.status === 403) {
						clearState();
						setError("Session has expired. Logging you out!");
						return;
					}
					setError("Server responded with a status "+response.statusText)
				}
				if(urlRequest.action === "removeitem") {
					if(response.status === 403) {
						clearState();
						setError("Session has expired. Logging you out!");
						return;
					}
					setError("Server responded with a status "+response.statusText)
				}
				if(urlRequest.action === "edititem") {
					if(response.status === 403) {
						clearState();
						setError("Session has expired. Logging you out!");
						return;
					}
					setError("Server responded with a status "+response.statusText)
				}
				if(urlRequest.action === "register") {
					if(response.status === 409) {
						setError("Username already in use");
						return;
					}
					setError("Server responded with a status "+response.statusText)
				}
				if(urlRequest.action === "login") {
					setError("Server responded with a status "+response.statusText)
				}
				if(urlRequest.action === "logout") {
					clearState();
					setError("Server responded with an error. Logging you out!");
				}
			}
		}
		
		fetchData();
	},[urlRequest]);
	// HELPERS
	
	const clearState = () => {
		setState({
			list:[],
			isLogged:false,
			loading:false,
			error:"",
			token:""
		})
	}
	
	const setError = (error) => {
		setState({
			...state,
			error:error
		})
	}
	
	const setLoading = (loading) => {
		setState({
			...state,
			loading:loading
		})
	}
	
	//REST API
	const getList = (token) => {
		let temp = state.token;
		if(token) {
			temp = token;
		}
		setUrlRequest({
			url:"/api/shopping",
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
					"token":state.token},
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
					"token":state.token}
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
				headers:{"Content-type":"application/json"
					"token":state.token},
				body:JSON.stringify(item)
			},
			action:"edititem"
		})
	}
	
	const register = (user) => {
		setUrlRequest({
			url:"/register",
			request:{
				method:"POST",
				mode:"cors",
				headers:{"Content-type":"application/json"},
				body:JSON.stringify(user)
			},
			action:"register"
		})
	}

	const login = (user) => {
		setUrlRequest({
			url:"/login",
			request:{
				method:"POST",
				mode:"cors",
				headers:{"Content-type":"application/json"},
				body:JSON.stringify(user)
			},
			action:"login"
		})
	}

	const logout = (user) => {
		setUrlRequest({
			url:"/logout",
			request:{
				method:"POST",
				mode:"cors",
				headers:{"Content-type":"application/json",
						"token":state.token}
			},
			action:"logout"
		})
	}	
	return (
		<div className="App">
			<Navbar/>
			<hr/>
			<Routes>
				<Route exact path="/" element={<ShoppingList list={state.list} removeFromList={removeFromList} editItem={editItem}/>}/>
				<Route path="/form" element={<ShoppingForm addToList={addToList}/>}/>
			</Routes>
		</div>
  );
}

export default App;
