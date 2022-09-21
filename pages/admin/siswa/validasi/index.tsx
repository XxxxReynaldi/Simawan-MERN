/* eslint-disable comma-dangle */
/* eslint-disable array-callback-return */
/* eslint-disable import/no-cycle */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState, useEffect, useCallback, createContext } from 'react';
import { Col, Container, Row, Card, Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';

import styles from '../../../../styles/Validasi.module.css';

import Gap from '../../../../components/atoms/Gap';
import Header from '../../../../components/atoms/Header';
import ModalHapus from '../../../../components/molecules/ModalHapus';
import ModalValidasiSiswa from '../../../../components/molecules/ModalValidasiSiswa';
import SideBar from '../../../../components/organisms/SideBar';

import { getKelasByFilter } from '../../../../services/kelas';
import { getAllValidation } from '../../../../services/validasiUser';

interface ValidasiProps {
	_id: string;
	namaLengkap: string;
	NISN: string;
	tempatLahir: string;
	tanggalLahir: Date;
	telp: string;
	namaIbu: string;
	email: string;
}

export const OptionKelasContext = createContext([]);

export default function Validasi() {
	const [totalUser, setTotalUser] = useState(0);
	const [userList, setUserList] = useState([]);

	const [modalValidasi, setShowMValidasi] = useState({ show: false, prefix: '', payload: null });
	const handleValidation = (payload: any) => {
		setShowMValidasi({ show: true, prefix: 'Validasi', payload });
	};

	const [modalHapus, setModalHapus] = useState({ show: false, id: '' });
	const handleDelete = (id: string) => {
		setModalHapus({ show: true, id });
	};

	const kodeTahunAjaran = new Date().getFullYear().toString();
	const [optionKelas, setOptionKelas] = useState([]);

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

	const getKelas = useCallback(async () => {
		const response = (await getKelasByFilter(kodeTahunAjaran)) as any;
		const dataKelas = response.data.data;

		settingOption(dataKelas);
	}, [getKelasByFilter]);

	useEffect(() => {
		getKelas();
	}, []);

	const getValidation = async () => {
		const response = (await getAllValidation({ validasi: 'pending' })) as any;
		const { data } = response.data;
		const { total } = response.data;
		const collection: any = [];
		data.map(
			(
				{ _id, namaLengkap, NISN, tempatLahir, tanggalLahir, telp, namaIbu, email }: ValidasiProps,
				index: any
			) => {
				const newListing = {
					_id,
					no: index + 1,
					namaLengkap,
					NISN,
					tempatLahir,
					tanggalLahir,
					telp,
					namaIbu,
					email,
				};
				collection.push(newListing);
			}
		);

		setUserList(collection);
		setTotalUser(total);
	};

	useEffect(() => {
		getValidation();
	}, [modalValidasi, modalHapus]);

	const columns = useMemo(
		() => [
			{ name: 'No', selector: (row: any) => row.no },
			{ name: 'NISN', selector: (row: any) => row.NISN },
			{ name: 'Nama Lengkap', selector: (row: any) => row.namaLengkap },
			{ name: 'Telp', selector: (row: any) => row.telp },
			{ name: 'Nama Ibu', selector: (row: any) => row.namaIbu, omit: true },
			{ name: 'Email', selector: (row: any) => row.email, omit: true },
			{
				name: 'Opsi',
				cell: (row: any) => (
					<>
						<Button variant='success' onClick={() => handleValidation(row)}>
							<i className='fas fa-edit ' />
						</Button>
						<Gap width={8} />
						<Button variant='danger' onClick={() => handleDelete(row._id)}>
							<i className='fas fa-trash ' />
						</Button>
					</>
				),
				ignoreRowClick: true,
				allowOverflow: true,
				button: true,
			},
		],
		[]
	);

	useEffect(() => {
		document.title = `MERN | Halaman Validasi Siswa`;
		return () => {
			document.title = `MERN Stack`;
		};
	});

	return (
		<>
			<SideBar activeMenu='siswa' />
			<section className='content-section'>
				<Header title='Validasi Siswa' subtitle='Menampilkan data user yang telah mendaftar' />
				<Gap height={48} />
				<Container style={{ paddingLeft: '0px', paddingRight: '32px' }}>
					<Card className={styles['card-validasi']}>
						<Card.Body>
							<Container>
								<Row>
									<Col md={12} className='my-auto'>
										<Card.Title>User terdaftar : {totalUser} </Card.Title>
									</Col>
								</Row>
								<Gap height={24} />
								<Row>
									<Col>
										<Container className={styles['container-validasi']}>
											<DataTable columns={columns} data={userList} pagination />
										</Container>
									</Col>
								</Row>
							</Container>
						</Card.Body>
					</Card>
				</Container>
				<OptionKelasContext.Provider value={optionKelas}>
					<ModalValidasiSiswa
						prefix={modalValidasi.prefix}
						show={modalValidasi.show}
						payload={modalValidasi.payload}
						handleClose={() => setShowMValidasi({ show: false, prefix: '', payload: null })}
					/>
				</OptionKelasContext.Provider>
				<ModalHapus
					prefix='Hapus'
					suffix='User'
					show={modalHapus.show}
					id={modalHapus.id}
					handleClose={() => setModalHapus({ show: false, id: '' })}
				/>
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
