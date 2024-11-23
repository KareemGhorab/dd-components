import { FC, ReactNode } from 'react'
import styles from './index.module.scss'
import clsx from 'clsx'
import { TVariant } from '@/types/components'

export type TTagType = 'solid' | 'outline'

type TProps = {
	variant: TVariant
	text: string
	icon?: ReactNode
	type?: TTagType
}

const Tag: FC<TProps> = ({ variant, text, icon, type = 'solid' }) => {
	return (
		<div className={clsx(styles.container, styles[variant], styles[type])}>
			{icon}
			<p>{text}</p>
		</div>
	)
}

export default Tag
