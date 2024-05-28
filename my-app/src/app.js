import styles from './app.module.css';
import { useState } from 'react';

const NUMS = [
	{ id: '001', btn: '1' },
	{ id: '002', btn: '2' },
	{ id: '003', btn: '3' },
	{ id: '004', btn: '4' },
	{ id: '005', btn: '5' },
	{ id: '006', btn: '6' },
	{ id: '007', btn: '7' },
	{ id: '008', btn: '8' },
	{ id: '009', btn: '9' },
	{ id: '010', btn: '0' },
];

const OPERATORS = [
	{ id: '011', btn: 'C' },
	{ id: '012', btn: '+' },
	{ id: '013', btn: '-' },
	{ id: '014', btn: '=' },
];

export const App = () => {
	const [operand1, setOperand1] = useState('');
	const [operator, setOperator] = useState('');
	const [operand2, setOperand2] = useState('');

	const addNum = (event) => {
		if (operator === '') {
			setOperand1((value) => value + event.target.textContent);
		} else if (operator === '=') {
			setOperand1(event.target.textContent);
			setOperator('');
		} else {
			setOperand2((value) => value + event.target.textContent);
		}
	};

	const addOperator = (event) => {
		if (event.target.textContent === '=') {
			setOperand1(
				operator === '+'
					? Number(operand1) + Number(operand2)
					: Number(operand1) - Number(operand2),
			);
			setOperand2('');
			setOperator('=');
		} else if (event.target.textContent === 'C') {
			setOperand1('');
			setOperand2('');
			setOperator('');
		} else if (event.target.textContent === '-' && operand1 === '') {
			setOperand1('-');
		} else if (event.target.textContent === '+' && operand1 === '') {
		} else if (
			(event.target.textContent === '+' || event.target.textContent === '-') &&
			operand1 !== '' &&
			operand2 !== ''
		) {
			setOperand1(
				operator === '+'
					? Number(operand1) + Number(operand2)
					: Number(operand1) - Number(operand2),
			);
			setOperand2('');
			setOperator(event.target.textContent);
		} else setOperator(event.target.textContent);
	};

	return (
		<div className={styles.container}>
			<div className={styles.display}>
				<h1
					className={
						styles.displayInfo +
						' ' +
						(operator === '=' ? styles.result : null)
					}
				>
					{operand1 + (operator === '=' ? null : operator) + operand2}
				</h1>
			</div>
			<div className={styles.keyboard}>
				<div className={styles.numpad}>
					<ul>
						{NUMS.map(({ id, btn }) => (
							<li key={id}>
								<button className={styles.numBtn} onClick={addNum}>
									{btn}
								</button>
							</li>
						))}
					</ul>
				</div>
				<div className={styles.operatorPad}>
					<ul>
						{OPERATORS.map(({ id, btn }) => (
							<li key={id}>
								<button
									className={
										styles.numBtn +
										' ' +
										(btn === '+' ? styles.btnPlus : null) +
										' ' +
										(btn === '-' ? styles.btnMinus : null)
									}
									onClick={addOperator}
								>
									{btn}
								</button>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};
