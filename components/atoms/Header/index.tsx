export interface HeaderProps {
	title: string;
	subtitle: string;
}

export default function Header(props: Partial<HeaderProps>) {
	const { title, subtitle } = props;
	return (
		<>
			<div className='heading-title'>{title}</div>
			<p className='heading-subtitle text-muted'>{subtitle}</p>
		</>
	);
}
