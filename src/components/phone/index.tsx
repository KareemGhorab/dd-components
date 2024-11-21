import { FC } from 'react'
import PhoneIcon from '@/svg/phoneIcon'
import styles from './index.module.scss'

type TProps = {
	phone: string
}

const Phone: FC<TProps> = ({ phone }) => {
	return (
		<div className={styles.container}>
			<PhoneIcon />
			<p className={styles.phone}>{phone}</p>
		</div>
	)
}

export default Phone
