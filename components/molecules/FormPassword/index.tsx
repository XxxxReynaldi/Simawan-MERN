/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-no-bind */
import { SyntheticEvent, ChangeEvent, useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import InputGroup from '../../atoms/InputGroup';
import { updatePassword } from '../../../services/user';

interface FormPasswordProps {
	payload: any;
	edit?: any;
}

export default function FormPassword(props: Partial<FormPasswordProps>) {
	const { payload } = props;

	const [formData, setFormData] = useState({
		_id: '',
		oldPassword: '',
		newPassword: '',
		confirmPass: '',
	});

	const [passwordShow, setPasswordShow] = useState({
		oldPassword: false,
		newPassword: false,
		confirmPass: false,
	});

	useEffect(() => {
		if (payload) {
			setFormData((prev: any) => ({
				...prev,
				_id: payload._id,
				oldPassword: '',
				newPassword: '',
				confirmPass: '',
			}));
		}
	}, [payload]);

	type PasswordForm = 'oldPassword' | 'newPassword' | 'confirmPass';
	const togglePassword = (name: PasswordForm) => {
		setPasswordShow((prev: any) => ({ ...prev, [name]: !passwordShow[name] }));
	};

	const [field, setField] = useState({});

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

		const response = (await updatePassword(formData, payload._id)) as any;
		if (response.error) {
			toast.error('Data Gagal disimpan');
			setField(response.fields);
		} else {
			toast.success('Data Berhasil Disimpan');
		}
	};
	return (
		<Form noValidate onSubmit={onSubmit} id='form-password'>
			<InputGroup
				label='Password Lama'
				placeholder='Masukkan password lama'
				name='oldPassword'
				type={passwordShow.oldPassword ? 'text' : 'password'}
				value={formData.oldPassword}
				onChange={handleChange}
				fieldstate={field}
				iconsuffix={passwordShow.oldPassword ? 'fa fa-eye-slash' : 'fa fa-eye'}
				onclicksuffix={togglePassword}
				required
			/>
			<InputGroup
				label='Password Baru'
				placeholder='Masukkan password baru'
				type={passwordShow.newPassword ? 'text' : 'password'}
				name='newPassword'
				value={formData.newPassword}
				onChange={handleChange}
				fieldstate={field}
				iconsuffix={passwordShow.newPassword ? 'fa fa-eye-slash' : 'fa fa-eye'}
				onclicksuffix={togglePassword}
				required
			/>
			<InputGroup
				label='Konfirmasi Password'
				placeholder='Konfimasi password'
				type={passwordShow.confirmPass ? 'text' : 'password'}
				name='confirmPass'
				value={formData.confirmPass}
				onChange={handleChange}
				fieldstate={field}
				iconsuffix={passwordShow.confirmPass ? 'fa fa-eye-slash' : 'fa fa-eye'}
				onclicksuffix={togglePassword}
				required
			/>
			<Button className='mt-4 float-end' type='submit'>
				Simpan
			</Button>
		</Form>
	);
}
