import {useContext} from 'react';
import AppStateContext from '../context/AppStateContext';

const useAppState = () => {
	return useContext(AppStateContext);
}

export const useAppState;