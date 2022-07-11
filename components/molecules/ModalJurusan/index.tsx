/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-case-declarations */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, ChangeEvent, SyntheticEvent } from 'react';
import { Container, Row, Button, Modal, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

import Input from '../../atoms/Input';
import Checkbox from '../../atoms/Checkbox';
import ModalHeader from '../../atoms/ModalHeader';
import ColorPicker from '../../atoms/ColorPicker';
import { storeJurusan, updateJurusan } from '../../../services/jurusan';

interface ModalJurusanProps {
	show: Boolean;
	handleClose: any;
	prefix?: string;
	suffix?: string;
	id?: string;
	payload?: any;
}

export default function ModalJurusan(props: Partial<ModalJurusanProps>) {
	const { show, handleClose, prefix, payload } = props;

	const [formData, setFormData] = useState({
		_id: '',
		bidangKeahlian: '',
		programKeahlian: '',
		paketKeahlian: '',
		singkatan: '',
		kode: '',
		warna: '#c3c3c3',
		status: 'Y',
	});

	const [checkBoxStatus, setCheckBoxStatus] = useState(true);
	const [field, setField] = useState({});

	const getJurusan = (data: any) => {
		setFormData(data);
		const checkAktif = data.status;
		// console.log('checkAktif', checkAktif);
		if (checkAktif === 'Y') {
			setCheckBoxStatus(true);
		} else if (checkAktif === 'N') {
			setCheckBoxStatus(false);
		}
		// console.log('checkBoxStatus', checkBoxStatus);
	};

	useEffect(() => {
		if (payload) {
			getJurusan(payload);
		}
	}, [payload]);

	function resetForm() {
		setFormData({
			_id: '',
			bidangKeahlian: '',
			programKeahlian: '',
			paketKeahlian: '',
			singkatan: '',
			kode: '',
			warna: '#c3c3c3',
			status: 'Y',
		});
	}

	function handleChange(e: ChangeEvent<HTMLInputElement>): void {
		const target = e.target as any;
		setFormData((prev: any) => ({
			...prev,
			[target.name]: target.type === 'file' ? target.files : target.value,
		}));
	}

	const handleCb = (e: ChangeEvent<HTMLInputElement>): void => {
		const target = e.target as any;
		// console.log('target.checked', target.checked);
		setCheckBoxStatus(() => target.checked);
		// console.log('checkBoxStatus: ', checkBoxStatus);

		if (target.checked) {
			setFormData((prev: any) => ({ ...prev, status: 'Y' }));
		} else {
			setFormData((prev: any) => ({ ...prev, status: 'N' }));
		}
	};

	const onSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();
		setField({});

		// const data = new FormData(e.target as any);
		// for (var [key, value] of data.entries() as any) {
		// 	console.log(key, value);
		// }
		switch (prefix) {
			case 'Tambah':
				const storeResponse = (await storeJurusan(formData)) as any;
				// console.log(`storeRes`, storeResponse);
				if (storeResponse.error) {
					toast.error('Data Gagal Ditambahkan');
					setField(storeResponse.fields);
				} else {
					toast.success('Data Berhasil Ditambahkan!');
					resetForm();
					handleClose();
				}
				break;

			case 'Edit':
				const updateResponse = (await updateJurusan(formData, payload._id)) as any;
				// console.log('updateResponse', updateResponse);
				if (updateResponse.error) {
					toast.error('Data Gagal Disimpan');
					setField(updateResponse.fields);
				} else {
					toast.success('Data Berhasil Disimpan!');
					resetForm();
					handleClose();
				}
				break;

			default:
				break;
		}
	};
	return (
		<>
			<Modal show={!!show} onHide={handleClose} centered>
				<ModalHeader prefix={prefix} suffix='Jurusan' />
				<Form noValidate onSubmit={onSubmit} id='form-jurusan'>
					<Modal.Body>
						<Container>
							<Row>
								<Input
									label='Bidang Keahlian'
									placeholder='Masukkan bidang keahlian'
									name='bidangKeahlian'
									value={formData.bidangKeahlian}
									onChange={handleChange}
									fieldstate={field}
									required
								/>
								<Input
									label='Program Keahlian'
									placeholder='Masukkan program keahlian'
									name='programKeahlian'
									value={formData.programKeahlian}
									onChange={handleChange}
									fieldstate={field}
									required
								/>
								<Input
									label='Paket Keahlian'
									placeholder='Masukkan paket keahlian'
									name='paketKeahlian'
									value={formData.paketKeahlian}
									onChange={handleChange}
									fieldstate={field}
									required
								/>
								<Input
									label='Singkatan'
									placeholder='Masukkan singkatan'
									name='singkatan'
									value={formData.singkatan}
									onChange={handleChange}
									fieldstate={field}
									required
								/>
								{prefix === 'Tambah' && (
									<Input
										label='Kode'
										placeholder='Masukkan kode'
										name='kode'
										value={formData.kode}
										onChange={handleChange}
										fieldstate={field}
										required
									/>
								)}
								<ColorPicker
									label='Warna'
									name='warna'
									type='color'
									placeholder='Pilih Warna Jurusan'
									value={formData.warna}
									// defaultValue={formData.warna}
									onChange={handleChange}
								/>
								<Checkbox
									label='Status Jurusan'
									labelcheck='Aktif'
									name='status'
									type='checkbox'
									value={formData.status}
									// defaultChecked={checkBoxStatus}
									checked={checkBoxStatus}
									onChange={handleCb}
									fieldstate={field}
									required
								/>
							</Row>
						</Container>
					</Modal.Body>
					<Modal.Footer>
						<Button variant='outline-dark' onClick={handleClose}>
							<i className='fa-solid fa-xmark' /> Batal
						</Button>
						<Button variant={prefix === 'Tambah' ? 'primary' : 'success'} type='submit'>
							<i className='fa-solid fa-check' /> Simpan
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	);
}
