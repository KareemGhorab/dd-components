import { Dispatch, FC, SetStateAction, useEffect } from 'react'
import clsx from 'clsx'
import DownChevron from '@/svg/downChevron'
import Select from '../select'
import styles from './index.module.scss'

type TProps = {
	totalRows: number
	pageSizeOptions: number[]
	page: number
	setPage: Dispatch<SetStateAction<number>>
	onChangePage: (page: number) => void
	pageSize: number
	setPageSize: Dispatch<SetStateAction<number>>
	onChangePageSize: (pageSize: number) => void
}

const Pagination: FC<TProps> = ({
	totalRows,
	pageSizeOptions,
	page,
	setPage,
	onChangePage,
	pageSize,
	setPageSize,
	onChangePageSize,
}) => {
	const totalPages = Math.ceil(totalRows / pageSize)

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

	const handlePageSizeChange = (ps: number) => {
		if (!pageSizeOptions.includes(ps)) return
		setPageSize(ps)
		handlePageChange(1)
	}

	useEffect(() => onChangePageSize(pageSize), [pageSize])
	useEffect(() => onChangePage(page), [page])

	return (
		<div className={styles.container}>
			<div className={styles['page-size-container']}>
				{/* TODO: Translate */}
				<p>Rows per page</p>
				<Select
					onChange={(ps) => handlePageSizeChange(+ps)}
					options={pageSizeOptions.map((x) => x.toString())}
					value={pageSize.toString()}
				/>
			</div>
			<p>
				{/* TODO: Translate */}
				{1 + (page - 1) * pageSize} -{' '}
				{Math.min(totalRows, page * pageSize)} of {totalRows}
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
