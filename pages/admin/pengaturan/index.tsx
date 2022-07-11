/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { Col, Container, Row, Tabs, Tab, Card } from 'react-bootstrap';
import jwtDecode from 'jwt-decode';

import styled from 'styled-components';
import styles from '../../../styles/Pengaturan.module.css';
import pict from '../../../styles/picture.module.css';

import Gap from '../../../components/atoms/Gap';
import Header from '../../../components/atoms/Header';
import FormProfile from '../../../components/molecules/FormProfile';
import FormPassword from '../../../components/molecules/FormPassword';
import ModalUploadImage from '../../../components/molecules/ModalUploadImage';
import SideBar from '../../../components/organisms/SideBar';

import { JWTPayloadTypes, UserPayloadTypes } from '../../../services/Data-types';
import { getDataUser, updateProfile } from '../../../services/user';

const API_IMG = process.env.NEXT_PUBLIC_IMG;

export default function Pengaturan(props: any) {
	const { user } = props;
	const [dataUser, setDataUser] = useState(null);
	const [photoUser, setPhotoUser] = useState('default.jpg');

	const [modalImage, setShowMImage] = useState({ show: false, prefix: '', payload: null });
	const handleEditImg = () => {
		setShowMImage({ show: true, prefix: 'Ubah', payload: dataUser });
	};

	const getUser = async () => {
		const response = (await getDataUser(user.id)) as any;
		const { data } = response.data;

		setDataUser(data);
		setPhotoUser(data.foto);
	};
	useEffect(() => {
		getUser();
	}, [modalImage]);

	useEffect(() => {
		document.title = `Halaman Pengaturan`;
		return () => {
			document.title = `MERN Stack`;
		};
	});

	return (
		<>
			<SideBar activeMenu='pengaturan' />
			<section className='content-section'>
				<Header title='Pengaturan' subtitle='Atur Profile User' />
				<Gap height={48} />
				<Card className={styles['card-profile']}>
					<Card.Body>
						<Container>
							<Row>
								<Col md={5} className='my-auto mx-auto'>
									<div className={`${pict['profile-div']} position-relative my-auto mx-auto `}>
										<a href='#'>
											<div className={pict.blur}>
												<img
													src={`${API_IMG}/user/${photoUser}`}
													alt='Picture of the user'
													className={pict['profile-img']}
													width={300}
													height={300}
													onClick={handleEditImg}
												/>
											</div>
										</a>
									</div>
								</Col>
								<Col md={7}>
									<Tabs
										transition
										defaultActiveKey='profile'
										id='uncontrolled-tab-example'
										className='mb-4 nav justify-content-end'
									>
										<Tab eventKey='profile' title='Ubah Profile'>
											<Container className={styles['container-profile']}>
												<FormProfile payload={dataUser} />
											</Container>
										</Tab>
										<Tab eventKey='password' title='Ubah Password'>
											<Container className={styles['container-password']}>
												<FormPassword payload={dataUser} />
											</Container>
										</Tab>
									</Tabs>
								</Col>
							</Row>
						</Container>
					</Card.Body>
				</Card>
				<ModalUploadImage
					prefix={modalImage.prefix}
					show={modalImage.show}
					payload={modalImage.payload}
					handleClose={() => setShowMImage({ show: false, prefix: '', payload: null })}
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

	const jwtToken = Buffer.from(token, 'base64').toString('ascii');
	const payload: JWTPayloadTypes = jwtDecode(jwtToken);
	const userFromPayload: UserPayloadTypes = payload.user;

	return {
		props: {
			user: userFromPayload,
		},
	};
}
