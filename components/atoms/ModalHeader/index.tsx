/* eslint-disable react/jsx-one-expression-per-line */
import { Modal } from 'react-bootstrap';

interface ModalHeaderProps {
	prefix: string;
	suffix?: string;
}

export default function ModalHeader(props: Partial<ModalHeaderProps>) {
	const { prefix, suffix } = props;

	return (
		<Modal.Header closeButton>
			<Modal.Title>
				{prefix} {suffix}
			</Modal.Title>
		</Modal.Header>
	);
}
