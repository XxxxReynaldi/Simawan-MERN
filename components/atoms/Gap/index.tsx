/* eslint-disable react/require-default-props */
interface GapProps {
	width?: number;
	height?: number;
}

export default function Gap(props: GapProps) {
	const { width, height } = props;
	return <div style={{ width, height }} />;
}
