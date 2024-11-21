import React from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import clsx from 'clsx'
import styles from './index.module.scss'

dayjs.extend(utc)

export type TDateVariant = 'dotted' | 'full'

type TProps = {
	date: string
	variant: TDateVariant
}

const Date: React.FC<TProps> = ({ date, variant }) => {
	switch (variant) {
		case 'dotted':
			return (
				<div className={clsx(styles.container, styles.dotted)}>
					{dayjs(date).format('DD . MM . YYYY')}
				</div>
			)
		case 'full':
			return (
				<div className={clsx(styles.container, styles.full)}>
					{dayjs(date).format('D MMM YYYY h:mm A')}
				</div>
			)
	}
}

export default Date
