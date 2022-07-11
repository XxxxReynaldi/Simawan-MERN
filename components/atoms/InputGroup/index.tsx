/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/require-default-props */
import { Form } from 'react-bootstrap';

import styles from '../../../styles/Input.module.css';

interface IGProps {
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
	isInvalid?: any;
	iconsuffix?: any;
	onclicksuffix?: any;
	style?: any;
	className?: any;
}

export default function InputGroup(props: IGProps) {
	const { label, fieldstate = false, iconsuffix } = props;
	const checkInvalid = !!fieldstate[props.name || ''];

	return (
		<div className='form-group mb-3 '>
			<label className={`${styles.label} form-label`}>{label}</label>
			<div className='input-group has-validation'>
				<input
					className={`${styles.input} form-control ${checkInvalid ? 'is-invalid' : ''} `}
					{...props}
				/>
				<span
					className='input-group-text'
					style={{ cursor: 'pointer' }}
					onClick={() => {
						props.onclicksuffix(props.name);
					}}
				>
					<i className={iconsuffix} aria-hidden='true' />
				</span>
				<Form.Control.Feedback type='invalid'>
					{fieldstate[props.name || '']?.message}
				</Form.Control.Feedback>
			</div>
		</div>
	);
}
