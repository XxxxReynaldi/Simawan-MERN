/* eslint-disable react/destructuring-assignment */
import Form from 'react-bootstrap/Form';
import styles from '../../../styles/Input.module.css';

export interface TextareaProps {
	label: string;
	placeholder?: string;
	fieldstate?: any;
	name?: string;
	type?: string;
	row: number;
	value?: any;
	onChange?: any;
	required?: boolean;
	readonly?: boolean;
	style?: any;
	className?: any;
}

export default function Textarea(props: Partial<TextareaProps>) {
	const { label, row, fieldstate = false } = props;

	return (
		<Form.Group className='mb-3'>
			<Form.Label className={styles.label}>{label}</Form.Label>
			<Form.Control
				className={styles.input}
				isInvalid={!!fieldstate[props.name || '']}
				as='textarea'
				rows={row}
				{...props}
			/>
			<Form.Control.Feedback type='invalid'>
				{fieldstate[props.name || '']?.message}
			</Form.Control.Feedback>
		</Form.Group>
	);
}
