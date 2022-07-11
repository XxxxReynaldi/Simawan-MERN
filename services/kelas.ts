import { callAPI } from '../config/api';
import { KelasTypes } from './Data-types';

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = 'api/v1';

export async function storeKelas(data: KelasTypes) {
	const url = `${ROOT_API}/${API_VERSION}/kelas/store`;

	return callAPI({ url, method: 'POST', data });
}

export async function getAllKelas() {
	const url = `${ROOT_API}/${API_VERSION}/kelas`;

	return callAPI({ url, method: 'GET' });
}

export async function getKelasByFilter(tahunAjaran: any, tingkatan?: string) {
	let url = '';
	if (tahunAjaran && tingkatan === undefined) {
		url += `${ROOT_API}/${API_VERSION}/kelas/find/${tahunAjaran}`;
	}
	if (tahunAjaran && tingkatan) {
		url += `${ROOT_API}/${API_VERSION}/kelas/find/${tahunAjaran}/${tingkatan}`;
	}

	return callAPI({ url, method: 'GET' });
}

export async function showKelas(id: string) {
	const url = `${ROOT_API}/${API_VERSION}/kelas/show/${id}`;

	return callAPI({ url, method: 'GET' });
}

export async function updateKelas(data: KelasTypes, id: string) {
	const url = `${ROOT_API}/${API_VERSION}/kelas/update/${id}`;

	return callAPI({ url, method: 'PATCH', data });
}

export async function destroyKelas(id: string) {
	const url = `${ROOT_API}/${API_VERSION}/kelas/destroy/${id}`;

	return callAPI({ url, method: 'DELETE' });
}

export async function statusKelas(id: string) {
	const url = `${ROOT_API}/${API_VERSION}/kelas/status/${id}`;

	return callAPI({ url, method: 'PATCH' });
}
