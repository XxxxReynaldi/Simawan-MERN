/* eslint-disable arrow-body-style */
/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Col, Container, Row, Card, Tabs, Tab } from 'react-bootstrap';

// import jwtDecode from 'jwt-decode';
import styles from '../../../styles/Pelanggaran.module.css';

import Gap from '../../../components/atoms/Gap';
import Header from '../../../components/atoms/Header';
import CardHeader from '../../../components/molecules/CardHeader';
import TablePelanggaran from '../../../components/molecules/TablePelanggaran';
import ModalPelanggaran from '../../../components/molecules/ModalPelanggaran';
import ModalHapus from '../../../components/molecules/ModalHapus';
import SideBar from '../../../components/organisms/SideBar';

import { getAllPelanggaran } from '../../../services/pelanggaran';
// import { JWTPayloadTypes, UserPayloadTypes } from '../../../services/Data-types';

export default function Pelanggaran() {
	const [modalPelanggaran, setShowMPelanggaran] = useState({
		show: false,
		prefix: '',
		payload: null,
	});
	const [modalHapus, setModalHapus] = useState({ show: false, id: '' });

	const handleAdd = () => {
		setShowMPelanggaran({ show: true, prefix: 'Tambah', payload: null });
	};

	const handleEdit = (data: any) => {
		setShowMPelanggaran({ show: true, prefix: 'Edit', payload: data });
	};

	const handleDelete = (id: string) => {
		setModalHapus({ show: true, id });
	};

	const [totalPelanggaran, setTotalPelanggaran] = useState(0);
	const [kelakuanList, setKelakuanList] = useState([]);
	const [kerajinanList, setKerajinanList] = useState([]);
	const [kerapianList, setKerapianList] = useState([]);

	const filterKategori = (data: any, selectKategori: string) => {
		return data.filter((item: any) => item.kategori === selectKategori);
	};

	const setCollection = (dataPelanggaran: any) => {
		const kelakuan = filterKategori(dataPelanggaran, 'kelakuan');
		const kerajinan = filterKategori(dataPelanggaran, 'kerajinan');
		const kerapian = filterKategori(dataPelanggaran, 'kerapian');

		setKelakuanList(kelakuan);
		setKerajinanList(kerajinan);
		setKerapianList(kerapian);
	};

	const getPelanggaranList = async () => {
		const response = (await getAllPelanggaran()) as any;
		const dataPelanggaran = response.data.data;
		setTotalPelanggaran(response.data.total);
		setCollection(dataPelanggaran);
	};

	useEffect(() => {
		getPelanggaranList();
	}, [modalPelanggaran, modalHapus]);

	useEffect(() => {
		document.title = `Halaman Pelanggaran`;
		return () => {
			document.title = `MERN Stack`;
		};
	});

	return (
		<>
			<SideBar activeMenu='pelanggaran' />
			<section className='content-section'>
				<Header
					title='Pelanggaran'
					subtitle='Menampilkan seluruh data jenis pelanggaran beserta poin pelanggaran.'
				/>
				<CardHeader
					title='Total jenis pelanggran saat ini : '
					countNum={totalPelanggaran}
					subtitle='Klik tombol di samping kiri untuk menambahkan pelanggaran baru.'
					add={handleAdd}
				/>
				<Gap height={28} />
				<Container style={{ padding: '0px 32px 32px 0px' }}>
					<Card className={styles['card-pelanggaran']}>
						<Card.Body>
							<Container>
								<Row>
									<Col md={12} className='my-auto'>
										<Card.Title>
											Jenis pelanggaran beserta poin yang tidak boleh dilakukan sebagai siswa
										</Card.Title>
									</Col>
								</Row>
								<Gap height={24} />
								<Row>
									<Col>
										<Tabs
											transition
											defaultActiveKey='kelakuan'
											id='uncontrolled-tab-example'
											className='mb-4 nav justify-content-end'
										>
											<Tab eventKey='kelakuan' title='Kelakuan'>
												<Container className={styles['container-tab']}>
													<TablePelanggaran data={kelakuanList} edit={handleEdit} remove={handleDelete} />
												</Container>
											</Tab>
											<Tab eventKey='kerajinan' title='Kerajinan'>
												<Container className={styles['container-tab']}>
													<TablePelanggaran data={kerajinanList} edit={handleEdit} remove={handleDelete} />
												</Container>
											</Tab>
											<Tab eventKey='kerapian' title='Kerapian'>
												<Container className={styles['container-tab']}>
													<TablePelanggaran data={kerapianList} edit={handleEdit} remove={handleDelete} />
												</Container>
											</Tab>
										</Tabs>
									</Col>
								</Row>
							</Container>
						</Card.Body>
					</Card>
				</Container>

				<ModalPelanggaran
					prefix={modalPelanggaran.prefix}
					show={modalPelanggaran.show}
					payload={modalPelanggaran.payload}
					handleClose={() => setShowMPelanggaran({ show: false, prefix: '', payload: null })}
				/>
				<ModalHapus
					prefix='Hapus'
					suffix='Pelanggaran'
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

	// const jwtToken = Buffer.from(token, 'base64').toString('ascii');
	// const payload: JWTPayloadTypes = jwtDecode(jwtToken);
	// const userFromPayload: UserPayloadTypes = payload.user;

	return {
		props: {
			// user: userFromPayload,
		},
	};
}
