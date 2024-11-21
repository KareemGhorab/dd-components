import { Dispatch, FC, ReactNode, SetStateAction } from 'react'
import styles from './index.module.scss'
import clsx from 'clsx'
import LoadingIndicator from '../loadingIndicator'
import Checkbox, { TCheckboxChecked } from '../checkbox'

//TODO: Add support for nested tables
//TODO: Add the small arrow thingy to make it responsive (fixed and hidable columns)
//TODO: Add support for sorting using the url changing (idx key as param value)
//TODO: Add table footer

export type TTableColumnTitlePlacement = 'start' | 'end'

type TProps = {
	columns: {
		title: string
		dataIndex: string
		key: string
		placement?: TTableColumnTitlePlacement
		renderCell?: (
			data: string,
			record: { [dataIndex: string]: string }
		) => string | ReactNode
		width?: number
	}[]
	dataSource: { key: string; [dataIndex: string]: string }[]
	loading?: boolean
	// TODO: make the empty state a react node if needed
	emptyState: {
		title: string
		subtitle: string
		icon: ReactNode
	}
	selection?: {
		selectedRows: number[]
		setSelectedRows: Dispatch<SetStateAction<number[]>>
	}
}

const defaultRenderCell = (data: string) => data

const Table: FC<TProps> = ({
	columns,
	dataSource,
	loading = false,
	emptyState,
	selection,
}) => {
	const selectionCheckboxState: TCheckboxChecked = selection
		? selection.selectedRows.length === dataSource.length
			? 'checked'
			: !!selection.selectedRows.length
			? 'minus'
			: 'unchecked'
		: 'unchecked'

	const handleSelectionHeadClick = () => {
		if (!selection) return
		switch (selectionCheckboxState) {
			case 'minus':
			case 'checked':
				selection.setSelectedRows([])
				return
			case 'unchecked':
				selection.setSelectedRows(dataSource.map((_, idx) => idx))
				return
		}
	}

	return (
		<>
			<table className={styles.table}>
				<thead className={styles['table-head']}>
					<tr>
						{!!selection ? (
							<th className={styles['column-selection-head']}>
								<Checkbox
									checked={selectionCheckboxState}
									onClick={() => handleSelectionHeadClick()}
								/>
							</th>
						) : null}
						{columns.map(
							({ key, title, placement = 'start', width }) => {
								return (
									<th
										key={key}
										className={clsx(styles['column-head'], {
											[styles['start-placement']]:
												placement === 'start',
											[styles['end-placement']]:
												placement === 'end',
										})}
										style={{
											...(!!width && width > 0
												? { width }
												: null),
										}}
									>
										{title}
									</th>
								)
							}
						)}
					</tr>
				</thead>
				{!!dataSource && !loading ? (
					<tbody>
						{dataSource.map(({ key, ...ds }, idx) => {
							return (
								<tr
									key={key}
									className={clsx({
										[styles['active-row']]:
											selection?.selectedRows.includes(
												idx
											),
									})}
								>
									{selection ? (
										<td className={styles['table-cell']}>
											<Checkbox
												checked={
													selection.selectedRows.includes(
														idx
													)
														? 'checked'
														: 'unchecked'
												}
												onClick={() =>
													selection.setSelectedRows(
														(prev) => {
															if (
																prev.includes(
																	idx
																)
															) {
																return prev.filter(
																	(i) =>
																		i !==
																		idx
																)
															} else {
																return [
																	...prev,
																	idx,
																]
															}
														}
													)
												}
											/>
										</td>
									) : null}
									{columns.map(
										({
											dataIndex,
											renderCell = defaultRenderCell,
											key: colKey,
										}) => {
											return (
												<td
													key={`${colKey}-${key}`}
													className={
														styles['table-cell']
													}
												>
													{renderCell(
														ds[dataIndex],
														ds
													)}
												</td>
											)
										}
									)}
								</tr>
							)
						})}
					</tbody>
				) : null}
			</table>
			{loading ? (
				<div className={styles['loading-container']}>
					<LoadingIndicator />
				</div>
			) : !dataSource.length ? (
				<div className={styles['empty-container']}>
					{emptyState.icon}
					<div className={styles['empty-container-content']}>
						<p className={styles['empty-container-title']}>
							{emptyState.title}
						</p>
						<small className={styles['empty-container-subtitle']}>
							{emptyState.subtitle}
						</small>
					</div>
				</div>
			) : null}
		</>
	)
}

export default Table
