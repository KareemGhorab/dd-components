import { useState } from 'react'
import styles from './index.module.scss'

type TProps = {
	
}

const FileUpload = () => {
	const [phase, setPhase] = useState<'upload' | 'loading' | 'uploaded'>(
		'upload'
	)

	switch (phase) {
		case 'upload':
			return <div className={styles.container}></div>
		case 'loading':
			return <div className={styles.container}></div>
		case 'uploaded':
			return <div className={styles.container}></div>
	}
}

export default FileUpload
