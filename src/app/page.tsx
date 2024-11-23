'use client'

import Button from '@/components/button'
import Card from '@/components/card'
import Date from '@/components/date'
import DetailCard from '@/components/detailCard'
import Details from '@/components/details'
import FileUpload from '@/components/fileUpload'
import Header from '@/components/header'
import LoadingIndicator from '@/components/loadingIndicator'
import Marketplace from '@/components/marketplace'
import Modal from '@/components/modal'
import ModalHr from '@/components/modal/modalHr'
import Pagination from '@/components/pagination'
import Phone from '@/components/phone'
import Product from '@/components/product'
import RadioOption from '@/components/radioOptions'
import Select from '@/components/select'
import Table from '@/components/table'
import Tabs from '@/components/tabs'
import Tag from '@/components/tag'
import useToaster from '@/context/toasterContext'
import useUpdateQueryParams from '@/hooks/useUpdateQueryParams'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const MainPage = () => {
	const [selectedRows, setSelectedRows] = useState<number[]>([])
	const [option, setOption] = useState<string>('first')
	const [options, setOptions] = useState<string[]>(['first', 'second'])
	const [modalOpen, setModalOpen] = useState<boolean>(false)
	const { toast } = useToaster()
	const [radioValue, setRadioValue] = useState<string>('first')
	const searchParams = useSearchParams()
	const updateQueryParams = useUpdateQueryParams()

	const [page, setPage] = useState<number>(+(searchParams.get('page') || 1))
	const [pageSize, setPageSize] = useState<number>(
		+(searchParams.get('limit') || 25)
	)

	useEffect(() => {
		updateQueryParams('limit', pageSize.toString())
	}, [pageSize])

	useEffect(() => {
		updateQueryParams('page', page.toString())
	}, [page])

	return (
		<div style={{ padding: '32px' }}>
			<Card>
				<Header
					title='Direct Delivery Shipments'
					subtitle='Here, you can track and manage your direct delivery orders'
				>
					<div>test</div>
					<div>test</div>
				</Header>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: 12,
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<LoadingIndicator />
					<Button variant='primary'>test</Button>
					<Button variant='primary' disabled>
						test
					</Button>
					<Button variant='primary' loading>
						test
					</Button>
					<Button variant='secondary'>test</Button>
					<Button variant='secondary' disabled>
						test
					</Button>
					<Button variant='danger'>test</Button>
					<Button variant='link'>test</Button>
					<Button
						variant='secondary'
						extraActions={[
							{
								variant: 'danger',
								onClick: () => {},
								text: 'Delete',
								icon: <LoadingIndicator size='small' />,
							},
						]}
					>
						test
					</Button>

					<Tabs
						defaultActiveTab={1}
						tabs={[
							{
								label: 'tab1',
								key: 1,
								count: 4,
								variant: 'secondary',
								children: (
									<Table
										emptyState={{
											icon: <LoadingIndicator />,
											title: 'Test title',
											subtitle: 'Test subtitle',
										}}
										columns={[
											{
												dataIndex: 'name',
												key: '1',
												title: 'Name',
											},
											{
												dataIndex: 'address',
												key: '2',
												title: 'Address',
												renderCell: (data, record) =>
													`${record.name} address is ${data}`,
											},
											{
												dataIndex: 'age',
												key: '3',
												title: 'Age',
												placement: 'end',
											},
										]}
										dataSource={[
											{
												key: '1',
												name: 'Kareem',
												age: '25',
												address: '123',
											},
											{
												key: '2',
												name: 'Ahmed',
												age: '30',
												address: '123',
											},
											{
												key: '3',
												name: 'Ali',
												age: '17',
												address: '123',
											},
											{
												key: '4',
												name: 'Omar',
												age: '20',
												address: '123',
											},
										]}
										selection={{
											selectedRows,
											setSelectedRows,
										}}
									/>
								),
							},
							{
								label: 'tab2',
								key: 2,
								count: 0,
								variant: 'danger',
								children: (
									<Table
										emptyState={{
											icon: <LoadingIndicator />,
											title: 'Test title',
											subtitle: 'Test subtitle',
										}}
										columns={[
											{
												dataIndex: 'awb',
												key: '1',
												title: 'AWB Number',
											},
											{
												dataIndex: 'order',
												key: '2',
												title: 'Order Number',
											},
										]}
										dataSource={[
											{
												key: '1',
												awb: 'S123',
												order: 'LP123',
											},
											{
												key: '2',
												awb: 'S456',
												order: 'LP456',
											},
											{
												key: '3',
												awb: 'S789',
												order: 'LP789',
											},
											{
												key: '4',
												awb: 'S000',
												order: 'LP000',
											},
										]}
									/>
								),
							},
						]}
					/>

					<Pagination
						page={page}
						setPage={setPage}
						pageSize={pageSize}
						setPageSize={setPageSize}
						onChangePage={(p) =>
							updateQueryParams('page', p.toString())
						}
						totalRows={99}
						pageSizeOptions={[25, 50, 100]}
						onChangePageSize={(ps) =>
							updateQueryParams('limit', ps.toString())
						}
					/>

					<Date date='2024-11-19T12:30:00Z' variant='dotted' />
					<Date date='2024-11-19T12:30:00Z' variant='full' />
					<Date date='2024-11-19T12:30:00' variant='full' />

					<Marketplace marketplace='noon' />
					<Marketplace marketplace='namshi_v2' />
					<Marketplace marketplace='minutes' />

					<Phone phone='+20123456789' />

					<Tag variant='danger' text='danger' />
					<Tag
						variant='danger'
						text='danger outline'
						type='outline'
					/>
					<Tag variant='warning' text='warning' />
					<Tag
						variant='warning'
						text='warning outline'
						type='outline'
					/>
					<Tag variant='secondary' text='secondary' />
					<Tag variant='success' text='success' type='outline' />

					<Select
						options={['first', 'second', 'third']}
						value={option}
						onChange={setOption}
						renderOption={(option, active) => (
							<div>{`option: ${option} is ${
								active ? 'active' : 'not active'
							}`}</div>
						)}
						renderValue={(value) => <div>{`value: ${value}`}</div>}
					/>

					<Select
						options={['first', 'second', 'third']}
						value={option}
						onChange={setOption}
						searchable
					/>

					<Select
						options={[
							'first',
							'second',
							'third',
							'fourth',
							'fifth',
							'sixth',
							'seventh',
							'eighth',
							'ninth',
							'tenth',
							'eleventh',
							'twelfth',
							'thirteenth',
						]}
						value={options}
						onChange={setOptions}
						multiple
						renderOption={(option) => (
							<div>{`option: ${option}`}</div>
						)}
						renderValue={(value) => <div>{value.join(' + ')}</div>}
					/>
					<Select
						options={['first', 'second', 'third']}
						value={options}
						onChange={setOptions}
						multiple
						searchable
					/>

					<Button
						variant='primary'
						onClick={() => setModalOpen(true)}
					>
						Open Modal
					</Button>
					<Modal open={modalOpen} onClose={() => setModalOpen(false)}>
						Test above HR
						<ModalHr />
						Test Below Hr
					</Modal>

					<div
						style={{
							display: 'flex',
							gap: 24,
							marginTop: 12,
						}}
					>
						<Details title='Test title' subtitle='Test subtitle' />
						<Details
							title='Test title 2'
							subtitle='Test subtitle 2'
						/>
					</div>

					<FileUpload />

					<Button
						variant='primary'
						onClick={() => toast('Test Primary', 'primary')}
					>
						Open Primary Toaster
					</Button>
					<Button
						variant='danger'
						onClick={() => toast('Test Error', 'danger')}
					>
						Open Error Toaster
					</Button>
					<Button
						variant='secondary'
						onClick={() =>
							toast('Test Success', 'success', {
								onClick: () => alert('clicked'),
								text: 'Click me',
							})
						}
					>
						Open Success Toaster
					</Button>

					<Product
						img='https://picsum.photos/200/300'
						title='Apple · Apple iphone 14, Single SIM, 128Gb, 4Gb Ram, 5G - Starlight'
						subtitle='106058137P'
					/>

					<DetailCard title='AWB Number'>PE79532043221A</DetailCard>

					<div
						style={{
							width: '100%',
							padding: 16,
							display: 'flex',
							flexDirection: 'column',
							gap: 16,
						}}
					>
						<RadioOption
							name='name'
							value='first'
							label='First Option'
							checked={radioValue === 'first'}
							onClick={(value) => setRadioValue(value)}
						/>
						<RadioOption
							name='name'
							value='second'
							label='Second Option'
							checked={radioValue === 'second'}
							onClick={(value) => setRadioValue(value)}
						/>
						<RadioOption
							name='name'
							value='third'
							label='Third Option'
							checked={radioValue === 'third'}
							onClick={(value) => setRadioValue(value)}
						/>
					</div>

					<div style={{ marginTop: 24 }} />
				</div>
			</Card>
		</div>
	)
}

export default MainPage
