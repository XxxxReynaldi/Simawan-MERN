import { useEffect } from 'react';
import SideBar from '../../components/organisms/SideBar';

export default function Index() {
	useEffect(() => {
		document.title = `Halaman Dashboard`;
		return () => {
			document.title = `MERN Stack`;
		};
	});
	return (
		<>
			<SideBar />
			<section className='content-section'>
				<div className='text'>Dashboard</div>
			</section>
		</>
	);
}
