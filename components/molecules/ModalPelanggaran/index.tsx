/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-case-declarations */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, ChangeEvent, SyntheticEvent } from 'react';
import { Container, Row, Button, Modal, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

import Input from '../../atoms/Input';
import ModalHeader from '../../atoms/ModalHeader';
import Select from '../../atoms/Select';
import { storePelanggaran, updatePelanggaran } from '../../../services/pelanggaran';

interface ModalPelanggaranProps {
	show: Boolean;
	handleClose: any;
	prefix?: string;
	suffix?: string;
	id?: string;
	payload?: any;
}

export default function ModalPelanggaran(props: Partial<ModalPelanggaranProps>) {
	const { show, handleClose, prefix, payload } = props;

	const [field, setField] = useState({});

	const [formData, setFormData] = useState({
		_id: '',
		jenisPelanggaran: '',
		kategori: '',
		jumlahPoin: 0,
	});
	function handleChange(e: ChangeEvent<HTMLInputElement>): void {
		const target = e.target as any;
		setFormData((prev: any) => ({
			...prev,
			[target.name]: target.type === 'file' ? target.files : target.value,
		}));
	}

	const [selectedKategori, setSelectedKategori] = useState(null);
	const options = [
		{ value: 'kelakuan', label: 'Kelakuan' },
		{ value: 'kerajinan', label: 'Kerajinan' },
		{ value: 'kerapian', label: 'Kerapian' },
	];
	const selectKategoriChange = (value: any) => {
		if (value) {
			setSelectedKategori(value);
			setFormData((prev: any) => ({ ...prev, kategori: value.value }));
		}
	};

	const getPelanggaran = async (data: any) => {
		// console.log('data', data);
		const { kategori } = data;
		const findKategori = options.find((option: any) => option.value === kategori) as any;
		setSelectedKategori(findKategori);

		setFormData(data);
	};

	useEffect(() => {
		if (payload) {
			getPelanggaran(payload);
		}
	}, [payload]);

	function resetForm() {
		setFormData({
			_id: '',
			jenisPelanggaran: '',
			kategori: '',
			jumlahPoin: 0,
		});
		setSelectedKategori(null);
	}

	const onSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();
		setField({});

		switch (prefix) {
			case 'Tambah':
				const storeResponse = (await storePelanggaran(formData)) as any;
				if (storeResponse.error) {
					toast.error('Data Gagal Ditambahkan!');
					setField(storeResponse.fields);
				} else {
					toast.success('Data Berhasil Ditambahkan!');
					resetForm();
					handleClose();
				}
				break;

			case 'Edit':
				const updateResponse = (await updatePelanggaran(formData, payload._id)) as any;
				if (updateResponse.error) {
					toast.error('Data Gagal Disimpan!');
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
		<Modal show={!!show} onHide={handleClose} size='lg' centered>
			<ModalHeader prefix={prefix} suffix='Pelanggaran' />
			<Form noValidate onSubmit={onSubmit} id='form-pelanggaran'>
				<Modal.Body>
					<Container>
						<Row>
							<Input
								label='Jenis Pelanggaran'
								placeholder='Masukkan jenis pelanggaran'
								name='jenisPelanggaran'
								value={formData.jenisPelanggaran}
								onChange={handleChange}
								fieldstate={field}
								required
							/>
							<Select
								label='Kategori'
								placeholder='Pilih kategori'
								name='kategori'
								value={selectedKategori}
								options={options}
								fieldstate={field}
								isClearable
								onChange={selectKategoriChange}
								required
							/>
							<Input
								label='Jumlah Poin'
								placeholder='Masukkan jumlah poin'
								name='jumlahPoin'
								value={formData.jumlahPoin}
								onChange={handleChange}
								fieldstate={field}
								required
								type='number'
								min={0}
								max={100}
								maxLength={3}
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
	);
}
