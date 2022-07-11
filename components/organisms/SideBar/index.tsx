/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useState } from 'react';
import Menu from '../../molecules/Menu';

import Auth from './auth';

interface SideBarProps {
	activeMenu?: string;
}

export default function SideBar(props: SideBarProps) {
	const { activeMenu } = props;
	const [checked, setChecked] = useState(true);

	return (
		<div className={`sidebar ${checked ? 'open' : ''}`}>
			<div className='logo-details'>
				<i className='bx bxl-c-plus-plus icon-logo' />
				<div className='logo_name'>MERN</div>
				<i
					className='bx bx-menu'
					id='btn-toggle'
					onClick={() => {
						setChecked(!checked);
					}}
				/>
			</div>
			<ul className='nav-list'>
				<Menu
					icon='/icons/users.svg'
					title='Siswa'
					href='/admin/siswa'
					active={activeMenu === 'siswa'}
				/>
				<Menu
					icon='/icons/warning-list.svg'
					title='Pelanggaran'
					href='/admin/pelanggaran'
					active={activeMenu === 'pelanggaran'}
				/>
				<Menu
					icon='/icons/class.svg'
					title='Kelas'
					href='/admin/kelas'
					active={activeMenu === 'kelas'}
				/>
				<Menu
					icon='/icons/study-program.svg'
					title='Jurusan'
					href='/admin/jurusan'
					active={activeMenu === 'jurusan'}
				/>
				<Menu
					icon='/icons/setting.svg'
					title='Pengaturan'
					href='/admin/pengaturan'
					active={activeMenu === 'pengaturan'}
				/>

				<Auth />
			</ul>
		</div>
	);
}
