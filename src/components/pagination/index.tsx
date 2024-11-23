import { FC, useState } from 'react'
import Select from '../select'
import styles from './index.module.scss'
import DownChevron from '@/svg/downChevron'
import clsx from 'clsx'

type TProps = {
	page: number
	totalRows: number
	onChangePage: (page: number) => void
	onChangePageSize: (pageSize: number) => void
	pageSizeOptions: number[]
	defaultPageSize: number
}

const Pagination: FC<TProps> = ({
	onChangePage,
	onChangePageSize,
	page,
	pageSizeOptions,
	totalRows,
	defaultPageSize,
}) => {
	const [pageSize, setPageSize] = useState<number>(defaultPageSize)

	const totalPages = Math.ceil(totalRows / pageSize)

	const handlePageChange = (page: number) => {
		if (page > totalPages || page < 1) return
		onChangePage(page)
	}

	const handlePageSizeChange = (pageSize: number) => {
		setPageSize(pageSize)
		onChangePageSize(pageSize)
	}

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
					onClick={() => handlePageChange(page - 1)}
				>
					<DownChevron />
				</div>
				<div
					className={clsx({
						[styles.disabled]: page === totalPages,
					})}
					onClick={() => handlePageChange(page + 1)}
				>
					<DownChevron />
				</div>
			</div>
		</div>
	)
}

export default Pagination
