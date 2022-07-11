import { callAPI } from '../config/api';
import { PelanggaranTypes } from './Data-types';

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = 'api/v1';

export async function storePelanggaran(data: PelanggaranTypes) {
	const url = `${ROOT_API}/${API_VERSION}/pelanggaran/store`;

	return callAPI({ url, method: 'POST', data });
}

export async function getAllPelanggaran() {
	const url = `${ROOT_API}/${API_VERSION}/pelanggaran`;

	return callAPI({ url, method: 'GET' });
}

export async function showPelanggaran(id: string) {
	const url = `${ROOT_API}/${API_VERSION}/pelanggaran/show/${id}`;

	return callAPI({ url, method: 'GET' });
}

export async function updatePelanggaran(data: PelanggaranTypes, id: string) {
	const url = `${ROOT_API}/${API_VERSION}/pelanggaran/update/${id}`;

	return callAPI({ url, method: 'PATCH', data });
}

export async function destroyPelanggaran(id: string) {
	const url = `${ROOT_API}/${API_VERSION}/pelanggaran/destroy/${id}`;

	return callAPI({ url, method: 'DELETE' });
}

export async function statusPelanggaran(id: string) {
	const url = `${ROOT_API}/${API_VERSION}/pelanggaran/status/${id}`;

	return callAPI({ url, method: 'PATCH' });
}
