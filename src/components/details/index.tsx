import { FC } from 'react'
import styles from './index.module.scss'

type TProps = {
	title: string
	subtitle: string
}

const Details: FC<TProps> = ({ title, subtitle }) => {
	return (
		<div className={styles.container}>
			<h3 className={styles.title}>{title}</h3>
			<p className={styles.subtitle}>{subtitle}</p>
		</div>
	)
}

export default Details
