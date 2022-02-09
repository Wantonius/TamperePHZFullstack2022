//ASYNC ACTION

export const getList = () => {
	return async (dispatch) => {
		let request = {
			method:"GET",
			mode:"cors",
			headers:{"Content-type":"application/json"}
		}
		let response = await fetch("/api/contact",request);
		if(response.ok) {
			let data = await response.json();
			dispatch({
				type:"GET_LIST",
				list:data
			})
		} else {
			dispatch({
				type:"ERROR",
				error:"Server responded with a status "+response.statusText
			})
		}
	}
}

export const addContact = (contact) => {
	return async (dispatch) => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json"},
			body:JSON.stringify(contact)
		}
		let response = await fetch("/api/contact",request);
		if(response.ok) {
			dispatch(getList());
			dispatch({
				type:"ADD_CONTACT"
			})
		} else {
			dispatch({
				type:"ERROR",
				error:"Server responded with a status "+response.statusText
			})
		}
	}
}

export const removeContact = (id) => {
	return async (dispatch) => {
		let request = {
			method:"DELETE",
			mode:"cors",
			headers:{"Content-type":"application/json"}
		}
		let response = await fetch("/api/contact/"+id,request);
		if(response.ok) {
			dispatch(getList());
			dispatch({
				type:"REMOVE_CONTACT"
			})
		} else {
			dispatch({
				type:"ERROR",
				error:"Server responded with a status "+response.statusText
			})
		}
	}
}