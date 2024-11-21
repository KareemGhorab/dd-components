import { FC } from 'react'
import styles from './index.module.scss'

type TProps = {
	img: string
	title: string
	subtitle: string
}

const Product: FC<TProps> = ({ img, title, subtitle }) => {
	return (
		<div className={styles.container}>
			<div className={styles['image-container']}>
				<img src={img} alt={title} className={styles.image} />
			</div>
			<div className={styles.content}>
				<h4 className={styles.title}>{title}</h4>
				<h5 className={styles.subtitle}>{subtitle}</h5>
			</div>
		</div>
	)
}

export default Product
