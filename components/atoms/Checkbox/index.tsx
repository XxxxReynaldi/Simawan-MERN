/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Form from 'react-bootstrap/Form';
import styles from '../../../styles/Input.module.css';

export interface CheckboxProps {
	label: string;
	xId?: string;
	labelcheck: string;
	fieldstate?: any;
	type?: string;
	name?: string;
	placeholder?: string;
	value?: any;
	defaultChecked?: boolean;
	checked?: boolean;
	onChange?: any;
	required?: boolean;
	style?: any;
	className?: any;
}

export default function Checkbox(props: Partial<CheckboxProps>) {
	const { label, xId, labelcheck, fieldstate = false } = props;

	return (
		<Form.Group className='mb-3'>
			<Form.Label className={styles.label}>{label}</Form.Label>
			<div className='form-check'>
				<input className='form-check-input' {...props} />
				<label className='form-check-label' htmlFor={xId}>
					{labelcheck}
				</label>
				<Form.Control.Feedback type='invalid'>
					{fieldstate[props.name || '']?.message}
				</Form.Control.Feedback>
			</div>
		</Form.Group>
	);
}
