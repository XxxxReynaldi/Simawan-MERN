/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable import/no-cycle */
/* eslint-disable no-case-declarations */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback, useEffect, useContext, ChangeEvent, SyntheticEvent } from 'react';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

import Input from '../../atoms/Input';
import Textarea from '../../atoms/Textarea';
import Checkbox from '../../atoms/Checkbox';
import CardKelas from '../../atoms/CardKelas';
import ModalHeader from '../../atoms/ModalHeader';
import Select from '../../atoms/Select';

import styles from '../../../styles/ModalKelas.module.css';

import { storeKelas, updateKelas } from '../../../services/kelas';
import { OptionKeahlianContext } from '../../../pages/admin/kelas';

interface ModalKelasProps {
	show: Boolean;
	handleClose: any;
	prefix?: string;
	suffix?: string;
	id?: string;
	payload?: any;
}

export default function ModalKelas(props: Partial<ModalKelasProps>) {
	// let fnCount: number = 1;
	const { show, handleClose, prefix, payload } = props;

	const [formData, setFormData] = useState({
		_id: '',
		kode: '',
		tingkatan: '',
		keahlian: '',
		abjad: '',
		tahunAjaran: '',
		keterangan: '',
		status: 'Y',
	});

	const [prefixKode, setPrefixKode] = useState({
		kodeTingkatan: '',
		kodeKeahlian: '',
		kodeTahunAjaran: '',
	});

	const [kodeKelas, setKodeKelas] = useState('');

	const [checkBoxStatus, setCheckBoxStatus] = useState(true);
	const [field, setField] = useState({});

	const getYear = () => {
		setFormData((prev: any) => ({ ...prev, tahunAjaran: new Date().getFullYear().toString() }));
		setPrefixKode((prev: any) => ({
			...prev,
			kodeTahunAjaran: new Date().getFullYear().toString().substr(-2),
		}));
	};

	useEffect(() => {
		getYear();
		// fnCount += 1;
	}, []);

	const [cardKelas, setCardKelas] = useState({
		_id: '',
		tingkatan: '',
		abjad: '',
		keahlian: { singkatan: '', paketKeahlian: '', warna: '' },
	});

	const [selectedTingkatan, setSelectedTingkatan] = useState(null);
	const options = [
		{ value: 'X', label: 'X', kode: '10' },
		{ value: 'XI', label: 'XI', kode: '11' },
		{ value: 'XII', label: 'XII', kode: '12' },
	];

	const [selectedKeahlian, setSelectedKeahlian] = useState(null);
	const optionKeahlian = useContext(OptionKeahlianContext);

	const selectTingkatanChange = (value: any) => {
		if (value) {
			setSelectedTingkatan(value);
			setFormData((prev: any) => ({ ...prev, tingkatan: value.value }));
			setPrefixKode((prev: any) => ({ ...prev, kodeTingkatan: value.kode }));
			setCardKelas((prev: any) => ({ ...prev, tingkatan: value.value }));
		}
		// fnCount += 1;
	};

	const selectKeahlianChange = (value: any) => {
		if (value) {
			const { kode, singkatan, paketKeahlian, warna } = value;
			setSelectedKeahlian(value);
			setFormData((prev: any) => ({ ...prev, keahlian: value.value }));
			setPrefixKode((prev: any) => ({ ...prev, kodeKeahlian: kode }));
			setCardKelas((prev: any) => ({ ...prev, keahlian: { singkatan, paketKeahlian, warna } }));
		}
		// fnCount += 1;
	};

	const getKelas = useCallback(async (data: any) => {
		const { tingkatan, keahlian } = data;
		const findTingkatan = options.find((option: any) => option.value === tingkatan) as any;
		setSelectedTingkatan(findTingkatan);

		const { _id, singkatan, warna, paketKeahlian, kode } = keahlian;
		const currentKeahlian: any = {
			value: _id,
			label: paketKeahlian,
			kode,
			singkatan,
			paketKeahlian,
			warna,
		};
		setSelectedKeahlian(currentKeahlian);

		setCardKelas({
			_id: data._id,
			abjad: data.abjad,
			tingkatan,
			keahlian: { singkatan, paketKeahlian, warna },
		});

		setFormData(data);

		const checkAktif = data.status;
		if (checkAktif === 'Y') {
			setCheckBoxStatus(true);
		} else if (checkAktif === 'N') {
			setCheckBoxStatus(false);
		}
	}, []);

	useEffect(() => {
		if (payload) {
			getKelas(payload);
		}
		// fnCount += 1;
	}, [payload]);

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		// fnCount += 1;
		const target = e.target as any;
		setFormData((prev: any) => ({
			...prev,
			[target.name]: target.type === 'file' ? target.files : target.value,
		}));

		if (target.type === 'checkbox') {
			setCheckBoxStatus(() => target.checked);
			if (target.checked) {
				setFormData((prev: any) => ({ ...prev, status: 'Y' }));
			} else {
				setFormData((prev: any) => ({ ...prev, status: 'N' }));
			}
		}

		switch (target.name) {
			case 'tahunAjaran':
				setPrefixKode((prev: any) => ({ ...prev, kodeTahunAjaran: target.value.substr(-2) }));
				break;
			case 'abjad':
				setCardKelas((prev: any) => ({ ...prev, abjad: target.value }));
				break;
			default:
				break;
		}
	}

	function handleGenerateKode(e: SyntheticEvent): void {
		// fnCount += 1;
		e.preventDefault();
		const { kodeTingkatan, kodeKeahlian, kodeTahunAjaran } = prefixKode;
		// console.log('prefixKode', prefixKode);
		setKodeKelas(`${kodeTahunAjaran + kodeTingkatan + kodeKeahlian}`);
		setFormData((prev: any) => ({ ...prev, kode: kodeKelas }));
		// console.log('kodeKelas', kodeKelas);
	}

	function resetForm() {
		// fnCount += 1;
		setFormData({
			_id: '',
			kode: '',
			tingkatan: '',
			keahlian: '',
			abjad: '',
			tahunAjaran: '',
			keterangan: '',
			status: 'Y',
		});
		setCardKelas({
			_id: '',
			tingkatan: '',
			abjad: '',
			keahlian: { singkatan: '', paketKeahlian: '', warna: '' },
		});
		setSelectedTingkatan(null);
		setSelectedKeahlian(null);
	}

	const onSubmit = async (e: SyntheticEvent) => {
		// fnCount += 1;
		e.preventDefault();
		setField({});

		switch (prefix) {
			case 'Tambah':
				const storeResponse = (await storeKelas(formData)) as any;
				// console.log(`storeRes`, storeResponse);
				if (storeResponse.error) {
					toast.error('Data Gagal Ditambahkan!');
					setField(storeResponse.fields);
				} else {
					toast.success('Data Berhasil Ditambahkan!');
					resetForm();
					// console.log('fnCount add kelas React: ', fnCount);
					handleClose();
				}
				break;

			case 'Edit':
				const updateResponse = (await updateKelas(formData, payload._id)) as any;
				// console.log('updateResponse', updateResponse);
				if (updateResponse.error) {
					toast.error('Data Gagal Disimpan!');
					setField(updateResponse.fields);
				} else {
					toast.success('Data Berhasil Disimpan!');
					resetForm();
					// console.log('fnCount edit kelas React: ', fnCount);
					handleClose();
				}
				break;

			default:
				break;
		}
	};

	return (
		<Modal show={!!show} onHide={handleClose} size='lg' centered>
			<ModalHeader prefix={prefix} suffix='Kelas' />
			<Form noValidate onSubmit={onSubmit} id='form-kelas'>
				<Modal.Body>
					<Container>
						<Row>
							<Col md={6}>
								<div className={styles['card-center']}>
									<Col className='pt-4'>
										<CardKelas data={cardKelas} />
									</Col>
								</div>
							</Col>
							<Col md={6}>
								<Select
									label='Tingkatan'
									placeholder='Pilih tingkatan'
									name='tingkatan'
									value={selectedTingkatan}
									options={options}
									fieldstate={field}
									isClearable
									onChange={selectTingkatanChange}
									required
								/>
								<Select
									label='Keahlian'
									placeholder='Pilih keahlian'
									name='keahlian'
									value={selectedKeahlian}
									onChange={selectKeahlianChange}
									options={optionKeahlian}
									isClearable
									fieldstate={field}
									required
								/>
								<Input
									label='Abjad Kelas'
									placeholder='Masukkan abjad'
									name='abjad'
									value={formData.abjad.toUpperCase()}
									onChange={handleChange}
									fieldstate={field}
									required
								/>
								<Input
									label='Tahun Ajaran'
									placeholder='Masukkan tahun ajaran'
									name='tahunAjaran'
									value={formData.tahunAjaran}
									onChange={handleChange}
									fieldstate={field}
									required
									type='number'
									min={1970}
									max={3000}
									maxLength={4}
								/>
							</Col>
						</Row>
						<Textarea
							label='Keterangan'
							row={3}
							placeholder='Tulis bila perlu'
							name='keterangan'
							value={formData.keterangan}
							onChange={handleChange}
							fieldstate={field}
							required
						/>
						<Row>
							<Col xs={10}>
								<Input
									label='Kode'
									name='kode'
									value={formData.kode}
									onChange={handleChange}
									fieldstate={field}
									required
									type='number'
								/>
							</Col>
							<Col xs={2} className={styles['btn-position-center']}>
								<Button variant='outline-dark' onClick={handleGenerateKode}>
									Generate
								</Button>
							</Col>
						</Row>

						<Checkbox
							label='Status Kelas'
							labelcheck='Aktif'
							name='status'
							type='checkbox'
							value={formData.status}
							// defaultChecked={checkBoxStatus}
							checked={checkBoxStatus}
							onChange={handleChange}
							fieldstate={field}
							required
						/>
					</Container>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='outline-dark' onClick={handleClose}>
						<i className='fa-solid fa-xmark' /> Batal
					</Button>
					<Button variant={prefix === 'Tambah' ? 'primary' : 'success'} type='submit'>
						<i className='fa-solid fa-check' /> Simpan
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
}
