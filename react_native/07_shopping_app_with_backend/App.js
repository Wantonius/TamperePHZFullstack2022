import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ShoppingList from './components/ShoppingList';
import ShoppingForm from './components/ShoppingForm';
import LoginPage from './components/LoginPage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {useState} from 'react';

const Stack = createNativeStackNavigator();

export default function App() {
	
	const [state,setState] = useState({
		list:[],
		id:100,
		isLogged:false,
		token:""
	});
	
	const addToList = (item) => {
		item.id = state.id;
		setState((state) => {
			return {
				list:state.list.concat(item),
				id:state.id+1
			}
		})
	};
	
	const removeFromList = (id) => {
		setState((state) => {
			let tempList = state.list.filter(item => item.id !== id);
			return {
				...state,
				list:tempList
			}
		})
	}
	
	const register = (user) => {
		
	}
	
	const login = (user) => {
		
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
