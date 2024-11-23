'use client'

import React, {
	FC,
	PropsWithChildren,
	ReactNode,
	useContext,
	useState,
} from 'react'

export type TToasterVariant = 'success' | 'danger' | 'primary'
export type TExtraAction = {
	text: string
	onClick: () => void
	icon?: ReactNode
}

type TToasterContext = {
	toast: (
		message: string,
		variant: TToasterVariant,
		extraAction?: TExtraAction
	) => void
	variant: TToasterVariant
	message: string
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
	extraAction?: TExtraAction
}

const ToasterContext = React.createContext<TToasterContext>({
	toast: () => {},
	variant: 'primary',
	message: '',
	open: false,
	setOpen: () => {},
})

export const ToasterProvider: FC<PropsWithChildren> = ({ children }) => {
	const [open, setOpen] = useState<boolean>(false)
	const [message, setMessage] = useState<string>('')
	const [variant, setVariant] = useState<TToasterVariant>('primary')
	const [extraAction, setExtraAction] = useState<TExtraAction>()

	const makeToast = (
		message: string,
		variant: TToasterVariant,
		extraAction?: TExtraAction
	) => {
		setOpen(true)
		setMessage(message)
		setVariant(variant)
		if (extraAction) {
			setExtraAction(extraAction)
		} else setExtraAction(undefined)
	}

	return (
		<ToasterContext.Provider
			value={{
				toast: makeToast,
				variant,
				message,
				open,
				setOpen,
				extraAction,
			}}
		>
			{children}
		</ToasterContext.Provider>
	)
}

const useToaster = () => useContext(ToasterContext)

export default useToaster
