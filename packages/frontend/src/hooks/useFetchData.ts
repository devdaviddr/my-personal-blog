import { useQuery } from '@tanstack/react-query'

const fetchData = async (fetchFn: () => Promise<any>) => {
  return await fetchFn()
}

export const useFetchData = (fetchFn: () => Promise<any>, options?: Record<string, unknown>) => {
  return useQuery({
    queryKey: [fetchFn.toString()],
    queryFn: () => fetchData(fetchFn),
    ...options
  })
}