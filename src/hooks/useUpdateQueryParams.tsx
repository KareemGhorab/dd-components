import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const useUpdateQueryParams = () => {
	const { replace } = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const updateQueryParams = (key: string, value: string) => {
		const params = new URLSearchParams(searchParams.toString())
		params.set(key, value)
		replace(`${pathname}?${params.toString()}`, {
			scroll: false,
		})
	}

	return updateQueryParams
}

export default useUpdateQueryParams
