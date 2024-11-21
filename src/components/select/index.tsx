import { Dispatch, FC, ReactNode, SetStateAction, useState } from 'react'
import ClickAwayListener from '../clickAwayListener'
import styles from './index.module.scss'
import DownChevron from '@/svg/downChevron'
import clsx from 'clsx'
import Input from '../input'
import SearchGlass from '@/svg/searchGlass'

//Done: Align with design team on the searchbar design
//Done: Debug the max list max-height

type TProps = {
	options: string[]
	renderOption?: (option: string, active: boolean) => ReactNode
	searchable?: boolean
	className?: string
} & (
	| {
			multiple?: false
			value: string
			onChange: Dispatch<SetStateAction<string>>
			renderValue?: (value: string) => ReactNode
	  }
	| {
			multiple: true
			value: string[]
			onChange: Dispatch<SetStateAction<string[]>>
			renderValue?: (value: string[]) => ReactNode
	  }
)

const Select: FC<TProps> = ({
	onChange,
	options,
	renderValue,
	value,
	multiple,
	renderOption,
	className = '',
	searchable = false,
}) => {
	const [open, setOpen] = useState<boolean>(false)
	const [search, setSearch] = useState<string>('')

	const filteredOptions = search
		? options.filter((option) =>
				option.toLowerCase().includes(search.toLowerCase())
		  )
		: options

	const renderSearchbar = () => {
		if (!searchable) return null
		return (
			<div className={styles['searchbar-container']}>
				<Input
					className={styles.searchbar}
					type='text'
					icon={<SearchGlass />}
					onChange={(e) => setSearch(e.target.value)}
					value={search}
					//TODO: Translation support
					placeholder='Search...'
				/>
			</div>
		)
	}

	if (multiple) {
		return (
			<div className={clsx(styles.container, className)}>
				<ClickAwayListener onClick={() => setOpen(false)}>
					<div
						className={styles.value}
						onClick={() => setOpen((val) => !val)}
					>
						{renderValue ? renderValue(value) : value.join(',')}
						<div
							className={clsx(styles.chevron, {
								[styles['chevron-open']]: open,
							})}
						>
							<DownChevron />
						</div>
					</div>
					{open ? (
						<div className={styles['list-container']}>
							<ul className={styles.list}>
								{renderSearchbar()}
								{filteredOptions.map((option) => {
									const active = value.includes(option)
									return (
										<li
											key={option}
											onClick={() => {
												onChange((prev) => {
													if (prev.includes(option)) {
														return prev.filter(
															(val) =>
																val !== option
														)
													} else {
														return [...prev, option]
													}
												})
											}}
											className={clsx(styles.option, {
												[styles.active]: active,
											})}
										>
											{renderOption
												? renderOption(option, active)
												: option}
										</li>
									)
								})}
							</ul>
						</div>
					) : null}
				</ClickAwayListener>
			</div>
		)
	} else {
		return (
			<div className={clsx(styles.container, className)}>
				<ClickAwayListener onClick={() => setOpen(false)}>
					<div
						className={clsx(styles.value)}
						onClick={() => setOpen((val) => !val)}
					>
						{renderValue ? renderValue(value) : value}
						<div
							className={clsx(styles.chevron, {
								[styles['chevron-open']]: open,
							})}
						>
							<DownChevron />
						</div>
					</div>
					{open ? (
						<div className={styles['list-container']}>
							<ul className={styles.list}>
								{renderSearchbar()}
								{filteredOptions.map((option) => {
									const active = option === value
									return (
										<li
											key={option}
											onClick={() => {
												setOpen(false)
												onChange(option)
											}}
											className={clsx(styles.option, {
												[styles.active]: active,
											})}
										>
											{renderOption
												? renderOption(option, active)
												: option}
										</li>
									)
								})}
							</ul>
						</div>
					) : null}
				</ClickAwayListener>
			</div>
		)
	}
}

export default Select
