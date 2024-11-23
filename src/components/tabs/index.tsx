import { FC, ReactNode, useState } from 'react'
import styles from './index.module.scss'
import clsx from 'clsx'
import Tag from '../tag'
import { TVariant } from '@/types/components'

type TProps = {
	defaultActiveTab: number
	tabs: {
		label: string
		key: number
		children: ReactNode
		variant?: TVariant
		count?: number
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
						{tab.count !== undefined ? (
							<Tag
								variant={
									tab.key === active
										? 'primary'
										: tab.variant || 'secondary'
								}
								text={tab.count.toString()}
							/>
						) : null}
					</div>
				))}
			</div>
			<div>{tabs.find((tab) => tab.key === active)?.children}</div>
		</div>
	)
}

export default Tabs
