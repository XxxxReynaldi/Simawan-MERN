/* eslint-disable comma-dangle */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from 'react';
import { Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';

import Gap from '../../atoms/Gap';

interface TablePelanggaranProps {
	data: any;
	edit?: any;
	remove?: any;
}

export default function TablePelanggaran(props: Partial<TablePelanggaranProps>) {
	const { data, edit, remove } = props;

	const columns = useMemo(
		() => [
			{
				name: 'No',
				selector: (row: any, index: any) => index + 1,
				grow: 1,
			},
			{
				name: 'Jenis Pelanggaran',
				selector: (row: any) => row.jenisPelanggaran,
				sortable: true,
				grow: 7,
			},
			{
				name: 'Poin',
				selector: (row: any) => row.jumlahPoin,
				sortable: true,
				grow: 2,
			},

			{
				name: 'Opsi',
				cell: (row: any) => (
					<>
						<Button variant='success' onClick={() => edit(row)}>
							<i className='fas fa-edit ' />
						</Button>
						<Gap width={8} />
						<Button variant='danger' onClick={() => remove(row._id)}>
							<i className='fas fa-trash ' />
						</Button>
					</>
				),
				ignoreRowClick: true,
				allowOverflow: true,
				button: true,
			},
		],
		[]
	);

	return <DataTable columns={columns} data={data} pagination />;
}
