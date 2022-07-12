import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ShoppingList from './components/ShoppingList';
import ShoppingForm from './components/ShoppingForm';
import LoginPage from './components/LoginPage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {useState,useEffect} from 'react';

const Stack = createNativeStackNavigator();

export default function App() {
	
	const [state,setState] = useState({
		list:[],
		isLogged:false,
		token:""
	});
	
	const [urlRequest,setUrlRequest] = useState({
		url:"",
		request:{},
		action:""
	})
	
	useEffect(() => {
		
		const fetchData = async () => {
			if(!urlRequest.url) {
				return;
			}
			let url = "http://to-native-shopping.herokuapp.com"+urlRequest.url;
			const response = await fetch(url,urlRequest.request);
			if(response.ok) {
				switch(urlRequest.action) {
					case "register":
						alert("Register success");
						return;
					case "login":
						const data = await response.json();
						if(!data) {
							return;
						}
						setState((state) => {
							return {
								...state,
								isLogged:true,
								token:data.token
							}
						})
						getList(data.token);
						return;
					case "getlist":
						const list = await response.json();
						if(!list) {
							return;
						}
						setState((state) => {
							return {
								...state,
								list:list
							}
						})
						return;
					case "additem":
						getList(state.token);
						return;
					case "removeitem":
						getList(state.token);
						return;
					default:
						return;
				}
			} else {
				if(response.status === 403) {
					if(urlRequest.action !== "login") {
						setState({
							list:[],
							isLogged:false,
							token:""
						})
					}
				}
			}
		}
		
		fetchData();
		
	},[urlRequest])
	
	//SHOPPING API
	
	const getList = (token) => {
		setUrlRequest({
			url:"/api/shopping",
			request:{
				method:"GET",
				mode:"cors",
				headers:{"Content-type":"application/json",
				token:token}
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
				token:state.token},
				body:JSON.stringify(item)
			},
			action:"additem"
		})
	};
	
	const removeFromList = (id) => {
		setUrlRequest({
			url:"/api/shopping/"+id,
			request:{
				method:"DELETE",
				mode:"cors",
				headers:{"Content-type":"application/json",
				token:state.token}
			},
			action:"removeitem"
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
	
	return (
		<NavigationContainer>
			<Stack.Navigator>
			{state.isLogged ? (
				<>
					<Stack.Screen name="ShoppingList">
					{props => <ShoppingList {...props} removeFromList={removeFromList} list={state.list}/>}
					</Stack.Screen>
					<Stack.Screen name="Add Item">
					{props => <ShoppingForm {...props} addToList={addToList}/>}
					</Stack.Screen>
				</> 
				):(
				<>
					<Stack.Screen name="LoginPage">
					{props => <LoginPage {...props} register={register} login={login}/>}
					</Stack.Screen>
				</>
				)
			}
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
