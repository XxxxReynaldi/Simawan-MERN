/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback } from 'react';

import { Col, Container, Row } from 'react-bootstrap';
import { wrapper } from '../../../store/store';
import jwtDecode from 'jwt-decode';

import Gap from '../../../components/atoms/Gap';
import CardJurusan from '../../../components/atoms/CardJurusan';
import Header from '../../../components/atoms/Header';
import CardHeader from '../../../components/molecules/CardHeader';
import ModalJurusan from '../../../components/molecules/ModalJurusan';
import ModalHapus from '../../../components/molecules/ModalHapus';
import SideBar from '../../../components/organisms/SideBar';

import { JurusanTypes, JWTPayloadTypes, UserPayloadTypes } from '../../../services/Data-types';
import { getAllJurusan } from '../../../services/jurusan';

export default function Jurusan() {
	const [totalJurusan, setTotalJurusan] = useState(0);
	const [jurusanListed, setJurusanListed] = useState([]);
	const [modalJurusan, setShowMJurusan] = useState({ show: false, prefix: '', payload: null });
	const [modalHapus, setModalHapus] = useState({ show: false, id: '' });

	const getJurusanList = useCallback(async () => {
		const response = (await getAllJurusan()) as any;
		setJurusanListed(response.data.data);
		setTotalJurusan(response.data.total);
	}, [getAllJurusan]);

	useEffect(() => {
		getJurusanList();
	}, [modalJurusan, modalHapus]);

	const handleAdd = () => {
		setShowMJurusan({ show: true, prefix: 'Tambah', payload: null });
	};

	const handleEdit = (data: any) => {
		setShowMJurusan({ show: true, prefix: 'Edit', payload: data });
	};

	const handleDelete = (id: string) => {
		setModalHapus({ show: true, id });
	};

	useEffect(() => {
		document.title = `Halaman Jurusan`;
		return () => {
			document.title = `MERN Stack`;
		};
	});

	return (
		<>
			<SideBar activeMenu='jurusan' />
			<section className='content-section'>
				<Header title='Jurusan' subtitle='Menampilkan data seluruh jurusan ' />
				<CardHeader
					title='Total jurusan saat ini : '
					countNum={totalJurusan}
					subtitle='Klik tombol di samping kiri untuk menambahkan jurusan baru.'
					add={handleAdd}
				/>
				<Gap height={48} />
				<Container style={{ paddingLeft: '0px', paddingRight: '32px' }}>
					<Row>
						{jurusanListed.map((item: JurusanTypes) => (
							<Col xs={6} md={4} key={item._id} style={{ paddingBottom: '24px' }}>
								<CardJurusan data={item} edit={handleEdit} remove={handleDelete} />
							</Col>
						))}
					</Row>
				</Container>
				<ModalJurusan
					prefix={modalJurusan.prefix}
					show={modalJurusan.show}
					payload={modalJurusan.payload}
					handleClose={() => setShowMJurusan({ show: false, prefix: '', payload: null })}
				/>
				<ModalHapus
					prefix='Hapus'
					suffix='Jurusan'
					show={modalHapus.show}
					id={modalHapus.id}
					handleClose={() => setModalHapus({ show: false, id: '' })}
				/>
			</section>
		</>
	);
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req }: any) => {
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
		props: {},
	};
});

// interface GetServerSideProps {
// 	req: {
// 		cookies: {
// 			token: string;
// 		};
// 	};
// }
// export async function getServerSideProps({ req }: GetServerSideProps) {
// const { token } = req.cookies;
// if (!token) {
// 	return {
// 		redirect: {
// 			destination: '/',
// 			permanent: false,
// 		},
// 	};
// }
// // const jwtToken = Buffer.from(token, 'base64').toString('ascii');
// // const payload: JWTPayloadTypes = jwtDecode(jwtToken);
// // const userFromPayload: UserPayloadTypes = payload.user;

// return {
// 	props: {
// 		// user: userFromPayload,
// 	},
// };
// }
