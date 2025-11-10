import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { describe, it, expect, vi } from 'vitest'
import axios from 'axios'
import { useFetchUser } from './useFetchUser'

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

describe('useFetchUser', () => {
  it('should fetch user successfully', async () => {
    const mockUser = { id: '1', name: 'John Doe' }
    ;(mockedAxios.get as any).mockResolvedValueOnce({ data: mockUser }) // eslint-disable-line @typescript-eslint/no-explicit-any

    const { result } = renderHook(() => useFetchUser('1'), {
      wrapper: createWrapper(),
    })

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data).toEqual(mockUser)
    expect(mockedAxios.get).toHaveBeenCalledWith('/api/users/1')
  })

  it('should handle error', async () => {
    const errorMessage = 'User not found'
    ;(mockedAxios.get as any).mockRejectedValueOnce(new Error(errorMessage)) // eslint-disable-line @typescript-eslint/no-explicit-any

    const { result } = renderHook(() => useFetchUser('1'), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })

    expect(result.current.error?.message).toBe(errorMessage)
  })
})