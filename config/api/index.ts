import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

interface CallAPIProps extends AxiosRequestConfig {
	token?: boolean;
	serverToken?: string;
}

export async function callAuthAPI({ url, method, data, token, serverToken }: CallAPIProps) {
	let headers = {};
	if (serverToken) {
		headers = {
			Authorization: `Bearer ${serverToken}`,
		};
	} else if (token) {
		const tokenCookies = Cookies.get('token');
		if (tokenCookies) {
			const jwtToken = atob(tokenCookies);
			headers = {
				Authorization: `Bearer ${jwtToken}`,
			};
		}
	}
	const response = await axios({
		url,
		method,
		data,
		headers,
	}).catch((err) => err.response);

	console.log('response callAPI', response);

	if (response.status > 300) {
		const res = {
			error: true,
			message: response.data.message,
			fields: response.data.fields,
			data: null,
		};
		return res;
	}

	const { length } = Object.keys(response.data);
	const res = {
		error: false,
		message: 'success',
		data: length > 1 ? response.data : response.data.data,
	};

	return res;
}

export async function callAPI({ url, method, data, token, serverToken }: CallAPIProps) {
	let headers = {};
	if (serverToken) {
		headers = {
			Authorization: `Bearer ${serverToken}`,
		};
	} else if (token) {
		const tokenCookies = Cookies.get('token');
		if (tokenCookies) {
			const jwtToken = atob(tokenCookies);
			headers = {
				Authorization: `Bearer ${jwtToken}`,
			};
		}
	}

	const response = await axios({ url, method, data, headers }).catch((err) => err.response);

	console.log('response callAPI', response);

	if (response.status > 300) {
		const res = {
			error: true,
			message: response.data.data.message,
			fields: response.data.data.errors,
		};
		return res;
	}

	const { length } = Object.keys(response.data);
	const res = {
		error: false,
		message: 'success',
		data: length > 1 ? response.data : response.data.data,
	};

	return res;
}
