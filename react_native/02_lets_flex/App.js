import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import {useState} from 'react';

export default function App() {
	
	const [state,setState] = useState({
		message:"No button pushed yet"
	})
	
	const changeMessage = (id) => {
		setState({
			message:"You pressed button "+id
		})
	}
	
	return (
		<View style={styles.mainWindow}>
			<View style={styles.textWindow}>
				<Text>{state.message}</Text>
			</View>
			<View style={styles.container}>
				<View style={styles.rowContainer}>
					<TouchableHighlight style={styles.blueButton}
						onPress={() => changeMessage(1)}>
						<Text>1</Text>
					</TouchableHighlight>
					<TouchableHighlight style={styles.blueButton}
						onPress={() => changeMessage(2)}>
						<Text>2</Text>
					</TouchableHighlight>
					<TouchableHighlight style={styles.blueButton}
						onPress={() => changeMessage(3)}>
						<Text>3</Text>
					</TouchableHighlight>
					<TouchableHighlight style={styles.blueButton}
						onPress={() => changeMessage(4)}>
						<Text>4</Text>
					</TouchableHighlight>
				</View>
				<View style={styles.rowContainer}>
					<TouchableHighlight style={styles.blueButton}
						onPress={() => changeMessage(5)}>
						<Text>5</Text>
					</TouchableHighlight>
					<TouchableHighlight style={styles.blueButton}
						onPress={() => changeMessage(6)}>
						<Text>6</Text>
					</TouchableHighlight>
					<TouchableHighlight style={styles.blueButton}
						onPress={() => changeMessage(7)}>
						<Text>7</Text>
					</TouchableHighlight>
					<TouchableHighlight style={styles.blueButton}
						onPress={() => changeMessage(8)}>
						<Text>8</Text>
					</TouchableHighlight>
				</View>
			</View>
			<StatusBar style="auto" />
		</View>
  );
}

const styles = StyleSheet.create({
  mainWindow: {
    flex: 1
  },
  textWindow: {
	  flex:1,
	  justifyContent:"center",
	  alignItems:"center"
  },
  container: {
	  flex:10,
	  backgroundColor:"#fff",
	  flexDirection:"row"
  },
  rowContainer: {
	  flex:1,
	  alignItems:"center",
	  justifyContent:"space-around"
  },
  blueButton: {
	  backgroundColor:"blue",
	  alignItems:"center",
	  justifyContent:"center",
	  width:50,
	  height:50
  }
});
