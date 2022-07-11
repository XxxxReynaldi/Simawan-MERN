/* eslint-disable react/jsx-one-expression-per-line */

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { Card, Badge } from 'react-bootstrap';
import { useState } from 'react';

import Image from 'next/image';

import styled from 'styled-components';
import styles from '../../../styles/Card.module.css';
import styleCard from '../../../styles/CardSiswa.module.css';

const BadgeKelas = styled(Badge)`
	background: ${(props: { cardcolor: any }) => props.cardcolor || '#a9a9a9e6'};
`;

interface CardSiswaProps {
	data?: any;
	edit?: any;
	remove?: any;
}

export default function CardSiswa(props: Partial<CardSiswaProps>) {
	const { data, edit, remove } = props;
	const {
		_id,
		namaLengkap,
		NIS,
		kelas: {
			tingkatan,
			keahlian: { paketKeahlian, singkatan, warna },
			abjad,
		},
		NISN,
	} = data;

	const [show, setShow] = useState(false);

	return (
		<>
			{show && <div className={styles.overlay} onClick={() => setShow(false)} />}
			<Card className={styleCard['card-siswa']}>
				<Card.Body>
					<div className='text-center'>
						<Image src='/img/default.jpg' alt='Picture of the author' width={200} height={200} />
					</div>

					<h6 className='mt-2'>{namaLengkap}</h6>
					<p className='text-muted' style={{ fontSize: '14px' }}>
						NIS : {NIS}
					</p>

					<div style={{ position: 'absolute', bottom: '16px' }} className='justify-content-between'>
						<div className={`btn-group dropdown ${show ? 'open' : ''}`}>
							<p style={{ fontSize: '14px' }}>
								{/* max 55 karakter */}
								{/* Jalan Pertamanan IV Kepuharjo Karangploso */}
								<BadgeKelas cardcolor={warna} bg='custom' className={styleCard['badge-kelas']}>
									{tingkatan}-{singkatan}-{abjad.toUpperCase()}
								</BadgeKelas>
							</p>
							<a
								className='btn'
								onClick={() => {
									setShow(!show);
								}}
								style={{ zIndex: '4', left: '54px' }}
							>
								<i className='fa-solid fa-angle-down' />
							</a>
							<ul className='dropdown-menu dropdown-menu-right' style={{ opacity: 1, left: '48px' }}>
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
					</div>
				</Card.Body>
			</Card>
		</>
	);
}
