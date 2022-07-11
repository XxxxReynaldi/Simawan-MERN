import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Gap from '../../../components/atoms/Gap';
import Input from '../../../components/atoms/Input';
import Header from '../../../components/atoms/Header';
import CardHeader from '../../../components/molecules/CardHeader';
import SideBar from '../../../components/organisms/SideBar';
import CardSiswa from '../../../components/atoms/CardSiswa';

import { SiswaTypes } from '../../../services/Data-types';
import { getAllSiswa } from '../../../services/siswa';

export default function Siswa() {
	const [totalSiswa, setTotalSiswa] = useState(0);
	const [siswaListed, setSiswaListed] = useState([]);
	const [modalSiswa, setShowMSiswa] = useState({ show: false, prefix: '', payload: null });
	const [modalHapus, setModalHapus] = useState({ show: false, id: '' });

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
				<Form>
					<Row style={{ marginRight: '0px' }}>
						<Col md={4}>
							<Input label='Tahun Ajaran' placeholder='Masukkan tahun ajaran' />
						</Col>
						<Col md={4}>
							<Input label='kelas' placeholder='Masukkan kelas' />
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
