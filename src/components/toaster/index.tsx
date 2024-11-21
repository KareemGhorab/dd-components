'use client'

import { useEffect } from 'react'
import styles from './index.module.scss'
import useToaster from '@/context/toasterContext'
import clsx from 'clsx'
import CheckMarkLarge from '@/svg/checkMarkLarge'
import X from '@/svg/x'
import Button from '../button'

const Toaster = () => {
	const { message, variant, open, setOpen, extraAction } = useToaster()

	useEffect(() => {
		const timer = setTimeout(() => setOpen(false), 5000)
		return () => clearTimeout(timer)
	}, [open, message, variant, extraAction])

	const renderIcon = () => {
		switch (variant) {
			case 'success':
				return (
					<div className={clsx(styles.icon, styles['icon-success'])}>
						<CheckMarkLarge />
					</div>
				)
		}
	}

	const renderX = () => {
		switch (variant) {
			case 'success':
				return (
					<div
						onClick={() => setOpen(false)}
						className={clsx(styles.x, styles['x-success'])}
					>
						<X color="#BBF7D0" />
					</div>
				)
			case 'error':
				return (
					<div
						onClick={() => setOpen(false)}
						className={clsx(styles.x, styles['x-error'])}
					>
						<X color="#fee2e2" />
					</div>
				)
			case 'primary': {
				//TODO: Support translation
				return (
					<div className={styles.x} onClick={() => setOpen(false)}>
						Cancel
					</div>
				)
			}
		}
	}

	const renderExtraButtons = () => {
		if (!extraAction) return null

		return (
			<Button
				text={extraAction.text}
				icon={extraAction.icon}
				onClick={extraAction.onClick}
				variant="secondary"
				height="small"
			/>
		)
	}

	if (!open) return null

	return (
		<div className={clsx(styles.container, styles[variant])}>
			{renderIcon()}
			{message}
			<div className={styles.extra}>
				{renderExtraButtons()}
				{renderX()}
			</div>
		</div>
	)
}

export default Toaster
