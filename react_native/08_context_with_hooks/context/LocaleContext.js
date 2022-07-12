import React from 'react';

export const localizations = {
	en:{
		type:"Type",
		count:"Count",
		price:"Price",
		add:"Add",
		remove:"Remove",
		addbutton:"Add new item"
	},
	fi:{
		type:"Esine",
		count:"Määrä",
		price:"Hinta",
		add:"Lisää",
		remove:"Poista",
		addbutton:"Lisää uusi"
	}	
}

const LocaleContext = React.createContext(localizations.en);

export default LocaleContext;