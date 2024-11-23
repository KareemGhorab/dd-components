'use client'

import { FC } from 'react'
import styles from './index.module.scss'

type TProps = {
	name: string
	value: string
	checked: boolean
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const RadioButton: FC<TProps> = ({ name, value, onChange, checked }) => {
	return (
		<input
			type='radio'
			name={name}
			className={styles.container}
			value={value}
			checked={checked}
			onChange={onChange}
		/>
	)
}

export default RadioButton
