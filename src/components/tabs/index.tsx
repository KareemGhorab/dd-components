import { FC, ReactNode, useState } from 'react'
import styles from './index.module.scss'
import clsx from 'clsx'

type TProps = {
	defaultActiveTab: number
	tabs: {
		label: string
		key: number
		children: ReactNode
	}[]
	onChange?: (active: number) => void
}

const Tabs: FC<TProps> = ({ defaultActiveTab, tabs, onChange }) => {
	const [active, setActive] = useState<number>(defaultActiveTab)

	return (
		<div className={styles.container}>
			<div className={styles.tabs}>
				{tabs.map((tab) => (
					<div
						key={tab.key}
						className={clsx(styles.tab, {
							[styles.active]: tab.key === active,
						})}
						onClick={() => {
							onChange && onChange(tab.key)
							setActive(tab.key)
						}}
					>
						{tab.label}
					</div>
				))}
			</div>
			<div>{tabs.find((tab) => tab.key === active)?.children}</div>
		</div>
	)
}

export default Tabs
