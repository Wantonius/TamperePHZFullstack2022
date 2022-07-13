import {useState,useEffect} from 'react';
import {View,Text,Pressable,TextInput,StyleSheet} from 'react-native';
import useAction from '../hooks/useAction';
import useAppState from '../hooks/useAppState';
const ShoppingForm = (props) => {
	
	const {token,mode,editable} = useAppState();
	const {addItem,edit,changeMode} = useAction();
	
	const [state,setState] = useState({
		type:"",
		count:"",
		price:""
	})
	
	useEffect(() => {
		if(mode === "Edit") {
			setState({
				type:editable.type,
				count:editable.count,
				price:editable.price				
			})
		}
	},[mode])
	
	const addToList = () => {
		let item = {
			...state,
			id:0
		}
		if(mode === "Edit") {
			item.id = editable.id
			edit(token,item);
		} else {
			addItem(token,item);
		}
		setState({
			type:"",
			count:"",
			price:""
		})
	}
	
	return (
		<View style={styles.container}>
			<View style={styles.row}>
				<Text style={[styles.text,styles.label]}>Type:</Text>
				<TextInput style={[styles.text,styles.input]}
					onChangeText={(text) => setState((state) => {
						return {
							...state,
							type:text
						}
					})
					} value={state.type}/>		
			</View>
			<View style={styles.row}>
				<Text style={[styles.text,styles.label]}>Count:</Text>
				<TextInput style={[styles.text,styles.input]}
					onChangeText={(text) => setState((state) => {
						return {
							...state,
							count:text
						}
					})
					} value={state.count} keyboardType="numeric"/>		
			</View>
			<View style={styles.row}>
				<Text style={[styles.text,styles.label]}>Price:</Text>
				<TextInput style={[styles.text,styles.input]}
					onChangeText={(text) => setState((state) => {
						return {
							...state,
							price:text
						}
					})
					} value={state.price} keyboardType="numeric"/>		
			</View>
			<View style={styles.buttonRow}>
				<Pressable style={styles.addButton}
					onPress={addToList}>
					<Text style={styles.text}>{mode}</Text>
				</Pressable>
			</View>
		</View>
	
	)
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		alignItems:"center",
		justifyContent:"center"
	},
	row: {
		flex:1,
		flexDirection:"row",
		alignItems:"center",
		justifyContent:"space-between"
	},
	buttonRow: {
		flex:1,
		flexDirection:"row",
		alignItems:"center",
		justifyContent:"center"
	},
	addButton:{
		height:80,
		width:110,
		backgroundColor:"blue",
		alignItems:"center",
		justifyContent:"center"
	},
	text:{
		fontFamily:"sans-serif",
		fontSize:18
	},
	label:{
		fontWeight:"bold"
	},
	input:{
		minWidth:200,
		backgroundColor:"lightgreen"
	}
})

export default ShoppingForm;