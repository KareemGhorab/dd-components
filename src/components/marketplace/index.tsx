import { FC } from 'react'
import styles from './index.module.scss'
import Noon from '@/svg/noon'
import Minutes from '@/svg/minutes'
import Namshi from '@/svg/namshi'

export type TMarketplace = 'noon' | 'namshi_v2' | 'minutes'

type TProps = {
	marketplace: TMarketplace
}

//TODO: use translation

const Marketplace: FC<TProps> = ({ marketplace }) => {
	switch (marketplace) {
		case 'noon':
			return (
				<div className={styles['container']}>
					<Noon />
					<p className={styles['marketplace']}>Noon</p>
				</div>
			)
		case 'minutes':
			return (
				<div className={styles['container']}>
					<Minutes />
					<p className={styles['marketplace']}>Minutes</p>
				</div>
			)
		case 'namshi_v2':
			return (
				<div className={styles['container']}>
					<Namshi />
					<p className={styles['marketplace']}>Namshi</p>
				</div>
			)
	}
}

export default Marketplace
