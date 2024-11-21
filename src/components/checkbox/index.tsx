'use client'

import { FC } from 'react'
import clsx from 'clsx'
import CheckMark from '@/svg/checkMark'
import MinusMark from '@/svg/minusMark'
import styles from './index.module.scss'

export type TCheckboxChecked = 'checked' | 'minus' | 'unchecked'

type TProps = {
	checked: TCheckboxChecked
	onClick: (event: React.MouseEvent<HTMLElement>) => void
}

const Checkbox: FC<TProps> = ({ checked, onClick }) => {
	return (
		<div
			className={clsx(styles.container, {
				[styles.active]: ['minus', 'checked'].includes(checked),
			})}
			onClick={onClick}
		>
			{checked === 'checked' ? <CheckMark /> : null}
			{checked === 'minus' ? <MinusMark /> : null}
		</div>
	)
}

export default Checkbox
