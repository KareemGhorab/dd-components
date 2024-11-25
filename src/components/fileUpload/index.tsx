import {
	ChangeEvent,
	Dispatch,
	FC,
	SetStateAction,
	useRef,
	useState,
} from 'react'
import styles from './index.module.scss'
import Upload from '@/svg/upload'
import Button from '../button'
import Pdf from '@/svg/pdf'
import File from '@/svg/file'
import Bin from '@/svg/bin'
import clsx from 'clsx'

const MAX_SIZE = 1024 * 1024 * 1024

const renderFileIcon = (file?: File | null) => {
	switch (file && file.type) {
		case 'application/pdf':
			return <Pdf />
		default:
			return <File />
	}
}

type TProps = {
	title: string
	description: string
	buttonLabel: string
	errors: string[]
	setErrors: Dispatch<SetStateAction<string[]>>
	file: File | null
	setFile: Dispatch<SetStateAction<File | null>>
	onFileUpload: (file: File) => Promise<void>
	onFileRemoval: () => Promise<void>
	isLoading: boolean
}

const FileUpload: FC<TProps> = ({
	buttonLabel,
	description,
	title,
	errors,
	setErrors,
	file,
	setFile,
	onFileUpload,
	onFileRemoval,
	isLoading,
}) => {
	const inputRef = useRef<HTMLInputElement>(null)

	const phase = isLoading ? 'loading' : file ? 'uploaded' : 'upload'

	const validateFile = (file: File) => {
		if (file.size > MAX_SIZE) {
			//TODO: Translate
			return 'File size must be less than 1GB'
		}
	}

	const handleFileRemoval = async () => {
		setErrors([])
		await onFileRemoval()
		setFile(null)
	}

	const handleFileUpload = async (file: File) => {
		setErrors([])
		const error = validateFile(file)
		if (error) return setErrors([error])
		setFile(file)
		await onFileUpload(file)
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			handleFileUpload(e.target.files[0])
		}
	}

	switch (phase) {
		case 'upload':
			return (
				<div className={styles.container}>
					<div
						className={clsx(
							styles['sub-container'],
							styles['sub-container-upload']
						)}
					>
						<Upload />
						<div className={styles.content}>
							<h4 className={styles.title}>{title}</h4>
							<p className={styles.description}>{description}</p>
						</div>
					</div>
					<Button
						className={styles['upload-button']}
						variant='secondary'
						height='small'
						text={buttonLabel}
						icon={null}
						onClick={() => inputRef.current?.click()}
					/>
					<input
						className={styles['file-input']}
						ref={inputRef}
						type='file'
						onChange={handleFileChange}
					/>
				</div>
			)
		case 'loading':
			return (
				<div className={styles.container}>
					<div
						className={clsx(
							styles['sub-container'],
							styles['sub-container-remove']
						)}
					>
						{renderFileIcon(file)}
						<div className={styles.content}>
							<h4 className={styles.title}>{file!.name}</h4>
							<p className={styles.description}>
								{(+file!.size / (1024 * 1024)).toFixed(2)} MB
							</p>
						</div>
					</div>
					<Button
						className={styles['remove-button']}
						variant='none'
						height='small'
						icon={<Bin />}
						onClick={handleFileRemoval}
						text=''
					/>
				</div>
			)
		case 'uploaded':
			return (
				<div className={styles.container}>
					<div
						className={clsx(
							styles['sub-container'],
							styles['sub-container-remove']
						)}
					>
						{renderFileIcon(file)}
						<div className={styles.content}>
							<h4 className={styles.title}>{file!.name}</h4>
							<p className={styles.description}>
								{(+file!.size / (1024 * 1024)).toFixed(2)} MB
							</p>
						</div>
					</div>
					<Button
						className={styles['remove-button']}
						variant='none'
						height='small'
						icon={<Bin />}
						onClick={handleFileRemoval}
						text=''
					/>
				</div>
			)
	}
}

export default FileUpload
