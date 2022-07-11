/* eslint-disable react/jsx-no-bind */
import { SyntheticEvent, ChangeEvent, useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import Input from '../../atoms/Input';
import { updateProfile } from '../../../services/user';

interface FormProfileProps {
	payload: any;
}

export default function FormProfile(props: Partial<FormProfileProps>) {
	const { payload } = props;

	const [formData, setFormData] = useState({
		_id: '',
		namaLengkap: '',
		email: '',
	});

	const [field, setField] = useState({});

	useEffect(() => {
		if (payload) {
			setFormData((prev: any) => ({
				...prev,
				_id: payload._id,
				namaLengkap: payload.namaLengkap,
				email: payload.email,
			}));
		}
	}, [payload]);

	function handleChange(e: ChangeEvent<HTMLInputElement>): void {
		const target = e.target as any;
		setFormData((prev: any) => ({
			...prev,
			[target.name]: target.type === 'file' ? target.files : target.value,
		}));
	}

	const onSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();
		setField({});

		const response = (await updateProfile(formData, payload._id)) as any;
		if (response.error) {
			toast.error('Data Gagal disimpan');
			setField(response.fields);
		} else {
			toast.success('Data Berhasil Disimpan');
		}
	};

	return (
		<Form className='cf' noValidate onSubmit={onSubmit} id='form-profile'>
			<Input
				label='Email'
				placeholder='Masukkan email'
				type='email'
				name='email'
				value={formData.email}
				onChange={handleChange}
				fieldstate={field}
				required
			/>
			<Input
				label='Nama'
				placeholder='Masukkan nama'
				name='namaLengkap'
				value={formData.namaLengkap}
				onChange={handleChange}
				fieldstate={field}
				required
			/>
			<Button className='mt-4 float-end' type='submit'>
				Simpan
			</Button>
		</Form>
	);
}
