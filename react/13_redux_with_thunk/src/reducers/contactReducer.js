const initialState = {
	list:[],
	error:""
}

const contactReducer = (state = initialState, action) => {
	console.log(action);
	let tempList=[];
	switch(action.type) {
		case "GET_LIST":
			return {
				list:action.list,
				error:""
			}
		case "ADD_CONTACT":
			return {
				...state,
				error:""
			}
		case "REMOVE_CONTACT":
			return {
				...state,
				error:""
			}
		case "ERROR":
			return {
				...state,
				error:action.error
			}
		default:
			return state;
	}
}

export default contactReducer;