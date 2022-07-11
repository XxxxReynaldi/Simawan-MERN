/* eslint-disable react/jsx-no-bind */

import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../../styles/Register.module.css';
import sButton from '../../styles/Button.module.css';

import Gap from '../../components/atoms/Gap';
import Input from '../../components/atoms/Input';
import DoubleInput from '../../components/molecules/DoubleInput';

import { setSignUp } from '../../services/auth';
// import { RegisterTypes } from '../../services/Data-types';

export default function Register() {
	const [formData, setFormData] = useState({
		namaLengkap: '',
		NISN: '',
		tempatLahir: '',
		tanggalLahir: '',
		namaIbu: '',
		email: '',
		password: '',
		telp: '',
		foto: 'default.jpg',
	});

	const [field, setField] = useState({});

	function handleChange(e: ChangeEvent<HTMLInputElement>): void {
		const target = e.target as any;
		setFormData((prev: any) => ({
			...prev,
			[target.name]: target.type === 'file' ? target.files : target.value,
		}));
	}

	const router = useRouter();

	const onSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();
		setField({});

		const data = new FormData(e.target as any);
		const response = (await setSignUp(data)) as any;
		if (response.error) {
			// toast.error(response.message);
			setField(response.fields);
		} else {
			toast.success('Pendaftaran Berhasil');
			router.push('/');
		}
	};

	useEffect(() => {
		document.title = `Halaman Pendaftaran Siswa`;
		return () => {
			document.title = `MERN Stack`;
		};
	});
	return (
		<Container>
			<Row className='justify-content-md-center'>
				<Col md={{ span: 10 }}>
					<Card className={styles.card}>
						<Card.Body>
							<Card.Title>
								<h3 className={styles.title}>Sign Up</h3>
							</Card.Title>
							<Gap height={30} />
							<Form noValidate onSubmit={onSubmit} id='form-register'>
								<Container>
									<Row>
										<Col xs={6}>
											<Input
												label='Nama Lengkap'
												placeholder='Masukkan nama lengkap'
												name='namaLengkap'
												value={formData.namaLengkap}
												onChange={handleChange}
												fieldstate={field}
												required
											/>
											<Input
												label='NISN'
												placeholder='Masukkan NISN'
												name='NISN'
												value={formData.NISN}
												onChange={handleChange}
												fieldstate={field}
												required
											/>
											<DoubleInput
												label='Tempat Lahir / Tanggal Lahir'
												col1={7}
												col2={5}
												type2='date'
												placeholder1='Masukkan tempat lahir'
												placeholder2='Masukkan tanggal lahir'
												name1='tempatLahir'
												name2='tanggalLahir'
												val1={formData.tempatLahir}
												val2={formData.tanggalLahir}
												onChange1={handleChange}
												onChange2={handleChange}
												fieldstate={field}
											/>
											<Input
												label='Nama Ibu'
												placeholder='Masukkan nama ibu'
												name='namaIbu'
												value={formData.namaIbu}
												onChange={handleChange}
												fieldstate={field}
												required
											/>
										</Col>

										<Col xs={6}>
											<Input
												label='Email'
												placeholder='Masukkan email'
												name='email'
												type='email'
												value={formData.email}
												onChange={handleChange}
												fieldstate={field}
												required
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
											/>
											<Input
												label='Telp'
												placeholder='Masukkan telp'
												name='telp'
												type='number'
												value={formData.telp}
												onChange={handleChange}
												fieldstate={field}
												required
											/>
										</Col>

										<Gap height={30} />
										<Button className={sButton['btn-primary']} type='submit'>
											Submit
										</Button>

										<Gap height={20} />
										<p className={styles['text-info']} style={{ textAlign: 'center' }}>
											Sudah punya akun?
											<Link href='/'>
												<a> Login disini</a>
											</Link>
										</p>
									</Row>
								</Container>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}
