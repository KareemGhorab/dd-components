import { FC } from 'react'
import styles from './index.module.scss'
import clsx from 'clsx'

export type TLoadingIndicatorSize = 'normal' | 'small'

type TProps = {
	size?: TLoadingIndicatorSize
}

const LoadingIndicator: FC<TProps> = ({ size = 'normal' }) => {
	return (
		<div
			className={clsx(styles.container, {
				[styles['normal-size']]: size === 'normal',
				[styles['small-size']]: size === 'small',
			})}
		>
			<div />
			<div />
			<div />
			<div />
			<div />
			<div />
			<div />
			<div />
		</div>
	)
}

export default LoadingIndicator
