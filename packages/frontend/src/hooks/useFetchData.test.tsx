import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { describe, it, expect, vi } from 'vitest'
import { useFetchData } from './useFetchData'

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

describe('useFetchData', () => {
  it('should fetch data successfully', async () => {
    const mockData = { message: 'Hello' }
    const mockFetchFn = vi.fn().mockResolvedValue(mockData)

    const { result } = renderHook(() => useFetchData(mockFetchFn), {
      wrapper: createWrapper(),
    })

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data).toEqual(mockData)
  })

  it('should handle error', async () => {
    const errorMessage = 'Network Error'
    const mockFetchFn = vi.fn().mockRejectedValue(new Error(errorMessage))

    const { result } = renderHook(() => useFetchData(mockFetchFn), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })

    expect(result.current.error?.message).toBe(errorMessage)
  })
})