/* eslint-disable import/no-cycle */
/* eslint-disable react/jsx-no-bind */

import { createContext, useCallback, useEffect, useState, SyntheticEvent } from 'react';

import { Col, Container, Row, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

import Gap from '../../../components/atoms/Gap';
import Input from '../../../components/atoms/Input';
import Select from '../../../components/atoms/Select';
import CardKelas from '../../../components/atoms/CardKelas';
import Header from '../../../components/atoms/Header';
import CardHeader from '../../../components/molecules/CardHeader';
import ModalKelas from '../../../components/molecules/ModalKelas';
import ModalHapus from '../../../components/molecules/ModalHapus';
import SideBar from '../../../components/organisms/SideBar';

import { KelasTypes } from '../../../services/Data-types';
import { getKelasByFilter, getAllKelas } from '../../../services/kelas';
import { getAllJurusan } from '../../../services/jurusan';

export const OptionKeahlianContext = createContext([]);

export default function Kelas() {
	const year = new Date().getFullYear().toString();
	const [formData, setFormData] = useState({
		tingkatan: '',
		tahunAjaran: '',
	});
	const [kelasList, setKelasList] = useState([]);
	const [optionKeahlian, setOptionKeahlian] = useState([]);
	const [modalKelas, setShowMKelas] = useState({ show: false, prefix: '', payload: null });
	const [modalHapus, setModalHapus] = useState({ show: false, id: '' });

	function handleChange(e: Event): void {
		const target = e.target as any;
		setFormData((prev: any) => ({
			...prev,
			[target.name]: target.type === 'file' ? target.files : target.value,
		}));
	}

	const [selectedTingkatan, setSelectedTingkatan] = useState(null);
	const options = [
		{ value: 'X', label: 'X', kode: '10' },
		{ value: 'XI', label: 'XI', kode: '11' },
		{ value: 'XII', label: 'XII', kode: '12' },
	];
	const selectTingkatanChange = (value: any) => {
		if (value) {
			setSelectedTingkatan(value);
			setFormData((prev: any) => ({ ...prev, tingkatan: value.value }));
		}
	};

	const onSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();
		const response = (await getKelasByFilter(formData.tahunAjaran, formData.tingkatan)) as any;

		const dataKelas = response.data.data;
		const { total } = response.data;
		setKelasList(dataKelas);
		if (response.error || total === 0) {
			toast.error('Data tidak ditemukan!');
		} else {
			toast.success(`${total} Data berhasil ditemukan!`);
		}
	};

	useEffect(() => {}, [onSubmit]);

	const getKelasList = useCallback(async () => {
		const response = (await getAllKelas()) as any;
		const dataKelas = response.data.data;
		setKelasList(dataKelas);
	}, [getAllKelas]);

	useEffect(() => {
		getKelasList();
	}, [modalKelas, modalHapus]);

	const settingOption = (dataJurusan: any): void => {
		let collection: any = [];
		type Jurusan = {
			_id: string;
			paketKeahlian: string;
			kode: string;
			singkatan: string;
			warna: string;
		};
		dataJurusan.map(({ _id, paketKeahlian, kode, singkatan, warna }: Jurusan) => {
			const option: any = {
				value: _id,
				label: paketKeahlian,
				kode,
				singkatan,
				paketKeahlian,
				warna,
			};
			collection.push(option);
		});
		setOptionKeahlian(collection);
	};

	const getKeahlian = useCallback(async () => {
		const response = (await getAllJurusan()) as any;
		const dataJurusan = response.data.data;

		settingOption(dataJurusan);
	}, [getAllJurusan]);

	useEffect(() => {
		getKeahlian();
	}, []);

	const handleAdd = () => {
		setShowMKelas({ show: true, prefix: 'Tambah', payload: null });
	};

	const handleEdit = (data: any) => {
		setShowMKelas({ show: true, prefix: 'Edit', payload: data });
	};

	const handleDelete = (id: string) => {
		setModalHapus({ show: true, id });
	};

	useEffect(() => {
		document.title = `Halaman Kelas`;
		return () => {
			document.title = `MERN Stack`;
		};
	});

	return (
		<>
			<SideBar activeMenu='kelas' />
			<section className='content-section'>
				<Header
					title='Kelas'
					subtitle='Menampilkan data seluruh kelas berdasarkan tahun ajaran, jurusan, dan tingkatan.'
				/>
				<OptionKeahlianContext.Provider value={optionKeahlian}>
					<CardHeader
						title='Tahun ajaran saat ini : '
						countNum={year}
						subtitle='Klik tombol di samping kiri untuk menambahkan kelas baru.'
						add={handleAdd}
					/>
					<Gap height={48} />
					<h5>Cari kelas menggunakan filter berikut :</h5>
					<Gap height={12} />
					<Form onSubmit={onSubmit} id='form-cari-kelas'>
						<Row style={{ marginRight: '0px' }}>
							<Col md={4}>
								<Input
									label='Tahun Ajaran'
									placeholder='Masukkan tahun ajaran'
									name='tahunAjaran'
									value={formData.tahunAjaran}
									onChange={handleChange}
									type='number'
									min={1970}
									max={3000}
									maxLength={4}
									style={{ paddingTop: '8px', paddingBottom: '8px' }}
								/>
							</Col>
							<Col md={4}>
								<Select
									label='Tingkatan'
									placeholder='Pilih tingkatan'
									name='tingkatan'
									value={selectedTingkatan}
									options={options}
									isClearable
									onChange={selectTingkatanChange}
									instanceId='long-value-select'
									required
								/>
							</Col>
							<Col xs={2}>
								<Button style={{ marginTop: '1.875rem' }} type='submit'>
									Cari
								</Button>
							</Col>
						</Row>
					</Form>
					<Gap height={24} />

					<Container style={{ paddingLeft: '0px', paddingRight: '32px' }}>
						<Row>
							{kelasList.map((item: KelasTypes) => (
								<Col xs={6} md={4} key={item._id} style={{ paddingBottom: '24px' }}>
									<CardKelas data={item} edit={handleEdit} remove={handleDelete} dropdown />
								</Col>
							))}
						</Row>
					</Container>
					<ModalKelas
						prefix={modalKelas.prefix}
						show={modalKelas.show}
						payload={modalKelas.payload}
						handleClose={() => setShowMKelas({ show: false, prefix: '', payload: null })}
					/>
					<ModalHapus
						prefix='Hapus'
						suffix='Kelas'
						show={modalHapus.show}
						id={modalHapus.id}
						handleClose={() => setModalHapus({ show: false, id: '' })}
					/>
				</OptionKeahlianContext.Provider>
			</section>
		</>
	);
}

interface GetServerSideProps {
	req: {
		cookies: {
			token: string;
		};
	};
}

export async function getServerSideProps({ req }: GetServerSideProps) {
	const { token } = req.cookies;
	if (!token) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}
	return {
		props: {
			// user: userFromPayload,
		},
	};
}
