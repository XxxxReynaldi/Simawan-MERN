/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';

import styled from 'styled-components';
import styles from '../../../styles/Card.module.css';
import styleCard from '../../../styles/CardKelas.module.css';

interface CardKelasProps {
	_id?: string;
	tingkatan: string;
	singkatan: string;
	abjad: string;
	paketKeahlian: string;
	jumlah?: number;
	warna?: string;
	dropdown?: boolean;
	data?: any;
	edit?: any;
	remove?: any;
}

const CardxKelas = styled(Card)`
	background: ${(props: { cardcolor: any }) => props.cardcolor || '#c3c3c3'};
`;

export default function CardKelas(props: Partial<CardKelasProps>) {
	const { dropdown = false, data, edit, remove } = props;

	const [cardKelas, setCardKelas] = useState({
		tingkatan: '',
		singkatan: '',
		paketKeahlian: '',
		abjad: '',
		warna: '',
		jumlahSiswa: 0,
	});

	const setCard = (payload: any) => {
		const { tingkatan, abjad, keahlian, jumlahSiswa } = payload;
		const { singkatan, paketKeahlian, warna } = keahlian;
		setCardKelas((prev: any) => ({
			...prev,
			tingkatan,
			singkatan,
			paketKeahlian,
			abjad,
			warna,
			jumlahSiswa,
		}));
	};
	const [show, setShow] = useState(false);

	useEffect(() => {
		if (data) {
			setCard(data);
		}
	}, [data]);

	return (
		<>
			{show && <div className={styles.overlay} onClick={() => setShow(false)} />}
			<CardxKelas cardcolor={cardKelas.warna} className={styleCard['card-kelas']}>
				<Card.Body>
					<Card className={styleCard['card-count']}>
						<p className='text-center text-white' style={{ margin: '0px', fontWeight: '600' }}>
							<i className='fas fa-user' /> {cardKelas.jumlahSiswa}
						</p>
					</Card>
					<p className={styleCard['text-kelas']}>
						{/* X-RPL-B */}
						{cardKelas.tingkatan}-{cardKelas.singkatan}-{cardKelas.abjad}
					</p>
					<p className={styleCard['text-paket-keahlian']}>
						{/* Rekayasa Perangkat Lunak */}
						{cardKelas.paketKeahlian}
					</p>
					{dropdown && (
						<div className={`btn-group dropdown float-end ${show ? 'open' : ''}`}>
							<a
								className=' btn '
								onClick={() => {
									setShow(!show);
								}}
								style={{ zIndex: '4' }}
							>
								<i className='fa-solid fa-angle-down text-white' />
							</a>

							<ul className='dropdown-menu dropdown-menu-right' style={{ opacity: 1 }}>
								<li>
									<a
										onClick={() => {
											edit(data);
										}}
										onMouseUp={() => {
											setShow(false);
										}}
									>
										Edit
									</a>
								</li>
								<li>
									<a
										onClick={() => {
											remove(data._id);
										}}
										onMouseUp={() => {
											setShow(false);
										}}
									>
										Hapus
									</a>
								</li>
							</ul>
						</div>
					)}
				</Card.Body>
			</CardxKelas>
		</>
	);
}
