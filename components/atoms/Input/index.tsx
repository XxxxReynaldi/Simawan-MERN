/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/require-default-props */
import Form from 'react-bootstrap/Form';
import styles from '../../../styles/Input.module.css';

export interface InputProps {
	label: string;
	fieldstate?: any;
	type?: string;
	name?: string;
	placeholder?: string;
	value?: any;
	onClick?: any;
	onChange?: any;
	onFocus?: any;
	min?: any;
	max?: any;
	maxLength?: number;
	required?: boolean;
	readonly?: boolean;
	style?: any;
	className?: any;
}

export default function Input(props: InputProps) {
	const { label, fieldstate = false } = props;

	return (
		<Form.Group className='mb-3'>
			<Form.Label className={styles.label}>{label}</Form.Label>
			<Form.Control className={styles.input} isInvalid={!!fieldstate[props.name || '']} {...props} />
			<Form.Control.Feedback type='invalid'>
				{fieldstate[props.name || '']?.message}
			</Form.Control.Feedback>
		</Form.Group>
	);
}
