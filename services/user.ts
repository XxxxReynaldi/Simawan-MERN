import { callAPI, callAuthAPI } from '../config/api';
import { AdminProfileTypes, PasswordChangeTypes } from './Data-types';

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = `api/v1`;

export async function getDataUser(id: string) {
	const url = `${ROOT_API}/${API_VERSION}/user/show-profile/${id}`;

	return callAPI({ url, method: 'GET' });
}

export async function updateProfile(data: AdminProfileTypes, id: string) {
	const url = `${ROOT_API}/${API_VERSION}/user/update-profile/${id}`;

	return callAPI({ url, method: 'PATCH', data });
}

export async function updatePassword(data: PasswordChangeTypes, id: string) {
	const url = `${ROOT_API}/${API_VERSION}/user/update-password/${id}`;

	return callAuthAPI({ url, method: 'PATCH', data });
}

export async function updatePhoto(data: FormData, id: string) {
	const url = `${ROOT_API}/${API_VERSION}/user/update-photo/${id}`;

	return callAuthAPI({ url, method: 'PATCH', data });
}

export async function removePhoto(id: string) {
	const url = `${ROOT_API}/${API_VERSION}/user/remove-photo/${id}`;

	return callAuthAPI({ url, method: 'PATCH' });
}
