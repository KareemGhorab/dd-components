import { FC, ReactNode } from 'react'
import styles from './index.module.scss'

type TProps = {
	title: string
	subtitle?: string
	children?: ReactNode | ReactNode[]
}

const Header: FC<TProps> = ({ title, subtitle, children }) => {
	return (
		<header className={styles.container}>
			<div className={styles.content}>
				<h2 className={styles.title}>{title}</h2>
				<p className={styles.subtitle}>{subtitle}</p>
			</div>
			<div className={styles.extras}>{children}</div>
		</header>
	)
}

export default Header
