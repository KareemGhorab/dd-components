'use client'

import { ButtonHTMLAttributes, FC, ReactNode, useState } from 'react'
import styles from './index.module.scss'
import clsx from 'clsx'
import LoadingIndicator from '../loadingIndicator'
import DownChevron from '@/svg/downChevron'
import ClickAwayListener from '../clickAwayListener'
import { TVariant } from '@/types/components'

export type TButtonExtraActionVariant = 'danger'
export type TButtonHeight = 'normal' | 'large' | 'small'
export type TButtonTextSize = 'normal' | 'small'

//TODO: Add two options for loading (just loader, loader instead of icon)

type TProps = ({
	variant: TVariant | 'link' | 'none'
	loading?: boolean
	fill?: boolean
	height?: TButtonHeight
	textSize?: TButtonTextSize
	extraActions?: ({
		variant: TButtonExtraActionVariant
		onClick: () => void
	} & {
		text: string
		icon: ReactNode
	})[]
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>) &
	(
		| { children: ReactNode }
		| {
				text: string
				icon: ReactNode
		  }
	)

const Button: FC<TProps> = ({
	variant,
	fill,
	height = 'normal',
	textSize = 'normal',
	className = false,
	loading = false,
	disabled,
	extraActions,
	...props
}) => {
	const [extrasOpen, setExtrasOpen] = useState<boolean>(false)

	return (
		<ClickAwayListener
			className={styles['container']}
			onClick={() => setExtrasOpen(false)}
		>
			<div className={styles['button-container']}>
				<button
					className={clsx(
						styles.button,
						styles[variant],
						{
							[styles.fill]: fill,
							[styles.fit]: !fill,
							[styles['normal-height']]: height === 'normal',
							[styles['large-height']]: height === 'large',
							[styles['small-height']]: height === 'small',
							[styles['normal-text']]: textSize === 'normal',
							[styles['small-text']]: textSize === 'small',
							[styles['with-extra']]: !!extraActions,
						},
						className
					)}
					disabled={disabled || loading}
					{...props}
				>
					{loading ? (
						<LoadingIndicator size='small' />
					) : 'children' in props ? (
						props.children
					) : (
						<>
							{props.icon} {props.text}
						</>
					)}
				</button>
				{extraActions ? (
					<button
						className={clsx(styles.extras, {
							[styles['normal-height']]: height === 'normal',
							[styles['large-height']]: height === 'large',
							[styles['small-height']]: height === 'small',
							[styles.active]: extrasOpen,
						})}
						onClick={() => setExtrasOpen((prev) => !prev)}
					>
						<DownChevron />
					</button>
				) : null}
			</div>
			{!!extraActions && extrasOpen ? (
				<ul className={styles['extras-menu']}>
					{extraActions.map(({ icon, onClick, text, variant }) => (
						<li
							className={clsx(styles['extra-action'], {
								[styles['extra-danger']]: variant === 'danger',
							})}
							key={text}
							onClick={onClick}
						>
							{icon}
							{text}
						</li>
					))}
				</ul>
			) : null}
		</ClickAwayListener>
	)
}

export default Button
