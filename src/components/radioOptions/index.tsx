import { FC } from 'react'
import RadioButton from '../radioButton'
import styles from './index.module.scss'
import clsx from 'clsx'

type TProps = {
	name: string
	value: string
	checked: boolean
	label: string
	onClick: (value: string) => void
}

const RadioOption: FC<TProps> = ({ name, value, checked, onClick, label }) => {
	return (
		<div
			className={clsx(styles.container, {
				[styles.checked]: checked,
			})}
			onClick={() => onClick(value)}
		>
			<RadioButton
				name={name}
				value={value}
				checked={checked}
				onChange={(e) => onClick(e.target.value)}
			/>
			<p className={styles.label}>{label}</p>
		</div>
	)
}

export default RadioOption
