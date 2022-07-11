/* eslint-disable react/destructuring-assignment */
import Form from 'react-bootstrap/Form';
import SelectSearch from 'react-select';
import styles from '../../../styles/Input.module.css';

interface SelectProps {
	label: string;
	placeholder?: string;
	name?: string;
	options?: any;
	value?: any;
	defaultValue?: any;
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
	instanceId?: any;
}

export default function Select(props: Partial<SelectProps>) {
	const { label, options, fieldstate = false } = props;

	return (
		<Form.Group className='mb-3'>
			<Form.Label className={styles.label}>{label}</Form.Label>
			<SelectSearch options={options} isInvalid={!!fieldstate[props.name || '']} {...props} />
			<Form.Control.Feedback type='invalid'>
				{fieldstate[props.name || '']?.message}
			</Form.Control.Feedback>
		</Form.Group>
	);
}
