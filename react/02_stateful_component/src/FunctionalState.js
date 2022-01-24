import {useState,useEffect} from 'react';

const FunctionalState = (props) => {
	
	const [state,setState] = useState({
		seconds:0
	});
	
	useEffect(() => {
		let interval = setInterval(() => setState(state => {
			return {
				seconds:state.seconds+1
			}
		}),1000)
		
		return () => clearInterval(interval);
	},[])
	
	return(
		<h3>Functional seconds since page loaded:{state.seconds}</h3>
	)
}

export default FunctionalState;