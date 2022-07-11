import Form from 'react-bootstrap/Form';

export interface ColorPickerProps {
	label: string;
	fieldstate?: any;
	type?: string;
	name?: string;
	placeholder?: string;
	value?: any;
	defaultValue?: string;
	onChange?: any;
	required?: boolean;
	style?: any;
	className?: any;
}

export default function ColorPicker(props: Partial<ColorPickerProps>) {
	const { label, fieldstate = false, placeholder } = props;

	return (
		<Form.Group className='mb-3'>
			<Form.Label htmlFor='exampleColorInput'>{label}</Form.Label>
			<Form.Control
				id='exampleColorInput'
				title={placeholder}
				style={{ paddingStart: '12px' }}
				{...props}
			/>
		</Form.Group>
	);
}
