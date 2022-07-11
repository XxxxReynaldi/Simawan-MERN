/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { Card } from 'react-bootstrap';

import styled from 'styled-components';
import styles from '../../../styles/Card.module.css';
import styleCard from '../../../styles/CardJurusan.module.css';

interface CardJurusanProps {
	_id: string;
	bidangKeahlian: string;
	paketKeahlian: string;
	singkatan: string;
	warna?: string;
	kode: string;
	data?: any;
	edit?: any;
	remove?: any;
}

const Cardx = styled(Card)`
	background: ${(props: { cardcolor: any }) => props.cardcolor || '#a9a9a9e6'};
`;

export default function CardJurusan(props: Partial<CardJurusanProps>) {
	const { data, edit, remove } = props;
	const { paketKeahlian, singkatan, warna, kode } = data;
	const [show, setShow] = useState(false);

	return (
		<>
			{show && <div className={styles.overlay} onClick={() => setShow(false)} />}
			<Cardx cardcolor={warna} className={styleCard['card-jurusan']}>
				<Card.Body style={{ flexWrap: 'nowrap' }}>
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
					<p className={styleCard['text-singkatan']}>{singkatan}</p>
					<p className={styleCard['text-paket-keahlian']}>{paketKeahlian}</p>
					<p className={styleCard['text-kode']}>Kode : {kode}</p>
				</Card.Body>
			</Cardx>
		</>
	);
}
