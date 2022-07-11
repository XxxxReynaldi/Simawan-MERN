import { callAPI } from '../config/api';
import { SiswaTypes } from './Data-types';

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = 'api/v1';

export async function storeSiswa(data: SiswaTypes) {
	const url = `${ROOT_API}/${API_VERSION}/siswa/store`;

	return callAPI({ url, method: 'POST', data });
}

export async function getAllSiswa() {
	const url = `${ROOT_API}/${API_VERSION}/siswa`;

	return callAPI({ url, method: 'GET' });
}

export async function showSiswa(id: string) {
	const url = `${ROOT_API}/${API_VERSION}/siswa/show/${id}`;

	return callAPI({ url, method: 'GET' });
}

export async function updateSiswa(data: SiswaTypes, id: string) {
	const url = `${ROOT_API}/${API_VERSION}/siswa/update/${id}`;

	return callAPI({ url, method: 'PATCH', data });
}

export async function destroySiswa(id: string) {
	const url = `${ROOT_API}/${API_VERSION}/siswa/destroy/${id}`;

	return callAPI({ url, method: 'DELETE' });
}

export async function statusSiswa(id: string) {
	const url = `${ROOT_API}/${API_VERSION}/siswa/status/${id}`;

	return callAPI({ url, method: 'PATCH' });
}
