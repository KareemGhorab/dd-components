'use client'

import { FC, PropsWithChildren, useEffect, useRef } from 'react'

type TProps = {
	onClick: () => void
	className?: string
} & PropsWithChildren

const ClickAwayListener: FC<TProps> = ({
	onClick,
	children,
	className = '',
}) => {
	const wrapperRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				wrapperRef.current &&
				!wrapperRef.current.contains(event.target as Node)
			) {
				onClick()
			}
		}

		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [onClick])

	return (
		<div ref={wrapperRef} className={className}>
			{children}
		</div>
	)
}

export default ClickAwayListener
