export interface LoginTypes {
	email: string;
	password: string;
}

export interface RegisterTypes {
	namaLengkap: string;
	NISN: string;
	tempatLahir: string;
	tanggalLahir: Date;
	namaIbu: string;
	telp: string;
	email: string;
	password: string;
}

export interface UserPayloadTypes {
	id: string;
	namaLengkap: string;
	telp: string;
	role: string;
	foto: string;
}

export interface JurusanTypes {
	_id?: string;
	bidangKeahlian: string;
	programKeahlian: string;
	paketKeahlian: string;
	singkatan: string;
	kode: string;
	warna: string;
	status: string;
}

export interface JWTPayloadTypes {
	user: UserPayloadTypes;
	iat: number;
}

export interface KelasTypes {
	_id?: string;
	tingkatan: string;
	keahlian: string;
	abjad: string;
	tahunAjaran: string;
	keterangan: string;
	kode: string;
	status: string;
}

export interface KelasCardTypes {
	_id: string;
	tingkatan: string;
	keahlian: JurusanTypes;
	abjad: string;
	tahunAjaran: string;
	keterangan: string;
	kode: string;
	status: string;
}

export interface PelanggaranTypes {
	_id?: string;
	jenisPelanggaran: string;
	kategori: string;
	jumlahPoin: number;
}

export interface AdminProfileTypes {
	_id: string;
	email: string;
	namaLengkap: string;
}

export interface PasswordChangeTypes {
	_id: string;
	oldPassword: string;
	newPassword: string;
	confirmPass: string;
}

export interface SiswaTypes {
	_id?: string;
	namaLengkap: string;
	NISN: string;
	tempatLahir: string;
	tanggalLahir: Date;
	telp: string;
	email: string;
}
