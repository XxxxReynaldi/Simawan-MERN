import { JurusanActionType } from './action';

const JurusanInitialState = {
	jurusanList: [],
};

export default function reducer(state = JurusanInitialState, action) {
	switch (action.type) {
		case JurusanActionType.GET: {
			return { ...state, jurusanList: action.payload };
		}
		case JurusanActionType.ADD: {
			// console.log('action.payload', action.payload);
			const newData = action.payload;
			const add = (state) => ({ ...state, newData });
			return add;
			// return { ...state, action.payload };
		}
		default:
			return state;
	}
}
