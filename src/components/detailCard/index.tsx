import { PropsWithChildren, FC } from 'react'
import styles from './index.module.scss'

type TProps = {
	title: string
} & PropsWithChildren

const DetailCard: FC<TProps> = ({ title, children }) => {
	return (
		<div className={styles.container}>
			<h4 className={styles.title}>{title}</h4>
			{children}
		</div>
	)
}

export default DetailCard
