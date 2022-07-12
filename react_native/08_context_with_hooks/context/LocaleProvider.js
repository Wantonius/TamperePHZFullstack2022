import {useState} from 'react';
import LocaleContext,{localizations} from './LocaleContext';

const LocaleProvider = (props) => {
	
	const [state,setState] = useState({
		locale:localizations.en
	});
	
	const changeLocale = (locale) => {
		if(locale === "en") {
			setState({
				locale:localizations.en
			})
		}
		if(locale === "fi") {
			setState({
				locale:localizations.fi
			})
		}
	}
	
	return (
		<LocaleContext.Provider value={{
			strings:state.locale,
			changeLocale:changeLocale
		}}>
		{props.children}
		</LocaleContext.Provider>
	)
}

export default LocaleProvider;