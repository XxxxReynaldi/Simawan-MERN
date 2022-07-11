/* eslint-disable max-len */
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { composeWithDevTools } from '@redux-devtools/extension';
import jurusan from './jurusan/reducer';
import kelas from './kelas/reducer';

const combinedReducer = combineReducers({ jurusan });

const masterReducer = (state, action) => {
	if (action.type === HYDRATE) {
		const nextState = {
			...state,
			jurusanList: [...action.payload.jurusan.jurusanList, ...state.jurusan.jurusanList],
			// jurusanList: [...new Set([...action.payload.jurusan.jurusanList, ...state.jurusan.jurusanList])],
		};
		// console.log('nextState jurusanList', nextState.jurusanList);
		return nextState;
	}
	return combinedReducer(state, action);
};

const initStore = () => {
	return createStore(masterReducer, composeWithDevTools(applyMiddleware()));
};

export const wrapper = createWrapper(initStore);
