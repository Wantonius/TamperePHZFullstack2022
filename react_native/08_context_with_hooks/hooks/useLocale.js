import {useContext} from 'react';
import LocaleContext from '../context/LocaleContext';

const useLocale = () => {
	return useContext(LocaleContext);
}

export default useLocale;