import { callAPI } from '../config/api';
import { JurusanTypes } from './Data-types';

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = 'api/v1';

export async function storeJurusan(data: JurusanTypes) {
	const url = `${ROOT_API}/${API_VERSION}/jurusan/store`;

	return callAPI({ url, method: 'POST', data });
}

export async function getAllJurusan() {
	const url = `${ROOT_API}/${API_VERSION}/jurusan`;

	return callAPI({ url, method: 'GET' });
}

export async function showJurusan(id: string) {
	const url = `${ROOT_API}/${API_VERSION}/jurusan/show/${id}`;

	return callAPI({ url, method: 'GET' });
}

export async function updateJurusan(data: JurusanTypes, id: string) {
	const url = `${ROOT_API}/${API_VERSION}/jurusan/update/${id}`;

	return callAPI({ url, method: 'PATCH', data });
}

export async function destroyJurusan(id: string) {
	const url = `${ROOT_API}/${API_VERSION}/jurusan/destroy/${id}`;

	return callAPI({ url, method: 'DELETE' });
}

export async function statusJurusan(id: string) {
	const url = `${ROOT_API}/${API_VERSION}/jurusan/status/${id}`;

	return callAPI({ url, method: 'PATCH' });
}
