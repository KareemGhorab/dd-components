import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const useUpdateQueryParams = () => {
	const { replace } = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const updateQueryParams = (query: { [key: string]: string }) => {
		const params = new URLSearchParams(searchParams.toString())
		Object.entries(query).forEach(([key, value]) => params.set(key, value))
		replace(`${pathname}?${params.toString()}`, {
			scroll: false,
		})
	}

	return updateQueryParams
}

export default useUpdateQueryParams
