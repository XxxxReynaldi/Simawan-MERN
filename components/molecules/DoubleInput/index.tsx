/* eslint-disable react/destructuring-assignment */
import { Row, Col, Form } from 'react-bootstrap';
import styles from '../../../styles/Input.module.css';

export interface DoubleInputProps {
	label: string;
	placeholder1?: string;
	placeholder2?: string;
	type1?: string;
	type2?: string;
	readOnly1: boolean;
	readOnly2: boolean;
	col1: number;
	col2: number;
	name1?: string;
	name2?: string;
	val1?: any;
	val2?: any;
	onChange1?: any;
	onChange2?: any;
	fieldstate?: any;
}

export default function DoubleInput(props: Partial<DoubleInputProps>) {
	const {
		label,
		placeholder1,
		placeholder2,
		type1 = 'text',
		type2 = 'text',
		col1,
		col2,
		name1,
		name2,
		val1,
		val2,
		onChange1,
		onChange2,
		readOnly1 = false,
		readOnly2 = false,
		fieldstate = false,
	} = props;

	return (
		<Form.Group className='mb-3'>
			<Form.Label className={styles.label}>{label}</Form.Label>
			<Row>
				<Col xs={col1}>
					<Form.Control
						className={styles.input}
						type={type1}
						placeholder={placeholder1}
						name={name1}
						value={val1}
						onChange={onChange1}
						isInvalid={!!fieldstate[props.name1 || '']}
						disabled={readOnly1}
						required
					/>
					<Form.Control.Feedback type='invalid'>
						{fieldstate[props.name1 || '']?.message}
					</Form.Control.Feedback>
				</Col>
				<Col xs={col2}>
					<Form.Control
						className={styles.input}
						type={type2}
						placeholder={placeholder2}
						name={name2}
						value={val2}
						onChange={onChange2}
						isInvalid={!!fieldstate[props.name2 || '']}
						readOnly={readOnly2}
						required
					/>
					<Form.Control.Feedback type='invalid'>
						{fieldstate[props.name2 || '']?.message}
					</Form.Control.Feedback>
				</Col>
			</Row>
		</Form.Group>
	);
}
