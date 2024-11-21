import { FC, ReactNode } from 'react'
import clsx from 'clsx'
import styles from './index.module.scss'

type TProps = {
	children?: ReactNode
	className?: string
}

const Card: FC<TProps> = ({ children, className }) => {
	return <div className={clsx(styles.container, className)}>{children}</div>
}

export default Card
