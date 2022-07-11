/* eslint-disable react/jsx-one-expression-per-line */

/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, ChangeEvent, SyntheticEvent } from 'react';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Image from 'next/image';
import ModalHeader from '../../atoms/ModalHeader';
import ModalHapus from '../ModalHapus';

import pict from '../../../styles/picture.module.css';

import { updatePhoto } from '../../../services/user';

interface ModalUploadImageProps {
	show: Boolean;
	handleClose: any;
	prefix?: string;
	suffix?: string;
	id?: string;
	payload?: any;
}

const API_IMG = process.env.NEXT_PUBLIC_IMG;

export default function ModalUploadImage(props: Partial<ModalUploadImageProps>) {
	const { show, handleClose, prefix, suffix, id = '', payload } = props;

	const [defaultPreview, setDefaultPreview] = useState<any>(null);
	const [image, setImage] = useState<any>('');
	const [imagePreview, setImagePreview] = useState<any>(null);

	const [formData, setFormData] = useState({ foto: 'default.jpg' });

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const target = e.target as any;
		const img = target.files![0];

		if (img) {
			setImagePreview(URL.createObjectURL(img));
			setImage(img);
		}

		setFormData((prev: any) => ({
			...prev,
			[target.name]: target.type === 'file' ? target.files : target.value,
		}));
	};

	function resetForm() {
		setFormData({ foto: 'default.jpg' });
		setImagePreview(null);
		setImage('');
	}

	const onSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();
		const data = new FormData();
		data.append('foto', image);

		const response = await updatePhoto(data, payload._id);
		if (response.error) {
			toast.error(response.message);
		} else {
			toast.success(response.data.message);
			resetForm();
			handleClose();
		}
	};

	const [modalHapus, setModalHapus] = useState({ show: false, id: '' });
	const handleDelete = (e: SyntheticEvent) => {
		e.preventDefault();
		setModalHapus({ show: true, id: payload._id });
	};

	useEffect(() => {
		if (payload) {
			setDefaultPreview(payload.foto);
		}
		// console.log('payload', payload);
		return () => {};
	}, [payload, modalHapus]);

	return (
		<>
			<Modal show={show} onHide={handleClose} backdrop='static' centered>
				<ModalHeader prefix={prefix} suffix='Profile Image' />
				<Form noValidate onSubmit={onSubmit} id='form-upload-img'>
					<Modal.Body>
						<Container>
							<Row>
								<div className='mb-2'>
									<div className='image-upload text-center'>
										<label htmlFor='foto'>
											{imagePreview ? (
												<div className={` position-relative my-auto mx-auto `}>
													<div className={pict['profile-div blur']}>
														<img
															src={imagePreview}
															aria-hidden
															alt='Upload image'
															className={pict['profile-img']}
															width={300}
															height={300}
														/>
													</div>
												</div>
											) : (
												<img
													src={`${API_IMG}/user/${defaultPreview}`}
													className={pict['upload-img']}
													width={300}
													height={300}
													alt='upload'
												/>
											)}
										</label>
										<input
											id='foto'
											type='file'
											name='foto'
											accept='.jpg,.jpeg,.png,.svg'
											onChange={handleChange}
											style={{ display: 'none' }}
										/>
									</div>
								</div>
							</Row>
						</Container>
					</Modal.Body>
					<Modal.Footer className='justify-content-between'>
						<Button variant='outline-dark' onClick={handleClose}>
							<i className='fa-solid fa-xmark' /> Batal
						</Button>

						{defaultPreview !== 'default.jpg' && (
							<Button variant='danger' onClick={handleDelete}>
								<i className='fa-solid fa-trash' /> Hapus
							</Button>
						)}

						<Button variant='primary' type='submit'>
							<i className='fa-solid fa-check' /> Simpan
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
			<ModalHapus
				prefix='Hapus'
				suffix='Foto User'
				show={modalHapus.show}
				id={modalHapus.id}
				handleClose={() => setModalHapus({ show: false, id: '' })}
			/>
		</>
	);
}
