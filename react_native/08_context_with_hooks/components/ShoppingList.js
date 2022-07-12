import {FlatList,View,Pressable,Text,StyleSheet} from 'react-native';
import useLocale from '../hooks/useLocale';
const ShoppingList = (props) => {
	
	const locale = useLocale();
	
	return(
		<View style={styles.container}>
			<View style={styles.buttonBox}>
				<Pressable style={styles.navigateButton} 
							onPress={() => props.navigation.navigate("Add Item")}>
							<Text style={styles.textStyle}>{locale.strings.addbutton}</Text>	
				</Pressable>
				<Pressable style={styles.navigateButton} 
							onPress={() => locale.changeLocale("en")}>
							<Text style={styles.textStyle}>En</Text>	
				</Pressable>
				<Pressable style={styles.navigateButton} 
							onPress={() => locale.changeLocale("fi")}>
							<Text style={styles.textStyle}>Fi</Text>	
				</Pressable>				
			</View>
			<View style={styles.listBox}>
				<FlatList data={props.list}
							renderItem={({item}) => {
								return(
									<View style={styles.row}>
										<Text style={styles.textStyle}>
											{locale.strings.type}:{item.type}
										</Text>
										<Text style={styles.textStyle}>
											{locale.strings.count}:{item.count}
										</Text>
										<Text style={styles.textStyle}>
											{locale.strings.price}:{item.price}
										</Text>
										<Pressable style={styles.buttonStyle}
											onPress={() => props.removeFromList(item.id)}>
											<Text style={styles.textStyle}>{locale.strings.remove}</Text>
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