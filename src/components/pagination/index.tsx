import { Dispatch, FC, SetStateAction, useEffect } from 'react'
import clsx from 'clsx'
import DownChevron from '@/svg/downChevron'
import Select from '../select'
import styles from './index.module.scss'

type TProps = {
	totalRows: number
	limitOptions: number[]
	page: number
	setPage: Dispatch<SetStateAction<number>>
	limit: number
	setLimit: Dispatch<SetStateAction<number>>
	onChange?: (page: number, limit: number) => void
}

const Pagination: FC<TProps> = ({
	totalRows,
	limitOptions,
	page,
	setPage,
	limit,
	setLimit,
	onChange,
}) => {
	const totalPages = Math.ceil(totalRows / limit)

	const handlePageChange = (p: number) => {
		if (p > totalPages || p < 1) return
		setPage(p)
	}

	const handlePageIncrement = () => {
		setPage((p) => {
			if (p >= totalPages) return p
			return p + 1
		})
	}

	const handlePageDecrement = () => {
		setPage((p) => {
			if (p <= 1) return p
			return p - 1
		})
	}

	const handlelimitChange = (ps: number) => {
		if (!limitOptions.includes(ps)) return
		setLimit(ps)
		handlePageChange(1)
	}

	useEffect(() => {
		onChange && onChange(page, limit)
	}, [page, limit])

	return (
		<div className={styles.container}>
			<div className={styles['page-size-container']}>
				{/* TODO: Translate */}
				<p>Rows per page</p>
				<Select
					onChange={(ps) => handlelimitChange(+ps)}
					options={limitOptions.map((x) => x.toString())}
					value={limit.toString()}
				/>
			</div>
			<p>
				{/* TODO: Translate */}
				{1 + (page - 1) * limit} -{' '}
				{Math.min(totalRows, page * limit)} of {totalRows}
			</p>
			<div className={styles.arrows}>
				<div
					className={clsx({
						[styles.disabled]: page === 1,
					})}
					onClick={() => handlePageDecrement()}
				>
					<DownChevron />
				</div>
				<div
					className={clsx({
						[styles.disabled]: page === totalPages,
					})}
					onClick={() => handlePageIncrement()}
				>
					<DownChevron />
				</div>
			</div>
		</div>
	)
}

export default Pagination
