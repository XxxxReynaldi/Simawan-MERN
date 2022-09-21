/* eslint-disable dot-notation */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-no-useless-fragment */
import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Cookies from 'js-cookie';

import sLogin from '../../styles/Login.module.css';

import Gap from '../../components/atoms/Gap';
import Input from '../../components/atoms/Input';

import { setSignIn } from '../../services/auth';

export default function Login() {
	const [formData, setFormData] = useState({ email: '', password: '' });
	const [field, setField] = useState({});
	const router = useRouter();

	function handleChange(e: ChangeEvent<HTMLInputElement>): void {
		const target = e.target as any;
		setFormData((prev: any) => ({
			...prev,
			[target.name]: target.type === 'file' ? target.files : target.value,
		}));
	}

	const onSubmit = async (e: SyntheticEvent) => {
		// console.log('process.env.NEXT_PUBLIC_API', process.env.NEXT_PUBLIC_API);
		e.preventDefault();
		setField({});

		const response = (await setSignIn(formData)) as any;
		if (response.error) {
			toast.error(response.message);
			setField(response.fields);
		} else {
			toast.success('Login Berhasil');
			const { token } = response.data;
			const tokenBase64 = btoa(token);
			Cookies.set('token', tokenBase64, { expires: 1 });
			router.push('/admin/kelas');
		}
	};
	useEffect(() => {
		document.title = `MERN | Halaman Login `;
		return () => {
			document.title = `MERN Stack`;
		};
	});
	return (
		<>
			<Card className={sLogin['card']}>
				<Card.Body>
					<Card.Title>
						<h3 className={sLogin.title}>Sign In </h3>
					</Card.Title>
					<Gap height={30} />
					<Form onSubmit={onSubmit} id='form-login'>
						<Input
							label='Email'
							placeholder='Masukkan email'
							name='email'
							type='email'
							value={formData.email}
							onChange={handleChange}
							fieldstate={field}
							required
							className={sLogin.input}
						/>
						<Input
							label='Password'
							placeholder='Masukkan password'
							name='password'
							type='password'
							value={formData.password}
							onChange={handleChange}
							fieldstate={field}
							required
							className={sLogin.input}
						/>
						{/* <p className={sLogin['text-info']} style={{ textAlign: 'right' }}>
							<a href='#'>lupa password?</a>
						</p> */}
						<Gap height={30} />
						{/* <Link href='/admin' passHref> */}
						<Button className={sLogin['btn']} variant='custom' type='submit'>
							Submit
						</Button>
						{/* </Link> */}
						<Gap height={20} />
						<p className={sLogin['text-info']} style={{ textAlign: 'center' }}>
							Belum punya akun?
							<Link href='/auth/register'>
								<a> Buat akun disini</a>
							</Link>
						</p>
					</Form>
				</Card.Body>
			</Card>
		</>
	);
}
