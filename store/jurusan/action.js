export const JurusanActionType = {
	GET: 'GET',
	ADD: 'ADD',
};

export const getJurusan = (newData) => ({ type: JurusanActionType.GET, payload: newData });

export const addJurusan = (newData) => ({ type: JurusanActionType.ADD, payload: newData });
