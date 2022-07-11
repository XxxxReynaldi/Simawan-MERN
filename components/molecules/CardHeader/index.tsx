/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-one-expression-per-line */
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import sCard from '../../../styles/Card.module.css';

export interface CardheaderProps {
	title: string;
	countNum?: number | string;
	subtitle: string;
	cardButton?: string;
	add?: any;
}

export default function CardHeader(props: Partial<CardheaderProps>) {
	const { title, countNum, subtitle, add } = props;

	return (
		<Card className={sCard['card-header']}>
			<Card.Body>
				<Container>
					<Row>
						<Col md={1} style={{ padding: '0' }} className='my-auto'>
							<Button variant='primary' size='lg' style={{ borderRadius: '50%' }} onClick={() => add()}>
								<i className='fas fa-plus' style={{ fontSize: '1.8rem' }} />
							</Button>
						</Col>
						<Col md={11} style={{ borderLeft: '2px solid #efefef' }}>
							<Card.Title>
								{title} {countNum}
							</Card.Title>
							<Card.Text style={{ fontSize: '12px' }}>{subtitle}</Card.Text>
						</Col>
					</Row>
				</Container>
			</Card.Body>
		</Card>
	);
}
