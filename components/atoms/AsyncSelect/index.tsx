/* eslint-disable react/destructuring-assignment */
import Form from 'react-bootstrap/Form';
import styles from '../../../styles/Input.module.css';
import AsyncSelectSearch from 'react-select/async';

interface AsyncSelectProps {
	label: string;
	placeholder?: string;
	name?: string;
	value?: any;
	onChange?: any;
	isInvalid?: any;
	fieldstate?: any;
	required?: boolean;
	readonly?: boolean;
	style?: any;
	className?: any;
	isClearable?: boolean;
	isMulti?: boolean;
	autoFocus?: boolean;
	theme?: any;
	noOptionsMessage?: any;
}

export default function AsyncSelect(props: Partial<AsyncSelectProps>) {
	const { label, options, fieldstate = false } = props;

	return (
		<Form.Group className='mb-3'>
			<Form.Label className={styles.label}>{label}</Form.Label>
			<AsyncSelectSearch options={options} isInvalid={!!fieldstate[props.name || '']} {...props} />
			<Form.Control.Feedback type='invalid'>
				{fieldstate[props.name || '']?.message}
			</Form.Control.Feedback>
		</Form.Group>
	);
}
