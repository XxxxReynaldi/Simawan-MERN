/* eslint-disable jsx-a11y/alt-text */

import Link from 'next/link';
import cx from 'classnames';

interface MenuProps {
	icon: string;
	title: string;
	href: string;
	active?: boolean;
}

export default function Menu(props: Partial<MenuProps>) {
	const { icon, title, active, href = '/#' } = props;
	const classTitle = cx({ active });

	return (
		<li className={classTitle}>
			<Link href={href}>
				<a>
					<div className='icon'>
						<img src={icon} />
					</div>
					<span className='links_name'>{title}</span>
				</a>
			</Link>
			<span className='tooltip'>{title}</span>
		</li>
	);
}
