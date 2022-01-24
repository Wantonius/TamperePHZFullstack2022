const HelloFunction = (props) => {

	let name = "World";
	if(props.name) {
		name = props.name;
	}
	return (
		<h2>Functional Hello {name} </h2>
	)
}

export default HelloFunction;