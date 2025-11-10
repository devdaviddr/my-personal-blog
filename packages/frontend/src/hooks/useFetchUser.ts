import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const fetchUser = async (userId: string) => {
  const response = await axios.get(`/api/users/${userId}`)
  return response.data
}

export const useFetchUser = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  })
}