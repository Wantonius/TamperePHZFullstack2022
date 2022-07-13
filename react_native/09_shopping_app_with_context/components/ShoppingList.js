import {FlatList,View,Pressable,Text,StyleSheet} from 'react-native';
import useAppState from '../hooks/useAppState';
import useAction from '../hooks/useAction';
const ShoppingList = (props) => {
	
	const {list,token} = useAppState();
	const {remove,changeMode} = useAction();
	
	return(
		<View style={styles.container}>
			<View style={styles.buttonBox}>
				<Pressable style={styles.navigateButton} 
							onPress={() => props.navigation.navigate("Add Item")}>
							<Text style={styles.textStyle}>Add New Item</Text>	
				</Pressable>
			</View>
			<View style={styles.listBox}>
				<FlatList data={list}
							renderItem={({item}) => {
								return(
									<View style={styles.row}>
										<Text style={styles.textStyle}>
										Type:{item.type}
										</Text>
										<Text style={styles.textStyle}>
										Count:{item.count}
										</Text>
										<Text style={styles.textStyle}>
										Price:{item.price}
										</Text>
										<Pressable style={styles.buttonStyle}
											onPress={() => remove(token,item.id)}>
											<Text style={styles.textStyle}>Remove</Text>
										</Pressable>
										<Pressable style={styles.buttonStyle}
											onPress={() => {
												changeMode("Edit",item);
												props.navigation.navigate("Add Item");
											}}>
											<Text style={styles.textStyle}>Edit</Text>
										</Pressable>
									</View>
								)
							}}
							keyExtractor={(item) => ""+item.id}
							/>			
			</View>
		</View>
	)
	
}

const styles = StyleSheet.create({
	container:{
		flex:1
	},
	buttonBox:{
		flex:1,
		flexDirection:"row",
		justifyContent:"center",
		alignItems:"center"
	},
	listBox:{
		flex:10,
		justifyContent:"center",
		alignItems:"center"
	},
	navigateButton:{
		flex:1,
		justifyContent:"center",
		alignItems:"center",
		backgroundColor:"blue"
	},
	textStyle:{
		fontFamily:"sans-serif",
		fontSize:13,
		padding:2
	},
	buttonStyle:{
		padding:3,
		width:70,
		height:50,
		backgroundColor:"red",
		alignItems:"flex-start",
		justifyContent:"center"
	},
	row:{
		flex:1,
		flexDirection:"row",
		justifyContent:"space-evenly",
		alignItems:"center"
	}
})
export default ShoppingList;