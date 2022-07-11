/* eslint-disable react/jsx-one-expression-per-line */
import { Table } from 'react-bootstrap';

interface TableUserProps {
	tableData: any;
}

export default function TableUser(props: Partial<TableUserProps>) {
	const { tableData } = props;

	function dateFormat(date: Date) {
		const dt = new Date(date);

		const options = { day: 'numeric', month: 'long', year: 'numeric' };
		return new Intl.DateTimeFormat('id', options as any).format(dt);
	}

	return (
		<Table hover size='sm' style={{ fontSize: 'small' }}>
			<tbody>
				<tr>
					<td width='30%'>Nama Lengkap</td>
					<td width='5%'>:</td>
					<td>{tableData.namaLengkap}</td>
				</tr>
				<tr>
					<td>NISN</td>
					<td>:</td>
					<td>{tableData.NISN}</td>
				</tr>
				<tr>
					<td>Tempat Lahir / Tanggal Lahir</td>
					<td>:</td>
					<td>
						{tableData.tempatLahir} / {dateFormat(tableData.tanggalLahir)}
					</td>
				</tr>
				<tr>
					<td>Nama Ibu </td>
					<td>:</td>
					<td>{tableData.namaIbu}</td>
				</tr>
				<tr>
					<td>Email </td>
					<td>:</td>
					<td>{tableData.email}</td>
				</tr>
				<tr>
					<td>Telp </td>
					<td>:</td>
					<td>{tableData.telp}</td>
				</tr>
			</tbody>
		</Table>
	);
}
