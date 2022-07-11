/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import { SyntheticEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';

import { JWTPayloadTypes, UserPayloadTypes } from '../../../services/Data-types';
import { getDataUser } from '../../../services/user';

const API_IMG = process.env.NEXT_PUBLIC_IMG;

export default function Auth() {
	const [isLogin, setIsLogin] = useState(false);

	const [dataUser, setDataUser] = useState({ namaLengkap: '', role: '', foto: 'default.jpg' });

	const router = useRouter();

	const getUser = async (payload: any) => {
		const response = (await getDataUser(payload.id)) as any;
		const { data } = response.data;
		const { namaLengkap, role, foto } = data;
		setDataUser((prev: any) => ({
			...prev,
			namaLengkap,
			role,
			foto,
		}));
	};

	useEffect(() => {
		const token = Cookies.get('token');
		if (token) {
			const jwtToken = atob(token);
			const payload: JWTPayloadTypes = jwtDecode(jwtToken);
			const userFromPayload: UserPayloadTypes = payload.user;
			setIsLogin(true);
			getUser(userFromPayload);
		}
	}, []);

	const onLogout = (e: SyntheticEvent): void => {
		e.preventDefault();

		Cookies.remove('token');
		router.push('/');
		setIsLogin(false);
	};

	if (isLogin) {
		return (
			<li className='profile'>
				<div className='profile-details'>
					<img className='profile-img' src={`${API_IMG}/user/${dataUser.foto}`} alt='profileImg' />
					<div className='name_job'>
						<div className='name'>{dataUser.namaLengkap}</div>
						<div className='job'>{dataUser.role}</div>
					</div>
				</div>
				<a onClick={onLogout} style={{ cursor: 'pointer' }}>
					<i className='bx bx-log-out' id='log_out' />
				</a>
			</li>
		);
	}
	return (
		<li className='profile'>
			<div className='profile-details'>
				<img className='profile-img' src='/img/profile.jpg' alt='profileImg' />
				<div className='name_job'>
					<div className='name'>user</div>
					<div className='job'>role</div>
				</div>
			</div>
			<Link href='/'>
				<a style={{ cursor: 'pointer' }}>
					<i className='bx bx-log-out' id='log_out' />
				</a>
			</Link>
		</li>
	);
}
