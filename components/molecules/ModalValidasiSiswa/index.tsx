/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable import/no-cycle */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable @next/next/no-img-element */
import { useContext, useState, useEffect, ChangeEvent, SyntheticEvent } from 'react';
import { Container, Row, Col, Table, Button, Modal, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

import Gap from '../../atoms/Gap';
import ModalHeader from '../../atoms/ModalHeader';
import Select from '../../atoms/Select';
import CardKelas from '../../atoms/CardKelas';
import DoubleInput from '../DoubleInput';
import TableUser from '../TableUser';
import { generateNIS, validation } from '../../../services/validasiUser';
import { OptionKelasContext } from '../../../pages/admin/siswa/validasi';

interface ModalValidasiSiswaProps {
	show: Boolean;
	handleClose: any;
	prefix?: string;
	suffix?: string;
	id?: string;
	payload?: any;
}

export default function ModalValidasiSiswa(props: Partial<ModalValidasiSiswaProps>) {
	const { show, handleClose, prefix, suffix, id = '', payload } = props;

	const [field, setField] = useState({});
	const [formData, setFormData] = useState({ kelas: '', prefixNIS: '', NIS: 0 });
	const [tableData, setTableData] = useState({
		_id: '',
		namaLengkap: '',
		NISN: '',
		tempatLahir: '',
		tanggalLahir: new Date(),
		namaIbu: '',
		telp: '',
		email: '',
	});

	const [cardKelas, setCardKelas] = useState({
		_id: '',
		tingkatan: '',
		abjad: '',
		keahlian: { singkatan: '', paketKeahlian: '', warna: '' },
		jumlahSiswa: 0,
	});

	const [selectedKelas, setSelectedKelas] = useState(null);
	const optionKelas = useContext(OptionKelasContext);
	const selectKelasChange = (value: any) => {
		if (value) {
			const { singkatan, paketKeahlian, warna } = value.keahlian;
			const { tingkatan, abjad, kode, jumlahSiswa } = value;
			const prefixKode = kode.substr(0, 2);
			const infixKode = kode.substr(4);
			const prefixNIS = prefixKode + infixKode;
			setSelectedKelas(value);
			setFormData((prev: any) => ({ ...prev, kelas: value.value, prefixNIS }));
			setCardKelas((prev: any) => ({
				...prev,
				tingkatan,
				keahlian: { singkatan, paketKeahlian, warna },
				abjad,
				jumlahSiswa,
			}));
		}
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const target = e.target as any;

		setFormData((prev: any) => ({
			...prev,
			[target.name]: target.type === 'file' ? target.files : target.value,
		}));
	};

	const handleNIS = async (e: SyntheticEvent) => {
		e.preventDefault();
		setField({});
		if (!formData.kelas) {
			return toast.error('Kelas belum dipilih');
		}

		const response = (await generateNIS({ kelas: formData.kelas })) as any;
		if (response.error) {
			toast.error(response.message);
			setField(response.fields);
		} else {
			toast.success(response.data.message);
			setFormData((prev: any) => ({
				...prev,
				NIS: response.data.data,
			}));
		}
	};

	function resetForm() {
		setFormData((prev: any) => ({ kelas: '', prefixNIS: '', NIS: 0 }));
		setSelectedKelas(null);
	}

	const onSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();
		if (!formData.kelas || formData.NIS === 0) {
			return toast.error('Data Gagal Divalidasi');
		}
		const response = await validation(formData, payload._id);
		if (response.error) {
			toast.error(response.message);
		} else {
			toast.success('Data berhasil divalidasi');
			resetForm();
			handleClose();
		}
	};

	useEffect(() => {
		if (payload) {
			const { _id, namaLengkap, NISN, tempatLahir, tanggalLahir, namaIbu, telp, email } = payload;
			setTableData((prev: any) => ({
				_id,
				namaLengkap: namaLengkap.replace(/(^\w{1})|(\s+\w{1})/g, (letter: string) =>
					letter.toUpperCase()
				),
				NISN,
				tempatLahir: tempatLahir.replace(/(^\w{1})|(\s+\w{1})/g, (letter: string) =>
					letter.toUpperCase()
				),
				tanggalLahir,
				namaIbu: namaIbu.replace(/(^\w{1})|(\s+\w{1})/g, (letter: string) => letter.toUpperCase()),
				telp,
				email,
			}));
		}

		return () => {};
	}, [payload]);

	return (
		<Modal show={show} onHide={handleClose} backdrop='static' size='xl' centered>
			<ModalHeader prefix={prefix} suffix='Siswa' />
			<Form noValidate onSubmit={onSubmit} id='form-upload-img'>
				<Modal.Body>
					<Container>
						<Row>
							<Col md={4}>
								<Select
									label='Kelas'
									placeholder='Pilih kelas'
									name='kelas'
									value={selectedKelas}
									onChange={selectKelasChange}
									options={optionKelas}
									isClearable
									fieldstate={field}
									required
								/>
								<Gap height={16} />
								<CardKelas data={cardKelas} />
							</Col>
							<Col md={1} />
							<Col md={7}>
								<TableUser tableData={tableData} />
								<Row>
									<Col xs={10}>
										<DoubleInput
											label='Kode'
											col1={5}
											col2={7}
											type1='number'
											type2='number'
											readOnly1
											placeholder2='Masukkan NIS'
											name1='prefixNIS'
											name2='NIS'
											val1={formData.prefixNIS}
											val2={formData.NIS}
											onChange1={handleChange}
											onChange2={handleChange}
											fieldstate={field}
										/>
									</Col>
									<Col
										xs={2}
										style={{
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											padding: '2rem 0',
										}}
									>
										<Button variant='outline-dark' onClick={handleNIS}>
											Generate
										</Button>
									</Col>
								</Row>
							</Col>
						</Row>
					</Container>
				</Modal.Body>
				<Modal.Footer className='justify-content-center'>
					<Button variant='outline-dark' onClick={handleClose}>
						<i className='fa-solid fa-xmark' /> Batal
					</Button>
					<Button variant='primary' type='submit'>
						<i className='fa-solid fa-check' /> Simpan
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
}
