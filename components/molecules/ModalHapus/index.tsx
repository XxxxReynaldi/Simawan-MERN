/* eslint-disable comma-dangle */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-case-declarations */
/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback, useEffect, SyntheticEvent } from 'react';
import { Container, Button, Modal, Form, Badge } from 'react-bootstrap';
import { toast } from 'react-toastify';

import ModalHeader from '../../atoms/ModalHeader';
import { destroyJurusan, showJurusan } from '../../../services/jurusan';
import { destroyKelas, showKelas } from '../../../services/kelas';
import { destroyPelanggaran, showPelanggaran } from '../../../services/pelanggaran';
import { destroyUser } from '../../../services/validasiUser';
import { getDataUser, removePhoto } from '../../../services/user';

interface ModalHapusProps {
	show: Boolean;
	handleClose: any;
	prefix?: string;
	suffix?: string;
	id?: string;
}

export default function ModalHapus(props: Partial<ModalHapusProps>) {
	// let fnCount: number = 1;
	const { show, handleClose, prefix, suffix, id = '' } = props;

	const [payload, setPayload] = useState({});

	const handleSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();

		switch (suffix) {
			case 'Jurusan':
				const deleteJurusan = (await destroyJurusan(id)) as any;
				if (deleteJurusan.error) {
					toast.error(deleteJurusan.message);
				} else {
					toast.success('Data Berhasil Dihapus!');
					handleClose();
				}
				break;
			case 'Kelas':
				// fnCount += 1;
				const deleteKelas = (await destroyKelas(id)) as any;
				if (deleteKelas.error) {
					toast.error(deleteKelas.message);
				} else {
					toast.success('Data Berhasil Dihapus!');
					// console.log('fnCount delete kelas React: ', fnCount);
					handleClose();
				}
				break;
			case 'Pelanggaran':
				const deletePelanggaran = (await destroyPelanggaran(id)) as any;
				if (deletePelanggaran.error) {
					toast.error(deletePelanggaran.message);
				} else {
					toast.success('Data Berhasil Dihapus!');
					handleClose();
				}
				break;
			case 'User':
				const deleteUser = (await destroyUser(id)) as any;
				if (deleteUser.error) {
					toast.error(deleteUser.message);
				} else {
					toast.success('Data Berhasil Dihapus!');
					handleClose();
				}
				break;
			case 'Foto User':
				const deletePhotoUser = (await removePhoto(id)) as any;
				if (deletePhotoUser.error) {
					toast.error(deletePhotoUser.message);
				} else {
					toast.success('Data Berhasil Dihapus!');
					handleClose();
				}
				break;

			default:
				break;
		}
	};

	const getJurusan = useCallback(
		async (id: string) => {
			const response = (await showJurusan(id)) as any;
			const jurusan = response.data.data;
			setPayload({ paketKeahlian: jurusan.paketKeahlian });
		},
		[showJurusan]
	);

	const getKelas = useCallback(
		async (id: string) => {
			const response = (await showKelas(id)) as any;
			const kelas = response.data.data;
			setPayload({
				kelas: `${kelas.tingkatan}-${kelas.keahlian.singkatan}-${kelas.abjad.toUpperCase()}`,
			});
		},
		[showKelas]
	);

	const getPelanggaran = useCallback(
		async (id: string) => {
			const response = (await showPelanggaran(id)) as any;
			const pelanggaran = response.data.data;
			setPayload({ jenisPelanggaran: pelanggaran.jenisPelanggaran });
		},
		[showPelanggaran]
	);

	const getUser = useCallback(
		async (id: string) => {
			const response = (await getDataUser(id)) as any;
			const user = response.data.data;
			setPayload({ namaLengkap: user.namaLengkap });
		},
		[getDataUser]
	);

	const getPhoto = useCallback(
		async (id: string) => {
			const response = (await getDataUser(id)) as any;
			const user = response.data.data;
			setPayload({ foto: user.foto });
		},
		[getDataUser]
	);

	useEffect(() => {
		if (id && suffix === 'Jurusan') {
			getJurusan(id);
		} else if (id && suffix === 'Kelas') {
			// fnCount += 1;
			getKelas(id);
		} else if (id && suffix === 'Pelanggaran') {
			getPelanggaran(id);
		} else if (id && suffix === 'User') {
			getUser(id);
		} else if (id && suffix === 'Foto User') {
			getPhoto(id);
		}
		return () => {};
	}, [id]);

	const list = Object.entries(payload).map(([key, val]: any) => (
		<h5 key={key} style={{ display: 'inline-block' }}>
			<Badge pill bg='danger'>
				{val}
			</Badge>
		</h5>
	));

	return (
		<Modal show={!!show} onHide={handleClose} centered>
			<ModalHeader prefix={prefix} suffix={suffix} />
			<Form>
				<Modal.Body>
					<Container className='text-center'>
						Apa anda yakin ingin menghapus data {suffix} <br /> {list} ?
					</Container>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='outline-dark' onClick={handleClose}>
						<i className='fa-solid fa-xmark' /> Batal
					</Button>
					<Button variant='danger' type='submit' onClick={handleSubmit}>
						<i className='fa-solid fa-trash' /> Hapus
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
}
