import { FC, ReactNode, useEffect } from 'react'
import ReactDOM from 'react-dom'
import './index.module.scss'
import styles from './index.module.scss'
import X from '@/svg/x'

interface TProps {
	open: boolean
	onClose: () => void
	children: ReactNode
}

const Modal: FC<TProps> = ({ open, onClose, children }) => {
	useEffect(() => {
		if (open) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'auto'
		}
		return () => {
			document.body.style.overflow = 'auto'
		}
	}, [open])

	if (!open) return null

	return ReactDOM.createPortal(
		<div className={styles.container}>
			<div className={styles.backdrop} onClick={onClose}></div>
			<div className={styles.content}>
				{children}
				<div className={styles.x} onClick={onClose}>
					<X />
				</div>
			</div>
		</div>,
		document.getElementById('modal-root')!
	)
}

export default Modal
