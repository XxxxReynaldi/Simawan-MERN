export const KelasActionType = {
	TAMBAH: 'TAMBAH',
};

export const tambahKelas = (newKelas) => ({ type: KelasActionType.TAMBAH, kelas: newKelas });
