import {
	FC,
	InputHTMLAttributes,
	ReactNode,
	WheelEvent,
	forwardRef,
	Ref,
} from 'react'
import clsx from 'clsx'
import styles from './index.module.scss'

type TProps = {
	error?: boolean
	icon?: ReactNode
} & InputHTMLAttributes<HTMLInputElement>

const Input: FC<TProps> = forwardRef<HTMLInputElement, TProps>(
	({ error = false, icon, className, ...props }, ref) => {
		return (
			<div className={clsx(styles.container)}>
				{icon}
				<input
					onWheel={(e: WheelEvent<HTMLInputElement>) =>
						e.currentTarget.blur()
					}
					ref={ref as Ref<HTMLInputElement>}
					{...props}
					className={clsx(
						{
							[styles.error]: error,
							[styles['with-icon']]: !!icon,
						},
						className
					)}
				/>
			</div>
		)
	}
)

export default Input
