import { KelasActionType } from './action';

const KelasInitialState = {
	kelass: [],
};

export default function reducer(state = KelasInitialState, action) {
	switch (action.type) {
		case KelasActionType.TAMBAH: {
			return { ...state, kelass: [...state.kelass, action.kelas] };
		}

		default:
			return state;
	}
}
