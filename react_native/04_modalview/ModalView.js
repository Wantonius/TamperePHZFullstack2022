import {useState} from 'react';
import {View,Text,StyleSheet,Pressable,Modal} from 'react-native';

const ModalView = (props) => {
	
	const [state,setState] = useState({
		visible:false
	})
	
	return (
		<View style={styles.container}>
			<Modal 
				animationType="fade"
				transparent={false}
				visible={state.visible}
				onRequestClose={() => {
					setState({
						visible:false
					})
				}}>
					<View style={styles.modalView}>
						<Text>Press to close</Text>
						<Pressable style={styles.closeButton}
							onPress={() => setState({visible:false})}>
							<Text>Close</Text>
						</Pressable>
					</View>
			</Modal>
			<Pressable style={styles.openButton}
				onPress={() => setState({visible:true})}>
				<Text>Open modal</Text>
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		justifyContent:"center",
		alignItems:"center"
	},
	modalView:{
		margin:10,
		backgroundColor:"lightblue",
		padding:20,
		alignItems:"center",
		shadowColor:"#000",
		shadowOffset:{
			width:0,
			height:2
		},
		shadowOpacity:0.25,
		shadowRadius:4,
		elevation:5
	},
	openButton:{
		width:100,
		height:60,
		backgroundColor:"green"
	},
	closeButton:{
		width:100,
		height:60,
		backgroundColor:"red"
	}
})

export default ModalView;