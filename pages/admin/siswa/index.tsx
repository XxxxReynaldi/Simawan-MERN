/* eslint-disable react/jsx-no-bind */
/* eslint-disable array-callback-return */
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import Gap from '../../../components/atoms/Gap';
import Input from '../../../components/atoms/Input';
import Header from '../../../components/atoms/Header';
import CardHeader from '../../../components/molecules/CardHeader';
import SideBar from '../../../components/organisms/SideBar';
import CardSiswa from '../../../components/atoms/CardSiswa';

import { SiswaTypes } from '../../../services/Data-types';
import { getAllSiswa, getSiswaByFilter } from '../../../services/siswa';
import Select from '../../../components/atoms/Select';
import { getAllKelas } from '../../../services/kelas';

export default function Siswa() {
	const [totalSiswa, setTotalSiswa] = useState(0);
	const [siswaListed, setSiswaListed] = useState([]);
	const [modalSiswa, setShowMSiswa] = useState({ show: false, prefix: '', payload: null });
	const [modalHapus, setModalHapus] = useState({ show: false, id: '' });

	const [selectedKelas, setSelectedKelas] = useState(null);
	const [optionKelas, setOptionKelas] = useState([]);

	const [formData, setFormData] = useState({ tahunAjaran: '', kelas: '' });

	function handleChange(e: ChangeEvent<HTMLInputElement>): void {
		const target = e.target as any;
		setFormData((prev: any) => ({
			...prev,
			[target.name]: target.type === 'file' ? target.files : target.value,
		}));
	}

	const settingOption = (dataKelas: any): void => {
		const collection: any = [];
		type Kelas = {
			_id: string;
			tingkatan: string;
			keahlian: any;
			abjad: string;
			kode: string;
			jumlahSiswa: number;
		};
		dataKelas.map(({ _id, tingkatan, keahlian, abjad, kode, jumlahSiswa }: Kelas) => {
			const option: any = {
				value: _id,
				label: `${tingkatan}-${keahlian.singkatan}-${abjad.toUpperCase()}`,
				_id,
				tingkatan,
				keahlian,
				abjad,
				kode,
				jumlahSiswa,
			};
			collection.push(option);
		});
		setOptionKelas(collection);
	};

	const getKelas = async () => {
		const response = (await getAllKelas()) as any;
		const dataKelas = response.data.data;

		settingOption(dataKelas);
	};

	useEffect(() => {
		getKelas();
	}, []);

	const selectKelasChange = (value: any) => {
		if (value) {
			setSelectedKelas(value);
			setFormData((prev: any) => ({ ...prev, kelas: value.value }));
		}
	};

	const onSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();

		if (formData.tahunAjaran === '' || formData.kelas === '') {
			toast.error('Semua inputan harus terisi');
			return;
		}

		const response = (await getSiswaByFilter(formData.tahunAjaran, formData.kelas)) as any;
		const dataSiswa = response.data.data;
		const { total } = response.data;
		setSiswaListed(dataSiswa);
		if (response.error || total === 0) {
			toast.error('Data tidak ditemukan!');
		} else {
			toast.success(`${total} Data berhasil ditemukan!`);
		}
	};

	useEffect(() => {}, [onSubmit]);

	const getSiswaList = async () => {
		const response = (await getAllSiswa()) as any;
		setSiswaListed(response.data.data);
		setTotalSiswa(response.data.total);
	};

	useEffect(() => {
		getSiswaList();
	}, [modalSiswa, modalHapus]);

	const router = useRouter();
	const handleAdd = () => {
		router.push('/admin/siswa/validasi');
	};

	const handleEdit = (data: any) => {
		setShowMSiswa({ show: true, prefix: 'Edit', payload: data });
	};

	const handleDelete = (id: string) => {
		setModalHapus({ show: true, id });
	};

	useEffect(() => {
		document.title = `Halaman Siswa`;
		return () => {
			document.title = `MERN Stack`;
		};
	});

	return (
		<>
			<SideBar activeMenu='siswa' />
			<section className='content-section'>
				<Header
					title='Siswa'
					subtitle='Menampilkan data seluruh siswa berdasarkan tahun ajaran dan kelas'
				/>
				<CardHeader
					title='Total siswa saat ini : '
					countNum={totalSiswa}
					subtitle='Klik tombol di samping kiri untuk menambahkan siswa baru.'
					add={handleAdd}
				/>
				<Gap height={48} />
				<h5>Cari siswa menggunakan filter berikut :</h5>
				<Gap height={12} />
				<Form onSubmit={onSubmit} id='form-cari-siswa'>
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
							/>
						</Col>
						<Col md={4}>
							<Select
								label='Kelas'
								placeholder='Pilih kelas'
								name='kelas'
								value={selectedKelas}
								onChange={selectKelasChange}
								options={optionKelas}
								isClearable
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
						{siswaListed.map((item: SiswaTypes) => (
							<Col xs={6} md={3} key={item._id} style={{ paddingTop: '12px', paddingBottom: '12px' }}>
								<CardSiswa data={item} edit={handleEdit} remove={handleDelete} />
							</Col>
						))}
					</Row>
				</Container>
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
