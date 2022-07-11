import {useState} from 'react';
import {View,Text,StyleSheet,Pressable,FlatList} from 'react-native';

const ContactList = (props) => {
	const [state,setState] = useState({
		data: [
	{
		"firstname": "Isadora",
		"lastname": "Mckay",
		"age": 55,
		"id": 1
	},
	{
		"firstname": "Cullen",
		"lastname": "Walton",
		"age": 64,
		"id": 2
	},
	{
		"firstname": "Lani",
		"lastname": "Graham",
		"age": 67,
		"id": 3
	},
	{
		"firstname": "Wing",
		"lastname": "Wells",
		"age": 90,
		"id": 4
	},
	{
		"firstname": "Emi",
		"lastname": "Bishop",
		"age": 72,
		"id": 5
	},
	{
		"firstname": "Paul",
		"lastname": "Hutchinson",
		"age": 39,
		"id": 6
	},
	{
		"firstname": "Thomas",
		"lastname": "Aguirre",
		"age": 62,
		"id": 7
	},
	{
		"firstname": "Nelle",
		"lastname": "Stein",
		"age": 29,
		"id": 8
	},
	{
		"firstname": "Zeph",
		"lastname": "Farrell",
		"age": 57,
		"id": 9
	},
	{
		"firstname": "Plato",
		"lastname": "Perez",
		"age": 31,
		"id": 10
	},
	{
		"firstname": "Gretchen",
		"lastname": "Holmes",
		"age": 67,
		"id": 11
	},
	{
		"firstname": "Eagan",
		"lastname": "Ortega",
		"age": 94,
		"id": 12
	},
	{
		"firstname": "Tanisha",
		"lastname": "Singleton",
		"age": 60,
		"id": 13
	},
	{
		"firstname": "Macy",
		"lastname": "Kelly",
		"age": 86,
		"id": 14
	},
	{
		"firstname": "Neve",
		"lastname": "Russo",
		"age": 93,
		"id": 15
	},
	{
		"firstname": "Rashad",
		"lastname": "Kirkland",
		"age": 69,
		"id": 16
	},
	{
		"firstname": "Francis",
		"lastname": "Morrow",
		"age": 56,
		"id": 17
	},
	{
		"firstname": "Vielka",
		"lastname": "Sellers",
		"age": 51,
		"id": 18
	},
	{
		"firstname": "Olga",
		"lastname": "Weber",
		"age": 69,
		"id": 19
	},
	{
		"firstname": "Lara",
		"lastname": "Norman",
		"age": 48,
		"id": 20
	},
	{
		"firstname": "Tasha",
		"lastname": "Luna",
		"age": 41,
		"id": 21
	},
	{
		"firstname": "Clarke",
		"lastname": "Mcgee",
		"age": 21,
		"id": 22
	},
	{
		"firstname": "Dante",
		"lastname": "Wyatt",
		"age": 52,
		"id": 23
	},
	{
		"firstname": "Vladimir",
		"lastname": "Navarro",
		"age": 86,
		"id": 24
	},
	{
		"firstname": "Ray",
		"lastname": "Kane",
		"age": 93,
		"id": 25
	},
	{
		"firstname": "Ryan",
		"lastname": "Booker",
		"age": 88,
		"id": 26
	},
	{
		"firstname": "Valentine",
		"lastname": "Nelson",
		"age": 53,
		"id": 27
	},
	{
		"firstname": "Willow",
		"lastname": "Anthony",
		"age": 76,
		"id": 28
	},
	{
		"firstname": "Philip",
		"lastname": "Buck",
		"age": 92,
		"id": 29
	},
	{
		"firstname": "Gavin",
		"lastname": "Griffin",
		"age": 68,
		"id": 30
	},
	{
		"firstname": "Len",
		"lastname": "Clarke",
		"age": 72,
		"id": 31
	},
	{
		"firstname": "Lara",
		"lastname": "Underwood",
		"age": 93,
		"id": 32
	},
	{
		"firstname": "Robert",
		"lastname": "Munoz",
		"age": 28,
		"id": 33
	},
	{
		"firstname": "Constance",
		"lastname": "Rosario",
		"age": 67,
		"id": 34
	},
	{
		"firstname": "Alana",
		"lastname": "Mccormick",
		"age": 99,
		"id": 35
	},
	{
		"firstname": "Yoshio",
		"lastname": "Barlow",
		"age": 27,
		"id": 36
	},
	{
		"firstname": "Adria",
		"lastname": "Miller",
		"age": 47,
		"id": 37
	},
	{
		"firstname": "Nigel",
		"lastname": "Hardin",
		"age": 46,
		"id": 38
	},
	{
		"firstname": "Madeline",
		"lastname": "Rowland",
		"age": 44,
		"id": 39
	},
	{
		"firstname": "Kylan",
		"lastname": "Strong",
		"age": 23,
		"id": 40
	},
	{
		"firstname": "Jeremy",
		"lastname": "Cooper",
		"age": 26,
		"id": 41
	},
	{
		"firstname": "Bevis",
		"lastname": "Blevins",
		"age": 96,
		"id": 42
	},
	{
		"firstname": "Ignacia",
		"lastname": "Ward",
		"age": 86,
		"id": 43
	},
	{
		"firstname": "Wendy",
		"lastname": "Horton",
		"age": 29,
		"id": 44
	},
	{
		"firstname": "Justine",
		"lastname": "Huffman",
		"age": 41,
		"id": 45
	},
	{
		"firstname": "Forrest",
		"lastname": "Cabrera",
		"age": 94,
		"id": 46
	},
	{
		"firstname": "Matthew",
		"lastname": "Peck",
		"age": 30,
		"id": 47
	},
	{
		"firstname": "Noble",
		"lastname": "Tate",
		"age": 85,
		"id": 48
	},
	{
		"firstname": "Eleanor",
		"lastname": "Gardner",
		"age": 81,
		"id": 49
	},
	{
		"firstname": "Justin",
		"lastname": "Jenkins",
		"age": 88,
		"id": 50
	},
	{
		"firstname": "Iola",
		"lastname": "Patrick",
		"age": 85,
		"id": 51
	},
	{
		"firstname": "Amery",
		"lastname": "Burch",
		"age": 93,
		"id": 52
	},
	{
		"firstname": "Jillian",
		"lastname": "Jensen",
		"age": 33,
		"id": 53
	},
	{
		"firstname": "Cairo",
		"lastname": "Herring",
		"age": 93,
		"id": 54
	},
	{
		"firstname": "Julian",
		"lastname": "Lindsay",
		"age": 57,
		"id": 55
	},
	{
		"firstname": "Naomi",
		"lastname": "Acosta",
		"age": 72,
		"id": 56
	},
	{
		"firstname": "Alexa",
		"lastname": "Lawson",
		"age": 45,
		"id": 57
	},
	{
		"firstname": "Madonna",
		"lastname": "Casey",
		"age": 61,
		"id": 58
	},
	{
		"firstname": "Bevis",
		"lastname": "Rutledge",
		"age": 71,
		"id": 59
	},
	{
		"firstname": "Stacey",
		"lastname": "Wright",
		"age": 21,
		"id": 60
	},
	{
		"firstname": "Madeson",
		"lastname": "Hansen",
		"age": 38,
		"id": 61
	},
	{
		"firstname": "Ezekiel",
		"lastname": "Boone",
		"age": 48,
		"id": 62
	},
	{
		"firstname": "Felicia",
		"lastname": "Fletcher",
		"age": 43,
		"id": 63
	},
	{
		"firstname": "Tobias",
		"lastname": "Ochoa",
		"age": 98,
		"id": 64
	},
	{
		"firstname": "Kennedy",
		"lastname": "Sharp",
		"age": 53,
		"id": 65
	},
	{
		"firstname": "Raphael",
		"lastname": "Brown",
		"age": 59,
		"id": 66
	},
	{
		"firstname": "Mannix",
		"lastname": "Estrada",
		"age": 90,
		"id": 67
	},
	{
		"firstname": "Cameron",
		"lastname": "Le",
		"age": 88,
		"id": 68
	},
	{
		"firstname": "Veronica",
		"lastname": "Roach",
		"age": 71,
		"id": 69
	},
	{
		"firstname": "Uta",
		"lastname": "Mitchell",
		"age": 22,
		"id": 70
	},
	{
		"firstname": "Francesca",
		"lastname": "Schroeder",
		"age": 35,
		"id": 71
	},
	{
		"firstname": "Hamish",
		"lastname": "Cash",
		"age": 63,
		"id": 72
	},
	{
		"firstname": "Zephr",
		"lastname": "Valentine",
		"age": 65,
		"id": 73
	},
	{
		"firstname": "Quin",
		"lastname": "Hoover",
		"age": 18,
		"id": 74
	},
	{
		"firstname": "Ariel",
		"lastname": "Ellis",
		"age": 41,
		"id": 75
	},
	{
		"firstname": "Alec",
		"lastname": "O'brien",
		"age": 50,
		"id": 76
	},
	{
		"firstname": "Emerson",
		"lastname": "Brock",
		"age": 71,
		"id": 77
	},
	{
		"firstname": "Raja",
		"lastname": "Valencia",
		"age": 91,
		"id": 78
	},
	{
		"firstname": "Chastity",
		"lastname": "Bonner",
		"age": 42,
		"id": 79
	},
	{
		"firstname": "Sigourney",
		"lastname": "Hopkins",
		"age": 39,
		"id": 80
	},
	{
		"firstname": "Aurelia",
		"lastname": "Barker",
		"age": 78,
		"id": 81
	},
	{
		"firstname": "Alexander",
		"lastname": "Gomez",
		"age": 26,
		"id": 82
	},
	{
		"firstname": "Travis",
		"lastname": "Boone",
		"age": 41,
		"id": 83
	},
	{
		"firstname": "Elmo",
		"lastname": "Cummings",
		"age": 53,
		"id": 84
	},
	{
		"firstname": "Allistair",
		"lastname": "Whitehead",
		"age": 83,
		"id": 85
	},
	{
		"firstname": "Ezra",
		"lastname": "Byers",
		"age": 47,
		"id": 86
	},
	{
		"firstname": "Jenna",
		"lastname": "Bishop",
		"age": 67,
		"id": 87
	},
	{
		"firstname": "Deirdre",
		"lastname": "Shannon",
		"age": 57,
		"id": 88
	},
	{
		"firstname": "Calvin",
		"lastname": "Chan",
		"age": 29,
		"id": 89
	},
	{
		"firstname": "Geoffrey",
		"lastname": "Dickson",
		"age": 95,
		"id": 90
	},
	{
		"firstname": "Zeus",
		"lastname": "Castaneda",
		"age": 33,
		"id": 91
	},
	{
		"firstname": "Ivy",
		"lastname": "Coleman",
		"age": 31,
		"id": 92
	},
	{
		"firstname": "Dennis",
		"lastname": "Acosta",
		"age": 38,
		"id": 93
	},
	{
		"firstname": "Gail",
		"lastname": "Wilson",
		"age": 70,
		"id": 94
	},
	{
		"firstname": "Dennis",
		"lastname": "Guthrie",
		"age": 68,
		"id": 95
	},
	{
		"firstname": "Sage",
		"lastname": "Hill",
		"age": 77,
		"id": 96
	},
	{
		"firstname": "Rafael",
		"lastname": "Holden",
		"age": 34,
		"id": 97
	},
	{
		"firstname": "Kirk",
		"lastname": "Wiley",
		"age": 23,
		"id": 98
	},
	{
		"firstname": "Hillary",
		"lastname": "Bradshaw",
		"age": 39,
		"id": 99
	},
	{
		"firstname": "Micah",
		"lastname": "Morales",
		"age": 29,
		"id": 100
	}
	]	
	})
	
	const removeContact = (id) => {
		setState((state) => {
			let tempList = state.data.filter(contact => contact.id !== id);
			return {
				data:tempList
			}
		})
	}
	
	return(
		<View>
			<FlatList data={state.data}
					  renderItem={({item}) => {
						  return(
							  <View style={styles.rowStyle}>
								<Text style={styles.textStyle}>
									{item.firstname} {item.lastname}, {item.age}
								</Text>
								<Pressable style={styles.buttonStyle}
										onPress={() => removeContact(item.id)}>
										<Text>Remove</Text>
								</Pressable>
							  </View>
						  )
					  }
					  }
					  keyExtractor={item => ""+item.id}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	rowStyle:{
		flexDirection:"row",
		height:60,
		alignItems:"center",
		justifyContent:"space-around"
	},
	textStyle:{
		fontFamily:"sans-serif",
		fontSize:18,
		fontWeight:"bold"
	},
	buttonStyle:{
		width:80,
		height:50,
		borderRadius:5,
		backgroundColor:"red",
		alignItems:"center",
		justifyContent:"center"
	}
})

export default ContactList;