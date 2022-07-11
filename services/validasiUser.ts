import { callAPI } from '../config/api';

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = 'api/v1';

export async function generateNIS(data: any) {
	const url = `${ROOT_API}/${API_VERSION}/user/generate-nis`;

	return callAPI({ url, method: 'POST', data });
}

export async function validation(data: any, id: string) {
	const url = `${ROOT_API}/${API_VERSION}/user/validation/${id}`;

	return callAPI({ url, method: 'PATCH', data });
}

export async function getAllValidation(data: any) {
	const url = `${ROOT_API}/${API_VERSION}/user/validation`;

	return callAPI({ url, method: 'POST', data });
}

export async function destroyUser(id: string) {
	const url = `${ROOT_API}/${API_VERSION}/user/destroy/${id}`;

	return callAPI({ url, method: 'DELETE' });
}
