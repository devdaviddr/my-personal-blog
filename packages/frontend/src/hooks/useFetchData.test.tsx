import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { describe, it, expect, vi } from 'vitest'
import axios from 'axios'
import { useFetchData } from './useFetchData'

vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
  },
}))

const mockedAxios = vi.mocked(axios)

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
    ;(mockedAxios.get as any).mockResolvedValueOnce({ data: mockData }) // eslint-disable-line @typescript-eslint/no-explicit-any

    const { result } = renderHook(() => useFetchData('/api/test'), {
      wrapper: createWrapper(),
    })

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data).toEqual(mockData)
    expect(mockedAxios.get).toHaveBeenCalledWith('/api/test')
  })

  it('should handle error', async () => {
    const errorMessage = 'Network Error'
    ;(mockedAxios.get as any).mockRejectedValueOnce(new Error(errorMessage)) // eslint-disable-line @typescript-eslint/no-explicit-any

    const { result } = renderHook(() => useFetchData('/api/test'), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })

    expect(result.current.error?.message).toBe(errorMessage)
  })
})